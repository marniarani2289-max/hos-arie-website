"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Research", href: "/research" },
  { name: "JMCS", href: "/journal" },
  { name: "Publications", href: "/publications" },
  { name: "Books", href: "/#books" },
  { name: "Opinions", href: "/opinions" },
  { name: "Digital Archive", href: "/#digital-archive" },
  { name: "Raja Ali Haji Institute", href: "/raja-ali-haji" },
  { name: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-20 max-w-[90rem] items-center justify-between gap-6 px-5 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <p className="font-academic text-lg font-bold tracking-tight text-slate-950 sm:text-xl xl:text-2xl">
            Dr. Hos Arie Sibarani
          </p>
          <p className="mt-1 hidden text-[9px] uppercase tracking-[0.22em] text-amber-700 md:block xl:text-[10px]">
            Constitutional Law • Malay Constitutional Thought
          </p>
        </Link>

        <div className="hidden items-center gap-5 xl:flex 2xl:gap-7">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium text-slate-700 transition hover:text-amber-700 ${
                item.name === "Raja Ali Haji Institute"
                  ? "max-w-[7.5rem] text-center leading-tight"
                  : "whitespace-nowrap"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/#contact"
            className="whitespace-nowrap rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-300 text-slate-900 transition hover:bg-slate-100 xl:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 xl:hidden ${
          open ? "max-h-[850px]" : "max-h-0 border-t-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-5 sm:px-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 transition hover:bg-amber-50 hover:text-amber-800"
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
