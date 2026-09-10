import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { institutePilot } from "@/lib/programmes/catalogue";
import CertificateLookup from "./CertificateLookup";

export const metadata: Metadata = {
  title: "Pilot Cohort 1 | Raja Ali Haji Institute",
  description: "Program empat minggu dengan delapan modul, pendampingan, dan portofolio terverifikasi. Lihat jadwal, biaya, dan persyaratan kelulusan.",
  alternates: { canonical: "/raja-ali-haji/pilot-cohort" },
};

const register = institutePilot.registerHref;
const programme = institutePilot.modulesHref;
const portfolio = "/raja-ali-haji/pilot-cohort/portfolio";
const showcase = "/raja-ali-haji/pilot-cohort/showcase";

const journey = [
  ["Belajar", "Selesaikan 8 modul dan pahami konsep utama Raja Ali Haji."],
  ["Terapkan", "Terapkan konsep pada kasus, kebijakan, atau persoalan kontemporer."],
  ["Hasilkan karya", "Hasilkan proyek dan karya akhir portofolio."],
  ["Verifikasi", "Dapatkan penilaian berdasarkan rubrik dan keputusan penilai manusia."],
  ["Bagikan karya", "Karya yang dipilih untuk publik, terverifikasi, dan disetujui dapat tampil di galeri."],
] as const;

const outcomes = [
  ["LO-1 · Pengetahuan", "Memahami konsep utama Raja Ali Haji dan Konstitusionalisme Etis Melayu."],
  ["LO-2 · Analisis", "Menganalisis persoalan kontemporer dengan kerangka yang dipelajari."],
  ["LO-3 · Penerapan", "Menerapkan konsep pada kasus, kebijakan, atau problem nyata."],
  ["LO-4 · Komunikasi", "Menyajikan argumentasi secara terstruktur dan bertanggung jawab."],
  ["LO-5 · Karya", "Menghasilkan karya final yang layak menjadi portofolio terverifikasi."],
] as const;

const gates = [...institutePilot.requirements, "Memenuhi syarat sertifikat"];

const weeks = [
  ["Minggu 1", "Belajar dan merumuskan", "Modul 1–2 · Usulan proyek"],
  ["Minggu 2", "Menganalisis dan menerapkan", "Modul 3–4 · Kerangka analisis dan peta bukti"],
  ["Minggu 3", "Hasilkan karya", "Modul 5–6 · Draf portofolio pertama dan umpan balik"],
  ["Minggu 4", "Menyempurnakan dan menyajikan", "Modul 7–8 · Penyerahan akhir dan verifikasi manusia"],
] as const;

const faqs = [
  ["Siapa yang dapat mengikuti?", "Dosen, guru, mahasiswa, ASN, dan anggota komunitas. Tidak perlu latar belakang khusus kajian Melayu; siapkan perangkat dengan internet dan waktu belajar sekitar lima jam per minggu."],
  ["Kapan program dilaksanakan?", `Pilot dijadwalkan ${institutePilot.dates.id}. Peserta menyelesaikan dua modul setiap minggu.`],
  ["Bagaimana pendampingannya?", "Pendampingan mencakup orientasi, diskusi, pengingat progres, umpan balik karya, dan refleksi penutup. Rincian sesi disampaikan pengelola kepada peserta."],
  ["Apakah program ini berbayar?", "Tidak. Pilot Cohort 1 gratis dengan kuota terbatas 20–30 peserta."],
  ["Apakah cukup menyelesaikan delapan modul?", "Tidak. Modul adalah fondasi. Kelulusan juga mensyaratkan refleksi akhir dan portofolio yang diverifikasi manusia."],
  ["Bagaimana sertifikat diterbitkan?", "Sertifikat dapat diterbitkan setelah 8 modul selesai, seluruh kuis minimal 70, refleksi akhir diserahkan, dan portofolio diverifikasi penilai manusia dengan skor minimal 60/100."],
  ["Apakah AI menentukan kelulusan?", "Tidak. AI hanya dapat membantu penilaian awal atau umpan balik selama belajar. Keputusan verifikasi tetap dibuat penilai manusia."],
  ["Apakah semua karya otomatis dipublikasikan?", "Tidak. Galeri hanya menampilkan karya yang dipilih untuk publik, terverifikasi, dan disetujui untuk ditampilkan."],
] as const;

