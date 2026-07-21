const researchAreas = [
  {
    title: "Constitutional Theory",
    description:
      "Constitutional Accountability, Constitutional Justice, Ethical Governance, Constitutional Interpretation, and Constitutional Institutions.",
    direction:
      "Developing constitutional theory that places justice, accountability, ethical authority, and public responsibility at the centre of constitutional government.",
  },
  {
    title: "Malay Constitutional Thought",
    description:
      "Raja Ali Haji, Malay Ethical Constitutionalism, Malay Political Thought, Malay Intellectual History, and Constitutional Ideas in the Malay World.",
    direction:
      "Reconstructing the legal, political, ethical, and constitutional dimensions of Malay intellectual traditions.",
  },
  {
    title: "Indigenous Constitutionalism",
    description:
      "Indigenous Constitutionalism, Comparative Constitutional Theory, Decolonising Constitutional Knowledge, Legal Traditions, and Global Constitutional Dialogue.",
    direction:
      "Connecting local constitutional traditions with comparative constitutional law and wider debates on decolonising legal knowledge.",
  },
  {
    title: "Governance, Ethics & Responsibility",
    description:
      "Institutional Responsibility, Public Ethics, Vicarious Liability, Administrative Accountability, Environmental Governance, and Civil Liability.",
    direction:
      "Examining how institutions, public authorities, and organisations should be held responsible for the consequences of their actions and activities.",
  },
];

const foundations = [
  "Amanah",
  "Adab",
  "Justice",
  "Consultation",
  "Accountability",
  "Public Responsibility",
];

const researchPathway = [
  {
    title: "Intellectual Sources",
    text: "Malay and Jawi manuscripts, legal texts, historical archives, judicial decisions, and contemporary governance problems.",
  },
  {
    title: "Conceptual Reconstruction",
    text: "Reconstructing ideas of authority, responsibility, justice, ethics, consultation, and accountability.",
  },
  {
    title: "Constitutional Framework",
    text: "Connecting constitutional theory, governance, institutional responsibility, legal history, and public ethics.",
  },
  {
    title: "Global Contribution",
    text: "Contributing to comparative constitutional law, indigenous constitutionalism, decolonial legal theory, and global constitutional thought.",
  },
];

export default function ResearchAreas() {
  return (
    <section
      id="research"
      className="border-y border-slate-200 bg-slate-50 px-6 py-24 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            Research Programme
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Building constitutional and legal theory from the Malay world
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            My research connects constitutional theory, Malay intellectual
            history, indigenous constitutionalism, governance, ethics, and
            institutional responsibility through a broader concern with
            justice, accountability, and civilizational knowledge.
          </p>
        </div>

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
              consultation, accountability, and public responsibility at the
              centre of constitutional thought.
            </p>

            <div className="mt-8 border-l-2 border-amber-500 pl-5">
              <p className="text-sm leading-7 text-slate-400">
                From Raja Ali Haji and the intellectual world of Penyengat to
                contemporary debates in comparative and indigenous
                constitutionalism.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 bg-slate-900 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              Normative Foundations
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {foundations.map((item) => (
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
                Developing an indigenous constitutional framework capable of
                contributing to global legal and constitutional theory.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {researchAreas.map((area) => (
            <article
              key={area.title}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl"
            >
              <div className="h-1 w-12 rounded-full bg-amber-600 transition-all duration-300 group-hover:w-20" />

              <h3 className="mt-7 text-2xl font-bold text-slate-950 sm:text-3xl">
                {area.title}
              </h3>

              <p className="mt-5 text-base leading-7 text-slate-600">
                {area.description}
              </p>

              <div className="mt-7 border-t border-slate-200 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                  Research Direction
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {area.direction}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-700">
            Research Architecture
          </p>

          <h3 className="mt-4 max-w-3xl text-2xl font-bold text-slate-950 sm:text-3xl">
            From intellectual sources to global constitutional theory
          </h3>

          <p className="mt-5 max-w-3xl leading-7 text-slate-600">
            The research programme begins with texts, archives, judicial
            decisions, and contemporary governance problems. It then
            reconstructs their underlying concepts before connecting them with
            wider debates in constitutional and legal theory.
          </p>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {researchPathway.map((stage, index) => (
              <div
                key={stage.title}
                className="relative rounded-2xl bg-slate-50 p-6"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                  {index + 1}
                </div>

                <h4 className="mt-5 text-lg font-bold text-slate-950">
                  {stage.title}
                </h4>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {stage.text}
                </p>

                {index < researchPathway.length - 1 && (
                  <span className="absolute -right-4 top-1/2 z-10 hidden text-2xl text-amber-700 xl:block">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}