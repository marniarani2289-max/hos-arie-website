"use client";

import { useState } from "react";
import { agents, sourceRevision } from "./catalog";

export default function AgentWorkbench() {
  const [category, setCategory] = useState("Semua");
  const [selected, setSelected] = useState<string>(agents[0].path);
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");
  const agent = agents.find(item => item.path === selected)!;
  const prompt = `Peran: ${agent.name}\nReferensi instruksi: https://github.com/msitarzewski/agency-agents/blob/${sourceRevision}/${agent.path}\n\nTugas: ${task.trim() || "[Tuliskan tugas dan hasil yang diharapkan]"}\n\nKonteks: AI & Digital Systems Lab Hossibarani. Jawab dalam Bahasa Indonesia. Gunakan data contoh atau sumber publik.\n\nBatas kerja: analisis dan rekomendasi saja. Jangan mengubah sistem, mengirim pesan, atau memublikasikan hasil tanpa persetujuan manusia. Jangan mengarang sumber, data, atau hasil pengujian. Jika referensi instruksi tidak dapat dibaca, minta pengguna melampirkan berkas agen; jangan mengaku telah membacanya.\n\nKeluaran: (1) asumsi dan kebutuhan data, (2) hasil analisis dengan sumber/bukti, (3) keterbatasan dan bagian yang belum diuji, (4) rekomendasi untuk ditinjau manusia.`;
  async function copy() {
    setStatus("Menyalin brief…");
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        navigator.clipboard.writeText(prompt),
        new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("Clipboard timeout")), 2000); }),
      ]);
      setStatus("Brief berhasil disalin.");
    }
    catch { setStatus("Penyalinan otomatis belum berhasil. Pilih teks pada kolom Brief siap salin lalu salin secara manual."); }
    finally { if (timer !== undefined) clearTimeout(timer); }
  }
  return <section id="workbench" aria-labelledby="workbench-title" className="scroll-mt-8">
    <h2 id="workbench-title" className="text-3xl font-bold">Pilih peran. Susun tugasnya.</h2>
    <p className="mt-4 max-w-3xl leading-8 text-slate-600">Enam agen pilihan tersedia sebagai berkas asli. Susun brief pendamping, lalu lampirkan berkas agen pada asisten AI yang Anda gunakan. Formulir ini bekerja di browser dan tidak mengirim tugas ke layanan AI.</p>
    <label htmlFor="category" className="mt-6 block font-semibold">Bidang kerja</label>
    <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="mt-2 min-h-11 rounded-lg border border-slate-400 bg-white p-3">
      {["Semua", "Riset", "Pengembangan", "Evaluasi"].map(value => <option key={value}>{value}</option>)}
    </select>
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {agents.filter(item => category === "Semua" || item.category === category).map(item => <article key={item.path} className={`rounded-xl border p-5 ${selected === item.path ? "border-amber-700 bg-amber-50" : "border-slate-200 bg-white"}`}>
        <p className="text-xs font-bold uppercase tracking-widest text-amber-800">{item.category}</p>
        <h3 className="mt-3 text-xl font-bold">{item.name}</h3>
        <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
        <button type="button" aria-pressed={selected === item.path} onClick={() => { setSelected(item.path); setStatus(""); }} className="mt-4 min-h-11 rounded-lg bg-slate-950 px-4 py-2 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">{selected === item.path ? "Dipilih" : "Pilih agen"}<span className="sr-only">: {item.name}</span></button>
        <a href={`/agency-agents/${item.path}`} download className="mt-3 block py-2 font-semibold text-amber-800 underline underline-offset-4">Unduh instruksi {item.name}</a>
        <a href={`https://github.com/msitarzewski/agency-agents/blob/${sourceRevision}/${item.path}`} className="block py-2 text-sm text-slate-700 underline">Lihat sumber {item.name}</a>
      </article>)}
    </div>
    <div className="mt-8 rounded-xl bg-slate-100 p-5 sm:p-8">
      <p className="font-semibold">Agen terpilih: {agent.name}</p>
      <label htmlFor="agent-task" className="mt-5 block font-semibold">Tugas dan hasil yang diharapkan</label>
      <textarea id="agent-task" value={task} maxLength={6000} onChange={e => { setTask(e.target.value); setStatus(""); }} rows={4} placeholder="Contoh: tinjau rancangan evaluasi pembelajaran dan buat daftar bukti yang perlu dikumpulkan." className="mt-2 w-full rounded-lg border border-slate-400 bg-white p-4" />
      <label htmlFor="agent-brief" className="mt-5 block font-semibold">Brief siap salin</label>
      <textarea id="agent-brief" readOnly value={prompt} rows={13} className="mt-2 w-full rounded-lg border border-slate-400 bg-white p-4 text-sm leading-7" />
      <button type="button" onClick={copy} className="mt-4 min-h-11 rounded-lg bg-amber-400 px-5 py-3 font-bold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Salin brief</button>
      <p role="status" className="mt-3 text-sm leading-7 text-slate-700">{status}</p>
    </div>
  </section>;
}
