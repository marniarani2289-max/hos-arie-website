type Publication = {
  year: string;
  title: string;
  type: string;
  outlet: string;
  description?: string;
  href?: string;
  featured?: boolean;
};

const publications: Publication[] = [
  {
    year: "2026",
    title:
      "Reconstructing Indigenous Constitutionalism in Indonesia: Raja Ali Haji, Colonial Modernity and Constitutional Governance in the Malay World",
    type: "Research Project",
    outlet: "Ibrahim Sjarief Assegaf Fellowship Proposal",
    description:
      "A legal-constitutional reconstruction of Raja Ali Haji’s political thought and its contribution to indigenous and comparative constitutionalism.",
    href: "/raja-ali-haji",
    featured: true,
  },
  {
    year: "2026",
    title: "Malay Ethical Constitutionalism",
    type: "Working Paper",
    outlet: "Comparative Constitutional Theory",
    description:
      "A conceptual framework grounded in Malay political institutions, Islamic legal traditions, ethical governance, and constitutional accountability.",
    href: "/#research",
    featured: true,
  },
  {
    year: "2025",
    title:
      "The Riau-Lingga Sultanate in the Perspective of Maqasid al-Shariah",
    type: "Doctoral Research",
    outlet: "UIN Sultan Thaha Saifuddin Jambi",
    description:
      "Research on Muqaddimah fi Intizam Waza'if al-Malik, Tsamarat al-Muhimmah, and Gurindam Dua Belas.",
  },
  {
    year: "2025",
    title: "Raja Ali Haji and Constitutional Accountability",
    type: "Conference Paper",
    outlet: "Malay Constitutional Thought",
    description:
      "An examination of justice, consultation, ethical leadership, public responsibility, and the limits of political power.",
  },
  {
    year: "2025",
    title: "Vicarious Liability and Corrective Justice",
    type: "Research Article",
    outlet: "Private Law and Civil Liability",
    description:
      "A comparative inquiry into attribution, employer liability, and corrective justice in civil law.",
  },
];

export default function Publications() {
  return (
    <section
      id="publications"
      className="border-y border-slate-200 bg-stone-50 px-6 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              Selected Publications
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Research and Scholarly Writing
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Selected research projects, working papers, conference papers,
              and scholarly writing on constitutional theory, Raja Ali Haji,
              Malay intellectual history, private law, and governance.
            </p>

            <a
              href="/academic-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-amber-700"
            >
              View Full Academic CV
            </a>
          </div>

          <div className="divide-y divide-slate-300 border-y border-slate-300">
            {publications.map((publication) => (
              <article
                key={`${publication.year}-${publication.title}`}
                className="grid gap-5 py-8 md:grid-cols-[80px_1fr_auto] md:items-start"
              >
                <div>
                  <p className="text-sm font-bold text-amber-700">
                    {publication.year}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {publication.type}
                    </p>

                    {publication.featured && (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-xl font-bold leading-8 text-slate-950 md:text-2xl">
                    {publication.title}
                  </h3>

                  <p className="mt-2 font-medium text-slate-700">
                    {publication.outlet}
                  </p>

                  {publication.description && (
                    <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                      {publication.description}
                    </p>
                  )}
                </div>

                <div className="md:pt-8">
                  {publication.href ? (
                    <a
                      href={publication.href}
                      className="inline-flex font-semibold text-amber-700 transition hover:text-amber-900"
                    >
                      Read →
                    </a>
                  ) : (
                    <span className="text-sm text-slate-400">Forthcoming</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}