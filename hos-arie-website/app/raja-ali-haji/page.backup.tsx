import Link from "next/link";

const majorWorks = [
  {
    title: "Tsamarat al-Muhimmah",
    description:
      "A political and ethical work addressing the responsibilities of rulers, justice, public administration, and the proper exercise of authority.",
  },
  {
    title: "Muqaddimah fi Intizam Waza'if al-Malik",
    description:
      "A concise treatise concerning royal duties, the organisation of government, leadership, and the ethical obligations attached to political office.",
  },
  {
    title: "Gurindam Dua Belas",
    description:
      "A celebrated work of Malay ethical thought containing reflections on personal conduct, public responsibility, leadership, and social order.",
  },
  {
    title: "Tuhfat al-Nafis",
    description:
      "An important historical account of the Malay world that provides insight into political authority, dynastic relations, conflict, and governance.",
  },
];

const constitutionalThemes = [
  {
    number: "01",
    title: "Legitimate Authority",
    description:
      "Political authority is not sustained by status alone. It depends upon justice, proper conduct, public responsibility, and fidelity to ethical obligations.",
  },
  {
    number: "02",
    title: "Justice and the Limits of Power",
    description:
      "Rulers are expected to exercise power within moral and legal limits. Arbitrary rule weakens legitimacy and undermines the purpose of government.",
  },
  {
    number: "03",
    title: "Consultation",
    description:
      "Consultation reflects the importance of deliberation, counsel, and shared responsibility in the exercise of political authority.",
  },
  {
    number: "04",
    title: "Accountability",
    description:
      "Public office carries obligations. Political leaders may be judged by the manner in which they fulfil their duties and protect the public interest.",
  },
  {
    number: "05",
    title: "Ethical Leadership",
    description:
      "Personal character, integrity, knowledge, and restraint are presented as essential foundations of good government.",
  },
  {
    number: "06",
    title: "Public Welfare",
    description:
      "Government exists not merely to preserve political hierarchy, but to uphold justice, social order, and the welfare of the community.",
  },
];

const researchResources = [
  "Primary political writings of Raja Ali Haji",
  "Studies on the Riau-Lingga Sultanate",
  "Malay manuscript traditions",
  "Islamic political and constitutional thought",
  "Comparative constitutional theory",
  "Indigenous constitutionalism and legal pluralism",
];

