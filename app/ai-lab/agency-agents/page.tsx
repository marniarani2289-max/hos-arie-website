import type { Metadata } from "next";
import Link from "next/link";
import AgentWorkbench from "./AgentWorkbench";
import { sourceRevision } from "./catalog";

export const metadata: Metadata = {
  title: "Agency Agents | AI & Digital Systems Lab",
  description: "Pilih agen spesialis untuk riset, pengembangan, dan evaluasi. Unduh instruksi Agency Agents dan susun brief dengan tinjauan manusia di AI Lab Hossibarani.",
  alternates: { canonical: "/ai-lab/agency-agents" },
};

export default function AgencyAgentsPage() {
  return <main lang="id" className="bg-white text-slate-900">
    <header className="bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <Link href="/ai-lab" className="inline-flex min-h-11 items-center font-semibold text-amber-300 underline underline-offset-4">Kembali ke AI &amp; Digital Systems Lab</Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-widest text-amber-300">Agency Agents · Katalog &amp; ruang praktik</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">Peran yang jelas untuk pekerjaan AI yang terarah.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Jelajahi instruksi agen spesialis dari Agency Agents. Mulai dari satu tugas, tetapkan bukti yang dibutuhkan, lalu tinjau hasilnya sebelum digunakan.</p>
        <a href="#workbench" className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-amber-400 px-5 py-3 font-bold text-slate-950">Susun brief agen →</a>
      </div>
    </header>
    <div className="mx-auto max-w-6xl space-y-14 px-5 py-12 sm:px-8 sm:py-16">
      <section aria-labelledby="scope"><h2 id="scope" className="text-2xl font-bold">Dari koleksi instruksi ke praktik Lab AI</h2><p className="mt-4 max-w-4xl leading-8 text-slate-700">Agency Agents adalah koleksi instruksi Markdown dengan peran, alur kerja, dan bentuk keluaran. Integrasi ini menyediakan enam berkas agen asli, tautan ke seluruh katalog, dan penyusun brief dalam Bahasa Indonesia. Ini bukan layanan eksekusi agen otomatis.</p><a href="https://github.com/msitarzewski/agency-agents" className="mt-3 inline-flex min-h-11 items-center font-semibold text-amber-800 underline">Jelajahi seluruh katalog resmi</a></section>
      <AgentWorkbench />
      <section aria-labelledby="practice"><h2 id="practice" className="text-2xl font-bold">Alur praktik dengan tinjauan manusia</h2><ol className="mt-5 list-decimal space-y-4 pl-6 leading-8 text-slate-700"><li>Pilih agen sesuai pekerjaan, lalu unduh dan baca instruksinya.</li><li>Tulis tujuan, sumber yang tersedia, dan keluaran yang dapat diperiksa. Gunakan data contoh atau sumber publik.</li><li>Lampirkan berkas agen beserta brief pada asisten AI yang mendukung instruksi atau unggahan berkas. Panduan pemasangan khusus tersedia di repositori sumber.</li><li>Periksa sumber, asumsi, dan hasil. Catat hal yang belum diuji; tindakan pada sistem dan publikasi memerlukan persetujuan manusia.</li></ol></section>
      <section aria-labelledby="evidence" className="rounded-xl border border-slate-200 p-6 sm:p-8"><h2 id="evidence" className="text-2xl font-bold">Catatan eksperimen</h2><dl className="mt-5 grid gap-5 sm:grid-cols-2">{[
        ["Status", "Prototype — katalog dan penyusun brief; eksekusi otomatis belum aktif."],
        ["Last tested", "Validasi kinerja agen belum dilakukan; baseline menunggu pengujian."],
        ["Current metric", "6 berkas instruksi tersedia. Belum ada skor akurasi atau produktivitas agen."],
        ["What changed", "Koleksi agen terpilih dan brief dengan batas kerja read-only ditambahkan ke AI Lab."],
        ["Evidence / live system", "Berkas instruksi dapat diunduh; sumber setiap agen ditautkan ke revisi yang sama."],
        ["Experiment notes", "Uji satu tugas dengan data contoh. Catat model, tanggal, masukan, keluaran, bukti, dan hasil tinjauan manusia."],
      ].map(([label,value]) => <div key={label}><dt className="font-bold">{label}</dt><dd className="mt-2 leading-7 text-slate-600">{value}</dd></div>)}</dl></section>
      <section aria-labelledby="related"><h2 id="related" className="text-2xl font-bold">Lanjutkan di ekosistem Lab AI</h2><div className="mt-5 flex flex-wrap gap-5">{[["/ai-lab/nakama","Nakama"],["/ai-lab/engineering-skills","AI Engineering Skills"],["/ai-lab/paper-review","Paper Review AI"]].map(([href,label]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4">{label} →</Link>)}</div></section>
      <footer className="border-t border-slate-200 pt-6 text-sm leading-7 text-slate-600"><p>Instruksi asli: <a href="https://github.com/msitarzewski/agency-agents" className="underline">msitarzewski/agency-agents</a>. Copyright (c) 2025 AgentLand Contributors. <a href="/agency-agents/LICENSE" className="underline">Lisensi MIT</a> disertakan. Brief dan panduan Bahasa Indonesia merupakan tambahan independen AI Lab.</p><p className="mt-2 break-all">Revisi sumber: <a href={`https://github.com/msitarzewski/agency-agents/tree/${sourceRevision}`} className="underline">{sourceRevision}</a>. Berkas merupakan snapshot terkurasi dan tidak diperbarui otomatis.</p></footer>
    </div>
  </main>;
}
