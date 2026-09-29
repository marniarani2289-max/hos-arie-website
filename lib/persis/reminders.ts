import {memberBills,type Member,type Rate,type Payment} from './billing';
import {jakartaDate,monthLabel,rupiah} from './dues';
export const REMINDER_BASE='/persis-kepri/iuran/bendahara/pengingat';
export const FOLLOWUP={note:'Catatan tindak lanjut',promised:'Janji membayar',disputed:'Perlu klarifikasi',no_response:'Belum ada respons'} as const;
export const LOG_STATUS={draft:'Draf disiapkan — belum dikonfirmasi dikirim',sent:'Dikirim — dikonfirmasi bendahara',...FOLLOWUP};
export type Contact={phone:string;verified_at:string|null;paused:boolean;updated_at:string};
export type ReminderLog={id:string;status:keyof typeof LOG_STATUS;cutoff:string;amount:number;phone:string;message:string;note:string;next_followup:string|null;created_at:string;sent_at:string|null;snapshot_hash:string};
export type ReminderMember=Member&{contact:Contact|null;latest:ReminderLog|null};
export type ReminderData={members:ReminderMember[];rates:Rate[];payments:Payment[]};
export function reminderMonth(raw?:string,today=jakartaDate()){return /^(20[2-9]\d|2100)-(0[1-9]|1[0-2])$/.test(raw||'')&&raw!<=today.slice(0,7)?raw!:today.slice(0,7);}
export function normalizePhone(value:string){let phone=value.trim().replace(/[\s()+-]/g,'');if(!phone)return '';if(phone.startsWith('08'))phone='62'+phone.slice(1);else if(phone.startsWith('8'))phone='62'+phone;if(!/^628\d{7,12}$/.test(phone))throw new Error('Gunakan nomor WhatsApp Indonesia, misalnya 08… atau +628… (tanpa huruf).');return phone;}
export function reminderState(member:ReminderMember,rates:Rate[],payments:Payment[],month:string,today=jakartaDate()){
 const own=member.user_id?payments.filter(p=>p.user_id===member.user_id):[],bills=[];
 const first=member.start_month?Number(member.start_month.slice(0,4)):Number(month.slice(0,4));
 for(let year=first;year<=Number(month.slice(0,4));year++)bills.push(...memberBills(member,rates,own,year,today).filter(b=>b.month.slice(0,7)<=month));
 const debt=bills.filter(b=>b.arrears>0),amount=debt.reduce((s,b)=>s+b.arrears,0),pending=own.filter(p=>p.status==='pending').reduce((s,p)=>s+p.amount,0);
 const selected=bills.find(b=>b.month===`${month}-01`),monthlyPaid=own.filter(p=>p.period===`${month}-01`&&p.status==='verified').reduce((s,p)=>s+p.amount,0);
 const unknown=!member.start_month||bills.some(b=>b.status==='Tarif belum ditetapkan');
 let blocked='';
 if(!member.user_id)blocked='Akun anggota belum terhubung; pembayaran perlu dicocokkan.';
 else if(unknown)blocked='Mulai wajib atau ketentuan iuran belum lengkap.';
 else if(pending>0)blocked='Ada pembayaran menunggu verifikasi. Periksa sebelum mengingatkan.';
 else if(!amount)blocked='Tidak ada kekurangan yang sudah jatuh tempo sampai bulan pilihan.';
 else if(member.contact?.paused)blocked='Pengingat anggota ini dijeda.';
 else if(!member.contact?.phone||!member.contact.verified_at)blocked='Nomor WhatsApp belum dikonfirmasi.';
 return {member,bills,debt,amount,pending,unknown,blocked,eligible:!blocked,monthlyPaid,monthlyArrears:selected?.arrears||0,monthlyPending:own.filter(p=>p.period===`${month}-01`&&p.status==='pending').reduce((s,p)=>s+p.amount,0)};
}
export function reminderMessage(state:ReturnType<typeof reminderState>,month:string,today=jakartaDate()){
 return `Assalamu’alaikum warahmatullahi wabarakatuh.\n\nYth. ${state.member.full_name},\nBerdasarkan catatan iuran PW Persis Kepri per ${today}, berikut kekurangan iuran yang sudah jatuh tempo sampai ${monthLabel(`${month}-01`)}:\n\n${state.debt.map(b=>`• ${monthLabel(b.month)}: ${rupiah(b.arrears)}`).join('\n')}\n\nTotal kekurangan: ${rupiah(state.amount)}.\n\nSilakan mencatat pembayaran dan mengunggah bukti melalui:\nhttps://www.hossibarani.com/persis-kepri/iuran\n\nJika sudah membayar atau ada perbedaan catatan, mohon kabari bendahara agar dapat diperiksa. Terima kasih.\nWassalamu’alaikum warahmatullahi wabarakatuh.\nBendahara PW Persis Kepri`;
}
