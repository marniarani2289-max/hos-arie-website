import type {Metadata} from 'next';
import Link from 'next/link';
import {registerPersis} from './actions';

export const metadata:Metadata={title:'Akun Iuran PW Persis Kepri',robots:{index:false,follow:false}};
export default async function RegisterPersis({searchParams}:{searchParams:Promise<{error?:string;success?:string}>}){
  const {error,success}=await searchParams;
  return <div lang="id" className="min-h-screen bg-slate-50 px-5 py-12 text-slate-900"><section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-9"><Link href="/persis-kepri/iuran" className="text-sm font-semibold text-emerald-800 underline">Kembali ke iuran anggota</Link><p className="mt-6 text-sm font-bold text-emerald-800">PW Persis Kepulauan Riau</p><h1 className="mt-2 text-3xl font-bold">Buat akun pencatatan iuran</h1><p className="mt-4 leading-7 text-slate-600">Sudah memiliki akun di website ini? Gunakan akun yang sama untuk masuk. Pembuatan akun tidak otomatis mengesahkan keanggotaan Persis.</p>
    {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-4 text-red-800">{error}</p>}{success && <p role="status" className="mt-5 rounded-lg bg-emerald-50 p-4 leading-7 text-emerald-900">Jika pendaftaran dapat diproses, tautan verifikasi dikirim ke email Anda. Periksa kotak masuk atau spam, lalu masuk untuk mencatat iuran. Jika sudah memiliki akun, langsung gunakan tombol Masuk.</p>}
    {!success && <form action={registerPersis} className="mt-6 grid gap-5"><label className="grid gap-2 text-sm font-semibold">Nama lengkap<input name="name" required minLength={2} maxLength={120} autoComplete="name" className="rounded-lg border border-slate-300 p-3 text-base font-normal"/></label><label className="grid gap-2 text-sm font-semibold">Email<input name="email" type="email" required maxLength={254} autoComplete="email" className="rounded-lg border border-slate-300 p-3 text-base font-normal"/></label><label className="grid gap-2 text-sm font-semibold">Kata sandi (minimal 8 karakter)<input name="password" type="password" required minLength={8} maxLength={128} autoComplete="new-password" className="rounded-lg border border-slate-300 p-3 text-base font-normal"/></label><button className="rounded-lg bg-emerald-800 px-5 py-3 font-bold text-white hover:bg-emerald-900">Buat akun</button></form>}
    <Link href="/login?next=%2Fpersis-kepri%2Fiuran" className="mt-6 inline-block font-semibold text-emerald-800 underline underline-offset-4">Masuk dengan akun yang sudah ada</Link>
  </section></div>;
}
