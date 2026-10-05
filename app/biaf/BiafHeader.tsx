"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export default function BiafHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);
  return <header className="header" onKeyDown={(event) => {
    if (event.key === "Escape" && open) { close(); toggle.current?.focus(); }
  }}>
    <Link className="brand" href="/biaf" aria-label="BIAF, beranda" onClick={close}>
      <span className="mark" aria-hidden="true">b<span>ı</span>af<span className="dot">.</span></span>
      <span className="brand-name">BATAM INTERNATIONAL<br />ACADEMIC FORUM</span>
    </Link>
    <button ref={toggle} type="button" className="menu-toggle" aria-expanded={open} aria-controls="biaf-navigation" onClick={() => setOpen(value => !value)}>
      {open ? "Tutup" : "Menu"} <span aria-hidden="true">{open ? "×" : "☰"}</span>
    </button>
    <nav id="biaf-navigation" className={open ? "is-open" : undefined} aria-label="Navigasi BIAF">
      <a href="#profil" onClick={close}>Profil</a>
      <a href="#keilmuan" onClick={close}>Arah keilmuan</a>
      <a href="#tata-kelola" onClick={close}>Tata kelola</a>
      <a className="nav-cta" href="#kolaborasi" onClick={close}>Mari berkolaborasi <span aria-hidden="true">↗</span></a>
      <Link className="home-link" href="/id" onClick={close}>Situs utama ↗</Link>
    </nav>
  </header>;
}
