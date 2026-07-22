import Link from "next/link";
import Container from "../shared/Container";

const researchAreas = [
  "Constitutional Theory",
  "Malay Ethical Constitutionalism",
  "Raja Ali Haji Studies",
  "Indigenous Constitutionalism",
];

export default function FooterV3() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <Container>
        <div className="grid gap-14 py-20 lg:grid-cols-4">
          {/* Left */}
          <div className="lg:col-span-2">
            <h2 className="font-academic text-3xl font-bold text-white">
              Dr. Hos Arie Sibarani
            </h2>

            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.28em] text-amber-400">
              Constitutional Law Scholar
            </p>

            <p className="mt-7 max-w-xl leading-8 text-slate-400">
              Research focuses on constitutional theory, Raja Ali Haji,
              Malay Ethical Constitutionalism, indigenous constitutionalism,
              and comparative constitutional law.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="font-academic text-2xl font-bold text-white">
                  20+
                </p>
                <p className="text-sm text-slate-500">
                  Years Teaching
                </p>
              </div>

              <div>
                <p className="font-academic text-2xl font-bold text-white">
                  PhD
                </p>
                <p className="text-sm text-slate-500">
                  Islamic Law
                </p>
              </div>

              <div>
                <p className="font-academic text-2xl font-bold text-white">
                  Dean
                </p>
                <p className="text-sm text-slate-500">
                  Former
                </p>
              </div>

              <div>
                <p className="font-academic text-2xl font-bold text-white">
                  RAHRN
                </p>
                <p className="text-sm text-slate-500">
                  Founder
                </p>
              </div>
            </div>
          </div>

          {/* Research */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Research
            </h3>

            <ul className="mt-6 space-y-3">
              {researchAreas.map((item) => (
                <li key={item}>
                  <Link
                    href="/research"
                    className="transition hover:text-amber-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Resources
            </h3>

            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href="/academic-cv.pdf"
                  target="_blank"
                  className="transition hover:text-amber-400"
                >
                  Academic CV
                </Link>
              </li>

              <li>
                <a
                  href="https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-amber-400"
                >
                  Google Scholar
                </a>
              </li>

              <li>
                <Link
                  href="/publications"
                  className="transition hover:text-amber-400"
                >
                  Publications
                </Link>
              </li>

              <li>
                <Link
                  href="/gallery"
                  className="transition hover:text-amber-400"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 border-t border-slate-800 py-8 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Dr. Hos Arie Sibarani.
            All Rights Reserved.
          </p>

          <p>
            Constitutional Theory • Malay Constitutional Thought •
            Indigenous Constitutionalism
          </p>
        </div>
      </Container>
    </footer>
  );
}