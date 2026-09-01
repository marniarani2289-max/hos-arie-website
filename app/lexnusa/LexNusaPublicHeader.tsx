"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

function LexNusaMark() {
  return (
    <svg viewBox="0 0 92 72" aria-hidden="true" className="h-12 w-[62px] shrink-0 sm:h-14 sm:w-[72px]">
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

const navItems = [
  ["Home", "/lexnusa"],
  ["Services", "/lexnusa/services"],
  ["LEX-EVAL™", "/lexnusa/lex-eval"],
  ["Evidence", "/lexnusa/evidence"],
  ["About", "/lexnusa/about"],
] as const;

export default function LexNusaPublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (!pathname.startsWith("/lexnusa") || pathname.startsWith("/lexnusa/ops")) return null;

  const isActive = (href: string) => href === "/lexnusa" ? pathname === href : pathname.startsWith(href);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071421]/95 text-white shadow-[0_10px_30px_rgba(0,0,0,.18)] backdrop-blur">
      <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-8 lg:px-10">
        <Link href="/lexnusa" onClick={close} aria-label="LexNusa Legal AI home" className="group flex min-w-0 items-center gap-2.5">
          <LexNusaMark />
          <div className="hidden min-w-0 border-l border-[#C9A24B]/55 pl-3 xs:block sm:block">
            <div className="font-academic text-[21px] font-bold tracking-[.09em] leading-none sm:text-[25px]"><span className="text-white">LEX</span><span className="text-[#D3A94F]">NUSA</span></div>
            <div className="mt-1.5 whitespace-nowrap text-[8px] font-black uppercase tracking-[.32em] text-[#65B9BB] sm:text-[9px]">Legal AI Intelligence</div>
          </div>
        </Link>

        <nav aria-label="LexNusa navigation" className="hidden items-center gap-7 text-sm font-semibold text-slate-200 lg:flex">
          {navItems.map(([label, href]) => <Link key={href} href={href} className={isActive(href) ? "text-[#E0B85D] transition hover:text-white" : "transition hover:text-[#E0B85D]"}>{label}</Link>)}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/lexnusa/pilot" onClick={close} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#C9A24B] px-3 py-2.5 text-xs font-black text-[#071421] transition hover:bg-[#DCB961] sm:px-5 sm:py-3 sm:text-sm">
            <span className="hidden sm:inline">Request a Pilot</span><span className="sm:hidden">Pilot</span><ArrowRight size={16} />
          </Link>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close LexNusa navigation" : "Open LexNusa navigation"} aria-expanded={open} aria-controls="lexnusa-mobile-navigation" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[.04] lg:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div id="lexnusa-mobile-navigation" className={`${open ? "block" : "hidden"} border-t border-white/10 bg-[#071421] lg:hidden`}>
        <nav aria-label="LexNusa mobile navigation" className="mx-auto grid max-w-7xl gap-2 px-4 py-4 sm:px-8">
          {navItems.map(([label, href]) => <Link key={href} href={href} onClick={close} className={isActive(href) ? "rounded-xl bg-white/[.08] px-4 py-3 font-bold text-[#E0B85D]" : "rounded-xl px-4 py-3 font-semibold text-slate-200 hover:bg-white/[.05] hover:text-[#E0B85D]"}>{label}</Link>)}
        </nav>
      </div>
    </header>
  );
}
