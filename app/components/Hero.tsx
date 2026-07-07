import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 md:text-sm md:tracking-[0.3em]">
            Legal Scholar • Constitutional Theorist • Malay Studies
          </p>

          <h1 className="text-5xl font-extrabold leading-tight text-gray-950 md:text-6xl">
            Dr. Hos Arie Sibarani
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
            Advancing constitutional thought, Malay intellectual heritage, and
            legal scholarship through research, publications, and international
            collaboration.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 md:mt-10">
            <a
              href="#publications"
              className="rounded-xl bg-gray-950 px-6 py-4 font-semibold text-white hover:bg-gray-800 md:px-8"
            >
              View Publications
            </a>

            <a
              href="#contact"
              className="rounded-xl border border-gray-300 px-6 py-4 font-semibold text-gray-900 hover:bg-gray-100 md:px-8"
            >
              Contact
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <a className="rounded-full border px-4 py-2 text-gray-700" href="#">
              Google Scholar
            </a>
            <a className="rounded-full border px-4 py-2 text-gray-700" href="#">
              ORCID
            </a>
            <a className="rounded-full border px-4 py-2 text-gray-700" href="#">
              Scopus
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-4 md:gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm md:p-5">
              <h3 className="text-3xl font-extrabold text-amber-700 md:text-4xl">
                20+
              </h3>
              <p className="mt-2 text-xs font-medium text-gray-600 md:text-sm">
                Years of Academic Experience
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm md:p-5">
              <h3 className="text-3xl font-extrabold text-amber-700 md:text-4xl">
                4
              </h3>
              <p className="mt-2 text-xs font-medium text-gray-600 md:text-sm">
                Research Themes
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm md:p-5">
              <h3 className="text-3xl font-extrabold text-amber-700 md:text-4xl">
                25+
              </h3>
              <p className="mt-2 text-xs font-medium text-gray-600 md:text-sm">
                International Conferences
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm md:p-5">
              <h3 className="text-3xl font-extrabold text-amber-700 md:text-4xl">
                1
              </h3>
              <p className="mt-2 text-xs font-medium text-gray-600 md:text-sm">
                Research Network
              </p>
              <p className="mt-1 text-[11px] text-gray-500 md:text-xs">
                Founded RAHRN
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="max-w-sm overflow-hidden rounded-3xl shadow-2xl md:max-w-md">
            <Image
              src="/hos-arie.jpg"
              alt="Dr. Hos Arie Sibarani"
              width={450}
              height={600}
              className="h-auto w-full rounded-3xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}