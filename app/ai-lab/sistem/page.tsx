import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  FlaskConical,
  Gauge,
  GitCommitHorizontal,
  Layers3,
  NotebookText,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { labs, type Status } from "../labs";
export const metadata: Metadata = {title: "Catatan Sistem AI Lab", alternates: {canonical: "/ai-lab/sistem"}};
const statusStyle: Record<Status, string> = {
  Prototype: "border-violet-200 bg-violet-50 text-violet-800",
  Pilot: "border-amber-200 bg-amber-50 text-amber-800",
  Stable: "border-blue-200 bg-blue-50 text-blue-800",
  Production: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

const evidenceFields = [
  ["Problem", "The question or operational constraint being addressed", Gauge],
  ["System", "The product, workflow, or capability that was built", Layers3],
  ["Technology & method", "The technical and analytical approach", Wrench],
  ["Testing", "How usefulness, safety, or performance is assessed", FlaskConical],
  ["Verifiable result", "What a visitor can inspect or confirm", CheckCircle2],
] as const;

export default function SystemsPage() { return <div className="bg-white"><div className="mx-auto max-w-7xl px-5 pt-10"><Link href="/ai-lab#sistem" className="inline-flex min-h-11 items-center font-semibold text-amber-800">← Kembali ke katalog AI Lab</Link><h1 className="mt-4 text-4xl font-bold text-slate-950">Catatan sistem dan pengujian</h1><p className="mt-4 text-slate-600">Dokumentasi lengkap tujuh sistem Lab. Status dan tanggal mengikuti catatan pengujian yang tersedia.</p></div>      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">Lab index</p>
          <h2 className="font-academic mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {labs.length} systems. One evidence standard.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            These projects connect scholarship with working digital infrastructure.
            Their status will change only when testing and verifiable results justify it.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {labs.map((lab) => (
            <article id={`lab-${lab.number}`} key={lab.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-45px_rgba(15,23,42,0.45)]">
              <div className="grid border-b border-slate-200 lg:grid-cols-[13rem_1fr_auto] lg:items-center">
                <div className="flex items-baseline gap-3 bg-slate-950 px-6 py-6 text-white lg:h-full lg:flex-col lg:justify-center lg:px-8">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">LAB</span>
                  <span className="font-academic text-4xl font-bold">{lab.number}</span>
                </div>
                <div className="px-6 py-7 lg:px-9">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">{lab.domain}</p>
                  <h3 className="font-academic mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{lab.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{lab.shortTitle}</p>
                </div>
                <div className="px-6 pb-7 lg:px-9 lg:py-7">
                  <span className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] ${statusStyle[lab.status]}`}>
                    {lab.status}
                  </span>
                </div>
              </div>

              <div className="grid gap-px bg-slate-200 md:grid-cols-2 xl:grid-cols-5">
                {evidenceFields.map(([label, helper, Icon], index) => {
                  const values = [lab.problem, lab.system, lab.technology, lab.testing, lab.result];
                  return (
                    <div key={label} className="bg-white p-6 lg:p-7">
                      <Icon size={20} className="text-amber-700" aria-hidden="true" />
                      <h4 className="mt-4 text-sm font-bold text-slate-950">{label}</h4>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{helper}</p>
                      <p className="mt-4 text-sm leading-6 text-slate-600">{values[index]}</p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-slate-800 bg-slate-950 px-6 py-7 text-white lg:px-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                  Experiment record
                </p>
                <dl className="mt-6 grid gap-7 md:grid-cols-2 xl:grid-cols-5">
                  <div>
                    <dt className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <CalendarClock size={17} className="text-amber-300" aria-hidden="true" />
                      Last tested
                    </dt>
                    <dd className="mt-3 text-sm leading-6 text-slate-400">{lab.lastTested}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <Activity size={17} className="text-amber-300" aria-hidden="true" />
                      Current metric
                    </dt>
                    <dd className="mt-3 text-sm leading-6 text-slate-400">{lab.currentMetric}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <GitCommitHorizontal size={17} className="text-amber-300" aria-hidden="true" />
                      What changed
                    </dt>
                    <dd className="mt-3 text-sm leading-6 text-slate-400">{lab.whatChanged}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <ExternalLink size={17} className="text-amber-300" aria-hidden="true" />
                      Evidence / live system
                    </dt>
                    <dd className="mt-3">
                      <Link href={lab.href} className="inline-flex items-center gap-2 text-sm font-semibold leading-6 text-white transition hover:text-amber-300">
                        {lab.linkLabel}<ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <NotebookText size={17} className="text-amber-300" aria-hidden="true" />
                      Experiment notes
                    </dt>
                    <dd className="mt-3 text-sm leading-6 text-slate-400">{lab.experimentNotes}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex bg-slate-50 px-6 py-5 lg:px-8">
                <p className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <ShieldCheck size={17} aria-hidden="true" /> Human review remains part of the system.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

</div>; }