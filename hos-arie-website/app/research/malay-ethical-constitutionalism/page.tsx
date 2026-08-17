import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Malay Ethical Constitutionalism",
  description:
    "A long-term research programme recovering Raja Ali Haji's constitutional thought and developing Malay Ethical Constitutionalism as a contribution to global constitutional theory.",
};

const navigationItems = [
  { name: "Overview", href: "#overview" },
  { name: "Background", href: "#background" },
  { name: "Research Objectives", href: "#objectives" },
  { name: "Research Questions", href: "#questions" },
  { name: "Primary Sources", href: "#sources" },
  { name: "Methodology", href: "#methodology" },
  { name: "Core Framework", href: "#framework" },
  { name: "Original Contribution", href: "#contribution" },
  { name: "Research Outputs", href: "#outputs" },
  { name: "Long-Term Vision", href: "#vision" },
];

const principles = [
  {
    title: "Ethical Authority",
    description:
      "Political authority derives legitimacy from moral responsibility rather than coercive power alone. Authority is understood as an obligation to protect justice and the public good.",
  },
  {
    title: "Justice",
    description:
      "Justice is the central purpose of government. Political institutions exist to protect society, preserve fairness, and prevent the arbitrary exercise of power.",
  },
  {
    title: "Consultation",
    description:
      "Consultation, or musyawarah, provides an ethical and institutional mechanism for deliberation. It limits arbitrary decision-making and promotes collective wisdom.",
  },
  {
    title: "Accountability",
    description:
      "Public office is understood as an amanah. Rulers and officials remain accountable to society, ethical principles, and the responsibilities attached to their position.",
  },
  {
    title: "Limitation of Power",
    description:
      "No political authority is unlimited. Power must operate within boundaries defined by justice, morality, responsibility, and the welfare of the community.",
  },
];

const researchOutputs = [
  "A conceptual framework of Malay Ethical Constitutionalism.",
  "Peer-reviewed international journal articles.",
  "Conference papers and research seminars.",
  "A policy paper on ethical governance and public responsibility.",
  "A scholarly monograph on Raja Ali Haji’s constitutional thought.",
  "Future collaborative research on indigenous constitutionalism.",
];

