import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Building2,
  FileCheck2,
  FileText,
  Gavel,
  GraduationCap,
  Landmark,
  Scale,
  ScrollText,
  ShieldCheck,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Constitutional Justice Initiative",
  description:
    "An independent platform for constitutional scholarship, advocacy, legal analysis, public education, and the advancement of constitutional justice in Indonesia.",
  keywords: [
    "Constitutional Justice Initiative",
    "constitutional law Indonesia",
    "Mahkamah Konstitusi",
    "judicial review",
    "constitutional litigation",
    "constitutional rights",
    "constitutional advocacy",
    "Hos Arie Sibarani",
  ],
  alternates: { canonical: "/constitutional-justice" },
  openGraph: {
    title: "Constitutional Justice Initiative",
    description:
      "Scholarship, advocacy, legal analysis, and public service for constitutional justice.",
    url: "https://www.hossibarani.com/constitutional-justice",
    type: "website",
  },
};

const pillars = [
  {
    icon: BookOpen,
    label: "Scholarship",
    title: "Constitutional Ideas",
    description:
      "Research and writing that connect constitutional doctrine, institutional design, rights, democracy, and Indonesian constitutional experience.",
  },
  {
    icon: Gavel,
    label: "Advocacy",
    title: "Constitutional Practice",
    description:
      "Professional legal work, constitutional argument, public-interest advocacy, and responsible engagement with courts and state institutions.",
  },
  {
    icon: Users,
    label: "Public Service",
    title: "Constitutional Citizenship",
    description:
      "Accessible public education that strengthens constitutional literacy, democratic responsibility, and respect for the rule of law.",
  },
];

const focusAreas = [
  { icon: Scale, title: "Judicial Review", text: "Constitutional review of legislation, legal standing, constitutional injury, remedies, and judicial reasoning." },
  { icon: ShieldCheck, title: "Constitutional Rights", text: "Protection of civil, political, social, and equality rights guaranteed by the Constitution." },
  { icon: Landmark, title: "State Institutions", text: "Institutional authority, checks and balances, separation of powers, and constitutional accountability." },
  { icon: Building2, title: "Democracy and Elections", text: "Electoral law, representation, democratic participation, and the integrity of constitutional government." },
  { icon: Gavel, title: "Judicial Independence", text: "Judicial ethics, institutional integrity, impartial adjudication, and public confidence in constitutional justice." },
  { icon: ScrollText, title: "Indigenous Constitutionalism", text: "Malay constitutional thought, legal pluralism, local knowledge, and Indonesia's constitutional identity." },
];

const workStreams = [
  { number: "01", title: "Constitutional Case Notes", text: "Structured analyses of Constitutional Court decisions: issues, reasoning, separate opinions, implications, and critical evaluation." },
  { number: "02", title: "Legal Opinions", text: "Public constitutional memoranda, legal opinions, expert analysis, legislative studies, and policy briefs that may responsibly be disclosed." },
  { number: "03", title: "Constitutional Casework", text: "A verified professional record of relevant matters, roles, forums, constitutional questions, and publicly available outcomes." },
  { number: "04", title: "Public Interest Advocacy", text: "Amicus briefs, rights-based initiatives, public consultations, and principled contributions to constitutional reform." },
];

const classroom = [
  "How to Read a Constitutional Court Decision",
  "Introduction to Judicial Review in Indonesia",
  "Constitutional Rights in Legal Practice",
  "Writing a Constitutional Legal Opinion",
  "Constitutional Court Procedure",
  "Judicial Ethics and Constitutional Responsibility",
];

