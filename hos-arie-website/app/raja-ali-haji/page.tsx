import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  FileText,
  GraduationCap,
  Landmark,
  Library,
  Network,
  PlayCircle,
  ScrollText,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Raja Ali Haji Institute",
  description:
    "Raja Ali Haji Institute is a centre for informal learning, research, and the development of Raja Ali Haji's thought and Malay civilisation.",
  keywords: [
    "Raja Ali Haji Institute",
    "Raja Ali Haji",
    "Malay thought",
    "Malay civilisation",
    "Malay constitutional thought",
    "Malay Ethical Constitutionalism",
    "informal learning",
    "digital archive",
  ],
  alternates: { canonical: "/raja-ali-haji" },
  openGraph: {
    title: "Raja Ali Haji Institute",
    description:
      "A centre for Raja Ali Haji studies, informal learning, research, and Malay civilisation.",
    url: "https://www.hossibarani.com/raja-ali-haji",
    type: "website",
  },
};

const pillars = [
  {
    icon: GraduationCap,
    label: "Learning",
    title: "Open and Informal Learning",
    description:
      "Accessible courses, public lectures, guided readings, and scholarly conversations that bring Raja Ali Haji's intellectual legacy to wider audiences.",
  },
  {
    icon: Landmark,
    label: "Research",
    title: "An Intellectual Research Centre",
    description:
      "Original and collaborative research on Raja Ali Haji, Malay constitutional thought, ethical governance, language, literature, and civilisation.",
  },
  {
    icon: Library,
    label: "Knowledge Centre",
    title: "A Living Digital Repository",
    description:
      "A growing home for manuscripts, commentaries, modules, recordings, bibliographies, and research resources for future generations.",
  },
];

const courses = [
  {
    number: "01",
    category: "Open Learning Programme",
    title: "Foundations of Raja Ali Haji's Thought",
    description:
      "A structured introduction to Raja Ali Haji, the Riau-Lingga world, Gurindam Dua Belas, his principal works, and the continuing relevance of his ideas.",
    lessons: "8 of 8 modules available",
    status: "Open Now",
    href: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji",
  },
  {
    number: "02",
    category: "Ethics and Character",
    title: "Gurindam Dua Belas: Ethics for Public Life",
    description:
      "A guided reading of Gurindam Dua Belas as a framework for personal character, leadership, social responsibility, and public ethics.",
    lessons: "6 learning sessions",
    status: "Planned",
    href: null,
  },
  {
    number: "03",
    category: "Governance and Law",
    title: "Malay Ethical Constitutionalism",
    description:
      "A study of authority, consultation, accountability, justice, and the ethical limits of power in Raja Ali Haji's political writings.",
    lessons: "8 learning sessions",
    status: "Planned",
    href: null,
  },
];

const thoughtAreas = [
  "Ethical authority and legitimate government",
  "Consultation and shared responsibility",
  "Accountability and the duties of public office",
  "Justice and the moral limits of power",
  "Language, literature, and Malay intellectual history",
  "Islam, character, and public civilisation",
];

const programmes = [
  {
    icon: PlayCircle,
    title: "Online Courses",
    text: "Structured courses with video lessons, readings, reflections, discussions, progress tracking, and digital certificates.",
  },
  {
    icon: Users,
    title: "Public Lectures",
    text: "Open lectures and conversations with scholars, cultural thinkers, writers, and community leaders from across the Malay world.",
  },
  {
    icon: ScrollText,
    title: "Manuscript Studies",
    text: "Reading groups and learning resources dedicated to Malay-Jawi texts, transcription, interpretation, and intellectual history.",
  },
  {
    icon: Network,
    title: "Research Network",
    text: "Collaborative projects, fellowships, visiting scholars, and institutional partnerships that connect local knowledge with global scholarship.",
  },
];

