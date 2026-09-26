'use client';
import type {ProgramOption} from '@/lib/persis/program';
import {useState,type FormEvent} from 'react';
import {CASH_BASE,CATEGORIES,METHODS} from '@/lib/persis/cash';
const input='w-full rounded-lg border border-slate-300 bg-white p-3 text-base font-normal';
export default function CashForm({id,today,startDate,programs}:{id:string;today:string;startDate:string;programs:ProgramOption[]}){
 const [kind,setKind]=useState<'expense'|'income'>('expense'),[busy,setBusy]=useState(false),[error,setError]=useState(''),[date,setDate]=useState(today);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(busy)return;setBusy(true);setError('');const form=new FormData(event.currentTarget);
  try{
   const response=await fetch('/api/persis/cash',{method:'POST',body:form});const data=await response.json();
   if(!response.ok||!data.ok)throw new Error(data.error||'Transaksi belum tersimpan.');
   window.location.assign(`${CASH_BASE}?month=${String(form.get('transacted_on')).slice(0,7)}&success=entry`);
  }catch(e){setError(e instanceof Error?e.message:'Koneksi terputus. Periksa buku kas sebelum mencoba kembali.');setBusy(false);}
 }
 return <form onSubmit={submit} className="mt-5 grid gap-5"><input type="hidden" name="id" value={id}/>
  <fieldset disabled={busy} className="grid gap-5 sm:grid-cols-2">
   <label className="grid gap-2 text-sm font-semibold">Jenis transaksi<select name="kind" value={kind} onChange={e=>setKind(e.target.value as 'income'|'expense')} className={input}><option value="expense">Pengeluaran</option><option value="income">Pemasukan selain iuran</option></select></label>
   <label className="grid gap-2 text-sm font-semibold">Tanggal transaksi<input name="transacted_on" type="date" min={startDate} max={today} value={date} onChange={e=>setDate(e.target.value)} required className={input}/></label>
   <label className="grid gap-2 text-sm font-semibold">Kategori<select key={kind} name="category" required className={input}>{CATEGORIES[kind].map(c=><option key={c}>{c}</option>)}</select></label>
   <label className="grid gap-2 text-sm font-semibold">Nominal (Rp, tanpa titik)<input name="amount" type="number" inputMode="numeric" min="1" max="10000000000" step="1" required placeholder="Contoh: 250000" className={input}/></label>
   <label className="grid gap-2 text-sm font-semibold">{kind==='expense'?'Penerima dana':'Pemberi dana'}<input name="party" minLength={2} maxLength={160} required className={input}/></label>
   <label className="grid gap-2 text-sm font-semibold">Metode<select name="method" className={input}>{Object.entries(METHODS).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
   {kind==='expense'&&<label className="grid gap-2 text-sm font-semibold sm:col-span-2">Tautkan ke anggaran program (opsional)<select key={date.slice(0,4)} name="program_id" className={input}><option value="">Belum ditautkan / pengeluaran umum</option>{programs.filter(p=>p.year===Number(date.slice(0,4))).map(p=><option key={p.id} value={p.id}>{p.year} · {p.title}</option>)}</select><span className="font-normal text-slate-600">Seluruh nominal masuk ke satu program dalam tahun yang sama. Bisa ditautkan kemudian melalui menu Program & anggaran.</span></label>}
   <label className="grid gap-2 text-sm font-semibold sm:col-span-2">Keterangan kegiatan (opsional)<input name="activity" maxLength={160} placeholder="Contoh: Pembinaan dai wilayah" className={input}/></label>
   <label className="grid gap-2 text-sm font-semibold sm:col-span-2">Uraian transaksi<textarea name="description" minLength={3} maxLength={500} required rows={3} className={input}/></label>
   <label className="grid gap-2 text-sm font-semibold sm:col-span-2">Bukti transaksi<input name="receipt" type="file" accept="image/jpeg,image/png,application/pdf" required className={input}/><span className="font-normal text-slate-600">JPG, PNG, atau PDF, maksimal 3 MB. Untuk tunai, unggah foto kuitansi. Bukti hanya dapat dibuka bendahara.</span></label>
  </fieldset>
  {error&&<p role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">{error}</p>}
  <p className="text-sm leading-6 text-slate-600">Pastikan transaksi sesuai kas/rekening. Setelah tersimpan, koreksi dilakukan dengan pembatalan beralasan lalu pencatatan baru.</p>
  <button disabled={busy} className="rounded-lg bg-emerald-800 px-5 py-3 font-bold text-white disabled:opacity-60">{busy?'Menyimpan transaksi…':'Simpan transaksi dan bukti'}</button>
 </form>;
}
