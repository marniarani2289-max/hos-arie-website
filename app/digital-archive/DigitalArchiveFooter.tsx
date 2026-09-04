import Link from "next/link";
import { Archive, ArrowUpRight, BookOpen, FileSearch, Mail, ScrollText } from "lucide-react";

const collectionLinks = [
  ["Raja Ali Haji manuscripts", "/digital-archive"],
  ["Malay Ethical Constitutionalism", "/research/malay-ethical-constitutionalism"],
  ["Public scholarship", "/opinions"],
  ["Legal research", "/research"],
] as const;

const ecosystemLinks = [
  ["Raja Ali Haji Institute", "/raja-ali-haji"],
  ["Research programmes", "/research"],
  ["Publications", "/publications"],
  ["Academic homepage", "/"],
] as const;

export default function DigitalArchiveFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-amber-300/15 bg-[#080b13] text-slate-300">
      <div className="pointer-events-none absolute -bottom-48 -left-40 h-96 w-96 rounded-full border border-amber-300/10" />
      <div className="pointer-events-none absolute -right-32 -top-56 h-[28rem] w-[28rem] rounded-full border border-sky-400/10" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.25fr_.7fr_.7fr] lg:gap-16 lg:py-20">
          <div>
            <Link href="/digital-archive" aria-label="Digital Archive home" className="inline-flex items-center gap-4">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10 text-amber-300">
                <Archive size={38} strokeWidth={1.6} />
              </span>
              <span>
                <span className="block font-academic text-3xl font-bold leading-tight text-white">Digital Archive</span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Knowledge · Heritage · Research</span>
              </span>
            </Link>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
              A curated digital home for manuscripts, research notes, public scholarship, and intellectual projects on law, governance, and Malay civilisation.
            </p>

            <div className="mt-7 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.13em] text-slate-200">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2"><FileSearch size={14} className="text-amber-300" /> Curated</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2"><ScrollText size={14} className="text-amber-300" /> Attributed</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2"><BookOpen size={14} className="text-amber-300" /> Accessible</span>
            </div>
          </div>

          <div>
            <h2 className="font-academic text-lg font-bold text-white">Explore Collections</h2>
            <nav aria-label="Digital Archive collections" className="mt-6 space-y-4 text-sm">
              {collectionLinks.map(([label, href]) => (
                <Link key={href} href={href} className="group flex items-start gap-2 leading-6 transition hover:text-amber-300">
                  <span>{label}</span>
                  <ArrowUpRight size={14} className="mt-1 shrink-0 opacity-40 transition group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="font-academic text-lg font-bold text-white">Research Ecosystem</h2>
            <nav aria-label="Research ecosystem links" className="mt-6 space-y-4 text-sm">
              {ecosystemLinks.map(([label, href]) => (
                <Link key={href} href={href} className="group flex items-start gap-2 leading-6 transition hover:text-amber-300">
                  <span>{label}</span>
                  <ArrowUpRight size={14} className="mt-1 shrink-0 opacity-40 transition group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-300">
              <Mail size={16} /> Propose a contribution
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 py-7 text-sm leading-7 text-slate-500">
          <p>Copyright, attribution, and access conditions follow the rights information attached to each collection item.</p>
        </div>

        <div className="grid gap-4 border-t border-white/10 py-8 text-xs leading-6 text-slate-600 md:grid-cols-[1fr_auto] md:items-center">
          <p>© {new Date().getFullYear()} Digital Archive · Dr. Hos Arie Sibarani.</p>
          <p className="md:text-right">Preserving knowledge · Expanding responsible access</p>
        </div>
      </div>
    </footer>
  );
}
