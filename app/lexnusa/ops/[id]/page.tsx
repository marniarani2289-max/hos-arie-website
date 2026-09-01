import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireLexNusaAdmin, formatJakarta, formatMoney } from "../admin";
import { addManualActivity, updateLead } from "../actions";

export const metadata: Metadata = { title: "Lead Detail | LexNusa CRM", robots: { index: false, follow: false } };

type Lead = {
  id:number; created_at:string; updated_at:string; name:string; organization:string|null; email:string; project_type:string; message:string;
  source:string; status:string; notes:string|null; notification_status:string; notification_provider_id:string|null; notified_at:string|null;
  consent_at:string|null; consent_version:string|null; follow_up_at:string|null; estimated_value:number|null; currency:string; owner_user_id:string|null;
};
type Activity = { id:number; created_at:string; actor_user_id:string|null; activity_type:string; summary:string; details:Record<string,unknown> };
type Admin = { user_id:string; email:string|null; display_name:string|null };

function toDateTimeLocal(value: string | null) {
  if (!value) return "";
  const parts = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Jakarta", year:"numeric", month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit", hour12:false }).formatToParts(new Date(value));
  const get = (type:string) => parts.find(p => p.type === type)?.value || "";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isSafeInteger(id) || id < 1) notFound();
  const { admin } = await requireLexNusaAdmin(`/lexnusa/ops/${id}`);

  const [{ data: leadRow }, { data: activityRows }, { data: adminRows }] = await Promise.all([
    admin.from("lexnusa_pilot_leads").select("id,created_at,updated_at,name,organization,email,project_type,message,source,status,notes,notification_status,notification_provider_id,notified_at,consent_at,consent_version,follow_up_at,estimated_value,currency,owner_user_id").eq("id", id).maybeSingle(),
    admin.from("lexnusa_lead_activities").select("id,created_at,actor_user_id,activity_type,summary,details").eq("lead_id", id).order("created_at", { ascending: false }).limit(100),
    admin.from("lexnusa_admins").select("user_id,email,display_name").order("display_name", { ascending: true }),
  ]);
  if (!leadRow) notFound();
  const lead = leadRow as Lead;
  const activities = (activityRows || []) as Activity[];
  const admins = (adminRows || []) as Admin[];
  const ownerMap = new Map(admins.map(a => [a.user_id, a.display_name || a.email || "Admin"]));

  return <main className="min-h-screen bg-[#0D1B2A] px-5 py-14 text-white sm:px-8"><div className="mx-auto max-w-6xl">
    <div className="flex flex-wrap items-start justify-between gap-5"><div><Link href="/lexnusa/ops" className="text-sm text-slate-300 underline">← Back to CRM</Link><p className="mt-5 text-xs font-black uppercase tracking-[.22em] text-[#C9A24B]">LEX-{lead.id} · {lead.project_type}</p><h1 className="mt-2 text-4xl font-black sm:text-5xl">{lead.name}</h1><p className="mt-3 text-slate-300">{lead.organization || "No organization"} · {lead.email}</p></div><a href={`mailto:${lead.email}?subject=${encodeURIComponent(`LexNusa Pilot LEX-${lead.id}`)}`} className="rounded-xl bg-[#C9A24B] px-5 py-3 font-black text-[#0D1B2A]">Email Client</a></div>

    <section className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
      <div className="rounded-2xl bg-white p-6 text-[#0D1B2A]"><h2 className="text-xl font-black">Client Brief</h2><p className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">{lead.message}</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><Meta label="Created" value={formatJakarta(lead.created_at)}/><Meta label="Last updated" value={formatJakarta(lead.updated_at)}/><Meta label="Notification" value={`${lead.notification_status}${lead.notified_at ? ` · ${formatJakarta(lead.notified_at)}` : ""}`}/><Meta label="Consent" value={lead.consent_at ? `Recorded · ${lead.consent_version || "versioned"}` : "Legacy lead"}/><Meta label="Source" value={lead.source}/><Meta label="Current value" value={formatMoney(lead.estimated_value, lead.currency)}/></div></div>

      <form action={updateLead} className="rounded-2xl bg-white p-6 text-[#0D1B2A]"><input type="hidden" name="id" value={lead.id}/><h2 className="text-xl font-black">Lead Management</h2><div className="mt-5 grid gap-4">
        <label className="text-sm font-bold">Status<select name="status" defaultValue={lead.status} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 font-normal"><option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="won">Won</option><option value="lost">Lost</option><option value="spam">Spam</option></select></label>
        <label className="text-sm font-bold">Owner<select name="owner_user_id" defaultValue={lead.owner_user_id || ""} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 font-normal"><option value="">Unassigned</option>{admins.map(a => <option key={a.user_id} value={a.user_id}>{a.display_name || a.email}</option>)}</select></label>
        <label className="text-sm font-bold">Follow-up date<input name="follow_up_at" type="datetime-local" defaultValue={toDateTimeLocal(lead.follow_up_at)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal"/></label>
        <div className="grid grid-cols-[1fr_100px] gap-3"><label className="text-sm font-bold">Estimated project value<input name="estimated_value" type="number" min="0" step="0.01" defaultValue={lead.estimated_value ?? ""} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal"/></label><label className="text-sm font-bold">Currency<select name="currency" defaultValue={lead.currency} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 font-normal"><option>USD</option><option>IDR</option><option>SGD</option><option>MYR</option></select></label></div>
        <label className="text-sm font-bold">Internal note<textarea name="notes" maxLength={4000} rows={4} defaultValue={lead.notes || ""} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal" placeholder="Next action, qualification notes, pricing context..."/></label>
        <button className="rounded-xl bg-[#C9A24B] px-5 py-3 font-black">Save Lead</button>
      </div></form>
    </section>

    <section className="mt-8 rounded-2xl bg-white p-6 text-[#0D1B2A]"><div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-2xl font-black">Activity History</h2><p className="mt-1 text-sm text-slate-500">A chronological audit trail of CRM actions.</p></div></div>
      <form action={addManualActivity} className="mt-5 flex gap-3"><input type="hidden" name="id" value={lead.id}/><input name="summary" required maxLength={1000} placeholder="Add call note, meeting outcome, next step..." className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3"/><button className="rounded-lg bg-[#0E6B6F] px-5 py-3 font-bold text-white">Add Activity</button></form>
      <div className="mt-6 grid gap-3">{activities.length === 0 ? <p className="text-sm text-slate-500">No activity recorded yet.</p> : activities.map(activity => <div key={activity.id} className="grid gap-2 rounded-xl border border-slate-200 p-4 sm:grid-cols-[170px_1fr]"><div className="text-xs text-slate-500"><p>{formatJakarta(activity.created_at)}</p><p className="mt-1 font-bold uppercase tracking-wider text-[#0E6B6F]">{activity.activity_type.replaceAll("_", " ")}</p></div><div><p className="font-semibold">{activity.summary}</p><p className="mt-1 text-xs text-slate-500">{activity.actor_user_id ? ownerMap.get(activity.actor_user_id) || "Authorized admin" : "System"}</p></div></div>)}</div>
    </section>
  </div></main>;
}

function Meta({ label, value }: { label:string; value:string }) { return <div><p className="text-[11px] font-black uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 text-sm font-semibold text-slate-700">{value}</p></div>; }
