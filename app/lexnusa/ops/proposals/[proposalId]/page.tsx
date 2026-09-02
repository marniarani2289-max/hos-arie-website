import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireLexNusaAdmin, formatMoney, formatJakarta } from "../../admin";
import { sendProposalEmail, updateProposalStatus } from "../../proposal-actions";

export const metadata: Metadata = { title: "Proposal Detail | LexNusa CRM v1.3", robots: { index: false, follow: false } };

type Proposal = {
  id:number; created_at:string; updated_at:string; lead_id:number; proposal_no:string; title:string; scope:string; deliverables:string; timeline:string;
  fee:number; currency:string; valid_until:string|null; terms:string|null; status:string; sent_at:string|null; accepted_at:string|null; rejected_at:string|null; lost_reason:string|null;
  pdf_generated_at:string|null; last_emailed_at:string|null; last_email_to:string|null; last_email_provider_id:string|null;
};

const nextStatuses: Record<string, Array<{ value:string; label:string }>> = {
  draft: [{ value:"sent", label:"Mark as Sent" }],
  sent: [{ value:"under_review", label:"Under Review" }, { value:"accepted", label:"Accept" }, { value:"rejected", label:"Reject" }, { value:"expired", label:"Expire" }],
  under_review: [{ value:"negotiation", label:"Start Negotiation" }, { value:"accepted", label:"Accept" }, { value:"rejected", label:"Reject" }, { value:"expired", label:"Expire" }],
  negotiation: [{ value:"accepted", label:"Accept" }, { value:"rejected", label:"Reject" }, { value:"expired", label:"Expire" }],
};
const emailableStatuses = new Set(["draft", "sent", "under_review", "negotiation"]);

