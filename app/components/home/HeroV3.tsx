import Badge from "../shared/Badge";
import ButtonLink from "../shared/ButtonLink";
import Container from "../shared/Container";

const researchThemes = [
  "Malay Ethical Constitutionalism",
  "Raja Ali Haji Studies",
  "Indigenous Constitutionalism",
  "Comparative Constitutional Theory",
];

export default function HeroV3() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full border border-amber-500/10" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-amber-500/20" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      </div>

      <Container>
        <div className="relative grid min-h-[700px] items-center gap-14 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
              Constitutional Law Scholar
            </p>

            <h1 className="font-academic mt-7 max-w-4xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Recovering constitutional thought from the Malay world
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              My research reconstructs Raja Ali Haji’s constitutional thought
              and develops Malay Ethical Constitutionalism as a contribution
              to indigenous and comparative constitutional theory.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/research">Explore Research</ButtonLink>

              <ButtonLink
                href="/academic-cv.pdf"
                variant="secondary"
              >
                Academic CV
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              Current Research
            </p>

            <h2 className="font-academic mt-5 text-3xl font-bold leading-tight">
              From Penyengat to global constitutional theory
            </h2>

            <div className="mt-8 flex flex-wrap gap-3">
              {researchThemes.map((theme) => (
                <Badge key={theme}>{theme}</Badge>
              ))}
            </div>

            <div className="mt-9 border-t border-white/10 pt-7">
              <p className="text-sm leading-7 text-slate-400">
                Constitutional theory rooted in ethics, intellectual history,
                indigenous knowledge, and public responsibility.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}