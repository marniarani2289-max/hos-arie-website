import Image from "next/image";
import Link from "next/link";

export default function HeroV2() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-stone-50">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full border border-amber-200/60" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-[340px] w-[340px] rounded-full border border-amber-200/80" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 md:px-8 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
        {/* LEFT */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            Constitutional Law • Malay Intellectual History
          </p>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 md:text-6xl">
            Dr. Hos Arie Rhamadhan Sibarani
          </h1>

          <p className="mt-6 text-xl font-semibold text-slate-800 md:text-2xl">
            Constitutional Law Scholar
          </p>

          <h2 className="mt-7 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-950 md:text-4xl">
            Recovering constitutional thought from the Malay world
          </h2>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
            My research reconstructs the constitutional thought of Raja Ali
            Haji and develops{" "}
            <strong className="font-semibold text-slate-900">
              Malay Ethical Constitutionalism
            </strong>{" "}
            as an original contribution to comparative constitutional law,
            indigenous constitutionalism, and global constitutional
            scholarship.
          </p>

          {/* Main buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/research"
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-7 py-4 font-semibold text-white transition hover:bg-amber-700"
            >
              Explore Research
            </Link>

            <Link
              href="/research/malay-ethical-constitutionalism"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-900 transition hover:border-amber-700 hover:bg-amber-50 hover:text-amber-800"
            >
              Flagship Programme
            </Link>

            <a
              href="/academic-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-4 font-semibold text-slate-700 transition hover:text-amber-700"
            >
              Academic CV →
            </a>
          </div>

          {/* Academic links */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-amber-700 hover:text-amber-700"
            >
              Google Scholar
            </a>

            <Link
              href="/publications"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-amber-700 hover:text-amber-700"
            >
              Publications
            </Link>

            <Link
              href="/raja-ali-haji"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-amber-700 hover:text-amber-700"
            >
              Raja Ali Haji
            </Link>
          </div>

          {/* Academic identity */}
          <div className="mt-10 grid max-w-3xl gap-5 border-t border-slate-200 pt-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Academic Position
              </p>

              <p className="mt-2 font-semibold leading-7 text-slate-900">
                Senior Lecturer
              </p>

              <p className="text-sm leading-6 text-slate-600">
                Universitas Maritim Raja Ali Haji
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Research Leadership
              </p>

              <p className="mt-2 font-semibold leading-7 text-slate-900">
                Founder &amp; Executive Director
              </p>

              <p className="text-sm leading-6 text-slate-600">
                Raja Ali Haji Research Network
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-amber-100/80 blur-3xl" />

            {/* Profile photo */}
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-2xl">
              <Image
                src="/hos-arie.jpg"
                alt="Dr. Hos Arie Rhamadhan Sibarani"
                width={520}
                height={650}
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
                className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-top"
              />
            </div>

            {/* Research card */}
            <div className="relative mx-5 -mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl md:mx-8 md:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
                  Flagship Research
                </p>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Active
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                Malay Ethical Constitutionalism
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Reconstructing Raja Ali Haji&apos;s constitutional thought to
                recover a Malay tradition of reasoning about authority,
                justice, consultation, accountability, and ethical governance.
              </p>

              <Link
                href="/research/malay-ethical-constitutionalism"
                className="mt-6 inline-flex items-center font-semibold text-amber-700 transition hover:text-amber-900"
              >
                Explore the research
                <span className="ml-2">→</span>
              </Link>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Research Fields
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-700">
                  Constitutional Theory • Indigenous Constitutionalism • Malay
                  Intellectual History • Comparative Law
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}