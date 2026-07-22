"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Research", href: "/research" },
  { name: "Publications", href: "/publications" },
  { name: "Books", href: "/#books" },
  { name: "Opinions", href: "/opinions" },
  { name: "Gallery", href: "/gallery" },
  { name: "Digital Archive", href: "/#digital-archive" },
  { name: "Raja Ali Haji", href: "/raja-ali-haji" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* Logo */}

        <Link href="/" className="max-w-sm">
          <h1 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl lg:text-2xl">
            Dr. Hos Arie Sibarani
          </h1>

          <p className="mt-1 hidden text-[10px] uppercase tracking-[0.25em] text-amber-700 md:block">
            Constitutional Law • Malay Constitutional Thought
          </p>
        </Link>

        {/* Desktop */}

        <div className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition hover:text-amber-700"
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/#contact"
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Button */}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 transition hover:bg-slate-100 lg:hidden"
        >
          {open ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 lg:hidden ${
          open ? "max-h-[700px]" : "max-h-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-5">

          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-100 hover:text-amber-700"
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