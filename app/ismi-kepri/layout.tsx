import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import IsmiHeader from "./Header";
import s from "./ismi.module.css";

export const metadata: Metadata = {
  applicationName: "ISMI Kepulauan Riau",
  icons: {
    icon: [{ url: "/ismi-kepri/icon", type: "image/png", sizes: "512x512" }],
    shortcut: "/ismi-kepri/icon",
    apple: [{ url: "/ismi-kepri/apple-icon", type: "image/png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = { themeColor: "#163d32" };

export default function IsmiLayout({ children }: { children: ReactNode }) {
  return <div lang="id" className={s.site} id="ismi-top">
    <a className={s.skip} href="#ismi-content">Langsung ke isi ISMI Kepri</a>
    <IsmiHeader />
    <div id="ismi-content">{children}</div>
    <footer className={s.footer} role="contentinfo" aria-label="Footer ISMI Kepulauan Riau">
      <div className={s.footerMain}>
        <div className={s.footerIdentity}>
          <Link className={s.footerBrand} href="/ismi-kepri">
            <Image src="/ismi-kepri/logo.jpeg" width={64} height={64} alt="Lambang ISMI Kepri" />
            <span><strong>ISMI KEPRI</strong><small>Ikatan Sarjana Melayu Indonesia<br/>Kepulauan Riau</small></span>
          </Link>
          <p>Merawat ilmu, menguatkan Melayu, dan mengabdi untuk masyarakat kepulauan.</p>
          <span className={s.footerMotto}>Ilmu · Adab · Pengabdian</span>
        </div>
        <nav className={s.footerLinks} aria-label="Jelajahi ISMI Kepri">
          <h2>Jelajahi ISMI</h2>
          <Link href="/ismi-kepri">Beranda</Link>
          <Link href="/ismi-kepri#tentang">Tentang ISMI Kepri</Link>
          <Link href="/ismi-kepri#ruang-kajian">Ruang Kajian</Link>
          <Link href="/ismi-kepri#kegiatan">Kegiatan & Dokumentasi</Link>
        </nav>
        <nav className={s.footerLinks} aria-label="Dokumen dan tindak lanjut ICSM">
          <h2>Dokumen & Tindak Lanjut</h2>
          <Link href="/ismi-kepri/icsm-2026">ICSM 2026</Link>
          <Link href="/ismi-kepri/icsm-2026#dokumen">Pusat Dokumen</Link>
          <Link href="/ismi-kepri/icsm-2026#tindak-lanjut">Matriks Tindak Lanjut</Link>
          <a href="/ismi-kepri/dokumen/analisis-icsm-2026.pdf" download>Unduh Analisis PDF <span aria-hidden="true">↓</span></a>
        </nav>
        <div className={s.footerContact}>
          <h2>Mari Terhubung</h2>
          <p>Dr. Hos Arie Sibarani, S.H., M.H.<br/>Dewan Pakar ISMI Kepri · 2026–2030.</p>
          <Link href="/id/contact">Hubungi Hos Arie <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className={s.footerBottom}>
        <p>© {new Date().getFullYear()} ISMI Kepulauan Riau</p>
        <Link href="/id">Bagian dari ekosistem hossibarani.com <span aria-hidden="true">↗</span></Link>
        <a href="#ismi-top">Kembali ke atas <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  </div>;
}
