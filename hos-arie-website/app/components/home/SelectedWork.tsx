import Link from "next/link";

const selectedWorks = [
  {
    type: "Flagship Research Programme",
    year: "2026",
    title: "Malay Ethical Constitutionalism",
    description:
      "An original framework reconstructing constitutional thought from Raja Ali Haji’s writings and the political-intellectual tradition of the Malay world.",
    href: "/research/malay-ethical-constitutionalism",
  },
  {
    type: "Constitutional Research",
    year: "2026",
    title: "Raja Ali Haji and Constitutional Accountability",
    description:
      "A study of authority, ethical government, duties of rulers, consultation, justice, accountability, and public responsibility.",
    href: "/research",
  },
  {
    type: "Comparative Constitutional Theory",
    year: "2026",
    title: "Indigenous Constitutionalism and Global Legal Thought",
    description:
      "A comparative inquiry into constitutional traditions developed beyond the dominant Western constitutional canon.",
    href: "/research",
  },
];

export default function SelectedWork() {
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
              Selected Work
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Current research and scholarly projects
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Selected projects representing the main directions of my current
              research in constitutional law, constitutional theory, Malay
              intellectual history, indigenous constitutionalism, and Raja Ali
              Haji studies.
            </p>
          </div>

          <Link
            href="/publications"
            className="inline-flex items-center font-semibold text-slate-950 transition hover:text-amber-700"
          >
            View All Publications
            <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="mt-16 divide-y divide-slate-200 border-y border-slate-200">
          {selectedWorks.map((work) => (
            <article
              key={work.title}
              className="group grid gap-6 py-10 md:grid-cols-[190px_1fr_auto] md:items-center"
            >
              <div>
                <p className="text-sm font-semibold leading-6 text-amber-700">
                  {work.type}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {work.year}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                  {work.title}
                </h3>

                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                  {work.description}
                </p>
              </div>

              <Link
                href={work.href}
                className="inline-flex items-center whitespace-nowrap font-semibold text-slate-900 transition group-hover:text-amber-700"
              >
                Read More
                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
              Research Orientation
            </p>

            <p className="mt-4 text-lg font-semibold leading-8 text-slate-950">
              Constitutional, comparative, and interdisciplinary
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
              Current Priority
            </p>

            <p className="mt-4 text-lg font-semibold leading-8 text-slate-950">
              International publication and framework development
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
              Long-Term Direction
            </p>

            <p className="mt-4 text-lg font-semibold leading-8 text-slate-950">
              Global recognition of Malay constitutional thought
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}