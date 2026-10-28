import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Bot,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  FlaskConical,
  Gauge,
  GitCommitHorizontal,
  Layers3,
  NotebookText,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI & Digital Systems Lab",
  description:
    "Documented AI, legal technology, education, and institutional systems developed and tested within the Hossibarani digital ecosystem.",
  alternates: { canonical: "/ai-lab" },
};

type Status = "Prototype" | "Pilot" | "Stable" | "Production";

type Lab = {
  number: string;
  title: string;
  shortTitle: string;
  status: Status;
  domain: string;
  problem: string;
  system: string;
  technology: string;
  testing: string;
  result: string;
  lastTested: string;
  currentMetric: string;
  whatChanged: string;
  experimentNotes: string;
  href: string;
  linkLabel: string;
};

const labs: Lab[] = [
  {
    number: "006", title: "Hukumpreneur Studio — Video Clips", shortTitle: "Turn a complete idea into a shareable clip.", status: "Prototype", domain: "Educational video",
    problem: "Lectures and academic forums need short excerpts that preserve context.",
    system: "A browser workspace for trimming local videos, composing vertical clips, adding SRT captions, and exporting video and covers.",
    technology: "Browser canvas, Web Audio and MediaRecorder; local templates and project settings.",
    testing: "Export format depends on browser support. Keep the tab active during rendering.",
    result: "Local video editing is available. Automatic YouTube ingestion, AI highlights and cloud storage are not connected.",
    lastTested: "19 October 2026", currentMetric: "Up to 180 seconds per exported clip.",
    whatChanged: "Added BIAF, RAHRN, Hossibarani and law lecture templates.",
    experimentNotes: "Review the excerpt and captions before sharing. Download results before closing the page.",
    href: "/clip-studio", linkLabel: "Open Hukumpreneur Studio",
  },
  {
    number: "001",
    title: "LEX-EVAL™ Legal AI Benchmark",
    shortTitle: "Legal answers need evidence, not confidence.",
    status: "Pilot",
    domain: "Legal AI evaluation",
    problem:
      "Legal AI can produce fluent answers while missing authority, doctrine, jurisdiction, or the limits of the available evidence.",
    system:
      "A structured benchmark for comparing AI-generated legal answers through a controlled corpus, scoring rubric, evaluator workflow, and documented outputs.",
    technology:
      "Multi-model evaluation, prompt controls, answer capture, doctrinal scoring, citation review, and empirical comparison across runs.",
    testing:
      "Pilot Round E01–E05 tests three models in one run each, producing 15 actual outputs before expansion to the full empirical corpus.",
    result:
      "The benchmark framework and public sample can be opened and reviewed. Empirical validation remains in the pilot stage.",
    lastTested: "05 September 2026",
    currentMetric: "Pilot protocol: 5 questions × 3 models × 1 run = 15 planned outputs.",
    whatChanged:
      "The benchmark moved from a conceptual framework to a smaller empirical pilot before the full 180-output study.",
    experimentNotes:
      "Scores will be reported only after the 15 outputs have been captured, reviewed, and checked for evaluator consistency.",
    href: "/lexnusa/lex-eval",
    linkLabel: "Review LEX-EVAL™",
  },
  {
    number: "002",
    title: "LexNusa Legal Research Assistant",
    shortTitle: "Legal research should remain traceable to authority.",
    status: "Prototype",
    domain: "Legal research system",
    problem:
      "Researchers and legal professionals need faster issue mapping and synthesis without surrendering verification, confidentiality, or professional judgment.",
    system:
      "A human-supervised legal AI service for research, document analysis, legal evaluation, and structured pilot engagements.",
    technology:
      "Retrieval-guided workflows, structured prompts, source verification, human review, secure intake, and proposal-to-delivery operations.",
    testing:
      "Readiness is assessed through LEX-EVAL™, sample deliverables, controlled pilot requests, and explicit review checkpoints.",
    result:
      "The service architecture, evidence standard, packages, pilot pathway, and sample benchmark are publicly documented.",
    lastTested: "05 September 2026",
    currentMetric: "Public evidence pathway available; client pilot performance baseline not yet published.",
    whatChanged:
      "The project expanded from a research-assistant concept into a supervised pilot service with evidence and delivery checkpoints.",
    experimentNotes:
      "The next meaningful measure is not traffic, but whether pilot outputs remain traceable to authoritative legal sources.",
    href: "/lexnusa/evidence",
    linkLabel: "Inspect the evidence standard",
  },
  {
    number: "003",
    title: "SIMAKS School Accreditation System",
    shortTitle: "Accreditation work needs one accountable workspace.",
    status: "Pilot",
    domain: "Education operations",
    problem:
      "School accreditation evidence is often dispersed across people, files, indicators, and review cycles, making readiness difficult to monitor.",
    system:
      "A role-based workspace where school leaders can claim a school, invite accreditation teams, manage evidence, and coordinate verification by supervisors or education authorities.",
    technology:
      "Next.js, Supabase authentication and database services, role-based access, Row Level Security, team invitations, and evidence workflows.",
    testing:
      "Access is tested by role: participants see authorised school data, while verification and administrative views remain restricted to approved users.",
    result:
      "A public product entry point and account flow are available. Institutional onboarding and role verification remain pilot activities.",
    lastTested: "05 September 2026",
    currentMetric: "Four access roles defined: school leader, accreditation team, supervisor, and education authority.",
    whatChanged:
      "Public self-registration was extended with role selection, school claims, team invitations, and external verification boundaries.",
    experimentNotes:
      "Pilot validation must confirm that each role can complete its work without seeing records outside its authorised school scope.",
    href: "/simak",
    linkLabel: "Open SIMAKS",
  },
  {
    number: "004",
    title: "Raja Ali Haji Learning Platform",
    shortTitle: "A classical intellectual tradition, made learnable.",
    status: "Production",
    domain: "Digital learning",
    problem:
      "Raja Ali Haji's ideas are intellectually significant but remain difficult for many learners to access through a coherent, guided pathway.",
    system:
      "An eight-module learning experience combining readings, podcasts, reflection, essays, quizzes, saved progress, and verifiable certification.",
    technology:
      "Next.js learning routes, participant authentication, Supabase-backed progress, assessment workflows, certificate validation, and cohort administration.",
    testing:
      "Completion requires all mandatory module activities, a minimum quiz score of 70 in each module, and a final reflection in Module 8.",
    result:
      "All eight modules are publicly available, while participant progress and certification operate through authenticated accounts.",
    lastTested: "05 September 2026",
    currentMetric: "8 learning modules available; certificate threshold requires ≥70 on every required module quiz.",
    whatChanged:
      "The programme progressed from public learning content to authenticated progress, assessment, reflection, and certificate validation.",
    experimentNotes:
      "Learning impact will be evaluated through baseline–endline change, completion, quiz results, reflection quality, and participant feedback.",
    href: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji",
    linkLabel: "Review the learning programme",
  },
  {
    number: "005",
    title: "AI Agent Hossibarani Digital Ecosystem",
    shortTitle: "One ecosystem needs coordinated intelligence and clear limits.",
    status: "Prototype",
    domain: "Agent architecture",
    problem:
      "A growing network of websites, research programmes, learning platforms, legal technology, and institutional initiatives creates fragmented operational knowledge.",
    system:
      "A control-centre architecture for specialised agents that can inspect, diagnose, score, and recommend improvements across the ecosystem.",
    technology:
      "Role-separated agents, restricted control-centre access, audit trails, structured diagnostics, and integrations with development and analytics services.",
    testing:
      "The current phase is deliberately read-only: agents may audit GitHub, Vercel, website health, and SEO but may not commit, merge, deploy, or alter production automatically.",
    result:
      "The access boundary and control-centre foundation are established. Autonomous production actions remain disabled by design.",
    lastTested: "05 September 2026",
    currentMetric: "Read-only operating boundary active; 0 autonomous commit, merge, or production deployment permissions.",
    whatChanged:
      "The concept was narrowed into a governed control centre with specialised diagnostics and explicit production restrictions.",
    experimentNotes:
      "Permission expansion will be considered only after audit quality, traceability, and safe human approval paths are demonstrated.",
    href: "/control-center",
    linkLabel: "View the control centre",
  },
  {
    number: "006",
    title: "Automated Pilot Cohort Management",
    shortTitle: "Learning support should respond before participants fall behind.",
    status: "Pilot",
    domain: "Programme automation",
    problem:
      "A four-week learning cohort requires consistent reminders, progress follow-up, certificate eligibility checks, and credible final reporting.",
    system:
      "An operational layer for weekly communication, lagging-participant reminders, completion validation, evaluation, and executive cohort reporting.",
    technology:
      "Scheduled workflows, progress rules, communication templates, assessment data, certificate logic, administrative dashboards, and PDF reporting.",
    testing:
      "The pilot tracks module completion, quiz thresholds, reflection submission, weekly progress, baseline–endline change, and participant evaluation.",
    result:
      "Participant and administrator workflows are implemented for the first Raja Ali Haji Institute pilot cohort and await live cohort validation.",
    lastTested: "05 September 2026",
    currentMetric: "4-week cohort workflow with weekly monitoring and certificate eligibility checks prepared for pilot validation.",
    whatChanged:
      "The learning platform gained weekly messages, lagging-participant reminders, eligibility rules, evaluation, and executive reporting.",
    experimentNotes:
      "The first live cohort will establish delivery, engagement, completion, reminder-response, and baseline–endline benchmarks.",
    href: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji",
    linkLabel: "See the pilot programme",
  },
];

