<div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 md:grid-cols-4 md:gap-5">
  {[
    {
      title: "Constitutional Theory",
      description:
        "Exploring authority, legitimacy, accountability, and the ethical limits of power.",
    },
    {
      title: "Malay Ethical Constitutionalism",
      description:
        "Developing a conceptual framework rooted in Malay political and intellectual traditions.",
    },
    {
      title: "Raja Ali Haji Studies",
      description:
        "Reconstructing constitutional thought from the nineteenth-century Riau-Lingga Sultanate.",
    },
    {
      title: "Comparative Constitutional Law",
      description:
        "Bringing Southeast Asian constitutional traditions into global scholarly debates.",
    },
  ].map((item) => (
    <article
      key={item.title}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
    >
      <div className="mb-4 h-1 w-10 rounded-full bg-amber-700" />

      <h3 className="text-lg font-bold leading-6 text-slate-950">
        {item.title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {item.description}
      </p>
    </article>
  ))}
</div>