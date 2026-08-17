export default function DigitalArchive() {
  const archives = [
    {
      title: "Raja Ali Haji Manuscripts",
      type: "Manuscript Archive",
      description:
        "A future digital collection of manuscripts, texts, and research materials related to Raja Ali Haji and the Malay intellectual tradition.",
    },
    {
      title: "Malay Ethical Constitutionalism",
      type: "Research Archive",
      description:
        "Working papers, essays, conference presentations, and notes on Malay Ethical Constitutionalism as a developing scholarly framework.",
    },
    {
      title: "Public Scholarship",
      type: "Media Archive",
      description:
        "Selected opinion pieces, media commentary, interviews, and public lectures on law, governance, education, and Malay civilization.",
    },
    {
      title: "Legal Research Notes",
      type: "Research Notes",
      description:
        "Research notes on constitutional theory, vicarious liability, corrective justice, environmental law, and Indonesian private law.",
    },
  ];

  return (
    <section id="digital-archive" className="scroll-mt-24 bg-gray-950 px-5 py-24 text-white sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
          Digital Archive
        </p>

        <h2 className="mt-4 text-5xl font-extrabold">
          Knowledge Archive
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
          A curated digital archive for manuscripts, research notes, public
          scholarship, and intellectual projects on law, governance, and Malay
          civilization.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {archives.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-amber-500/50 hover:bg-white/10"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
                {item.type}
              </p>

              <h3 className="mt-5 text-3xl font-bold">
                {item.title}
              </h3>

              <p className="mt-5 text-lg leading-8 text-gray-300">
                {item.description}
              </p>

              <p className="mt-8 inline-flex rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
                Collection in development
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
