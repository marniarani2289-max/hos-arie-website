import Link from "next/link";

const programmeDetails = [
  {
    label: "Research Stage",
    value: "Conceptual and Comparative Development",
  },
  {
    label: "Primary Thinker",
    value: "Raja Ali Haji",
  },
  {
    label: "Primary Texts",
    value:
      "Tsamarat al-Muhimmah, Muqaddimah fi Intizam Waza’if al-Malik, and Gurindam Dua Belas",
  },
  {
    label: "Historical Context",
    value: "Nineteenth-Century Riau–Lingga Malay World",
  },
  {
    label: "Scholarly Contribution",
    value: "Indigenous and Comparative Constitutional Theory",
  },
];

const corePrinciples = [
  "Authority as moral trust",
  "Ethical limitation of power",
  "Justice and public welfare",
  "Consultation and accountability",
  "Language, character, and constitutional order",
];

export default function FeaturedResearch() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
            Featured Research
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            A flagship programme in Malay constitutional thought
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            The principal research programme reconstructs constitutional ideas
            from Raja Ali Haji&apos;s writings and positions the Malay world
            within contemporary global constitutional scholarship.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2.25rem] bg-slate-950 text-white shadow-2xl">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative overflow-hidden p-8 md:p-12 lg:p-16">
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border border-amber-400/10" />
              <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full border border-amber-400/20" />

              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-400 ring-1 ring-inset ring-amber-400/20">
                    Flagship Research Programme
                  </span>

                  <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
                    Active
                  </span>
                </div>

                <h3 className="mt-8 text-4xl font-bold tracking-tight md:text-6xl">
                  Malay Ethical Constitutionalism
                </h3>

                <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-300">
                  Recovering an indigenous constitutional tradition from Raja
                  Ali Haji&apos;s writings and the political-intellectual world
                  of the Riau–Lingga Sultanate.
                </p>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
                  This programme examines how authority, justice, consultation,
                  public responsibility, ethical conduct, and limitation of
                  power were understood within the nineteenth-century Malay
                  world.
                </p>

                <div className="mt-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-400">
                    Core Principles
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {corePrinciples.map((principle) => (
                      <div
                        key={principle}
                        className="rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4"
                      >
                        <p className="leading-7 text-slate-300">
                          {principle}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/research/malay-ethical-constitutionalism"
                    className="inline-flex items-center justify-center rounded-xl bg-amber-600 px-7 py-4 font-semibold text-white transition hover:bg-amber-500"
                  >
                    Explore the Full Research Project
                  </Link>

                  <Link
                    href="/research"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-7 py-4 font-semibold text-white transition hover:border-amber-400 hover:text-amber-400"
                  >
                    View All Research
                  </Link>
                </div>
              </div>
            </div>

            <aside className="border-t border-slate-800 bg-slate-900 p-8 md:p-12 lg:border-l lg:border-t-0 lg:p-14">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-400">
                Programme Profile
              </p>

              <dl className="mt-8">
                {programmeDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="border-t border-slate-800 py-6 first:border-t-0 first:pt-0"
                  >
                    <dt className="text-sm text-slate-500">
                      {detail.label}
                    </dt>

                    <dd className="mt-2 text-lg font-semibold leading-8 text-white">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">
                  Long-Term Objective
                </p>

                <p className="mt-4 leading-7 text-slate-300">
                  To establish Malay Ethical Constitutionalism as a recognised
                  contribution to indigenous, comparative, and global
                  constitutional theory.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}