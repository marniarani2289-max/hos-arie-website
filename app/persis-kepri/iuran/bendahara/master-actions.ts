'use server';
import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import {REGIONS} from '@/lib/persis/dues';
import {requireTreasurer,resolveAccount} from '@/lib/persis/master-server';

function month(value:string){if(!value)return null;if(!/^(20[2-9]\d|2100)-(0[1-9]|1[0-2])$/.test(value))throw new Error('Bulan harus valid, antara 2020–2100.');return `${value}-01`;}
function refresh(){revalidatePath('/persis-kepri/iuran','layout');}
export async function saveMember(form:FormData){
 const {service,user}=await requireTreasurer();const base='/persis-kepri/iuran/bendahara/anggota';let message='';
 try{
  const t=(key:string)=>String(form.get(key)||'').trim();
  const id=t('id'),full_name=t('full_name'),email=t('email').toLowerCase()||null,member_number=t('member_number'),region=t('region'),note=t('note'),start_month=month(t('start_month')),end_month=month(t('end_month'));
  if(full_name.length<2||full_name.length>120||member_number.length>60||note.length>500||!REGIONS.some(r=>r===region))throw new Error('Periksa nama, daerah, nomor anggota, dan catatan.');
  if(email&&(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254))throw new Error('Email anggota tidak valid.');
  if(end_month&&(!start_month||end_month<start_month))throw new Error('Bulan terakhir tidak boleh mendahului bulan mulai wajib.');
  let user_id:string|null=null;
  if(id){
   const {data:old,error}=await service.from('persis_members').select('user_id,email').eq('id',id).single();
   if(error||!old)throw new Error('Anggota tidak ditemukan.');
   if(old.user_id&&email!==old.email)throw new Error('Email akun yang sudah terhubung tidak dapat diganti melalui formulir ini.');
   user_id=old.user_id;
  }
  user_id=user_id||await resolveAccount(service,email);
  const values={full_name,email,member_number,region,note,start_month,end_month,user_id,updated_by:user.id};
  const result=id?await service.from('persis_members').update(values).eq('id',id).eq('updated_at',t('version')).select('id'):await service.from('persis_members').insert(values).select('id');
  if(result.error)throw new Error(result.error.code==='23505'?'Email, akun, atau nomor anggota sudah digunakan.':'Data anggota belum berhasil disimpan.');
  if(!result.data?.length)throw new Error('Data sudah berubah. Muat ulang halaman sebelum menyimpan kembali.');
 }catch(e){message=e instanceof Error?e.message:'Data belum dapat disimpan.';}
 if(message)redirect(`${base}?error=${encodeURIComponent(message)}`);
 refresh();redirect(`${base}?success=1`);
}
export async function addRate(form:FormData){
 const {service,user}=await requireTreasurer();const base='/persis-kepri/iuran/bendahara/ketentuan';let message='';
 try{
  const effective_month=month(String(form.get('effective_month')||'')),amount=Number(form.get('amount')),due_day=Number(form.get('due_day')),reference=String(form.get('reference')||'').trim();
  if(!effective_month||!Number.isSafeInteger(amount)||amount<1||amount>100000000||!Number.isInteger(due_day)||due_day<1||due_day>28||reference.length<3||reference.length>300)throw new Error('Isi bulan berlaku, nominal rupiah utuh, tanggal jatuh tempo 1–28, dan dasar keputusan.');
  const {error}=await service.from('persis_rates').insert({effective_month,amount,due_day,reference,created_by:user.id});
  if(error)throw new Error(error.code==='23505'?'Sudah ada ketentuan mulai bulan tersebut. Gunakan bulan mulai yang berbeda untuk ketentuan berikutnya.':'Ketentuan belum berhasil disimpan.');
 }catch(e){message=e instanceof Error?e.message:'Ketentuan belum dapat disimpan.';}
 if(message)redirect(`${base}?error=${encodeURIComponent(message)}`);
 refresh();redirect(`${base}?success=1`);
}
