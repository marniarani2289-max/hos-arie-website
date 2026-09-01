import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireLexNusaAdmin, formatJakarta, formatMoney } from "../../admin";
import { sendFollowUpEmail } from "../../actions";

export const metadata: Metadata = { title: "Direct Follow-up Email | LexNusa CRM", robots: { index: false, follow: false } };

type Lead = { id:number; name:string; organization:string|null; email:string; project_type:string; status:string; follow_up_at:string|null; estimated_value:number|null; currency:string };

function firstName(name:string) {
  const normalized = name.trim();
  if (!normalized || /^lexnusa\b/i.test(normalized)) return "there";
  return normalized.split(/\s+/)[0];
}

function toDateTimeLocal(value: string | null) {
  if (!value) return "";
  const parts = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Jakarta", year:"numeric", month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit", hour12:false }).formatToParts(new Date(value));
  const get = (type:string) => parts.find(p => p.type === type)?.value || "";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

export default async function FollowUpEmailPage({ params, searchParams }: { params: Promise<{ id:string }>; searchParams: Promise<{ error?:string }> }) {
  const { id: rawId } = await params;
  const { error } = await searchParams;
  const id = Number(rawId);
  if (!Number.isSafeInteger(id) || id < 1) notFound();
  const { admin } = await requireLexNusaAdmin(`/lexnusa/ops/${id}/email`);
  const { data } = await admin.from("lexnusa_pilot_leads").select("id,name,organization,email,project_type,status,follow_up_at,estimated_value,currency").eq("id", id).maybeSingle();
  if (!data) notFound();
  const lead = data as Lead;

  const subject = `LexNusa follow-up — ${lead.project_type} (LEX-${lead.id})`;
  const body = `Dear ${firstName(lead.name)},\n\nThank you for your interest in LexNusa Legal AI regarding ${lead.project_type}.\n\nI am following up on your pilot request (LEX-${lead.id}). We would be pleased to refine the scope, expected deliverables, timeline, and review requirements with you before proceeding.\n\nIf convenient, please reply with any additional context on jurisdiction, volume, preferred turnaround time, and the intended use of the work product. Please do not send privileged or highly confidential documents until handling arrangements have been agreed.\n\nKind regards,\nLexNusa Legal AI\nHuman Legal Judgment. AI-Ready Intelligence.`;
  const defaultStatus = lead.status === "new" ? "contacted" : lead.status;

  return <main className="min-h-screen bg-[#0D1B2A] px-5 py-14 text-white sm:px-8"><div className="mx-auto max-w-5xl">
    <Link href={`/lexnusa/ops/${lead.id}`} className="text-sm text-slate-300 underline">← Back to Lead</Link>
    <p className="mt-6 text-xs font-black uppercase tracking-[.22em] text-[#C9A24B]">LEX-{lead.id} · Follow-up Operations v1.2</p>
    <h1 className="mt-2 text-4xl font-black sm:text-5xl">Direct Follow-up Email</h1>
    <p className="mt-3 text-slate-300">Review the message, choose the next CRM action, then send directly through LexNusa.</p>

    {error && <div className="mt-6 rounded-xl border border-red-300/40 bg-red-300/10 p-4 text-sm text-red-100">The email was not sent. Please verify the email configuration and try again.</div>}

    <form action={sendFollowUpEmail} className="mt-8 grid gap-5 lg:grid-cols-[1fr_320px]">
      <input type="hidden" name="id" value={lead.id}/>
      <div className="rounded-2xl bg-white p-6 text-[#0D1B2A]">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">Subject<input name="subject" required maxLength={300} defaultValue={subject} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold normal-case tracking-normal"/></label>
        <label className="mt-6 block text-xs font-black uppercase tracking-wider text-slate-400">Message<textarea name="message" required maxLength={10000} rows={18} defaultValue={body} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-sans text-sm font-normal normal-case leading-7 tracking-normal text-slate-700"/></label>
        <p className="mt-3 text-xs text-slate-500">Recipient: {lead.email}. The salutation is personalized from the lead name and can be edited before sending.</p>
      </div>

      <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-black">Send &amp; next action</h2>
        <dl className="mt-4 grid gap-4 text-sm"><div><dt className="text-xs uppercase text-slate-400">Client</dt><dd className="mt-1 font-bold">{lead.name}</dd></div><div><dt className="text-xs uppercase text-slate-400">Current status</dt><dd className="mt-1 font-bold capitalize">{lead.status}</dd></div><div><dt className="text-xs uppercase text-slate-400">Current follow-up</dt><dd className="mt-1 font-bold">{formatJakarta(lead.follow_up_at)}</dd></div><div><dt className="text-xs uppercase text-slate-400">Estimated value</dt><dd className="mt-1 font-bold">{formatMoney(lead.estimated_value, lead.currency)}</dd></div></dl>

        <label className="mt-6 block text-xs font-bold uppercase tracking-wider text-slate-300">Status after send<select name="status_after" defaultValue={defaultStatus} className="mt-2 w-full rounded-lg border border-white/15 bg-[#142235] px-3 py-3 text-sm normal-case text-white"><option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="won">Won</option><option value="lost">Lost</option></select></label>
        <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-slate-300">Next follow-up<input name="next_follow_up_at" type="datetime-local" defaultValue={toDateTimeLocal(lead.follow_up_at)} className="mt-2 w-full rounded-lg border border-white/15 bg-[#142235] px-3 py-3 text-sm normal-case text-white"/></label>

        <button className="mt-6 w-full rounded-xl bg-[#C9A24B] px-5 py-4 font-black text-[#0D1B2A]">Send Email via LexNusa</button>
        <p className="mt-4 text-xs leading-5 text-slate-400">The email is sent through Resend. On success, CRM records recipient, subject, provider ID, sent time, status change, and next follow-up. Nothing is marked sent before the provider confirms acceptance.</p>
      </aside>
    </form>
  </div></main>;
}
