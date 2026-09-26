import Link from 'next/link';
import { Due, monthLabel, rupiah, STATUS } from '@/lib/persis/dues';
import { reviewDue } from './actions';

const colors={pending:'bg-amber-50 text-amber-900',verified:'bg-emerald-50 text-emerald-900',rejected:'bg-red-50 text-red-800'};
export default function DuesList({rows,treasurer=false}:{rows:Due[];treasurer?:boolean}){
  if(!rows.length) return <p className="rounded-xl border border-dashed border-slate-300 bg-white p-7 leading-7 text-slate-600">{treasurer?'Belum ada catatan yang sesuai dengan filter ini.':'Belum ada catatan iuran. Setelah membayar, isi formulir dan unggah bukti pembayaran.'}</p>;
  return <div className="space-y-4">{rows.map(row=><article key={row.id} className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="text-xl font-bold">{monthLabel(row.period)}</h3><p className="mt-1 text-lg font-semibold text-emerald-900">{rupiah(row.amount)}</p></div><span className={`rounded-full px-3 py-1 text-sm font-semibold ${colors[row.status]}`}>{STATUS[row.status]}</span></div>
    <p className="mt-4 font-semibold">{row.member_name} · {row.region}</p>
    {row.member_number && <p className="mt-1 text-sm text-slate-600">Nomor anggota: {row.member_number}</p>}
    <p className="mt-2 text-sm leading-6 text-slate-600">Dibayar {new Intl.DateTimeFormat('id-ID',{dateStyle:'long',timeZone:'UTC'}).format(new Date(`${row.paid_on}T00:00:00Z`))} · {row.method==='transfer'?'Transfer bank':row.method==='tunai'?'Tunai':'Lainnya'}</p>
    {row.note && <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">Catatan anggota: {row.note}</p>}
    <a href={`/api/persis/dues/${row.id}/receipt`} className="mt-4 inline-flex rounded-lg border border-emerald-700 px-4 py-2 text-sm font-bold text-emerald-900 hover:bg-emerald-50">Unduh bukti pembayaran</a>
    {row.reviewed_at && <p className="mt-4 text-sm text-slate-600">Diperiksa {new Intl.DateTimeFormat('id-ID',{dateStyle:'long',timeStyle:'short',timeZone:'Asia/Jakarta'}).format(new Date(row.reviewed_at))} WIB</p>}
    {row.review_note && <p className="mt-2 whitespace-pre-wrap break-words rounded-lg bg-slate-50 p-3 text-sm leading-6"><strong>Catatan bendahara:</strong> {row.review_note}</p>}
    {!treasurer && row.status==='rejected' && <p className="mt-3 text-sm leading-6 text-red-800">Periksa catatan bendahara, lalu kirim pengajuan baru untuk bulan yang sama dengan informasi dan bukti yang benar. Riwayat ini tetap tersimpan.</p>}
    {treasurer && row.status==='pending' && <form action={reviewDue} className="mt-5 space-y-3 border-t border-slate-200 pt-5"><input type="hidden" name="id" value={row.id}/><label className="grid gap-2 text-sm font-semibold">Catatan verifikasi<textarea name="review_note" maxLength={500} rows={2} className="rounded-lg border border-slate-300 p-3 text-base font-normal" placeholder="Wajib diisi jika meminta perbaikan"/></label><p className="text-sm leading-6 text-slate-600">Cocokkan bukti dengan penerimaan kas/rekening sebelum memverifikasi. Keputusan disimpan sebagai riwayat.</p><div className="flex flex-wrap gap-3"><button name="status" value="verified" className="rounded-lg bg-emerald-800 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-900">Verifikasi pembayaran</button><button name="status" value="rejected" className="rounded-lg border border-red-300 px-4 py-3 text-sm font-bold text-red-800 hover:bg-red-50">Minta perbaikan</button></div></form>}
  </article>)}</div>;
}
export function Pagination({page,hasNext,base}:{page:number;hasNext:boolean;base:string}){
  return <nav aria-label="Halaman riwayat" className="mt-5 flex items-center justify-between gap-3 text-sm">{page>1?<Link className="rounded-lg border border-slate-300 px-4 py-2" href={`${base}${base.includes('?')?'&':'?'}page=${page-1}`}>Sebelumnya</Link>:<span/>}<span>Halaman {page}</span>{hasNext?<Link className="rounded-lg border border-slate-300 px-4 py-2" href={`${base}${base.includes('?')?'&':'?'}page=${page+1}`}>Berikutnya</Link>:<span/>}</nav>;
}
