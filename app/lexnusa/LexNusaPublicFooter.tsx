"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

function LexNusaMark() {
  return (
    <svg viewBox="0 0 92 72" aria-hidden="true" className="h-14 w-[72px] shrink-0">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 11h33M10 11v49h32" stroke="#C9A24B" strokeWidth="4" />
        <path d="M17 21h17M20 25h11M22 28v24M29 28v24M19 53h13" stroke="#C9A24B" strokeWidth="2.7" />
        <path d="M39 52V23l27 33V21" stroke="#0E8B91" strokeWidth="5" />
        <path d="M53 20l10-8 11 5 7-9M63 12l2 11 12 4M74 17l3 10" stroke="#0E8B91" strokeWidth="1.8" />
        <circle cx="53" cy="20" r="3.1" fill="#0E8B91" stroke="none" />
        <circle cx="63" cy="12" r="3.5" fill="#0E8B91" stroke="none" />
        <circle cx="74" cy="17" r="3.2" fill="#0E8B91" stroke="none" />
        <circle cx="81" cy="8" r="3.1" fill="#0E8B91" stroke="none" />
        <circle cx="65" cy="23" r="3" fill="#0E8B91" stroke="none" />
        <circle cx="77" cy="27" r="3.2" fill="#0E8B91" stroke="none" />
      </g>
    </svg>
  );
}

const footerRoutes = ["/lexnusa", "/lexnusa/services", "/lexnusa/lex-eval", "/lexnusa/evidence", "/lexnusa/about", "/lexnusa/lex-eval-sample"];

export default function LexNusaPublicFooter() {
  const pathname = usePathname();
  if (!footerRoutes.some(route => pathname === route || (route === "/lexnusa/lex-eval-sample" && pathname.startsWith(route)))) return null;

  return (
    <footer className="border-t border-white/10 bg-[#071421] text-slate-300">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.25fr_.75fr_.75fr]">
          <div>
            <Link href="/lexnusa" aria-label="LexNusa Legal AI home" className="inline-flex items-center gap-3">
              <LexNusaMark />
              <div className="border-l border-[#C9A24B]/55 pl-4"><div className="font-academic text-2xl font-bold tracking-[.09em] leading-none"><span className="text-white">LEX</span><span className="text-[#D3A94F]">NUSA</span></div><div className="mt-2 text-[9px] font-black uppercase tracking-[.32em] text-[#65B9BB]">Legal AI Intelligence</div></div>
            </Link>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">Boutique Legal Intelligence & AI Evaluation combining human legal judgment, structured analytical reasoning, and AI-ready data with regional expertise in Indonesia and ASEAN.</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[.14em] text-slate-300">{["Reliable","Structured","Verifiable","AI-Ready"].map(item => <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[.04] px-3 py-2"><CheckCircle2 size={13} className="text-[#65B9BB]" /> {item}</span>)}</div>
          </div>

          <div>
            <h3 className="font-academic text-lg font-bold text-white">Explore LexNusa</h3>
            <nav className="mt-5 space-y-3 text-sm" aria-label="LexNusa footer navigation">
              <Link href="/lexnusa/services" className="block transition hover:text-[#E0B85D]">Services</Link>
              <Link href="/lexnusa/lex-eval" className="block transition hover:text-[#E0B85D]">LEX-EVAL™</Link>
              <Link href="/lexnusa/evidence" className="block transition hover:text-[#E0B85D]">Evidence & Portfolio</Link>
              <Link href="/lexnusa/lex-eval-sample" className="block transition hover:text-[#E0B85D]">LEX-EVAL Sample</Link>
              <Link href="/lexnusa/about" className="block transition hover:text-[#E0B85D]">About LexNusa</Link>
            </nav>
          </div>

          <div>
            <h3 className="font-academic text-lg font-bold text-white">Start a Project</h3>
            <p className="mt-5 text-sm leading-6 text-slate-400">Begin with a focused paid pilot to validate scope, quality, and workflow before scaling.</p>
            <Link href="/lexnusa/pilot" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C9A24B] px-4 py-3 text-sm font-black text-[#071421] transition hover:bg-[#DCB961]">Request a Pilot <ArrowRight size={16} /></Link>
            <p className="mt-5 inline-flex items-center gap-2 text-xs text-slate-500"><Mail size={14} /> Secure server-side client intake</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-xs leading-5 text-slate-500 md:flex-row md:items-center md:justify-between"><p>© {new Date().getFullYear()} LexNusa Legal AI. All rights reserved.</p><p>Human Legal Judgment. AI-Ready Intelligence.</p><p>Research · Evaluation · Benchmarking · Indonesia & ASEAN</p></div>
      </div>
    </footer>
  );
}
