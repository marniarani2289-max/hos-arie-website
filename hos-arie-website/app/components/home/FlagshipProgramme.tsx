import Badge from "../shared/Badge";
import Container from "../shared/Container";

const principles = [
  "Amanah",
  "Adab",
  "Justice",
  "Consultation",
  "Accountability",
  "Public Responsibility",
];

export default function FlagshipProgramme() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <div className="grid overflow-hidden rounded-3xl bg-slate-950 shadow-xl lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-8 text-white sm:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-400">
              Flagship Research Programme
            </p>

            <h2 className="font-academic mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
              Malay Ethical Constitutionalism
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A constitutional framework reconstructed from Malay intellectual
              traditions, especially the works of Raja Ali Haji, placing
              ethics, justice, consultation, accountability, and public
              responsibility at the centre of constitutional thought.
            </p>

            <p className="mt-8 border-l-2 border-amber-500 pl-5 text-sm leading-7 text-slate-400">
              The programme connects the intellectual world of Penyengat with
              contemporary debates in comparative and indigenous
              constitutionalism.
            </p>

            <a
              href="/research"
              className="mt-9 inline-flex rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
            >
              View Flagship Programme
            </a>
          </div>

          <div className="border-t border-slate-800 bg-slate-900 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              Normative Foundations
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {principles.map((principle) => (
                <Badge key={principle}>{principle}</Badge>
              ))}
            </div>

            <div className="mt-10 border-t border-slate-700 pt-7">
              <p className="text-sm font-semibold text-amber-400">
                Intellectual Direction
              </p>

              <p className="mt-3 leading-7 text-slate-400">
                Building an indigenous constitutional framework capable of
                contributing to global legal and constitutional theory.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}