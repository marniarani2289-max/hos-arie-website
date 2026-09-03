import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Award, BookOpen, CalendarDays, CheckCircle2, Clock3, Target, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Program Dasar Pemikiran Raja Ali Haji",
  description:
    "Delapan tahap pembelajaran untuk memahami karya, bahasa, etika, pemerintahan, dan relevansi pemikiran Raja Ali Haji.",
  alternates: { canonical: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji" },
};

const BASE = "/raja-ali-haji/programmes/pemikiran-raja-ali-haji";

const modules = [
  {
    number: "01",
    week: "Minggu 1",
    title: "Mengenal Raja Ali Haji dan Dunia Melayu",
    duration: "90–120 menit",
    href: `${BASE}/module-1`,
    available: true,
  },
  {
    number: "02",
    week: "Minggu 1",
    title: "Gurindam Dua Belas: Etika dan Pembentukan Karakter",
    duration: "120–150 menit",
    href: `${BASE}/module-2`,
    available: true,
  },
  {
    number: "03",
    week: "Minggu 2",
    title: "Menertibkan Bahasa, Menertibkan Pikiran: Membaca Bustan al-Katibin",
    duration: "120–150 menit",
    href: `${BASE}/module-3`,
    available: true,
  },
  {
    number: "04",
    week: "Minggu 2",
    title: "Kata yang Membentuk Dunia: Membaca Kitab Pengetahuan Bahasa",
    duration: "120–150 menit",
    href: `${BASE}/module-4`,
    available: true,
  },
  {
    number: "05",
    week: "Minggu 3",
    title: "Tsamarat al-Muhimmah: Tanggung Jawab Pejabat",
    duration: "120–150 menit",
    href: `${BASE}/module-5`,
    available: true,
  },
  {
    number: "06",
    week: "Minggu 3",
    title: "Musyawarah dan Tanggung Jawab Bersama",
    duration: "120–150 menit",
    href: `${BASE}/module-6`,
    available: true,
  },
  {
    number: "07",
    week: "Minggu 4",
    title: "Keadilan dan Batas Moral Kekuasaan",
    duration: "120–150 menit",
    href: `${BASE}/module-7`,
    available: true,
  },
  {
    number: "08",
    week: "Minggu 4",
    title: "Relevansi Pemikiran Raja Ali Haji bagi Dunia Kontemporer",
    duration: "150–180 menit",
    href: `${BASE}/module-8`,
    available: true,
  },
];

export default function PemikiranRajaAliHajiProgrammePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-slate-950">
      <section className="bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/raja-ali-haji"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-amber-300"
          >
            <ArrowLeft size={17} /> Kembali ke Raja Ali Haji Institute
          </Link>
          <p className="mt-12 text-xs font-bold uppercase tracking-[0.28em] text-amber-400">
            Program Dasar Pemikiran Raja Ali Haji
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            Belajar dari karya. Membaca dunia Melayu.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Pilot Cohort 1 adalah pengalaman belajar empat minggu dengan jadwal,
            pendampingan, bacaan, podcast, refleksi, esai, dan kuis. Progres
            setiap modul tersimpan di akun peserta dan dapat dilanjutkan dari
            perangkat lain.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-slate-300">
            <span className="inline-flex items-center gap-2"><CalendarDays size={17} className="text-amber-400" /> 5 Oktober–1 November 2026</span>
            <span className="inline-flex items-center gap-2"><Users size={17} className="text-amber-400" /> 20–30 peserta</span>
            <span className="inline-flex items-center gap-2"><Clock3 size={17} className="text-amber-400" /> ±5 jam per minggu</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/register?cohort=RAHI-PILOT-01" className="rounded-xl bg-amber-400 px-6 py-4 font-bold text-slate-950 hover:bg-amber-300">Daftar Pilot Cohort 1</Link>
            <Link href="/dashboard" className="rounded-xl border border-white/30 px-6 py-4 font-bold text-white hover:border-amber-400">Dashboard peserta</Link>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-300 bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Untuk siapa program ini?</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Satu ruang belajar lintas profesi</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Pilot dirancang untuk dosen, mahasiswa, ASN, dan anggota komunitas yang ingin membaca Raja Ali Haji secara serius serta menghubungkannya dengan pendidikan, kepemimpinan, masyarakat, dan tata kelola masa kini.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Dosen", "Memperkaya pengajaran, riset, dan perspektif keilmuan Melayu."],
              ["Mahasiswa", "Membangun dasar membaca karya, gagasan, dan konteks sejarah."],
              ["ASN", "Menghubungkan amanah, keadilan, musyawarah, dan tanggung jawab jabatan."],
              ["Komunitas", "Menghidupkan pengetahuan Melayu melalui pembelajaran dan kerja publik."],
            ].map(([title, text]) => <article key={title} className="rounded-2xl border border-stone-300 bg-[#f7f4ef] p-6"><h3 className="text-xl font-black">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Hasil belajar</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Apa yang akan dikuasai peserta?</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [Target, "Memetakan gagasan utama", "Mengenali hubungan antara diri, bahasa, pengetahuan, masyarakat, dan kekuasaan."],
                [BookOpen, "Membaca karya secara kontekstual", "Memahami karya Raja Ali Haji dalam dunia intelektual dan pemerintahan Melayu."],
                [Users, "Berdialog lintas profesi", "Menguji relevansi gagasan melalui pengalaman akademik, birokrasi, dan komunitas."],
                [Award, "Merumuskan penerapan", "Menyusun refleksi dan respons konkret untuk persoalan kontemporer."],
              ].map(([Icon, title, text]) => { const LearningIcon = Icon as typeof Target; return <article key={String(title)} className="rounded-2xl border border-stone-300 bg-white p-6"><LearningIcon className="text-amber-700" /><h3 className="mt-5 text-xl font-black">{String(title)}</h3><p className="mt-3 leading-7 text-slate-600">{String(text)}</p></article>; })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-400">Jadwal Pilot Cohort 1</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div><h2 className="text-3xl font-black tracking-tight sm:text-5xl">Empat minggu dengan ritme yang terarah</h2><p className="mt-5 text-lg leading-8 text-slate-300">Setiap minggu peserta menyelesaikan dua modul. Pendampingan digunakan untuk orientasi, diskusi, pengingat progres, dan refleksi penutup.</p></div>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {[
                ["Minggu 1", "5–11 Oktober", "Orientasi · Modul 1–2", "Raja Ali Haji, dunia Melayu, etika, dan pembentukan karakter"],
                ["Minggu 2", "12–18 Oktober", "Modul 3–4", "Bahasa, pikiran, Bustan al-Katibin, dan Kitab Pengetahuan Bahasa"],
                ["Minggu 3", "19–25 Oktober", "Modul 5–6", "Tanggung jawab pejabat, musyawarah, dan tanggung jawab bersama"],
                ["Minggu 4", "26 Oktober–1 November", "Modul 7–8 · Penutupan", "Keadilan, batas kekuasaan, refleksi akhir, dan penerapan kontemporer"],
              ].map(([week, date, focus, detail]) => <article key={week} className="grid gap-3 py-6 sm:grid-cols-[8rem_1fr]"><div><p className="font-black text-amber-300">{week}</p><p className="mt-1 text-sm text-slate-400">{date}</p></div><div><h3 className="text-lg font-black">{focus}</h3><p className="mt-2 leading-7 text-slate-300">{detail}</p></div></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-stone-300 pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
                Kurikulum
              </p>
              <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
                Delapan tahap pembelajaran
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-600">
              Seluruh Modul 1 sampai Modul 8 sudah tersedia. Dalam pilot,
              modul dijalankan mengikuti jadwal empat minggu dengan pendampingan.
            </p>
          </div>

          <div>
            {modules.map((module) => (
              <article
                key={module.number}
                className="grid gap-5 border-b border-stone-300 py-9 sm:grid-cols-[5rem_1fr_auto] sm:items-center"
              >
                <p className="text-lg font-bold text-amber-700">{module.number}</p>
                <div>
                  <h3 className="text-xl font-bold leading-8 sm:text-2xl">{module.title}</h3>
                  <p className="mt-2 inline-flex items-center gap-2 text-slate-500">
                    {module.available && <Clock3 size={16} />} {module.duration} · {module.week}
                  </p>
                </div>

                {module.available && module.href ? (
                  <Link
                    href={module.href}
                    className="inline-flex items-center justify-center gap-3 rounded-xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-amber-700"
                  >
                    Mulai belajar <ArrowRight size={19} />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 font-semibold text-slate-400">
                    <CheckCircle2 size={19} /> Belum dibuka
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-300 bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_.85fr]">
          <div><p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Sertifikat penyelesaian</p><h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Sertifikat diberikan berdasarkan capaian</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Peserta memperoleh sertifikat digital terverifikasi setelah memenuhi seluruh persyaratan program.</p></div>
          <div className="rounded-3xl bg-[#f7f4ef] p-7 sm:p-9"><div className="space-y-4">{["Menyelesaikan seluruh aktivitas wajib dalam delapan modul", "Mencapai nilai kuis minimal 70 pada setiap modul", "Menyerahkan refleksi akhir pada Modul 8"].map(item => <p key={item} className="flex gap-3 font-semibold leading-7"><CheckCircle2 className="mt-1 shrink-0 text-emerald-700" size={20} />{item}</p>)}</div><Link href="/register?cohort=RAHI-PILOT-01" className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-6 py-4 font-bold text-white hover:bg-amber-700">Daftar sebagai peserta pilot <ArrowRight className="ml-2" size={19} /></Link><p className="mt-4 text-center text-sm text-slate-500">Pilot Cohort 1 · Gratis · Kuota terbatas 20–30 peserta</p></div>
        </div>
      </section>
    </main>
  );
}
