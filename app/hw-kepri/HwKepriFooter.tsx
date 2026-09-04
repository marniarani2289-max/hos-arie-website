import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Mail, MapPinned, Users } from "lucide-react";

const centreLinks = [
  ["Kabar & agenda", "/hw-kepri#informasi"],
  ["Pusat dokumen", "/hw-kepri#administrasi"],
  ["Jalur kaderisasi", "/hw-kepri#kaderisasi"],
  ["Daerah & qabilah", "/hw-kepri#konsolidasi"],
] as const;

const movementLinks = [
  ["Hizbul Wathan Indonesia", "https://hizbulwathan.or.id/"],
  ["Hubungi sekretariat", "/contact"],
  ["Kembali ke portal utama", "/"],
] as const;

const regions = ["Batam", "Tanjungpinang", "Bintan", "Karimun", "Lingga", "Natuna", "Kepulauan Anambas"];

export default function HwKepriFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-emerald-300/15 bg-[#04271e] text-emerald-50/80">
      <div className="pointer-events-none absolute -bottom-56 -left-44 h-96 w-96 rounded-full border border-amber-300/10" />
      <div className="pointer-events-none absolute -right-36 -top-52 h-96 w-96 rounded-full border border-emerald-300/10" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_.7fr_.7fr] lg:gap-16 lg:py-20">
          <div>
            <Link href="/hw-kepri" aria-label="Beranda Hizbul Wathan Kepulauan Riau" className="inline-flex items-center gap-4">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white p-2">
                <Image src="/images/logo-hw-resmi.png" alt="Lambang resmi Gerakan Kepanduan Hizbul Wathan" width={80} height={80} className="h-full w-full object-contain" />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">Gerakan Kepanduan Hizbul Wathan</span>
                <span className="mt-2 block font-academic text-2xl font-bold leading-tight text-white">Kwartir Wilayah<br />Kepulauan Riau</span>
              </span>
            </Link>

            <p className="mt-6 max-w-xl text-base leading-8 text-emerald-50/65">
              Pusat informasi, administrasi, kaderisasi, dan konsolidasi untuk membangun Pandu Kepulauan yang berakidah, terampil, tangguh, dan mengabdi.
            </p>

            <div className="mt-7 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2"><Compass size={14} className="text-amber-300" /> Berakidah</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2"><Users size={14} className="text-amber-300" /> Terampil</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2"><MapPinned size={14} className="text-amber-300" /> Mengabdi</span>
            </div>
          </div>

          <div>
            <h2 className="font-academic text-lg font-bold text-white">Pusat Digital</h2>
            <nav aria-label="Navigasi Pusat Digital HW Kepri" className="mt-6 space-y-4 text-sm">
              {centreLinks.map(([label, href]) => (
                <Link key={href} href={href} className="group flex items-start gap-2 leading-6 transition hover:text-amber-300">
                  <span>{label}</span>
                  <ArrowUpRight size={14} className="mt-1 shrink-0 opacity-40 transition group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="font-academic text-lg font-bold text-white">Gerakan & Kontak</h2>
            <nav aria-label="Tautan organisasi dan kontak" className="mt-6 space-y-4 text-sm">
              {movementLinks.map(([label, href]) => (
                href.startsWith("http") ? (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-2 leading-6 transition hover:text-amber-300">
                    <span>{label}</span>
                    <ArrowUpRight size={14} className="mt-1 shrink-0 opacity-40 transition group-hover:opacity-100" />
                  </a>
                ) : (
                  <Link key={href} href={href} className="group flex items-start gap-2 leading-6 transition hover:text-amber-300">
                    <span>{label}</span>
                    <ArrowUpRight size={14} className="mt-1 shrink-0 opacity-40 transition group-hover:opacity-100" />
                  </Link>
                )
              ))}
            </nav>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-black text-emerald-950 transition hover:bg-amber-300">
              <Mail size={16} /> Hubungi sekretariat
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 py-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">Tujuh daerah sasaran</p>
          <p className="mt-3 text-sm leading-7 text-emerald-50/55">{regions.join(" · ")}</p>
        </div>

        <div className="grid gap-4 border-t border-white/10 py-8 text-xs leading-6 text-emerald-50/45 md:grid-cols-[1fr_auto] md:items-center">
          <p>© {new Date().getFullYear()} Kwartir Wilayah Gerakan Kepanduan Hizbul Wathan Kepulauan Riau.</p>
          <p className="font-semibold text-amber-300/80 md:text-right">Berakar pada Nilai · Berlayar dalam Pengabdian</p>
        </div>
      </div>
    </footer>
  );
}
