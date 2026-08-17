const researchAreas = [
  "Constitutional Theory",
  "Comparative Constitutional Law",
  "Indigenous Constitutionalism",
  "Malay Ethical Constitutionalism",
  "Raja Ali Haji and Malay Intellectual History",
  "Islamic Constitutional Thought",
  "Legal History",
  "Governance and Public Ethics",
];

const education = [
  {
    degree: "Doctor of Islamic Law",
    institution: "Universitas Islam Negeri Sultan Thaha Saifuddin Jambi",
    year: "2025",
  },
  {
    degree: "Master of Law",
    institution: "Faculty of Law, Universitas Lampung",
    year: "2009",
  },
  {
    degree: "Bachelor of Law",
    institution: "Faculty of Law, Universitas Lampung",
    year: "2005",
  },
];

const appointments = [
  {
    role: "Senior Lecturer",
    institution: "Faculty of Law, Universitas Maritim Raja Ali Haji",
    period: "Current",
  },
  {
    role: "Founder & Executive Director",
    institution: "Raja Ali Haji Research Network",
    period: "Current",
  },
];

const projects = [
  {
    title: "Malay Ethical Constitutionalism",
    description:
      "A long-term research programme reconstructing constitutional reasoning from the nineteenth-century Malay world.",
  },
  {
    title: "Reconstructing Indigenous Constitutionalism in Indonesia",
    description:
      "Raja Ali Haji, colonial modernity, and constitutional governance in the Riau-Lingga Sultanate.",
  },
  {
    title: "Raja Ali Haji and Constitutional Accountability",
    description:
      "Research on justice, consultation, ethical authority, and the moral limits of political power.",
  },
  {
    title: "Vicarious Liability and Corrective Justice",
    description:
      "Comparative private law research on employer liability, attribution, and corrective justice.",
  },
];

