import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Headphones,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import CertificateLookup from "./CertificateLookup";

export const metadata: Metadata = {
  title: "Pilot Cohort 1 | Raja Ali Haji Institute",
  description:
    "Program belajar empat minggu tentang pemikiran Raja Ali Haji dengan delapan modul, pendampingan, kuis, refleksi, dan sertifikat digital terverifikasi.",
  alternates: { canonical: "/raja-ali-haji/pilot-cohort" },
  openGraph: {
    title: "Pilot Cohort 1 | Raja Ali Haji Institute",
    description:
      "Belajar pemikiran Raja Ali Haji dalam program empat minggu yang terstruktur dan didampingi.",
    url: "https://www.hossibarani.com/raja-ali-haji/pilot-cohort",
    type: "website",
  },
};

const programme = "/raja-ali-haji/programmes/pemikiran-raja-ali-haji";
const register = "/register?cohort=RAHI-PILOT-01";

const audiences = [
  ["Dosen", "Memperkaya bahan ajar, riset, dan perspektif keilmuan Melayu."],
  ["Mahasiswa", "Membangun dasar untuk membaca karya dan konteks intelektual Raja Ali Haji."],
  ["ASN", "Menghubungkan amanah, keadilan, musyawarah, dan tanggung jawab jabatan."],
  ["Komunitas", "Menghidupkan pengetahuan Melayu melalui pendidikan dan kerja publik."],
] as const;

const outcomes = [
  "Memetakan gagasan utama Raja Ali Haji tentang diri, bahasa, masyarakat, dan kekuasaan.",
  "Membaca karya Raja Ali Haji secara kontekstual dalam dunia Melayu Riau–Lingga.",
  "Menjelaskan hubungan etika, bahasa, pemerintahan, musyawarah, dan keadilan.",
  "Menyusun refleksi penerapan pemikiran Raja Ali Haji untuk persoalan kontemporer.",
] as const;

const schedule = [
  ["Minggu 1", "5–11 Oktober", "Orientasi · Modul 1–2", "Raja Ali Haji, dunia Melayu, etika, dan pembentukan karakter."],
  ["Minggu 2", "12–18 Oktober", "Modul 3–4", "Bahasa, pikiran, Bustan al-Katibin, dan Kitab Pengetahuan Bahasa."],
  ["Minggu 3", "19–25 Oktober", "Modul 5–6", "Tanggung jawab pejabat, musyawarah, dan tanggung jawab bersama."],
  ["Minggu 4", "26 Oktober–1 November", "Modul 7–8 · Penutupan", "Keadilan, batas moral kekuasaan, refleksi akhir, dan penerapan kontemporer."],
] as const;

const modules = [
  ["01", "Mengenal Raja Ali Haji dan Dunia Melayu"],
  ["02", "Gurindam Dua Belas: Etika dan Pembentukan Karakter"],
  ["03", "Menertibkan Bahasa, Menertibkan Pikiran: Membaca Bustan al-Katibin"],
  ["04", "Kata yang Membentuk Dunia: Membaca Kitab Pengetahuan Bahasa"],
  ["05", "Tsamarat al-Muhimmah: Tanggung Jawab Pejabat"],
  ["06", "Musyawarah dan Tanggung Jawab Bersama"],
  ["07", "Keadilan dan Batas Moral Kekuasaan"],
  ["08", "Relevansi Pemikiran Raja Ali Haji bagi Dunia Kontemporer"],
] as const;

const mentoring = [
  [Headphones, "Orientasi awal", "Panduan menggunakan platform, memahami jadwal, dan menyiapkan target belajar."],
  [MessageCircle, "Check-in mingguan", "Pemantauan progres, hambatan, beban belajar, dan kebutuhan dukungan peserta."],
  [Users, "Diskusi terarah", "Ruang untuk menguji pemahaman dan menghubungkan materi dengan pengalaman peserta."],
  [Sparkles, "Umpan balik", "Refleksi, evaluasi, dan tindak lanjut untuk membantu penyelesaian program."],
] as const;

