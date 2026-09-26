import type {Metadata} from 'next';
import {requireTreasurer} from '@/lib/persis/master-server';
import {REGIONS,jakartaDate} from '@/lib/persis/dues';
import type {Member} from '@/lib/persis/billing';
import {saveMember} from '../master-actions';
import TreasuryNav from '../TreasuryNav';
import {Pagination} from '../../DuesList';

export const metadata:Metadata={title:'Master Anggota Persis Kepri',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
const input='w-full rounded-lg border border-slate-300 bg-white p-3 text-base font-normal';
function MemberForm({member}:{member?:Member}){return <form action={saveMember} className="grid gap-4">
 <input type="hidden" name="id" value={member?.id||''}/><input type="hidden" name="version" value={member?.updated_at||''}/>
 <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Nama lengkap<input name="full_name" required minLength={2} maxLength={120} defaultValue={member?.full_name} className={input}/></label><label className="grid gap-2 text-sm font-semibold">Nomor anggota / KTA (opsional)<input name="member_number" maxLength={60} defaultValue={member?.member_number} className={input}/></label></div>
 <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Email akun anggota (opsional)<input name="email" type="email" maxLength={254} readOnly={!!member?.user_id} defaultValue={member?.email||''} className={input}/><span className="text-sm font-normal text-slate-600">{member?.user_id?'Sudah terhubung dengan akun; email dikunci.':'Gunakan email yang sama dengan akun website agar pembayaran dapat dicocokkan.'}</span></label><label className="grid gap-2 text-sm font-semibold">Daerah<select name="region" required defaultValue={member?.region||''} className={input}><option value="" disabled>Pilih daerah</option>{REGIONS.map(r=><option key={r}>{r}</option>)}</select></label></div>
 <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Mulai wajib iuran (opsional)<input name="start_month" type="month" min="2020-01" max="2100-12" defaultValue={member?.start_month?.slice(0,7)||''} className={input}/></label><label className="grid gap-2 text-sm font-semibold">Bulan terakhir wajib (opsional)<input name="end_month" type="month" min="2020-01" max="2100-12" defaultValue={member?.end_month?.slice(0,7)||''} className={input}/></label></div>
 <p className="text-sm leading-6 text-slate-600">Tanpa bulan mulai, kewajiban belum dihitung. Bulan terakhir masih dihitung; kosongkan bila kewajiban berlanjut. Perubahan masa wajib akan menghitung ulang rekap dan dicatat dalam riwayat perubahan.</p>
 <label className="grid gap-2 text-sm font-semibold">Catatan administrasi (opsional)<textarea name="note" rows={2} maxLength={500} defaultValue={member?.note} className={input}/></label>
 <button className="rounded-lg bg-emerald-800 px-5 py-3 font-bold text-white">{member?'Simpan perubahan':'Tambahkan anggota'}</button>
 </form>;}
export default async function MembersPage({searchParams}:{searchParams:Promise<{page?:string;search?:string;error?:string;success?:string}>}){
 const {client}=await requireTreasurer();const p=await searchParams,page=Math.max(1,Number.parseInt(p.page||'1')||1),search=(p.search||'').slice(0,100).replace(/[%_]/g,'');
 let query=client.from('persis_members').select('*',{count:'exact'});if(search)query=query.ilike('full_name',`%${search}%`);
 const {data,error,count}=await query.order('full_name').order('id').range((page-1)*20,page*20);
 const today=jakartaDate().slice(0,7);
 return <div lang="id" className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900"><div className="mx-auto max-w-5xl"><h1 className="text-3xl font-bold">Master anggota</h1><p className="mt-3 leading-7 text-slate-600">Daftar resmi anggota dan masa kewajiban iuran. Anggota tanpa akun tetap dapat didaftarkan.</p><TreasuryNav/>
 {p.error&&<p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-red-800">{p.error}</p>}{p.success&&<p role="status" className="mb-5 rounded-xl bg-emerald-50 p-4 text-emerald-900">Data anggota berhasil disimpan.</p>}
 <details className="rounded-xl border border-emerald-200 bg-white p-5" open={!count}><summary className="cursor-pointer text-xl font-bold text-emerald-900">Tambah anggota</summary><div className="mt-5"><MemberForm/></div></details>
 <form className="my-6 flex flex-wrap gap-3"><label className="flex-1 text-sm font-semibold">Cari nama<input name="search" defaultValue={search} className={`${input} mt-2`}/></label><button className="self-end rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold">Cari</button></form>
 {error?<p role="alert">Data belum dapat dimuat. Coba muat ulang.</p>:<><p className="mb-4 text-sm text-slate-600">{count||0} anggota sesuai pencarian</p>{!(data?.length)&&<p className="rounded-xl border border-dashed border-slate-300 p-6">Belum ada anggota. Tambahkan data anggota untuk mulai menghitung kewajiban.</p>}<div className="space-y-4">{(data||[]).slice(0,20).map((m:Member)=><details key={m.id} className="rounded-xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer"><strong>{m.full_name}</strong><span className="ml-3 text-sm text-slate-600">{m.region} · {!m.start_month?'Belum ditetapkan':m.start_month.slice(0,7)>today?'Belum mulai':m.end_month&&m.end_month.slice(0,7)<today?'Masa wajib berakhir':'Aktif wajib iuran'}</span><p className="mt-2 text-sm text-slate-600">{m.user_id?'Akun terhubung':m.email?'Menunggu akun terverifikasi / login':'Belum ada email akun'}</p></summary><div className="mt-5 border-t border-slate-100 pt-5"><MemberForm member={m}/></div></details>)}</div><Pagination page={page} hasNext={(data?.length||0)>20} base={`/persis-kepri/iuran/bendahara/anggota?search=${encodeURIComponent(search)}`}/></>}
 </div></div>;
}
