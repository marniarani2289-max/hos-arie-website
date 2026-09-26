'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function reviewDue(form:FormData){
  const base='/persis-kepri/iuran/bendahara', supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) redirect(`/login?next=${encodeURIComponent(base)}`);
  const {data:allowed}=await supabase.from('persis_treasurers').select('user_id').eq('user_id',user.id).maybeSingle();
  if(!allowed) redirect('/persis-kepri/iuran');
  const id=String(form.get('id')||''),status=String(form.get('status')||''),review_note=String(form.get('review_note')||'').trim();
  if(!/^[0-9a-f-]{36}$/i.test(id) || !['verified','rejected'].includes(status) || review_note.length>500 || (status==='rejected'&&review_note.length<3)) redirect(`${base}?error=${encodeURIComponent('Isi catatan perbaikan minimal 3 karakter; maksimal 500 karakter.')}`);
  const {data,error}=await supabase.from('persis_dues').update({status,review_note}).eq('id',id).eq('status','pending').select('id');
  if(error || !data?.length) redirect(`${base}?error=${encodeURIComponent('Keputusan belum tersimpan atau catatan sudah diperiksa. Muat ulang dan periksa statusnya.')}`);
  revalidatePath('/persis-kepri/iuran'); revalidatePath(base); revalidatePath(`${base}/kas`);
  redirect(`${base}?success=1`);
}

export async function signOutPersis(){
  const supabase=await createClient();await supabase.auth.signOut();redirect('/persis-kepri/iuran');
}
