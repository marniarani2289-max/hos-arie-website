import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DDII Kepri | Organisasi",
  description: "Dewan Dakwah Islamiyah Indonesia (DDII) Kepulauan Riau dalam ruang organisasi dan pengabdian Dr. Hos Arie Sibarani.",
  alternates: { canonical: "/ddii-kepri" },
};

export default function OrganizationPage() {
  return (
    <div className="bg-[#faf9f5] text-slate-900">
      <section className="border-b border-emerald-900 bg-emerald-950 px-5 py-16 text-white sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="text-sm font-medium text-emerald-100 underline underline-offset-4 hover:text-white">Beranda Hossibarani</Link>
          <p className="mt-12 text-xs font-bold uppercase tracking-[0.22em] text-amber-300">Organisasi · Kepulauan Riau</p>
          <h1 className="mt-5 font-academic text-5xl font-bold tracking-tight sm:text-7xl">DDII Kepri</h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-emerald-50 sm:text-2xl">Dewan Dakwah Islamiyah Indonesia<br className="hidden sm:block" /> Kepulauan Riau</p>
          <p className="mt-8 max-w-2xl text-base leading-8 text-emerald-100">Bagian dari jejaring organisasi dan pengabdian Dr. Hos Arie Sibarani di Kepulauan Riau.</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20" aria-labelledby="documentation-title">
        <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-7 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Ruang dokumentasi</p>
          <h2 id="documentation-title" className="mt-4 font-academic text-3xl font-bold text-slate-950">Kegiatan dan pengabdian</h2>
          <p className="mt-5 leading-8 text-slate-600">Halaman ini disiapkan untuk menghimpun informasi keterlibatan, kegiatan, dan dokumentasi DDII Kepri. Materi kegiatan belum ditambahkan.</p>
          <Link href="/about" className="mt-7 inline-flex rounded-xl bg-emerald-900 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800">Lihat profil Hos Arie Sibarani</Link>
        </div>
      </section>
    </div>
  );
}
