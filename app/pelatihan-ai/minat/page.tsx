import Link from 'next/link';
import { randomUUID } from 'node:crypto';
import { audiences, topics, levels, formats } from '@/lib/training-assistant/model';
import { submitInterest } from './actions';
export const dynamic='force-dynamic';
export const metadata={title:'Formulir Minat Pelatihan AI untuk Guru'};
const field='mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-base text-slate-950 focus:outline-2 focus:outline-teal-700';
export default async function InterestPage({searchParams}:{searchParams:Promise<{result?:string;error?:string}>}) {
 const query=await searchParams;
 return <main lang="id" className="min-h-screen bg-slate-50 px-5 py-12 text-slate-950"><div className="mx-auto max-w-3xl">
 <Link href="/pelatihan-ai" className="text-teal-800 underline">Kembali ke program pelatihan</Link>
 <p className="mt-8 font-semibold uppercase tracking-widest text-teal-800">Pelatihan AI untuk Guru</p><h1 className="mt-3 text-4xl font-bold">Ceritakan kebutuhan Anda</h1><p className="mt-4 text-lg leading-8 text-slate-600">Untuk guru, sekolah, madrasah, dan komunitas yang ingin berdiskusi tentang pelatihan. Pengelola akan meninjau kebutuhan sebelum mengonfirmasi program.</p>
 {query.result==='received' ? <section role="status" className="mt-8 rounded-2xl border border-teal-200 bg-teal-50 p-8"><h2 className="text-2xl font-bold">Minat Anda sudah tercatat</h2><p className="mt-3 leading-7">Terima kasih. Pengelola akan memeriksa kebutuhan dan menghubungi Anda melalui kontak yang diberikan. Ini belum merupakan konfirmasi tempat, jadwal, atau pendaftaran final.</p><Link className="mt-5 inline-block underline" href="/pelatihan-ai">Lihat program</Link></section> : <>
 {query.error && <p role="alert" className="mt-6 rounded-xl bg-red-50 p-4 text-red-800">{query.error==='invalid'?'Periksa isian, pilih sedikitnya satu kebutuhan, dan centang persetujuan.':query.error==='rate'?'Terlalu banyak pengiriman. Coba kembali dalam 15 menit.':'Data belum berhasil disimpan. Silakan coba lagi atau hubungi riesib8@gmail.com.'}</p>}
 <form action={submitInterest} className="mt-8 space-y-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-9">
 <input type="hidden" name="request_key" value={randomUUID()}/><div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
 <fieldset><legend className="text-xl font-bold">Identitas dan kontak</legend><div className="mt-4 grid gap-5 sm:grid-cols-2"><label>Nama lengkap *<input className={field} name="name" autoComplete="name" required minLength={2} maxLength={120}/></label><label>Email *<input className={field} name="email" type="email" autoComplete="email" required maxLength={254}/></label><label>Nomor WhatsApp (opsional)<input className={field} name="phone" type="tel" autoComplete="tel" maxLength={30}/></label><label>Sekolah / organisasi<input className={field} name="organization" maxLength={180}/></label></div><p className="mt-3 text-sm text-slate-600">Nama organisasi wajib untuk pengajuan sekolah atau komunitas.</p></fieldset>
 <label className="block">Mengajukan minat sebagai *<select name="audience" className={field}>{audiences.map(x=><option key={x}>{x}</option>)}</select></label>
 <fieldset><legend className="text-xl font-bold">Kebutuhan pelatihan *</legend><p className="mt-2 text-sm text-slate-600">Pilih satu atau lebih.</p><div className="mt-3 grid gap-3 sm:grid-cols-2">{topics.map(x=><label key={x} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4"><input type="checkbox" name="topics" value={x} className="h-5 w-5 accent-teal-700"/>{x}</label>)}</div></fieldset>
 <div className="grid gap-5 sm:grid-cols-2"><label>Pengalaman menggunakan AI<select name="level" className={field}>{levels.map(x=><option key={x}>{x}</option>)}</select></label><label>Format yang diinginkan<select name="format" className={field}>{formats.map(x=><option key={x}>{x}</option>)}</select></label><label>Perkiraan jumlah peserta *<input name="participants" className={field} type="number" min={1} max={10000} defaultValue={1} required/></label><label>Preferensi waktu<input name="timing" className={field} placeholder="Contoh: akhir pekan bulan November" maxLength={200}/></label></div>
 <label className="block">Kebutuhan khusus / tujuan pelatihan<textarea name="message" className={field} rows={4} maxLength={3000} placeholder="Misalnya membuat bahan ajar IPA kelas VII. Hindari data pribadi siswa."/></label>
 <label className="flex items-start gap-3 text-sm leading-6"><input className="mt-1 h-5 w-5 shrink-0 accent-teal-700" type="checkbox" name="consent" value="accepted" required/>Saya menyetujui penyimpanan data ini oleh pengelola untuk menilai kebutuhan dan menghubungi saya terkait pelatihan. Permintaan koreksi, penghapusan, atau penghentian kontak dapat disampaikan ke riesib8@gmail.com.</label>
 <button className="min-h-12 rounded-xl bg-teal-800 px-6 py-3 font-bold text-white hover:bg-teal-900">Kirim minat pelatihan</button>
 </form></>}
 </div></main>;
}
