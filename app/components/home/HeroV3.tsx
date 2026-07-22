import Badge from "../shared/Badge";
import ButtonLink from "../shared/ButtonLink";
import Container from "../shared/Container";

const researchThemes = [
  "Malay Ethical Constitutionalism",
  "Raja Ali Haji Studies",
  "Indigenous Constitutionalism",
  "Comparative Constitutional Theory",
];

const academicProfile = [
  {
    value: "20+",
    label: "Years of Teaching",
  },
  {
    value: "PhD",
    label: "Islamic Law",
  },
  {
    value: "Former Dean",
    label: "Academic Leadership",
  },
  {
    value: "Founder",
    label: "Raja Ali Haji Research Network",
  },
];

export default function HeroV3() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full border border-amber-500/10" />

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-amber-500/20" />

        <div className="absolute left-[54%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block" />

        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      </div>

      <Container>
        <div className="relative grid min-h-[760px] items-center gap-14 py-20 sm:py-24 lg:grid-cols-[1.12fr_0.88fr] lg:py-28">
          {/* Left column */}
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
              Constitutional Law Scholar
            </p>

            <p className="font-academic mt-6 text-2xl font-bold text-white sm:text-3xl">
              Dr. Hos Arie Sibarani
            </p>

            <h1 className="font-academic mt-5 text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Recovering constitutional thought from the Malay world
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              My research reconstructs Raja Ali Haji&apos;s constitutional
              thought and develops Malay Ethical Constitutionalism as a
              contribution to indigenous and comparative constitutional
              theory.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/research">
                Explore Research
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

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-7 text-sm text-slate-400">
              <span>Constitutional Law</span>

              <span
                className="hidden h-1 w-1 rounded-full bg-amber-500 sm:block"
                aria-hidden="true"
              />

              <span>Malay Intellectual History</span>

              <span
                className="hidden h-1 w-1 rounded-full bg-amber-500 sm:block"
                aria-hidden="true"
              />

              <span>Indigenous Constitutionalism</span>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Current research */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/10 backdrop-blur sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                Current Research
              </p>

              <h2 className="font-academic mt-5 text-3xl font-bold leading-tight text-white">
                From Penyengat to global constitutional theory
              </h2>

              <div className="mt-7 flex flex-wrap gap-3">
                {researchThemes.map((theme) => (
                  <Badge key={theme} variant="dark">
                    {theme}
                  </Badge>
                ))}
              </div>

              <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-7 text-slate-400">
                Constitutional theory rooted in ethics, intellectual history,
                indigenous knowledge, justice, and public responsibility.
              </p>
            </div>

            {/* Academic profile */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-7 shadow-2xl shadow-black/10 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                Academic Profile
              </p>

              <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                {academicProfile.map((item) => (
                  <div
                    key={`${item.value}-${item.label}`}
                    className="bg-slate-900 p-5 transition duration-300 hover:bg-slate-800 sm:p-6"
                  >
                    <p className="font-academic text-xl font-bold text-white sm:text-2xl">
                      {item.value}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-slate-400 sm:text-sm">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex items-start gap-4 border-t border-white/10 pt-6">
                <div
                  className="mt-1 h-8 w-1 flex-none rounded-full bg-amber-500"
                  aria-hidden="true"
                />

                <p className="text-sm leading-7 text-slate-400">
                  Building academic, digital, and institutional legacies
                  connecting the intellectual heritage of Penyengat with
                  contemporary global scholarship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}