import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireLexNusaAdmin, formatMoney } from "../../../admin";
import { createProposal } from "../../../proposal-actions";

export const metadata: Metadata = { title: "Create Proposal | LexNusa CRM v1.3", robots: { index: false, follow: false } };

export default async function CreateProposalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const leadId = Number(rawId);
  if (!Number.isSafeInteger(leadId) || leadId < 1) notFound();

  const { admin } = await requireLexNusaAdmin(`/lexnusa/ops/${leadId}/proposal/new`);
  const { data: lead } = await admin
    .from("lexnusa_pilot_leads")
    .select("id,name,organization,email,project_type,message,status,estimated_value,currency")
    .eq("id", leadId)
    .maybeSingle();
  if (!lead) notFound();
  if (lead.status !== "qualified") redirect(`/lexnusa/ops/${leadId}?proposal=requires-qualified`);

  const fee = lead.estimated_value ?? "";
  const defaultScope = `Focused pilot engagement for ${lead.project_type}.\n\nScope will be limited to the agreed legal-AI evaluation, research, or intelligence tasks described in the client brief, with assumptions and exclusions confirmed before work starts.`;
  const defaultDeliverables = `1. Agreed primary work product\n2. Concise findings / executive summary\n3. Source or authority traceability where applicable\n4. One consolidated clarification round within the agreed pilot scope`;

  return <main className="min-h-screen bg-[#0D1B2A] px-5 py-14 text-white sm:px-8"><div className="mx-auto max-w-6xl">
    <Link href={`/lexnusa/ops/${leadId}`} className="text-sm text-slate-300 underline">← Back to Lead</Link>
    <p className="mt-6 text-xs font-black uppercase tracking-[.22em] text-[#C9A24B]">CRM v1.3 · Proposal Operations</p>
    <h1 className="mt-2 text-4xl font-black sm:text-5xl">Create Proposal</h1>
    <p className="mt-3 max-w-3xl text-slate-300">Create a controlled pilot proposal for a qualified LexNusa lead. Proposal numbers are generated automatically after saving.</p>

    <div className="mt-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
      <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-xs font-black uppercase tracking-wider text-[#C9A24B]">Qualified lead</p>
        <h2 className="mt-2 text-2xl font-black">{lead.name}</h2>
        <p className="mt-1 text-sm text-slate-300">{lead.organization || "No organization"} · {lead.email}</p>
        <dl className="mt-6 grid gap-4 text-sm"><div><dt className="text-xs uppercase text-slate-400">Project</dt><dd className="mt-1 font-bold">{lead.project_type}</dd></div><div><dt className="text-xs uppercase text-slate-400">Current pipeline value</dt><dd className="mt-1 font-bold">{formatMoney(lead.estimated_value, lead.currency)}</dd></div><div><dt className="text-xs uppercase text-slate-400">Client brief</dt><dd className="mt-1 whitespace-pre-wrap leading-6 text-slate-300">{lead.message}</dd></div></dl>
      </aside>

      <form action={createProposal} className="rounded-2xl bg-white p-6 text-[#0D1B2A] sm:p-8">
        <input type="hidden" name="lead_id" value={lead.id}/>
        <div className="grid gap-5">
          <label htmlFor="proposal-title" className="text-sm font-bold">Proposal title</label>
          <input id="proposal-title" name="title" required maxLength={240} defaultValue={`${lead.project_type} — Pilot Proposal`} className="-mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal"/>

          <label htmlFor="proposal-scope" className="text-sm font-bold">Scope</label>
          <textarea id="proposal-scope" name="scope" required maxLength={12000} rows={6} defaultValue={defaultScope} className="-mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal leading-6"/>

          <label htmlFor="proposal-deliverables" className="text-sm font-bold">Deliverables</label>
          <textarea id="proposal-deliverables" name="deliverables" required maxLength={12000} rows={6} defaultValue={defaultDeliverables} className="-mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal leading-6"/>

          <label htmlFor="proposal-timeline" className="text-sm font-bold">Timeline</label>
          <input id="proposal-timeline" name="timeline" required maxLength={4000} placeholder="Example: 7–10 business days from written confirmation and receipt of agreed materials." className="-mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal"/>

          <div className="grid gap-4 sm:grid-cols-[1fr_120px_1fr]">
            <div><label htmlFor="proposal-fee" className="text-sm font-bold">Fee</label><input id="proposal-fee" name="fee" required type="number" min="0" step="0.01" defaultValue={fee} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal"/></div>
            <div><label htmlFor="proposal-currency" className="text-sm font-bold">Currency</label><select id="proposal-currency" name="currency" defaultValue={lead.currency || "USD"} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal"><option>USD</option><option>IDR</option><option>SGD</option><option>MYR</option></select></div>
            <div><label htmlFor="proposal-valid-until" className="text-sm font-bold">Valid until</label><input id="proposal-valid-until" name="valid_until" type="date" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal"/></div>
          </div>

          <label htmlFor="proposal-terms" className="text-sm font-bold">Terms / notes</label>
          <textarea id="proposal-terms" name="terms" maxLength={12000} rows={5} defaultValue="This proposal is for a focused pilot engagement. Final scope, confidentiality arrangements, source access, turnaround, and any material scope changes must be agreed in writing. Fees exclude third-party costs unless expressly stated." className="-mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal leading-6"/>

          <div className="rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-600">Saving creates a Draft proposal, assigns an auditable proposal number, records the activity against this lead, and aligns the pipeline value with the proposal fee.</div>
          <button className="rounded-xl bg-[#C9A24B] px-5 py-4 font-black">Create Draft Proposal</button>
        </div>
      </form>
    </div>
  </div></main>;
}
