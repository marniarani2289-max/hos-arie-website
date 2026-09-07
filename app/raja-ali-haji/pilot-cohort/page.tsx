import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, CalendarDays, CheckCircle2, Clock3, GraduationCap, ShieldCheck, Users } from "lucide-react";
import CertificateLookup from "./CertificateLookup";

export const metadata: Metadata = {
  title: "Pilot Cohort 1 | Raja Ali Haji Institute",
  description: "Pilot Cohort empat minggu berbasis outcome dan portofolio: belajar, menerapkan, menghasilkan karya, diverifikasi manusia, dan membangun portofolio terverifikasi.",
  alternates: { canonical: "/raja-ali-haji/pilot-cohort" },
  openGraph: {
    title: "Pilot Cohort 1 | Raja Ali Haji Institute",
    description: "Learn → Apply → Produce → Verify → Showcase. Program empat minggu berbasis outcome dan portofolio.",
    url: "https://www.hossibarani.com/raja-ali-haji/pilot-cohort",
    type: "website",
    images: [{ url: "https://www.hossibarani.com/images/og/rahi-pilot-cohort-v2.jpg", width: 1200, height: 630, alt: "Pilot Cohort 1 Raja Ali Haji Institute" }],
  },
};

const programme = "/raja-ali-haji/programmes/pemikiran-raja-ali-haji";
const register = "/register?cohort=RAHI-PILOT-01";
const portfolio = "/raja-ali-haji/pilot-cohort/portfolio";
const showcase = "/raja-ali-haji/pilot-cohort/showcase";

const journey = [
  ["Learn", "Menyelesaikan 8 modul dan memahami konsep utama Raja Ali Haji."],
  ["Apply", "Menerapkan konsep pada kasus, kebijakan, atau persoalan kontemporer."],
  ["Produce", "Menghasilkan project dan final portfolio artifact."],
  ["Verify", "Mendapat penilaian rubrik dan keputusan reviewer manusia."],
  ["Showcase", "Karya Public + Verified + approved dapat tampil pada Portfolio Showcase."],
] as const;

const eligibility = [
  "Menyelesaikan seluruh aktivitas wajib dalam 8 modul.",
  "Mencapai nilai kuis minimal 70 pada setiap modul.",
  "Menyerahkan refleksi akhir pada Modul 8.",
  "Menghasilkan portfolio artifact dan memperoleh human verification dengan skor minimal 60/100.",
  "Setelah seluruh gate terpenuhi, peserta menjadi eligible untuk sertifikat digital terverifikasi.",
] as const;

const outcomes = [
  ["LO-1 · Knowledge", "Memahami konsep utama pemikiran Raja Ali Haji dan Malay Ethical Constitutionalism."],
  ["LO-2 · Analysis", "Menganalisis persoalan kontemporer menggunakan kerangka yang dipelajari."],
  ["LO-3 · Application", "Menerapkan konsep pada kasus, kebijakan, atau problem nyata."],
  ["LO-4 · Communication", "Menyajikan argumentasi secara terstruktur, jelas, dan bertanggung jawab."],
  ["LO-5 · Production", "Menghasilkan karya final yang layak menjadi portofolio terverifikasi."],
] as const;

const schedule = [
  ["Minggu 1", "5–11 Oktober", "Learn & Define", "Modul 1–2 · pilih track dan susun Project Proposal."],
  ["Minggu 2", "12–18 Oktober", "Analyze & Apply", "Modul 3–4 · susun Analysis Canvas / Evidence Map."],
  ["Minggu 3", "19–25 Oktober", "Produce", "Modul 5–6 · Portfolio Draft v1 dan formative feedback."],
  ["Minggu 4", "26 Oktober–1 November", "Refine & Demonstrate", "Modul 7–8 · revisi, final submission, human verification."],
] as const;

const audiences = ["Dosen", "Mahasiswa", "ASN", "Komunitas"] as const;

const faqs = [
  ["Apakah program ini berbayar?", "Tidak. Pilot Cohort 1 gratis dengan kuota terbatas 20–30 peserta."],
  ["Apakah program hanya tentang menyelesaikan modul?", "Tidak. Delapan modul adalah fondasi. Kelulusan juga mensyaratkan karya portofolio yang menunjukkan kemampuan menerapkan pembelajaran."],
  ["Bagaimana sertifikat diterbitkan?", "Certificate eligibility terbuka setelah 8 modul selesai, seluruh kuis minimal 70, refleksi akhir diserahkan, dan portfolio diverifikasi reviewer manusia dengan skor minimal 60/100."],
  ["Apakah AI menentukan kelulusan?", "Tidak. AI dapat membantu preliminary assessment atau formative feedback, tetapi keputusan VERIFIED dan kelayakan portfolio tetap berada pada reviewer manusia."],
  ["Apakah semua karya otomatis dipublikasikan?", "Tidak. Showcase hanya menampilkan karya berstatus Public + Verified + approved for showcase. Peserta tetap memiliki kontrol atas visibility karyanya."],
] as const;