const statusStyle: Record<Status, string> = {
  Prototype: "border-violet-200 bg-violet-50 text-violet-800",
  Pilot: "border-amber-200 bg-amber-50 text-amber-800",
  Stable: "border-blue-200 bg-blue-50 text-blue-800",
  Production: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

const evidenceFields = [
  ["Problem", "The question or operational constraint being addressed", Gauge],
  ["System", "The product, workflow, or capability that was built", Layers3],
  ["Technology & method", "The technical and analytical approach", Wrench],
  ["Testing", "How usefulness, safety, or performance is assessed", FlaskConical],
  ["Verifiable result", "What a visitor can inspect or confirm", CheckCircle2],
] as const;

export default function AiLabPage() {
  const counts = labs.reduce<Record<Status, number>>(
    (total, lab) => ({ ...total, [lab.status]: total[lab.status] + 1 }),
    { Prototype: 0, Pilot: 0, Stable: 0, Production: 0 },
  );

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(245,158,11,0.16),transparent_34%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
            <div className="max-w-4xl">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
                <Bot size={17} aria-hidden="true" /> Hossibarani Digital Ecosystem
              </p>
              <h1 className="font-academic mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                AI &amp; Digital Systems Lab
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
                A public record of systems built to test how AI, legal technology,
                digital learning, and institutional automation perform in real work.
              </p>
            </div>
            <div className="border-l border-amber-400/50 pl-6">
              <p className="text-sm font-semibold text-amber-300">Documentation principle</p>
              <p className="mt-3 leading-7 text-slate-300">
                Each lab records the problem, system, method, test, result, and current
                maturity. Status describes evidence—not ambition.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="agency-agents-title" lang="id" className="border-b border-slate-200 bg-stone-50 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-800">Agency Agents · Katalog &amp; ruang praktik</p>
          <h2 id="agency-agents-title" className="mt-3 text-3xl font-bold text-slate-950">Agen spesialis untuk riset, pengembangan, dan evaluasi</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-700">Pilih enam agen terkurasi, unduh instruksi aslinya, dan susun brief berbahasa Indonesia dengan tinjauan manusia. Katalog tersedia; eksekusi agen otomatis belum aktif.</p>
          <Link href="/ai-lab/agency-agents" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Buka Agency Agents →</Link>
        </div>
      </section>

      <section aria-labelledby="nakama-title" lang="id" className="border-b border-slate-200 bg-amber-50 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-800">AI Lab · Agen AI untuk tim</p>
          <h2 id="nakama-title" className="mt-3 text-3xl font-bold leading-tight text-slate-950">Nakama: Ruang Kerja Agen AI untuk Riset, Pendidikan, dan Kolaborasi</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-700">Kenali Nakama, rancang agen dengan peran khusus, dan pelajari alur uji coba untuk riset, pembelajaran, serta kerja tim. Panduan terhubung ke LexNusa dan Journal/RAHRN.</p>
          <Link href="/ai-lab/nakama" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Pelajari Nakama →</Link>
        </div>
      </section>

      <section aria-labelledby="cve-intelligence-title" lang="id" className="border-b border-slate-200 bg-teal-50 px-5 py-12 sm:px-8"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-widest text-teal-800">AI Lab · Intelijen keamanan</p><h2 id="cve-intelligence-title" className="mt-3 text-3xl font-bold leading-tight text-slate-950">CVE Intelligence AI: Analisis Kerentanan dan Prioritas Perbaikan</h2><p className="mt-4 max-w-3xl leading-8 text-slate-700">Pelajari CVE, CVSS, EPSS, dan CISA KEV. Verifikasi konteks aset dan susun prioritas perbaikan melalui panduan, latihan, serta format laporan. Terhubung ke kelas Hukum Kejahatan Mayantara.</p><Link href="/ai-lab/cve-intelligence" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">Pelajari CVE Intelligence AI →</Link></div></section>

      <section aria-labelledby="antislop-title" className="border-b border-slate-200 bg-white" lang="id">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-amber-800">Referensi terbuka · Panduan evaluasi</p>
            <h2 id="antislop-title" className="mt-3 text-3xl font-bold text-slate-950">Anti-Slop: Evaluasi Desain dan Konten AI</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Panduan untuk meninjau kejelasan desain, tulisan, dan kode hasil AI. Mulai dari tujuan halaman, bukti, dan kegunaan setiap elemen.</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Tersedia panduan, pemeriksaan mandiri, contoh penerapan, dan tautan sumber. Peninjauan dilakukan manusia; pemindaian otomatis belum tersedia.</p>
          </div>
          <Link href="/ai-lab/anti-slop" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-6 py-3.5 font-bold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Buka panduan Anti-Slop</Link>
        </div>
      </section>

<section aria-label="REA: Memahami Cara Kerja Aplikasi dengan Agen AI" lang="id" className="border-b border-slate-200 bg-stone-50 px-5 py-12 sm:px-8"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-widest text-amber-800">AI Lab · Analisis aplikasi</p><h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950">REA: Memahami Cara Kerja Aplikasi dengan Agen AI</h2><p className="mt-4 max-w-3xl leading-8 text-slate-700">Telusuri struktur dan perilaku aplikasi, periksa bukti teknis, dan susun laporan yang membedakan observasi dari dugaan. Terhubung ke Hukum Kejahatan Mayantara dan LexNusa.</p><Link href="/ai-lab/rea" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Pelajari REA →</Link></div></section>
      <section aria-label="Humanize Writing AI: Menyunting Bahasa, Menjaga Makna, dan Memperjelas Argumentasi" lang="id" className="border-b border-slate-200 bg-stone-50 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-800">AI Lab · Penyuntingan bahasa</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950">Humanize Writing AI: Menyunting Bahasa, Menjaga Makna, dan Memperjelas Argumentasi</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-700">Sunting bahasa Indonesia dan Inggris agar lebih jelas, sambil menjaga klaim, kutipan, serta tingkat kepastian. Panduan untuk naskah ilmiah dan ketepatan bahasa hukum.</p>
          <Link href="/ai-lab/humanize-writing" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Pelajari Humanize Writing AI →</Link>
        </div>
      </section>

      <section aria-label="Paper Review AI: Membaca, Membandingkan, dan Memetakan Literatur" lang="id" className="border-b border-slate-200 bg-stone-50 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-800">AI Lab · Telaah literatur</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950">Paper Review AI: Membaca, Membandingkan, dan Memetakan Literatur</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-700">Susun matriks per artikel, bandingkan teori dan temuan, serta telusuri bukti sebelum menulis. Panduan pendamping Academic Writing AI untuk penulis RAHRN dan riset hukum Lex Nusa.</p>
          <Link href="/ai-lab/paper-review" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Pelajari Paper Review AI →</Link>
        </div>
      </section>

      <section aria-label="Academic Writing AI: Literatur, Argumentasi, dan Publikasi Ilmiah" lang="id" className="border-b border-slate-200 bg-stone-50 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-800">AI Lab · Literatur &amp; Publikasi</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950">Academic Writing AI: Literatur, Argumentasi, dan Publikasi Ilmiah</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-700">Pelajari alur penelusuran literatur, pemetaan argumen, dan persiapan publikasi. Tersedia panduan pendampingan penulis RAHRN dan latihan riset hukum bersama Lex Nusa.</p>
          <Link href="/ai-lab/academic-writing" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Pelajari Academic Writing AI →</Link>
        </div>
      </section>

      <section aria-labelledby="engineering-skills-title" className="border-b border-slate-200 bg-stone-50" lang="id">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-amber-800">Referensi terbuka · Pengembangan aplikasi</p>
            <h2 id="engineering-skills-title" className="mt-3 text-3xl font-bold leading-tight text-slate-950">AI Engineering Skills: Merancang, Menguji, dan Memperbaiki Aplikasi</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Pelajari alur kerja bersama agen AI: memperjelas kebutuhan, menyusun spesifikasi, menguji fitur, dan menelusuri penyebab masalah.</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Panduan belajar dengan rujukan Matt Pocock Skills, pilihan skill, dan contoh latihan. Pemasangan skill dilakukan terpisah pada lingkungan agen Anda.</p>
          </div>
          <Link href="/ai-lab/engineering-skills" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-6 py-3.5 font-bold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Buka AI Engineering Skills</Link>
        </div>
      </section>


      <section id="agents-md" aria-labelledby="agents-md-title" className="scroll-mt-24 border-b border-slate-200 bg-slate-50" lang="id">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-amber-800">Materi belajar · Panduan kerja agen AI</p>
            <h2 id="agents-md-title" className="mt-3 text-3xl font-bold leading-tight text-slate-950">AGENTS.md: Menulis Panduan Proyek untuk Agen AI</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">AGENTS.md adalah berkas Markdown yang memberi agen pemrograman AI konteks dan petunjuk kerja sebuah proyek. Isinya dapat mencakup struktur folder, perintah build dan pengujian, gaya kode, serta perhatian keamanan.</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Tujuan belajar: menyusun instruksi yang jelas, dapat diperiksa, dan sesuai dengan proyek. Materi ini melengkapi AI Engineering Skills yang membahas cara mengerjakan tugas.</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-950">Kenali fungsinya</h3>
              <p className="mt-3 leading-7 text-slate-600">README memperkenalkan proyek kepada pembaca manusia. AGENTS.md melengkapinya dengan petunjuk khusus untuk agen AI. Tidak ada susunan bagian yang wajib; tuliskan informasi yang benar-benar diperlukan.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Berkas biasanya ditempatkan di folder utama repositori. Subfolder dapat memiliki petunjuk yang lebih khusus. Periksa dukungan dan cara membaca instruksi pada agen yang digunakan.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-950">Tulis instruksi yang terukur</h3>
              <p className="mt-3 leading-7 text-slate-600">Contoh latihan: ubah instruksi “buat halaman yang bagus” menjadi “gunakan satu judul utama, tautkan sumber materi, dan periksa agar teks tidak terpotong pada layar ponsel”.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Jelaskan hasil yang diharapkan dan cara memeriksanya. Cantumkan perintah hanya setelah memastikan perintah tersebut tersedia pada proyek.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-950">Latihan 15 menit</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-slate-600">
                <li>Pilih proyek latihan dan tulis tujuannya dalam dua kalimat.</li>
                <li>Catat folder penting, tiga aturan kerja, dan cara memeriksa hasil.</li>
                <li>Minta agen mengubah satu teks pada salinan proyek menggunakan panduan itu.</li>
                <li>Bandingkan hasil dengan aturan; revisi instruksi yang masih ambigu.</li>
              </ol>
            </article>
          </div>
          <details className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <summary className="cursor-pointer text-lg font-bold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Lihat contoh AGENTS.md untuk proyek latihan</summary>
            <p className="mt-4 text-sm leading-7 text-slate-600">Contoh buatan Hossibarani Lab. Sesuaikan nama proyek, folder, dan pemeriksaannya sebelum digunakan.</p>
            <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-slate-950 p-5 text-sm leading-7 text-slate-100"><code>{`# Panduan agen untuk Portal Belajar

## Tujuan
Portal ini membantu pengunjung menemukan materi dan sumber belajar.

## Sebelum mengubah
- Baca README dan konfigurasi proyek.
- Kenali lokasi halaman, komponen, dan aset.
- Batasi perubahan pada tugas yang diminta.

## Konten dan tampilan
- Gunakan bahasa Indonesia yang jelas.
- Cantumkan tautan sumber untuk materi rujukan.
- Pertahankan navigasi dan identitas visual yang sudah ada.

## Pemeriksaan hasil
- Periksa tautan dan keterbacaan pada layar ponsel.
- Jalankan perintah build atau tes yang tersedia dan relevan.
- Laporkan pemeriksaan yang gagal atau belum dapat dijalankan.

## Data dan penerbitan
- Jangan menulis kata sandi atau API key dalam kode publik.
- Gunakan data contoh untuk latihan.
- Terbitkan hanya dalam lingkup permintaan pengguna.
- Laporkan perubahan dan hasil verifikasinya.
`}</code></pre>
          </details>
          <p className="mt-6 text-sm leading-7 text-slate-600"><strong className="text-slate-950">Refleksi:</strong> Apakah setiap aturan dapat diperiksa? Apakah ada instruksi yang bertentangan? Petunjuk tertulis membantu koordinasi, tetapi pengaturan izin akses dan pemeriksaan manusia tetap diperlukan.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://agents.md/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">
              Buka sumber AGENTS.md<ExternalLink size={16} aria-hidden="true" /><span className="sr-only"> (tab baru)</span>
            </a>
            <Link href="/ai-lab/engineering-skills" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-950 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Pelajari AI Engineering Skills</Link>
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-500">Sumber konsep: agents.md, ditinjau 25 Oktober 2026. Contoh dan latihan disusun untuk pembelajaran; berkas panduan proyek tidak dibuat atau diaktifkan melalui halaman ini.</p>
        </div>
      </section>

      <section id="bridgeplay" aria-labelledby="bridgeplay-title" className="scroll-mt-24 border-b border-slate-200 bg-white" lang="id">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-amber-800">Referensi terbuka · Kompatibilitas lintas sistem</p>
            <h2 id="bridgeplay-title" className="mt-3 text-3xl font-bold leading-tight text-slate-950">Bridgeplay: Menjalankan Gim Windows di Steam Mac</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Bahan studi tentang cara perangkat lunak dari sistem operasi berbeda dapat bekerja bersama. Bridgeplay menghubungkan Steam Mac dengan Wine, Rosetta 2, dan teknologi grafis Apple untuk menjalankan gim Windows yang kompatibel.</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Proyek eksternal Raymond Chin, berbasis NotProton. Halaman ini menyediakan referensi dan panduan eksplorasi; aplikasi dipasang dan dijalankan pada Mac pengguna, bukan melalui situs ini. Belum diuji langsung oleh Hossibarani Lab.</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-stone-50 p-6">
              <h3 className="text-lg font-bold text-slate-950">Persyaratan perangkat</h3>
              <p className="mt-3 leading-7 text-slate-600">Dokumentasi saat ditinjau mencantumkan Mac Apple Silicon M1 atau lebih baru, macOS 26 atau lebih baru, dan akun Steam. Mac Intel tidak didukung.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Bridgeplay gratis; lisensi gim berbayar tetap harus dimiliki. Periksa persyaratan terbaru sebelum memasang.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-stone-50 p-6">
              <h3 className="text-lg font-bold text-slate-950">Cara kerja dan batasan</h3>
              <p className="mt-3 leading-7 text-slate-600">Gim tetap berupa versi Windows yang berjalan melalui lapisan kompatibilitas. D3DMetal menerjemahkan grafis DirectX 11/12 ke Metal.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Tidak semua gim berjalan. Kebanyakan gim dengan anti-cheat tingkat kernel tidak didukung. Hasil pengembang tidak menjamin performa yang sama pada perangkat lain.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-stone-50 p-6">
              <h3 className="text-lg font-bold text-slate-950">Latihan eksplorasi</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-slate-600">
                <li>Catat chip Mac, versi macOS, dan gim yang ingin diuji.</li>
                <li>Periksa laporan kompatibilitas beserta perangkat pengujinya.</li>
                <li>Jika sesuai, ikuti pemasangan resmi dan uji satu gim yang dimiliki.</li>
                <li>Catat pengaturan, kelancaran, kendala, dan kesimpulan; bedakan pengamatan sendiri dari klaim pengembang.</li>
              </ol>
            </article>
          </div>
          <aside className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-slate-700">
            <strong className="text-slate-950">Sebelum memasang:</strong> Bridgeplay memodifikasi dan menandatangani ulang aplikasi Steam. Pengembang menyatakan bahwa Valve tidak mendukung atau mengesahkannya dan modifikasi ini mungkin tidak sesuai dengan ketentuan Steam. Baca dokumentasi pemasangan serta pemulihan Steam pada sumber resmi.
          </aside>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              ["https://bridgeplay.dev", "Buka situs Bridgeplay"],
              ["https://github.com/raymondchins/Bridgeplay", "Pelajari kode di GitHub"],
              ["https://bridgeplay.dev/compatibility", "Cek kompatibilitas gim"],
            ].map(([href, label]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">
                {label}<ExternalLink size={16} aria-hidden="true" /><span className="sr-only"> (tab baru)</span>
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-500">Sumber: situs dan repositori resmi Bridgeplay. Dokumentasi ditinjau 25 Oktober 2026; persyaratan dan kompatibilitas dapat berubah.</p>
        </div>
      </section>

      <section id="sekai-gateway" aria-labelledby="sekai-gateway-title" className="scroll-mt-24 border-b border-slate-200 bg-stone-50" lang="id">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-amber-800">Referensi layanan eksternal · API AI</p>
            <h2 id="sekai-gateway-title" className="mt-3 text-3xl font-bold leading-tight text-slate-950">SEKAI Gateway: Akses Model AI dengan Pembayaran Rupiah</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Pelajari cara satu layanan API menghubungkan aplikasi dan coding agent dengan berbagai model AI. SEKAI Gateway menawarkan pembayaran rupiah melalui QRIS, saldo bayar sesuai pemakaian, serta paket untuk kebutuhan coding.</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Referensi untuk eksplorasi di AI &amp; Digital Systems Lab. Akses model, akun, dan pembayaran dikelola oleh penyedia eksternal. API SEKAI belum diaktifkan pada website ini dan belum diuji langsung oleh Hossibarani Lab.</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-950">Satu akses, berbagai model</h3>
              <p className="mt-3 leading-7 text-slate-600">Menurut situs penyedia, layanan memakai format API OpenAI dan menyediakan model dari beberapa penyedia. Aplikasi dihubungkan menggunakan alamat API, API key SEKAI, dan ID model.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Dapat menjadi bahan eksperimen asisten pembelajaran, prototipe aplikasi, dan perbandingan jawaban model dengan pertanyaan yang sama.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-950">Pilihan pembayaran</h3>
              <p className="mt-3 leading-7 text-slate-600">Pay As You Go mengenakan biaya berdasarkan token input dan output. Coding Plan menawarkan paket Basic, Pro, dan MAX dengan batas pemakaian sesuai paket.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Periksa harga, model yang tersedia, dan kuota terbaru di situs penyedia sebelum membeli. Pengisian saldo tersedia melalui QRIS.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-950">Latihan eksplorasi</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-slate-600">
                <li>Pilih satu tugas sederhana dengan materi publik.</li>
                <li>Pelajari dokumentasi dan tentukan batas biaya uji.</li>
                <li>Jika menggunakan layanan, bandingkan dua model dengan instruksi yang sama.</li>
                <li>Catat ketepatan jawaban, sumber, waktu respons, dan biaya aktual.</li>
              </ol>
            </article>
          </div>
          <p className="mt-6 text-sm leading-7 text-slate-600">Untuk eksperimen, gunakan data publik atau sintetis. Tinjau kebijakan data penyedia sebelum mengirim dokumen rahasia, dan simpan API key di sisi server aplikasi Anda.</p>
          <div className="mt-6">
            <a href="https://sekaigateway.xyz/id" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">
              Buka SEKAI Gateway<ExternalLink size={16} aria-hidden="true" /><span className="sr-only"> (tab baru)</span>
            </a>
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-500">Sumber: halaman utama SEKAI Gateway, ditinjau 25 Oktober 2026. Fitur dan ketentuan merupakan informasi dari penyedia dan dapat berubah.</p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(counts) as Status[]).map((status) => (
            <div key={status} className="bg-slate-50 px-6 py-7 lg:px-8">
              <p className="font-academic text-3xl font-bold text-slate-950">{counts[status]}</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">{status}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">Lab index</p>
          <h2 className="font-academic mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {labs.length} systems. One evidence standard.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            These projects connect scholarship with working digital infrastructure.
            Their status will change only when testing and verifiable results justify it.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {labs.map((lab) => (
            <article key={lab.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-45px_rgba(15,23,42,0.45)]">
              <div className="grid border-b border-slate-200 lg:grid-cols-[13rem_1fr_auto] lg:items-center">
                <div className="flex items-baseline gap-3 bg-slate-950 px-6 py-6 text-white lg:h-full lg:flex-col lg:justify-center lg:px-8">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">LAB</span>
                  <span className="font-academic text-4xl font-bold">{lab.number}</span>
                </div>
                <div className="px-6 py-7 lg:px-9">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">{lab.domain}</p>
                  <h3 className="font-academic mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{lab.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{lab.shortTitle}</p>
                </div>
                <div className="px-6 pb-7 lg:px-9 lg:py-7">
                  <span className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] ${statusStyle[lab.status]}`}>
                    {lab.status}
                  </span>
                </div>
              </div>

              <div className="grid gap-px bg-slate-200 md:grid-cols-2 xl:grid-cols-5">
                {evidenceFields.map(([label, helper, Icon], index) => {
                  const values = [lab.problem, lab.system, lab.technology, lab.testing, lab.result];
                  return (
                    <div key={label} className="bg-white p-6 lg:p-7">
                      <Icon size={20} className="text-amber-700" aria-hidden="true" />
                      <h4 className="mt-4 text-sm font-bold text-slate-950">{label}</h4>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{helper}</p>
                      <p className="mt-4 text-sm leading-6 text-slate-600">{values[index]}</p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-slate-800 bg-slate-950 px-6 py-7 text-white lg:px-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                  Experiment record
                </p>
                <dl className="mt-6 grid gap-7 md:grid-cols-2 xl:grid-cols-5">
                  <div>
                    <dt className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <CalendarClock size={17} className="text-amber-300" aria-hidden="true" />
                      Last tested
                    </dt>
                    <dd className="mt-3 text-sm leading-6 text-slate-400">{lab.lastTested}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <Activity size={17} className="text-amber-300" aria-hidden="true" />
                      Current metric
                    </dt>
                    <dd className="mt-3 text-sm leading-6 text-slate-400">{lab.currentMetric}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <GitCommitHorizontal size={17} className="text-amber-300" aria-hidden="true" />
                      What changed
                    </dt>
                    <dd className="mt-3 text-sm leading-6 text-slate-400">{lab.whatChanged}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <ExternalLink size={17} className="text-amber-300" aria-hidden="true" />
                      Evidence / live system
                    </dt>
                    <dd className="mt-3">
                      <Link href={lab.href} className="inline-flex items-center gap-2 text-sm font-semibold leading-6 text-white transition hover:text-amber-300">
                        {lab.linkLabel}<ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <NotebookText size={17} className="text-amber-300" aria-hidden="true" />
                      Experiment notes
                    </dt>
                    <dd className="mt-3 text-sm leading-6 text-slate-400">{lab.experimentNotes}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex bg-slate-50 px-6 py-5 lg:px-8">
                <p className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <ShieldCheck size={17} aria-hidden="true" /> Human review remains part of the system.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-amber-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-800">Research · build · evaluate</p>
            <h2 className="font-academic mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">Bring a serious problem to the lab.</h2>
            <p className="mt-4 text-base leading-7 text-slate-800">For research, education, legal technology, and institutional workflow collaborations that require a testable system and a clear evidence trail.</p>
          </div>
          <Link href="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 font-bold text-white transition hover:bg-slate-800">
            Discuss a collaboration <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
