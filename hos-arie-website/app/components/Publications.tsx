type Publication = {
  year: string;
  title: string;
  category: string;
  outlet: string;
  description: string;
  href?: string;
  status?: "Published" | "Forthcoming" | "Working Paper" | "Research Project";
  featured?: boolean;
};

const publications: Publication[] = [
  {
    year: "2026",
    title:
      "Reconstructing Indigenous Constitutionalism in Indonesia: Raja Ali Haji, Colonial Modernity and Constitutional Governance in the Malay World",
    category: "Constitutional Law",
    outlet: "Ibrahim Sjarief Assegaf Fellowship Research Project",
    description:
      "A legal-constitutional reconstruction of Raja Ali Haji’s writings and their contribution to indigenous constitutionalism, comparative constitutional law, and contemporary Indonesian governance.",
    href: "/raja-ali-haji",
    status: "Research Project",
    featured: true,
  },
  {
    year: "2026",
    title: "Malay Ethical Constitutionalism",
    category: "Comparative Constitutional Theory",
    outlet: "Current Working Paper",
    description:
      "A conceptual framework grounded in Malay political institutions, Islamic legal traditions, ethical authority, consultation, public responsibility, and constitutional accountability.",
    href: "/#research",
    status: "Working Paper",
    featured: true,
  },
  {
    year: "2025",
    title:
      "The Riau-Lingga Sultanate in the Perspective of Maqasid al-Shariah",
    category: "Islamic Legal Thought",
    outlet: "Doctoral Research, UIN Sultan Thaha Saifuddin Jambi",
    description:
      "Research examining Muqaddimah fi Intizam Waza'if al-Malik, Tsamarat al-Muhimmah, and Gurindam Dua Belas as sources of ethical, political, and legal thought.",
    status: "Published",
  },
  {
    year: "2025",
    title: "Raja Ali Haji and Constitutional Accountability",
    category: "Malay Constitutional Thought",
    outlet: "Conference Paper",
    description:
      "An examination of justice, consultation, ethical leadership, public responsibility, and the moral limits of political power in Raja Ali Haji’s writings.",
    status: "Forthcoming",
  },
  {
    year: "2025",
    title: "Vicarious Liability and Corrective Justice",
    category: "Private Law",
    outlet: "Current Research",
    description:
      "A comparative inquiry into attribution, employer liability, control, course of employment, and corrective justice in civil law.",
    status: "Working Paper",
  },
];

const featuredPublications = publications.filter(
  (publication) => publication.featured
);

const otherPublications = publications.filter(
  (publication) => !publication.featured
);

export default function Publications() {
  return (
    <section
      id="publications"
      className="border-y border-slate-200 bg-stone-50 px-6 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              Selected Publications
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Research and Scholarly Writing
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Selected research projects, working papers, conference papers,
              and academic writing on constitutional theory, Raja Ali Haji,
              Malay intellectual history, private law, and governance.
            </p>

            <div className="mt-8 border-l-4 border-amber-700 pl-5">
              <p className="text-lg italic leading-8 text-slate-700">
                My scholarship seeks to recover overlooked constitutional
                traditions and bring them into dialogue with contemporary legal
                theory.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="/academic-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-amber-700"
              >
                View Full Academic CV
              </a>

              <a
                href="https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-800 transition hover:border-amber-700 hover:text-amber-800"
              >
                Google Scholar
              </a>
            </div>
          </div>

          <div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Featured Work
              </p>

              <div className="mt-5 grid gap-6">
                {featuredPublications.map((publication) => (
                  <FeaturedPublication
                    key={`${publication.year}-${publication.title}`}
                    publication={publication}
                  />
                ))}
              </div>
            </div>

            <div className="mt-16">
              <div className="flex flex-col justify-between gap-4 border-b border-slate-300 pb-5 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Additional Selected Work
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    Publications and Research Outputs
                  </h3>
                </div>

                <p className="text-sm text-slate-500">
                  Selected works by year
                </p>
              </div>

              <div className="divide-y divide-slate-300">
                {otherPublications.map((publication) => (
                  <PublicationRow
                    key={`${publication.year}-${publication.title}`}
                    publication={publication}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedPublication({
  publication,
}: {
  publication: Publication;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-9">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            Featured
          </span>

          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {publication.category}
          </span>
        </div>

        <span className="text-sm font-bold text-amber-700">
          {publication.year}
        </span>
      </div>

      <h3 className="mt-6 text-2xl font-bold leading-9 text-slate-950 md:text-3xl">
        {publication.title}
      </h3>

      <p className="mt-4 font-medium text-slate-700">
        {publication.outlet}
      </p>

      <p className="mt-5 text-lg leading-8 text-slate-600">
        {publication.description}
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <StatusBadge status={publication.status} />

        {publication.href && (
          <a
            href={publication.href}
            className="inline-flex font-semibold text-amber-700 transition hover:text-amber-900"
          >
            Read more →
          </a>
        )}
      </div>
    </article>
  );
}

function PublicationRow({
  publication,
}: {
  publication: Publication;
}) {
  return (
    <article className="grid gap-5 py-8 md:grid-cols-[80px_1fr_auto] md:items-start">
      <div>
        <p className="text-sm font-bold text-amber-700">
          {publication.year}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {publication.category}
          </p>

          <StatusBadge status={publication.status} />
        </div>

        <h3 className="mt-3 text-xl font-bold leading-8 text-slate-950 md:text-2xl">
          {publication.title}
        </h3>

        <p className="mt-2 font-medium text-slate-700">
          {publication.outlet}
        </p>

        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          {publication.description}
        </p>
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
          <span className="text-sm text-slate-400">
            Details forthcoming
          </span>
        )}
      </div>
    </article>
  );
}

function StatusBadge({
  status,
}: {
  status?: Publication["status"];
}) {
  if (!status) {
    return null;
  }

  const styles = {
    Published: "bg-emerald-100 text-emerald-800",
    Forthcoming: "bg-blue-100 text-blue-800",
    "Working Paper": "bg-slate-200 text-slate-700",
    "Research Project": "bg-violet-100 text-violet-800",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}