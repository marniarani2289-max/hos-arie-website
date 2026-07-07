export default function About() {
  const expertise = [
    "Constitutional Theory",
    "Malay Ethical Constitutionalism",
    "Civil Liability",
    "Environmental Law",
    "Legal Philosophy",
    "Malay Intellectual Heritage",
  ];

  return (
    <section id="about" className="bg-white px-8 py-28">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            About
          </p>

          <h2 className="mt-4 text-5xl font-extrabold leading-tight text-gray-950">
            Scholar of Law, Ethics, and Malay Civilization
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Dr. Hos Arie Sibarani is a legal scholar, educator, and researcher
            whose work bridges constitutional theory, civil liability,
            environmental law, and Malay intellectual traditions.
          </p>
        </div>

        <div className="space-y-6 text-lg leading-8 text-gray-600">
          <p>
            His current academic agenda focuses on Malay Ethical
            Constitutionalism, particularly the constitutional thought of Raja
            Ali Haji and its relevance to contemporary debates on authority,
            justice, accountability, consultation, and ethical governance.
          </p>

          <p>
            Through research, teaching, public lectures, international
            conferences, and scholarly publications, he seeks to connect legal
            scholarship with public responsibility, civilizational knowledge,
            and the moral foundations of governance.
          </p>

          <div className="pt-6">
            <h3 className="text-2xl font-bold text-gray-950">
              Areas of Expertise
            </h3>

            <div className="mt-5 flex flex-wrap gap-3">
              {expertise.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}