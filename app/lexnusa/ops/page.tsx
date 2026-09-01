import type { Metadata } from "next";
import Link from "next/link";
import { requireLexNusaAdmin, formatJakarta, formatMoney } from "./admin";
import { prepareFollowUpEmail, quickUpdateStatus } from "./actions";

export const metadata: Metadata = { title: "LexNusa Follow-up Operations", robots: { index: false, follow: false } };

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
type FollowState = "overdue" | "today" | "upcoming" | "none";

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

function jakartaDateKey(value: Date | string) {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function followState(lead: Lead, todayKey: string): FollowState {
  if (!lead.follow_up_at || !["new", "contacted", "qualified"].includes(lead.status)) return "none";
  const key = jakartaDateKey(lead.follow_up_at);
  if (key < todayKey) return "overdue";
  if (key === todayKey) return "today";
  return "upcoming";
}

export default async function LexNusaOpsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; owner?: string; follow?: string }> }) {
  const { admin } = await requireLexNusaAdmin();
  const params = await searchParams;
  const query = String(params.q || "").trim().toLowerCase();
  const statusFilter = String(params.status || "all");
  const ownerFilter = String(params.owner || "all");
  const followFilter = String(params.follow || "all");
  const todayKey = jakartaDateKey(new Date());

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
    if (followFilter !== "all" && followState(lead, todayKey) !== followFilter) return false;
    if (!query) return true;
    const haystack = [lead.name, lead.organization || "", lead.email, lead.project_type, lead.message].join(" ").toLowerCase();
    return haystack.includes(query);
  });

  const active = leads.filter(l => l.status !== "spam");
  const contacted = active.filter(l => ["contacted", "qualified", "won", "lost"].includes(l.status));
  const qualified = active.filter(l => ["qualified", "won"].includes(l.status));
  const won = active.filter(l => l.status === "won");
  const open = active.filter(l => ["new", "contacted", "qualified"].includes(l.status));
  const overdue = open.filter(l => followState(l, todayKey) === "overdue");
  const today = open.filter(l => followState(l, todayKey) === "today");
  const upcoming = open.filter(l => followState(l, todayKey) === "upcoming");

  return <main className="min-h-screen bg-[#0D1B2A] px-5 py-14 text-white sm:px-8"><div className="mx-auto max-w-7xl">
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div><p className="text-xs font-black uppercase tracking-[.24em] text-[#C9A24B]">LexNusa Legal AI · Private Operations</p><h1 className="mt-3 text-4xl font-black sm:text-5xl">Follow-up Operations v1.1</h1><p className="mt-4 max-w-3xl text-slate-300">Run LexNusa as a daily follow-up system: prioritize overdue work, prepare client emails, and keep every action auditable.</p></div>
      <Link href="/lexnusa/pilot" className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold hover:bg-white/10">Open Pilot Form</Link>
    </div>

    <section className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
      <Kpi label="Total leads" value={String(active.length)} />
      <Kpi label="Contacted rate" value={pct(contacted.length, active.length)} />
      <Kpi label="Qualification rate" value={pct(qualified.length, contacted.length)} />
      <Kpi label="Win rate" value={pct(won.length, qualified.length)} />
      <Kpi label="Open pipeline" value={pipelineSummary(open)} small />
      <Kpi label="Open leads" value={String(open.length)} />
    </section>

    <section className="mt-5 grid gap-3 md:grid-cols-3">
      <FollowKpi label="Overdue" value={overdue.length} href="/lexnusa/ops?follow=overdue" tone="red" subtitle="Past follow-up date" />
      <FollowKpi label="Today" value={today.length} href="/lexnusa/ops?follow=today" tone="gold" subtitle="Due today in WIB" />
      <FollowKpi label="Upcoming" value={upcoming.length} href="/lexnusa/ops?follow=upcoming" tone="teal" subtitle="Future scheduled follow-ups" />
    </section>

    <form method="get" className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 xl:grid-cols-[1fr_170px_210px_170px_auto]">
      <input name="q" defaultValue={params.q || ""} placeholder="Search name, email, organization, project..." className="rounded-xl border border-white/15 bg-[#142235] px-4 py-3 text-sm text-white placeholder:text-slate-500" />
      <select name="status" defaultValue={statusFilter} className="rounded-xl border border-white/15 bg-[#142235] px-4 py-3 text-sm"><option value="all">All statuses</option><option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="won">Won</option><option value="lost">Lost</option><option value="spam">Spam</option></select>
      <select name="owner" defaultValue={ownerFilter} className="rounded-xl border border-white/15 bg-[#142235] px-4 py-3 text-sm"><option value="all">All owners</option><option value="unassigned">Unassigned</option>{admins.map(a => <option key={a.user_id} value={a.user_id}>{a.display_name || a.email}</option>)}</select>
      <select name="follow" defaultValue={followFilter} className="rounded-xl border border-white/15 bg-[#142235] px-4 py-3 text-sm"><option value="all">All follow-ups</option><option value="overdue">Overdue</option><option value="today">Today</option><option value="upcoming">Upcoming</option><option value="none">Not scheduled</option></select>
      <button className="rounded-xl bg-[#C9A24B] px-5 py-3 font-black text-[#0D1B2A]">Filter</button>
    </form>

    <div className="mt-5 flex items-center justify-between text-sm text-slate-400"><p>{filtered.length} of {leads.length} leads</p>{(query || statusFilter !== "all" || ownerFilter !== "all" || followFilter !== "all") && <Link href="/lexnusa/ops" className="underline">Clear filters</Link>}</div>

    <section className="mt-5 grid gap-5">{filtered.length === 0 ? <p className="rounded-2xl bg-white p-6 text-slate-700">No leads match this filter.</p> : filtered.map(lead => {
      const state = followState(lead, todayKey);
      return <article key={lead.id} className="rounded-2xl bg-white p-6 text-[#0D1B2A] shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-5"><div><div className="flex flex-wrap items-center gap-2"><p className="text-xs font-black uppercase tracking-wider text-[#0E6B6F]">LEX-{lead.id} · {lead.project_type}</p><FollowBadge state={state}/></div><h2 className="mt-1 text-2xl font-black">{lead.name}</h2><p className="mt-1 text-sm text-slate-500">{lead.organization || "No organization"} · {lead.email}</p></div><div className="text-right text-xs text-slate-500"><p>{formatJakarta(lead.created_at)}</p><p className="mt-1">Email: <strong>{lead.notification_status}</strong> · Consent: <strong>{lead.consent_at ? "recorded" : "legacy"}</strong></p></div></div>
        <div className="mt-5 grid gap-3 rounded-xl bg-slate-50 p-4 text-sm md:grid-cols-3"><Info label="Owner" value={lead.owner_user_id ? ownerMap.get(lead.owner_user_id) || "Unknown" : "Unassigned"}/><Info label="Follow-up" value={formatJakarta(lead.follow_up_at)}/><Info label="Est. value" value={formatMoney(lead.estimated_value, lead.currency)}/></div>
        <p className="mt-4 line-clamp-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">{lead.message}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3"><form action={quickUpdateStatus} className="flex gap-2"><input type="hidden" name="id" value={lead.id}/><select name="status" defaultValue={lead.status} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"><option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="won">Won</option><option value="lost">Lost</option><option value="spam">Spam</option></select><button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold">Update</button></form><form action={prepareFollowUpEmail}><input type="hidden" name="id" value={lead.id}/><button className="rounded-lg bg-[#0E6B6F] px-4 py-2 text-sm font-bold text-white">Email Client</button></form><Link href={`/lexnusa/ops/${lead.id}`} className="rounded-lg bg-[#C9A24B] px-4 py-2 text-sm font-black">View Details</Link></div>
      </article>;
    })}</section>
  </div></main>;
}

