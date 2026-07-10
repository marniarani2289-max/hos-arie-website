export default function AcademicCV() {
  const sections = [
    {
      title: "Education",
      items: [
        "Doctor of Islamic Law, Universitas Islam Negeri Sultan Thaha Saifuddin Jambi, 2025",
        "Master of Law, Universitas Lampung, 2009",
        "Bachelor of Law, Universitas Lampung, 2005",
      ],
    },
    {
      title: "Academic Experience",
      items: [
        "More than 20 years of teaching experience in undergraduate and postgraduate programmes",
        "Lecturer, researcher, speaker, and academic mentor",
        "Active in legal education, public lectures, seminars, and scholarly collaboration",
      ],
    },
    {
      title: "Research Areas",
      items: [
        "Constitutional Law",
        "Comparative Constitutional Theory",
        "Indigenous Constitutionalism",
        "Malay Ethical Constitutionalism",
        "Raja Ali Haji and Malay Intellectual History",
        "Islamic Constitutional Thought",
        "Legal History",
        "Governance and Public Ethics",
      ],
    },
    {
      title: "Selected Academic Roles",
      items: [
        "Founder and Executive Director, Raja Ali Haji Research Network",
        "Lecturer and researcher in constitutional law and Malay intellectual history",
        "Contributor to academic seminars, conferences, and public scholarship",
      ],
    },
    {
      title: "Current Research Projects",
      items: [
        "Reconstructing Indigenous Constitutionalism in Indonesia",
        "Malay Ethical Constitutionalism",
        "Raja Ali Haji and Constitutional Accountability",
        "Vicarious Liability and Corrective Justice",
      ],
    },
    {
      title: "Publications and Writing",
      items: [
        "Journal articles in law, constitutional theory, and Malay studies",
        "Conference papers on Raja Ali Haji, ethical governance, and constitutional accountability",
        "Academic essays, opinion pieces, and research notes",
      ],
    },
    {
      title: "Conference and Academic Engagement",
      items: [
        "International conference presentations on law, governance, and Malay civilisation",
        "Invited lectures, keynote speeches, and academic seminars",
        "Research workshops and policy dialogues",
      ],
    },
    {
      title: "Academic Profiles",
      links: [
        {
          label: "Google Scholar",
          href: "https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=id",
        },
        {
          label: "ORCID",
          href: "#",
        },
        {
          label: "Scopus",
          href: "#",
        },
        {
          label: "ResearchGate",
          href: "#",
        },
      ],
    },
  ];

  return (
    <section id="academic-cv" className="bg-gray-50 px-6 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
          Academic Profile
        </p>

        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
              Academic Curriculum Vitae
            </h2>

            <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-600">
              My academic work focuses on constitutional law, comparative
              constitutional theory, indigenous constitutionalism, Malay
              intellectual history, and governance. My current research
              reconstructs the constitutional thought of Raja Ali Haji and
              develops <strong>Malay Ethical Constitutionalism</strong> as a
              contribution to global constitutional scholarship.
            </p>
          </div>

          <a
            href="/academic-cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit rounded-xl bg-gray-950 px-6 py-4 font-semibold text-white transition hover:bg-amber-700"
          >
            Download Full CV
          </a>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold text-gray-900">
                {section.title}
              </h3>

              {"items" in section && section.items && (
                <ul className="mt-6 space-y-4 text-gray-600">
                  {section.items.map((item) => (
                    <li key={item} className="leading-7">
                      <span className="mr-2 text-amber-700">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {"links" in section && section.links && (
                <div className="mt-6 space-y-3">
                  {section.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl border border-gray-200 px-4 py-3 text-gray-700 transition hover:border-amber-700 hover:text-amber-800"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}