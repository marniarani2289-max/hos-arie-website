import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import CertificateLookup from "./CertificateLookup";

export const metadata: Metadata = {
  title: "Pilot Cohort 1 | Raja Ali Haji Institute",
  description: "Pilot Cohort empat minggu berbasis outcome dan portofolio: Learn, Apply, Produce, Verify, Showcase.",
  alternates: { canonical: "/raja-ali-haji/pilot-cohort" },
};

const register = "/register?cohort=RAHI-PILOT-01";
const programme = "/raja-ali-haji/programmes/pemikiran-raja-ali-haji";
const portfolio = "/raja-ali-haji/pilot-cohort/portfolio";
const showcase = "/raja-ali-haji/pilot-cohort/showcase";

const journey = [
  ["Learn", "Selesaikan 8 modul dan pahami konsep utama Raja Ali Haji."],
  ["Apply", "Terapkan konsep pada kasus, kebijakan, atau persoalan kontemporer."],
  ["Produce", "Hasilkan project dan final portfolio artifact."],
  ["Verify", "Dapatkan penilaian rubrik dan keputusan reviewer manusia."],
  ["Showcase", "Karya Public + Verified + approved dapat tampil pada showcase."],
] as const;

const outcomes = [
  ["LO-1 · Knowledge", "Memahami konsep utama Raja Ali Haji dan Malay Ethical Constitutionalism."],
  ["LO-2 · Analysis", "Menganalisis persoalan kontemporer dengan kerangka yang dipelajari."],
  ["LO-3 · Application", "Menerapkan konsep pada kasus, kebijakan, atau problem nyata."],
  ["LO-4 · Communication", "Menyajikan argumentasi secara terstruktur dan bertanggung jawab."],
  ["LO-5 · Production", "Menghasilkan karya final yang layak menjadi portofolio terverifikasi."],
] as const;

const gates = [
  "8/8 modules completed",
  "8/8 quizzes ≥70",
  "Final reflection submitted",
  "Verified portfolio ≥60/100",
  "Certificate eligible",
] as const;

const weeks = [
  ["Minggu 1", "Learn & Define", "Modul 1–2 · Project Proposal"],
  ["Minggu 2", "Analyze & Apply", "Modul 3–4 · Analysis Canvas / Evidence Map"],
  ["Minggu 3", "Produce", "Modul 5–6 · Portfolio Draft v1 + feedback"],
  ["Minggu 4", "Refine & Demonstrate", "Modul 7–8 · final submission + human verification"],
] as const;

const faqs = [
  ["Apakah program ini berbayar?", "Tidak. Pilot Cohort 1 gratis dengan kuota terbatas 20–30 peserta."],
  ["Apakah cukup menyelesaikan delapan modul?", "Tidak. Modul adalah fondasi. Kelulusan juga mensyaratkan refleksi akhir dan portfolio yang diverifikasi manusia."],
  ["Bagaimana sertifikat diterbitkan?", "Sertifikat menjadi eligible setelah 8 modul selesai, seluruh kuis minimal 70, refleksi akhir diserahkan, dan portfolio diverifikasi reviewer manusia dengan skor minimal 60/100."],
  ["Apakah AI menentukan kelulusan?", "Tidak. AI hanya dapat membantu preliminary assessment atau formative feedback. Keputusan VERIFIED tetap dibuat reviewer manusia."],
  ["Apakah semua karya otomatis dipublikasikan?", "Tidak. Showcase hanya menampilkan karya Public + Verified + approved for showcase."],
] as const;

