import type { Metadata } from "next";
import Link from "next/link";
import { journals } from "@/lib/journals";

export const metadata: Metadata = {
  title: "Journal | Lima Jurnal RAHRN",
  description: "Jelajahi lima jurnal Raja Ali Haji Research Network: JMCS, JBE, JMLT, JEML, dan SMCK. Temukan bidang kajian, akses jurnal, serta seminar internasional dan publishing bersama BIAF.",
  alternates: { canonical: "/journals" },
};

export default function JournalsPage() {
  return (
    <div className="bg-[#f8f7f3] text-slate-900">
      <section className="border-b-4 border-amber-400 bg-slate-950 px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">Raja Ali Haji Research Network</p>
          <div className="mt-6 grid gap-8 md:grid-cols-[1fr_1.15fr] md:items-end">
            <div>
              <h1 className="font-academic text-6xl font-bold tracking-tight sm:text-7xl">Journal</h1>
              <p className="mt-5 text-lg text-slate-300">Lima jurnal. Beragam bidang keilmuan.</p>
            </div>
            <p className="max-w-xl text-base leading-8 text-slate-300">Temukan jurnal sesuai bidang kajian Anda, mulai dari konstitusionalisme Melayu dan pendidikan hingga hukum maritim, teknologi, kebudayaan, dan peradaban.</p>
          </div>
          <nav aria-label="Pilih jurnal" className="mt-10 flex flex-wrap gap-3">
            {journals.map((journal) => (
              <a key={journal.code} href={`#${journal.code.toLowerCase()}`} className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold text-white transition hover:border-amber-300 hover:bg-amber-300 hover:text-slate-950">{journal.code}</a>
            ))}
            <a href="#biaf" className="rounded-full border border-amber-300/60 px-5 py-2.5 text-sm font-bold text-amber-200 transition hover:bg-amber-300 hover:text-slate-950">BIAF · Seminar & Publishing</a>
          </nav>
        </div>
      </section>

      <section aria-labelledby="journal-directory" className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800">Direktori jurnal</p><h2 id="journal-directory" className="mt-3 font-academic text-3xl font-bold sm:text-4xl">Pilih ruang keilmuan Anda.</h2></div>
          <a href="https://journal.hossibarani.com/" className="text-sm font-semibold text-slate-700 underline underline-offset-4 hover:text-amber-800">Buka portal OJS RAHRN ↗</a>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {journals.map((journal, index) => (
            <article key={journal.code} id={journal.code.toLowerCase()} className="flex scroll-mt-24 flex-col rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
              <div className="flex items-center justify-between gap-4"><span className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-extrabold tracking-wider text-amber-300">{journal.code}</span><span aria-hidden="true" className="font-academic text-2xl text-slate-300">0{index + 1}</span></div>
              <p className="mt-6 text-xs font-bold uppercase tracking-wider text-amber-800">{journal.field}</p>
              <h3 className="mt-3 font-academic text-2xl font-bold leading-snug text-slate-950">{journal.name}</h3>
              <p className="mb-7 mt-4 text-sm leading-7 text-slate-600">{journal.description}</p>
              <div className="mt-auto flex flex-wrap items-center gap-5 border-t border-slate-100 pt-6">
                <a href={journal.url} aria-label={`Buka jurnal ${journal.code} di OJS`} className="inline-flex rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800">Buka jurnal <span aria-hidden="true" className="ml-2">↗</span></a>
                {journal.profile ? <Link href={journal.profile} className="text-sm font-semibold text-slate-700 underline underline-offset-4 hover:text-amber-800">Profil & materi</Link> : null}
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-7 text-slate-600">Informasi penerimaan naskah, panduan penulis, tim editorial, dan terbitan mengikuti pengumuman pada laman OJS masing-masing jurnal.</p>
      </section>

      <section id="biaf" aria-labelledby="biaf-heading" className="scroll-mt-24 border-t border-slate-200 bg-white px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-2xl bg-slate-950 p-7 text-white sm:p-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Seminar internasional & publishing</p>
            <h2 id="biaf-heading" className="mt-4 font-academic text-3xl font-bold sm:text-4xl">Batam International Academic Forum</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">BIAF melengkapi ruang Journal melalui forum akademik, seminar internasional, dan pengembangan publikasi ilmiah. Jelajahi profil BIAF serta program ASEAN Scholarly Publishing Summit.</p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <Link href="/biaf" className="inline-flex rounded-lg bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200">Jelajahi BIAF <span aria-hidden="true" className="ml-2">→</span></Link>
            <Link href="/biaf/summit" className="inline-flex rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold leading-6 text-white transition hover:bg-white/10">ASEAN Scholarly Publishing Summit <span aria-hidden="true" className="ml-2">→</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
