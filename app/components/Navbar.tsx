import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}

        <Link href="/" className="group">

          <h1 className="text-2xl font-bold tracking-tight text-slate-950 group-hover:text-amber-700 transition">
            Dr. Hos Arie Rhamadhan Sibarani
          </h1>

          <p className="mt-1 text-[11px] uppercase tracking-[0.35em] text-amber-700">
            Constitutional Law • Malay Constitutional Thought
          </p>

        </Link>

        {/* Menu */}

        <ul className="hidden items-center gap-8 text-[15px] font-medium text-slate-700 lg:flex">

          <li>
            <Link href="/" className="hover:text-amber-700 transition">
              Home
            </Link>
          </li>

          <li>
            <Link href="/#research" className="hover:text-amber-700 transition">
              Research
            </Link>
          </li>

          <li>
            <Link
              href="/raja-ali-haji"
              className="hover:text-amber-700 transition"
            >
              Raja Ali Haji
            </Link>
          </li>

          <li>
            <Link
              href="/#publications"
              className="hover:text-amber-700 transition"
            >
              Publications
            </Link>
          </li>

          <li>
            <Link
              href="/academic-cv.pdf"
              target="_blank"
              className="hover:text-amber-700 transition"
            >
              Academic CV
            </Link>
          </li>

          <li>
            <Link
              href="/news"
              className="hover:text-amber-700 transition"
            >
              News
            </Link>
          </li>

          <li>
            <Link
              href="/#contact"
              className="rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-amber-700"
            >
              Contact
            </Link>
          </li>

        </ul>

        {/* Mobile */}

        <Link
          href="/#contact"
          className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white lg:hidden"
        >
          Contact
        </Link>

      </div>
    </nav>
  );
}