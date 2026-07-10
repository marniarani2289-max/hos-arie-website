import Image from "next/image";

const biographyHighlights = [
  {
    label: "Primary Field",
    value: "Constitutional Theory",
  },
  {
    label: "Research Focus",
    value: "Malay Ethical Constitutionalism",
  },
  {
    label: "Historical Focus",
    value: "Raja Ali Haji and the Riau-Lingga Sultanate",
  },
  {
    label: "Institutional Role",
    value: "Senior Lecturer, Universitas Maritim Raja Ali Haji",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-white px-6 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              Academic Biography
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Constitutional Thought from the Malay World
            </h2>

            <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-stone-50 p-2 shadow-sm">
              <Image
                src="/hos-arie-sultan.png"
                alt="Dr. Hos Arie Rhamadhan Sibarani"
                width={520}
                height={620}
                className="h-auto w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </div>

          <div>
            <div className="space-y-6 text-lg leading-8 text-slate-600">
              <p>
                Dr. Hos Arie Rhamadhan Sibarani is an Indonesian
                constitutional law scholar whose research examines
                constitutional theory, legal history, governance, and the
                intellectual traditions of the nineteenth-century Malay world.
              </p>

              <p>
                His current work reconstructs the constitutional thought of
                Raja Ali Haji and develops{" "}
                <strong className="font-semibold text-slate-950">
                  Malay Ethical Constitutionalism
                </strong>{" "}
                as a framework for understanding authority, justice,
                consultation, accountability, public responsibility, and the
                ethical limitation of political power.
              </p>

              <p>
                His scholarship seeks to broaden the historical and
                intellectual foundations of Indonesian constitutional law by
                demonstrating that constitutional reasoning emerged not only
                through European legal traditions and colonial institutions,
                but also through local intellectual traditions within the Malay
                world.
              </p>

              <p>
                He is a Senior Lecturer at Universitas Maritim Raja Ali Haji
                and the Founder and Executive Director of the Raja Ali Haji
                Research Network, an interdisciplinary initiative dedicated to
                research, publication, collaboration, and public engagement on
                Raja Ali Haji and Malay intellectual history.
              </p>

              <p>
                His broader research interests include comparative
                constitutional law, indigenous constitutionalism, Islamic
                constitutional thought, constitutional accountability,
                corrective justice, vicarious liability, environmental
                governance, and law and society in Southeast Asia.
              </p>
            </div>

            <div className="mt-10 border-l-4 border-amber-700 pl-6">
              <p className="text-xl italic leading-9 text-slate-700">
                My research seeks to recover overlooked constitutional
                traditions and demonstrate that constitutional thought has
                always been intellectually plural.
              </p>
            </div>

            <dl className="mt-12 grid gap-x-10 gap-y-8 border-y border-slate-200 py-9 sm:grid-cols-2">
              {biographyHighlights.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                    {item.label}
                  </dt>

                  <dd className="mt-3 text-base font-semibold leading-7 text-slate-900">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="/academic-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-amber-700"
              >
                View Academic CV
              </a>

              <a
                href="https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-800 transition hover:border-amber-700 hover:text-amber-800"
              >
                Google Scholar
              </a>

              <a
                href="/raja-ali-haji"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-800 transition hover:border-amber-700 hover:text-amber-800"
              >
                Raja Ali Haji Research
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}