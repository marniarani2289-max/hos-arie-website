export type Status = "Prototype" | "Pilot" | "Stable" | "Production";

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

export const labs: Lab[] = [
  {
    number: "007", title: "Hukumpreneur Studio — Video Clips", shortTitle: "Turn a complete idea into a shareable clip.", status: "Prototype", domain: "Educational video",
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
      "Pilot Round E01–E05 defines five questions for three models in one run each. See the experiment record for the reporting status of these 15 outputs.",
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

