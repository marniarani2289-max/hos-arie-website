import Card from "../shared/Card";
import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";

const researchAreas = [
  {
    title: "Constitutional Theory",
    description:
      "Constitutional accountability, justice, interpretation, institutions, and ethical governance.",
  },
  {
    title: "Malay Constitutional Thought",
    description:
      "Raja Ali Haji, Malay Ethical Constitutionalism, political thought, and intellectual history.",
  },
  {
    title: "Indigenous Constitutionalism",
    description:
      "Local constitutional traditions, comparative theory, and decolonising legal knowledge.",
  },
  {
    title: "Governance, Ethics & Responsibility",
    description:
      "Institutional responsibility, public ethics, accountability, and the moral limits of authority.",
  },
];

export default function ResearchIdentity() {
  return (
    <section className="bg-slate-50 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Research Identity"
          title="Four research pillars"
          description="My scholarship brings together constitutional theory, Malay intellectual history, indigenous constitutionalism, governance, ethics, and institutional responsibility."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {researchAreas.map((area) => (
            <Card key={area.title}>
              <div className="h-1 w-12 rounded-full bg-amber-700" />

              <h3 className="font-academic mt-7 text-2xl font-bold text-slate-950 sm:text-3xl">
                {area.title}
              </h3>

              <p className="mt-5 leading-7 text-slate-600">
                {area.description}
              </p>

              <a
                href="/research"
                className="mt-7 inline-flex text-sm font-semibold text-amber-700 transition hover:text-amber-900"
              >
                Explore Research →
              </a>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}