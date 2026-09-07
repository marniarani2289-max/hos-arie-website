import Link from 'next/link';
import { assessmentRubric, learningOutcomes, portfolioMilestones, portfolioTracks } from '../outcome-portfolio';

export const metadata = { title: 'My Portfolio | Raja Ali Haji Institute' };

export default function PortfolioWorkspacePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Pilot Cohort · Outcome-Based Learning</p>
        <h1 className="mt-3 text-4xl font-bold">My Portfolio Workspace</h1>
        <p className="mt-4 max-w-3xl text-lg text-stone-600">Learn → Apply → Produce → Review → Improve → Verify → Showcase. Workspace ini menjadi pusat bukti belajar peserta, bukan sekadar daftar modul yang selesai.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold">Portfolio Project</h2>
            <p className="mt-2 text-stone-600">Pilih satu track, definisikan problem, kumpulkan evidence, kirim draft, revisi, lalu ajukan karya final untuk verifikasi manusia.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">{portfolioTracks.map((track) => <div key={track} className="rounded-xl border p-4 font-medium">{track}</div>)}</div>
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="text-xl font-semibold">Learning Outcomes</h2>
            <div className="mt-4 space-y-3">{learningOutcomes.map((o) => <div key={o.id}><span className="font-semibold">{o.id} · {o.title}</span><p className="text-sm text-stone-600">{o.description}</p></div>)}</div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">4-Week Production Journey</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">{portfolioMilestones.map((m) => <div key={m.week} className="rounded-xl bg-stone-50 p-4"><p className="text-sm text-amber-700">Week {m.week}</p><p className="font-semibold">{m.stage}</p><p className="mt-2 text-sm text-stone-600">Output: {m.artifact}</p></div>)}</div>
        </div>

        <div className="mt-6 rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Assessment Rubric · 100 points</h2>
          <div className="mt-4 divide-y">{assessmentRubric.map((r) => <div key={r.criterion} className="flex justify-between py-3"><span>{r.criterion}</span><strong>{r.weight}</strong></div>)}</div>
          <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm">AI assessment bersifat advisory. Status VERIFIED hanya dapat diberikan setelah facilitator review dan keputusan manusia.</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3"><Link href="/raja-ali-haji/pilot-cohort" className="rounded-full border px-5 py-3 font-semibold">Kembali ke Pilot Cohort</Link><Link href="/raja-ali-haji/pilot-cohort/showcase" className="rounded-full bg-stone-900 px-5 py-3 font-semibold text-white">Lihat Portfolio Showcase</Link></div>
      </section>
    </main>
  );
}
