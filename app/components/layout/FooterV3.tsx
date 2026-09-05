"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Camera, GraduationCap, Mail, Users, Video } from "lucide-react";
import Container from "../shared/Container";

const digitalSystems = [
  { name: "AI & Digital Systems Lab", href: "/ai-lab" },
  { name: "LEX-EVAL™ Benchmark", href: "/lexnusa/lex-eval" },
  { name: "LexNusa Legal AI", href: "/lexnusa" },
  { name: "SIMAKS", href: "/simak" },
  { name: "Raja Ali Haji Learning Platform", href: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji" },
];

const institutions = [
  { name: "Raja Ali Haji Institute", href: "/raja-ali-haji" },
  { name: "JMCS Journal", href: "/journal" },
  { name: "Hukum Preneur", href: "/hukumpreneur" },
  { name: "Constitutional Justice", href: "/constitutional-justice" },
  { name: "Hizbul Wathan Kepri", href: "/hw-kepri" },
];

const socialLinks = [
  { name: "Google Scholar", href: "https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=en", icon: GraduationCap },
  { name: "YouTube", href: "https://www.youtube.com/@hukumpreneur", icon: Video },
  { name: "Instagram", href: "https://www.instagram.com/hossibarani/", icon: Camera },
  { name: "Facebook", href: "https://www.facebook.com/hossibarani/", icon: Users },
];

export default function FooterV3() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <footer className="border-t-4 border-amber-400 bg-slate-950 text-slate-300">
      <Container>
        <div className="flex flex-col gap-7 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <Link href="/ai-lab" className="font-academic text-2xl font-bold tracking-tight text-white transition hover:text-amber-300 sm:text-3xl">
              Hossibarani Digital Ecosystem
            </Link>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-400">
              Evidence-led systems for research, law, education, and responsible AI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <Mail size={18} aria-hidden="true" />
              Collaborate
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>

            <div className="flex gap-2" aria-label="Official social media">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} — opens in a new tab`} title={name} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 text-slate-300 transition hover:border-amber-400 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <nav aria-label="Hossibarani ecosystem" className="grid gap-8 border-t border-slate-800 py-9 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Digital Systems</h2>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {digitalSystems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={active ? "page" : undefined} className={`text-sm leading-6 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${active ? "font-semibold text-amber-300" : "text-slate-400 hover:text-white"}`}>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">Institutions</h2>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {institutions.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm leading-6 text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="flex flex-col gap-2 border-t border-slate-800 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dr. Hos Arie Sibarani.</p>
          <p>Research • Law • Education • Responsible AI</p>
        </div>
      </Container>
    </footer>
  );
}
