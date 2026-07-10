import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-stone-50">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:px-8 md:py-28 lg:grid-cols-2">

        {/* LEFT */}

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
            Constitutional Law • Malay Intellectual History
          </p>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-6xl">
            Dr. Hos Arie Rhamadhan Sibarani
          </h1>

          <p className="mt-6 text-xl font-semibold text-slate-800 md:text-2xl">
            Constitutional Law Scholar
          </p>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            My research reconstructs the constitutional thought of Raja Ali Haji
            and develops <strong>Malay Ethical Constitutionalism</strong> as a
            contribution to comparative constitutional law, indigenous
            constitutionalism, and global constitutional scholarship.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="#research"
              className="rounded-xl bg-slate-950 px-7 py-4 text-center font-semibold text-white transition hover:bg-amber-700"
            >
              Research Programme
            </a>

            <a
              href="/academic-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-300 px-7 py-4 text-center font-semibold text-slate-900 transition hover:border-amber-700 hover:bg-amber-50"
            >
              Academic CV
            </a>

          </div>

          <div className="mt-8 flex flex-wrap gap-3">

            <a
              href="https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-amber-700 hover:text-amber-700"
            >
              Google Scholar
            </a>

            <a
              href="#publications"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-amber-700 hover:text-amber-700"
            >
              Publications
            </a>

            <a
              href="/raja-ali-haji"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-amber-700 hover:text-amber-700"
            >
              Raja Ali Haji
            </a>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex justify-center lg:justify-end">

          <div className="relative max-w-md">

            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-amber-100 blur-3xl" />

            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-2xl">

              <Image
                src="/hos-arie.jpg"
                alt="Dr. Hos Arie Rhamadhan Sibarani"
                width={520}
                height={700}
                priority
                className="rounded-[1.5rem] object-cover"
              />

            </div>

            <div className="mx-8 -mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                Current Research
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-950">
                Malay Ethical Constitutionalism
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Reconstructing Raja Ali Haji's constitutional thought to
                demonstrate that the Malay world generated its own tradition of
                constitutional reasoning concerning authority, justice,
                consultation, accountability, and ethical governance.
              </p>

              <a
                href="#research"
                className="mt-5 inline-flex font-semibold text-amber-700 hover:text-amber-800"
              >
                Learn more →
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}