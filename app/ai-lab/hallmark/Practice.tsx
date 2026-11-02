"use client";
import { useState } from "react";
const criteria = ["Kejelasan tujuan", "Navigasi", "Keterbacaan dan aksesibilitas", "Keutuhan konten dan fungsi", "Bukti pengujian"];
export default function Practice() {
  const [scores, setScores] = useState<(number | null)[]>(criteria.map(() => null));
  const [notes, setNotes] = useState("");
  const [page, setPage] = useState("");
  const complete = scores.every(score => score !== null);
  const total = scores.reduce<number>((sum, score) => sum + (score ?? 0), 0);
  function download() {
    const report = `Refleksi praktik Hallmark\nHalaman: ${page || "Belum diisi"}\nTanggal: ${new Date().toISOString()}\n\n${criteria.map((name, i) => `${name}: ${scores[i] ?? "Belum dinilai"}/4`).join("\n")}\nTotal: ${complete ? `${total}/20` : "Belum lengkap"}\n\nBukti dan refleksi:\n${notes}\n\nPenilaian mandiri peserta; bukan hasil pemindaian otomatis atau sertifikasi Hallmark.\n`;
    const url = URL.createObjectURL(new Blob([report], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "refleksi-hallmark.txt"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <section aria-labelledby="rubrik" className="border-t border-slate-300 pt-8">
    <h2 id="rubrik" className="text-2xl font-bold">Nilai hasil praktik Anda</h2>
    <p className="mt-3 leading-7 text-slate-700">Isi berdasarkan bukti. 0: belum diperiksa; 1: masalah besar; 2: sebagian memenuhi; 3: memenuhi dengan bukti; 4: teruji pada konteks tambahan.</p>
    <label className="mt-5 block font-semibold" htmlFor="practice-page">Halaman atau berkas yang diuji</label>
    <input id="practice-page" value={page} onChange={e => setPage(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-400 p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700" placeholder="Contoh: app/ai-lab/page.tsx" />
    <div className="mt-5 space-y-4">{criteria.map((name, i) => <div key={name} className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
      <label htmlFor={`criterion-${i}`} className="font-medium">{name}</label>
      <select id={`criterion-${i}`} value={scores[i] ?? ""} onChange={e => setScores(current => current.map((score, index) => index === i ? (e.target.value === "" ? null : Number(e.target.value)) : score))} className="min-h-11 rounded-lg border border-slate-400 bg-white p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700">
        <option value="">Belum dinilai</option>{[0,1,2,3,4].map(n => <option key={n} value={n}>{n} / 4</option>)}
      </select>
    </div>)}</div>
    <label htmlFor="practice-notes" className="mt-5 block font-semibold">Bukti, temuan terbuka, dan refleksi</label>
    <textarea id="practice-notes" rows={5} value={notes} onChange={e => setNotes(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-400 p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700" placeholder="Catat ukuran layar, hasil keyboard, tautan yang diuji, dan perubahan sebelum/sesudah." />
    <p role="status" aria-live="polite" className="mt-4 font-semibold">{complete ? `Penilaian mandiri: ${total}/20` : `Terisi ${scores.filter(score => score !== null).length} dari 5 kriteria`}</p>
    <button type="button" onClick={download} className="mt-4 min-h-12 rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Unduh refleksi saya</button>
    <p className="mt-3 text-sm leading-6 text-slate-600">Formulir berjalan di browser dan tidak mengirim jawaban ke server. Isian hilang saat halaman dimuat ulang; unduh sebelum meninggalkan halaman. Skor ini bukan sertifikasi Hallmark.</p>
  </section>;
}
