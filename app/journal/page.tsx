import Link from "next/link";

const journalFeatures = [
  {
    title: "International Journal",
    description:
      "An international scholarly platform connecting Malay constitutional thought with global constitutional scholarship.",
  },
  {
    title: "Double-Blind Peer Review",
    description:
      "All submitted manuscripts are evaluated through an independent double-blind peer-review process.",
  },
  {
    title: "Open Access",
    description:
      "Research articles are openly accessible to scholars, students, policymakers, and the wider public.",
  },
  {
    title: "CC BY 4.0",
    description:
      "Published works may be shared and adapted with appropriate attribution to the original authors.",
  },
];

const focusAreas = [
  "Malay Constitutionalism",
  "Constitutional Law",
  "Constitutional Theory",
  "Comparative Constitutionalism",
  "Indigenous Constitutionalism",
  "Governance",
  "Democracy",
  "Legal History",
  "Public Law",
  "Law and Ethics",
];

export default function JournalPage() {
  return (
    <main className="bg-white text-slate-950">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0b1930] text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-amber-300/40" />
          <div className="absolute right-10 top-10 h-64 w-64 rounded-full border border-amber-300/20" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.3fr_0.7fr] lg:px-8 lg:py-32">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-amber-300">
              Official Journal of Raja Ali Haji Research Network
            </p>

            <h1 className="max-w-4xl font-serif text-5xl font-bold leading-tight md:text-6xl">
              Journal of Malay
              <span className="block italic text-amber-300">
                Constitutional Studies
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">
              An international peer-reviewed scholarly journal dedicated to
              advancing Malay constitutionalism as an emerging field within
              global constitutional scholarship.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://journal.hossibarani.com/jmcs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-amber-300 px-7 py-4 text-sm font-bold uppercase tracking-wider text-slate-950 transition hover:bg-amber-200"
              >
                Visit JMCS Journal
                <span className="ml-3" aria-hidden="true">
                  ↗
                </span>
              </a>

              <a
                href="https://journal.hossibarani.com/jmcs/about/submissions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white/40 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:border-amber-300 hover:text-amber-300"
              >
                Submit Manuscript
              </a>
            </div>
          </div>

          <aside className="border border-white/20 bg-white/5 p-8 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
              Journal Profile
            </p>

            <dl className="mt-8 divide-y divide-white/15">
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-sm text-slate-400">Publisher</dt>
                <dd className="text-right text-sm font-semibold">
                  Raja Ali Haji Research Network
                </dd>
              </div>

              <div className="flex justify-between gap-6 py-4">
                <dt className="text-sm text-slate-400">Language</dt>
                <dd className="text-right text-sm font-semibold">English</dd>
              </div>

              <div className="flex justify-between gap-6 py-4">
                <dt className="text-sm text-slate-400">Access</dt>
                <dd className="text-right text-sm font-semibold">
                  Open Access
                </dd>
              </div>

              <div className="flex justify-between gap-6 py-4">
                <dt className="text-sm text-slate-400">Review</dt>
                <dd className="text-right text-sm font-semibold">
                  Double-Blind
                </dd>
              </div>

              <div className="flex justify-between gap-6 py-4">
                <dt className="text-sm text-slate-400">Publication</dt>
                <dd className="text-right text-sm font-semibold">Biannual</dd>
              </div>

              <div className="flex justify-between gap-6 py-4">
                <dt className="text-sm text-slate-400">Licence</dt>
                <dd className="text-right text-sm font-semibold">CC BY 4.0</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
              About the Journal
            </p>

            <h2 className="mt-5 max-w-xl font-serif text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              Advancing Malay constitutional scholarship
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-slate-600">
            <p>
              The Journal of Malay Constitutional Studies publishes original
              research in constitutional law, constitutional theory,
              comparative constitutional law, indigenous constitutionalism,
              governance, democracy, legal history, and public ethics.
            </p>

            <p>
              JMCS provides an interdisciplinary forum for examining the
              constitutional traditions, political ideas, ethical principles,
              and legal heritage of the Malay World.
            </p>

            <a
              href="https://journal.hossibarani.com/jmcs/about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex font-bold text-amber-700 transition hover:text-amber-900"
            >
              Read about JMCS
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
              Publishing Standards
            </p>

            <h2 className="mt-4 font-serif text-4xl font-bold text-slate-950">
              Scholarly integrity and global accessibility
            </h2>
          </div>

          <div className="grid border-l border-t border-slate-300 md:grid-cols-2 lg:grid-cols-4">
            {journalFeatures.map((feature, index) => (
              <article
                key={feature.title}
                className="border-b border-r border-slate-300 bg-white p-8"
              >
                <span className="text-xs font-bold tracking-[0.2em] text-amber-700">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-8 font-serif text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="bg-[#0b1930] text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
            Focus and Scope
          </p>

          <h2 className="mt-5 font-serif text-4xl font-bold md:text-5xl">
            Areas of scholarship
          </h2>

          <div className="mt-12 grid border-l border-t border-white/20 sm:grid-cols-2 lg:grid-cols-5">
            {focusAreas.map((area) => (
              <div
                key={area}
                className="min-h-32 border-b border-r border-white/20 p-6"
              >
                <span className="block h-px w-5 bg-amber-300" />
                <h3 className="mt-8 font-serif text-lg font-bold">{area}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* EDITORIAL TEAM */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          {/* SECTION HEADER */}
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
              Editorial Team
            </p>

            <h2 className="mt-5 font-serif text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              Editorial Leadership
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              The Journal of Malay Constitutional Studies is supported by
              scholars from Indonesia, Malaysia, and the Netherlands, reflecting
              the journal&apos;s commitment to international and comparative
              constitutional scholarship.
            </p>
          </div>

          {/* EDITORIAL LEADERSHIP */}
          <div className="mt-14 grid gap-6 lg:grid-cols-2">

            {/* EDITOR-IN-CHIEF */}
            <article className="border border-slate-200 bg-white p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
                Editor-in-Chief
              </p>

              <div className="mt-8 flex items-start gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#0b1930] font-serif text-xl font-bold text-amber-300">
                  HS
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold leading-snug text-slate-950">
                    Dr. Hos Arie Rhamadhan Sibarani, S.H., M.H.
                  </h3>

                  <p className="mt-3 text-sm font-semibold text-amber-700">
                    Editor-in-Chief
                  </p>

                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    Raja Ali Haji Research Network
                  </p>

                  <p className="text-sm leading-7 text-slate-500">
                    Indonesia
                  </p>
                </div>
              </div>
            </article>

            {/* MANAGING EDITOR */}
            <article className="border border-slate-200 bg-white p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
                Managing Editor
              </p>

              <div className="mt-8 flex items-start gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#0b1930] font-serif text-xl font-bold text-amber-300">
                  MR
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold leading-snug text-slate-950">
                    Marniarani, S.H., M.H.
                  </h3>

                  <p className="mt-3 text-sm font-semibold text-amber-700">
                    Managing Editor
                  </p>

                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    Universitas Maritim Raja Ali Haji
                  </p>

                  <p className="text-sm leading-7 text-slate-500">
                    Indonesia
                  </p>
                </div>
              </div>
            </article>

          </div>

          {/* EDITORIAL BOARD */}
          <div className="mt-20">
            <div className="border-b border-slate-300 pb-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
                Editorial Board
              </p>

              <h2 className="mt-4 font-serif text-3xl font-bold text-slate-950">
                Members of the Editorial Board
              </h2>
            </div>

            <div className="grid border-l border-t border-slate-300 md:grid-cols-2 lg:grid-cols-3">

              {/* ASRIZAL */}
              <article className="border-b border-r border-slate-300 bg-white p-8">
                <span className="text-xs font-bold tracking-[0.2em] text-amber-700">
                  01
                </span>

                <h3 className="mt-6 font-serif text-xl font-bold leading-snug text-slate-950">
                  Dr. Asrizal, S.H., M.H.
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Sekolah Tinggi Agama Islam Negeri Sultan Abdurrahman
                  Kepulauan Riau
                </p>

                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Indonesia
                </p>
              </article>

              {/* TAUFIK */}
              <article className="border-b border-r border-slate-300 bg-white p-8">
                <span className="text-xs font-bold tracking-[0.2em] text-amber-700">
                  02
                </span>

                <h3 className="mt-6 font-serif text-xl font-bold leading-snug text-slate-950">
                  Dr. Taufik
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Universitas Islam Negeri Sultan Thaha Saifuddin Jambi
                </p>

                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Indonesia
                </p>
              </article>

              {/* LUKMANUL HAKIM */}
              <article className="border-b border-r border-slate-300 bg-white p-8">
                <span className="text-xs font-bold tracking-[0.2em] text-amber-700">
                  03
                </span>

                <h3 className="mt-6 font-serif text-xl font-bold leading-snug text-slate-950">
                  Dr. Lukmanul Hakim
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Universiti Teknologi MARA
                </p>

                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Malaysia
                </p>
              </article>

              {/* SURYADI */}
              <article className="border-b border-r border-slate-300 bg-white p-8">
                <span className="text-xs font-bold tracking-[0.2em] text-amber-700">
                  04
                </span>

                <h3 className="mt-6 font-serif text-xl font-bold leading-snug text-slate-950">
                  Dr. Suryadi
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Universiteit Leiden
                </p>

                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Netherlands
                </p>
              </article>

              {/* DENI KAMALUDIN YUSUP */}
              <article className="border-b border-r border-slate-300 bg-white p-8">
                <span className="text-xs font-bold tracking-[0.2em] text-amber-700">
                  05
                </span>

                <h3 className="mt-6 font-serif text-xl font-bold leading-snug text-slate-950">
                  Prof. Dr. Deni Kamaludin Yusup, S.Ag., M.Ag.
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Universitas Islam Negeri Sunan Gunung Djati Bandung
                </p>

                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Indonesia
                </p>
              </article>

              {/* YUSDIANTO */}
              <article className="border-b border-r border-slate-300 bg-white p-8">
                <span className="text-xs font-bold tracking-[0.2em] text-amber-700">
                  06
                </span>

                <h3 className="mt-6 font-serif text-xl font-bold leading-snug text-slate-950">
                  Dr. Yusdianto, S.H., M.H.
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Universitas Lampung
                </p>

                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Indonesia
                </p>
              </article>

            </div>

            {/* OJS EDITORIAL TEAM */}
            <div className="mt-10">
              <a
                href="https://journal.hossibarani.com/jmcs/about/editorialTeam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-slate-950 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-950 hover:text-white"
              >
                View Editorial Team on OJS
                <span className="ml-3" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>

          </div>
        </div>
      </section>
      
      {/* JOURNAL ACCESS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-px bg-slate-300 md:grid-cols-3">
          <a
            href="https://journal.hossibarani.com/jmcs/issue/current"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-10 transition hover:bg-slate-50"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
              Explore
            </span>
            <h3 className="mt-5 font-serif text-2xl font-bold">
              Current Issue
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Access the latest issue and published scholarly articles.
            </p>
            <span className="mt-8 inline-block font-bold group-hover:text-amber-700">
              View current issue →
            </span>
          </a>

          <a
            href="https://journal.hossibarani.com/jmcs/issue/archive"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-10 transition hover:bg-slate-50"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
              Publications
            </span>
            <h3 className="mt-5 font-serif text-2xl font-bold">
              Journal Archives
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Browse previous volumes, issues, and published research.
            </p>
            <span className="mt-8 inline-block font-bold group-hover:text-amber-700">
              Browse archives →
            </span>
          </a>

          <a
            href="https://journal.hossibarani.com/jmcs/about/submissions"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-10 transition hover:bg-slate-50"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
              Authors
            </span>
            <h3 className="mt-5 font-serif text-2xl font-bold">
              Submit Research
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Read the author guidelines and submit a manuscript through OJS.
            </p>
            <span className="mt-8 inline-block font-bold group-hover:text-amber-700">
              Submit manuscript →
            </span>
          </a>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-16 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
              JMCS Publishing Platform
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold">
              Enter the official JMCS journal website
            </h2>
          </div>

          <a
            href="https://journal.hossibarani.com/jmcs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#0b1930] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-amber-700"
          >
            Open JMCS
            <span className="ml-3" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
        <Link
          href="/"
          className="text-sm font-semibold text-slate-600 transition hover:text-amber-700"
        >
          ← Return to academic homepage
        </Link>
      </div>
    </main>
  );
}