const faqs = [
  ["Apakah program ini berbayar?", "Tidak. Pilot Cohort 1 diselenggarakan gratis dengan kuota terbatas 20–30 peserta."],
  ["Berapa waktu belajar yang perlu disiapkan?", "Sekitar lima jam per minggu untuk dua modul, termasuk bacaan, podcast, refleksi, esai, dan kuis."],
  ["Apakah seluruh kegiatan dilakukan secara daring?", "Ya. Materi, progres, penilaian, check-in, dan sertifikat dikelola melalui platform digital Raja Ali Haji Institute."],
  ["Apakah saya harus berlatar belakang sejarah atau sastra?", "Tidak. Program dirancang lintas profesi. Peserta cukup memiliki minat belajar dan bersedia mengikuti jadwal sampai selesai."],
  ["Bagaimana sertifikat diterbitkan?", "Sistem menerbitkan sertifikat setelah seluruh delapan modul, nilai kuis minimal 70 pada setiap modul, dan refleksi akhir tervalidasi."],
  ["Bagaimana jika saya tertinggal?", "Peserta menerima pengingat progres dan dapat menyampaikan hambatan melalui check-in mingguan agar fasilitator dapat menentukan dukungan yang sesuai."],
] as const;

export default function PilotCohortPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(245,158,11,0.18),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <Link href="/raja-ali-haji" className="text-sm font-semibold text-slate-300 transition hover:text-amber-300">← Raja Ali Haji Institute</Link>
            <div className="mt-9 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Pendaftaran dibuka
            </div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Pilot Cohort 1 · Program Dasar</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Belajar pemikiran Raja Ali Haji dalam empat minggu.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              Program daring terstruktur dengan delapan modul, podcast, bacaan, refleksi, kuis, pendampingan, dan sertifikat digital terverifikasi.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-slate-300">
              <span className="inline-flex items-center gap-2"><CalendarDays size={18} className="text-amber-300" /> 5 Oktober–1 November 2026</span>
              <span className="inline-flex items-center gap-2"><Users size={18} className="text-amber-300" /> 20–30 peserta</span>
              <span className="inline-flex items-center gap-2"><Clock3 size={18} className="text-amber-300" /> ±5 jam per minggu</span>
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href={register} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-4 font-black text-slate-950 transition hover:bg-amber-300">Daftar Pilot Cohort <ArrowRight size={19} /></Link>
              <Link href={programme} className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-4 font-bold text-white transition hover:border-amber-300">Lihat modul</Link>
            </div>
          </div>
          <aside className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur sm:p-9">
            <Image src="/raja-ali-haji-institute-logo.png" alt="Logo Raja Ali Haji Institute" width={140} height={140} className="h-28 w-28 object-contain" />
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.24em] text-amber-300">Ringkasan program</p>
            <dl className="mt-5 divide-y divide-white/10">
              {[["Format", "Daring dan didampingi"], ["Kurikulum", "8 modul / 4 minggu"], ["Biaya", "Gratis untuk cohort pilot"], ["Kelulusan", "Berbasis capaian"], ["Status", "Pendaftaran dibuka"]].map(([label, value]) => <div key={label} className="grid grid-cols-[7rem_1fr] gap-4 py-4"><dt className="text-sm text-slate-400">{label}</dt><dd className="font-semibold text-white">{value}</dd></div>)}
            </dl>
          </aside>
        </div>
      </section>

      <section className="border-b border-stone-300 bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Siapa yang dapat mengikuti</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">Satu ruang belajar lintas profesi</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {audiences.map(([title, text]) => <article key={title} className="rounded-2xl border border-stone-300 bg-[#f7f4ef] p-6"><GraduationCap className="text-amber-700" /><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Hasil belajar</p><h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Capaian yang dibawa pulang peserta</h2></div>
          <div className="grid gap-4 sm:grid-cols-2">{outcomes.map((outcome) => <div key={outcome} className="rounded-2xl border border-stone-300 bg-white p-6"><CheckCircle2 className="text-emerald-700" /><p className="mt-4 font-semibold leading-7 text-slate-700">{outcome}</p></div>)}</div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Jadwal empat minggu</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
            <div><h2 className="text-3xl font-black tracking-tight sm:text-5xl">Ritme belajar yang jelas dan terukur</h2><p className="mt-5 text-lg leading-8 text-slate-300">Dua modul diselesaikan setiap minggu. Progres tersimpan di akun peserta dan dipantau melalui check-in mingguan.</p></div>
            <div className="divide-y divide-white/10 border-y border-white/10">{schedule.map(([week, date, focus, detail]) => <article key={week} className="grid gap-3 py-6 sm:grid-cols-[9rem_1fr]"><div><p className="font-black text-amber-300">{week}</p><p className="mt-1 text-sm text-slate-400">{date}</p></div><div><h3 className="text-lg font-black">{focus}</h3><p className="mt-2 leading-7 text-slate-300">{detail}</p></div></article>)}</div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 border-b border-stone-300 pb-10 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Delapan modul pembelajaran</p><h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Dari dunia Melayu menuju persoalan masa kini</h2></div><Link href={programme} className="inline-flex items-center gap-2 font-bold text-amber-800">Buka program lengkap <ArrowRight size={18} /></Link></div>
          <div>{modules.map(([number, title], index) => <article key={number} className="grid gap-3 border-b border-stone-300 py-6 sm:grid-cols-[5rem_8rem_1fr] sm:items-center"><span className="font-black text-amber-700">{number}</span><span className="text-sm font-semibold text-slate-500">Minggu {Math.floor(index / 2) + 1}</span><h3 className="text-lg font-bold leading-7 sm:text-xl">{title}</h3></article>)}</div>
        </div>
      </section>

      <section className="border-b border-t border-stone-300 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Metode pendampingan</p><h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">Belajar mandiri, tetapi tidak berjalan sendiri</h2><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{mentoring.map(([Icon, title, text]) => <article key={title} className="rounded-2xl bg-slate-950 p-6 text-white"><Icon className="text-amber-300" /><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 leading-7 text-slate-300">{text}</p></article>)}</div></div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-stone-300 p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-700">Persyaratan kelulusan</p><h2 className="mt-4 text-3xl font-black">Sertifikat diberikan berdasarkan capaian</h2><div className="mt-7 space-y-4">{["Menyelesaikan seluruh aktivitas wajib dalam delapan modul.", "Mencapai nilai kuis minimal 70 pada setiap modul.", "Menyerahkan refleksi akhir pada Modul 8."].map(item => <p key={item} className="flex gap-3 font-semibold leading-7"><CheckCircle2 className="mt-1 shrink-0 text-emerald-700" size={20} />{item}</p>)}</div></div>
          <div className="relative overflow-hidden rounded-3xl border-[10px] border-double border-amber-600 bg-[#fffdf7] p-7 text-center shadow-lg sm:p-9"><Image src="/raja-ali-haji-institute-logo.png" alt="Logo pada contoh sertifikat" width={100} height={100} className="mx-auto h-20 w-20 object-contain" /><p className="mt-5 text-xs font-black uppercase tracking-[0.28em] text-amber-700">Raja Ali Haji Institute</p><Award className="mx-auto mt-5 text-amber-700" /><h3 className="mt-3 font-serif text-3xl font-bold">Certificate of Completion</h3><p className="mt-5 text-sm leading-6 text-slate-600">Contoh tampilan. Sertifikat final memuat nama peserta, nomor unik, tanggal penerbitan, kode QR, dan alamat verifikasi publik.</p><p className="mt-5 font-mono text-xs font-bold text-slate-500">RAHI-01-2026-XXXXXX</p></div>
        </div>
      </section>

      <section className="border-y border-stone-300 bg-[#f0ece3] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center"><div><ShieldCheck className="text-amber-700" size={34} /><p className="mt-5 text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Verifikasi sertifikat</p><h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Setiap capaian dapat diperiksa</h2></div><div><p className="text-lg leading-8 text-slate-700">Masukkan nomor sertifikat untuk membuka halaman verifikasi publik. Sistem hanya menampilkan sertifikat yang benar-benar telah diterbitkan.</p><CertificateLookup /></div></div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Status dan tanggal cohort</p><div className="mt-6 grid gap-5 md:grid-cols-3">{[["Pendaftaran", "Dibuka", "Sampai kuota terpenuhi"], ["Pelaksanaan", "5 Oktober–1 November 2026", "Empat minggu secara daring"], ["Kapasitas", "20–30 peserta", "Dosen, mahasiswa, ASN, dan komunitas"]].map(([label, value, note]) => <article key={label} className="rounded-2xl border border-stone-300 bg-white p-6"><p className="text-sm font-bold text-amber-700">{label}</p><p className="mt-3 text-2xl font-black">{value}</p><p className="mt-2 text-sm leading-6 text-slate-500">{note}</p></article>)}</div><div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-3xl bg-amber-400 p-7 sm:flex-row sm:p-9"><div><h2 className="text-3xl font-black">Siap mengikuti Pilot Cohort 1?</h2><p className="mt-2 text-slate-800">Buat akun peserta untuk mengikuti jadwal, menyimpan progres, dan memperoleh sertifikat.</p></div><Link href={register} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-6 py-4 font-black text-white transition hover:bg-slate-800">Daftar Pilot Cohort <ArrowRight size={19} /></Link></div></div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">FAQ peserta</p><h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Pertanyaan sebelum mendaftar</h2><div className="mt-9 divide-y divide-stone-300 border-y border-stone-300">{faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none pr-8 text-lg font-black marker:content-none">{question}<span className="float-right text-amber-700 transition group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl leading-7 text-slate-600">{answer}</p></details>)}</div></div>
      </section>
    </main>
  );
}
