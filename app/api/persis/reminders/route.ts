import {randomUUID} from 'node:crypto';
import {revalidatePath} from 'next/cache';
import {cashApiAuth} from '@/lib/persis/cash-server';
import {requireTreasurer} from '@/lib/persis/master-server';
import {loadReminderData,prepareReminder} from '@/lib/persis/reminders-server';
import {reminderMonth,REMINDER_BASE} from '@/lib/persis/reminders';
import {UUID} from '@/lib/persis/cash';
export async function POST(request:Request){
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Permintaan tidak diizinkan.'},{status:403});
 const auth=await cashApiAuth();if(auth.error)return auth.error;
 let body:{memberId?:string;month?:string;draftId?:string;mode?:string;confirm?:boolean;phone?:string;name?:string};try{body=await request.json();}catch{return Response.json({error:'Permintaan tidak valid.'},{status:400});}
 if(!body||typeof body!=='object'||!body.memberId||!UUID.test(body.memberId)||body.confirm!==true||!['prepare','open'].includes(body.mode||'')||typeof body.month!=='string'||reminderMonth(body.month)!==body.month)return Response.json({error:'Periksa anggota, bulan, dan konfirmasi penerima.'},{status:400});
 const {service,user}=await requireTreasurer(REMINDER_BASE);
 try{
  const data=await loadReminderData(auth.client,body.memberId),fresh=prepareReminder(data,body.memberId,body.month);
  if(fresh.phone!==body.phone||data.members[0]?.full_name!==body.name)throw new Error('Identitas atau nomor berubah. Muat ulang dan konfirmasi penerima kembali.');
  if(body.mode==='open'){
   if(!body.draftId||!UUID.test(body.draftId))throw new Error('Siapkan ulang pesan.');
   const {data:draft,error}=await auth.client.from('persis_reminders').select('snapshot_hash,status,created_at,cutoff').eq('id',body.draftId).eq('member_id',body.memberId).maybeSingle();
   if(error||!draft||draft.status!=='draft'||draft.snapshot_hash!==fresh.hash||draft.cutoff!==`${body.month}-01`||Date.now()-Date.parse(draft.created_at)>15*60*1000)throw new Error('Data berubah atau draf lebih dari 15 menit. Siapkan ulang pesan sebelum membuka WhatsApp.');
   return Response.json({url:`https://wa.me/${fresh.phone}?text=${encodeURIComponent(fresh.message)}`},{headers:{'Cache-Control':'private, no-store'}});
  }
  const id=randomUUID();const {error}=await service.from('persis_reminders').insert({id,member_id:body.memberId,status:'draft',cutoff:`${body.month}-01`,amount:fresh.amount,phone:fresh.phone,message:fresh.message,snapshot_hash:fresh.hash,created_by:user.id,updated_by:user.id});
  if(error)throw new Error('Draf belum tersimpan. Coba kembali.');revalidatePath(`${REMINDER_BASE}/${body.memberId}`);
  return Response.json({id,message:fresh.message,phone:fresh.phone},{headers:{'Cache-Control':'private, no-store'}});
 }catch(e){return Response.json({error:e instanceof Error?e.message:'Pesan belum dapat disiapkan.'},{status:409});}
}
