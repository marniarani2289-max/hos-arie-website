import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { requireControlCenterAccess } from "@/lib/ai-control-center/access";
import {
  aiOsAgents,
  aiOsVersion,
  auditTrail,
  decisionQueue,
  kpiRegistry,
  phaseOneRules,
  riskPolicy,
  type AiOsRiskLevel,
} from "@/lib/ai-control-center/ai-os";

export const metadata = {
  title: "AI Operating System | Hossibarani Control Center",
  robots: { index: false, follow: false },
};

const riskClass: Record<AiOsRiskLevel, string> = {
  LOW: "border-emerald-200 bg-emerald-50 text-emerald-900",
  MEDIUM: "border-amber-200 bg-amber-50 text-amber-950",
  HIGH: "border-orange-200 bg-orange-50 text-orange-950",
  CRITICAL: "border-rose-200 bg-rose-50 text-rose-950",
};

export default async function AiOperatingSystemPage() {
  const user = await requireControlCenterAccess();
  const enabledAgents = aiOsAgents.filter((agent) => agent.mode !== "DISABLED").length;
  const openDecisions = decisionQueue.filter((item) => item.status === "OPEN").length;

  return (
    <main className="min-h-screen bg-[#f7f4ef] px-5 py-12 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-3xl border border-stone-300 bg-white p-7 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-7">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[.25em] text-amber-700">Human-controlled AI operating system</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Hossibarani AI-OS</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                Observe → detect bottleneck → recommend → human decision → execute only when authorised → audit → measure outcome.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
              <p className="text-xs font-black uppercase tracking-[.18em] text-emerald-800">Authorised owner</p>
              <p className="mt-1 text-sm font-semibold text-emerald-950">{user.email}</p>
              <p className="mt-2 text-xs text-emerald-800">{aiOsVersion}</p>
            </div>
          </div>
        </header>

        <section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric icon={<BrainCircuit />} label="Enabled agents" value={String(enabledAgents)} note="Web & Dev is the only active pilot" />
          <Metric icon={<AlertTriangle />} label="Open decisions" value={String(openDecisions)} note="Human decision required" />
          <Metric icon={<LockKeyhole />} label="Autonomous writes" value="0" note="Disabled by Phase 1 policy" />
          <Metric icon={<BarChart3 />} label="Outcome KPIs" value={String(kpiRegistry.length)} note="Activity metrics are not enough" dark />
        </section>

        <section className="mt-8 grid gap-7 xl:grid-cols-[1.08fr_.92fr]">
          <article className="rounded-3xl border border-stone-300 bg-white p-7">
            <div className="flex items-center gap-3"><BrainCircuit className="text-amber-700"/><h2 className="text-2xl font-black">Agent Registry</h2></div>
            <p className="mt-2 text-sm leading-6 text-slate-600">Each agent has an explicit operating mode, authority boundary, and default risk.</p>
            <div className="mt-6 space-y-4">
              {aiOsAgents.map((agent) => (
                <div key={agent.id} className="rounded-2xl border border-stone-200 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-black">{agent.name}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[.14em] text-slate-500">{agent.domain}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black">{agent.mode}</span>
                      <span className={`rounded-full border px-3 py-1 text-xs font-black ${riskClass[agent.defaultRisk]}`}>{agent.defaultRisk}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{agent.mission}</p>
                  {agent.id === "web-dev" && (
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl bg-emerald-50 p-4">
                        <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-900">Allowed</p>
                        <ul className="mt-3 space-y-2 text-sm text-emerald-950">{agent.allowedActions.map((item) => <li key={item}>• {item}</li>)}</ul>
                      </div>
                      <div className="rounded-xl bg-rose-50 p-4">
                        <p className="text-xs font-black uppercase tracking-[.16em] text-rose-900">Blocked</p>
                        <ul className="mt-3 space-y-2 text-sm text-rose-950">{agent.blockedActions.map((item) => <li key={item}>• {item}</li>)}</ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-stone-300 bg-white p-7">
            <div className="flex items-center gap-3"><ShieldCheck className="text-amber-700"/><h2 className="text-2xl font-black">Risk & Approval Gate</h2></div>
            <div className="mt-6 space-y-4">
              {(Object.keys(riskPolicy) as AiOsRiskLevel[]).map((level) => {
                const policy = riskPolicy[level];
                return (
                  <div key={level} className={`rounded-2xl border p-5 ${riskClass[level]}`}>
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-black">{policy.label}</p>
                      <span className="text-xs font-black uppercase tracking-[.12em]">{policy.humanApproval ? "Approval required" : "Read-only permitted"}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6">{policy.rule}</p>
                  </div>
                );
              })}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-3xl border border-stone-300 bg-white p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div><div className="flex items-center gap-3"><AlertTriangle className="text-amber-700"/><h2 className="text-2xl font-black">Bottleneck / Decision Queue</h2></div><p className="mt-2 text-sm text-slate-600">A finding becomes actionable only after it is converted into a Decision Card.</p></div>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-amber-900">{openDecisions} open</span>
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {decisionQueue.map((decision) => (
              <article key={decision.id} className="rounded-2xl border border-stone-200 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div><p className="text-xs font-black uppercase tracking-[.16em] text-slate-500">Decision Card · {decision.id}</p><h3 className="mt-2 text-xl font-black">{decision.title}</h3></div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-black ${riskClass[decision.risk]}`}>{decision.risk}</span>
                </div>
                <dl className="mt-5 space-y-4 text-sm">
                  <div><dt className="font-black">Bottleneck</dt><dd className="mt-1 leading-6 text-slate-600">{decision.bottleneck}</dd></div>
                  <div><dt className="font-black">Recommendation</dt><dd className="mt-1 leading-6 text-slate-600">{decision.recommendation}</dd></div>
                  <div><dt className="font-black">Decision requested</dt><dd className="mt-1 leading-6 text-slate-600">{decision.requestedDecision}</dd></div>
                  {decision.estimatedImpact && <div><dt className="font-black">Expected impact</dt><dd className="mt-1 leading-6 text-slate-600">{decision.estimatedImpact}</dd></div>}
                </dl>
                <div className="mt-5 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-4">
                  <p className="text-xs font-black uppercase tracking-[.16em] text-slate-500">Approval gate</p>
                  <p className="mt-2 text-sm font-semibold">Status: {decision.status}. Phase 1 displays the decision boundary but does not execute writes from this page.</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-7 xl:grid-cols-2">
          <article className="rounded-3xl border border-stone-300 bg-white p-7">
            <div className="flex items-center gap-3"><Activity className="text-amber-700"/><h2 className="text-2xl font-black">Immutable-ish Audit Trail</h2></div>
            <p className="mt-2 text-sm leading-6 text-slate-600">Append-only by operating policy: corrections create new events; history is not silently rewritten.</p>
            <div className="mt-6 space-y-4">
              {auditTrail.map((event) => (
                <div key={event.id} className="rounded-2xl border border-stone-200 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3"><p className="font-black">{event.action}</p><span className={`rounded-full border px-3 py-1 text-xs font-black ${riskClass[event.risk]}`}>{event.risk}</span></div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{event.note}</p>
                  <p className="mt-3 text-xs font-semibold text-slate-400">{event.id} · {event.at} · {event.actor}:{event.actorId}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-stone-300 bg-white p-7">
            <div className="flex items-center gap-3"><BarChart3 className="text-amber-700"/><h2 className="text-2xl font-black">Outcome / KPI Registry</h2></div>
            <p className="mt-2 text-sm leading-6 text-slate-600">Success is measured by released capacity and changed outcomes, not the number of AI actions.</p>
            <div className="mt-6 space-y-4">
              {kpiRegistry.map((kpi) => (
                <div key={kpi.id} className="rounded-2xl border border-stone-200 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-black">{kpi.name}</p><p className="mt-1 text-xs font-bold uppercase tracking-[.12em] text-slate-500">{kpi.system} · {kpi.cadence}</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black">{kpi.direction}</span></div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{kpi.rationale}</p>
                  <div className="mt-4 flex gap-6 text-sm"><span><strong>Baseline:</strong> {kpi.baseline ?? "TBD"}</span><span><strong>Target:</strong> {kpi.target ?? "TBD"}</span><span><strong>Unit:</strong> {kpi.unit}</span></div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-3xl border border-[#1c2434] bg-[#111526] p-7 text-white">
          <div className="flex items-center gap-3"><LockKeyhole className="text-amber-400"/><h2 className="text-2xl font-black">Phase 1 Operating Rules</h2></div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {phaseOneRules.map((rule) => <div key={rule} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" size={19}/><p className="text-sm leading-6 text-slate-200">{rule}</p></div>)}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-bold text-amber-300"><Clock3 size={18}/><span>Next gate: connect live read-only GitHub/Vercel/SEO findings to this queue, establish KPI baselines, then validate the operating pattern before enabling another specialist agent.</span><ArrowRight size={18}/></div>
        </section>
      </div>
    </main>
  );
}

function Metric({ icon, label, value, note, dark = false }: { icon: React.ReactNode; label: string; value: string; note: string; dark?: boolean }) {
  return (
    <article className={`rounded-2xl border p-6 ${dark ? "border-[#1c2434] bg-[#111526] text-white" : "border-stone-300 bg-white"}`}>
      <div className={dark ? "text-amber-400" : "text-amber-700"}>{icon}</div>
      <p className={`mt-5 text-xs font-black uppercase tracking-[.17em] ${dark ? "text-slate-400" : "text-slate-500"}`}>{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
      <p className={`mt-1 text-sm ${dark ? "text-slate-300" : "text-slate-600"}`}>{note}</p>
    </article>
  );
}
