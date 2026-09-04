import type { Metadata } from "next";
import Link from "next/link";

import ResearchProgrammeCard from "./components/ResearchProgrammeCard";
import { researchProgrammes } from "./data/researchProgrammes";

export const metadata: Metadata = {
  title: "Research",

  description:
    "Explore the research programmes of Dr. Hos Arie Sibarani in constitutional theory, Malay Ethical Constitutionalism, Raja Ali Haji studies, indigenous constitutionalism, governance, and institutional responsibility.",

  alternates: {
    canonical: "/research",
    languages: { id: "/id/research", en: "/research" },
  },

  openGraph: {
    title: "Research | Dr. Hos Arie Sibarani",
    description:
      "Research programmes in constitutional theory, Malay constitutional thought, indigenous constitutionalism, Raja Ali Haji studies, governance, ethics, and institutional responsibility.",
    url: "https://www.hossibarani.com/research",
    siteName: "Dr. Hos Arie Sibarani",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Research | Dr. Hos Arie Sibarani",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Research | Dr. Hos Arie Sibarani",
    description:
      "Research in constitutional theory, Malay Ethical Constitutionalism, Raja Ali Haji studies, indigenous constitutionalism, and institutional responsibility.",
    images: ["/og-image.jpg"],
  },
};

const researchMethods = [
  {
    number: "01",
    title: "Doctrinal Legal Research",
    description:
      "Close analysis of statutes, judicial decisions, legal doctrines, constitutional principles, and normative structures.",
  },
  {
    number: "02",
    title: "Intellectual History",
    description:
      "Reconstructing legal and political ideas within their historical, cultural, linguistic, and institutional contexts.",
  },
  {
    number: "03",
    title: "Comparative Analysis",
    description:
      "Comparing constitutional and legal traditions through shared problems without assuming a single universal model.",
  },
  {
    number: "04",
    title: "Conceptual Reconstruction",
    description:
      "Developing coherent theoretical frameworks from dispersed legal, ethical, historical, and intellectual sources.",
  },
];

const researchOutputs = [
  "Peer-reviewed international journal articles",
  "Scholarly monographs and edited books",
  "Conference papers and invited lectures",
  "Research seminars and academic collaboration",
  "Policy papers and public scholarship",
  "Digital archives and research resources",
];

