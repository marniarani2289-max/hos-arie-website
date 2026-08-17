import Link from "next/link";

const books = [
  {
    title: "Raja Ali Haji and Constitutional Thought",
    subtitle:
      "Ethical Government, Public Duty, and the Malay Constitutional Tradition",
    description:
      "A reconstruction of Raja Ali Haji as a constitutional thinker whose works articulate principles of ethical government, public responsibility, consultation, justice, and the moral limits of power.",
    status: "In Writing",
    year: "2027",
    category: "Malay Studies",
    coverClass:
      "from-emerald-950 via-emerald-900 to-slate-950",
    accentClass: "bg-amber-100 text-amber-800",
  },
  {
    title: "Gurindam Dua Belas as Constitutional Ethics",
    subtitle:
      "Language, Morality, Leadership, and Public Responsibility",
    description:
      "An interdisciplinary monograph examining Gurindam Dua Belas as a source of constitutional ethics and public morality in the intellectual tradition of the Malay world.",
    status: "In Preparation",
    year: "2028",
    category: "Constitutional Ethics",
    coverClass:
      "from-stone-950 via-amber-950 to-stone-900",
    accentClass: "bg-violet-100 text-violet-800",
  },
];

const roadmap = [
  {
    year: "2026",
    title: "Malay Constitutional Thought",
    status: "Concept Development",
  },
  {
    year: "2027",
    title: "Malay Ethical Constitutionalism",
    status: "Main Manuscript",
  },
  {
    year: "2028",
    title: "Raja Ali Haji Reader",
    status: "Planned",
  },
  {
    year: "2029",
    title: "Indigenous Constitutionalism",
    status: "Planned",
  },
  {
    year: "2030",
    title: "Constitutional Traditions of the Malay World",
    status: "Long-term Project",
  },
];

