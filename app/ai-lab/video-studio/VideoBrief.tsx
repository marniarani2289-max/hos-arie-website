"use client";

import { useState, type FormEvent } from "react";

const input = "mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-slate-950 focus:outline-2 focus:outline-amber-700";
const button = "inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700";
const templates = {
  Hukumpreneur: { topic: "Satu menit memahami hukum", audience: "Masyarakat umum", script: "[Pembuka: pertanyaan yang dekat dengan keseharian]\n\n[Penjelasan: satu konsep hukum dengan sumber terverifikasi]\n\n[Contoh sederhana tanpa data pribadi]\n\n[Penutup: rangkum pesan dan arahkan ke materi lengkap]" },
  LexNusa: { topic: "Mengenal layanan LexNusa", audience: "Profesional dan pelaku usaha", script: "[Masalah yang dihadapi audiens]\n\n[Perkenalkan layanan yang sudah tersedia]\n\n[Tunjukkan contoh penggunaan dengan data simulasi]\n\n[Ajak audiens mengunjungi halaman LexNusa]" },
  Pembelajaran: { topic: "Satu konsep, satu contoh", audience: "Mahasiswa dan pendidik", script: "[Sebutkan tujuan belajar]\n\n[Jelaskan satu konsep dengan bahasa sederhana]\n\n[Berikan contoh yang telah diperiksa]\n\n[Tutup dengan satu pertanyaan refleksi]" },
};

export default function VideoBrief() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [duration, setDuration] = useState("60");
  const [ratio, setRatio] = useState("9:16");
  const [script, setScript] = useState("");
  const [sources, setSources] = useState("");
  const [visuals, setVisuals] = useState("");
  const [notice, setNotice] = useState("");
  const words = script.trim() ? script.trim().split(/\s+/).length : 0;
  function download(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = `AI VIDEO STUDIO — RENCANA PRODUKSI\n\nTopik: ${topic.trim()}\nAudiens: ${audience.trim()}\nDurasi target: ${duration} detik\nRasio: ${ratio}\nBahasa: Indonesia\n\nNASKAH\n${script.trim()}\n\nSUMBER / REFERENSI\n${sources.trim() || "Belum dicantumkan"}\n\nARAH VISUAL\n${visuals.trim() || "Belum ditentukan"}\n\nTINJAU SEBELUM PRODUKSI\n[ ] Semua placeholder diganti dengan naskah final\n[ ] Klaim dan sumber diperiksa\n[ ] Materi visual dan musik memiliki izin penggunaan\n[ ] Narasi dan subtitle diperiksa\n\nDokumen ini adalah brief, bukan video atau berkas konfigurasi API. Salin naskah final ke MoneyPrinterTurbo yang sudah dipasang untuk memulai produksi.\n`;
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = "AI-Video-Studio-Rencana-Produksi.txt";
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Unduhan rencana produksi telah dimulai. Periksa folder unduhan perangkat Anda.");
  }
  return <section id="ruang-kerja" className="scroll-mt-8" aria-labelledby="brief-title">
    <div className="flex flex-wrap items-baseline justify-between gap-3"><h2 id="brief-title" className="text-3xl font-bold">Rancang video Anda</h2><span className="text-sm text-slate-600">01 / Persiapan produksi</span></div>
    <p className="mt-3 max-w-3xl leading-7 text-slate-600">Isi sendiri atau gunakan kerangka sebagai titik awal. Kerangka adalah template, bukan naskah hasil AI. Isian diproses di browser dan tidak disimpan otomatis; unduh sebelum menutup halaman.</p>
    <div className="mt-5 flex flex-wrap gap-2" aria-label="Tambahkan kerangka naskah">{Object.entries(templates).map(([name, value]) => <button key={name} type="button" disabled={Boolean(script.trim())} onClick={() => { setTopic(value.topic); setAudience(value.audience); setScript(value.script); setNotice("Kerangka ditambahkan. Ganti bagian dalam tanda kurung siku dengan naskah Anda."); }} className={button + " border border-slate-300 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50"}>Kerangka {name}</button>)}</div>
    <p className="mt-2 text-xs leading-5 text-slate-500">Pilihan kerangka hanya aktif saat kolom naskah kosong agar tulisan Anda tidak tertimpa.</p>
    <form onSubmit={download} className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <div className="space-y-5 rounded-xl border border-slate-200 p-5 sm:p-6">
        <label className="block font-semibold">Topik video<input required maxLength={180} value={topic} onChange={e => setTopic(e.target.value)} className={input} placeholder="Misalnya: mengenal bukti elektronik" /></label>
        <label className="block font-semibold">Audiens<input required maxLength={180} value={audience} onChange={e => setAudience(e.target.value)} className={input} placeholder="Misalnya: mahasiswa hukum semester 5" /></label>
        <div className="grid gap-4 sm:grid-cols-2"><label className="block font-semibold">Durasi target<select value={duration} onChange={e => setDuration(e.target.value)} className={input}>{[30, 45, 60, 90, 120].map(n => <option key={n} value={n}>{n} detik</option>)}</select></label><label className="block font-semibold">Format video<select value={ratio} onChange={e => setRatio(e.target.value)} className={input}><option value="9:16">9:16 · Vertikal</option><option value="16:9">16:9 · Horizontal</option><option value="1:1">1:1 · Persegi</option></select></label></div>
        <label className="block font-semibold">Naskah narasi<textarea required maxLength={12000} rows={10} value={script} onChange={e => setScript(e.target.value)} className={input + " font-normal leading-7"} placeholder="Tulis pembuka, penjelasan, contoh, dan penutup…" aria-describedby="word-count" /></label>
        <p id="word-count" className="text-sm leading-6 text-slate-600">{words} kata · Perkiraan narasi {Math.round(words / 130 * 60)} detik pada 130 kata/menit. Durasi aktual bergantung pada suara dan jeda.</p>
      </div>
      <div className="space-y-5 rounded-xl border border-slate-200 bg-stone-50 p-5 sm:p-6"><h3 className="text-xl font-bold">Lengkapi bahan produksi</h3>
        <label className="block font-semibold">Sumber dan referensi<textarea maxLength={6000} rows={5} value={sources} onChange={e => setSources(e.target.value)} className={input + " font-normal"} placeholder="Tautan, judul sumber, serta bagian yang mendukung naskah" /></label>
        <label className="block font-semibold">Arahan visual<textarea maxLength={6000} rows={5} value={visuals} onChange={e => setVisuals(e.target.value)} className={input + " font-normal"} placeholder="Urutan adegan, klip milik sendiri, kata kunci visual, atau teks di layar" /></label>
        <div className="rounded-lg border border-slate-200 bg-white p-4"><p className="font-semibold">Hasil tahap ini</p><p className="mt-2 text-sm leading-6 text-slate-600">Berkas TXT berisi brief, naskah, referensi, dan daftar pemeriksaan. Belum menghasilkan MP4, suara, atau subtitle.</p></div>
        <button type="submit" className={button + " w-full bg-slate-950 text-white hover:bg-slate-800"}>Unduh rencana produksi (.txt)</button>
        <p role="status" className="text-sm leading-6 text-teal-800">{notice}</p>
      </div>
    </form>
  </section>;
}
