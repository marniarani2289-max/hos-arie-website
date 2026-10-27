'use server';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
export async function registerNotary(form:FormData){
 const email=String(form.get('email')||'').trim();const password=String(form.get('password')||'');const name=String(form.get('name')||'').trim();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||password.length<10||name.length<2||name.length>160)redirect('/lexnusa/notaris/register?error=Periksa+nama,+email,+dan+kata+sandi+minimal+10+karakter.');
 const db=await createClient();
 const {error}=await db.auth.signUp({email,password,options:{emailRedirectTo:'https://www.hossibarani.com/auth/callback?next=/lexnusa/notaris/workspace',data:{full_name:name}}});
 redirect(error?'/lexnusa/notaris/register?error=Pendaftaran+belum+berhasil.+Coba+lagi+atau+masuk+jika+sudah+memiliki+akun.':'/lexnusa/notaris/register?success=1');
}
