import type { Metadata } from "next";
import Link from "next/link";
import { requireLexNusaAdmin, formatJakarta, formatMoney } from "./admin";
import { quickUpdateStatus } from "./actions";

export const metadata: Metadata = { title: "LexNusa Mini CRM", robots: { index: false, follow: false } };

type Lead = {
  id: number;
  created_at: string;
  name: string;
  organization: string | null;
  email: string;
  project_type: string;
  message: string;
  status: string;
  notification_status: string;
  consent_at: string | null;
  follow_up_at: string | null;
  estimated_value: number | null;
  currency: string;
  owner_user_id: string | null;
};

type Admin = { user_id: string; email: string | null; display_name: string | null };

function pct(numerator: number, denominator: number) {
  return denominator > 0 ? `${Math.round((numerator / denominator) * 100)}%` : "0%";
}

function pipelineSummary(leads: Lead[]) {
  const sums = new Map<string, number>();
  for (const lead of leads) {
    if (lead.estimated_value === null) continue;
    sums.set(lead.currency, (sums.get(lead.currency) || 0) + Number(lead.estimated_value));
  }
  if (sums.size === 0) return "—";
  return Array.from(sums.entries()).map(([currency, value]) => formatMoney(value, currency)).join(" · ");
}

export default async function LexNusaOpsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; owner?: string }> }) {
  const { admin } = await requireLexNusaAdmin();
  const params = await searchParams;
  const query = String(params.q || "").trim().toLowerCase();
  const statusFilter = String(params.status || "all");
  const ownerFilter = String(params.owner || "all");

  const [{ data: leadRows }, { data: adminRows }] = await Promise.all([
    admin.from("lexnusa_pilot_leads").select("id,created_at,name,organization,email,project_type,message,status,notification_status,consent_at,follow_up_at,estimated_value,currency,owner_user_id").order("created_at", { ascending: false }).limit(500),
    admin.from("lexnusa_admins").select("user_id,email,display_name").order("display_name", { ascending: true }),
  ]);

  const leads = (leadRows || []) as Lead[];
  const admins = (adminRows || []) as Admin[];
  const ownerMap = new Map(admins.map(a => [a.user_id, a.display_name || a.email || "Admin"]));

  const filtered = leads.filter(lead => {
    if (statusFilter !== "all" && lead.status !== statusFilter) return false;
    if (ownerFilter === "unassigned" && lead.owner_user_id) return false;
    if (ownerFilter !== "all" && ownerFilter !== "unassigned" && lead.owner_user_id !== ownerFilter) return false;
    if (!query) return true;
    const haystack = [lead.name, lead.organization || "", lead.email, lead.project_type, lead.message].join(" ").toLowerCase();
    return haystack.includes(query);
  });

  const active = leads.filter(l => l.status !== "spam");
  const contacted = active.filter(l => ["contacted","qualified","won","lost"].includes(l.status));
  const qualified = active.filter(l => ["qualified","won"].includes(l.status));
  const won = active.filter(l => l.status === "won");
  const open = active.filter(l => ["new","contacted","qualified"].includes(l.status));
  const due = open.filter(l => l.follow_up_at && new Date(l.follow_up_at).getTime() <= Date.now());

  return <main className="min-h-screen bg-[#0D1B2A] px-5 py-14 text-white sm:px-8"><div className="mx-auto max-w-7xl">
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div><p className="text-xs font-black uppercase tracking-[.24em] text-[#C9A24B]">LexNusa Legal AI · Private Operations</p><h1 className="mt-3 text-4xl font-black sm:text-5xl">Mini CRM v1.0</h1><p className="mt-4 max-w-3xl text-slate-300">Track acquisition, follow-ups, ownership, estimated value, and conversion from first contact through won/lost.</p></div>
      <Link href="/lexnusa/pilot" className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold hover:bg-white/10">Open Pilot Form</Link>
    </div>

    <section className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
      <Kpi label="Total leads" value={String(active.length)} />
      <Kpi label="Contacted rate" value={pct(contacted.length, active.length)} />
      <Kpi label="Qualification rate" value={pct(qualified.length, contacted.length)} />
      <Kpi label="Win rate" value={pct(won.length, qualified.length)} />
      <Kpi label="Open pipeline" value={pipelineSummary(open)} small />
      <Kpi label="Follow-ups due" value={String(due.length)} />
    </section>

    <form method="get" className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-[1fr_180px_220px_auto]">
      <input name="q" defaultValue={params.q || ""} placeholder="Search name, email, organization, project..." className="rounded-xl border border-white/15 bg-[#142235] px-4 py-3 text-sm text-white placeholder:text-slate-500" />
      <select name="status" defaultValue={statusFilter} className="rounded-xl border border-white/15 bg-[#142235] px-4 py-3 text-sm"><option value="all">All statuses</option><option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="won">Won</option><option value="lost">Lost</option><option value="spam">Spam</option></select>
      <select name="owner" defaultValue={ownerFilter} className="rounded-xl border border-white/15 bg-[#142235] px-4 py-3 text-sm"><option value="all">All owners</option><option value="unassigned">Unassigned</option>{admins.map(a => <option key={a.user_id} value={a.user_id}>{a.display_name || a.email}</option>)}</select>
      <button className="rounded-xl bg-[#C9A24B] px-5 py-3 font-black text-[#0D1B2A]">Filter</button>
    </form>

    <div className="mt-5 flex items-center justify-between text-sm text-slate-400"><p>{filtered.length} of {leads.length} leads</p>{(query || statusFilter !== "all" || ownerFilter !== "all") && <Link href="/lexnusa/ops" className="underline">Clear filters</Link>}</div>

    <section className="mt-5 grid gap-5">{filtered.length === 0 ? <p className="rounded-2xl bg-white p-6 text-slate-700">No leads match this filter.</p> : filtered.map(lead => <article key={lead.id} className="rounded-2xl bg-white p-6 text-[#0D1B2A] shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs font-black uppercase tracking-wider text-[#0E6B6F]">LEX-{lead.id} · {lead.project_type}</p><h2 className="mt-1 text-2xl font-black">{lead.name}</h2><p className="mt-1 text-sm text-slate-500">{lead.organization || "No organization"} · {lead.email}</p></div><div className="text-right text-xs text-slate-500"><p>{formatJakarta(lead.created_at)}</p><p className="mt-1">Email: <strong>{lead.notification_status}</strong> · Consent: <strong>{lead.consent_at ? "recorded" : "legacy"}</strong></p></div></div>
      <div className="mt-5 grid gap-3 rounded-xl bg-slate-50 p-4 text-sm md:grid-cols-3"><Info label="Owner" value={lead.owner_user_id ? ownerMap.get(lead.owner_user_id) || "Unknown" : "Unassigned"}/><Info label="Follow-up" value={formatJakarta(lead.follow_up_at)}/><Info label="Est. value" value={formatMoney(lead.estimated_value, lead.currency)}/></div>
      <p className="mt-4 line-clamp-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">{lead.message}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3"><form action={quickUpdateStatus} className="flex gap-2"><input type="hidden" name="id" value={lead.id}/><select name="status" defaultValue={lead.status} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"><option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="won">Won</option><option value="lost">Lost</option><option value="spam">Spam</option></select><button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold">Update</button></form><a href={`mailto:${lead.email}?subject=${encodeURIComponent(`LexNusa Pilot LEX-${lead.id}`)}`} className="rounded-lg bg-[#0E6B6F] px-4 py-2 text-sm font-bold text-white">Email Client</a><Link href={`/lexnusa/ops/${lead.id}`} className="rounded-lg bg-[#C9A24B] px-4 py-2 text-sm font-black">View Details</Link></div>
    </article>)}</section>
  </div></main>;
}

function Kpi({ label, value, small = false }: { label: string; value: string; small?: boolean }) { return <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-xs uppercase tracking-wider text-slate-400">{label}</p><p className={`mt-2 font-black ${small ? "text-lg leading-6" : "text-3xl"}`}>{value}</p></div>; }
function Info({ label, value }: { label: string; value: string }) { return <div><p className="text-[11px] font-black uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 font-semibold text-slate-700">{value}</p></div>; }
