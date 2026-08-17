import Image from "next/image";
import ButtonLink from "../shared/ButtonLink";
import Container from "../shared/Container";

const researchFields = [
  "Constitutional Law",
  "Malay Constitutional Thought",
  "Indigenous Constitutionalism",
];

export default function HeroV6() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.15),transparent_34%)]" />

        <div className="absolute -right-48 -top-48 h-[560px] w-[560px] rounded-full border border-amber-400/10" />

        <div className="absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-amber-400/10" />

        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      </div>

      <Container>
        <div className="relative py-12 sm:py-16 lg:flex lg:min-h-[calc(100vh-96px)] lg:items-center lg:py-14">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] xl:gap-16">
            {/* Left content */}
            <div className="order-1">
              <div className="inline-flex items-center gap-3 rounded-full border border-amber-400/20 bg-amber-400/5 px-4 py-2">
                <span
                  className="h-2 w-2 rounded-full bg-amber-400"
                  aria-hidden="true"
                />

                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300 sm:text-xs">
                  Constitutional Law Scholar
                </span>
              </div>

              <p className="font-academic mt-6 text-2xl font-bold text-white sm:text-3xl">
                Dr. Hos Arie Sibarani
              </p>

              <h1 className="font-academic mt-5 max-w-4xl text-[2.75rem] font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                Constitutional thought from the Malay world
              </h1>

              <p className="mt-7 max-w-3xl text-xl font-medium leading-9 text-amber-300 sm:text-2xl">
                Recovering indigenous constitutional ideas and bringing
                Penyengat into global constitutional theory.
              </p>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                My research reconstructs Raja Ali Haji&apos;s ideas on
                authority, justice, consultation, accountability, and ethical
                governance. It develops Malay Ethical Constitutionalism as a
                contribution to indigenous and comparative constitutional
                scholarship.
              </p>

              <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <ButtonLink href="/research">
                  Explore Research
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </ButtonLink>

                <ButtonLink href="/publications" variant="secondary">
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

              <div className="mt-10 border-t border-white/10 pt-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Research Fields
                </p>

                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                  {researchFields.map((field) => (
                    <div key={field} className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-amber-400"
                        aria-hidden="true"
                      />

                      <span className="text-sm font-medium text-slate-300">
                        {field}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right portrait */}
            <div className="order-2">
              <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-amber-400/10 via-transparent to-white/5 blur-xl" />

                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/30">
                  <div className="relative h-[420px] min-[400px]:h-[470px] sm:h-[540px] lg:h-[680px] xl:h-[720px]">
                    <Image
                      src="/images/profile/hos-arie.png"
                      alt="Dr. Hos Arie Sibarani wearing traditional Malay attire"
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 46vw"
                      className="object-cover object-[50%_18%] sm:object-[50%_15%] lg:object-[50%_12%]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-9">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300 sm:text-xs">
                        Academic Profile
                      </p>

                      <h2 className="font-academic mt-3 max-w-md text-3xl font-bold leading-tight text-white sm:text-4xl">
                        Scholarship rooted in Penyengat
                      </h2>

                      <p className="mt-4 hidden max-w-lg text-sm leading-7 text-slate-300 sm:block sm:text-base">
                        Connecting Malay intellectual history with contemporary
                        debates in constitutional law, governance, ethics, and
                        public responsibility.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-amber-400/20 bg-slate-900/95 px-5 py-4 shadow-xl backdrop-blur xl:block"
                  aria-hidden="true"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300">
                    Signature Research
                  </p>

                  <p className="font-academic mt-2 text-lg font-bold text-white">
                    Malay Ethical Constitutionalism
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}