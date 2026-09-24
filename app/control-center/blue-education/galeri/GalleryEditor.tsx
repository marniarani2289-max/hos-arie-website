"use client";
import { startTransition, useActionState, useEffect, useState } from "react";
import { galleryFields, galleryKinds, galleryStatuses, focusOptions } from "@/lib/blue-education/gallery";
import type { GalleryRecord, GalleryState } from "@/lib/blue-education/gallery";
import { saveGallery } from "./actions";
export default function GalleryEditor({initial}:{initial?:GalleryRecord}){
 const [ready,setReady]=useState(false);
 useEffect(()=>{setReady(true);},[]);
 const [state,action,pending]=useActionState<GalleryState,FormData>(saveGallery,{ok:false,message:""});
 const [values,setValues]=useState<Record<string,string>>(()=>{const fields:Record<string,string>={status:"draft",kind:"praktik"};if(initial)for(const [name,value] of Object.entries(initial))if(typeof value==="string")fields[name]=value;return fields;});
 const [confirmed,setConfirmed]=useState(initial?.publication_confirmed||false);
 const field="mt-2 block w-full rounded border border-slate-400 bg-white p-3 font-normal text-slate-950 focus:outline-2 focus:outline-offset-2 focus:outline-teal-700";
 const change=(name:string,value:string)=>{setValues(v=>({...v,[name]:value}));setConfirmed(false);};
 const attrs=(name:string)=>({name,id:"gallery-"+name,value:values[name]||"","aria-invalid":!!state.errors?.[name],"aria-describedby":state.errors?.[name]?"error-"+name:undefined});
 const error=(name:string)=>state.errors?.[name]?<span id={"error-"+name} className="mt-2 block text-sm font-semibold text-red-800">{state.errors[name]}</span>:null;
 return <form method="post" className="mt-6 space-y-6" noValidate onSubmit={event=>{event.preventDefault();if(!ready||pending)return;const form=new FormData(event.currentTarget);startTransition(()=>action(form));}}>
  <input type="hidden" name="id" value={state.id||initial?.id||""}/><input type="hidden" name="updated_at" value={state.updatedAt||initial?.updated_at||""}/>
  <noscript>Aktifkan JavaScript untuk menyimpan dokumentasi melalui formulir ini.</noscript>
  <fieldset disabled={!ready||pending} className="min-w-0 space-y-6">
   <legend className="mb-4 text-xl font-bold">Identitas dan catatan praktik</legend>
   <p className="text-sm leading-7 text-slate-600">Semua catatan di bawah akan terlihat publik setelah diterbitkan. Jangan mencantumkan kontak pribadi atau identitas peserta didik. Gunakan “Contoh rancangan” untuk kegiatan yang belum dilaksanakan.</p>
   {galleryFields.slice(0,3).map(([name,label,min,max])=><label key={name} className="block font-semibold">{label} *<input {...attrs(name)} minLength={min} maxLength={max} required onChange={e=>change(name,e.target.value)} className={field}/>{error(name)}</label>)}
   <div className="grid gap-5 sm:grid-cols-2">
    {[["theme","Tema",focusOptions],["kind","Jenis konten",galleryKinds]] .map(([name,label,opts])=><label key={name as string} className="block font-semibold">{label as string} *<select {...attrs(name as string)} required onChange={e=>change(name as string,e.target.value)} className={field}><option value="">Pilih</option>{(opts as readonly (readonly [string,string])[]).map(([id,text])=><option key={id} value={id}>{text}</option>)}</select>{error(name as string)}</label>)}
    <label className="block font-semibold">Tanggal kegiatan / rancangan *<input {...attrs("activity_date")} type="date" required onInput={e=>change("activity_date",e.currentTarget.value)} onChange={e=>change("activity_date",e.target.value)} className={field}/>{error("activity_date")}</label>
   </div>
   {galleryFields.slice(3).map(([name,label,min,max])=><label key={name} className="block font-semibold">{label} *<span className="mt-1 block text-sm font-normal text-slate-500">{min}–{max} karakter. {name==="results"?"Jelaskan bukti yang tersedia dan batas kesimpulannya; jangan mengisi angka perkiraan sebagai hasil.":""}</span><textarea {...attrs(name)} rows={4} required minLength={min} maxLength={max} onChange={e=>change(name,e.target.value)} className={field}/>{error(name)}</label>)}
   <label className="block font-semibold">Tautan sumber / video / laporan (HTTPS) *<input {...attrs("source_url")} type="url" required maxLength={1500} onChange={e=>change("source_url",e.target.value)} className={field}/>{error("source_url")}</label>
   <div className="rounded-lg border bg-slate-50 p-5"><h3 className="font-bold">Foto sampul (opsional)</h3><p className="mt-2 text-sm leading-7 text-slate-600">Gunakan tautan HTTPS langsung ke berkas foto yang sudah dihosting. Tautan halaman Google Drive atau unggahan media sosial belum tentu dapat tampil sebagai gambar. Tanpa foto, galeri memakai sampul grafis.</p>
    {[["image_url","Tautan langsung foto",1500],["image_alt","Deskripsi foto untuk pembaca layar",300],["image_credit","Kredit / sumber foto",300]].map(([name,label,max])=><label key={name} className="mt-4 block font-semibold">{label}<input {...attrs(name as string)} type={name==="image_url"?"url":"text"} maxLength={max as number} onChange={e=>change(name as string,e.target.value)} className={field}/>{error(name as string)}</label>)}
   </div>
   <label className="block font-semibold">Status publikasi *<select {...attrs("status")} onChange={e=>{const status=e.target.value;setValues(v=>({...v,status}));}} className={field}>{galleryStatuses.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select>{error("status")}</label>
   <label className="flex items-start gap-3 leading-7"><input type="checkbox" name="publication_confirmed" value="accepted" checked={confirmed} onChange={e=>setConfirmed(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-teal-700"/><span>Saya telah memeriksa sumber, ketepatan klaim, serta izin penggunaan dokumentasi dan foto. Konten ini layak dipublikasikan.</span></label>{error("publication_confirmed")}
   <button type="submit" className="min-h-12 rounded bg-teal-800 px-6 py-3 font-bold text-white disabled:opacity-60">{!ready?"Menyiapkan formulir…":pending?"Menyimpan…":"Simpan dokumentasi"}</button>
  </fieldset>
  <div role={state.ok?"status":"alert"} className={state.message?"rounded-lg border p-4 "+(state.ok?"border-teal-300 bg-teal-50 text-teal-950":"border-red-300 bg-red-50 text-red-900"):""}>{state.message}</div>
  {state.id && <p className="text-sm">Tersimpan. <a href={"/control-center/blue-education/galeri?edit="+state.id} className="text-teal-800 underline">Buka entri tersimpan</a> · <a href="/blue-education#galeri-praktik" target="_blank" rel="noopener noreferrer" className="text-teal-800 underline">Lihat galeri publik (tab baru)</a></p>}
 </form>;
}
