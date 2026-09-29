'use server';
import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import {requireTreasurer} from '@/lib/persis/master-server';
import {REMINDER_BASE,normalizePhone,reminderMonth,FOLLOWUP} from '@/lib/persis/reminders';
import {UUID} from '@/lib/persis/cash';
import {jakartaDate} from '@/lib/persis/dues';
function target(form:FormData){const id=String(form.get('member_id')||'');if(!UUID.test(id))redirect(REMINDER_BASE);const month=reminderMonth(String(form.get('month')||''));return {id,month,back:`${REMINDER_BASE}/${id}?month=${month}`};}
export async function saveContact(form:FormData){
 const {service,user}=await requireTreasurer(REMINDER_BASE),{id,back}=target(form);let phone:string;
 try{phone=normalizePhone(String(form.get('phone')||''));if(phone&&form.get('confirm')!=='yes')throw new Error('Konfirmasi bahwa nomor WhatsApp adalah milik anggota tersebut.');}catch(e){redirect(`${back}&error=${encodeURIComponent(e instanceof Error?e.message:'Periksa nomor.')}`);}
 const values={member_id:id,phone,verified_at:phone?new Date().toISOString():null,paused:form.get('paused')==='yes',updated_by:user.id};
 const version=String(form.get('version')||'');let failed=false;
 if(version){const {data,error}=await service.from('persis_member_contacts').update(values).eq('member_id',id).eq('updated_at',version).select('member_id');failed=!!error||!data?.length;}else{const {error}=await service.from('persis_member_contacts').insert(values);failed=!!error;}
 if(failed)redirect(`${back}&error=Kontak+belum+tersimpan.+Muat+ulang+untuk+memeriksa+perubahan+terbaru.`);
 revalidatePath(REMINDER_BASE,'layout');redirect(`${back}&success=contact`);
}
export async function confirmSent(form:FormData){
 const {service,user}=await requireTreasurer(REMINDER_BASE),{id,back}=target(form),draftId=String(form.get('draft_id')||'');
 if(!UUID.test(draftId)||form.get('confirm_sent')!=='yes')redirect(`${back}&error=Konfirmasi+bahwa+pesan+sudah+Anda+kirim.`);
 const {data,error}=await service.from('persis_reminders').update({status:'sent',sent_at:new Date().toISOString(),updated_by:user.id}).eq('id',draftId).eq('member_id',id).eq('status','draft').select('id');
 if(error||!data?.length)redirect(`${back}&error=Konfirmasi+belum+tersimpan+atau+sudah+dicatat.+Muat+ulang.`);
 revalidatePath(REMINDER_BASE,'layout');redirect(`${back}&success=sent`);
}
export async function addFollowup(form:FormData){
 const {service,user}=await requireTreasurer(REMINDER_BASE),{id,month,back}=target(form),status=String(form.get('status')||''),note=String(form.get('note')||'').trim(),next=String(form.get('next_followup')||'');
 const d=new Date(`${next}T00:00:00Z`),validNext=!next||(/^\d{4}-\d{2}-\d{2}$/.test(next)&&!Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===next&&next>=jakartaDate()&&next<='2100-12-31');
 if(!Object.prototype.hasOwnProperty.call(FOLLOWUP,status)||note.length<3||note.length>1000||!validNext)redirect(`${back}&error=Isi+hasil+tindak+lanjut+dan+tanggal+lanjutan+hari+ini+atau+sesudahnya.`);
 const {error}=await service.from('persis_reminders').insert({member_id:id,status,note,next_followup:next||null,cutoff:`${month}-01`,created_by:user.id,updated_by:user.id});
 if(error)redirect(`${back}&error=Catatan+belum+tersimpan.+Coba+kembali.`);
 revalidatePath(REMINDER_BASE,'layout');redirect(`${back}&success=followup`);
}
