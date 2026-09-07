import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const metadata={title:"Portfolio Showcase | Raja Ali Haji Institute"};
export const revalidate=60;

type ShowcaseItem={project_id:string;track:string;title:string;participant_name:string;institution:string|null;verified_score:number;artifact_url:string|null;verified_at:string};

export default async function PortfolioShowcasePage(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 let projects:ShowcaseItem[]=[];
 if(url&&key){const client=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});const {data}=await client.from("rahi_portfolio_showcase_public").select("project_id,track,title,participant_name,institution,verified_score,artifact_url,verified_at").order("verified_at",{ascending:false});projects=(data||[]) as ShowcaseItem[];}
 return <main className="min-h-screen bg-stone-950 text-stone-100"><section className="mx-auto max-w-6xl px-6 py-20"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">Raja Ali Haji Institute</p><h1 className="mt-3 text-4xl font-bold md:text-5xl">Verified Portfolio Showcase</h1><p className="mt-5 max-w-3xl text-lg text-stone-300">Hanya karya dengan visibility Public, keputusan VERIFIED dari reviewer manusia, dan persetujuan showcase yang ditampilkan.</p>
 <div className="mt-10 grid gap-6 md:grid-cols-2">{projects.length===0?<div className="rounded-2xl border border-stone-700 bg-stone-900 p-8 md:col-span-2"><h2 className="text-2xl font-semibold">Showcase sedang disiapkan</h2><p className="mt-3 text-stone-300">Belum ada karya yang memenuhi seluruh gate publikasi.</p></div>:projects.map(p=><article key={p.project_id} className="rounded-2xl border border-stone-700 bg-stone-900 p-7"><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-400">{p.track} · Verified</p><h2 className="mt-3 text-2xl font-bold">{p.title}</h2><p className="mt-3 text-stone-300">{p.participant_name}{p.institution?` · ${p.institution}`:""}</p><p className="mt-4 text-sm font-semibold text-emerald-300">Human verification score: {p.verified_score}/100</p>{p.artifact_url&&<a href={p.artifact_url} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-amber-400 px-5 py-3 font-semibold text-stone-950">View verified artifact ↗</a>}</article>)}</div>
 <div className="mt-10 flex flex-wrap gap-3"><Link href="/raja-ali-haji/pilot-cohort/portfolio" className="rounded-full bg-amber-400 px-5 py-3 font-semibold text-stone-950">Portfolio Workspace</Link><Link href="/raja-ali-haji/pilot-cohort" className="rounded-full border border-stone-600 px-5 py-3 font-semibold">Pilot Cohort</Link></div></section></main>;
}
