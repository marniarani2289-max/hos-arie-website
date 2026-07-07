export default function Books() {
  const books = [
    {
      title: "Malay Ethical Constitutionalism",
      status: "Monograph Project",
      description:
        "A scholarly work on Raja Ali Haji, ethical governance, justice, accountability, and Malay constitutional thought.",
    },
    {
      title: "Raja Ali Haji and Malay Civilization",
      status: "Book Project",
      description:
        "Exploring Raja Ali Haji’s intellectual legacy in language, law, governance, ethics, and Malay civilization.",
    },
    {
      title: "Vicarious Liability and Corrective Justice",
      status: "Research Monograph",
      description:
        "A private law project on institutional responsibility, civil liability, and corrective justice in Indonesian law.",
    },
  ];

  return (
    <section id="books" className="bg-white px-8 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
          Books
        </p>

        <h2 className="mt-4 text-4xl font-extrabold text-gray-950">
          Books & Monograph Projects
        </h2>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
          Selected book projects, monographs, and long-term scholarly works.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {books.map((book) => (
            <div
              key={book.title}
              className="rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
                {book.status}
              </p>

              <h3 className="mt-4 text-2xl font-bold text-gray-950">
                {book.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {book.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}