const archiveItems = [
  { icon: ScrollText, label: "Primary Texts", value: "Manuscripts and editions" },
  { icon: FileText, label: "Research Library", value: "Articles and working papers" },
  { icon: PlayCircle, label: "Media Archive", value: "Lectures and conversations" },
  { icon: BookOpen, label: "Learning Resources", value: "Modules and reading guides" },
];

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.28em] ${light ? "text-amber-300" : "text-amber-700"}`}>
      {children}
    </p>
  );
}

export default function RajaAliHajiInstitutePage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative isolate overflow-hidden bg-slate-950 px-5 py-20 text-white sm:px-6 md:py-28 lg:px-8 lg:py-32">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_85%_15%,rgba(180,83,9,0.22),transparent_28%),radial-gradient(circle_at_10%_85%,rgba(30,41,59,0.9),transparent_36%)]" />
        <div className="absolute -right-28 -top-36 -z-10 h-[32rem] w-[32rem] rounded-full border border-amber-500/15" />
        <div className="absolute -right-12 -top-20 -z-10 h-[22rem] w-[22rem] rounded-full border border-amber-500/10" />

        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-amber-400/25 bg-amber-300/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <Eyebrow light>A Living Lab of Malay Civilisation</Eyebrow>
          </div>

          <div className="mt-8 grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="font-academic text-xl text-amber-300 sm:text-2xl">Raja Ali Haji Institute</p>
              <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Learning from Raja Ali Haji. Shaping the future of Malay thought.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
                A centre for informal learning, research, and knowledge dedicated
                to developing Raja Ali Haji&apos;s intellectual legacy and bringing
                Malay thought into contemporary and global conversations.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/raja-ali-haji/programmes/pemikiran-raja-ali-haji" className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-4 font-semibold text-white transition hover:bg-amber-500">
                  Explore Learning Programmes <ArrowRight size={18} />
                </Link>
                <Link href="#about-institute" className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-6 py-4 font-semibold text-white transition hover:border-amber-300/50 hover:bg-white/10">
                  Discover the Institute
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8 lg:items-stretch">
              <div className="relative mx-auto w-full max-w-[25rem]">
                <div className="absolute inset-12 rounded-full bg-amber-500/10 blur-3xl" />
                <Image
                  src="/images/raja-ali-haji-logo-hero-v2.png"
                  alt="Raja Ali Haji Institute Jawi emblem"
                  width={1200}
                  height={1200}
                  priority
                  className="relative h-auto w-full drop-shadow-[0_24px_50px_rgba(0,0,0,0.35)]"
                />
              </div>

              <aside className="border-l border-amber-400/40 pl-6 lg:pl-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                  Our proposition
                </p>
                <p className="mt-4 font-academic text-xl leading-9 text-slate-200">
                  Raja Ali Haji is not only a figure of the past. His works remain
                  a living source for ethics, governance, language, identity, and civilisation.
                </p>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section id="about-institute" className="scroll-mt-24 px-5 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <Eyebrow>About the Institute</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              A public home for Raja Ali Haji&apos;s intellectual legacy
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-600">
            <p>
              Raja Ali Haji Institute is an independent intellectual platform
              established to study, teach, preserve, and develop the thought of
              Raja Ali Haji. It connects historical texts with the questions of
              our time through open education, serious research, and public scholarship.
            </p>
            <p>
              The Institute is designed as a meeting place for students,
              teachers, researchers, public leaders, cultural communities, and
              anyone seeking to understand the ethical and intellectual
              foundations of Malay civilisation.
            </p>
            <div className="grid gap-4 pt-3 sm:grid-cols-2">
              {["Rooted in the Malay world", "Open to global scholarship", "Scholarly yet accessible", "Past knowledge, future relevance"].map((item) => (
                <div key={item} className="flex items-start gap-3 text-base font-semibold text-slate-800">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-amber-700" size={20} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-stone-50 px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Our Three Pillars</Eyebrow>
          <div className="mt-5 flex max-w-4xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Learn. Research. Preserve.</h2>
            <p className="max-w-xl leading-7 text-slate-600">Three connected functions transform intellectual heritage into a living and accessible body of knowledge.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.label} className="group border border-stone-200 bg-white p-7 transition hover:-translate-y-1 hover:border-amber-600/40 hover:shadow-xl hover:shadow-slate-900/5 sm:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-700"><Icon size={24} /></div>
                  <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-amber-700">{pillar.label}</p>
                  <h3 className="mt-3 text-2xl font-bold text-slate-950">{pillar.title}</h3>
                  <p className="mt-4 leading-7 text-slate-600">{pillar.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Centre of Thought</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Raja Ali Haji for the contemporary world</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">The Institute approaches Raja Ali Haji as a multidimensional thinker whose works connect ethics, government, law, religion, language, history, and public life.</p>
            <div className="mt-8 border-l-4 border-amber-700 pl-6">
              <p className="font-academic text-xl italic leading-9 text-slate-700">The Malay world is not merely a recipient of ideas, but a source of intellectual and constitutional innovation.</p>
            </div>
          </div>
          <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2">
            {thoughtAreas.map((area, index) => (
              <div key={area} className="bg-white p-7 sm:min-h-48">
                <p className="text-sm font-bold text-amber-700">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-8 text-xl font-bold leading-8 text-slate-950">{area}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="courses" className="scroll-mt-24 bg-slate-950 px-5 py-20 text-white sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow light>Informal Learning</Eyebrow>
              <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">Learn deeply, without the boundaries of a formal classroom</h2>
            </div>
            <div className="max-w-lg">
              <p className="leading-7 text-slate-300">Short, flexible, intellectually rigorous programmes designed for learners from different educational and professional backgrounds.</p>
              <span className="mt-5 inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Learning platform now open</span>
            </div>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {courses.map((course) => {
              const content = <>
                <div className="flex items-center justify-between gap-5">
                  <span className="font-academic text-3xl text-amber-300">{course.number}</span>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${course.href ? "border-emerald-300/40 bg-emerald-300/10 text-emerald-300" : "border-white/10 text-slate-300"}`}>{course.status}</span>
                </div>
                <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">{course.category}</p>
                <h3 className="mt-4 text-2xl font-bold leading-9">{course.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{course.description}</p>
                <div className="mt-auto border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2 text-sm text-slate-400"><CalendarDays size={17} /> {course.lessons}</div>
                  {course.href && <span className="mt-5 inline-flex items-center gap-2 font-semibold text-amber-300">Start Learning <ArrowRight size={17} /></span>}
                </div>
              </>;
              return course.href ? (
                <Link key={course.number} href={course.href} className="flex min-h-[26rem] flex-col border border-amber-400/30 bg-white/[0.06] p-7 transition hover:-translate-y-1 hover:border-amber-300 hover:bg-white/[0.09] sm:p-8">{content}</Link>
              ) : (
                <article key={course.number} className="flex min-h-[26rem] flex-col border border-white/10 bg-white/[0.04] p-7 sm:p-8">{content}</article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Institute Programmes</Eyebrow>
          <h2 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">An intellectual ecosystem beyond the classroom</h2>
          <div className="mt-12 grid gap-x-10 gap-y-5 md:grid-cols-2">
            {programmes.map((programme) => {
              const Icon = programme.icon;
              return (
                <article key={programme.title} className="grid grid-cols-[3rem_1fr] gap-5 border-t border-slate-200 py-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-amber-300"><Icon size={22} /></div>
                  <div><h3 className="text-2xl font-bold text-slate-950">{programme.title}</h3><p className="mt-3 leading-7 text-slate-600">{programme.text}</p></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-amber-50 px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <div>
            <Eyebrow>Digital Knowledge Centre</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Preserving knowledge. Expanding access.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">The Institute will develop a curated digital environment where primary texts, scholarship, teaching materials, and public conversations can be discovered together.</p>
            <Link href="/#digital-archive" className="mt-8 inline-flex items-center gap-2 font-bold text-amber-800 transition hover:text-slate-950">Visit the existing Digital Archive <ArrowRight size={18} /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {archiveItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="border border-amber-900/10 bg-white p-7 shadow-sm">
                  <Icon className="text-amber-700" size={25} />
                  <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">{item.label}</p>
                  <p className="mt-2 font-academic text-xl font-bold text-slate-950">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div><Eyebrow>Roadmap 2026â€“2030</Eyebrow><h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">From platform to global reference centre</h2></div>
          <div>
            {[
              ["2026", "Foundation", "Public institute page, inaugural lectures, foundational courses, and learning community."],
              ["2027", "Learning Platform", "Dedicated LMS, structured course pathways, learner accounts, and digital certificates."],
              ["2028", "Research and Fellowship", "Collaborative projects, visiting scholars, fellowships, and working-paper series."],
              ["2029â€“2030", "Malay World Network", "Regional partnerships, digital collections, and an internationally connected centre for Malay civilisation."],
            ].map(([year, title, text]) => (
              <article key={year} className="grid gap-3 border-t border-slate-200 py-7 sm:grid-cols-[7rem_11rem_1fr] sm:gap-6">
                <p className="font-academic text-xl font-bold text-amber-700">{year}</p><h3 className="font-bold text-slate-950">{title}</h3><p className="leading-7 text-slate-600">{text}</p>
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
              <Eyebrow light>Build the Institute with Us</Eyebrow>
              <h2 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl">Connect scholarship, community, and the future of Malay civilisation.</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">We welcome scholars, educators, cultural institutions, and partners interested in courses, research, archives, lectures, and collaborative programmes.</p>
            </div>
            <Link href="/#contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-4 font-semibold text-white transition hover:bg-amber-500">Start a Conversation <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}




