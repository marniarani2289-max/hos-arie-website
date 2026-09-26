'use server';
import {redirect} from 'next/navigation';
import {createClient} from '@/lib/supabase/server';

export async function registerPersis(form:FormData){
  const name=String(form.get('name')||'').trim(),email=String(form.get('email')||'').trim(),password=String(form.get('password')||'');
  if(name.length<2 || name.length>120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length>254 || password.length<8 || password.length>128) redirect('/persis-kepri/daftar?error=Periksa+nama,+email,+dan+kata+sandi+(8–128+karakter).');
  const supabase=await createClient();
  const site=process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hossibarani.com';
  const {data,error}=await supabase.auth.signUp({email,password,options:{emailRedirectTo:`${site}/auth/callback?next=/persis-kepri/pendaftaran`,data:{full_name:name,institution:'PW Persis Kepulauan Riau'}}});
  if(error)redirect(`/persis-kepri/daftar?error=${encodeURIComponent('Pendaftaran belum berhasil. Coba kembali beberapa saat lagi atau masuk jika sudah memiliki akun.')}`);
  if(data.session)redirect('/persis-kepri/pendaftaran');
  redirect('/persis-kepri/daftar?success=1');
}
