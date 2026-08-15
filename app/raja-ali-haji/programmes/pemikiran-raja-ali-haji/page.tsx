import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Program Dasar Pemikiran Raja Ali Haji",
  description:
    "Delapan tahap pembelajaran untuk memahami karya, bahasa, etika, pemerintahan, dan relevansi pemikiran Raja Ali Haji.",
};

const BASE = "/raja-ali-haji/programmes/pemikiran-raja-ali-haji";

const modules = [
  {
    number: "01",
    title: "Mengenal Raja Ali Haji dan Dunia Melayu",
    duration: "90–120 menit",
    href: `${BASE}/module-1`,
    available: true,
  },
  {
    number: "02",
    title: "Gurindam Dua Belas: Etika dan Pembentukan Karakter",
    duration: "120–150 menit",
    href: `${BASE}/module-2`,
    available: true,
  },
  {
    number: "03",
    title: "Menertibkan Bahasa, Menertibkan Pikiran: Membaca Bustan al-Katibin",
    duration: "120–150 menit",
    href: `${BASE}/module-3`,
    available: true,
  },
  {
    number: "04",
    title: "Kata yang Membentuk Dunia: Membaca Kitab Pengetahuan Bahasa",
    duration: "120–150 menit",
    href: `${BASE}/module-4`,
    available: true,
  },
  {
    number: "05",
    title: "Tsamarat al-Muhimmah: Tanggung Jawab Pejabat",
    duration: "Segera",
    available: false,
  },
  {
    number: "06",
    title: "Musyawarah dan Tanggung Jawab Bersama",
    duration: "Segera",
    available: false,
  },
  {
    number: "07",
    title: "Keadilan dan Batas Moral Kekuasaan",
    duration: "Segera",
    available: false,
  },
  {
    number: "08",
    title: "Relevansi Pemikiran Raja Ali Haji bagi Dunia Kontemporer",
    duration: "Segera",
    available: false,
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
            Jalur belajar mandiri melalui bacaan, podcast, refleksi, esai, dan kuis.
            Kemajuan tersimpan pada perangkat yang digunakan.
          </p>
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
              Modul dibuka bertahap. Saat ini Modul 1 sampai Modul 4 sudah tersedia
              dan dapat dipelajari secara mandiri.
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
                    {module.available && <Clock3 size={16} />} {module.duration}
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
    </main>
  );
}
