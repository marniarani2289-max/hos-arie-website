import type { Metadata } from "next";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateLead } from "./actions";

export const metadata: Metadata = { title: "Lead Operations | LexNusa", robots: { index: false, follow: false } };

type Lead = { id:number; created_at:string; name:string; organization:string|null; email:string; project_type:string; message:string; status:string; notes:string|null; notification_status:string; consent_at:string|null };

export default async function LexNusaOpsPage() {
  const auth = await createClient();
  const { data: { user } } = await auth.auth.getUser();
  if (!user) redirect("/login?next=/lexnusa/ops");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("LexNusa operations backend is unavailable.");
  const admin = createAdminClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: allowed } = await admin.from("lexnusa_admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!allowed) redirect("/dashboard");
  const { data } = await admin.from("lexnusa_pilot_leads").select("id,created_at,name,organization,email,project_type,message,status,notes,notification_status,consent_at").order("created_at", { ascending: false }).limit(100);
  const leads = (data || []) as Lead[];
  const counts = ["new","contacted","qualified","won","lost"].map(status => ({ status, count: leads.filter(l => l.status === status).length }));

  return <main className="min-h-screen bg-[#0D1B2A] px-5 py-14 text-white sm:px-8"><div className="mx-auto max-w-7xl">
    <p className="text-xs font-black uppercase tracking-[.24em] text-[#C9A24B]">LexNusa Legal AI · Private Operations</p>
    <h1 className="mt-3 text-4xl font-black sm:text-5xl">Lead Dashboard</h1>
    <p className="mt-4 max-w-3xl text-slate-300">Manage the pilot pipeline from first contact through qualification and conversion. This page is restricted to authorized LexNusa administrators.</p>
    <section className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">{counts.map(c => <div key={c.status} className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-xs uppercase tracking-wider text-slate-400">{c.status}</p><p className="mt-2 text-3xl font-black">{c.count}</p></div>)}</section>
    <section className="mt-8 grid gap-5">{leads.length === 0 ? <p className="rounded-2xl bg-white p-6 text-slate-700">No leads yet.</p> : leads.map(lead => <article key={lead.id} className="rounded-2xl bg-white p-6 text-[#0D1B2A] shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-wider text-[#0E6B6F]">LEX-{lead.id} · {lead.project_type}</p><h2 className="mt-1 text-2xl font-black">{lead.name}</h2><p className="text-sm text-slate-500">{lead.organization || "No organization"} · <a className="underline" href={`mailto:${lead.email}`}>{lead.email}</a></p></div><div className="text-right text-xs text-slate-500"><p>{new Date(lead.created_at).toLocaleString("en-GB", { timeZone: "Asia/Jakarta" })} WIB</p><p className="mt-1">Email: <strong>{lead.notification_status}</strong> · Consent: <strong>{lead.consent_at ? "recorded" : "legacy"}</strong></p></div></div>
      <p className="mt-5 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{lead.message}</p>
      <form action={updateLead} className="mt-5 grid gap-3 md:grid-cols-[180px_1fr_auto]"><input type="hidden" name="id" value={lead.id}/><select name="status" defaultValue={lead.status} className="rounded-lg border border-slate-300 bg-white px-3 py-2"><option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="won">Won</option><option value="lost">Lost</option><option value="spam">Spam</option></select><input name="notes" defaultValue={lead.notes || ""} maxLength={4000} placeholder="Internal note / next action" className="rounded-lg border border-slate-300 px-3 py-2"/><button className="rounded-lg bg-[#C9A24B] px-5 py-2 font-black">Save</button></form>
    </article>)}</section>
  </div></main>;
}
