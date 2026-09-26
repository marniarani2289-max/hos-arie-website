import type {Metadata} from 'next';
import {requireTreasurer,loadBilling} from '@/lib/persis/master-server';
import {jakartaDate,REGIONS} from '@/lib/persis/dues';
import BillingReport from '../../BillingReport';
import TreasuryNav from '../TreasuryNav';
export const metadata:Metadata={title:'Rekap Tunggakan Persis Kepri',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default async function ArrearsPage({searchParams}:{searchParams:Promise<{year?:string;region?:string;search?:string}>}){
 const {client}=await requireTreasurer();const p=await searchParams,today=jakartaDate(),current=Number(today.slice(0,4)),year=Math.max(2020,Math.min(current,Number.parseInt(p.year||'')||current));
 let result:Awaited<ReturnType<typeof loadBilling>>|null=null,message='';try{result=await loadBilling(client,year);}catch(e){message=e instanceof Error?e.message:'Data belum dapat dimuat.';}
 const search=(p.search||'').trim().slice(0,100),region=REGIONS.some(r=>r===p.region)?p.region:'';
 const members=(result?.members||[]).filter(m=>(!region||m.region===region)&&(!search||m.full_name.toLocaleLowerCase('id').includes(search.toLocaleLowerCase('id'))));
 const unmapped=result?.payments.filter(payment=>!result?.members.some(m=>m.user_id===payment.user_id)).length||0;
 return <div lang="id" className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold">Rekap kewajiban & tunggakan</h1><TreasuryNav/><form className="mb-6 flex flex-wrap items-end gap-4 rounded-xl border border-slate-200 bg-white p-5"><label className="grid gap-2 text-sm font-semibold">Tahun<input name="year" type="number" min={2020} max={current} defaultValue={year} className="w-28 rounded-lg border border-slate-300 p-3 text-base"/></label><label className="grid gap-2 text-sm font-semibold">Daerah<select name="region" defaultValue={region} className="rounded-lg border border-slate-300 p-3 text-base"><option value="">Semua daerah</option>{REGIONS.map(r=><option key={r}>{r}</option>)}</select></label><label className="grid gap-2 text-sm font-semibold">Nama anggota<input name="search" maxLength={100} defaultValue={search} className="rounded-lg border border-slate-300 p-3 text-base"/></label><button className="rounded-lg bg-emerald-800 px-5 py-3 font-bold text-white">Tampilkan</button></form>
 {unmapped>0&&<p className="mb-5 rounded-xl bg-amber-50 p-4 leading-7 text-amber-950">Ada {unmapped} catatan pembayaran pada tahun yang dipilih yang belum terhubung ke master anggota. Tambahkan anggota dengan email akun yang sama agar pembayaran masuk rekap.</p>}
 {message?<p role="alert" className="rounded-xl bg-red-50 p-5 text-red-800">{message} Muat ulang halaman; ringkasan tidak ditampilkan agar tidak terbaca sebagai nol.</p>:result&&<BillingReport members={members} rates={result.rates} payments={result.payments} year={year} today={today}/>}
 </div></div>;
}
