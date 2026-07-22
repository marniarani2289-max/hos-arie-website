import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",

  description:
    "Learn about Dr. Hos Arie Sibarani, a constitutional law scholar researching Malay constitutional thought, Raja Ali Haji, indigenous constitutionalism, governance, and institutional responsibility.",

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About Dr. Hos Arie Sibarani",
    description:
      "Academic profile, research background, leadership experience, and intellectual journey of Dr. Hos Arie Sibarani.",
    url: "https://www.hossibarani.com/about",
    siteName: "Dr. Hos Arie Sibarani",
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Dr. Hos Arie Sibarani",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Dr. Hos Arie Sibarani",
    description:
      "Academic profile and intellectual journey of a constitutional law scholar from the Malay world.",
    images: ["/og-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            About
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
            Dr. Hos Arie Sibarani
          </h1>

          <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-300">
            Constitutional law scholar, researcher of Malay constitutional
            thought, and founder of the Raja Ali Haji Research Network.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              Academic Profile
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Law, intellectual history, and the Malay world
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-9 text-slate-700">
            <p>
              Dr. Hos Arie Sibarani is a constitutional law scholar whose work
              connects constitutional theory, Malay intellectual history,
              indigenous constitutionalism, governance, and public ethics.
            </p>

            <p>
              His principal research programme reconstructs Raja Ali Haji as a
              constitutional thinker and develops Malay Ethical
              Constitutionalism as an original contribution to global
              constitutional scholarship.
            </p>

            <p>
              His academic work also examines institutional responsibility,
              Indonesian private law, judicial reasoning, and the attribution
              of responsibility within employment and organisational
              relationships.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="grid gap-8 md:grid-cols-3">
            <article className="rounded-3xl border border-slate-200 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                Research
              </p>

              <h2 className="mt-4 text-2xl font-bold text-slate-950">
                Constitutional Thought
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Research on constitutional theory, authority, accountability,
                justice, governance, and ethical public institutions.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                Intellectual Tradition
              </p>

              <h2 className="mt-4 text-2xl font-bold text-slate-950">
                Raja Ali Haji Studies
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Reconstructing the legal, ethical, political, and
                constitutional dimensions of Raja Ali Haji’s writings.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                Global Contribution
              </p>

              <h2 className="mt-4 text-2xl font-bold text-slate-950">
                Indigenous Constitutionalism
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Positioning intellectual traditions from the Malay world within
                comparative and global constitutional theory.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-24">
        <div className="rounded-[2rem] bg-amber-50 p-8 md:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              Explore the Work
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Research, publications, and academic collaboration
            </h2>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-0">
            <Link
              href="/research"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-7 py-4 font-semibold text-white transition hover:bg-amber-700"
            >
              View Research
            </Link>

            <Link
              href="/publications"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-900 transition hover:border-amber-700 hover:text-amber-700"
            >
              View Publications
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}