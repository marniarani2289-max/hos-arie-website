'use client';
import {useState,type FormEvent} from 'react';
import {useRouter} from 'next/navigation';
export default function DocumentForm({programId}:{programId:string}){
 const router=useRouter(),[busy,setBusy]=useState(false),[message,setMessage]=useState(''),[error,setError]=useState('');
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();if(busy)return;setBusy(true);setMessage('');setError('');const form=e.currentTarget;
  try{const r=await fetch(`/api/persis/program/${programId}/documents`,{method:'POST',body:new FormData(form)}),data=await r.json();if(!r.ok)throw new Error(data.error||'Dokumen belum tersimpan.');form.reset();setMessage('Dokumen berhasil diunggah.');router.refresh();}catch(e){setError(e instanceof Error?e.message:'Unggahan gagal. Coba kembali.');}finally{setBusy(false);}}
 return <form onSubmit={submit} className="mt-5 grid gap-4"><label className="grid gap-2 text-sm font-semibold">Keterangan dokumentasi<input name="caption" required minLength={3} maxLength={300} placeholder="Contoh: Laporan kegiatan dan daftar hadir" className="rounded-lg border border-slate-300 p-3"/></label><label className="grid gap-2 text-sm font-semibold">Foto atau dokumen<input name="file" type="file" required accept="image/jpeg,image/png,application/pdf" className="rounded-lg border border-slate-300 p-3"/><span className="font-normal text-slate-600">JPG, PNG, atau PDF maksimal 3 MB per berkas. Akses khusus bendahara.</span></label>{error&&<p role="alert" className="text-red-800">{error}</p>}{message&&<p role="status" className="text-emerald-800">{message}</p>}<button disabled={busy} className="rounded-lg bg-emerald-800 px-5 py-3 font-bold text-white disabled:opacity-60">{busy?'Mengunggah…':'Unggah dokumentasi'}</button></form>;
}