export default function AcademicCV() {
  return (
    <section id="academic-cv" className="bg-white px-6 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Academic Profile
            </p>

            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
              Dr. Hos Arie Rhamadhan Sibarani
            </h2>

            <p className="mt-4 text-xl font-semibold leading-8 text-slate-800">
              Constitutional Law Scholar
            </p>

            <p className="mt-5 leading-7 text-slate-600">
              Senior Lecturer at the Faculty of Law, Universitas Maritim Raja
              Ali Haji, and Founder & Executive Director of the Raja Ali Haji
              Research Network.
            </p>

            <div className="mt-8 border-l-4 border-amber-700 pl-5">
              <p className="text-lg italic leading-8 text-slate-700">
                Recovering constitutional thought from the Malay world and
                bringing it into global constitutional scholarship.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/academic-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-amber-700"
              >
                Download Academic CV
              </a>

              <a
                href="https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-300 px-6 py-4 font-semibold text-slate-800 transition hover:border-amber-700 hover:text-amber-800"
              >
                Google Scholar
              </a>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
                Research Identity
              </h3>

              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-slate-900">
                    Primary Field
                  </dt>
                  <dd className="mt-1 text-slate-600">
                    Constitutional Theory
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-slate-900">
                    Regional Specialisation
                  </dt>
                  <dd className="mt-1 text-slate-600">The Malay World</dd>
                </div>

                <div>
                  <dt className="font-semibold text-slate-900">Core Concept</dt>
                  <dd className="mt-1 text-slate-600">
                    Malay Ethical Constitutionalism
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-slate-900">
                    Historical Focus
                  </dt>
                  <dd className="mt-1 text-slate-600">
                    Raja Ali Haji and the Riau-Lingga Sultanate
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          <div>
            <section>
              <SectionHeading
                eyebrow="Biography"
                title="Academic Biography"
              />

              <div className="mt-7 space-y-5 text-lg leading-8 text-slate-600">
                <p>
                  Dr. Hos Arie Rhamadhan Sibarani is an Indonesian
                  constitutional law scholar whose research examines
                  constitutional theory, comparative constitutional law, legal
                  history, and governance in the nineteenth-century Malay
                  world.
                </p>

                <p>
                  His current work reconstructs the constitutional thought of
                  Raja Ali Haji and develops{" "}
                  <strong className="font-semibold text-slate-900">
                    Malay Ethical Constitutionalism
                  </strong>{" "}
                  as a conceptual framework for understanding authority,
                  justice, consultation, accountability, public responsibility,
                  and the ethical limitation of political power.
                </p>

                <p>
                  Through this research, he seeks to broaden the intellectual
                  foundations of Indonesian constitutional scholarship and to
                  position constitutional thought from the Malay world within
                  contemporary debates on indigenous constitutionalism,
                  constitutional pluralism, and global constitutional theory.
                </p>
              </div>
            </section>

            <Divider />

            <section>
              <SectionHeading
                eyebrow="Fields"
                title="Research Areas"
              />

              <div className="mt-7 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {researchAreas.map((area) => (
                  <div
                    key={area}
                    className="border-b border-slate-200 pb-4 text-slate-700"
                  >
                    {area}
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            <section>
              <SectionHeading
                eyebrow="Appointments"
                title="Academic Appointments"
              />

              <div className="mt-8 space-y-8">
                {appointments.map((appointment) => (
                  <TimelineItem
                    key={`${appointment.role}-${appointment.institution}`}
                    title={appointment.role}
                    subtitle={appointment.institution}
                    meta={appointment.period}
                  />
                ))}
              </div>
            </section>

            <Divider />

            <section>
              <SectionHeading eyebrow="Education" title="Academic Education" />

              <div className="mt-8 space-y-8">
                {education.map((item) => (
                  <TimelineItem
                    key={`${item.degree}-${item.year}`}
                    title={item.degree}
                    subtitle={item.institution}
                    meta={item.year}
                  />
                ))}
              </div>
            </section>

            <Divider />

            <section>
              <SectionHeading
                eyebrow="Current Work"
                title="Research Projects"
              />

              <div className="mt-8 space-y-10">
                {projects.map((project, index) => (
                  <article
                    key={project.title}
                    className="grid gap-4 border-b border-slate-200 pb-8 md:grid-cols-[70px_1fr]"
                  >
                    <div className="text-sm font-bold text-amber-700">
                      0{index + 1}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-950">
                        {project.title}
                      </h3>
                      <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                        {project.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <Divider />

            <section>
              <SectionHeading
                eyebrow="Leadership"
                title="Academic Leadership"
              />

              <div className="mt-7 border-l-4 border-amber-700 pl-6">
                <h3 className="text-2xl font-bold text-slate-950">
                  Raja Ali Haji Research Network
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  The network promotes interdisciplinary research, publication,
                  digital scholarship, and international collaboration on Raja
                  Ali Haji, Malay constitutional thought, legal history,
                  governance, and Southeast Asian intellectual traditions.
                </p>
              </div>
            </section>

            <Divider />

            <section>
              <SectionHeading
                eyebrow="Profiles"
                title="Academic Links"
              />

              <div className="mt-7 flex flex-wrap gap-3">
                <AcademicLink
                  href="https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=en"
                  label="Google Scholar"
                />
                <AcademicLink
                  href="https://www.hossibarani.com"
                  label="Personal Website"
                />
                <AcademicLink
                  href="/academic-cv.pdf"
                  label="Academic CV"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function TimelineItem({
  title,
  subtitle,
  meta,
}: {
  title: string;
  subtitle: string;
  meta: string;
}) {
  return (
    <article className="grid gap-3 border-l-2 border-amber-700 pl-6 md:grid-cols-[1fr_auto] md:items-start">
      <div>
        <h3 className="text-xl font-bold text-slate-950">{title}</h3>
        <p className="mt-2 leading-7 text-slate-600">{subtitle}</p>
      </div>

      <p className="text-sm font-semibold text-amber-700">{meta}</p>
    </article>
  );
}

function AcademicLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:border-amber-700 hover:bg-amber-50 hover:text-amber-800"
    >
      {label}
    </a>
  );
}

function Divider() {
  return <div className="my-16 border-t border-slate-200" />;
}
