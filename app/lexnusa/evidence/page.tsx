import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileCheck2, FlaskConical, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Evidence & Portfolio | LexNusa Legal AI",
  description: "Evidence, benchmark demonstrations, methodologies, and client-safe work samples from LexNusa Legal AI.",
  alternates: { canonical: "/lexnusa/evidence" },
};

const roadmap = [
  ["01", "Evaluating AI-Generated Legal Answers", "LEX-EVAL™ controlled demonstration benchmark", "Available"],
  ["02", "Comparative Vicarious Liability Case-Law Mapping", "Structured judicial and doctrine mapping", "In development"],
  ["03", "Indonesia Legal Intelligence Brief", "Market-entry style legal intelligence for an EdTech scenario", "Planned"],
  ["04", "Human vs AI Contract Review Benchmark", "Comparative review quality and error analysis", "Planned"],
  ["05", "LEX-EVAL™ Framework v1.0", "Methodology architecture, scoring, CLFs, and QA logic", "Available"],
];

export default function EvidencePage() {
  return (
    <div className="bg-[#FAFAF8] text-[#0D1B2A]">
      <section className="bg-[#0D1B2A] text-white"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24"><p className="text-xs font-black uppercase tracking-[.22em] text-[#C9A24B]">Evidence & Portfolio</p><h1 className="mt-4 max-w-4xl font-academic text-5xl font-bold sm:text-6xl">Show the work. Make quality inspectable.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">LexNusa uses client-safe demonstrations, structured methodology, and traceable evaluation records to make legal-AI quality visible before a larger engagement begins.</p></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <article className="rounded-3xl bg-[#0D1B2A] p-8 text-white sm:p-10"><p className="text-xs font-black uppercase tracking-[.2em] text-[#C9A24B]">Featured Evidence · Portfolio #1</p><h2 className="mt-4 font-academic text-4xl font-bold">Evaluating AI-Generated Legal Answers</h2><p className="mt-3 text-xl font-bold text-[#69C2C1]">A LEX-EVAL™ Benchmark</p><p className="mt-6 leading-8 text-slate-300">A controlled demonstration using synthetic AI outputs to show scoring, authority review, error classification, Critical Legal Failure logic, and gold-standard correction.</p><div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">{[["20","Questions"],["20","Outputs"],["7","Dimensions"],["100","Points"]].map(([a,b])=><div key={b} className="rounded-xl bg-white/[.07] p-4"><p className="text-2xl font-black text-[#E2C77E]">{a}</p><p className="mt-1 text-xs text-slate-300">{b}</p></div>)}</div><div className="mt-8 flex flex-wrap gap-3"><Link href="/lexnusa/lex-eval-sample" className="rounded-xl bg-[#C9A24B] px-5 py-3.5 font-black text-[#0D1B2A]">View LEX-EVAL Sample</Link><Link href="/lexnusa/pilot" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 font-bold">Build a benchmark <ArrowRight size={17}/></Link></div></article>
          <div className="rounded-3xl border border-slate-200 bg-white p-8"><ShieldCheck className="text-[#0E6B6F]" size={36}/><h3 className="mt-5 font-academic text-2xl font-bold">Evidence standards</h3><div className="mt-5 space-y-4">{["Client-safe demonstration data","No unsupported performance claims","Traceable methodology and scoring","Clear distinction between demo and empirical evidence","Human legal review as final quality gate"].map(x=><p key={x} className="flex gap-3 text-slate-600"><CheckCircle2 className="mt-1 shrink-0 text-[#0E6B6F]" size={18}/>{x}</p>)}</div></div>
        </div>
      </section>

      <section className="bg-[#EEF4F3]"><div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-10"><div className="py-16"><div className="flex items-center gap-3"><FlaskConical className="text-[#0E6B6F]"/><p className="text-xs font-black uppercase tracking-[.22em] text-[#0E6B6F]">Portfolio Roadmap</p></div><h2 className="mt-3 font-academic text-4xl font-bold">A growing evidence base.</h2><div className="mt-9 space-y-4">{roadmap.map(([n,title,desc,status])=><article key={n} className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-[70px_1fr_auto] md:items-center"><div className="font-academic text-3xl font-bold text-[#C09435]">{n}</div><div><h3 className="font-academic text-xl font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{desc}</p></div><span className="w-fit rounded-full bg-[#F2F4F7] px-3 py-1.5 text-xs font-black uppercase tracking-[.12em] text-slate-600">{status}</span></article>)}</div></div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10"><div className="grid gap-6 md:grid-cols-3">{[[FileCheck2,"Methodology","Scoring rules, error taxonomy, severity levels, and Critical Legal Failure logic."],[ShieldCheck,"Quality Assurance","Source verification, reviewer judgment, traceability, and correction workflow."],[FlaskConical,"Empirical Benchmarking","Model-to-model testing can be added when outputs are collected under a controlled protocol."]].map(([Icon,title,text])=>{const C=Icon as typeof FileCheck2; return <div key={title as string} className="rounded-2xl border border-slate-200 bg-white p-6"><C className="text-[#0E6B6F]"/><h3 className="mt-4 font-academic text-xl font-bold">{title as string}</h3><p className="mt-3 leading-7 text-slate-600">{text as string}</p></div>})}</div></section>
    </div>
  );
}
