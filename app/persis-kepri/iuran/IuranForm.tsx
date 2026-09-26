'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MAX_RECEIPT, REGIONS } from '@/lib/persis/dues';

const input='w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-base font-normal text-slate-900 focus:border-emerald-700 focus:outline-2 focus:outline-emerald-700';
export default function IuranForm({name,today}:{name:string;today:string}) {
  const router=useRouter();
  const [busy,setBusy]=useState(false),[error,setError]=useState(''),[success,setSuccess]=useState('');
  async function submit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault(); if(busy)return;
    const form=event.currentTarget, data=new FormData(form), receipt=data.get('receipt');
    setError('');setSuccess('');
    if(!(receipt instanceof File) || !receipt.size || receipt.size>MAX_RECEIPT){setError('Pilih bukti pembayaran JPG, PNG, atau PDF, maksimal 3 MB.');return;}
    setBusy(true);
    try{
      const response=await fetch('/api/persis/dues',{method:'POST',body:data});
      const result=await response.json().catch(()=>({error:'Respons belum dapat dibaca. Periksa riwayat sebelum mencoba kembali.'}));
      if(!response.ok) throw new Error(result.error || 'Catatan belum berhasil disimpan.');
      setSuccess('Iuran berhasil dicatat. Bukti tersimpan dan menunggu verifikasi bendahara.');
      form.reset();router.refresh();
    }catch(err){setError(err instanceof Error?err.message:'Koneksi terputus. Periksa riwayat sebelum mencoba kembali.');}
    finally{setBusy(false);}
  }
  return <form onSubmit={submit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
    <div><h2 className="text-2xl font-bold">Catat pembayaran</h2><p className="mt-2 text-sm leading-6 text-slate-600">Bayarkan iuran melalui kanal yang disepakati pengurus, kemudian kirim catatannya di sini. Satu pengajuan untuk satu bulan iuran.</p></div>
    {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">{error}</p>}
    {success && <p role="status" className="rounded-lg bg-emerald-50 p-4 text-emerald-900">{success}</p>}
    <fieldset disabled={busy} className="grid gap-5 disabled:opacity-60">
      <label className="grid gap-2 text-sm font-semibold">Nama anggota<input name="member_name" required minLength={2} maxLength={120} defaultValue={name} autoComplete="name" className={input}/></label>
      <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Nomor anggota / KTA (opsional)<input name="member_number" maxLength={60} className={input}/></label><label className="grid gap-2 text-sm font-semibold">Daerah<select name="region" required defaultValue="" className={input}><option value="" disabled>Pilih daerah</option>{REGIONS.map(r=><option key={r}>{r}</option>)}</select></label></div>
      <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Bulan iuran<input type="month" name="period" required min="2020-01" max="2100-12" defaultValue={today.slice(0,7)} className={input}/></label><label className="grid gap-2 text-sm font-semibold">Nominal dibayar (Rp)<input type="number" name="amount" required min={1} max={100000000} step={1} inputMode="numeric" placeholder="Isi sesuai pembayaran" className={input}/></label></div>
      <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Tanggal pembayaran<input type="date" name="paid_on" required min="2020-01-01" max={today} defaultValue={today} className={input}/></label><label className="grid gap-2 text-sm font-semibold">Metode pembayaran<select name="method" defaultValue="transfer" className={input}><option value="transfer">Transfer bank</option><option value="tunai">Tunai</option><option value="lainnya">Lainnya</option></select></label></div>
      <label className="grid gap-2 text-sm font-semibold">Bukti pembayaran<input type="file" name="receipt" required accept="image/jpeg,image/png,application/pdf" aria-describedby="receipt-help" className={`${input} file:mr-3 file:rounded-md file:border-0 file:bg-emerald-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-emerald-900`}/><span id="receipt-help" className="text-sm font-normal leading-6 text-slate-600">JPG, PNG, atau PDF · maksimal 3 MB. Untuk tunai, unggah foto kuitansi. Bukti hanya dapat diakses oleh Anda dan bendahara.</span></label>
      <label className="grid gap-2 text-sm font-semibold">Catatan (opsional)<textarea name="note" maxLength={500} rows={3} placeholder="Misalnya nama pengirim berbeda dengan nama anggota" className={input}/></label>
      <button type="submit" className="rounded-lg bg-emerald-800 px-5 py-3 font-bold text-white hover:bg-emerald-900 disabled:cursor-wait" disabled={busy}>{busy?'Mengunggah dan menyimpan…':'Kirim catatan & bukti'}</button>
    </fieldset>
  </form>;
}