export default function RajaAliHajiPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-gradient-to-b from-amber-50 to-white px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
            Raja Ali Haji Studies
          </p>

          <div className="mt-6 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-5xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-7xl">
                Raja Ali Haji and Malay Constitutional Thought
              </h1>

              <p className="mt-7 max-w-4xl text-xl leading-9 text-slate-600">
                Recovering Raja Ali Haji as a constitutional thinker whose
                writings offer a distinctive account of authority, justice,
                consultation, accountability, public responsibility, and
                ethical governance in the nineteenth-century Malay world.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="#constitutional-thought"
                  className="rounded-xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-slate-800"
                >
                  Explore His Constitutional Thought
                </Link>

                <Link
                  href="/#research"
                  className="rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-900 transition hover:border-amber-700 hover:text-amber-800"
                >
                  View Current Research
                </Link>
              </div>
            </div>

            <aside className="border-l-4 border-amber-700 pl-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                Research Proposition
              </p>

              <p className="mt-4 text-lg italic leading-8 text-slate-700">
                Raja Ali Haji should be read not only as a linguist, historian,
                and literary figure, but also as a constitutional thinker of
                the Malay world.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionLabel>Biography</SectionLabel>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
              Scholar, Statesman and Malay Intellectual
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-slate-600">
            <p>
              Raja Ali Haji was one of the most influential intellectual
              figures of the nineteenth-century Malay world. He is widely
              recognised for his contributions to Malay language, literature,
              historiography, Islamic learning, and political thought.
            </p>

            <p>
              He lived and worked within the political environment of the
              Riau-Lingga Sultanate during a period of significant regional and
              colonial transformation. The expansion of Dutch colonial
              authority altered existing arrangements of sovereignty,
              administration, and political legitimacy across the Malay world.
            </p>

            <p>
              Raja Ali Haji responded to these changes not only through
              historical and literary writing, but also through sustained
              reflection on government. His works addressed the responsibilities
              of rulers, the organisation of authority, justice, consultation,
              public conduct, and the moral foundations of political
              legitimacy.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-white md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionLabel dark>Historical Context</SectionLabel>

          <div className="mt-6 grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                The Riau-Lingga Sultanate under Colonial Pressure
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-8 text-slate-300">
              <p>
                Raja Ali Haji wrote during a period in which political
                institutions in the Malay world faced increasing pressure from
                European colonial expansion. The Anglo-Dutch Treaty of 1824
                reshaped regional sovereignty and divided earlier political and
                cultural networks.
              </p>

              <p>
                Within the Riau-Lingga Sultanate, authority was exercised
                through a complex relationship among the Sultan, the Yang
                Dipertuan Muda, religious scholars, court officials, and
                colonial authorities.
              </p>

              <p>
                This context makes Raja Ali Haji&apos;s writings particularly
                important. They can be read as reflections on how indigenous
                political institutions sought to preserve legitimacy, justice,
                order, and ethical government under conditions of political
                uncertainty.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="constitutional-thought"
        className="px-6 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Constitutional Thought</SectionLabel>

          <div className="mt-5 max-w-4xl">
            <h2 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Core Constitutional Themes
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Raja Ali Haji did not write a modern constitution. His works,
              however, contain coherent normative reflections on the
              legitimate exercise of authority, the duties of rulers, and the
              ethical limits of political power.
            </p>
          </div>

          <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {constitutionalThemes.map((theme) => (
              <article
                key={theme.title}
                className="grid grid-cols-[50px_1fr] gap-5 border-t border-slate-200 pt-7"
              >
                <p className="text-sm font-bold text-amber-700">
                  {theme.number}
                </p>

                <div>
                  <h3 className="text-2xl font-bold text-slate-950">
                    {theme.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {theme.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-6 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Major Works</SectionLabel>

          <div className="mt-5 max-w-4xl">
            <h2 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Principal Texts
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              The research examines Raja Ali Haji&apos;s principal writings as
              sources of political, ethical, historical, and constitutional
              reflection.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {majorWorks.map((work) => (
              <article
                key={work.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <h3 className="text-2xl font-bold italic text-slate-950">
                  {work.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {work.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Research Framework</SectionLabel>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
              Malay Ethical Constitutionalism
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-slate-600">
              My research reconstructs Raja Ali Haji&apos;s constitutional
              reasoning through the proposed framework of{" "}
              <strong className="font-semibold text-slate-950">
                Malay Ethical Constitutionalism
              </strong>
              . The concept describes a tradition of constitutional reasoning
              shaped by the interaction of Islamic legal principles, Malay
              political institutions, ethical leadership, consultation,
              accountability, and public responsibility.
            </p>

            <div className="mt-8 border-l-4 border-amber-700 pl-6">
              <p className="text-xl italic leading-9 text-slate-700">
                The Malay world should be understood not merely as a recipient
                of constitutional ideas, but as a site of constitutional
                reasoning and intellectual innovation.
              </p>
            </div>

            <Link
              href="/#research"
              className="mt-9 inline-flex rounded-xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-amber-700"
            >
              Read the Research Programme
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-6 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Research Resources</SectionLabel>

          <div className="mt-6 grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-slate-950">
                Areas of Continuing Research
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                This page will continue to develop as a scholarly portal for
                research on Raja Ali Haji, Malay political thought, legal
                history, and constitutional governance.
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {researchResources.map((resource) => (
                <li
                  key={resource}
                  className="border-b border-slate-300 pb-4 leading-7 text-slate-700"
                >
                  {resource}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-amber-700 px-6 py-16 text-white md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-100">
              Academic Collaboration
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-bold md:text-4xl">
              Research collaboration on Raja Ali Haji and Malay constitutional
              thought is welcome.
            </h2>
          </div>

          <Link
            href="/#contact"
            className="inline-flex w-fit rounded-xl bg-white px-6 py-4 font-semibold text-amber-800 transition hover:bg-amber-50"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  );
}

function SectionLabel({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`text-sm font-semibold uppercase tracking-[0.26em] ${
        dark ? "text-amber-400" : "text-amber-700"
      }`}
    >
      {children}
    </p>
  );
}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Raja Ali Haji",

  description:
    "Research on Raja Ali Haji as a constitutional thinker, including his ideas on authority, justice, consultation, accountability, language, ethics, and Malay governance.",

  alternates: {
    canonical: "/raja-ali-haji",
  },

  openGraph: {
    title: "Raja Ali Haji and Malay Constitutional Thought",
    description:
      "Discover Raja Ali Haji's constitutional ideas and their contribution to Malay Ethical Constitutionalism and global constitutional theory.",
    url: "/raja-ali-haji",
    type: "article",
  },

  twitter: {
    card: "summary_large_image",
    title: "Raja Ali Haji and Malay Constitutional Thought",
    description:
      "Research on authority, justice, consultation, accountability, and ethical governance in the works of Raja Ali Haji.",
  },
};