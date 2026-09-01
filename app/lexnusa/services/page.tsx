import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BrainCircuit, FileSearch, Globe2, Scale, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Services | LexNusa Legal AI" },
  description: "Legal research intelligence, Legal AI evaluation, case-law mapping, benchmark development, and Indonesia & ASEAN legal intelligence.",
  alternates: { canonical: "/lexnusa/services" },
};

const services = [
  { icon: FileSearch, title: "Legal Research Intelligence", range: "$150–500", text: "Focused legal and comparative research transformed into concise memoranda, authority maps, issue matrices, and decision-ready intelligence.", outputs: ["Research memorandum", "Authority map", "Issue matrix", "Source verification"] },
  { icon: Scale, title: "Case Law & Doctrine Mapping", range: "$300–1,000", text: "Structured mapping of judicial decisions, legal tests, doctrinal patterns, factual distinctions, and comparative developments.", outputs: ["Case-law matrix", "Doctrine map", "Pattern analysis", "Comparative synthesis"] },
  { icon: BrainCircuit, title: "Legal AI Output Evaluation", range: "$300–1,500", text: "Human review of AI-generated legal outputs for legal accuracy, authority integrity, reasoning, jurisdiction, hallucination risk, and professional usefulness.", outputs: ["LEX-EVAL™ scorecard", "Error taxonomy", "Critical failure review", "Gold-standard correction"] },
  { icon: ShieldCheck, title: "Legal AI Dataset & Benchmark Development", range: "$750–3,000+", text: "Human-curated evaluation datasets, gold-standard answers, scoring rubrics, benchmark design, annotation protocols, and QA workflows.", outputs: ["Benchmark set", "Gold answers", "Annotation guide", "QA protocol"] },
  { icon: Globe2, title: "Indonesia & ASEAN Legal Intelligence", range: "$500–2,500+", text: "Research and analytical support for organizations navigating Indonesian, ASEAN, and comparative-law questions.", outputs: ["Jurisdiction brief", "Comparative map", "Regulatory intelligence", "Executive synthesis"] },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#FAFAF8] text-[#0D1B2A]">
      <section className="bg-[#0D1B2A] text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <p className="text-xs font-black uppercase tracking-[.22em] text-[#C9A24B]">LexNusa Services</p>
          <h1 className="mt-4 max-w-4xl font-academic text-5xl font-bold leading-tight sm:text-6xl">Legal intelligence built for professional decisions and AI workflows.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Start with a focused pilot. Each engagement is designed around traceability, human legal judgment, and a clearly defined deliverable.</p>
          <Link href="/lexnusa/pilot" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#C9A24B] px-5 py-3.5 font-black text-[#0D1B2A]">Request a Pilot <ArrowRight size={18}/></Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map(({icon: Icon, title, range, text, outputs}) => (
            <article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-start justify-between gap-5">
                <div className="rounded-xl bg-[#E7F3F2] p-3 text-[#0E6B6F]"><Icon size={24}/></div>
                <span className="rounded-full bg-[#FFF7E2] px-3 py-1.5 text-sm font-black text-[#A57E2D]">{range}</span>
              </div>
              <h2 className="mt-5 font-academic text-2xl font-bold">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">{outputs.map(item => <div key={item} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">{item}</div>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#EEF4F3]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div><p className="text-xs font-black uppercase tracking-[.22em] text-[#0E6B6F]">Engagement Model</p><h2 className="mt-3 font-academic text-4xl font-bold">Pilot first. Evidence before scale.</h2><p className="mt-5 max-w-2xl leading-7 text-slate-600">A paid pilot lets both sides validate scope, source quality, review depth, turnaround, and communication before expanding into a larger benchmark, research program, or recurring workflow.</p></div>
            <div className="rounded-3xl bg-[#0D1B2A] p-7 text-white"><p className="text-sm font-bold text-[#E2C77E]">Typical flow</p><p className="mt-4 text-lg leading-8 text-slate-200">Scope → Pilot → Human Review → Deliverable → Client Feedback → Scale</p><Link href="/lexnusa/pilot" className="mt-6 inline-flex items-center gap-2 font-black text-[#69C2C1]">Start a scoped pilot <ArrowRight size={17}/></Link></div>
          </div>
        </div>
      </section>
    </div>
  );
}
