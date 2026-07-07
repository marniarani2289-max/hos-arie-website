export default function AcademicCV() {
  const sections = [
    {
      title: "Education",
      items: [
        "Doctoral Degree / Doctoral Research in Law and Islamic Legal Studies",
        "Master of Law",
        "Bachelor of Law",
      ],
    },
    {
      title: "Academic Experience",
      items: [
        "20+ years of teaching experience in undergraduate and postgraduate programs",
        "Lecturer, researcher, speaker, and academic mentor",
        "Active in legal education, public lectures, seminars, and scholarly collaboration",
      ],
    },
    {
      title: "Research Areas",
      items: [
        "Constitutional Theory",
        "Malay Ethical Constitutionalism",
        "Raja Ali Haji and Malay Intellectual History",
        "Private Law, Civil Liability, and Corrective Justice",
        "Environmental Law and Governance",
      ],
    },
    {
      title: "Selected Academic Roles",
      items: [
        "Founder, Raja Ali Haji Research Network",
        "Researcher in constitutional theory and Malay civilization",
        "Contributor to academic seminars, conferences, and public scholarship",
      ],
    },
    {
      title: "Publications & Writing",
      items: [
        "Journal articles in law, constitutional theory, and Malay studies",
        "Conference papers on Raja Ali Haji, ethical governance, and constitutional accountability",
        "Academic essays, opinion pieces, and research notes",
      ],
    },
    {
      title: "Conference & Talks",
      items: [
        "International conference presentations on law, governance, and Malay civilization",
        "Invited talks, keynote lectures, and academic seminars",
        "Public lectures on Raja Ali Haji, constitutionalism, and legal thought",
      ],
    },
    {
      title: "Professional & Public Engagement",
      items: [
        "Legal education and public scholarship",
        "Research networking and academic collaboration",
        "Media engagement and public intellectual contribution",
      ],
    },
    {
      title: "Current Research Projects",
      items: [
        "Malay Ethical Constitutionalism",
        "Raja Ali Haji and Constitutional Accountability",
        "Vicarious Liability and Corrective Justice",
        "Environmental Justice and Marine Genetic Resources",
      ],
    },
  ];

  return (
    <section id="academiccv" className="bg-gray-50 px-8 py-28">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
          Academic CV
        </p>

        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-5xl font-extrabold text-gray-900">
              Academic Curriculum Vitae
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              A comprehensive academic profile summarizing education, teaching,
              research, publications, talks, public engagement, and current
              scholarly projects.
            </p>
          </div>

          <a
            href="#"
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

              <ul className="mt-6 space-y-4 text-gray-600">
                {section.items.map((item) => (
                  <li key={item} className="leading-7">
                    <span className="mr-2 text-amber-700">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}