function Kpi({ label, value, small = false }: { label: string; value: string; small?: boolean }) { return <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-xs uppercase tracking-wider text-slate-400">{label}</p><p className={`mt-2 font-black ${small ? "text-lg leading-6" : "text-3xl"}`}>{value}</p></div>; }
function Info({ label, value }: { label: string; value: string }) { return <div><p className="text-[11px] font-black uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 font-semibold text-slate-700">{value}</p></div>; }
function FollowKpi({ label, value, href, tone, subtitle }: { label:string; value:number; href:string; tone:"red"|"gold"|"teal"; subtitle:string }) { const cls = tone === "red" ? "border-red-400/30 bg-red-400/10" : tone === "gold" ? "border-[#C9A24B]/40 bg-[#C9A24B]/10" : "border-[#0E6B6F]/50 bg-[#0E6B6F]/20"; return <Link href={href} className={`rounded-2xl border p-5 ${cls}`}><div className="flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-wider text-slate-300">{label}</p><p className="mt-2 text-4xl font-black">{value}</p></div><span className="text-sm text-slate-300">View →</span></div><p className="mt-2 text-xs text-slate-400">{subtitle}</p></Link>; }
function FollowBadge({ state }: { state:FollowState }) { if (state === "none") return null; const cls = state === "overdue" ? "bg-red-100 text-red-700" : state === "today" ? "bg-amber-100 text-amber-800" : "bg-teal-100 text-teal-700"; const label = state === "overdue" ? "OVERDUE" : state === "today" ? "DUE TODAY" : "UPCOMING"; return <span className={`rounded-full px-2.5 py-1 text-[10px] font-black tracking-wider ${cls}`}>{label}</span>; }
