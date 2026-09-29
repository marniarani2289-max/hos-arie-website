import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import s from "./ismi.module.css";

export default function IsmiLayout({ children }: { children: ReactNode }) {
  return <div lang="id" className={s.site}>
    <a className={s.skip} href="#ismi-content">Langsung ke isi ISMI Kepri</a>
    <div className={s.masthead}>
      <Link className={s.brand} href="/ismi-kepri">
        <Image src="/ismi-kepri/logo.jpeg" width={64} height={64} alt="Lambang ISMI Kepri" priority />
        <span><strong>ISMI KEPRI</strong><small>Ikatan Sarjana Melayu Indonesia</small></span>
      </Link>
      <nav className={s.nav} aria-label="Navigasi ISMI Kepri">
        <Link href="/ismi-kepri#tentang">Tentang</Link>
        <Link href="/ismi-kepri#ruang-kajian">Ruang Kajian</Link>
        <Link href="/ismi-kepri#kegiatan">Kegiatan</Link>
        <Link href="/ismi-kepri/icsm-2026#dokumen">Publikasi</Link>
        <Link className={s.navFeature} href="/ismi-kepri/icsm-2026">ICSM 2026 ↗</Link>
      </nav>
    </div>
    <div id="ismi-content">{children}</div>
    <div className={s.localFooter}><div><strong>ISMI Kepulauan Riau</strong><p>Ruang keilmuan, kebudayaan, dan pengabdian.</p></div><Link href="/id">Bagian dari hossibarani.com ↗</Link></div>
  </div>;
}
