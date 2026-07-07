export default function Research() {
  const researchAreas = [
    {
      title: "Constitutional Theory",
      description:
        "Malay Ethical Constitutionalism, Indigenous Constitutionalism, Comparative Constitutional Theory, Constitutional Accountability, and Ethical Governance.",
    },
    {
      title: "Private Law",
      description:
        "Vicarious Liability, Corrective Justice, Tort Law, Civil Liability, and Institutional Responsibility.",
    },
    {
      title: "Malay Studies",
      description:
        "Raja Ali Haji, Malay Intellectual History, Language, Literature, Political Thought, and Malay Civilization.",
    },
    {
      title: "Environmental Law",
      description:
        "Marine Genetic Resources, Benefit Sharing, Climate Justice, Sustainable Development, and Environmental Governance.",
    },
  ];

  return (
    <section
      id="research"
      className="bg-gray-50 py-28 px-8"
    >
      <div className="mx-auto max-w-7xl">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
          Research
        </p>

        <h2 className="mt-4 text-5xl font-extrabold text-gray-900">
          Research Interests
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          My research focuses on constitutional theory, private law,
          Malay intellectual history, and environmental governance,
          integrating legal scholarship with civilizational perspectives.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {researchAreas.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <h3 className="text-3xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}