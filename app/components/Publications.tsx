export default function Publications() {
  const publications = [
    {
      year: "2026",
      type: "Conference Paper",
      title:
        "Beyond Western Constitutionalism: Raja Ali Haji’s Theory of Constitutional Accountability and Ethical Governance in the Malay World",
      venue: "Comparative Constitutional Studies",
      keywords: ["Raja Ali Haji", "Constitutionalism", "Malay World"],
      status: "Manuscript in progress",
    },
    {
      year: "2026",
      type: "Journal Article",
      title:
        "Malay Ethical Constitutionalism: Authority, Justice, and Moral Governance in the Nineteenth-Century Malay World",
      venue: "Legal Theory and Malay Intellectual History",
      keywords: ["Ethical Governance", "Justice", "Constitutional Theory"],
      status: "Draft article",
    },
    {
      year: "2026",
      type: "Journal Article",
      title:
        "Vicarious Liability, Corrective Justice, and Institutional Responsibility in Indonesian Civil Law",
      venue: "Private Law and Tort Theory",
      keywords: ["Vicarious Liability", "Corrective Justice", "Civil Law"],
      status: "Ongoing research",
    },
    {
      year: "2026",
      type: "Environmental Law Paper",
      title:
        "Benefit Sharing as a Legal Instrument for Protecting Indonesia’s Marine Genetic Resources",
      venue: "Environmental Law and Marine Governance",
      keywords: ["Benefit Sharing", "Marine Genetic Resources", "Indonesia"],
      status: "Abstract stage",
    },
  ];

  return (
    <section id="publications" className="bg-gray-950 px-8 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
          Publications
        </p>

        <h2 className="mt-4 text-5xl font-extrabold">
          Selected Publications
        </h2>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
          Selected journal articles, conference papers, manuscripts, and
          ongoing research projects.
        </p>

        <div className="mt-12 space-y-6">
          {publications.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-amber-500/50 hover:bg-white/10"
            >
              <div className="flex flex-wrap gap-3 text-sm font-semibold text-amber-400">
                <span>{item.year}</span>
                <span>•</span>
                <span>{item.type}</span>
                <span>•</span>
                <span>{item.status}</span>
              </div>

              <h3 className="mt-4 text-2xl font-bold leading-snug">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-400">{item.venue}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-white/10 px-3 py-1 text-sm text-gray-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-xl bg-white px-5 py-3 font-semibold text-gray-950">
                  Abstract
                </button>

                <button className="rounded-xl border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10">
                  PDF
                </button>

                <button className="rounded-xl border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10">
                  Citation
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}