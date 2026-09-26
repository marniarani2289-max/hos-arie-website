'use server';
import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import {requireTreasurer} from '@/lib/persis/master-server';
import {CASH_BASE,UUID,openingValues,cashMonth} from '@/lib/persis/cash';

export async function saveOpening(form:FormData){
 const {service,user}=await requireTreasurer(CASH_BASE);
 let values:ReturnType<typeof openingValues>;
 try{values=openingValues(form);}catch(e){redirect(`${CASH_BASE}?error=${encodeURIComponent(e instanceof Error?e.message:'Periksa isian.')}`);}
 const {data:existing,error:readError}=await service.from('persis_cash_settings').select('start_date,updated_at').eq('id',true).maybeSingle();
 if(readError)redirect(`${CASH_BASE}?error=Saldo+awal+belum+dapat+diperiksa.`);
 let failed=false;
 if(existing){
  const version=String(form.get('version')||'');
  if(values.start_date!==existing.start_date||version!==existing.updated_at)redirect(`${CASH_BASE}?error=Muat+ulang+halaman.+Tanggal+mulai+tidak+dapat+diubah.`);
  const {data,error}=await service.from('persis_cash_settings').update({opening_balance:values.opening_balance,note:values.note,updated_by:user.id}).eq('id',true).eq('updated_at',version).select('id');
  failed=!!error||!data?.length;
 }else{
  const {error}=await service.from('persis_cash_settings').insert({...values,id:true,updated_by:user.id});failed=!!error;
 }
 if(failed)redirect(`${CASH_BASE}?error=Saldo+awal+belum+tersimpan.+Muat+ulang+dan+coba+kembali.`);
 revalidatePath(CASH_BASE);redirect(`${CASH_BASE}?month=${values.start_date.slice(0,7)}&success=opening`);
}
export async function voidCashEntry(form:FormData){
 const {service,user}=await requireTreasurer(CASH_BASE);
 const id=String(form.get('id')||''),reason=String(form.get('reason')||'').trim(),month=cashMonth(String(form.get('month')||''));
 if(!UUID.test(id)||reason.length<3||reason.length>500||form.get('confirm')!=='yes')redirect(`${CASH_BASE}?month=${month}&error=Isi+alasan+dan+konfirmasi+pembatalan.`);
 const {data,error}=await service.from('persis_cash_entries').update({voided_at:new Date().toISOString(),voided_by:user.id,void_reason:reason}).eq('id',id).is('voided_at',null).select('id');
 if(error||!data?.length)redirect(`${CASH_BASE}?month=${month}&error=Transaksi+belum+dibatalkan+atau+sudah+dibatalkan.+Muat+ulang.`);
 revalidatePath(CASH_BASE);redirect(`${CASH_BASE}?month=${month}&success=void`);
}