export default function MalayEthicalConstitutionalismPage() {
  return (
    <main className="bg-white">
      {/* Hero */}

      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <Link
            href="/research"
            className="inline-flex items-center text-sm font-semibold text-amber-400 transition hover:text-amber-300"
          >
            ← Back to Research Hub
          </Link>

          <div className="mt-10 max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
              Long-Term Research Programme
            </p>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Malay Ethical Constitutionalism
            </h1>

            <p className="mt-8 max-w-4xl text-xl leading-9 text-slate-300 md:text-2xl md:leading-10">
              Recovering an Indigenous Tradition of Constitutional Thought from
              the Malay World
            </p>

            <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-400">
              This research programme reconstructs Raja Ali Haji as a
              constitutional thinker and develops Malay Ethical
              Constitutionalism as an original contribution to comparative
              constitutional theory, indigenous constitutionalism, and global
              intellectual history.
            </p>
          </div>
        </div>
      </section>

      {/* Research at a glance */}

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-px bg-slate-200 px-6 md:grid-cols-2 md:px-8 lg:grid-cols-4">
          <div className="bg-slate-50 py-10 md:px-8">
            <p className="text-3xl font-bold text-slate-950">19th Century</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Malay constitutional and intellectual history
            </p>
          </div>

          <div className="bg-slate-50 py-10 md:px-8">
            <p className="text-3xl font-bold text-slate-950">3</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Primary works at the centre of the research
            </p>
          </div>

          <div className="bg-slate-50 py-10 md:px-8">
            <p className="text-3xl font-bold text-slate-950">5</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Core constitutional principles
            </p>
          </div>

          <div className="bg-slate-50 py-10 md:px-8">
            <p className="text-3xl font-bold text-slate-950">Global</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Comparative constitutional framework
            </p>
          </div>
        </div>
      </section>

      {/* Main layout */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Table of contents */}

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                On This Page
              </p>

              <nav className="mt-6 border-l border-slate-200">
                {navigationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block border-l-2 border-transparent py-2 pl-5 text-sm text-slate-600 transition hover:border-amber-700 hover:text-amber-700"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Article */}

          <article className="min-w-0 max-w-4xl">
            <section id="overview" className="scroll-mt-28">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                Research Overview
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Recovering a neglected constitutional tradition
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-9 text-slate-700">
                <p>
                  Constitutional theory has traditionally been narrated as a
                  history of ideas emerging from Europe before gradually
                  spreading to other parts of the world through colonialism,
                  legal transplantation, and constitutional borrowing. Within
                  this dominant narrative, constitutional concepts such as the
                  limitation of power, accountability, the rule of law,
                  representative government, and constitutional legitimacy are
                  frequently presented as products of Western political
                  thought.
                </p>

                <p>
                  Although comparative constitutional scholarship has expanded
                  significantly, intellectual traditions from Southeast Asia
                  continue to receive limited attention. The Malay world is
                  often examined through the history of kingdoms, colonial
                  administration, religion, language, and literature, but much
                  less frequently as a site of systematic constitutional
                  reasoning.
                </p>

                <p>
                  This research programme challenges that assumption. It argues
                  that the nineteenth-century Malay world developed a
                  sophisticated and internally coherent tradition of thought
                  concerning political authority, justice, consultation,
                  accountability, responsible government, and the limitation of
                  power.
                </p>

                <p>
                  These ideas were articulated most clearly in the writings of
                  Raja Ali Haji, one of the most important intellectual figures
                  of the Riau-Lingga Sultanate. While he is widely recognised
                  for his contributions to Malay language, literature, history,
                  and Islamic ethics, his writings have rarely been examined as
                  sources of constitutional theory.
                </p>

                <p>
                  The project therefore seeks to reconstruct Raja Ali Haji not
                  only as a literary scholar or moral teacher, but also as a
                  constitutional thinker whose works offer original responses
                  to enduring questions about authority, public responsibility,
                  justice, ethical leadership, and the organisation of
                  government.
                </p>
              </div>
            </section>

            <section
              id="background"
              className="mt-24 scroll-mt-28 border-t border-slate-200 pt-16"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                Background
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Why this research matters
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-9 text-slate-700">
                <p>
                  Modern constitutional scholarship is increasingly global.
                  Scholars now study constitutional experiences from Africa,
                  Latin America, South Asia, Indigenous communities, Islamic
                  legal traditions, and postcolonial societies. Nevertheless,
                  the constitutional intellectual history of the Malay world
                  remains significantly underexplored.
                </p>

                <p>
                  This absence does not mean that constitutional reflection was
                  absent from Malay intellectual life. Rather, it reflects the
                  categories through which Malay texts have historically been
                  read. Political and ethical works were often classified as
                  literature, religious instruction, chronicles, or advice for
                  rulers. As a result, their constitutional dimensions remained
                  concealed.
                </p>

                <p>
                  Raja Ali Haji provides a particularly important case. His
                  writings engage directly with the responsibilities of rulers,
                  the organisation of government, the role of officials, the
                  administration of justice, the dangers of arbitrary power, and
                  the moral consequences of political misconduct.
                </p>

                <p>
                  These concerns are not peripheral to constitutionalism. They
                  address its central questions: What makes authority
                  legitimate? What duties accompany political office? How
                  should power be exercised? What constrains rulers? What is
                  government for? How should public officials be held
                  responsible?
                </p>

                <div className="my-10 rounded-3xl border border-amber-200 bg-amber-50 p-8">
                  <p className="text-xl font-semibold leading-9 text-slate-950">
                    What if Raja Ali Haji should be understood not only as a
                    literary figure, but also as one of Southeast Asia&apos;s
                    constitutional thinkers?
                  </p>
                </div>

                <p>
                  This question provides the intellectual starting point for the
                  project. It opens the possibility that constitutionalism in
                  the Malay world did not begin with colonial constitutions or
                  modern state institutions. Instead, it may be traced through
                  an earlier ethical and intellectual tradition that developed
                  its own language of authority, justice, responsibility, and
                  public order.
                </p>
              </div>
            </section>

            <section
              id="objectives"
              className="mt-24 scroll-mt-28 border-t border-slate-200 pt-16"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                Research Objectives
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Building a new constitutional framework
              </h2>

              <div className="mt-10 space-y-8">
                <div className="rounded-3xl border border-slate-200 p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
                    Objective 01
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-slate-950">
                    Recover constitutional thought
                  </h3>

                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    To reconstruct Raja Ali Haji&apos;s writings as a coherent
                    tradition of constitutional thought rather than treating
                    them only as literary, religious, or moral texts.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
                    Objective 02
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-slate-950">
                    Identify constitutional principles
                  </h3>

                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    To identify principles concerning justice, consultation,
                    accountability, ethical leadership, public responsibility,
                    and the limitation of political power.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
                    Objective 03
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-slate-950">
                    Reposition the Malay world
                  </h3>

                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    To demonstrate that the Malay world forms part of global
                    constitutional history and generated its own traditions of
                    constitutional reasoning.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
                    Objective 04
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-slate-950">
                    Develop Malay Ethical Constitutionalism
                  </h3>

                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    To formulate Malay Ethical Constitutionalism as an original
                    framework capable of contributing to comparative
                    constitutional law and global constitutional theory.
                  </p>
                </div>
              </div>
            </section>

            <section
              id="questions"
              className="mt-24 scroll-mt-28 border-t border-slate-200 pt-16"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                Research Questions
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Central questions guiding the programme
              </h2>

              <div className="mt-10 space-y-5">
                <div className="flex gap-6 rounded-3xl bg-slate-50 p-8">
                  <span className="text-3xl font-bold text-amber-700">01</span>

                  <p className="text-lg leading-8 text-slate-700">
                    How can Raja Ali Haji&apos;s writings be reconstructed as a
                    coherent body of constitutional thought rather than merely
                    literary or ethical texts?
                  </p>
                </div>

                <div className="flex gap-6 rounded-3xl bg-slate-50 p-8">
                  <span className="text-3xl font-bold text-amber-700">02</span>

                  <p className="text-lg leading-8 text-slate-700">
                    What constitutional principles concerning authority,
                    justice, accountability, consultation, and governance emerge
                    from his writings?
                  </p>
                </div>

                <div className="flex gap-6 rounded-3xl bg-slate-50 p-8">
                  <span className="text-3xl font-bold text-amber-700">03</span>

                  <p className="text-lg leading-8 text-slate-700">
                    How can these principles contribute to contemporary debates
                    on comparative constitutionalism, indigenous
                    constitutionalism, constitutional pluralism, and ethical
                    governance?
                  </p>
                </div>
              </div>
            </section>

            <section
              id="sources"
              className="mt-24 scroll-mt-28 border-t border-slate-200 pt-16"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                Primary Sources
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                The principal texts
              </h2>

              <div className="mt-10 grid gap-6">
                <div className="rounded-3xl border border-slate-200 p-8">
                  <h3 className="text-2xl font-bold italic text-slate-950">
                    Tsamarat al-Muhimmah
                  </h3>

                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    This work provides Raja Ali Haji&apos;s reflections on
                    governance, public administration, justice, leadership, and
                    the ethical obligations of political authority. It forms a
                    central foundation for reconstructing his constitutional
                    ideas.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 p-8">
                  <h3 className="text-2xl font-bold italic text-slate-950">
                    Muqaddimah fi Intizam Waza&apos;if al-Malik
                  </h3>

                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    This text discusses governmental organisation and royal
                    responsibility. It reveals a sophisticated understanding of
                    institutional administration, political office, and the
                    structure of constitutional order.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 p-8">
                  <h3 className="text-2xl font-bold italic text-slate-950">
                    Gurindam Dua Belas
                  </h3>

                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    Although commonly read as literary poetry, selected passages
                    contain significant constitutional reflections concerning
                    morality, justice, accountability, public conduct, and
                    responsible leadership.
                  </p>
                </div>
              </div>
            </section>

            <section
              id="methodology"
              className="mt-24 scroll-mt-28 border-t border-slate-200 pt-16"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                Methodology
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                An interdisciplinary research approach
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-9 text-slate-700">
                <p>
                  The programme combines legal scholarship, constitutional
                  theory, intellectual history, and comparative analysis. This
                  interdisciplinary method is necessary because Raja Ali
                  Haji&apos;s works do not resemble modern constitutional
                  documents. Their constitutional significance must be
                  reconstructed through careful reading, conceptual
                  interpretation, and historical contextualisation.
                </p>

                <h3 className="pt-5 text-2xl font-bold text-slate-950">
                  Doctrinal and conceptual analysis
                </h3>

                <p>
                  The first stage identifies concepts concerning authority,
                  responsibility, justice, administration, consultation, and
                  public order. These concepts are examined across the primary
                  texts to determine their internal relationships and normative
                  structure.
                </p>

                <h3 className="pt-5 text-2xl font-bold text-slate-950">
                  Intellectual history
                </h3>

                <p>
                  The second stage situates Raja Ali Haji&apos;s writings within
                  the political and intellectual environment of the
                  nineteenth-century Riau-Lingga Sultanate. This approach avoids
                  imposing modern constitutional terminology without regard to
                  historical context.
                </p>

                <h3 className="pt-5 text-2xl font-bold text-slate-950">
                  Conceptual coding
                </h3>

                <p>
                  Key terms and recurring themes are coded using both emic and
                  etic categories. Emic categories preserve the internal
                  language of the texts, including concepts such as amanah,
                  adab, musyawarah, justice, and responsibility. Etic categories
                  connect those concepts to wider constitutional scholarship.
                </p>

                <h3 className="pt-5 text-2xl font-bold text-slate-950">
                  Comparative constitutional analysis
                </h3>

                <p>
                  The project compares Malay constitutional thought with
                  classical Islamic political thought and contemporary
                  constitutional theory. The purpose is not to claim that all
                  traditions are identical, but to examine how different
                  traditions respond to common questions about legitimate
                  authority, justice, accountability, and the public good.
                </p>

                <h3 className="pt-5 text-2xl font-bold text-slate-950">
                  Normative synthesis
                </h3>

                <p>
                  The final stage synthesises the reconstructed principles into
                  Malay Ethical Constitutionalism. This framework is designed
                  not merely as a historical description, but as a theoretical
                  contribution capable of engaging contemporary constitutional
                  scholarship.
                </p>
              </div>
            </section>

            <section
              id="framework"
              className="mt-24 scroll-mt-28 border-t border-slate-200 pt-16"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                Core Framework
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Five principles of Malay Ethical Constitutionalism
              </h2>

              <p className="mt-8 text-lg leading-9 text-slate-700">
                Malay Ethical Constitutionalism proposes that constitutional
                legitimacy depends not only upon institutions and legal
                procedures, but also upon the ethical responsibilities attached
                to public authority. The framework is organised around five
                interconnected principles.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {principles.map((principle, index) => (
                  <div
                    key={principle.title}
                    className={`rounded-3xl border border-slate-200 p-8 ${
                      index === principles.length - 1
                        ? "md:col-span-2"
                        : ""
                    }`}
                  >
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
                      Principle {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-slate-950">
                      {principle.title}
                    </h3>

                    <p className="mt-4 text-lg leading-8 text-slate-700">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              id="contribution"
              className="mt-24 scroll-mt-28 border-t border-slate-200 pt-16"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                Original Contribution
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Moving beyond constitutional Eurocentrism
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-9 text-slate-700">
                <p>
                  The principal contribution of this project lies not simply in
                  recovering neglected texts, but in demonstrating that
                  constitutional theory has always been intellectually plural.
                  The Malay world was not merely a passive recipient of
                  constitutional ideas. It generated its own normative language
                  concerning authority, justice, responsibility, consultation,
                  and public welfare.
                </p>

                <p>
                  Within comparative constitutional law, the project broadens
                  the geographical and intellectual foundations of the field.
                  Within constitutional history, it demonstrates that
                  constitutional reasoning existed in the Malay world before the
                  consolidation of the modern constitutional state.
                </p>

                <p>
                  Within indigenous constitutionalism, the research offers a
                  Southeast Asian framework grounded in local texts,
                  institutions, and ethical concepts. Within Islamic
                  constitutional thought, it demonstrates how ideas such as
                  justice, consultation, trust, and responsibility were
                  articulated within a distinct Malay historical experience.
                </p>

                <p>
                  The project does not seek to romanticise the past or claim
                  that nineteenth-century Malay institutions were equivalent to
                  modern democratic constitutional systems. Instead, it argues
                  that the history of constitutional thought should include
                  multiple traditions that developed their own answers to shared
                  political and ethical questions.
                </p>
              </div>
            </section>

            <section
              id="outputs"
              className="mt-24 scroll-mt-28 border-t border-slate-200 pt-16"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                Research Outputs
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Planned scholarly contributions
              </h2>

              <div className="mt-10 rounded-3xl bg-slate-950 p-8 text-white md:p-10">
                <ul className="space-y-5">
                  {researchOutputs.map((output) => (
                    <li
                      key={output}
                      className="flex gap-4 text-lg leading-8 text-slate-300"
                    >
                      <span className="mt-1 text-amber-400">◆</span>
                      <span>{output}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                  Current Research Progress
                </p>

                <div className="mt-8 space-y-6">
                  {[
                    ["Primary source collection", "Completed"],
                    ["Literature review", "Completed"],
                    ["Conceptual coding", "In Progress"],
                    ["Comparative analysis", "In Progress"],
                    ["Framework development", "Ongoing"],
                    ["International publication", "Upcoming"],
                    ["Book manuscript", "Planned"],
                  ].map(([stage, status]) => (
                    <div
                      key={stage}
                      className="flex flex-col gap-2 border-b border-slate-200 pb-5 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <p className="font-medium text-slate-950">{stage}</p>

                      <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-amber-700">
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section
              id="vision"
              className="mt-24 scroll-mt-28 border-t border-slate-200 pt-16"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                Long-Term Vision
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                From Penyengat to global constitutional scholarship
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-9 text-slate-700">
                <p>
                  Malay Ethical Constitutionalism is conceived not as a single
                  article or isolated research project, but as a continuing
                  scholarly programme. Its long-term ambition is to establish
                  the Malay world as a recognised contributor to global
                  constitutional thought.
                </p>

                <p>
                  The programme seeks to recover neglected constitutional
                  traditions, produce internationally recognised scholarship,
                  encourage comparative dialogue, and support future research
                  on Raja Ali Haji, Malay intellectual history, indigenous
                  constitutionalism, and ethical governance.
                </p>

                <p>
                  Ultimately, this project seeks to reshape how constitutional
                  history is written. Constitutionalism should not be described
                  as a single intellectual tradition originating in one region
                  and later transmitted to others. Different societies have
                  developed their own constitutional languages in response to
                  universal questions about authority, justice, accountability,
                  responsibility, and the public good.
                </p>

                <p>
                  By reconstructing Raja Ali Haji&apos;s constitutional thought,
                  this research demonstrates that the Malay world did not merely
                  receive constitutional ideas from elsewhere. It generated its
                  own sophisticated constitutional tradition. Recognising that
                  tradition is both an act of historical recovery and an
                  invitation to rethink the foundations of global
                  constitutional scholarship.
                </p>
              </div>

              <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-10 sm:flex-row">
                <Link
                  href="/research"
                  className="inline-flex justify-center rounded-xl bg-slate-950 px-7 py-4 font-semibold text-white transition hover:bg-amber-700"
                >
                  Explore Research Hub
                </Link>

                <Link
                  href="/raja-ali-haji"
                  className="inline-flex justify-center rounded-xl border border-slate-300 px-7 py-4 font-semibold text-slate-900 transition hover:border-amber-700 hover:text-amber-700"
                >
                  Explore Raja Ali Haji Studies
                </Link>
              </div>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}