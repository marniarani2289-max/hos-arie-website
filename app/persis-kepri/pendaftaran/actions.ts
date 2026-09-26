'use server';
import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import {requireApplicant,requireTreasurer,linkCurrentMember} from '@/lib/persis/master-server';
import {applicationValues} from '@/lib/persis/application';
export async function submitApplication(form:FormData){
 const {user,service}=await requireApplicant();const base='/persis-kepri/pendaftaran';let message='';
 try{
  const values=applicationValues(form);await linkCurrentMember();
  const {data:member,error:lookup}=await service.from('persis_members').select('id').eq('user_id',user.id).maybeSingle();
  if(lookup)throw new Error('Status anggota belum dapat diperiksa. Coba kembali.');
  if(member)throw new Error('Akun Anda sudah terdaftar dalam master anggota. Tidak perlu mengajukan ulang.');
  const {error}=await service.from('persis_member_applications').insert({...values,user_id:user.id,email:user.email!.toLowerCase()});
  if(error)throw new Error(error.code==='23505'?'Anda sudah memiliki pengajuan aktif. Periksa status di halaman ini.':'Pendaftaran belum berhasil disimpan. Coba kembali.');
 }catch(e){message=e instanceof Error?e.message:'Pendaftaran belum berhasil disimpan.';}
 if(message)redirect(`${base}?error=${encodeURIComponent(message)}`);
 revalidatePath(base);revalidatePath('/persis-kepri/iuran/bendahara/pendaftaran');redirect(`${base}?success=1`);
}
export async function reviewApplication(form:FormData){
 const base='/persis-kepri/iuran/bendahara/pendaftaran';const {user,service}=await requireTreasurer(base);
 const id=String(form.get('id')||''),decision=String(form.get('decision')||''),start=String(form.get('start_month')||''),note=String(form.get('review_note')||'').trim();
 if(!/^[0-9a-f-]{36}$/i.test(id)||!['approved','rejected'].includes(decision)||note.length>500||(decision==='rejected'&&note.length<3)||(start&&!/^(20[2-9]\d|2100)-(0[1-9]|1[0-2])$/.test(start)))redirect(`${base}?error=${encodeURIComponent('Periksa bulan mulai wajib dan catatan. Permintaan perbaikan wajib disertai alasan minimal 3 karakter.')}`);
 const {error}=await service.rpc('persis_review_application',{p_id:id,p_reviewer:user.id,p_decision:decision,p_start_month:start?`${start}-01`:null,p_note:note});
 if(error)redirect(`${base}?error=${encodeURIComponent(error.code==='23505'?'Email atau nomor anggota sudah digunakan. Periksa master anggota atau minta perbaikan data.':'Keputusan belum disimpan. Pengajuan mungkin sudah diperiksa atau datanya bertentangan dengan master anggota. Muat ulang dan periksa kembali.')}`);
 revalidatePath('/persis-kepri/pendaftaran');revalidatePath('/persis-kepri/iuran','layout');redirect(`${base}?success=1`);
}
