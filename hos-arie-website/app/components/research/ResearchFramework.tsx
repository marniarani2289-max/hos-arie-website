const researchAreas = [
  {
    number: "01",
    title: "Constitutional Theory",
    description:
      "Examining constitutional authority, accountability, justice, institutional responsibility, and the normative foundations of public power.",
  },
  {
    number: "02",
    title: "Indigenous Constitutionalism",
    description:
      "Recovering constitutional ideas rooted in local intellectual traditions beyond dominant Western constitutional narratives.",
  },
  {
    number: "03",
    title: "Raja Ali Haji Studies",
    description:
      "Reconstructing Raja Ali Haji’s political, legal, ethical, and constitutional thought through Malay and Jawi texts.",
  },
  {
    number: "04",
    title: "Islamic Constitutional Thought",
    description:
      "Exploring amanah, justice, consultation, public welfare, leadership ethics, and the moral limits of political authority.",
  },
  {
    number: "05",
    title: "Comparative Constitutional Law",
    description:
      "Connecting Malay constitutional thought with broader debates in comparative constitutional law and global legal theory.",
  },
];

export default function ResearchFramework() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Main intellectual framework */}
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Intellectual Framework
            </p>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Building Malay Ethical Constitutionalism
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              My research develops Malay Ethical Constitutionalism as a
              framework for understanding constitutional authority through
              ethics, accountability, justice, public responsibility, and
              intellectual traditions originating in the Malay world.
            </p>

            <div className="mt-10 overflow-hidden rounded-3xl bg-slate-950 p-8 text-white shadow-xl sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                Central Research Programme
              </p>

              <h3 className="mt-5 text-3xl font-bold leading-tight">
                Malay Ethical
                <br />
                Constitutionalism
              </h3>

              <p className="mt-6 leading-7 text-slate-300">
                A research programme that places ethics, adab, amanah,
                consultation, justice, and accountability at the centre of
                constitutional thought.
              </p>

              <div className="mt-8 border-t border-slate-700 pt-6">
                <p className="text-sm leading-6 text-slate-400">
                  From Penyengat to global constitutional theory.
                </p>
              </div>
            </div>
          </div>

          {/* Research pillars */}
          <div className="space-y-5">
            {researchAreas.map((area) => (
              <article
                key={area.title}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:bg-white hover:shadow-lg sm:p-8"
              >
                <div className="flex gap-5">
                  <span className="text-sm font-bold text-amber-700">
                    {area.number}
                  </span>

                  <div>
                    <h3 className="text-xl font-bold text-slate-950 sm:text-2xl">
                      {area.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {area.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}