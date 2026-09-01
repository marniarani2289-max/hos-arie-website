import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireLexNusaAdmin, formatJakarta, formatMoney } from "../../admin";
import { markFollowUpEmailSent } from "../../actions";

export const metadata: Metadata = { title: "Follow-up Email | LexNusa CRM", robots: { index: false, follow: false } };

type Lead = { id:number; name:string; organization:string|null; email:string; project_type:string; status:string; follow_up_at:string|null; estimated_value:number|null; currency:string };

function firstName(name:string) { return name.trim().split(/\s+/)[0] || name; }

export default async function FollowUpEmailPage({ params }: { params: Promise<{ id:string }> }) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isSafeInteger(id) || id < 1) notFound();
  const { admin } = await requireLexNusaAdmin(`/lexnusa/ops/${id}/email`);
  const { data } = await admin.from("lexnusa_pilot_leads").select("id,name,organization,email,project_type,status,follow_up_at,estimated_value,currency").eq("id", id).maybeSingle();
  if (!data) notFound();
  const lead = data as Lead;

  const subject = `LexNusa follow-up — ${lead.project_type} (LEX-${lead.id})`;
  const body = `Dear ${firstName(lead.name)},\n\nThank you for your interest in LexNusa Legal AI regarding ${lead.project_type}.\n\nI am following up on your pilot request (LEX-${lead.id}). We would be pleased to refine the scope, expected deliverables, timeline, and review requirements with you before proceeding.\n\nIf convenient, please reply with any additional context on jurisdiction, volume, preferred turnaround time, and the intended use of the work product. Please do not send privileged or highly confidential documents until handling arrangements have been agreed.\n\nKind regards,\nLexNusa Legal AI\nHuman Legal Judgment. AI-Ready Intelligence.`;
  const mailto = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return <main className="min-h-screen bg-[#0D1B2A] px-5 py-14 text-white sm:px-8"><div className="mx-auto max-w-5xl">
    <Link href={`/lexnusa/ops/${lead.id}`} className="text-sm text-slate-300 underline">← Back to Lead</Link>
    <p className="mt-6 text-xs font-black uppercase tracking-[.22em] text-[#C9A24B]">LEX-{lead.id} · Follow-up Operations</p>
    <h1 className="mt-2 text-4xl font-black sm:text-5xl">Follow-up Email</h1>
    <p className="mt-3 text-slate-300">Template prepared for {lead.name} · {lead.email}</p>

    <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_300px]">
      <div className="rounded-2xl bg-white p-6 text-[#0D1B2A]">
        <p className="text-xs font-black uppercase tracking-wider text-slate-400">Subject</p><p className="mt-1 font-bold">{subject}</p>
        <p className="mt-6 text-xs font-black uppercase tracking-wider text-slate-400">Message</p><pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-700">{body}</pre>
      </div>
      <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-black">Lead context</h2>
        <dl className="mt-4 grid gap-4 text-sm"><div><dt className="text-xs uppercase text-slate-400">Status</dt><dd className="mt-1 font-bold capitalize">{lead.status}</dd></div><div><dt className="text-xs uppercase text-slate-400">Follow-up</dt><dd className="mt-1 font-bold">{formatJakarta(lead.follow_up_at)}</dd></div><div><dt className="text-xs uppercase text-slate-400">Estimated value</dt><dd className="mt-1 font-bold">{formatMoney(lead.estimated_value, lead.currency)}</dd></div></dl>
        <a href={mailto} className="mt-6 block rounded-xl bg-[#C9A24B] px-5 py-3 text-center font-black text-[#0D1B2A]">Open Email App</a>
        <form action={markFollowUpEmailSent} className="mt-3"><input type="hidden" name="id" value={lead.id}/><button className="w-full rounded-xl border border-white/20 px-5 py-3 font-bold">Mark as Sent</button></form>
        <p className="mt-4 text-xs leading-5 text-slate-400">Opening your email app records that the template was prepared. Use “Mark as Sent” only after you have actually sent the message; this creates the CRM activity entry.</p>
      </aside>
    </section>
  </div></main>;
}