export default function PilotCohortPage() {
  return <main className="min-h-screen bg-[#f7f4ef] text-slate-950">
    <section className="bg-slate-950 px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
        <div>
          <Link href="/raja-ali-haji" className="text-sm font-semibold text-slate-300 hover:text-amber-300">← Raja Ali Haji Institute</Link>
          <p className="mt-10 text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Pilot Cohort 1 · Outcome & Portfolio-Based Learning</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">Belajar. Terapkan. Hasilkan karya yang dapat diverifikasi.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Bukan sekadar menyelesaikan course. Peserta mempelajari pemikiran Raja Ali Haji, menerapkannya pada persoalan nyata, menghasilkan portfolio artifact, memperoleh human verification, dan membangun bukti kompetensi.</p>
          <p className="mt-7 font-mono font-black text-amber-300">Learn → Apply → Produce → Verify → Showcase</p>
          <div className="mt-9 flex flex-wrap gap-4"><Link href={register} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-4 font-black text-slate-950">Daftar Pilot Cohort <ArrowRight size={18}/></Link><Link href={showcase} className="rounded-xl border border-white/25 px-6 py-4 font-bold">Portfolio Showcase</Link></div>
        </div>
        <aside className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">Certificate eligibility</p><div className="mt-6 space-y-3">{gates.map((gate, i) => <div key={gate}><p className={i === gates.length - 1 ? "font-black text-emerald-300" : "font-semibold"}>{gate}</p>{i < gates.length - 1 && <p className="mt-2 text-slate-500">↓</p>}</div>)}</div></aside>
      </div>
    </section>

    <section className="bg-white px-5 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Learning journey</p><h2 className="mt-4 text-3xl font-black sm:text-5xl">Dari konsumsi materi menuju bukti kompetensi</h2><div className="mt-10 grid gap-4 md:grid-cols-5">{journey.map(([stage,text],i)=><article key={stage} className="rounded-2xl border border-stone-300 bg-[#f7f4ef] p-5"><p className="text-xs font-black text-amber-700">0{i+1}</p><h3 className="mt-3 text-xl font-black">{stage}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></article>)}</div></div></section>

    <section className="px-5 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Learning Outcome Registry</p><h2 className="mt-4 text-3xl font-black sm:text-5xl">Lima capaian yang harus dapat dibuktikan</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{outcomes.map(([title,text])=><article key={title} className="rounded-2xl border border-stone-300 bg-white p-6"><CheckCircle2 className="text-emerald-700"/><h3 className="mt-4 font-black">{title}</h3><p className="mt-2 leading-7 text-slate-600">{text}</p></article>)}</div></div></section>

    <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Empat minggu produksi</p><h2 className="mt-4 text-3xl font-black sm:text-5xl">Setiap minggu menghasilkan evidence</h2><div className="mt-10 divide-y divide-white/10 border-y border-white/10">{weeks.map(([week,stage,output])=><article key={week} className="grid gap-3 py-6 md:grid-cols-[9rem_13rem_1fr]"><p className="font-black text-amber-300">{week}</p><h3 className="font-black">{stage}</h3><p className="text-slate-300">{output}</p></article>)}</div><Link href={programme} className="mt-8 inline-flex items-center gap-2 font-bold text-amber-300">Lihat delapan modul <ArrowRight size={18}/></Link></div></section>

    <section className="bg-white px-5 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl rounded-3xl border border-stone-300 p-7 sm:p-10"><p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-700">Persyaratan kelulusan</p><h2 className="mt-4 text-3xl font-black">Sertifikat diberikan berdasarkan evidence</h2><div className="mt-7 grid gap-4 md:grid-cols-2">{gates.slice(0,4).map(item=><p key={item} className="flex gap-3 font-semibold"><CheckCircle2 className="shrink-0 text-emerald-700" size={20}/>{item}</p>)}</div><p className="mt-7 rounded-xl bg-emerald-50 p-5 font-black text-emerald-900">Seluruh gate terpenuhi → Certificate eligible</p><div className="mt-7 flex flex-wrap gap-3"><Link href={portfolio} className="rounded-xl bg-slate-950 px-5 py-3 font-bold text-white">Portfolio Workspace</Link><Link href={showcase} className="rounded-xl border border-stone-300 px-5 py-3 font-bold">Verified Showcase</Link></div></div></section>

    <section className="border-y border-stone-300 bg-[#f0ece3] px-5 py-16 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center"><div><ShieldCheck className="text-amber-700" size={34}/><p className="mt-5 text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Verifikasi sertifikat</p><h2 className="mt-4 text-3xl font-black sm:text-5xl">Setiap capaian dapat diperiksa</h2></div><div><p className="text-lg leading-8 text-slate-700">Masukkan nomor sertifikat untuk membuka halaman verifikasi publik.</p><CertificateLookup/></div></div></section>

    <section className="bg-white px-5 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">FAQ peserta</p><h2 className="mt-4 text-3xl font-black sm:text-5xl">Pertanyaan sebelum mendaftar</h2><div className="mt-9 divide-y divide-stone-300 border-y border-stone-300">{faqs.map(([q,a])=><details key={q} className="py-5"><summary className="cursor-pointer text-lg font-black">{q}</summary><p className="mt-4 leading-7 text-slate-600">{a}</p></details>)}</div><div className="mt-10"><Link href={register} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-4 font-black">Daftar Pilot Cohort <ArrowRight size={18}/></Link></div></div></section>
  </main>;
}
