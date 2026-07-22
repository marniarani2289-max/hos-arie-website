const stages = [
  {
    title: "Intellectual Sources",
    items: [
      "Malay and Jawi manuscripts",
      "Raja Ali Haji’s works",
      "Riau–Lingga legal history",
    ],
  },
  {
    title: "Conceptual Reconstruction",
    items: [
      "Amanah",
      "Adab",
      "Justice",
      "Consultation",
      "Accountability",
    ],
  },
  {
    title: "Constitutional Framework",
    items: [
      "Limits of political power",
      "Duties of rulers",
      "Public responsibility",
    ],
  },
  {
    title: "Global Contribution",
    items: [
      "Indigenous constitutionalism",
      "Comparative constitutional theory",
      "Decolonising legal knowledge",
    ],
  },
];

export default function ResearchFlow() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
            Research Architecture
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            From historical sources to global constitutional theory
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            The research begins with Malay intellectual sources, reconstructs
            their constitutional concepts, and connects them with contemporary
            debates in law and governance.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stages.map((stage, index) => (
            <div
              key={stage.title}
              className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                {index + 1}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-950">
                {stage.title}
              </h3>

              <ul className="mt-5 space-y-3">
                {stage.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-slate-600"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {index < stages.length - 1 && (
                <span className="absolute -right-4 top-1/2 z-10 hidden text-2xl text-amber-700 xl:block">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}