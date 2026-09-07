import Link from 'next/link';

export const metadata = { title: 'Portfolio Showcase | Raja Ali Haji Institute' };

export default function PortfolioShowcasePage() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">Raja Ali Haji Institute</p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">Verified Portfolio Showcase</h1>
        <p className="mt-5 max-w-3xl text-lg text-stone-300">Ruang publik untuk karya peserta yang telah memenuhi standar, mendapat persetujuan peserta untuk ditampilkan, dan melewati human verification.</p>
        <div className="mt-10 rounded-2xl border border-stone-700 bg-stone-900 p-8">
          <p className="text-sm uppercase tracking-wider text-amber-400">Pilot Cohort 2026</p>
          <h2 className="mt-2 text-2xl font-semibold">Showcase sedang disiapkan</h2>
          <p className="mt-3 text-stone-300">Karya tidak dipublikasikan otomatis. Hanya portfolio berstatus PUBLIC + VERIFIED + approved for showcase yang akan muncul di sini.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-stone-800 p-4"><strong>Private</strong><p className="text-sm text-stone-400">Hanya peserta & reviewer.</p></div><div className="rounded-xl bg-stone-800 p-4"><strong>Unlisted</strong><p className="text-sm text-stone-400">Dapat dibagikan via tautan.</p></div><div className="rounded-xl bg-stone-800 p-4"><strong>Public</strong><p className="text-sm text-stone-400">Eligible untuk showcase setelah moderasi.</p></div></div>
        </div>
        <div className="mt-8 flex gap-3"><Link href="/raja-ali-haji/pilot-cohort/portfolio" className="rounded-full bg-amber-400 px-5 py-3 font-semibold text-stone-950">Portfolio Workspace</Link><Link href="/raja-ali-haji/pilot-cohort" className="rounded-full border border-stone-600 px-5 py-3 font-semibold">Pilot Cohort</Link></div>
      </section>
    </main>
  );
}
