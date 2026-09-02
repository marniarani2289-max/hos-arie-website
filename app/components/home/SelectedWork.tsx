import Link from "next/link";

const selectedWorks = [
  {
    type: "Public Research Framework",
    year: "2026",
    title: "Malay Ethical Constitutionalism",
    description:
      "A documented research programme with primary sources, methodology, five constitutional principles, progress, and planned scholarly outputs.",
    href: "/research/malay-ethical-constitutionalism",
    action: "Open the framework",
  },
  {
    type: "Completed Learning Programme",
    year: "2026",
    title: "Program Dasar Pemikiran Raja Ali Haji",
    description:
      "Eight available self-paced modules combining readings, podcasts, reflection, essays, quizzes, saved progress, and certification.",
    href: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji",
    action: "Review all modules",
  },
  {
    type: "Published Doctoral Research",
    year: "2025",
    title: "The Riau-Lingga Sultanate in the Perspective of Maqasid al-Shariah",
    description:
      "Doctoral research examining Raja Ali Haji’s principal works as sources of ethical, political, legal, and governmental thought.",
    href: "/publications",
    action: "View publication record",
  },
];

export default function SelectedWork() {
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
              Verifiable Work
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Work that can be opened, reviewed, and verified
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Publicly accessible research, completed learning materials, and
              documented academic work—not claims without an evidence trail.
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
                {work.action}
                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-slate-950 p-8 text-white md:flex md:items-center md:justify-between md:gap-10 md:p-10"><div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Build the next serious work together</p><h3 className="font-academic mt-3 text-3xl font-bold">Research, teaching, and institutional collaboration</h3><p className="mt-4 leading-7 text-slate-300">For universities, research networks, government institutions, journals, and public-learning partners seeking a substantive collaboration.</p></div><Link href="/start#collaborate" className="mt-7 inline-flex shrink-0 rounded-xl bg-amber-400 px-6 py-3.5 font-bold text-slate-950 hover:bg-amber-300 md:mt-0">Propose a collaboration →</Link></div>
      </div>
    </section>
  );
}
