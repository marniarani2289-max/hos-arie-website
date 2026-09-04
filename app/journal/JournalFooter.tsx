import Link from "next/link";
import { ArrowUpRight, BookOpen, FileCheck2, Mail, Send } from "lucide-react";

const journalLinks = [
  ["Official JMCS website", "https://journal.hossibarani.com/jmcs"],
  ["Current issue", "https://journal.hossibarani.com/jmcs/issue/current"],
  ["Journal archives", "https://journal.hossibarani.com/jmcs/issue/archive"],
  ["Editorial team", "https://journal.hossibarani.com/jmcs/about/editorialTeam"],
] as const;

const authorLinks = [
  ["About the journal", "https://journal.hossibarani.com/jmcs/about"],
  ["Author guidelines", "https://journal.hossibarani.com/jmcs/about/submissions"],
  ["Submit a manuscript", "https://journal.hossibarani.com/jmcs/about/submissions"],
] as const;

export default function JournalFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-amber-300/20 bg-[#071426] text-slate-300">
      <div className="pointer-events-none absolute -right-40 -top-52 h-[28rem] w-[28rem] rounded-full border border-amber-300/10" />
      <div className="pointer-events-none absolute -right-20 -top-32 h-72 w-72 rounded-full border border-amber-300/10" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.3fr_.7fr_.7fr] lg:gap-16 lg:py-20">
          <div>
            <Link href="/journal" aria-label="Journal of Malay Constitutional Studies home" className="inline-flex items-stretch gap-4">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center border border-amber-300/30 bg-amber-300 text-2xl font-black tracking-tight text-[#071426]">JMCS</span>
              <span className="border-l border-white/15 pl-4">
                <span className="block font-serif text-2xl font-bold leading-tight text-white">Journal of Malay</span>
                <span className="mt-1 block font-serif text-xl italic text-amber-300">Constitutional Studies</span>
              </span>
            </Link>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
              An international peer-reviewed journal advancing Malay constitutionalism, public law, governance, legal history, and ethical constitutional thought.
            </p>

            <div className="mt-7 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-200">
              <span className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-3 py-2"><BookOpen size={14} className="text-amber-300" /> Open Access</span>
              <span className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-3 py-2"><FileCheck2 size={14} className="text-amber-300" /> Double-Blind Review</span>
              <span className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-3 py-2"><FileCheck2 size={14} className="text-amber-300" /> CC BY 4.0</span>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-lg font-bold text-white">Explore JMCS</h2>
            <nav aria-label="JMCS journal navigation" className="mt-6 space-y-4 text-sm">
              {journalLinks.map(([label, href]) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-2 leading-6 transition hover:text-amber-300">
                  <span>{label}</span>
                  <ArrowUpRight size={14} className="mt-1 shrink-0 opacity-40 transition group-hover:opacity-100" />
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="font-serif text-lg font-bold text-white">For Authors</h2>
            <nav aria-label="JMCS author resources" className="mt-6 space-y-4 text-sm">
              {authorLinks.map(([label, href], index) => (
                <a key={`${href}-${index}`} href={href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-2 leading-6 transition hover:text-amber-300">
                  <span>{label}</span>
                  <ArrowUpRight size={14} className="mt-1 shrink-0 opacity-40 transition group-hover:opacity-100" />
                </a>
              ))}
            </nav>

            <a href="https://journal.hossibarani.com/jmcs/about/submissions" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 bg-amber-300 px-4 py-3 text-sm font-black text-[#071426] transition hover:bg-amber-200">
              <Send size={16} /> Submit manuscript
            </a>
          </div>
        </div>

        <div className="grid gap-4 border-t border-white/10 py-8 text-xs leading-6 text-slate-500 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p>© {new Date().getFullYear()} Journal of Malay Constitutional Studies.</p>
            <p>Published by Raja Ali Haji Research Network · Indonesia</p>
          </div>
          <a href="mailto:editor@hossibarani.com" className="inline-flex items-center gap-2 transition hover:text-amber-300 md:justify-self-end">
            <Mail size={15} /> editor@hossibarani.com
          </a>
        </div>
      </div>
    </footer>
  );
}
