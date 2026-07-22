"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Research", href: "/research" },
  { name: "Publications", href: "/publications" },
  { name: "Books", href: "/books" },
  { name: "Opinions", href: "/opinions" },
  { name: "Gallery", href: "/gallery" },
  { name: "Archive", href: "/digital-archive" },
  { name: "Raja Ali Haji", href: "/raja-ali-haji" },
];

export default function NavbarV3() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="min-w-0 max-w-sm"
        >
          <p className="truncate text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            Dr. Hos Arie Sibarani
          </p>

          <p className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-700 sm:block">
            Constitutional Law • Malay Constitutional Thought
          </p>
        </Link>

        <div className="hidden items-center gap-5 xl:flex">
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative py-2 text-sm font-medium transition ${
                  active
                    ? "text-amber-700"
                    : "text-slate-700 hover:text-amber-700"
                }`}
              >
                {item.name}

                <span
                  className={`absolute inset-x-0 -bottom-1 h-0.5 origin-left bg-amber-700 transition-transform ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="ml-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Collaborate
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-amber-700 hover:text-amber-700 xl:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-6 py-6 xl:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition ${
                    active
                      ? "bg-amber-50 text-amber-800"
                      : "text-slate-700 hover:bg-slate-50 hover:text-amber-700"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
            >
              Collaborate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}