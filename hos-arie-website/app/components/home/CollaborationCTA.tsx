import Link from "next/link";

const collaborationAreas = [
  "Research Collaboration",
  "Invited Lectures",
  "Conference Participation",
  "Visiting Scholar",
  "Joint Publications",
  "Academic Consultation",
];

export default function CollaborationCTA() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
        <div className="overflow-hidden rounded-[2.5rem] bg-slate-950 text-white shadow-2xl">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left */}
            <div className="relative overflow-hidden p-8 md:p-12 lg:p-16">
              <div className="absolute -left-32 -bottom-32 h-[420px] w-[420px] rounded-full border border-amber-400/10" />
              <div className="absolute -left-8 bottom-0 h-[260px] w-[260px] rounded-full border border-amber-400/20" />

              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
                  Academic Collaboration
                </p>

                <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  Let's build meaningful legal scholarship together
                </h2>

                <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-300">
                  I welcome opportunities for collaborative research,
                  international conferences, visiting scholar programmes,
                  academic seminars, and interdisciplinary legal research.
                </p>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
                  My research interests include constitutional law,
                  comparative constitutional theory, Raja Ali Haji studies,
                  Malay Ethical Constitutionalism, indigenous constitutionalism,
                  and Indonesian private law.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-xl bg-amber-600 px-8 py-4 font-semibold text-white transition hover:bg-amber-500"
                  >
                    Contact Me
                  </Link>

                  <a
                    href="/academic-cv.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-8 py-4 font-semibold text-white transition hover:border-amber-400 hover:text-amber-400"
                  >
                    Download Academic CV
                  </a>
                </div>
              </div>
            </div>

            {/* Right */}
            <aside className="border-t border-slate-800 bg-slate-900 p-8 md:p-12 lg:border-l lg:border-t-0 lg:p-16">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-400">
                Areas of Collaboration
              </p>

              <div className="mt-8 space-y-4">
                {collaborationAreas.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-800 bg-slate-950/40 px-5 py-4"
                  >
                    <p className="font-medium text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">
                  Research Focus
                </p>

                <p className="mt-6 text-2xl leading-relaxed text-slate-200">
                  Constitutional Law • Constitutional Theory •
                  Malay Intellectual History • Malay Ethical Constitutionalism •
                  Raja Ali Haji Studies • Indigenous Constitutionalism
                </p>
              </div>

              <div className="mt-8 border-t border-slate-800 pt-8">
                <p className="text-sm text-slate-500">
                  Current Base
                </p>

                <p className="mt-2 text-lg font-semibold">
                  Riau Islands, Indonesia
                </p>

                <p className="mt-5 text-sm text-slate-500">
                  Open to international academic collaboration.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}