export default function Books() {
  return (
    <section
      id="books"
      className="relative overflow-hidden bg-stone-50 py-24 sm:py-28"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-amber-100/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-slate-200/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            Scholarly Works
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Books &amp; Monographs
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Books and long-form research projects exploring constitutional
            law, indigenous constitutionalism, Malay intellectual history,
            private law, and the constitutional thought of Raja Ali Haji.
          </p>
        </div>

        {/* Featured monograph */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            {/* Featured cover */}
            <div className="relative min-h-[460px] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-10 sm:p-14">
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-white/10" />
              <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full border border-white/10" />

              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
                    Forthcoming Monograph
                  </p>

                  <div className="mt-12 h-px w-16 bg-amber-400" />

                  <h3 className="mt-8 max-w-sm text-4xl font-semibold leading-tight text-white sm:text-5xl">
                    Malay Ethical Constitutionalism
                  </h3>

                  <p className="mt-5 max-w-sm text-lg leading-7 text-slate-300">
                    A Constitutional Theory from the Malay World
                  </p>
                </div>

                <div className="mt-16">
                  <p className="text-sm font-medium text-white">
                    Dr. Hos Arie Sibarani
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Constitutional Law Scholar
                  </p>
                </div>
              </div>
            </div>

            {/* Featured content */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
                  In Writing
                </span>

                <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Expected 2027
                </span>
              </div>

              <p className="mt-8 text-lg leading-8 text-slate-600">
                This monograph introduces{" "}
                <span className="font-semibold text-slate-900">
                  Malay Ethical Constitutionalism
                </span>{" "}
                as an indigenous constitutional framework rooted in the
                intellectual legacy of Raja Ali Haji and the constitutional
                tradition of the Riau–Lingga Sultanate.
              </p>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                It examines how concepts such as{" "}
                <span className="italic">
                  amanah, adab, musyawarah, justice,
                </span>{" "}
                and public responsibility may enrich contemporary
                constitutional theory beyond predominantly Western
                intellectual traditions.
              </p>

              <dl className="mt-10 grid gap-6 border-y border-slate-200 py-8 sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Field
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-900">
                    Constitutional Theory
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-900">
                    Manuscript Development
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Language
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-900">
                    English
                  </dd>
                </div>
              </dl>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/research/malay-ethical-constitutionalism"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
                >
                  Explore the Project
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-amber-700 hover:text-amber-700"
                >
                  Academic Enquiries
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Other manuscripts */}
        <div className="mt-24">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                Current Manuscripts
              </p>

              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Books in Development
              </h3>
            </div>

            <p className="max-w-xl text-base leading-7 text-slate-600">
              Long-form academic projects arising from ongoing research,
              teaching, archival study, and comparative legal analysis.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {books.map((book) => (
              <article
                key={book.title}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Book cover */}
                <div
                  className={`relative flex min-h-[390px] flex-col justify-between overflow-hidden bg-gradient-to-br p-8 ${book.coverClass}`}
                >
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/10" />
                  <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full border border-white/10" />

                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                      {book.category}
                    </p>

                    <div className="mt-8 h-px w-12 bg-amber-400" />

                    <h4 className="mt-7 text-3xl font-semibold leading-tight text-white">
                      {book.title}
                    </h4>

                    <p className="mt-5 text-sm leading-6 text-white/70">
                      {book.subtitle}
                    </p>
                  </div>

                  <div className="relative mt-12 border-t border-white/15 pt-5">
                    <p className="text-sm font-medium text-white">
                      Hos Arie Sibarani
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
                      Scholarly Monograph
                    </p>
                  </div>
                </div>

                {/* Book information */}
                <div className="p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${book.accentClass}`}
                    >
                      {book.status}
                    </span>

                    <span className="text-sm font-medium text-slate-500">
                      {book.year}
                    </span>
                  </div>

                  <p className="mt-6 text-sm leading-7 text-slate-600">
                    {book.description}
                  </p>

                  <Link
                    href="/contact"
                    className="mt-7 inline-flex items-center text-sm font-semibold text-slate-900 transition group-hover:text-amber-700"
                  >
                    View Project
                    <span
                      aria-hidden="true"
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div className="mt-24 rounded-3xl bg-slate-950 px-7 py-12 text-white sm:px-10 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
                Academic Legacy
              </p>

              <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Book Roadmap
              </h3>

              <p className="mt-5 max-w-md leading-7 text-slate-300">
                A long-term scholarly publication programme connecting
                constitutional law, Malay intellectual history, legal theory,
                and indigenous constitutionalism.
              </p>
            </div>

            <div className="space-y-2">
              {roadmap.map((item, index) => (
                <div
                  key={`${item.year}-${item.title}`}
                  className="group grid gap-3 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[90px_1fr_auto] sm:items-center"
                >
                  <span className="text-xl font-bold text-amber-400">
                    {item.year}
                  </span>

                  <div className="flex items-start gap-4">
                    <span className="mt-2 hidden h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400 sm:block" />

                    <div>
                      <p className="font-semibold text-white transition group-hover:text-amber-300">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Project {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>
                  </div>

                  <span className="w-fit rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-slate-300">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Research summary */}
        <div className="mt-16 grid overflow-hidden rounded-3xl border border-slate-200 bg-white sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-slate-200 p-8 sm:border-r lg:border-b-0">
            <p className="text-4xl font-bold text-slate-950">4</p>
            <p className="mt-2 text-sm font-medium text-slate-600">
              Active Book Projects
            </p>
          </div>

          <div className="border-b border-slate-200 p-8 lg:border-b-0 lg:border-r">
            <p className="text-4xl font-bold text-slate-950">3</p>
            <p className="mt-2 text-sm font-medium text-slate-600">
              Core Research Fields
            </p>
          </div>

          <div className="border-b border-slate-200 p-8 sm:border-b-0 sm:border-r">
            <p className="text-4xl font-bold text-slate-950">20+</p>
            <p className="mt-2 text-sm font-medium text-slate-600">
              Years of Teaching
            </p>
          </div>

          <div className="p-8">
            <p className="text-4xl font-bold text-slate-950">2045</p>
            <p className="mt-2 text-sm font-medium text-slate-600">
              Academic Legacy Horizon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}