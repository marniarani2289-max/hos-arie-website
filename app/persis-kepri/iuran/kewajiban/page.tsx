import type {Metadata} from 'next';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {createClient} from '@/lib/supabase/server';
import {linkCurrentMember,loadBilling} from '@/lib/persis/master-server';
import {jakartaDate} from '@/lib/persis/dues';
import BillingReport from '../BillingReport';
export const metadata:Metadata={title:'Kewajiban Iuran Saya',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default async function MyBills({searchParams}:{searchParams:Promise<{year?:string}>}){
 const client=await createClient();const {data:{user}}=await client.auth.getUser();if(!user)redirect('/login?next=%2Fpersis-kepri%2Fiuran%2Fkewajiban');
 const p=await searchParams,today=jakartaDate(),current=Number(today.slice(0,4)),year=Math.max(2020,Math.min(current,Number.parseInt(p.year||'')||current));
 let result:Awaited<ReturnType<typeof loadBilling>>|null=null,message='';try{await linkCurrentMember();result=await loadBilling(client,year,user.id);}catch(e){message=e instanceof Error?e.message:'Data belum dapat dimuat.';}
 return <div lang="id" className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900"><div className="mx-auto max-w-6xl"><Link href="/persis-kepri/iuran" className="font-semibold text-emerald-800 underline">Kembali ke pencatatan iuran</Link><h1 className="mt-5 text-3xl font-bold">Kewajiban iuran saya</h1><form className="my-6 flex items-end gap-3"><label className="grid gap-2 text-sm font-semibold">Tahun<input name="year" type="number" min={2020} max={current} defaultValue={year} className="w-28 rounded-lg border border-slate-300 p-3 text-base"/></label><button className="rounded-lg bg-emerald-800 px-5 py-3 font-bold text-white">Tampilkan</button></form>
 {message?<p role="alert" className="rounded-xl bg-red-50 p-5 text-red-800">{message}</p>:!result?.members.length?<p className="rounded-xl border border-amber-200 bg-amber-50 p-5 leading-7 text-amber-950">Akun Anda belum terhubung dengan master anggota. Silakan <Link href="/persis-kepri/pendaftaran" className="font-bold underline">daftarkan data anggota atau lihat status pengajuan</Link>. Kewajiban belum ditampilkan; Anda tetap dapat mencatat pembayaran.</p>:<BillingReport members={result.members} rates={result.rates} payments={result.payments} year={year} today={today}/>}
 </div></div>;
}
