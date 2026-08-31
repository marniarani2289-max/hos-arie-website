import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BrainCircuit, CheckCircle2, FileSearch, Globe2, Scale, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "LexNusa Legal AI | Legal Intelligence & AI Evaluation",
  description: "LexNusa Legal AI combines human legal judgment, structured analytical reasoning, and AI-ready intelligence for LegalTech teams, AI companies, researchers, law firms, and international organizations.",
  alternates: { canonical: "/lexnusa" },
  openGraph: {
    title: "LexNusa Legal AI",
    description: "Human Legal Judgment. AI-Ready Intelligence.",
    url: "https://www.hossibarani.com/lexnusa",
    type: "website",
  },
};

const services = [
  { icon: FileSearch, title: "Legal Research Intelligence", text: "Human-led legal and comparative research transformed into concise memoranda, authority maps, and decision-ready intelligence." },
  { icon: Scale, title: "Case Law & Doctrine Mapping", text: "Structured mapping of judicial decisions, legal tests, doctrinal patterns, and comparative developments across jurisdictions." },
  { icon: BrainCircuit, title: "Legal AI Output Evaluation", text: "Human verification of AI-generated legal answers for accuracy, reasoning, citations, jurisdiction, hallucination risk, and usefulness." },
  { icon: ShieldCheck, title: "Legal AI Dataset & Benchmark Development", text: "Evaluation datasets, gold-standard answers, error taxonomies, scoring rubrics, benchmark design, and quality-assurance workflows." },
  { icon: Globe2, title: "Indonesia & ASEAN Legal Intelligence", text: "Research and analytical support for organizations navigating Indonesia, ASEAN, and comparative-law questions." },
];

const dimensions = [
  ["Legal Accuracy", "25"], ["Authority & Citation Integrity", "15"], ["Issue Identification", "10"],
  ["Legal Reasoning", "20"], ["Jurisdictional Alignment", "10"], ["Hallucination & Fabrication Control", "10"],
  ["Professional Usefulness", "10"],
];

const work = [
  { eyebrow: "FLAGSHIP METHODOLOGY", title: "LEX-EVAL™ v1.0", text: "A 100-point human-led framework combining seven evaluation dimensions, error taxonomy, severity levels, and Critical Legal Failure rules." },
  { eyebrow: "BENCHMARK", title: "LEX-EVAL™ Benchmark v1.1", text: "An empirical benchmark architecture for comparing real Legal-AI outputs under controlled prompts, tool conditions, and human scoring." },
  { eyebrow: "RESEARCH", title: "Comparative Legal Intelligence", text: "Case-law, doctrine, and regulatory mapping designed for professional research, AI training, and structured legal data workflows." },
];

