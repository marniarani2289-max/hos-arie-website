const researchPillars = [
  {
    title: "Ethical Authority",
    description:
      "Political authority is legitimate only when exercised through justice, responsibility, and moral restraint.",
  },
  {
    title: "Consultation",
    description:
      "Governance requires deliberation, shared responsibility, and meaningful consultation.",
  },
  {
    title: "Accountability",
    description:
      "Rulers and public institutions must remain answerable for the use of political power.",
  },
  {
    title: "Public Responsibility",
    description:
      "Government is understood as a public trust rather than a source of personal privilege.",
  },
];

export default function CurrentResearch() {
  return (
    <section id="research" className="bg-slate-950 px-6 py-24 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-400">
              Current Research
            </p>

            <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
              Malay Ethical Constitutionalism
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              A conceptual framework reconstructing constitutional reasoning
              from the nineteenth-century Malay world through the writings of
              Raja Ali Haji.
            </p>

            <a
              href="#fellowship-project"
              className="mt-8 inline-flex rounded-xl bg-amber-500 px-6 py-4 font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Explore the Research Project
            </a>
          </div>

          <div>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              This research examines how Islamic legal principles, Malay
              political institutions, ethical governance, and constitutional
              accountability interacted within the Riau-Lingga Sultanate.
              Rather than treating the Malay world as a peripheral recipient of
              constitutional ideas, it presents it as a site of constitutional
              innovation.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {researchPillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className="border-t border-slate-700 pt-6"
                >
                  <p className="text-sm font-bold text-amber-400">
                    0{index + 1}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold">{pillar.title}</h3>

                  <p className="mt-3 leading-7 text-slate-400">
                    {pillar.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}