"use client";
import { useState } from "react";
const fields = [
 ["identity", "Nama / NIM / kelas", "Identitas penyusun laporan"],
 ["time", "Tanggal, jam, dan zona waktu", "Contoh: 24 Oktober 2026, 14.00 WIB"],
 ["scope", "Tujuan, objek, dan dasar izin", "Pertanyaan riset; objek milik sendiri / bahan dosen / izin pemilik"],
 ["method", "Alat dan langkah pemeriksaan", "Nama modul, masukan yang disamarkan, urutan langkah, waktu akses"],
 ["evidence", "Temuan dan sumber", "Untuk setiap temuan: nomor bukti, URL, waktu akses, fakta yang terlihat, nama berkas tangkapan layar"],
 ["verification", "Verifikasi silang", "Sumber pembanding; bukti pendukung atau bertentangan; kemungkinan salah cocok"],
 ["analysis", "Analisis dan tingkat keyakinan", "Pisahkan fakta, dugaan, dan hal yang belum diketahui. Jelaskan alasan tingkat keyakinan rendah / sedang / tinggi"],
 ["limits", "Keterbatasan dan perlindungan data", "Metadata hilang, hasil kosong, situs tidak tersedia, data yang disamarkan, batas pemeriksaan"],
 ["conclusion", "Kesimpulan dan tindak lanjut", "Jawab pertanyaan awal sesuai bukti. Jelaskan apa yang masih perlu diverifikasi"],
 ["reflection", "Refleksi etika dan hukum", "Apa risiko privasinya? Apa perbedaan informasi publik dan bukti yang dapat dipertanggungjawabkan? Cantumkan sumber primer bila membuat klaim hukum."],
] as const;
export default function Worksheet(){
 const [values,setValues]=useState<Record<string,string>>({});
 function download(){
  const text="LEMBAR ANALISIS HASIL PRAKTIKUM OSINT\nHukum Kejahatan Mayantara · LexNusa\n\n"+fields.map(([key,label])=>label+"\n"+(values[key]||"[Belum diisi]")).join("\n\n");
  const url=URL.createObjectURL(new Blob([text],{type:"text/plain;charset=utf-8"}));const a=document.createElement("a");a.href=url;a.download="Lembar-Analisis-Praktikum-OSINT.txt";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 return <section id="lembar-analisis" className="rounded-2xl border bg-white p-6 sm:p-8">
 <h2 className="text-3xl font-bold">Lembar analisis hasil</h2><p className="mt-3 leading-7 print:hidden">Isi satu lembar untuk setiap latihan. Isian tidak dikirim ke dosen dan tidak disimpan otomatis. Unduh sebelum menutup atau memuat ulang halaman; kumpulkan melalui kanal yang ditentukan dosen.</p>
 <div className="mt-6 space-y-5">{fields.map(([key,label,hint])=><div key={key} className="osint-field"><label htmlFor={key} className="block font-bold">{label}</label><p id={key+"-hint"} className="mt-1 text-sm text-slate-600 print:hidden">{hint}</p><textarea id={key} aria-describedby={key+"-hint"} rows={key==="identity"||key==="time"?2:4} value={values[key]||""} onChange={e=>setValues(v=>({...v,[key]:e.target.value}))} className="mt-2 w-full rounded-lg border border-slate-400 p-3 focus:outline-2 focus:outline-teal-700 print:hidden"/><div className="hidden whitespace-pre-wrap border-b py-3 print:block">{values[key]||"........................................................................................"}</div></div>)}</div>
 <div className="mt-6 flex flex-wrap gap-3 print:hidden"><button type="button" onClick={download} className="rounded-xl bg-teal-800 px-5 py-3 font-bold text-white">Unduh lembar (.txt)</button><button type="button" onClick={()=>window.print()} className="rounded-xl border border-teal-800 px-5 py-3 font-bold text-teal-900">Cetak / Simpan PDF</button></div>
 <p className="mt-3 text-sm text-slate-600 print:hidden">Untuk PDF, pilih “Simpan sebagai PDF” pada dialog cetak perangkat. Lembar kosong juga dapat diunduh atau dicetak.</p>
 </section>;
}
