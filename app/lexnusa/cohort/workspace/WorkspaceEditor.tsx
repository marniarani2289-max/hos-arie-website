'use client';
import {useActionState,useState} from 'react';
import {stages,type Work} from '@/lib/lexnusa/cohort';
import {saveVersion} from './actions';
export default function WorkspaceEditor({initial}:{initial:Work}){
 const [work,setWork]=useState(initial),[consent,setConsent]=useState(false),[busy,setBusy]=useState(''),[error,setError]=useState(''),[suggestion,setSuggestion]=useState<{stage:keyof Work;output:string}|null>(null);
 const [state,action,pending]=useActionState(saveVersion,{message:''});
 async function generate(stage:keyof Work){
  setBusy(stage);setError('');setSuggestion(null);
  try{const res=await fetch('/api/lexnusa/cohort/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({stage,work,consent})});const data=await res.json();if(!res.ok)throw new Error(data.error||'Generasi belum berhasil.');setSuggestion({stage,output:data.output});}
  catch(e){setError(e instanceof Error?e.message:'Koneksi terputus. Periksa riwayat AI sebelum mencoba lagi.');}finally{setBusy('');}
 }
 return <form action={action} className="space-y-6"><div className="rounded-xl bg-amber-50 p-5"><label className="flex items-start gap-3"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1"/><span>Saya menggunakan data simulasi dan menyetujui pengiriman isi kelima tahap ke layanan AI untuk latihan. Hasil AI perlu diperiksa manusia. Maksimal 12 generasi per peserta dalam 24 jam.</span></label></div>
 {stages.map((s,i)=><section key={s.key} className="rounded-2xl border bg-white p-6"><p className="text-sm font-bold text-teal-700">Minggu {s.week} · {i+1}/5</p><label htmlFor={s.key} className="mt-2 block text-2xl font-bold">{s.title}</label><p id={`${s.key}-help`} className="my-3 leading-7 text-slate-600">{s.help}</p><textarea id={s.key} name={s.key} aria-describedby={`${s.key}-help`} rows={8} maxLength={20000} value={work[s.key]} onChange={e=>setWork({...work,[s.key]:e.target.value})} className="w-full rounded-xl border border-slate-400 p-4"/><button type="button" onClick={()=>generate(s.key)} disabled={!!busy||pending||!consent} className="mt-3 rounded-lg bg-teal-800 px-4 py-3 font-bold text-white disabled:opacity-40">{busy===s.key?'AI sedang bekerja…':`Bantu dengan AI: ${s.title}`}</button>
 {suggestion?.stage===s.key&&<div className="mt-4 rounded-xl bg-teal-50 p-5"><h3 className="font-bold">Usulan AI — tersimpan di riwayat</h3><p className="my-3 whitespace-pre-wrap break-words">{suggestion.output}</p><button type="button" onClick={()=>{setWork({...work,[s.key]:suggestion.output});setSuggestion(null);}} className="rounded-lg border border-teal-800 px-4 py-2">Gunakan usulan pada tahap ini</button><p className="mt-2 text-sm">Mengganti isi kolom. Simpan versi kerja setelah meninjau hasil.</p></div>}</section>)}
 {error&&<p role="alert" className="rounded-lg bg-red-50 p-4">{error}</p>}{state.message&&<p role="status" className="rounded-lg bg-teal-50 p-4">{state.message}</p>}
 <div className="flex flex-wrap gap-4"><button disabled={pending||!!busy} name="intent" value="save" className="rounded-xl border bg-white px-6 py-4 font-bold disabled:opacity-40">{pending?'Menyimpan…':'Simpan versi kerja'}</button><button disabled={pending||!!busy} name="intent" value="submit" className="rounded-xl bg-teal-800 px-6 py-4 font-bold text-white disabled:opacity-40">Kirim untuk review fasilitator</button></div></form>;
}
