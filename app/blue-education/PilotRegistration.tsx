"use client";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { focusOptions, institutionTypes, readinessOptions, validatePilot } from "@/lib/blue-education/pilot";
import type { PilotErrors, PilotInput } from "@/lib/blue-education/pilot";
import s from "./PilotRegistration.module.css";

export default function PilotRegistration() {
 const [busy,setBusy]=useState(false);
 const [errors,setErrors]=useState<PilotErrors>({});
 const [message,setMessage]=useState("");
 const [receipt,setReceipt]=useState<{reference:string;institution:string}|null>(null);
 const [downloadMessage,setDownloadMessage]=useState("");
 const key=useRef<string|null>(null);
 const lock=useRef(false);
 const result=useRef<HTMLDivElement>(null);
 const formRef=useRef<HTMLFormElement>(null);
 function fieldError(name:keyof PilotInput){return errors[name] ? <span id={"pilot-error-"+name} className={s.fieldError}>{errors[name]}</span>:null;}
 function props(name:keyof PilotInput){return {"aria-invalid":!!errors[name],"aria-describedby":errors[name]?"pilot-error-"+name:undefined};}
 function firstError(found:PilotErrors) {
  requestAnimationFrame(()=>{
   const el=formRef.current?.elements.namedItem(Object.keys(found)[0]);
   if(el instanceof HTMLElement)el.focus();
  });
 }
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(lock.current)return;
  const fd=new FormData(event.currentTarget);
  const raw=Object.fromEntries(fd.entries());
  const {data,errors:found}=validatePilot({...raw,consent:fd.get("consent")==="accepted"});
  setErrors(found);setMessage("");
  if(Object.keys(found).length){setMessage("Periksa isian yang ditandai.");firstError(found);return;}
  lock.current=true;setBusy(true);
  try{
   key.current ??= crypto.randomUUID();
   const response=await fetch("/api/blue-education/pilot",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({...data,website:raw.website || "",requestId:key.current}),
    signal:AbortSignal.timeout(25000),
   });
   const payload=await response.json();
   if(!response.ok || payload.ok!==true || typeof payload.reference!=="string"){
    setMessage(payload.error || "Pendaftaran belum dapat dikonfirmasi. Silakan coba lagi.");
    if(payload.errors){setErrors(payload.errors);firstError(payload.errors);}
    return;
   }
   setReceipt({reference:payload.reference,institution:data.institution_name});
   requestAnimationFrame(()=>result.current?.focus());
  }catch{setMessage("Koneksi terputus atau layanan belum merespons. Isian tetap ada. Klik Kirim kembali untuk memastikan pendaftaran; kiriman yang sama tidak dicatat dua kali.");}
  finally{lock.current=false;setBusy(false);}
 }
 function download(){
  if(!receipt)return;
  const text=["BUKTI PENDAFTARAN MINAT PERINTIS BLUE EDUCATION","Lembaga: "+receipt.institution,"Nomor pendaftaran: "+receipt.reference,"Status saat pengiriman: Tercatat untuk ditelaah","Pendaftaran belum merupakan konfirmasi penerimaan atau jadwal pendampingan.","Kontak pengelola: riesib8@gmail.com","https://www.hossibarani.com/blue-education#pendaftaran"].join("\n");
  const url=URL.createObjectURL(new Blob(["\uFEFF",text],{type:"text/plain;charset=utf-8"}));
  const a=document.createElement("a");a.href=url;a.download="bukti-pendaftaran-perintis-blue-education.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
  setDownloadMessage("Bukti disiapkan. Periksa unduhan browser.");
 }
 if(receipt)return <div ref={result} tabIndex={-1} className={s.receipt} role="region" aria-label="Bukti pendaftaran">
  <p className={s.kicker}>Pendaftaran berhasil dicatat</p><h3>Terima kasih, {receipt.institution}.</h3>
  <p>Nomor pendaftaran:</p><p className={s.reference}>{receipt.reference}</p>
  <p>Pengelola dapat menelaah rencana dan menghubungi penanggung jawab melalui kontak yang Anda berikan. Jadwal dan bentuk pendampingan akan disepakati setelah pembahasan.</p>
  <p>Simpan nomor ini untuk tindak lanjut. Pendaftaran belum merupakan konfirmasi penerimaan.</p>
  <button className={s.primary} type="button" onClick={download}>Unduh bukti pendaftaran</button>
  <p role="status">{downloadMessage}</p><p className={s.small}>Pertanyaan atau koreksi data: <a href="mailto:riesib8@gmail.com">riesib8@gmail.com</a>. Sertakan nomor pendaftaran.</p>
 </div>;
 return <form ref={formRef} onSubmit={submit} noValidate className={s.form} onChange={()=>{key.current=null;}}>
  <p className={s.small}>Kolom bertanda * wajib diisi. Gunakan kontak penanggung jawab dewasa; jangan mencantumkan data pribadi peserta didik.</p>
  <fieldset disabled={busy}><legend>1. Sekolah atau komunitas</legend><div className={s.grid}>
   <label>Jenis lembaga *<select name="institution_type" required defaultValue="" {...props("institution_type")}><option value="">Pilih jenis lembaga</option>{institutionTypes.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select>{fieldError("institution_type")}</label>
   <label>Nama sekolah atau komunitas *<input name="institution_name" required minLength={2} maxLength={180} autoComplete="organization" {...props("institution_name")}/>{fieldError("institution_name")}</label>
   <label>Provinsi *<input name="province" required defaultValue="Kepulauan Riau" minLength={2} maxLength={100} autoComplete="address-level1" {...props("province")}/>{fieldError("province")}</label>
   <label>Kabupaten/kota *<input name="district" required minLength={2} maxLength={120} autoComplete="address-level2" placeholder="Contoh: Kabupaten Lingga" {...props("district")}/>{fieldError("district")}</label>
  </div></fieldset>
  <fieldset disabled={busy}><legend>2. Penanggung jawab</legend><div className={s.grid}>
   <label>Nama penanggung jawab *<input name="contact_name" required minLength={2} maxLength={120} autoComplete="name" {...props("contact_name")}/>{fieldError("contact_name")}</label>
   <label>Peran dalam lembaga *<input name="contact_role" required minLength={2} maxLength={120} placeholder="Contoh: guru atau koordinator komunitas" {...props("contact_role")}/>{fieldError("contact_role")}</label>
   <label>Email *<input name="email" type="email" required maxLength={254} autoComplete="email" {...props("email")}/>{fieldError("email")}</label>
   <label>WhatsApp (opsional)<input name="phone" type="tel" maxLength={25} autoComplete="tel" placeholder="Contoh: +6281234567890" {...props("phone")}/>{fieldError("phone")}</label>
  </div></fieldset>
  <fieldset disabled={busy}><legend>3. Rencana perintisan</legend><div className={s.grid}>
   <label>Fokus kegiatan *<select name="focus" required defaultValue="" {...props("focus")}><option value="">Pilih fokus</option>{focusOptions.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select>{fieldError("focus")}</label>
   <label>Kesiapan lembaga *<select name="readiness" required defaultValue="" {...props("readiness")}><option value="">Pilih kesiapan</option>{readinessOptions.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select>{fieldError("readiness")}</label>
  </div><label className={s.plan}>Rencana awal dan dukungan yang dibutuhkan *<span className={s.hint}>Ceritakan masalah setempat, aksi yang ingin dicoba, pihak yang terlibat, dan kebutuhan pendampingan. 20–3.000 karakter.</span><textarea name="plan" rows={5} required minLength={20} maxLength={3000} {...props("plan")}/>{fieldError("plan")}</label></fieldset>
  <div className={s.trap} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
  <label className={s.consent}><input type="checkbox" name="consent" value="accepted" required disabled={busy} {...props("consent")}/><span>Saya berwenang menyampaikan minat lembaga ini dan menyetujui data di atas disimpan serta digunakan pengelola Blue Education untuk menelaah pendaftaran dan menghubungi penanggung jawab. *</span></label>
  {fieldError("consent")}
  <p className={s.small}>Data kontak tidak ditampilkan kepada publik. Untuk koreksi atau permintaan penghapusan data, hubungi <a href="mailto:riesib8@gmail.com">riesib8@gmail.com</a>. Pendaftaran ini tidak memerlukan pembayaran.</p>
  {message && <p className={s.error} role="alert">{message}</p>}
  <button className={s.primary} type="submit" disabled={busy}>{busy?"Sedang mengirim…":message?"Kirim kembali":"Daftarkan minat lembaga"}</button>
  <p className={s.small} role="status">{busy?"Tunggu hingga nomor pendaftaran muncul sebelum menutup halaman.":"Pendaftaran berhasil hanya setelah nomor pendaftaran ditampilkan."}</p>
 </form>;
}
