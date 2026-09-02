import Link from "next/link";
import { AlertTriangle, CheckCircle2, Clock3, Download, ShieldCheck, Users } from "lucide-react";
import { requireRahiAdmin } from "../admin";

type Profile = { id:string; full_name:string; institution:string|null; participant_category:string|null; cohort_code:string|null };
type Progress = { module_number:number; completed:boolean; quiz_score:number; updated_at:string };
type Enrollment = { id:string; user_id:string; module_progress:Progress[] };
type Assessment = { user_id:string; assessment_type:string; total_score:number|null; testimonial:string|null; testimonial_consent:boolean };

function expectedModules(now = new Date()) {
  const date = now.getTime();
  if (date < Date.parse("2026-10-05T00:00:00+07:00")) return 0;
  if (date < Date.parse("2026-10-12T00:00:00+07:00")) return 2;
  if (date < Date.parse("2026-10-19T00:00:00+07:00")) return 4;
  if (date < Date.parse("2026-10-26T00:00:00+07:00")) return 6;
  return 8;
}

function riskFor(completed:number, expected:number) {
  const gap = expected - completed;
  return gap <= 0 ? "green" : gap === 1 ? "yellow" : "red";
}

export default async function RahiPilotAdminPage() {
  const { admin, profile: currentAdmin } = await requireRahiAdmin();
  const [{ data: profileRows }, { data: enrollmentRows }, { data: assessmentRows }] = await Promise.all([
    admin.from("profiles").select("id,full_name,institution,participant_category,cohort_code").eq("cohort_code","RAHI-PILOT-01").order("full_name"),
    admin.from("enrollments").select("id,user_id,module_progress(module_number,completed,quiz_score,updated_at)").eq("programme_code","RAHI-01"),
    admin.from("rahi_pilot_assessments").select("user_id,assessment_type,total_score,testimonial,testimonial_consent").eq("cohort_code","RAHI-PILOT-01"),
  ]);
  const profiles=(profileRows||[]) as Profile[]; const enrollments=(enrollmentRows||[]) as Enrollment[]; const assessments=(assessmentRows||[]) as Assessment[];
  const enrollmentMap=new Map(enrollments.map(row=>[row.user_id,row]));
  const assessmentMap=new Map<string,Assessment>(); assessments.forEach(row=>assessmentMap.set(`${row.user_id}:${row.assessment_type}`,row));
  const expected=expectedModules();
  const rows=profiles.map(person=>{const enrollment=enrollmentMap.get(person.id);const progress=enrollment?.module_progress||[];const completed=progress.filter(x=>x.completed).length;const passed=progress.filter(x=>x.quiz_score>=70).length;const baseline=assessmentMap.get(`${person.id}:baseline`);const endline=assessmentMap.get(`${person.id}:endline`);const evaluation=assessmentMap.get(`${person.id}:evaluation`);return{person,completed,passed,baseline,endline,evaluation,risk:riskFor(completed,expected)};});
  const green=rows.filter(x=>x.risk==="green").length, yellow=rows.filter(x=>x.risk==="yellow").length, red=rows.filter(x=>x.risk==="red").length;
  const completedAll=rows.filter(x=>x.completed>=8).length; const baselineCount=rows.filter(x=>x.baseline).length; const endlineCount=rows.filter(x=>x.endline).length;
  const changes=rows.filter(x=>x.baseline?.total_score!=null&&x.endline?.total_score!=null).map(x=>(x.endline!.total_score as number)-(x.baseline!.total_score as number));
  const averageChange=changes.length?changes.reduce((a,b)=>a+b,0)/changes.length:null;
  return <main className="min-h-screen bg-[#f3f0e9] px-5 py-12 text-slate-950 sm:px-8"><div className="mx-auto max-w-[92rem]">
    <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs font-bold uppercase tracking-[.25em] text-amber-700">RAHI Administration · Restricted</p><h1 className="mt-3 text-4xl font-black sm:text-6xl">Pilot Cohort 1</h1><p className="mt-3 text-slate-600">5 Oktober–1 November 2026 · Administrator: {currentAdmin.display_name||currentAdmin.email}</p></div><div className="flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 font-bold text-white"><ShieldCheck size={19}/> Akses terverifikasi</div></div>
    <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">{[
      [Users,"Peserta",profiles.length,"bg-slate-950 text-white"],[CheckCircle2,"Baseline",baselineCount,"bg-white"],[CheckCircle2,"8 Modul",completedAll,"bg-white"],[CheckCircle2,"Endline",endlineCount,"bg-white"],[Clock3,"Rata-rata perubahan",averageChange==null?"—":averageChange.toFixed(1),"bg-white"],[AlertTriangle,"Perlu intervensi",yellow+red,"bg-amber-100"],
    ].map(([Icon,label,value,tone])=>{const CardIcon=Icon as typeof Users;return <article key={String(label)} className={`rounded-2xl border border-stone-300 p-5 ${tone}`}><CardIcon size={20}/><p className="mt-4 text-sm font-bold uppercase tracking-wider opacity-70">{String(label)}</p><p className="mt-2 text-3xl font-black">{String(value)}</p></article>})}</section>
    <section className="mt-8 flex flex-wrap items-center gap-3"><span className="rounded-full bg-emerald-100 px-4 py-2 font-bold text-emerald-900">Hijau {green}</span><span className="rounded-full bg-amber-100 px-4 py-2 font-bold text-amber-900">Kuning {yellow}</span><span className="rounded-full bg-red-100 px-4 py-2 font-bold text-red-900">Merah {red}</span><Link href="/raja-ali-haji/admin/pilot-01/export" className="ml-auto inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white"><Download size={17}/> Unduh CSV cohort</Link></section>
    {profiles.length>0&&<section className="mt-6 rounded-2xl border border-stone-300 bg-white p-5"><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-700">Pendampingan individual</p><div className="mt-4 flex flex-wrap gap-2">{profiles.map(person=><Link key={person.id} href={`/raja-ali-haji/admin/pilot-01/${person.id}`} className="rounded-lg border border-stone-300 px-3 py-2 text-sm font-bold hover:border-amber-600 hover:bg-amber-50">{person.full_name}</Link>)}</div></section>}
    <div className="mt-6 overflow-x-auto rounded-2xl border border-stone-300 bg-white"><table className="min-w-[1100px] w-full text-left text-sm"><thead className="bg-slate-950 text-white"><tr>{["Peserta","Kategori","Progres","Kuis ≥70","Baseline","Endline","Evaluasi","Status"].map(h=><th key={h} className="px-5 py-4">{h}</th>)}</tr></thead><tbody>{rows.length===0?<tr><td colSpan={8} className="px-5 py-12 text-center text-slate-500">Belum ada peserta Pilot Cohort 1.</td></tr>:rows.map(row=><tr key={row.person.id} className="border-t border-stone-200"><td className="px-5 py-4"><p className="font-bold">{row.person.full_name}</p><p className="mt-1 text-xs text-slate-500">{row.person.institution||"Tanpa institusi"}</p></td><td className="px-5 py-4 capitalize">{row.person.participant_category||"—"}</td><td className="px-5 py-4 font-bold">{row.completed}/8</td><td className="px-5 py-4">{row.passed}/8</td><td className="px-5 py-4">{row.baseline?`${row.baseline.total_score}/50`:"Belum"}</td><td className="px-5 py-4">{row.endline?`${row.endline.total_score}/50`:"Belum"}</td><td className="px-5 py-4">{row.evaluation?`${row.evaluation.total_score}/60`:"Belum"}</td><td className="px-5 py-4"><span className={`rounded-full px-3 py-1.5 font-bold ${row.risk==="green"?"bg-emerald-100 text-emerald-900":row.risk==="yellow"?"bg-amber-100 text-amber-900":"bg-red-100 text-red-900"}`}>{row.risk==="green"?"Hijau":row.risk==="yellow"?"Kuning":"Merah"}</span></td></tr>)}</tbody></table></div>
  </div></main>;
}
