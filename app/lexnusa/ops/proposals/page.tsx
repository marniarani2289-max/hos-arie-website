import type { Metadata } from "next";
import Link from "next/link";
import { requireLexNusaAdmin, formatMoney, formatJakarta } from "../admin";

export const metadata: Metadata = { title: "Proposal Operations | LexNusa CRM v1.3", robots: { index: false, follow: false } };

type Lead = { id:number; name:string; organization:string|null; project_type:string; status:string; estimated_value:number|null; currency:string };
type Proposal = { id:number; created_at:string; lead_id:number; proposal_no:string; title:string; status:string; fee:number; currency:string; valid_until:string|null };

export default async function ProposalOperationsPage() {
  const { admin } = await requireLexNusaAdmin("/lexnusa/ops/proposals");
  const [{ data: leadsRows }, { data: proposalRows }] = await Promise.all([
    admin.from("lexnusa_pilot_leads").select("id,name,organization,project_type,status,estimated_value,currency").in("status", ["qualified","won"]).order("updated_at", { ascending:false }).limit(100),
    admin.from("lexnusa_proposals").select("id,created_at,lead_id,proposal_no,title,status,fee,currency,valid_until").order("created_at", { ascending:false }).limit(100),
  ]);
  const leads = (leadsRows || []) as Lead[];
  const proposals = (proposalRows || []) as Proposal[];
  const proposalLeadIds = new Set(proposals.map(p => p.lead_id));
  const ready = leads.filter(l => l.status === "qualified" && !proposalLeadIds.has(l.id));

  return <main className="min-h-screen bg-[#0D1B2A] px-5 py-14 text-white sm:px-8"><div className="mx-auto max-w-7xl">
    <div className="flex flex-wrap items-end justify-between gap-5"><div><Link href="/lexnusa/ops" className="text-sm text-slate-300 underline">← Back to Follow-up Operations</Link><p className="mt-6 text-xs font-black uppercase tracking-[.22em] text-[#C9A24B]">LexNusa CRM v1.3 · Stage 1</p><h1 className="mt-2 text-4xl font-black sm:text-5xl">Proposal Operations</h1><p className="mt-3 max-w-3xl text-slate-300">Convert qualified leads into controlled draft pilot proposals with auditable numbering, scope, deliverables, timeline, fee, and validity.</p></div></div>

    <section className="mt-8 grid gap-3 sm:grid-cols-3"><Kpi label="Qualified ready" value={String(ready.length)}/><Kpi label="Draft / active proposals" value={String(proposals.filter(p => !["accepted","rejected","expired"].includes(p.status)).length)}/><Kpi label="Total proposals" value={String(proposals.length)}/></section>

    <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5"><h2 className="text-xl font-black">Qualified leads ready for proposal</h2><div className="mt-5 grid gap-3">{ready.length === 0 ? <p className="text-sm text-slate-400">No qualified leads are waiting for a first proposal.</p> : ready.map(lead => <div key={lead.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 text-[#0D1B2A]"><div><p className="text-xs font-black uppercase tracking-wider text-[#0E6B6F]">LEX-{lead.id} · {lead.project_type}</p><p className="mt-1 text-lg font-black">{lead.name}</p><p className="text-xs text-slate-500">{lead.organization || "No organization"} · pipeline {formatMoney(lead.estimated_value, lead.currency)}</p></div><Link href={`/lexnusa/ops/${lead.id}/proposal/new`} className="rounded-lg bg-[#C9A24B] px-4 py-3 text-sm font-black">Create Proposal</Link></div>)}</div></section>

    <section className="mt-8"><h2 className="text-xl font-black">Proposal register</h2><div className="mt-4 grid gap-3">{proposals.length === 0 ? <p className="rounded-xl bg-white p-5 text-sm text-slate-600">No proposals created yet.</p> : proposals.map(proposal => <Link key={proposal.id} href={`/lexnusa/ops/proposals/${proposal.id}`} className="grid gap-3 rounded-xl bg-white p-5 text-[#0D1B2A] md:grid-cols-[1fr_150px_160px]"><div><p className="text-xs font-black uppercase tracking-wider text-[#0E6B6F]">{proposal.proposal_no}</p><p className="mt-1 font-black">{proposal.title}</p><p className="mt-1 text-xs text-slate-500">Created {formatJakarta(proposal.created_at)} · Lead LEX-{proposal.lead_id}</p></div><div><p className="text-xs uppercase text-slate-400">Status</p><p className="mt-1 font-bold capitalize">{proposal.status.replaceAll("_", " ")}</p></div><div><p className="text-xs uppercase text-slate-400">Fee</p><p className="mt-1 font-bold">{formatMoney(proposal.fee, proposal.currency)}</p></div></Link>)}</div></section>
  </div></main>;
}

function Kpi({ label, value }: { label:string; value:string }) { return <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-xs uppercase tracking-wider text-slate-400">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>; }
