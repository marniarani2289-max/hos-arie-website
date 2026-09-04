import Link from "next/link";
import { ArrowUpRight, BookOpen, Gavel, Mail, Scale, Users } from "lucide-react";

const initiativeLinks = [
  ["Constitutional work", "/constitutional-justice#constitutional-work"],
  ["Professional principles", "/constitutional-justice#principles"],
  ["Research", "/research"],
  ["Publications", "/publications"],
] as const;

const engagementLinks = [
  ["Academic collaboration", "/contact"],
  ["Raja Ali Haji Institute", "/raja-ali-haji"],
  ["Dr. Hos Arie Sibarani", "/about"],
  ["Academic homepage", "/"],
] as const;

export default function ConstitutionalJusticeFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-rose-800/30 bg-[#070b15] text-slate-300">
      <div className="pointer-events-none absolute -bottom-56 -left-44 h-96 w-96 rounded-full border border-amber-300/10" />
      <div className="pointer-events-none absolute -right-40 -top-52 h-[28rem] w-[28rem] rounded-full border border-rose-800/20" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.25fr_.7fr_.7fr] lg:gap-16 lg:py-20">
          <div>
            <Link href="/constitutional-justice" aria-label="Constitutional Justice Initiative home" className="inline-flex items-center gap-4">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-amber-300/25 bg-rose-950 text-amber-300">
                <Scale size={38} strokeWidth={1.6} />
              </span>
              <span>
                <span className="block font-academic text-2xl font-bold leading-tight text-white sm:text-3xl">Constitutional Justice</span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-[0.3em] text-amber-300">Initiative</span>
              </span>
            </Link>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
              An independent platform connecting constitutional scholarship, responsible advocacy, legal analysis, and public education in Indonesia.
            </p>

            <div className="mt-7 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.13em] text-slate-200">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2"><BookOpen size={14} className="text-amber-300" /> Scholarship</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2"><Gavel size={14} className="text-amber-300" /> Advocacy</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2"><Users size={14} className="text-amber-300" /> Public Service</span>
            </div>
          </div>

          <div>
            <h2 className="font-academic text-lg font-bold text-white">Explore the Initiative</h2>
            <nav aria-label="Constitutional Justice Initiative navigation" className="mt-6 space-y-4 text-sm">
              {initiativeLinks.map(([label, href]) => (
                <Link key={href} href={href} className="group flex items-start gap-2 leading-6 transition hover:text-amber-300">
                  <span>{label}</span>
                  <ArrowUpRight size={14} className="mt-1 shrink-0 opacity-40 transition group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="font-academic text-lg font-bold text-white">Engage</h2>
            <nav aria-label="Collaboration and profile links" className="mt-6 space-y-4 text-sm">
              {engagementLinks.map(([label, href]) => (
                <Link key={href} href={href} className="group flex items-start gap-2 leading-6 transition hover:text-amber-300">
                  <span>{label}</span>
                  <ArrowUpRight size={14} className="mt-1 shrink-0 opacity-40 transition group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
            <a href="mailto:riesib8@gmail.com" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-rose-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-rose-800">
              <Mail size={16} /> Start a conversation
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 py-7 text-sm leading-7 text-slate-500">
          <p>Information on this platform supports education and public understanding. It does not constitute legal advice for a particular matter.</p>
        </div>

        <div className="grid gap-4 border-t border-white/10 py-8 text-xs leading-6 text-slate-600 md:grid-cols-[1fr_auto] md:items-center">
          <p>© {new Date().getFullYear()} Constitutional Justice Initiative. All rights reserved.</p>
          <p className="md:text-right">Founded by Dr. Hos Arie Sibarani · Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
