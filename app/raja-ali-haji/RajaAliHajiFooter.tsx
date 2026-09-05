"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, BookOpen, LogIn, Mail } from "lucide-react";

const instituteLinks = [
  ["Beranda Institute", "/raja-ali-haji"],
  ["Pilot Cohort 1", "/raja-ali-haji/pilot-cohort"],
  ["Program Pembelajaran", "/raja-ali-haji/programmes/pemikiran-raja-ali-haji"],
  ["Arsip Digital", "/digital-archive"],
  ["Journal of Malay Constitutional Studies", "/journal"],
] as const;

const participationLinks = [
  ["Daftar sebagai peserta", "/register?cohort=RAHI-PILOT-01"],
  ["Masuk peserta", "/login"],
  ["Kontak dan kolaborasi", "/contact"],
  ["Website Dr. Hos Arie Sibarani", "/"],
] as const;

export default function RajaAliHajiFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/raja-ali-haji/admin")) return null;

  return (
    <footer className="relative overflow-hidden border-t border-amber-300/15 bg-[#080d18] text-slate-300">
      <div className="pointer-events-none absolute -bottom-52 -left-44 h-96 w-96 rounded-full border border-amber-400/10" />
      <div className="pointer-events-none absolute -right-28 -top-52 h-96 w-96 rounded-full border border-amber-400/10" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.3fr_.7fr_.7fr] lg:gap-16 lg:py-20">
          <div>
            <Link href="/raja-ali-haji" aria-label="Beranda Raja Ali Haji Institute" className="inline-flex items-center gap-4">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-amber-300/20 bg-white/[0.04] p-2">
                <Image src="/raja-ali-haji-institute-logo.png" alt="Logo Raja Ali Haji Institute" width={80} height={80} className="h-full w-full object-contain" />
              </span>
              <span>
                <span className="block font-academic text-2xl font-bold text-white sm:text-3xl">Raja Ali Haji</span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Institute</span>
              </span>
            </Link>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
              Pusat pembelajaran terbuka, riset, dan pelestarian pengetahuan yang menghidupkan warisan intelektual Raja Ali Haji untuk masyarakat masa kini.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/raja-ali-haji/programmes/pemikiran-raja-ali-haji" className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-400">
                <BookOpen size={17} /> Mulai belajar
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white transition hover:border-amber-300/50 hover:text-amber-200">
                <LogIn size={17} /> Masuk peserta
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-academic text-lg font-bold text-white">Jelajahi Institute</h2>
            <nav aria-label="Navigasi footer Raja Ali Haji Institute" className="mt-6 space-y-4 text-sm">
              {instituteLinks.map(([label, href]) => (
                <Link key={href} href={href} className="group flex items-start gap-2 leading-6 transition hover:text-amber-300">
                  <span>{label}</span>
                  <ArrowUpRight size={14} className="mt-1 shrink-0 opacity-40 transition group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="font-academic text-lg font-bold text-white">Berpartisipasi</h2>
            <nav aria-label="Akses peserta dan kolaborasi" className="mt-6 space-y-4 text-sm">
              {participationLinks.map(([label, href]) => (
                <Link key={href} href={href} className="group flex items-start gap-2 leading-6 transition hover:text-amber-300">
                  <span>{label}</span>
                  <ArrowUpRight size={14} className="mt-1 shrink-0 opacity-40 transition group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
            <a href="mailto:riesib8@gmail.com" className="mt-7 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-amber-300">
              <Mail size={16} /> riesib8@gmail.com
            </a>
          </div>
        </div>

        <div className="grid gap-4 border-t border-white/10 py-8 text-xs leading-6 text-slate-500 md:grid-cols-[1fr_auto] md:items-center">
          <p>© {new Date().getFullYear()} Raja Ali Haji Institute. Seluruh hak dilindungi.</p>
          <p className="md:text-right">Didirikan oleh Dr. Hos Arie Sibarani · Bagian dari Raja Ali Haji Research Network</p>
        </div>
      </div>
    </footer>
  );
}