const standards = [
  "Every professional claim is supported by verifiable work.",
  "Client confidentiality and legal privilege remain protected.",
  "Published analysis is independent, reasoned, and evidence-based.",
  "Public education is separated from advice for a specific case.",
  "Conflicts of interest are recognised and responsibly managed.",
  "Constitutional disagreement is addressed with civility and integrity.",
];

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-xs font-bold uppercase tracking-[0.27em] ${light ? "text-amber-300" : "text-rose-900"}`}>{children}</p>;
}

function JusticeIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[31rem] lg:mr-0">
      <div className="absolute inset-x-12 bottom-8 h-3/4 rounded-full bg-amber-400/10 blur-3xl" />
      <Image
        src="/images/lady-justice-cji.png"
        alt="Lady Justice holding balanced scales and a sword"
        width={1024}
        height={1536}
        priority
        className="relative h-auto w-full object-contain drop-shadow-[0_28px_50px_rgba(0,0,0,0.45)]"
        sizes="(max-width: 1023px) 70vw, 32vw"
      />
    </div>
  );
}

export default function ConstitutionalJusticePage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative isolate overflow-hidden bg-slate-950 px-5 py-20 text-white sm:px-6 md:py-28 lg:px-8 lg:py-32">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_85%_10%,rgba(127,29,29,0.42),transparent_32%),radial-gradient(circle_at_10%_90%,rgba(30,41,59,0.95),transparent_38%)]" />
        <div className="absolute -right-24 -top-32 -z-10 h-[34rem] w-[34rem] rounded-full border border-amber-400/15" />
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-amber-300/25 bg-white/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <Eyebrow light>Constitution • Justice • Public Service</Eyebrow>
          </div>

          <div className="mt-9 grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="font-academic text-xl text-amber-300 sm:text-2xl">Constitutional Justice Initiative</p>
              <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Advancing constitutional justice through scholarship, advocacy, and public service.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
                An independent platform documenting constitutional thought,
                professional legal contribution, judicial analysis, and public
                education in support of constitutional democracy in Indonesia.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="#constitutional-work" className="inline-flex items-center gap-2 rounded-xl bg-rose-900 px-6 py-4 font-semibold text-white transition hover:bg-rose-800">
                  Explore Constitutional Work <ArrowRight size={18} />
                </Link>
                <Link href="#principles" className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-6 py-4 font-semibold transition hover:border-amber-300/50 hover:bg-white/10">
                  Our Professional Principles
                </Link>
              </div>
            </div>

            <aside className="space-y-8">
              <JusticeIllustration />
              <div className="border-l border-amber-400/40 pl-6 lg:pl-8">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">Core commitment</p>
                <p className="mt-4 font-academic text-xl leading-9 text-slate-200">
                  Constitutional justice requires legal knowledge, independence,
                  ethical judgment, institutional responsibility, and fidelity to
                  the dignity and rights of every citizen.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <Eyebrow>About the Initiative</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">A bridge between constitutional ideas and legal practice</h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-600">
            <p>
              Constitutional Justice Initiative brings together the academic and
              professional dimensions of Dr. Hos Arie Sibarani&apos;s work as a
              constitutional law scholar, educator, researcher, and advocate.
            </p>
            <p>
              It is designed as a transparent public record of serious
              constitutional engagement: published analysis, verified legal
              work, educational programmes, and contributions to the protection
              of constitutional government and citizens&apos; rights.
            </p>
            <div className="border-l-4 border-rose-900 pl-6">
              <p className="font-academic text-xl italic leading-9 text-slate-700">
                The strength of a constitutional record lies not in titles or
                declarations, but in consistent, verifiable, and principled work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-stone-50 px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Three Foundations</Eyebrow>
          <h2 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Ideas, practice, and responsibility</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.label} className="border border-stone-200 bg-white p-7 transition hover:-translate-y-1 hover:border-rose-900/35 hover:shadow-xl hover:shadow-slate-900/5 sm:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-900"><Icon size={24} /></div>
                  <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-rose-900">{pillar.label}</p>
                  <h3 className="mt-3 text-2xl font-bold text-slate-950">{pillar.title}</h3>
                  <p className="mt-4 leading-7 text-slate-600">{pillar.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Areas of Focus</Eyebrow>
          <h2 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">The constitutional questions that shape public life</h2>
          <div className="mt-12 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <article key={area.title} className="bg-white p-7 sm:min-h-64">
                  <Icon className="text-rose-900" size={26} />
                  <h3 className="mt-10 text-2xl font-bold text-slate-950">{area.title}</h3>
                  <p className="mt-4 leading-7 text-slate-600">{area.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="constitutional-work" className="scroll-mt-24 bg-slate-950 px-5 py-20 text-white sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <Eyebrow light>Public Record</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">A constitutional portfolio built through actual work</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">Each stream will develop into a searchable and verifiable archive as new work is published.</p>
            <span className="mt-7 inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Archive in development</span>
          </div>
          <div>
            {workStreams.map((stream) => (
              <article key={stream.number} className="grid gap-4 border-t border-white/15 py-7 sm:grid-cols-[4rem_14rem_1fr] sm:gap-6">
                <p className="font-academic text-2xl text-amber-300">{stream.number}</p>
                <h3 className="text-xl font-bold">{stream.title}</h3>
                <p className="leading-7 text-slate-300">{stream.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Eyebrow>Constitutional Classroom</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Making constitutional knowledge accessible</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">Future short courses, public lectures, and practitioner learning programmes can connect to the Raja Ali Haji Institute learning platform.</p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-rose-50 px-4 py-2 text-sm font-bold text-rose-900"><GraduationCap size={18} /> Learning programmes coming soon</div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {classroom.map((course, index) => (
              <article key={course} className="border border-slate-200 p-6">
                <p className="text-sm font-bold text-rose-900">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 text-xl font-bold leading-8 text-slate-950">{course}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="principles" className="scroll-mt-24 bg-rose-950 px-5 py-20 text-white sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <Eyebrow light>Professional Ethics</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">Integrity is part of constitutional competence</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {standards.map((standard) => (
              <div key={standard} className="flex items-start gap-3 border border-white/10 bg-white/5 p-5 leading-7 text-rose-50">
                <FileCheck2 className="mt-0.5 shrink-0 text-amber-300" size={20} />
                <p>{standard}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Publication Pathway</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">From constitutional analysis to an enduring public record</h2>
          </div>
          <div className="space-y-0">
            {[
              ["Case Notes", "Regular, structured analysis of Constitutional Court decisions."],
              ["Constitutional Briefs", "Concise policy and institutional analysis for public understanding."],
              ["Professional Record", "Verified casework and publicly disclosable legal contributions."],
              ["Public Education", "Lectures, courses, discussions, and constitutional literacy resources."],
            ].map(([title, text], index) => (
              <article key={title} className="grid grid-cols-[3rem_1fr] gap-5 border-t border-slate-200 py-7">
                <p className="font-academic text-xl font-bold text-rose-900">{String(index + 1).padStart(2, "0")}</p>
                <div><h3 className="text-xl font-bold text-slate-950">{title}</h3><p className="mt-2 leading-7 text-slate-600">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 md:pb-28 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden bg-slate-950 px-7 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
          <div className="absolute -right-24 -top-36 h-80 w-80 rounded-full border border-amber-400/15" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow light>Engage with the Initiative</Eyebrow>
              <h2 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl">Constitutional justice grows through principled dialogue and serious work.</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">The Initiative welcomes academic collaboration, constitutional education, public lectures, research, and responsible professional engagement.</p>
              <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-400">Information on this page is for education and public understanding and does not constitute legal advice for a particular matter.</p>
            </div>
            <Link href="/#contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-900 px-6 py-4 font-semibold transition hover:bg-rose-800">Start a Conversation <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
