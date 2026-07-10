import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-stone-50 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-amber-700 md:text-sm md:tracking-[0.28em]">
            Constitutional Law • Malay Intellectual History • Indigenous Constitutionalism
          </p>

          <h1 className="max-w-3xl text-5xl font-extrabold leading-tight text-slate-950 md:text-6xl">
            Dr. Hos Arie Rhamadhan Sibarani
          </h1>

          <p className="mt-5 text-xl font-semibold leading-8 text-slate-800 md:text-2xl">
            Constitutional Law Scholar and Researcher of Malay Constitutional Thought
          </p>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Reconstructing the constitutional thought of Raja Ali Haji and
            developing{" "}
            <span className="font-semibold text-slate-900">
              Malay Ethical Constitutionalism
            </span>{" "}
            as a contribution to comparative and global constitutional theory.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            My research examines authority, justice, consultation, accountability,
            public responsibility, and the ethical limits of political power in the
            nineteenth-century Malay world.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 md:mt-10">
            <a
              href="#research"
              className="rounded-xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-slate-800 md:px-8"
            >
              Explore My Research
            </a>

            <a
              href="#publications"
              className="rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-900 transition hover:bg-slate-100 md:px-8"
            >
              View Publications
            </a>

            <a
              href="/academic-cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-amber-700 px-6 py-4 font-semibold text-amber-800 transition hover:bg-amber-50 md:px-8"
            >
              Academic CV
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <a
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-amber-700 hover:text-amber-800"
              href="https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=id"
              target="_blank"
              rel="noreferrer"
            >
              Google Scholar
            </a>

            <a
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-amber-700 hover:text-amber-800"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              ORCID
            </a>

            <a
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-amber-700 hover:text-amber-800"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              Scopus
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-4 md:gap-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-3xl font-extrabold text-amber-700 md:text-4xl">
                20+
              </h3>
              <p className="mt-2 text-xs font-medium leading-5 text-slate-600 md:text-sm">
                Years of Academic and Professional Experience
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-3xl font-extrabold text-amber-700 md:text-4xl">
                5
              </h3>
              <p className="mt-2 text-xs font-medium leading-5 text-slate-600 md:text-sm">
                Core Research Areas
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-3xl font-extrabold text-amber-700 md:text-4xl">
                25+
              </h3>
              <p className="mt-2 text-xs font-medium leading-5 text-slate-600 md:text-sm">
                National and International Academic Forums
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-3xl font-extrabold text-amber-700 md:text-4xl">
                RAHRN
              </h3>
              <p className="mt-2 text-xs font-medium leading-5 text-slate-600 md:text-sm">
                Raja Ali Haji Research Network
              </p>
              <p className="mt-1 text-[11px] text-slate-500 md:text-xs">
                Founder and Executive Director
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative max-w-sm md:max-w-md">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-amber-100 blur-2xl" />

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl">
              <Image
                src="/hos-arie.jpg"
                alt="Dr. Hos Arie Rhamadhan Sibarani, constitutional law scholar"
                width={450}
                height={600}
                className="h-auto w-full rounded-[1.25rem] object-cover"
                priority
              />
            </div>

            <div className="mx-4 -mt-8 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-xl backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                Current Research
              </p>
              <h2 className="mt-2 text-lg font-bold leading-6 text-slate-950">
                Malay Ethical Constitutionalism
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Recovering constitutional thought from the Malay world and bringing
                it into global constitutional scholarship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}