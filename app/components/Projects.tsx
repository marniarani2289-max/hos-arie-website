export default function Projects() {
  const projects = [
    {
      title: "Malay Ethical Constitutionalism",
      status: "Current Project",
      year: "2026",
      description:
        "Developing a new framework of constitutional theory grounded in Raja Ali Haji's ethical thought.",
    },
    {
      title: "Melbourne Law School Fellowship",
      status: "Research Fellowship",
      year: "2026",
      description:
        "Comparative constitutional research on ethical governance and constitutional accountability.",
    },
    {
      title: "Raja Ali Haji Research Network",
      status: "Research Initiative",
      year: "Ongoing",
      description:
        "Building an international research ecosystem on Malay civilization and constitutional thought.",
    },
    {
      title: "Vicarious Liability Project",
      status: "Civil Law Research",
      year: "2026",
      description:
        "Developing a new attribution test based on corrective justice in Indonesian civil law.",
    },
  ];

  return (
    <section
      id="projects"
      className="bg-slate-50 px-8 py-28"
    >
      <div className="mx-auto max-w-7xl">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
          Research Projects
        </p>

        <h2 className="mt-4 text-5xl font-extrabold text-gray-900">
          Current Academic Projects
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          Current research initiatives, international collaborations,
          and long-term scholarly projects.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">

          {projects.map((project) => (

            <div
              key={project.title}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex items-center justify-between">

                <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
                  {project.status}
                </span>

                <span className="text-sm font-medium text-gray-500">
                  {project.year}
                </span>

              </div>

              <h3 className="mt-6 text-3xl font-bold leading-tight text-gray-900">
                {project.title}
              </h3>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                {project.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}