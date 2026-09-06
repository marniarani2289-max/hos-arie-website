import Link from "next/link";
import { ShieldCheck, Activity, BrainCircuit, FolderKanban, LockKeyhole, ArrowRight } from "lucide-react";
import { requireControlCenterAccess } from "@/lib/ai-control-center/access";
import { agents, controlCenterVersion, ecosystemProjects, permissionPolicy } from "@/lib/ai-control-center/config";

export const metadata = {
  title: "AI Control Center | Hossibarani",
  robots: { index: false, follow: false },
};

export default async function ControlCenterPage() {
  const user = await requireControlCenterAccess();
  const active = ecosystemProjects.filter((project) => project.status === "active").length;

  return (
    <main className="min-h-screen bg-[#f7f4ef] px-5 py-14 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-stone-300 pb-9">
          <div>
            <p className="text-xs font-black uppercase tracking-[.28em] text-amber-700">Hossibarani Digital Ecosystem</p>
            <h1 className="mt-4 text-4xl font-black sm:text-6xl">AI Control Center</h1>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">Fase 1 membangun sumber konteks tunggal, daftar agent, inventaris proyek, dan permission model sebelum otomatisasi diaktifkan.</p>
            <Link href="/control-center/ai-os" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#111526] px-5 py-3 text-sm font-black text-white transition hover:opacity-90">
              Open Human-Controlled AI-OS <ArrowRight size={17} />
            </Link>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-800">Private access</p>
            <p className="mt-1 text-sm font-semibold text-emerald-950">{user.email}</p>
          </div>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <article className="rounded-2xl border border-stone-300 bg-white p-6"><Activity className="text-amber-700"/><p className="mt-5 text-xs font-bold uppercase tracking-[.2em] text-slate-500">Ecosystem</p><p className="mt-2 text-3xl font-black">{ecosystemProjects.length}</p><p className="mt-1 text-sm text-slate-600">projects registered</p></article>
          <article className="rounded-2xl border border-stone-300 bg-white p-6"><FolderKanban className="text-amber-700"/><p className="mt-5 text-xs font-bold uppercase tracking-[.2em] text-slate-500">Active</p><p className="mt-2 text-3xl font-black">{active}</p><p className="mt-1 text-sm text-slate-600">projects active</p></article>
          <article className="rounded-2xl border border-stone-300 bg-white p-6"><BrainCircuit className="text-amber-700"/><p className="mt-5 text-xs font-bold uppercase tracking-[.2em] text-slate-500">Agents</p><p className="mt-2 text-3xl font-black">{agents.length}</p><p className="mt-1 text-sm text-slate-600">specialist definitions</p></article>
          <article className="rounded-2xl border border-stone-300 bg-[#111526] p-6 text-white"><ShieldCheck className="text-amber-400"/><p className="mt-5 text-xs font-bold uppercase tracking-[.2em] text-slate-400">Foundation</p><p className="mt-2 text-3xl font-black">{controlCenterVersion}</p><p className="mt-1 text-sm text-slate-300">automation disabled by design</p></article>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <article className="rounded-2xl border border-stone-300 bg-white p-7">
            <div className="flex items-center gap-3"><FolderKanban className="text-amber-700"/><h2 className="text-2xl font-black">Project Context Registry</h2></div>
            <div className="mt-6 divide-y divide-stone-200">
              {ecosystemProjects.map((project) => <div key={project.id} className="flex flex-wrap items-center justify-between gap-4 py-4"><div><p className="font-black">{project.name}</p><p className="mt-1 text-sm text-slate-500">{project.category}{project.route ? ` · ${project.route}` : ""}</p></div><span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold uppercase tracking-wide">{project.status}</span></div>)}
            </div>
          </article>

          <article className="rounded-2xl border border-stone-300 bg-white p-7">
            <div className="flex items-center gap-3"><BrainCircuit className="text-amber-700"/><h2 className="text-2xl font-black">Agent Registry</h2></div>
            <div className="mt-6 space-y-4">
              {agents.map((agent) => <div key={agent.id} className="rounded-xl border border-stone-200 p-4"><div className="flex items-center justify-between gap-3"><p className="font-black">{agent.name}</p><span className="text-xs font-black uppercase tracking-wide text-amber-800">{agent.defaultRisk}</span></div><p className="mt-2 text-sm leading-6 text-slate-600">{agent.mission}</p></div>)}
            </div>
          </article>
        </section>

        <section className="mt-10 rounded-2xl border border-stone-300 bg-white p-7">
          <div className="flex items-center gap-3"><LockKeyhole className="text-amber-700"/><h2 className="text-2xl font-black">Permission Model</h2></div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {Object.entries(permissionPolicy).map(([level, policy]) => <article key={level} className="rounded-xl border border-stone-200 p-5"><p className="text-sm font-black uppercase tracking-[.16em]">{policy.label}</p><p className="mt-3 text-sm leading-6 text-slate-600">{policy.requiresApproval ? "Memerlukan persetujuan sebelum eksekusi write/production." : "Boleh berjalan tanpa persetujuan selama tetap read-only/non-destructive."}</p><ul className="mt-4 space-y-2 text-sm text-slate-700">{policy.examples.map((example) => <li key={example}>• {example}</li>)}</ul></article>)}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-amber-300 bg-amber-50 p-7">
          <p className="text-xs font-black uppercase tracking-[.22em] text-amber-800">Fase 1 guardrail</p>
          <h2 className="mt-3 text-2xl font-black">Belum ada agent yang menjalankan aksi otomatis.</h2>
          <p className="mt-3 max-w-4xl leading-7 text-slate-700">Control Center menjadi control plane. Route AI-OS menambahkan decision queue, human approval gate, audit trail, dan outcome registry. Web & Dev Agent tetap read-only; write, merge, deploy, secrets, auth, dan destructive actions tidak menjadi kewenangan agent.</p>
        </section>
      </div>
    </main>
  );
}
