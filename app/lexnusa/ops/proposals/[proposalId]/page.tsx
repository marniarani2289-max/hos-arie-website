import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireLexNusaAdmin, formatMoney, formatJakarta } from "../../admin";

export const metadata: Metadata = { title: "Proposal Detail | LexNusa CRM v1.3", robots: { index: false, follow: false } };

type Proposal = {
  id:number; created_at:string; updated_at:string; lead_id:number; proposal_no:string; title:string; scope:string; deliverables:string; timeline:string;
  fee:number; currency:string; valid_until:string|null; terms:string|null; status:string; sent_at:string|null; accepted_at:string|null; rejected_at:string|null; lost_reason:string|null;
};

export default async function ProposalDetailPage({ params }: { params: Promise<{ proposalId:string }> }) {
  const { proposalId: rawId } = await params;
  const proposalId = Number(rawId);
  if (!Number.isSafeInteger(proposalId) || proposalId < 1) notFound();
  const { admin } = await requireLexNusaAdmin(`/lexnusa/ops/proposals/${proposalId}`);

  const { data: proposalRow } = await admin.from("lexnusa_proposals").select("id,created_at,updated_at,lead_id,proposal_no,title,scope,deliverables,timeline,fee,currency,valid_until,terms,status,sent_at,accepted_at,rejected_at,lost_reason").eq("id", proposalId).maybeSingle();
  if (!proposalRow) notFound();
  const proposal = proposalRow as Proposal;
  const { data: lead } = await admin.from("lexnusa_pilot_leads").select("id,name,organization,email,project_type,status").eq("id", proposal.lead_id).maybeSingle();

  return <main className="min-h-screen bg-[#0D1B2A] px-5 py-14 text-white sm:px-8"><div className="mx-auto max-w-6xl">
    <div className="flex flex-wrap items-start justify-between gap-5"><div><Link href={`/lexnusa/ops/${proposal.lead_id}`} className="text-sm text-slate-300 underline">← Back to Lead</Link><p className="mt-6 text-xs font-black uppercase tracking-[.22em] text-[#C9A24B]">CRM v1.3 · {proposal.proposal_no}</p><h1 className="mt-2 text-4xl font-black sm:text-5xl">{proposal.title}</h1><p className="mt-3 text-slate-300">{lead?.name || `Lead LEX-${proposal.lead_id}`} · Draft proposal workspace</p></div><span className="rounded-full border border-[#C9A24B]/40 bg-[#C9A24B]/10 px-4 py-2 text-sm font-black uppercase tracking-wider text-[#E4C876]">{proposal.status.replaceAll("_", " ")}</span></div>

    <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
      <article className="rounded-2xl bg-white p-6 text-[#0D1B2A] sm:p-8">
        <Section title="Pilot Scope" value={proposal.scope}/>
        <Section title="Deliverables" value={proposal.deliverables}/>
        <Section title="Timeline" value={proposal.timeline}/>
        <Section title="Terms / Notes" value={proposal.terms || "—"}/>
      </article>
      <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-black">Proposal Summary</h2>
        <dl className="mt-5 grid gap-5 text-sm"><Meta label="Proposal number" value={proposal.proposal_no}/><Meta label="Status" value={proposal.status.replaceAll("_", " ")}/><Meta label="Fee" value={formatMoney(proposal.fee, proposal.currency)}/><Meta label="Valid until" value={proposal.valid_until || "Not set"}/><Meta label="Created" value={formatJakarta(proposal.created_at)}/><Meta label="Last updated" value={formatJakarta(proposal.updated_at)}/><Meta label="Client" value={lead?.name || "Unknown"}/><Meta label="Client email" value={lead?.email || "—"}/><Meta label="Lead status" value={lead?.status || "—"}/></dl>
        <div className="mt-7 rounded-xl border border-white/10 bg-[#142235] p-4 text-xs leading-5 text-slate-300">Stage 1 intentionally creates a controlled Draft only. Proposal sending, negotiation, acceptance/rejection, quotation rendering, and revenue conversion are activated in the next CRM v1.3 stages after Preview validation.</div>
      </aside>
    </section>
  </div></main>;
}

function Section({ title, value }: { title:string; value:string }) { return <section className="border-b border-slate-200 py-6 first:pt-0 last:border-0 last:pb-0"><h2 className="text-lg font-black">{title}</h2><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">{value}</p></section>; }
function Meta({ label, value }: { label:string; value:string }) { return <div><dt className="text-xs uppercase tracking-wider text-slate-400">{label}</dt><dd className="mt-1 font-bold capitalize">{value}</dd></div>; }
