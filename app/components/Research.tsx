const researchAreas = [
  {
    title: "Constitutional Theory",
    description:
      "Malay Ethical Constitutionalism, Indigenous Constitutionalism, Comparative Constitutional Theory, Constitutional Accountability, and Ethical Governance.",
    focus:
      "Developing constitutional thought grounded in ethics, accountability, justice, and Malay intellectual traditions.",
  },
  {
    title: "Private Law",
    description:
      "Vicarious Liability, Corrective Justice, Tort Law, Civil Liability, and Institutional Responsibility.",
    focus:
      "Examining the normative foundations of responsibility for harm arising from employment and institutional activities.",
  },
  {
    title: "Malay Studies",
    description:
      "Raja Ali Haji, Malay Intellectual History, Language, Literature, Political Thought, and Malay Civilization.",
    focus:
      "Recovering the legal, political, ethical, and constitutional dimensions of Malay intellectual heritage.",
  },
  {
    title: "Environmental Law",
    description:
      "Marine Genetic Resources, Benefit Sharing, Climate Justice, Sustainable Development, and Environmental Governance.",
    focus:
      "Connecting environmental responsibility, maritime governance, sustainability, and distributive justice.",
  },
];

const researchFoundations = [
  "Amanah",
  "Adab",
  "Justice",
  "Accountability",
  "Public Responsibility",
];

export default function Research() {
  return (
    <section
      id="research"
      className="border-y border-slate-200 bg-slate-50 px-6 py-24 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            Research
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Research Interests
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            My research connects constitutional theory, private law, Malay
            intellectual history, and environmental governance through a
            broader concern with justice, responsibility, ethical authority,
            and civilizational knowledge.
          </p>
        </div>

        {/* Main research programme */}
        <div className="mt-14 grid overflow-hidden rounded-3xl bg-slate-950 shadow-xl lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-8 text-white sm:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-400">
              Central Research Programme
            </p>

            <h3 className="mt-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Malay Ethical Constitutionalism
            </h3>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A research programme that reconstructs constitutional ideas from
              the Malay intellectual tradition and places ethics, justice,
              public responsibility, consultation, and accountability at the
              centre of constitutional thought.
            </p>

            <p className="mt-8 border-l-2 border-amber-500 pl-5 text-sm leading-7 text-slate-400">
              From Raja Ali Haji and the intellectual world of Penyengat to
              contemporary debates in comparative and indigenous
              constitutionalism.
            </p>
          </div>

          <div className="border-t border-slate-800 bg-slate-900 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              Normative Foundations
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {researchFoundations.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 border-t border-slate-700 pt-7">
              <p className="text-sm font-semibold text-amber-400">
                Intellectual Direction
              </p>

              <p className="mt-3 leading-7 text-slate-400">
                Building an indigenous constitutional framework that can
                contribute to global legal and constitutional theory.
              </p>
            </div>
          </div>
        </div>

        {/* Research areas */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {researchAreas.map((item) => (
            <article
              key={item.title}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl"
            >
              <div className="h-1 w-12 rounded-full bg-amber-600 transition-all duration-300 group-hover:w-20" />

              <h3 className="mt-7 text-2xl font-bold text-slate-950 sm:text-3xl">
                {item.title}
              </h3>

              <p className="mt-5 text-base leading-7 text-slate-600">
                {item.description}
              </p>

              <div className="mt-7 border-t border-slate-200 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                  Research Focus
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {item.focus}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Research pathway */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-700">
            Research Architecture
          </p>

          <h3 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">
            From intellectual sources to global legal theory
          </h3>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              {
                title: "Historical Sources",
                text: "Malay manuscripts, legal texts, archives, and intellectual history.",
              },
              {
                title: "Conceptual Reconstruction",
                text: "Ethics, justice, responsibility, authority, and accountability.",
              },
              {
                title: "Legal Framework",
                text: "Constitutional, private, environmental, and institutional responsibility.",
              },
              {
                title: "Global Contribution",
                text: "Comparative law, indigenous constitutionalism, and legal theory.",
              },
            ].map((stage) => (
              <div
                key={stage.title}
                className="rounded-2xl bg-slate-50 p-6"
              >
                <h4 className="font-bold text-slate-950">{stage.title}</h4>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {stage.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}