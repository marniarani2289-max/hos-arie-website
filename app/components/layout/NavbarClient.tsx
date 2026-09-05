"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

type Participant = { name: string; email: string } | null;
const groups = [
  { label: "Scholarship", helper: "Riset & publikasi", items: [["Research", "/research"], ["Publications", "/publications"], ["Books", "/books"], ["Opinions", "/opinions"], ["JMCS", "/journal"]] },
  { label: "Ecosystem", helper: "Sistem, lembaga & arsip", items: [["AI & Digital Systems Lab", "/ai-lab"], ["LexNusa Legal AI", "/lexnusa"], ["SIMAKS", "/simak"], ["Raja Ali Haji Institute", "/raja-ali-haji"], ["Hukum Preneur", "/hukumpreneur"], ["Constitutional Justice", "/constitutional-justice"], ["Hizbul Wathan Kepri", "/hw-kepri"], ["Digital Archive", "/digital-archive"], ["Gallery", "/gallery"]] },
] as const;

export default function NavbarClient({ participant }: { participant: Participant }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const isIndonesian = pathname === "/id" || pathname.startsWith("/id/");
  const basePath = isIndonesian ? pathname.replace(/^\/id/, "") || "/" : pathname;
  const bilingualPaths = ["/", "/about", "/research", "/publications", "/contact"];
  const languagePath = bilingualPaths.includes(basePath) ? basePath : "/";
  const localize = (href: string) => isIndonesian && bilingualPaths.includes(href) ? `/id${href === "/" ? "" : href}` : href;

  if (
    pathname.startsWith("/lexnusa") ||
    pathname.startsWith("/hukumpreneur") ||
    pathname.startsWith("/ai-lab")
  ) return null;

  return <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
    <nav className="mx-auto flex min-h-16 max-w-[96rem] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
      <Link href="/" className="shrink-0" onClick={close}><p className="font-academic text-lg font-bold tracking-tight text-slate-950 sm:text-xl">Dr. Hos Arie Sibarani</p><p className="mt-0.5 hidden text-[8px] uppercase tracking-[0.18em] text-amber-700 sm:block">Constitutional Law • Malay Thought • Digital Systems</p></Link>
      <div className="hidden items-center gap-1.5 lg:flex">
        <Link href={isIndonesian ? "/id" : "/start"} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800">{isIndonesian ? "Mulai" : "Start Here"}</Link>
        {groups.map((group) => <div key={group.label} className="group relative"><button type="button" aria-haspopup="menu" className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">{group.label}<ChevronDown size={15} /></button><div className="invisible absolute right-0 top-full z-50 w-64 translate-y-1 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100" role="menu"><p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700">{group.helper}</p>{group.items.map(([label, href]) => <Link key={href} href={localize(href)} role="menuitem" className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-800">{label}</Link>)}</div></div>)}
        <Link href={localize("/about")} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">{isIndonesian ? "Tentang" : "About"}</Link>
        <div className="flex items-center rounded-lg border border-slate-200 p-1 text-xs font-bold" aria-label="Pilih bahasa">
          <Link href={`/id${languagePath === "/" ? "" : languagePath}`} className={`rounded px-2 py-1 ${isIndonesian ? "bg-slate-950 text-white" : "text-slate-500 hover:text-slate-950"}`}>ID</Link>
          <span className="px-0.5 text-slate-300">/</span>
          <Link href={languagePath} className={`rounded px-2 py-1 ${!isIndonesian ? "bg-slate-950 text-white" : "text-slate-500 hover:text-slate-950"}`}>EN</Link>
        </div>
        <Link href={participant ? "/dashboard" : "/login"} className={`ml-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white ${participant ? "bg-emerald-700 hover:bg-emerald-800" : "bg-slate-950 hover:bg-amber-700"}`}>{participant ? "Dashboard" : "Login"}</Link>
      </div>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 lg:hidden">{open ? <X size={21} /> : <Menu size={21} />}</button>
    </nav>
    <div id="mobile-navigation" className={`${open ? "block" : "hidden"} border-t border-slate-200 bg-white lg:hidden`}><div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6"><div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2"><span className="text-sm font-semibold text-slate-600">Bahasa</span><div className="flex items-center gap-2 text-sm font-bold"><Link href={`/id${languagePath === "/" ? "" : languagePath}`} onClick={close} className={isIndonesian ? "text-amber-700" : "text-slate-500"}>ID</Link><span className="text-slate-300">/</span><Link href={languagePath} onClick={close} className={!isIndonesian ? "text-amber-700" : "text-slate-500"}>EN</Link></div></div><Link href={isIndonesian ? "/id" : "/start"} onClick={close} className="block rounded-lg bg-amber-50 px-3 py-3 font-semibold text-amber-900">{isIndonesian ? "Mulai di sini" : "Start Here"}</Link>{groups.map((group) => <details key={group.label} className="rounded-lg border border-slate-200"><summary className="cursor-pointer px-3 py-3 font-semibold text-slate-800">{group.label} · {group.helper}</summary><div className="border-t border-slate-100 p-2">{group.items.map(([label, href]) => <Link key={href} href={localize(href)} onClick={close} className="block rounded-md px-3 py-2.5 text-sm text-slate-700 hover:bg-amber-50">{label}</Link>)}</div></details>)}<div className="grid grid-cols-2 gap-2"><Link href={localize("/about")} onClick={close} className="rounded-lg border border-slate-300 px-3 py-3 text-center font-semibold">{isIndonesian ? "Tentang" : "About"}</Link><Link href={participant ? "/dashboard" : "/login"} onClick={close} className="rounded-lg bg-slate-950 px-3 py-3 text-center font-semibold text-white">{participant ? "Dashboard" : "Login Peserta"}</Link></div></div></div>
  </header>;
}