export default async function ProposalDetailPage({ params, searchParams }: { params: Promise<{ proposalId:string }>; searchParams: Promise<{ email?:string }> }) {
  const { proposalId: rawId } = await params;
  const { email: emailState } = await searchParams;
  const proposalId = Number(rawId);
  if (!Number.isSafeInteger(proposalId) || proposalId < 1) notFound();
  const { admin } = await requireLexNusaAdmin(`/lexnusa/ops/proposals/${proposalId}`);

  const { data: proposalRow } = await admin.from("lexnusa_proposals").select("id,created_at,updated_at,lead_id,proposal_no,title,scope,deliverables,timeline,fee,currency,valid_until,terms,status,sent_at,accepted_at,rejected_at,lost_reason,pdf_generated_at,last_emailed_at,last_email_to,last_email_provider_id").eq("id", proposalId).maybeSingle();
  if (!proposalRow) notFound();
  const proposal = proposalRow as Proposal;
  const { data: lead } = await admin.from("lexnusa_pilot_leads").select("id,name,organization,email,project_type,status").eq("id", proposal.lead_id).maybeSingle();
  const transitions = nextStatuses[proposal.status] || [];
  const canEmail = emailableStatuses.has(proposal.status) && Boolean(lead?.email);
  const emailSubject = `${proposal.proposal_no} — ${proposal.title}`;
  const emailMessage = `Dear ${lead?.name || "Client"},\n\nPlease find attached LexNusa's proposal ${proposal.proposal_no} for ${proposal.title}.\n\nThe proposal sets out the scope, deliverables, timeline and professional fee for the engagement. Please reply to this email if you would like to discuss or proceed.\n\nRegards,\nLexNusa Legal AI`;

  return <main className="min-h-screen bg-[#0D1B2A] px-5 py-14 text-white sm:px-8"><div className="mx-auto max-w-6xl">
    <div className="flex flex-wrap items-start justify-between gap-5"><div><Link href={`/lexnusa/ops/${proposal.lead_id}`} className="text-sm text-slate-300 underline">← Back to Lead</Link><p className="mt-6 text-xs font-black uppercase tracking-[.22em] text-[#C9A24B]">CRM v1.3 · {proposal.proposal_no}</p><h1 className="mt-2 text-4xl font-black sm:text-5xl">{proposal.title}</h1><p className="mt-3 text-slate-300">{lead?.name || `Lead LEX-${proposal.lead_id}`} · Commercial proposal workspace</p></div><span className="rounded-full border border-[#C9A24B]/40 bg-[#C9A24B]/10 px-4 py-2 text-sm font-black uppercase tracking-wider text-[#E4C876]">{proposal.status.replaceAll("_", " ")}</span></div>

    {emailState === "sent" ? <div className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">Proposal email sent successfully and recorded in the audit trail.</div> : null}
    {emailState && emailState !== "sent" ? <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">Proposal email was not sent. Review the delivery configuration or proposal lifecycle state and try again.</div> : null}

    <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
      <article className="rounded-2xl bg-white p-6 text-[#0D1B2A] sm:p-8">
        <Section title="Pilot Scope" value={proposal.scope}/>
        <Section title="Deliverables" value={proposal.deliverables}/>
        <Section title="Timeline" value={proposal.timeline}/>
        <Section title="Terms / Notes" value={proposal.terms || "—"}/>
      </article>
      <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-black">Proposal Summary</h2>
        <dl className="mt-5 grid gap-5 text-sm"><Meta label="Proposal number" value={proposal.proposal_no}/><Meta label="Status" value={proposal.status.replaceAll("_", " ")}/><Meta label="Fee" value={formatMoney(proposal.fee, proposal.currency)}/><Meta label="Valid until" value={proposal.valid_until || "Not set"}/><Meta label="Created" value={formatJakarta(proposal.created_at)}/><Meta label="Last updated" value={formatJakarta(proposal.updated_at)}/><Meta label="PDF generated" value={proposal.pdf_generated_at ? formatJakarta(proposal.pdf_generated_at) : "—"}/><Meta label="Last emailed" value={proposal.last_emailed_at ? formatJakarta(proposal.last_emailed_at) : "—"}/><Meta label="Last email to" value={proposal.last_email_to || "—"}/><Meta label="Provider ID" value={proposal.last_email_provider_id || "—"}/><Meta label="Sent" value={proposal.sent_at ? formatJakarta(proposal.sent_at) : "—"}/><Meta label="Accepted" value={proposal.accepted_at ? formatJakarta(proposal.accepted_at) : "—"}/><Meta label="Rejected" value={proposal.rejected_at ? formatJakarta(proposal.rejected_at) : "—"}/><Meta label="Client" value={lead?.name || "Unknown"}/><Meta label="Client email" value={lead?.email || "—"}/><Meta label="Lead status" value={lead?.status || "—"}/></dl>

        <section className="mt-7 border-t border-white/10 pt-6">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#E4C876]">Commercial Delivery</h3>
          <p className="mt-2 text-xs leading-5 text-slate-300">Generate the client-ready PDF or send it as an audited email attachment. Sending a draft automatically advances it to Sent.</p>
          <a href={`/lexnusa/ops/proposals/${proposal.id}/pdf`} className="mt-4 block rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-center text-sm font-bold text-white hover:bg-white/15">Download Proposal PDF</a>
          {canEmail ? <form action={sendProposalEmail} className="mt-5 grid gap-3"><input type="hidden" name="proposal_id" value={proposal.id}/><label htmlFor={`proposal-subject-${proposal.id}`} className="text-xs font-bold text-slate-300">Email subject</label><input id={`proposal-subject-${proposal.id}`} name="subject" defaultValue={emailSubject} maxLength={300} required className="rounded-lg border border-white/15 bg-[#142235] px-3 py-2 text-sm text-white"/><label htmlFor={`proposal-message-${proposal.id}`} className="text-xs font-bold text-slate-300">Email message</label><textarea id={`proposal-message-${proposal.id}`} name="message" defaultValue={emailMessage} maxLength={10000} required rows={9} className="rounded-lg border border-white/15 bg-[#142235] px-3 py-2 text-sm leading-6 text-white"/><button type="submit" className="rounded-lg bg-[#C9A24B] px-4 py-3 text-sm font-black text-[#0D1B2A] hover:brightness-110">Send Proposal + PDF</button></form> : <div className="mt-4 rounded-lg border border-white/10 bg-[#142235] p-3 text-xs leading-5 text-slate-300">Email delivery is disabled for terminal lifecycle states or when the lead has no email address.</div>}
        </section>

        {transitions.length > 0 ? <section className="mt-7 border-t border-white/10 pt-6"><h3 className="text-sm font-black uppercase tracking-wider text-[#E4C876]">Lifecycle Actions</h3><p className="mt-2 text-xs leading-5 text-slate-300">Controlled forward-only transitions. Every change is written to Activity History.</p><div className="mt-4 grid gap-3">{transitions.map((transition) => <form key={transition.value} action={updateProposalStatus} className="grid gap-2"><input type="hidden" name="proposal_id" value={proposal.id}/><input type="hidden" name="status" value={transition.value}/>{transition.value === "rejected" ? <><label htmlFor={`reason-${proposal.id}`} className="text-xs font-bold text-slate-300">Rejection reason</label><input id={`reason-${proposal.id}`} name="reason" maxLength={2000} className="rounded-lg border border-white/15 bg-[#142235] px-3 py-2 text-sm text-white" placeholder="Optional reason"/></> : null}<button type="submit" className="rounded-lg border border-[#C9A24B]/50 bg-[#C9A24B]/10 px-4 py-2 text-left text-sm font-bold text-[#F0D98B] hover:bg-[#C9A24B]/20">{transition.label}</button></form>)}</div></section> : <div className="mt-7 rounded-xl border border-white/10 bg-[#142235] p-4 text-xs leading-5 text-slate-300">This proposal is in a terminal lifecycle state. No further forward transition is available.</div>}
      </aside>
    </section>
  </div></main>;
}

function Section({ title, value }: { title:string; value:string }) { return <section className="border-b border-slate-200 py-6 first:pt-0 last:border-0 last:pb-0"><h2 className="text-lg font-black">{title}</h2><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">{value}</p></section>; }
function Meta({ label, value }: { label:string; value:string }) { return <div><dt className="text-xs uppercase tracking-wider text-slate-400">{label}</dt><dd className="mt-1 break-all font-bold capitalize">{value}</dd></div>; }