export default function PilotCohortPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(245,158,11,0.18),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <Link href="/raja-ali-haji" className="text-sm font-semibold text-slate-300 hover:text-amber-300">← Raja Ali Haji Institute</Link>
            <div className="mt-9 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-200"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Pendaftaran dibuka</div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Pilot Cohort 1 · Outcome & Portfolio-Based Learning</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">Belajar. Terapkan. Hasilkan karya yang dapat diverifikasi.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">Bukan sekadar menyelesaikan course. Peserta belajar pemikiran Raja Ali Haji, menerapkannya pada persoalan nyata, menghasilkan portfolio artifact, memperoleh human verification, dan membangun bukti kompetensi.</p>
            <p className="mt-6 font-mono text-sm font-bold tracking-wide text-amber-300 sm:text-base">Learn → Apply → Produce → Verify → Showcase</p>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-slate-300"><span className="inline-flex items-center gap-2"><CalendarDays size={18} className="text-amber-300" />5 Oktober–1 November 2026</span><span className="inline-flex items-center gap-2"><Users size={18} className="text-amber-300" />20–30 peserta</span><span className="inline-flex items-center gap-2"><Clock3 size={18} className="text-amber-300" />±5 jam per minggu</span></div>
            <div className="mt-9 flex flex-wrap gap-4"><Link href={register} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-4 font-black text-slate-950 hover:bg-amber-300">Daftar Pilot Cohort <ArrowRight size={19} /></Link><Link href={showcase} className="rounded-xl border border-white/25 px-6 py-4 font-bold hover:border-amber-300">Portfolio Showcase</Link></div>
          </div>
          <aside className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur sm:p-9">
            <Image src="/raja-ali-haji-institute-logo.png" alt="Logo Raja Ali Haji Institute" width={140} height={140} className="h-28 w-28 object-contain" />
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.24em] text-amber-300">Certificate eligibility</p>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-200"><p>8/8 modules completed</p><p>↓</p><p>8/8 quizzes ≥70</p><p>↓</p><p>Final reflection submitted</p><p>↓</p><p>Verified portfolio ≥60/100</p><p>↓</p><p className="font-black text-emerald-300">CERTIFICATE ELIGIBLE</p></div>
          </aside>
        </div>
      </section>

      <section className="border-b border-stone-300 bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Learning journey</p><h2 className="mt-4 max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">Dari konsumsi materi menuju bukti kompetensi</h2><div className="mt-10 grid gap-4 md:grid-cols-5">{journey.map(([stage, text], index) => <article key={stage} className="rounded-2xl border border-stone-300 bg-[#f7f4ef] p-5"><p className="text-xs font-black text-amber-700">0{index + 1}</p><h3 className="mt-3 text-xl font-black">{stage}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></article>)}</div></div></section>

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Learning Outcome Registry</p><h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Lima capaian yang harus dapat dibuktikan</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{outcomes.map(([title, text]) => <article key={title} className="rounded-2xl border border-stone-300 bg-white p-6"><CheckCircle2 className="text-emerald-700" /><h3 className="mt-4 font-black">{title}</h3><p className="mt-2 leading-7 text-slate-600">{text}</p></article>)}</div></div></section>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Empat minggu produksi</p><h2 className="mt-4 max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">Setiap minggu menghasilkan evidence</h2><div className="mt-10 divide-y divide-white/10 border-y border-white/10">{schedule.map(([week, date, stage, output]) => <article key={week} className="grid gap-3 py-6 md:grid-cols-[9rem_11rem_1fr]"><div><p className="font-black text-amber-300">{week}</p><p className="text-sm text-slate-400">{date}</p></div><h3 className="font-black">{stage}</h3><p className="text-slate-300">{output}</p></article>)}</div><div className="mt-8"><Link href={programme} className="inline-flex items-center gap-2 font-bold text-amber-300">Lihat delapan modul <ArrowRight size={18} /></Link></div></div></section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2"><div className="rounded-3xl border border-stone-300 p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-700">Persyaratan kelulusan</p><h2 className="mt-4 text-3xl font-black">Sertifikat diberikan berdasarkan evidence</h2><div className="mt-7 space-y-4">{eligibility.map(item => <p key={item} className="flex gap-3 font-semibold leading-7"><CheckCircle2 className="mt-1 shrink-0 text-emerald-700" size={20} />{item}</p>)}</div><div className="mt-7 flex flex-wrap gap-3"><Link href={portfolio} className="rounded-xl bg-slate-950 px-5 py-3 font-bold text-white">Portfolio Workspace</Link><Link href={showcase} className="rounded-xl border border-stone-300 px-5 py-3 font-bold">Verified Showcase</Link></div></div><div className="relative overflow-hidden rounded-3xl border-[10px] border-double border-amber-600 bg-[#fffdf7] p-7 text-center shadow-lg sm:p-9"><Image src="/raja-ali-haji-institute-logo.png" alt="Logo pada contoh sertifikat" width={100} height={100} className="mx-auto h-20 w-20 object-contain" /><p className="mt-5 text-xs font-black uppercase tracking-[0.28em] text-amber-700">Raja Ali Haji Institute</p><Award className="mx-auto mt-5 text-amber-700" /><h3 className="mt-3 font-serif text-3xl font-bold">Verified Achievement</h3><p className="mt-5 text-sm leading-6 text-slate-600">Sertifikat final diterbitkan setelah learning requirements dan verified portfolio gate terpenuhi.</p><p className="mt-5 font-mono text-xs font-bold text-slate-500">RAHI-01-2026-XXXXXX</p></div></div></section>

      <section className="border-y border-stone-300 bg-[#f0ece3] px-5 py-16 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center"><div><ShieldCheck className="text-amber-700" size={34} /><p className="mt-5 text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Verifikasi sertifikat</p><h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Setiap capaian dapat diperiksa</h2></div><div><p className="text-lg leading-8 text-slate-700">Masukkan nomor sertifikat untuk membuka halaman verifikasi publik. Sistem hanya menampilkan sertifikat yang benar-benar telah diterbitkan.</p><CertificateLookup /></div></div></section>

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Siapa yang dapat mengikuti</p><div class