import { trainingOffers } from "./training";
// Public programme information. Update here when the programme owner changes a schedule or intake.
export type ProgrammeLocale = "id" | "en";
export const institutePilot = {
  href: "/raja-ali-haji/pilot-cohort",
  modulesHref: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji",
  registerHref: "/register?cohort=RAHI-PILOT-01",
  dates: { id: "5 Oktober–1 November 2026", en: "5 October–1 November 2026" },
  fee: { id: "Gratis", en: "Free" },
  capacity: { id: "20–30 peserta", en: "20–30 participants" },
  workload: { id: "±5 jam per minggu", en: "About 5 hours per week" },
  requirements: [
    "Menyelesaikan seluruh aktivitas wajib dalam delapan modul",
    "Mencapai nilai kuis minimal 70 pada setiap modul",
    "Menyerahkan refleksi akhir pada Modul 8",
    "Portofolio diverifikasi penilai manusia dengan skor minimal 60/100",
  ],
} as const;

export const lexnusaCohort = {
  href: "/lexnusa/cohort",
  status: { id: "Pembukaan pendaftaran belum diumumkan", en: "Enrolment opening to be announced" },
  dates: { id: "Tanggal belum diumumkan", en: "Dates to be announced" },
  fee: { id: `${trainingOffers[2].price} (indikasi biaya)`, en: "IDR 1,250,000/person (indicative fee)" },
} as const;

export const programmeCards = {
  id: [
    { title: "Dasar Pemikiran Raja Ali Haji", status: "8 modul tersedia", audience: "Dosen, guru, mahasiswa, ASN, dan komunitas.", outcome: "Memahami karya Raja Ali Haji dan menghubungkan gagasannya dengan persoalan masa kini.", format: "Belajar mandiri melalui bacaan, podcast, refleksi, dan kuis.", schedule: "Materi dapat dibuka sekarang; jadwal pendampingan tersedia pada halaman pilot.", href: institutePilot.modulesHref, action: "Lihat delapan modul" },
    { title: "Pilot Cohort Raja Ali Haji", status: "Pilot dengan pendampingan", audience: "Peserta lintas profesi yang ingin belajar bersama dan menghasilkan karya.", outcome: "Analisis, refleksi, dan portofolio penerapan yang dinilai manusia.", format: `4 minggu · ${institutePilot.workload.id} · ${institutePilot.fee.id}`, schedule: `${institutePilot.dates.id} · ${institutePilot.capacity.id}`, href: institutePilot.href, action: "Lihat jadwal dan persyaratan" },
    { title: "Praktik Legal AI bersama LexNusa", status: lexnusaCohort.status.id, audience: "Mahasiswa hukum, pengajar, dan praktisi yang ingin berlatih mengevaluasi keluaran AI.", outcome: "Satu kasus kontrak: ringkasan kebutuhan, instruksi, draf, evaluasi, dan revisi.", format: "4 minggu · Praktik dan umpan balik fasilitator", schedule: `${lexnusaCohort.dates.id} · ${lexnusaCohort.fee.id}`, href: lexnusaCohort.href, action: "Pelajari program LexNusa" },
  ],
  en: [
    { title: "Foundations of Raja Ali Haji’s Thought", status: "8 modules available", audience: "Lecturers, teachers, students, public servants, and community learners.", outcome: "Understand Raja Ali Haji’s works and connect his ideas with contemporary questions.", format: "Self-paced readings, podcasts, reflection, and quizzes.", schedule: "Materials are available now; guided learning dates are listed on the pilot page.", href: institutePilot.modulesHref, action: "Explore all eight modules" },
    { title: "Raja Ali Haji Pilot Cohort", status: "Guided pilot programme", audience: "Learners across professions seeking a shared learning journey and a practical project.", outcome: "Analysis, reflection, and an applied portfolio assessed by a human reviewer.", format: `4 weeks · ${institutePilot.workload.en} · ${institutePilot.fee.en}`, schedule: `${institutePilot.dates.en} · ${institutePilot.capacity.en}`, href: institutePilot.href, action: "View schedule and requirements" },
    { title: "Legal AI Practice with LexNusa", status: lexnusaCohort.status.en, audience: "Law students, educators, and practitioners learning to evaluate AI outputs.", outcome: "One contract case: a brief, instructions, draft, evaluation, and revision.", format: "4 weeks · Practical work and facilitator feedback", schedule: `${lexnusaCohort.dates.en} · ${lexnusaCohort.fee.en}`, href: lexnusaCohort.href, action: "Explore the LexNusa programme" },
  ],
} as const;
