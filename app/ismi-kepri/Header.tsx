"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import s from "./ismi.module.css";

const links = [
  { label: "Beranda", href: "/ismi-kepri" },
  { label: "Tentang", href: "/ismi-kepri#tentang" },
  { label: "Ruang Kajian", href: "/ismi-kepri#ruang-kajian" },
  { label: "Kegiatan", href: "/ismi-kepri#kegiatan" },
  { label: "Publikasi", href: "/ismi-kepri/icsm-2026#dokumen" },
  { label: "ICSM 2026", href: "/ismi-kepri/icsm-2026" },
];

export default function IsmiHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className={s.header} role="banner">
    <div className={s.utilityBar}>
      <div className={s.utilityInner}>
        <span>Ilmu · Adab · Pengabdian</span>
        <Link href="/id">hossibarani.com <span aria-hidden="true">↗</span></Link>
      </div>
    </div>
    <div className={s.headerMain}>
      <Link className={s.headerBrand} href="/ismi-kepri" onClick={() => setOpen(false)} aria-label="ISMI Kepri — Beranda">
        <Image src="/ismi-kepri/logo.jpeg" width={64} height={64} alt="Lambang ISMI Kepri" priority />
        <span><strong>ISMI KEPRI</strong><small>Ikatan Sarjana Melayu Indonesia</small></span>
      </Link>
      <button className={s.menuToggle} type="button" aria-expanded={open} aria-controls="ismi-navigation" onClick={() => setOpen(value => !value)}>
        <span aria-hidden="true">{open ? "×" : "☰"}</span> {open ? "Tutup" : "Menu"}
      </button>
      <nav id="ismi-navigation" className={`${s.primaryNav} ${open ? s.navOpen : ""}`} aria-label="Navigasi utama ISMI Kepri">
        {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
          aria-current={pathname === link.href ? "page" : undefined}
          className={link.label === "ICSM 2026" ? s.conferenceLink : undefined}>
          {link.label}{link.label === "ICSM 2026" && <span aria-hidden="true">↗</span>}
        </Link>)}
      </nav>
    </div>
  </header>;
}