export default function PilotCohortPage() {
  return <main lang="id" className="min-h-screen bg-[#f7f4ef] text-slate-950">
    <section className="bg-slate-950 px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
        <div>
          <Link href="/raja-ali-haji" className="text-sm font-semibold text-slate-300 hover:text-amber-300">← Raja Ali Haji Institute</Link>
          <p className="mt-10 text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Pilot Cohort 1 · Pembelajaran Berbasis Capaian dan Portofolio</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">Belajar. Terapkan. Hasilkan karya yang dapat diverifikasi.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Peserta mempelajari pemikiran Raja Ali Haji, menerapkannya pada persoalan nyata, dan menghasilkan karya portofolio yang dinilai manusia.</p>
          <p className="mt-7 font-mono font-black text-amber-300">Belajar → Terapkan → Hasilkan → Verifikasi → Bagikan</p>
          <div className="mt-9 flex flex-wrap gap-4"><Link href={register} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-4 font-black text-slate-950">Daftar Pilot Cohort <ArrowRight size={18}/></Link><Link href={showcase} className="rounded-xl border border-white/25 px-6 py-4 font-bold">Galeri portofolio</Link></div>
        </div>
        <aside className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">Syarat sertifikat</p><div className="mt-6 space-y-3">{gates.map((gate, i) => <div key={gate}><p className={i === gates.length - 1 ? "font-black text-emerald-300" : "font-semibold"}>{gate}</p>{i < gates.length - 1 && <p className="mt-2 text-slate-500">↓</p>}</div>)}</div></aside>
      </div>
    </section>

    <section aria-labelledby="pilot-information" className="border-b border-stone-300 bg-white px-5 py-12 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><h2 id="pilot-information" className="text-2xl font-bold">Informasi Pilot Cohort 1</h2><dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{[["Jadwal", institutePilot.dates.id], ["Biaya dan kuota", `${institutePilot.fee.id} · ${institutePilot.capacity.id}`], ["Waktu belajar", institutePilot.workload.id], ["Status", "Formulir pendaftaran tersedia; mulai dari membuat akun peserta."]].map(([label, value]) => <div key={label}><dt className="font-bold text-amber-800">{label}</dt><dd className="mt-2 leading-7 text-slate-600">{value}</dd></div>)}</dl><p className="mt-6 leading-7 text-slate-600">Untuk dosen, guru, mahasiswa, ASN, dan komunitas. Siapkan perangkat dengan internet; materi pengantar tersedia di dalam modul.</p></div></section>

    <section className="bg-white px-5 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Alur pembelajaran</p><h2 className="mt-4 text-3xl font-black sm:text-5xl">Dari konsumsi materi menuju bukti kompetensi</h2><div className="mt-10 grid gap-4 md:grid-cols-5">{journey.map(([stage,text],i)=><article key={stage} className="rounded-2xl border border-stone-300 bg-[#f7f4ef] p-5"><p className="text-xs font-black text-amber-700">0{i+1}</p><h3 className="mt-3 text-xl font-black">{stage}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></article>)}</div></div></section>

    <section className="px-5 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Capaian pembelajaran</p><h2 className="mt-4 text-3xl font-black sm:text-5xl">Lima capaian yang harus dapat dibuktikan</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{outcomes.map(([title,text])=><article key={title} className="rounded-2xl border border-stone-300 bg-white p-6"><CheckCircle2 className="text-emerald-700"/><h3 className="mt-4 font-black">{title}</h3><p className="mt-2 leading-7 text-slate-600">{text}</p></article>)}</div></div></section>

    <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Empat minggu produksi</p><h2 className="mt-4 text-3xl font-black sm:text-5xl">Hasil kerja setiap minggu</h2><div className="mt-10 divide-y divide-white/10 border-y border-white/10">{weeks.map(([week,stage,output])=><article key={week} className="grid gap-3 py-6 md:grid-cols-[9rem_13rem_1fr]"><p className="font-black text-amber-300">{week}</p><h3 className="font-black">{stage}</h3><p className="text-slate-300">{output}</p></article>)}</div><Link href={programme} className="mt-8 inline-flex items-center gap-2 font-bold text-amber-300">Lihat delapan modul <ArrowRight size={18}/></Link></div></section>

    <section className="bg-white px-5 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl rounded-3xl border border-stone-300 p-7 sm:p-10"><p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-700">Persyaratan kelulusan</p><h2 className="mt-4 text-3xl font-black">Sertifikat diberikan berdasarkan bukti belajar</h2><div className="mt-7 grid gap-4 md:grid-cols-2">{gates.slice(0,4).map(item=><p key={item} className="flex gap-3 font-semibold"><CheckCircle2 className="shrink-0 text-emerald-700" size={20}/>{item}</p>)}</div><p className="mt-7 rounded-xl bg-emerald-50 p-5 font-black text-emerald-900">Seluruh persyaratan terpenuhi → Memenuhi syarat sertifikat</p><div className="mt-7 flex flex-wrap gap-3"><Link href={portfolio} className="rounded-xl bg-slate-950 px-5 py-3 font-bold text-white">Ruang kerja portofolio</Link><Link href={showcase} className="rounded-xl border border-stone-300 px-5 py-3 font-bold">Galeri karya terverifikasi</Link></div></div></section>

    <section className="border-y border-stone-300 bg-[#f0ece3] px-5 py-16 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center"><div><ShieldCheck className="text-amber-700" size={34}/><p className="mt-5 text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Verifikasi sertifikat</p><h2 className="mt-4 text-3xl font-black sm:text-5xl">Setiap capaian dapat diperiksa</h2></div><div><p className="text-lg leading-8 text-slate-700">Masukkan nomor sertifikat untuk membuka halaman verifikasi publik.</p><CertificateLookup/></div></div></section>

    <section className="bg-white px-5 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">FAQ peserta</p><h2 className="mt-4 text-3xl font-black sm:text-5xl">Pertanyaan sebelum mendaftar</h2><div className="mt-9 divide-y divide-stone-300 border-y border-stone-300">{faqs.map(([q,a])=><details key={q} className="py-5"><summary className="cursor-pointer text-lg font-black">{q}</summary><p className="mt-4 leading-7 text-slate-600">{a}</p></details>)}</div><div className="mt-10"><Link href={register} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-4 font-black">Daftar Pilot Cohort <ArrowRight size={18}/></Link></div></div></section>
  </main>;
}
