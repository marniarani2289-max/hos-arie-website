"use client";

import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Research", href: "/research" },
  { name: "Publications", href: "/publications" },
  { name: "Books", href: "/#books" },
  { name: "Opinions", href: "/opinions" },
  { name: "Digital Archive", href: "/#digital-archive" },
  { name: "Raja Ali Haji", href: "/raja-ali-haji" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="max-w-md">
          <h1 className="text-xl font-bold tracking-tight text-slate-950 md:text-2xl">
            Dr. Hos Arie Sibarani
          </h1>

          <p className="mt-1 hidden text-[10px] uppercase tracking-[0.25em] text-amber-700 sm:block">
            Constitutional Law • Malay Constitutional Thought
          </p>
        </Link>

        <div className="hidden items-center gap-6 xl:flex">
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
            className="rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm xl:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          Menu
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-6 xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-medium text-slate-700 transition hover:text-amber-700"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}