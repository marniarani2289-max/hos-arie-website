import Link from "next/link";

const researchAreas = [
  {
    number: "01",
    title: "Constitutional Law",
    description:
      "Research on constitutional theory, constitutional accountability, limitation of power, democratic governance, and public institutions.",
    href: "/research",
  },
  {
    number: "02",
    title: "Malay Intellectual History",
    description:
      "Exploring legal, political, ethical, and intellectual traditions developed within the Malay world and their contemporary significance.",
    href: "/research",
  },
  {
    number: "03",
    title: "Malay Ethical Constitutionalism",
    description:
      "Developing an original constitutional framework reconstructed from Raja Ali Haji's political and ethical thought.",
    href: "/research/malay-ethical-constitutionalism",
  },
];

export default function ResearchAreas() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
            Research Areas
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Advancing constitutional thought through interdisciplinary research
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            My research explores constitutional law, Malay intellectual
            history, and the constitutional ideas of Raja Ali Haji to
            contribute to comparative constitutional scholarship and
            indigenous constitutionalism.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {researchAreas.map((area) => (
            <article
              key={area.title}
              className="group rounded-3xl border border-slate-200 bg-white p-10 transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl"
            >
              <p className="text-sm font-bold text-amber-700">
                {area.number}
              </p>

              <h3 className="mt-8 text-3xl font-bold tracking-tight text-slate-950">
                {area.title}
              </h3>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                {area.description}
              </p>

              <Link
                href={area.href}
                className="mt-10 inline-flex items-center font-semibold text-slate-950 transition group-hover:text-amber-700"
              >
                Explore this research area
                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}