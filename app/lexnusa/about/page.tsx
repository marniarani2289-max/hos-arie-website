import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "About LexNusa | LexNusa Legal AI" },
  description: "LexNusa is a boutique Legal Intelligence & AI Evaluation agency combining human legal judgment, structured analytical reasoning, and AI-ready data with Indonesia & ASEAN expertise.",
  alternates: { canonical: "/lexnusa/about" },
};

export default function AboutLexNusaPage() {
  return (
    <div className="bg-[#FAFAF8] text-[#0D1B2A]">
      <section className="bg-[#0D1B2A] text-white"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24"><p className="text-xs font-black uppercase tracking-[.22em] text-[#C9A24B]">About LexNusa</p><h1 className="mt-4 max-w-4xl font-academic text-5xl font-bold sm:text-6xl">Where legal reasoning meets artificial intelligence.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">LexNusa is a boutique Legal Intelligence & AI Evaluation agency built around a simple premise: AI can accelerate legal work, but professional reliability still requires human legal judgment.</p></div></section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-10">
        <div><p className="text-xs font-black uppercase tracking-[.22em] text-[#0E6B6F]">Our Position</p><h2 className="mt-3 font-academic text-4xl font-bold">A specialist bridge between law, AI, and structured intelligence.</h2><p className="mt-5 text-lg leading-8 text-slate-600">We support AI companies, LegalTech teams, law firms, researchers, and international organizations that need legal information transformed into reliable research, structured datasets, evaluation frameworks, benchmarks, and human-verified AI outputs.</p><p className="mt-5 text-lg leading-8 text-slate-600">Our regional expertise is centered on Indonesia and ASEAN, with comparative-law methods used when the problem requires cross-jurisdictional analysis.</p></div>
        <div className="rounded-3xl bg-[#EEF4F3] p-8"><p className="text-xs font-black uppercase tracking-[.2em] text-[#0E6B6F]">Brand Promise</p><div className="mt-6 grid gap-3">{["Reliable","Structured","Verifiable","AI-Ready"].map(item=><div key={item} className="flex items-center gap-3 rounded-xl bg-white px-4 py-4 font-black"><CheckCircle2 className="text-[#0E6B6F]" size={19}/>{item}</div>)}</div></div>
      </section>

      <section className="bg-white"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10"><p className="text-xs font-black uppercase tracking-[.22em] text-[#0E6B6F]">Three Brand Pillars</p><div className="mt-8 grid gap-5 md:grid-cols-3">{[["Legal Excellence","Rigorous substantive legal reasoning, source discipline, and professional integrity."],["Intelligent Systems","AI, structured data, evaluation design, and repeatable analytical workflows."],["Human Judgment","Context, ethics, legal interpretation, and professional review remain the final quality gate."]].map(([a,b])=><article key={a} className="rounded-2xl border border-slate-200 p-7"><h3 className="font-academic text-2xl font-bold">{a}</h3><p className="mt-4 leading-7 text-slate-600">{b}</p></article>)}</div></div></section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:px-10"><div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-slate-100"><Image src="/hos-arie.jpg" alt="Founder of LexNusa Legal AI" fill className="object-cover" sizes="(max-width:1024px) 384px, 360px"/></div><div><p className="text-xs font-black uppercase tracking-[.22em] text-[#0E6B6F]">Founder</p><h2 className="mt-3 font-academic text-4xl font-bold">Dr. Hos Arie Sibarani, S.H., M.H.</h2><p className="mt-2 text-lg font-bold text-[#C09435]">Founder & Legal AI Strategist</p><p className="mt-6 text-lg leading-8 text-slate-600">A legal researcher and academic working at the intersection of substantive legal reasoning, comparative law, structured analytical methods, and artificial intelligence. LexNusa translates that combination into practical legal-intelligence and Legal-AI evaluation work.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{["20+ years of legal teaching and research experience","Doctoral-level legal and constitutional research","Indonesia & ASEAN comparative perspective","Human-led Legal AI evaluation methodology"].map(x=><div key={x} className="rounded-xl border border-slate-200 p-4 text-sm font-semibold leading-6 text-slate-700">{x}</div>)}</div><Link href="/about" className="mt-7 inline-flex items-center gap-2 font-black text-[#0E6B6F]">View full academic profile <ArrowRight size={17}/></Link></div></section>

      <section className="bg-[#0E6B6F] text-white"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10"><div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-xs font-black uppercase tracking-[.22em] text-[#F2D994]">Work With LexNusa</p><h2 className="mt-3 font-academic text-4xl font-bold">Start with a focused problem worth solving well.</h2><p className="mt-4 max-w-2xl leading-7 text-teal-50">Use a paid pilot to test fit, review quality, scope, and workflow before committing to a larger engagement.</p></div><Link href="/lexnusa/pilot" className="inline-flex items-center gap-2 rounded-xl bg-[#C9A24B] px-5 py-3.5 font-black text-[#0D1B2A]">Request a Pilot <ArrowRight size={18}/></Link></div></div></section>
    </div>
  );
}
