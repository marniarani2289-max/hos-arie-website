import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CircleHelp,
  FileText,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

const appUrl = "https://simaks.hossibarani.com";

function SimaksInstitutionalFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_.8fr_.8fr]">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 font-black text-white">
                S
              </div>
              <div>
                <p className="text-xl font-black text-white">SIMAKS</p>
                <p className="mt-1 text-sm text-slate-400">
                  Sistem Monitoring Akreditasi Sekolah
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400">
              Platform digital untuk membantu sekolah, tim akreditasi, pengawas,
              dan dinas pendidikan memantau kesiapan, bukti, verifikasi, serta
              tindak lanjut peningkatan mutu secara lebih terstruktur.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`${appUrl}/register`}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Daftar SIMAKS <ArrowUpRight size={16} />
              </a>
              <a
                href={`${appUrl}/login`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-bold text-white transition hover:border-sky-400 hover:bg-slate-900"
              >
                Masuk Aplikasi <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <nav aria-labelledby="simaks-footer-institution">
            <h2
              id="simaks-footer-institution"
              className="text-xs font-black uppercase tracking-[.2em] text-sky-300"
            >
              SIMAKS
            </h2>
            <div className="mt-5 space-y-3.5 text-sm">
              <Link className="flex items-center gap-2 hover:text-white" href="/simak">
                <Building2 size={16} /> Halaman Resmi
              </Link>
              <a className="flex items-center gap-2 hover:text-white" href={`${appUrl}/register`}>
                <ArrowUpRight size={16} /> Pendaftaran
              </a>
              <a className="flex items-center gap-2 hover:text-white" href={`${appUrl}/login`}>
                <ArrowUpRight size={16} /> Login
              </a>
              <a className="flex items-center gap-2 hover:text-white" href={`${appUrl}/help`}>
                <CircleHelp size={16} /> Pusat Bantuan
              </a>
            </div>
          </nav>

          <nav aria-labelledby="simaks-footer-governance">
            <h2
              id="simaks-footer-governance"
              className="text-xs font-black uppercase tracking-[.2em] text-emerald-300"
            >
              Tata Kelola
            </h2>
            <div className="mt-5 space-y-3.5 text-sm">
              <a className="flex items-center gap-2 hover:text-white" href={`${appUrl}/security`}>
                <ShieldCheck size={16} /> Keamanan
              </a>
              <a className="flex items-center gap-2 hover:text-white" href={`${appUrl}/privacy`}>
                <LockKeyhole size={16} /> Privasi
              </a>
              <a className="flex items-center gap-2 hover:text-white" href={`${appUrl}/terms`}>
                <FileText size={16} /> Ketentuan Layanan
              </a>
              <Link className="flex items-center gap-2 hover:text-white" href="/">
                <ArrowUpRight size={16} /> Hossibarani Digital Ecosystem
              </Link>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-7 text-xs leading-6 text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} SIMAKS. Sistem Monitoring Akreditasi Sekolah.</p>
          <p className="max-w-2xl md:text-right">
            Bagian dari Hossibarani Digital Ecosystem · Teknologi untuk monitoring,
            akuntabilitas, dan peningkatan mutu pendidikan.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function SimakLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <SimaksInstitutionalFooter />
    </>
  );
}
