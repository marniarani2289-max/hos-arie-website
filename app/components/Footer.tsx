import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-8 py-16">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Profile */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Dr. Hos Arie Sibarani
            </h2>

            <p className="mt-4 leading-7">
              Constitutional law scholar whose research focuses on
              constitutional theory, Raja Ali Haji, Malay Ethical
              Constitutionalism, and indigenous constitutional thought.
            </p>
          </div>

          {/* Research */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Research
            </h3>

            <ul className="mt-4 space-y-3">

              <li>
                <Link
                  href="/research"
                  className="transition hover:text-amber-500"
                >
                  Constitutional Theory
                </Link>
              </li>

              <li>
                <Link
                  href="/research"
                  className="transition hover:text-amber-500"
                >
                  Malay Intellectual History
                </Link>
              </li>

              <li>
                <Link
                  href="/research/malay-ethical-constitutionalism"
                  className="transition hover:text-amber-500"
                >
                  Malay Ethical Constitutionalism
                </Link>
              </li>

              <li>
                <Link
                  href="/raja-ali-haji"
                  className="transition hover:text-amber-500"
                >
                  Raja Ali Haji Studies
                </Link>
              </li>

            </ul>
          </div>

          {/* Academic Profiles */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Academic Profiles
            </h3>

            <ul className="mt-4 space-y-3">

              <li>
                <a
                  href="https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-amber-500"
                >
                  Google Scholar
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-amber-500"
                >
                  Scopus
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-amber-500"
                >
                  ORCID
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-amber-500"
                >
                  ResearchGate
                </a>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Contact
            </h3>

            <ul className="mt-4 space-y-3">

              <li>
                <a
                  href="mailto:your@email.com"
                  className="transition hover:text-amber-500"
                >
                  Email
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-amber-500"
                >
                  LinkedIn
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-amber-500"
                >
                  Instagram
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-amber-500"
                >
                  X (Twitter)
                </a>
              </li>

            </ul>
          </div>

        </div>

        <div className="mt-16 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Dr. Hos Arie Sibarani. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}