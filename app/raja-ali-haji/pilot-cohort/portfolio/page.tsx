import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { assessmentRubric, learningOutcomes, portfolioMilestones, portfolioTracks } from "../outcome-portfolio";
import { savePortfolioProject, submitPortfolioVersion } from "./actions";

export const metadata = { title: "My Portfolio | Raja Ali Haji Institute" };

type Project={id:string;track:string;title:string;problem_statement:string;visibility:string;status:string;verified_at:string|null};
type Version={id:string;version_number:number;artifact_url:string|null;narrative:string;submitted_at:string};
type Review={total_score:number;decision:string;reviewer_notes:string;reviewed_at:string};
type Outcome={id:string;title:string;description:string};

export default async function PortfolioWorkspacePage({searchParams}:{searchParams:Promise<{saved?:string;error?:string}>}) {
  const query=await searchParams;
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) redirect(`/login?next=${encodeURIComponent("/raja-ali-haji/pilot-cohort/portfolio")}`);
  const [{data:enrollment},{data:outcomeRows}]=await Promise.all([
    supabase.from("enrollments").select("id").eq("user_id",user.id).eq("programme_code","RAHI-01").maybeSingle(),
    supabase.from("rahi_learning_outcomes").select("code,title,description,sort_order").order("sort_order"),
  ]);
  if(!enrollment) redirect("/dashboard?error=rahi-enrollment-required");
  const outcomes:Outcome[]=outcomeRows?.length?outcomeRows.map((o:{code:string;title:string;description:string})=>({id:o.code,title:o.title,description:o.description})):learningOutcomes.map(o=>({...o}));
  const {data:projectRow}=await supabase.from("rahi_portfolio_projects").select("id,track,title,problem_statement,visibility,status,verified_at").eq("enrollment_id",enrollment.id).maybeSingle();
  const project=projectRow as Project|null;
  const [{data:versionRows},{data:reviewRows}]=project?await Promise.all([
    supabase.from("rahi_portfolio_versions").select("id,version_number,artifact_url,narrative,submitted_at").eq("project_id",project.id).order("version_number",{ascending:false}),
    supabase.from("rahi_portfolio_reviews").select("total_score,decision,reviewer_notes,reviewed_at").eq("project_id",project.id).order("reviewed_at",{ascending:false}),
  ]):[{data:[]},{data:[]}];
  const versions=(versionRows||[]) as Version[];const reviews=(reviewRows||[]) as Review[];const latestReview=reviews[0];
  const editable=!project||["draft","revision_requested"].includes(project.status);

  return <main className="min-h-screen bg-stone-50 text-stone-900"><section className="mx-auto max-w-6xl px-6 py-16">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Pilot Cohort · Outcome-Based Learning</p><h1 className="mt-3 text-4xl font-bold">My Portfolio Workspace</h1>
    <p className="mt-4 max-w-3xl text-lg text-stone-600">Learn → Apply → Produce → Review → Improve → Verify → Showcase. Semua versi submission tersimpan sebagai riwayat; keputusan VERIFIED hanya berasal dari reviewer manusia.</p>
    {query.saved&&<p className="mt-6 rounded-xl border border-emerald-300 bg-emerald-50 p-4 font-semibold text-emerald-800">Perubahan tersimpan: {query.saved}.</p>}{query.error&&<p className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-800">{query.error}</p>}

    <div className="mt-10 grid gap-6 lg:grid-cols-3"><form action={savePortfolioProject} className="rounded-2xl border bg-white p-6 lg:col-span-2">
      <h2 className="text-xl font-semibold">Portfolio Project</h2>{project&&<input type="hidden" name="projectId" value={project.id}/>}<div className="mt-5 grid gap-4">
      <label className="font-semibold">Track<select name="track" defaultValue={project?.track||portfolioTracks[0]} disabled={!editable} className="mt-2 w-full rounded-lg border p-3 font-normal">{portfolioTracks.map(t=><option key={t}>{t}</option>)}</select></label>
      <label className="font-semibold">Judul proyek<input name="title" required minLength={3} maxLength={180} defaultValue={project?.title||""} disabled={!editable} className="mt-2 w-full rounded-lg border p-3 font-normal"/></label>
      <label className="font-semibold">Problem statement<textarea name="problemStatement" rows={5} maxLength={4000} defaultValue={project?.problem_statement||""} disabled={!editable} className="mt-2 w-full rounded-lg border p-3 font-normal"/></label>
      <label className="font-semibold">Visibility<select name="visibility" defaultValue={project?.visibility||"private"} disabled={!editable} className="mt-2 w-full rounded-lg border p-3 font-normal"><option value="private">Private</option><option value="unlisted">Unlisted</option><option value="public">Public</option></select></label>
      {editable?<button className="rounded-xl bg-slate-950 px-5 py-3 font-bold text-white">{project?"Simpan proyek":"Buat proyek"}</button>:<p className="rounded-xl bg-stone-100 p-4 font-semibold">Status: {project?.status}. Metadata dikunci selama review/verifikasi.</p>}</div>
    </form><div className="rounded-2xl border bg-white p-6"><h2 className="text-xl font-semibold">Learning Outcome Registry</h2><p className="mt-2 text-xs font-semibold uppercase tracking-[.16em] text-emerald-700">Supabase-backed</p><div className="mt-4 space-y-3">{outcomes.map(o=><div key={o.id}><span className="font-semibold">{o.id} · {o.title}</span><p className="text-sm text-stone-600">{o.description}</p></div>)}</div></div></div>

    {project&&editable&&<form action={submitPortfolioVersion} className="mt-6 rounded-2xl border bg-white p-6"><input type="hidden" name="projectId" value={project.id}/><h2 className="text-xl font-semibold">Submit versi baru</h2><p className="mt-2 text-sm text-stone-600">Submission bersifat immutable. Setelah dikirim, versi ini tidak dapat ditimpa; revisi berikutnya menjadi version number baru.</p><label className="mt-5 block font-semibold">Artifact URL<input name="artifactUrl" type="url" placeholder="https://..." className="mt-2 w-full rounded-lg border p-3 font-normal"/></label><label className="mt-4 block font-semibold">Narrative / executive summary<textarea name="narrative" required minLength={20} rows={8} className="mt-2 w-full rounded-lg border p-3 font-normal"/></label><label className="mt-4 block font-semibold">Evidence links / references (satu per baris)<textarea name="evidence" rows={5} className="mt-2 w-full rounded-lg border p-3 font-normal"/></label><button className="mt-5 rounded-xl bg-amber-500 px-5 py-3 font-bold text-slate-950">Submit for Human Review</button></form>}

    <div className="mt-6 grid gap-6 lg:grid-cols-2"><article className="rounded-2xl border bg-white p-6"><h2 className="text-xl font-semibold">Submission History</h2><div className="mt-4 space-y-3">{versions.length?versions.map(v=><div key={v.id} className="rounded-xl bg-stone-50 p-4"><b>Version {v.version_number}</b><p className="text-sm text-stone-500">{new Date(v.submitted_at).toLocaleString("id-ID")}</p>{v.artifact_url&&<a className="mt-2 inline-block font-semibold text-amber-800" href={v.artifact_url} target="_blank" rel="noreferrer">Buka artifact ↗</a>}</div>):<p className="text-stone-500">Belum ada submission.</p>}</div></article><article className="rounded-2xl border bg-white p-6"><h2 className="text-xl font-semibold">Human Verification</h2>{latestReview?<div className="mt-4"><p className="text-4xl font-black">{latestReview.total_score}/100</p><p className="mt-2 font-semibold">Decision: {latestReview.decision}</p>{latestReview.reviewer_notes&&<p className="mt-3 rounded-xl bg-stone-50 p-4">{latestReview.reviewer_notes}</p>}</div>:<p className="mt-4 text-stone-500">Belum ada keputusan reviewer manusia.</p>}<p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm">AI assessment hanya boleh menjadi advisory; ia tidak dapat memberikan status VERIFIED atau menerbitkan sertifikat.</p></article></div>

    <div className="mt-6 rounded-2xl border bg-white p-6"><h2 className="text-xl font-semibold">4-Week Production Journey</h2><div className="mt-5 grid gap-4 md:grid-cols-4">{portfolioMilestones.map(m=><div key={m.week} className="rounded-xl bg-stone-50 p-4"><p className="text-sm text-amber-700">Week {m.week}</p><p className="font-semibold">{m.stage}</p><p className="mt-2 text-sm text-stone-600">Output: {m.artifact}</p></div>)}</div></div>
    <div className="mt-6 rounded-2xl border bg-white p-6"><h2 className="text-xl font-semibold">Assessment Rubric · 100 points</h2><div className="mt-4 divide-y">{assessmentRubric.map(r=><div key={r.criterion} className="flex justify-between py-3"><span>{r.criterion}</span><strong>{r.weight}</strong></div>)}</div></div>
    <div className="mt-8 flex flex-wrap gap-3"><Link href="/dashboard" className="rounded-full border px-5 py-3 font-semibold">Participant Dashboard</Link><Link href="/raja-ali-haji/pilot-cohort/showcase" className="rounded-full bg-stone-900 px-5 py-3 font-semibold text-white">Portfolio Showcase</Link></div>
  </section></main>;
}
