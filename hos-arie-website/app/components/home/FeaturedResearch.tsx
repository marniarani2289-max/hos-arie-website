import Link from "next/link";
import Card from "../shared/Card";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";

const featuredResearch = [
  {
    category: "Flagship Programme",
    title: "Malay Ethical Constitutionalism",
    description:
      "A reconstruction of constitutional thought from the Malay intellectual tradition, especially the works of Raja Ali Haji, with emphasis on amanah, adab, justice, consultation, accountability, and public responsibility.",
    themes: [
      "Raja Ali Haji",
      "Constitutional Ethics",
      "Indigenous Constitutionalism",
    ],
    href: "/research/malay-ethical-constitutionalism",
    status: "Ongoing",
  },
  {
    category: "Constitutional Thought",
    title: "Raja Ali Haji and Constitutional Accountability",
    description:
      "This research examines Raja Ali Haji as a constitutional thinker and reconstructs his ideas concerning the duties of rulers, limits of authority, consultation, justice, and ethical governance.",
    themes: [
      "Malay Intellectual History",
      "Accountability",
      "Ethical Governance",
    ],
    href: "/raja-ali-haji",
    status: "Current Research",
  },
  {
    category: "Governance & Responsibility",
    title: "Institutional Responsibility and Accountability",
    description:
      "Exploring institutional responsibility, public accountability, governance ethics, and the legal principles governing organisational responsibility across constitutional institutions and public governance.",
    themes: [
      "Institutional Responsibility",
      "Governance Ethics",
      "Public Accountability",
    ],
    href: "/research",
    status: "Research Programme",
  },
];

export default function FeaturedResearch() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured Research"
            title="Selected research programmes"
            description="Current projects that define my academic agenda across constitutional theory, Malay intellectual history, indigenous constitutionalism, governance, ethics, and institutional responsibility."
          />

          <Link
            href="/research"
            className="inline-flex w-fit items-center text-sm font-semibold text-amber-700 transition hover:text-amber-900"
          >
            View all research
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {featuredResearch.map((project, index) => (
            <Card key={project.title}>
              <article className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
                    {project.category}
                  </span>

                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                    {project.status}
                  </span>
                </div>

                <div className="mt-7 flex items-center gap-4">
                  <span className="font-academic text-4xl font-bold text-amber-700/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <h3 className="font-academic mt-7 text-2xl font-bold leading-tight text-slate-950 sm:text-3xl">
                  {project.title}
                </h3>

                <p className="mt-5 flex-1 leading-7 text-slate-600">
                  {project.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {project.themes.map((theme) => (
                    <span
                      key={theme}
                      className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800"
                    >
                      {theme}
                    </span>
                  ))}
                </div>

                <div className="mt-8 border-t border-slate-200 pt-6">
                  <Link
                    href={project.href}
                    className="inline-flex items-center text-sm font-semibold text-slate-950 transition hover:text-amber-700"
                  >
                    Explore project
                    <span className="ml-2" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}