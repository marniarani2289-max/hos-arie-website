import Badge from "../shared/Badge";
import ButtonLink from "../shared/ButtonLink";
import Container from "../shared/Container";

const researchThemes = [
  "Malay Ethical Constitutionalism",
  "Raja Ali Haji Studies",
  "Indigenous Constitutionalism",
  "Comparative Constitutional Theory",
];

const academicHighlights = [
  {
    value: "20+",
    label: "Years of University Teaching",
  },
  {
    value: "PhD",
    label: "Islamic Law and Malay Constitutional Thought",
  },
  {
    value: "Former Dean",
    label: "Academic and Institutional Leadership",
  },
  {
    value: "Founder",
    label: "Raja Ali Haji Research Network",
  },
];

export default function HeroV4() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.12),transparent_34%)]" />

        <div className="absolute -right-40 -top-48 h-[520px] w-[520px] rounded-full border border-amber-400/10" />

        <div className="absolute -right-20 -top-28 h-[360px] w-[360px] rounded-full border border-amber-400/15" />

        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      </div>

      <Container>
        <div className="relative py-20 sm:py-24 lg:py-28">
          <div className="grid items-center gap-14 xl:grid-cols-[1.1fr_0.9fr]">
            {/* Main academic identity */}
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-amber-400/20 bg-amber-400/5 px-4 py-2">
                <span
                  className="h-2 w-2 rounded-full bg-amber-400"
                  aria-hidden="true"
                />

                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
                  Constitutional Law Scholar
                </span>
              </div>

              <p className="font-academic mt-7 text-2xl font-bold text-white sm:text-3xl">
                Dr. Hos Arie Sibarani
              </p>

              <h1 className="font-academic mt-5 max-w-5xl text-5xl font-bold leading-[1.06] tracking-tight text-white sm:text-6xl xl:text-7xl">
                Constitutional thought from the Malay world
              </h1>

              <p className="mt-7 max-w-3xl text-xl font-medium leading-9 text-amber-300">
                Recovering indigenous constitutional ideas and bringing
                Penyengat into global constitutional theory.
              </p>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
                My research reconstructs Raja Ali Haji&apos;s ideas on
                authority, justice, consultation, accountability, and ethical
                governance. It develops Malay Ethical Constitutionalism as a
                contribution to indigenous and comparative constitutional
                scholarship.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href="/research">
                  Explore Research
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </ButtonLink>

                <ButtonLink
                  href="/publications"
                  variant="secondary"
                >
                  View Publications
                </ButtonLink>

                <ButtonLink
                  href="/academic-cv.pdf"
                  variant="darkOutline"
                  newTab
                >
                  Academic CV
                </ButtonLink>
              </div>

              <div className="mt-12 grid gap-5 border-t border-white/10 pt-8 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Field
                  </p>

                  <p className="mt-2 font-medium text-slate-200">
                    Constitutional Law
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Intellectual Tradition
                  </p>

                  <p className="mt-2 font-medium text-slate-200">
                    Malay Constitutional Thought
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Research Direction
                  </p>

                  <p className="mt-2 font-medium text-slate-200">
                    Indigenous Constitutionalism
                  </p>
                </div>
              </div>
            </div>

            {/* Research profile panel */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-amber-400/10 via-transparent to-white/5 blur-xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 shadow-2xl shadow-black/30 backdrop-blur">
                {/* Academic identity card */}
                <div className="border-b border-white/10 p-7 sm:p-9">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="flex h-24 w-24 flex-none items-center justify-center rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/20 to-slate-950">
                      <span className="font-academic text-3xl font-bold text-amber-300">
                        HAS
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">
                        Academic Profile
                      </p>

                      <h2 className="font-academic mt-3 text-2xl font-bold text-white">
                        Scholarship rooted in Penyengat
                      </h2>

                      <p className="mt-3 text-sm leading-7 text-slate-400">
                        Connecting Malay intellectual history with current
                        debates in constitutional law, governance, ethics, and
                        public responsibility.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Current research */}
                <div className="border-b border-white/10 p-7 sm:p-9">
                  <div className="flex items-center justify-between gap-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">
                      Current Research
                    </p>

                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                      Active
                    </span>
                  </div>

                  <h3 className="font-academic mt-5 text-3xl font-bold leading-tight text-white">
                    From Penyengat to global constitutional theory
                  </h3>

                  <div className="mt-7 flex flex-wrap gap-3">
                    {researchThemes.map((theme) => (
                      <Badge
                        key={theme}
                        variant="dark"
                      >
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Academic highlights */}
                <div className="grid grid-cols-2 gap-px bg-white/10">
                  {academicHighlights.map((item) => (
                    <div
                      key={`${item.value}-${item.label}`}
                      className="min-h-36 bg-slate-900 p-5 transition duration-300 hover:bg-slate-800 sm:p-6"
                    >
                      <p className="font-academic text-xl font-bold text-amber-300 sm:text-2xl">
                        {item.value}
                      </p>

                      <p className="mt-3 text-xs leading-5 text-slate-400 sm:text-sm">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Signature statement */}
                <div className="p-7 sm:p-9">
                  <div className="flex gap-4">
                    <div
                      className="h-auto w-1 flex-none rounded-full bg-amber-400"
                      aria-hidden="true"
                    />

                    <p className="text-sm leading-7 text-slate-400">
                      Building academic, digital, and institutional legacies
                      through research, writing, international collaboration,
                      and the development of the Raja Ali Haji Research
                      Network.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}