export default function ResearchPage() {
  const featuredProgramme = researchProgrammes[0];

  return (
    <main className="bg-white">
      {/* Hero */}

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-amber-400/30" />
          <div className="absolute -right-10 top-10 h-72 w-72 rounded-full border border-amber-400/20" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
              Research Hub
            </p>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Law, constitutional thought, and the intellectual traditions of
              the Malay world
            </h1>

            <p className="mt-8 max-w-4xl text-xl leading-9 text-slate-300 md:text-2xl md:leading-10">
              An interdisciplinary research agenda connecting constitutional
              theory, Raja Ali Haji, Malay intellectual history, indigenous
              constitutionalism, comparative law, and institutional
              responsibility.
            </p>

            <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-400">
              The programme seeks to recover neglected traditions of legal and
              constitutional thought, develop original theoretical frameworks,
              and position intellectual perspectives from the Malay world within
              global legal scholarship.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#research-programmes"
                className="inline-flex justify-center rounded-xl bg-amber-600 px-7 py-4 font-semibold text-white transition hover:bg-amber-500"
              >
                Explore Research Programmes
              </Link>

              <Link
                href="/publications"
                className="inline-flex justify-center rounded-xl border border-slate-700 px-7 py-4 font-semibold text-white transition hover:border-amber-400 hover:text-amber-400"
              >
                View Publications
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Research statistics */}

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-px bg-slate-200 px-6 md:grid-cols-2 md:px-8 lg:grid-cols-4">
          <div className="bg-slate-50 py-10 md:px-8">
            <p className="text-4xl font-bold text-slate-950">4</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Core research programmes
            </p>
          </div>

          <div className="bg-slate-50 py-10 md:px-8">
            <p className="text-4xl font-bold text-slate-950">3</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Principal Raja Ali Haji texts
            </p>
          </div>

          <div className="bg-slate-50 py-10 md:px-8">
            <p className="text-2xl font-bold text-slate-950">
              Interdisciplinary
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Law, history, ethics, language, and governance
            </p>
          </div>

          <div className="bg-slate-50 py-10 md:px-8">
            <p className="text-4xl font-bold text-slate-950">Global</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Comparative scholarly orientation
            </p>
          </div>
        </div>
      </section>

      {/* Research profile */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              Research Profile
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              A connected programme of legal and constitutional inquiry
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-9 text-slate-700">
            <p>
              My research is organised around a central intellectual question:
              how societies understand, justify, organise, and limit authority.
              This concern connects my work in constitutional theory, Malay
              intellectual history, indigenous constitutionalism, and private
              law.
            </p>

            <p>
              The research examines legal ideas not only through statutes and
              formal constitutional documents, but also through historical
              texts, ethical concepts, judicial reasoning, institutional
              practices, and traditions of public responsibility.
            </p>

            <p>
              A principal focus is the development of Malay Ethical
              Constitutionalism, an original framework reconstructed from Raja
              Ali Haji’s writings. Alongside this programme, my private-law
              research investigates how Indonesian courts attribute
              responsibility for harm arising from employment and
              organisational relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Featured programme */}

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="overflow-hidden rounded-[2rem] bg-slate-950 text-white">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="p-8 md:p-12 lg:p-16">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
                  Flagship Research Programme
                </p>

                <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
                  {featuredProgramme.title}
                </h2>

                <p className="mt-7 text-lg leading-9 text-slate-300">
                  {featuredProgramme.description}
                </p>

                <p className="mt-6 text-lg leading-9 text-slate-300">
                  {featuredProgramme.contribution}
                </p>

                <Link
                  href={featuredProgramme.href}
                  className="mt-10 inline-flex rounded-xl bg-amber-600 px-7 py-4 font-semibold text-white transition hover:bg-amber-500"
                >
                  Explore the Full Research Project
                </Link>
              </div>

              <div className="border-t border-slate-800 bg-slate-900 p-8 md:p-12 lg:border-l lg:border-t-0 lg:p-16">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
                  Research Foundations
                </p>

                <div className="mt-8 space-y-7">
                  <div>
                    <p className="text-3xl font-bold">3</p>
                    <p className="mt-1 text-slate-400">Primary texts</p>
                  </div>

                  <div className="border-t border-slate-800 pt-7">
                    <p className="text-3xl font-bold">5</p>
                    <p className="mt-1 text-slate-400">
                      Constitutional principles
                    </p>
                  </div>

                  <div className="border-t border-slate-800 pt-7">
                    <p className="text-2xl font-bold">
                      Nineteenth-Century Malay World
                    </p>
                    <p className="mt-1 text-slate-400">
                      Historical foundation
                    </p>
                  </div>

                  <div className="border-t border-slate-800 pt-7">
                    <p className="text-2xl font-bold">
                      Global Constitutional Theory
                    </p>
                    <p className="mt-1 text-slate-400">
                      Scholarly contribution
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All programmes */}

      <section
        id="research-programmes"
        className="scroll-mt-24 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              Research Programmes
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Core areas of research
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Each programme addresses a distinct field while contributing to a
              wider agenda concerning authority, accountability, justice,
              institutional responsibility, and the intellectual plurality of
              law.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {researchProgrammes.map((programme) => (
              <ResearchProgrammeCard
                key={programme.title}
                programme={programme}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              Research Methodology
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Combining law, history, and conceptual analysis
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {researchMethods.map((method) => (
              <article
                key={method.title}
                className="rounded-3xl border border-slate-200 bg-white p-8"
              >
                <p className="text-sm font-bold text-amber-700">
                  {method.number}
                </p>

                <h3 className="mt-4 text-xl font-bold text-slate-950">
                  {method.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {method.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Research outputs */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              Research Outputs
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              From research programmes to global scholarship
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Research findings are developed through academic publications,
              conferences, invited lectures, scholarly collaboration, public
              engagement, and long-term digital preservation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {researchOutputs.map((output, index) => (
              <div
                key={output}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <p className="text-sm font-bold text-amber-700">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-3 font-semibold leading-7 text-slate-900">
                  {output}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="bg-amber-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-24">
          <div className="rounded-[2rem] border border-amber-200 bg-white p-8 md:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                Academic Collaboration
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Research collaboration, seminars, and scholarly exchange
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                I welcome academic collaboration concerning constitutional law,
                Raja Ali Haji, Malay intellectual history, indigenous
                constitutionalism, comparative legal theory, and Indonesian
                private law.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-0 lg:flex-col">
              <Link
                href="/contact"
                className="inline-flex justify-center rounded-xl bg-slate-950 px-7 py-4 font-semibold text-white transition hover:bg-amber-700"
              >
                Discuss Collaboration
              </Link>

              <Link
                href="/publications"
                className="inline-flex justify-center rounded-xl border border-slate-300 px-7 py-4 font-semibold text-slate-900 transition hover:border-amber-700 hover:text-amber-700"
              >
                View Publications
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
