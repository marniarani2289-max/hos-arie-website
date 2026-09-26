import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Due,STATUS } from '@/lib/persis/dues';
import DuesList,{Pagination} from '../DuesList';
import TreasuryNav from './TreasuryNav';

export const metadata:Metadata={title:'Verifikasi Iuran PW Persis Kepri',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default async function TreasurerPage({searchParams}:{searchParams:Promise<{page?:string;status?:string;period?:string;error?:string;success?:string}>}){
  const base='/persis-kepri/iuran/bendahara',supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)redirect(`/login?next=${encodeURIComponent(base)}`);
  const {data:allowed}=await supabase.from('persis_treasurers').select('user_id').eq('user_id',user.id).maybeSingle();
  if(!allowed)redirect('/persis-kepri/iuran');
  const params=await searchParams,page=Math.max(1,Math.min(10000,Number.parseInt(params.page||'1')||1));
  const status=['pending','verified','rejected','all'].includes(params.status||'')?params.status!:'pending';
  const period=/^(20[2-9]\d|2100)-(0[1-9]|1[0-2])$/.test(params.period||'')?params.period!:'';
  let query=supabase.from('persis_dues').select('id,user_id,member_name,member_number,region,period,amount,paid_on,method,note,status,review_note,reviewed_at,created_at',{count:'exact'});
  if(status!=='all')query=query.eq('status',status); if(period)query=query.eq('period',`${period}-01`);
  const {data,error,count}=await query.order('created_at',{ascending:false}).order('id',{ascending:false}).range((page-1)*20,page*20);
  const paginationBase=`${base}?status=${status}${period?`&period=${period}`:''}`;
  return <div lang="id" className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900"><div className="mx-auto max-w-4xl"><Link href="/persis-kepri/iuran" className="text-sm font-semibold text-emerald-800 underline">Kembali ke iuran anggota</Link><p className="mt-6 text-sm font-bold uppercase tracking-widest text-emerald-800">Ruang bendahara · PW Persis Kepri</p><h1 className="mt-2 text-3xl font-bold">Verifikasi pembayaran iuran</h1><p className="mt-3 leading-7 text-slate-600">Periksa catatan dan unduh bukti pembayaran anggota. Verifikasi setelah dana cocok dengan penerimaan kas atau rekening.</p>
    <TreasuryNav/>
    {params.error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-red-800">{params.error}</p>}{params.success && <p role="status" className="mt-5 rounded-xl bg-emerald-50 p-4 text-emerald-900">Keputusan verifikasi berhasil disimpan.</p>}
    <form className="my-7 flex flex-wrap items-end gap-4 rounded-xl border border-slate-200 bg-white p-5"><label className="grid gap-2 text-sm font-semibold">Status<select name="status" defaultValue={status} className="rounded-lg border border-slate-300 p-3 text-base font-normal"><option value="all">Semua status</option>{Object.entries(STATUS).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label><label className="grid gap-2 text-sm font-semibold">Bulan iuran (opsional)<input name="period" type="month" min="2020-01" max="2100-12" defaultValue={period} className="rounded-lg border border-slate-300 p-3 text-base font-normal"/></label><button className="rounded-lg bg-emerald-800 px-5 py-3 font-bold text-white">Tampilkan</button></form>
    {error?<p role="alert" className="rounded-lg bg-red-50 p-5 text-red-800">Data belum dapat dimuat. Silakan muat ulang halaman.</p>:<><p className="mb-4 text-sm text-slate-600">{count||0} catatan sesuai filter · maksimal 20 per halaman</p><DuesList rows={(data||[]).slice(0,20) as Due[]} treasurer/><Pagination page={page} hasNext={(data?.length||0)>20} base={paginationBase}/></>}
  </div></div>;
}
