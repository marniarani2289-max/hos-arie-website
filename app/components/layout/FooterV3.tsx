"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Camera,
  GraduationCap,
  Users,
  Mail,
  Video,
} from "lucide-react";
import Container from "../shared/Container";

const academicLinks = [
  { name: "Research", href: "/research" },
  { name: "Publications", href: "/publications" },
  { name: "Books", href: "/books" },
  { name: "Opinions", href: "/opinions" },
  { name: "Academic Gallery", href: "/gallery" },
];

const initiatives = [
  { name: "Raja Ali Haji Institute", href: "/raja-ali-haji" },
  { name: "JMCS Journal", href: "/journal" },
  { name: "Hukum Preneur", href: "/hukumpreneur" },
  { name: "Constitutional Justice", href: "/constitutional-justice" },
  { name: "Hizbul Wathan Kepri", href: "/hw-kepri" },
];

const digitalSystems = [
  { name: "AI & Digital Systems Lab", href: "/ai-lab" },
  { name: "LEX-EVAL™ Benchmark", href: "/lexnusa/lex-eval" },
  { name: "LexNusa Legal AI", href: "/lexnusa" },
  { name: "SIMAKS", href: "/simak" },
  {
    name: "Raja Ali Haji Learning Platform",
    href: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji",
  },
];

const socialLinks = [
  {
    name: "Google Scholar",
    href: "https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=en",
    icon: GraduationCap,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@hukumpreneur",
    icon: Video,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/hossibarani/",
    icon: Camera,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/hossibarani/",
    icon: Users,
  },
];

export default function FooterV3() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <Container>
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.15fr_0.65fr_1.35fr] lg:gap-14">
          <div>
            <Link
              href="/"
              className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
            >
              <span className="font-academic text-3xl font-bold tracking-tight text-white">
                Dr. Hos Arie Sibarani
              </span>
            </Link>

            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-amber-400">
              Constitutional Law Scholar
            </p>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-400">
              Constitutional scholarship, Malay intellectual thought, and
              responsible digital systems for research, law, and education.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Mail size={18} aria-hidden="true" />
              Collaborate
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>

            <div className="mt-7 flex flex-wrap gap-3" aria-label="Official social media">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} — opens in a new tab`}
                  title={name}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 text-slate-300 transition hover:border-amber-400 hover:bg-slate-900 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <Icon size={19} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-labelledby="footer-academic-heading">
            <h2
              id="footer-academic-heading"
              className="text-sm font-bold uppercase tracking-[0.2em] text-white"
            >
              Academic
            </h2>
            <ul className="mt-6 space-y-3.5">
              {academicLinks.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex items-center gap-2 text-sm leading-6 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                        active
                          ? "font-semibold text-amber-300"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {item.name}
                      {active && (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-amber-400"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <nav aria-labelledby="footer-ecosystem-heading">
            <h2
              id="footer-ecosystem-heading"
              className="text-sm font-bold uppercase tracking-[0.2em] text-white"
            >
              Ecosystem
            </h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:gap-10">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-amber-400">
                  Digital Systems
                </h3>
                <ul className="mt-4 space-y-3">
                  {digitalSystems.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={`inline-flex items-center gap-1.5 text-sm leading-6 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                            active
                              ? "font-semibold text-amber-300"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {item.name}
                          <ArrowUpRight
                            size={13}
                            className={active ? "text-amber-400" : "text-slate-600"}
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                  Institutions
                </h3>
                <ul className="mt-4 space-y-3">
                  {initiatives.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 text-sm leading-6 text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      >
                        {item.name}
                        <ArrowUpRight size={13} className="text-slate-600" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-800 py-7 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Dr. Hos Arie Sibarani. All rights
            reserved.
          </p>
          <p className="md:text-right">
            Constitutional Law • Malay Thought • Responsible Digital Systems
          </p>
        </div>
      </Container>
    </footer>
  );
}