export default function LexNusaPage() {
  return (
    <div className="bg-[#FAFAF8] text-[#0D1B2A]">
      <section className="relative overflow-hidden bg-[#0D1B2A] text-white">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_75%_25%,#0E6B6F_0,transparent_35%),radial-gradient(circle_at_90%_80%,#C9A24B_0,transparent_20%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:px-10 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9A24B]/50 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#E2C77E]">
              <Sparkles size={15} /> Boutique Legal Intelligence & AI Evaluation
            </div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#C9A24B]">LexNusa Legal AI</p>
            <h1 className="max-w-4xl font-academic text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">Human Legal Judgment.<br/><span className="text-[#69C2C1]">AI-Ready Intelligence.</span></h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">We help AI companies, LegalTech teams, law firms, researchers, and international organizations transform complex legal information into reliable research, structured datasets, and human-verified AI outputs.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#services" className="inline-flex items-center gap-2 rounded-xl bg-[#C9A24B] px-5 py-3.5 font-bold text-[#0D1B2A] transition hover:bg-[#E2C77E]">Explore Services <ArrowRight size={18}/></a>
              <Link href="/contact?subject=LexNusa%20Pilot%20Project" className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3.5 font-bold text-white transition hover:bg-white/10">Request a Pilot</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
              {["Reliable", "Structured", "Verifiable", "AI-Ready"].map((x) => <span key={x} className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-[#69C2C1]"/>{x}</span>)}
            </div>
          </div>
          <div className="self-end rounded-3xl border border-white/15 bg-white/[0.06] p-6 shadow-2xl backdrop-blur sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C9A24B]">Regional Expertise</p>
            <h2 className="mt-3 font-academic text-3xl font-bold">Indonesia & ASEAN</h2>
            <p className="mt-4 leading-7 text-slate-300">Legal reasoning, comparative research, structured analysis, and AI evaluation built for regional questions and international Legal-AI workflows.</p>
            <div className="mt-7 grid grid-cols-2 gap-3 text-sm">
              {["Legal Research", "AI Evaluation", "Case Mapping", "Benchmarking"].map((x)=><div key={x} className="rounded-xl border border-white/10 bg-[#07121F] px-4 py-3 font-semibold">{x}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-9 sm:grid-cols-3 sm:px-8 lg:px-10">
          {[['LEGAL EXCELLENCE','Human judgment remains the final quality gate.'],['INTELLIGENT SYSTEMS','Structured methods designed for AI workflows.'],['HUMAN JUDGMENT','Context, authority, reasoning, and professional responsibility.']].map(([a,b])=><div key={a}><p className="text-xs font-black tracking-[0.2em] text-[#0E6B6F]">{a}</p><p className="mt-2 text-sm leading-6 text-slate-600">{b}</p></div>)}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6B6F]">What We Do</p>
        <h2 className="mt-3 max-w-3xl font-academic text-4xl font-bold tracking-tight sm:text-5xl">Legal intelligence built for an AI-enabled world.</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">LexNusa sits between substantive legal reasoning and modern AI/data workflows—where legal quality must remain auditable, structured, and professionally useful.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({icon:Icon,title,text})=><article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="mb-5 inline-flex rounded-xl bg-[#E7F3F2] p-3 text-[#0E6B6F]"><Icon size={23}/></div><h3 className="font-academic text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}
        </div>
      </section>

      <section id="lex-eval" className="bg-[#EEF4F3]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6B6F]">Proprietary Evaluation Methodology</p>
            <h2 className="mt-3 font-academic text-5xl font-bold">LEX-EVAL™</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">A human-led Legal AI Evaluation Framework designed to distinguish polished language from actual legal reliability.</p>
            <div className="mt-7 rounded-2xl border-l-4 border-[#C9A24B] bg-white p-6 font-academic text-xl font-bold italic shadow-sm">“High linguistic quality is not evidence of legal reliability.”</div>
            <p className="mt-7 leading-7 text-slate-600">LEX-EVAL™ combines a 100-point quality score with error taxonomy, severity classification, and a Critical Legal Failure override. A high aggregate score cannot neutralize a fabricated authority, materially wrong law, wrong jurisdiction, obsolete authority, material fact distortion, or unsafe professional reliance.</p>
          </div>
          <div className="rounded-3xl bg-[#0D1B2A] p-6 text-white shadow-xl sm:p-8">
            <div className="flex items-end justify-between border-b border-white/15 pb-5"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A24B]">LEX-EVAL™ v1.0</p><h3 className="mt-1 text-2xl font-bold">100-Point Architecture</h3></div><div className="text-4xl font-black text-[#69C2C1]">100</div></div>
            <div className="mt-4 space-y-2">{dimensions.map(([name,weight])=><div key={name} className="flex items-center justify-between gap-5 rounded-xl bg-white/[0.06] px-4 py-3"><span className="text-sm text-slate-200">{name}</span><span className="font-black text-[#E2C77E]">{weight}</span></div>)}</div>
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0E6B6F]">Featured Work</p>
        <h2 className="mt-3 font-academic text-4xl font-bold sm:text-5xl">From methodology to measurable evidence.</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">{work.map((x)=><article key={x.title} className="rounded-2xl border border-slate-200 bg-white p-7"><p className="text-[11px] font-black tracking-[0.18em] text-[#C09435]">{x.eyebrow}</p><h3 className="mt-3 font-academic text-2xl font-bold">{x.title}</h3><p className="mt-4 leading-7 text-slate-600">{x.text}</p></article>)}</div>
      </section>

      <section className="bg-[#0E6B6F] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
          <div><p className="text-xs font-black uppercase tracking-[0.22em] text-[#F2D994]">Work With LexNusa</p><h2 className="mt-3 max-w-3xl font-academic text-4xl font-bold">Start with a focused pilot project.</h2><p className="mt-4 max-w-3xl text-lg leading-8 text-teal-50">Legal-AI evaluation, research intelligence, case-law mapping, benchmark design, or Indonesia & ASEAN legal research.</p></div>
          <Link href="/contact?subject=LexNusa%20Pilot%20Project" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9A24B] px-6 py-4 font-black text-[#0D1B2A] hover:bg-[#E2C77E]">Request a Pilot <ArrowRight size={18}/></Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 text-sm leading-6 text-slate-500 sm:px-8 lg:px-10">
        <p><strong className="text-slate-700">Scope note.</strong> LexNusa provides legal research, analytical, Legal-AI evaluation, dataset, and benchmark support. International work outside applicable professional licensing is undertaken as research and analytical support and does not constitute jurisdiction-specific legal representation.</p>
        <p className="mt-3">LEX-EVAL™ is a claimed methodology and brand identifier of LexNusa Legal AI; the ™ symbol does not represent registered-trademark status.</p>
      </section>
    </div>
  );
}
