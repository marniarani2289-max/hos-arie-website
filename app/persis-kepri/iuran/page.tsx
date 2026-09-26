import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Due, jakartaDate } from '@/lib/persis/dues';
import IuranForm from './IuranForm';
import DuesList,{Pagination} from './DuesList';
import {signOutPersis} from './actions';

export const metadata:Metadata={title:'Iuran Anggota PW Persis Kepri',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default async function MemberDues({searchParams}:{searchParams:Promise<{page?:string}>}){
  const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser();
  const {page:requestedPage}=await searchParams; const page=Math.max(1,Math.min(10000,Number.parseInt(requestedPage||'1')||1));
  const [history,role]=user?await Promise.all([
    supabase.from('persis_dues').select('id,user_id,member_name,member_number,region,period,amount,paid_on,method,note,status,review_note,reviewed_at,created_at').eq('user_id',user.id).order('created_at',{ascending:false}).order('id',{ascending:false}).range((page-1)*20,page*20),
    supabase.from('persis_treasurers').select('user_id').eq('user_id',user.id).maybeSingle(),
  ]):[null,null];
  return <div lang="id" className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 sm:px-8"><div className="mx-auto max-w-6xl">
    <Link href="/persis-kepri" className="text-sm font-semibold text-emerald-800 underline underline-offset-4">Program kerja PW Persis Kepri</Link>
    <div className="mt-6 flex flex-wrap items-start justify-between gap-5"><div><p className="text-sm font-bold uppercase tracking-widest text-emerald-800">PW Persatuan Islam · Kepulauan Riau</p><h1 className="mt-2 text-3xl font-bold sm:text-4xl">Iuran anggota</h1><p className="mt-3 max-w-2xl leading-7 text-slate-600">Catat pembayaran bulanan, unggah bukti, dan pantau hasil verifikasi bendahara.</p></div>{user && <form action={signOutPersis}><button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">Keluar akun</button></form>}</div>
    {!user?<section className="mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"><h2 className="text-2xl font-bold">Masuk untuk mencatat iuran</h2><p className="mt-3 leading-7 text-slate-600">Gunakan akun website yang sudah dimiliki, atau buat akun untuk pencatatan iuran. Riwayat dan bukti pembayaran hanya tersedia bagi pemilik akun dan bendahara.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/login?next=%2Fpersis-kepri%2Fiuran" className="rounded-lg bg-emerald-800 px-5 py-3 font-bold text-white">Masuk</Link><Link href="/persis-kepri/daftar" className="rounded-lg border border-emerald-800 px-5 py-3 font-bold text-emerald-900">Buat akun anggota</Link></div></section>:<>
      <div className="my-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4"><p className="break-all text-sm text-emerald-950">Masuk sebagai <strong>{user.email}</strong></p>{role?.data && <Link href="/persis-kepri/iuran/bendahara" className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white">Buka ruang bendahara</Link>}</div>
      <Link href="/persis-kepri/iuran/kewajiban" className="mb-6 inline-block rounded-lg border border-emerald-700 bg-white px-5 py-3 font-semibold text-emerald-900">Lihat kewajiban & tunggakan saya</Link>
      <div className="grid items-start gap-8 lg:grid-cols-2"><IuranForm name={String(user.user_metadata?.full_name||'')} today={jakartaDate()}/><section aria-labelledby="history"><h2 id="history" className="mb-4 text-2xl font-bold">Riwayat iuran saya</h2>{history?.error?<p role="alert" className="rounded-xl bg-red-50 p-5 text-red-800">Riwayat belum dapat dimuat. Muat ulang halaman sebelum mengirim catatan baru.</p>:<><DuesList rows={(history?.data||[]).slice(0,20) as Due[]}/><Pagination page={page} hasNext={(history?.data?.length||0)>20} base="/persis-kepri/iuran"/></>}</section></div>
    </>}
  </div></div>;
}
