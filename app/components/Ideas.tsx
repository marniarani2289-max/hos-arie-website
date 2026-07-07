export default function Ideas() {
  const ideas = [
    {
      title: "Malay Ethical Constitutionalism",
      description:
        "Reconstructing Raja Ali Haji's constitutional thought as an ethical tradition of governance rooted in justice, consultation, accountability, and moral authority.",
      category: "Constitutional Theory",
    },
    {
      title: "Beyond Western Constitutionalism",
      description:
        "Expanding constitutional scholarship by integrating intellectual traditions from the Malay world into global constitutional discourse.",
      category: "Comparative Constitutional Law",
    },
    {
      title: "Corrective Justice and Vicarious Liability",
      description:
        "Developing a normative framework for institutional responsibility based on corrective justice and correlativity in Indonesian civil law.",
      category: "Private Law",
    },
    {
      title: "Law, Language, and Civilization",
      description:
        "Examining the relationship between language, legal culture, and the construction of Malay civilization through the works of Raja Ali Haji.",
      category: "Malay Studies",
    },
    {
      title: "Future of Malay Civilization",
      description:
        "Ideas for strengthening education, research, manuscript preservation, and digital humanities as foundations for the future of Malay civilization.",
      category: "Civilizational Studies",
    },
    {
      title: "Environmental Justice",
      description:
        "Exploring the relationship between environmental protection, benefit sharing, and sustainable governance for future generations.",
      category: "Environmental Law",
    },
  ];

  return (
    <section id="ideas" className="bg-white py-28 px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
          Ideas
        </p>

        <h2 className="mt-4 text-5xl font-extrabold text-gray-900">
          Ideas & Reflections
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          A collection of research ideas, constitutional reflections, and
          intellectual projects that shape my academic journey and contribute to
          contemporary debates in law, governance, and Malay civilization.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <div
              key={idea.title}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
                {idea.category}
              </span>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {idea.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {idea.description}
              </p>

              <button className="mt-8 rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-amber-700">
  Read More →
</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}