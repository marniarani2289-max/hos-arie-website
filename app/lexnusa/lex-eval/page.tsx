import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "LEX-EVAL™ | LexNusa Legal AI",
  description: "LEX-EVAL™ is LexNusa's human-led 100-point Legal AI Evaluation Framework for legal accuracy, authority integrity, reasoning, hallucination control, and professional usefulness.",
  alternates: { canonical: "/lexnusa/lex-eval" },
};

const dimensions = [
  ["Legal Accuracy", "25", "Is the substantive legal answer correct?"],
  ["Authority & Citation Integrity", "15", "Are authorities real, relevant, current, and properly represented?"],
  ["Issue Identification", "10", "Does the output identify the legal issues that actually matter?"],
  ["Legal Reasoning", "20", "Does the analysis connect facts, rules, authorities, and conclusions coherently?"],
  ["Jurisdictional Alignment", "10", "Does the answer remain within the correct legal system and applicable framework?"],
  ["Hallucination & Fabrication Control", "10", "Does it avoid invented authorities, facts, rules, and unsupported certainty?"],
  ["Professional Usefulness", "10", "Can a professional reviewer use the output efficiently and safely?"],
];

const criticalFailures = [
  "Fabricated Authority",
  "Material Misstatement of Law",
  "Wrong Jurisdiction",
  "Invalid or Obsolete Authority",
  "Material Fact Distortion",
  "Unsafe Professional Reliance",
];

export default function LexEvalPage() {
  return (
    <div className="bg-[#FAFAF8] text-[#0D1B2A]">
      <section className="bg-[#0D1B2A] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:py-24">
          <div><p className="text-xs font-black uppercase tracking-[.22em] text-[#C9A24B]">Proprietary Evaluation Methodology</p><h1 className="mt-4 font-academic text-6xl font-bold">LEX-EVAL™</h1><p className="mt-5 max-w-2xl text-xl leading-8 text-slate-300">A human-led Legal AI Evaluation Framework designed to distinguish fluent language from actual legal reliability.</p><div className="mt-7 rounded-2xl border-l-4 border-[#C9A24B] bg-white/[.06] p-6 font-academic text-xl font-bold italic">“High linguistic quality is not evidence of legal reliability.”</div><div className="mt-8 flex flex-wrap gap-3"><Link href="/lexnusa/lex-eval-sample" className="rounded-xl bg-[#C9A24B] px-5 py-3.5 font-black text-[#0D1B2A]">View Sample</Link><Link href="/lexnusa/pilot" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 font-bold">Request Evaluation <ArrowRight size={17}/></Link></div></div>
          <div className="rounded-3xl border border-white/10 bg-white/[.05] p-8"><p className="text-xs font-black uppercase tracking-[.2em] text-[#69C2C1]">Decision Layer</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{[["90–100","Expert Grade"],["80–89","Strong"],["70–79","Conditional"],["50–69","High Risk"],["0–49","Unreliable"],["CLF","Overrides score"]].map(([a,b])=><div key={a} className="rounded-xl bg-[#07121F] p-4"><p className="text-xl font-black text-[#E2C77E]">{a}</p><p className="mt-1 text-sm text-slate-300">{b}</p></div>)}</div><p className="mt-6 text-sm leading-6 text-slate-400">Reliability outcome: PASS · PASS WITH REVIEW · FAIL-CRITICAL.</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <p className="text-xs font-black uppercase tracking-[.22em] text-[#0E6B6F]">100-Point Architecture</p>
        <h2 className="mt-3 font-academic text-4xl font-bold">Seven dimensions. One auditable evaluation record.</h2>
        <div className="mt-9 grid gap-5 md:grid-cols-2">{dimensions.map(([name,weight,text])=><article key={name} className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-start justify-between gap-5"><h3 className="font-academic text-xl font-bold">{name}</h3><span className="rounded-full bg-[#EEF4F3] px-3 py-1 text-sm font-black text-[#0E6B6F]">{weight} pts</span></div><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}</div>
      </section>

      <section className="bg-[#F7F1E4]">
        <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-10">
          <div className="grid gap-10 py-16 lg:grid-cols-[.9fr_1.1fr]">
            <div><ShieldAlert size={36} className="text-[#A57E2D]"/><h2 className="mt-5 font-academic text-4xl font-bold">Critical Legal Failures</h2><p className="mt-4 leading-7 text-slate-700">A numerical score cannot neutralize a Critical Legal Failure. LEX-EVAL™ separates aggregate quality from failures that can make professional reliance unsafe.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">{criticalFailures.map((item,i)=><div key={item} className="flex gap-3 rounded-xl bg-white p-4 shadow-sm"><span className="font-black text-[#A57E2D]">CLF-0{i+1}</span><span className="font-semibold text-slate-700">{item}</span></div>)}</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10"><div className="rounded-3xl bg-[#0E6B6F] p-8 text-white sm:p-10"><p className="text-xs font-black uppercase tracking-[.2em] text-[#F2D994]">Evaluation Deliverables</p><h2 className="mt-3 font-academic text-4xl font-bold">From score to corrective intelligence.</h2><div className="mt-7 grid gap-3 md:grid-cols-2">{["Weighted scorecard and reliability outcome","Authority and citation verification","Error taxonomy and severity classification","Critical Legal Failure assessment","Corrected or gold-standard answer","Aggregate benchmark analytics"].map(x=><p key={x} className="flex gap-3 rounded-xl bg-white/[.08] p-4"><CheckCircle2 className="mt-0.5 shrink-0" size={18}/>{x}</p>)}</div><Link href="/lexnusa/pilot" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#C9A24B] px-5 py-3.5 font-black text-[#0D1B2A]">Evaluate a legal AI workflow <ArrowRight size={18}/></Link></div></section>
    </div>
  );
}
