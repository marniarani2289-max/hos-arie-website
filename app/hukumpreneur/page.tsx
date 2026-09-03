import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Copyright,
  Gavel,
  Lightbulb,
  Play,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
} from "lucide-react";

const channelUrl = "https://www.youtube.com/@hukumpreneur";

export const metadata: Metadata = {
  title: "Hukum Preneur — Hukum Praktis untuk Pengusaha",
  description:
    "Hukum Preneur adalah kanal edukasi hukum bisnis, HKI, sengketa merek, dan pengetahuan hukum praktis bagi pengusaha dan masyarakat.",
  keywords: [
    "Hukum Preneur",
    "hukum bisnis",
    "hukum untuk pengusaha",
    "hak kekayaan intelektual",
    "HKI",
    "merek dagang",
    "hak cipta",
    "sengketa bisnis",
  ],
  alternates: { canonical: "/hukumpreneur" },
  openGraph: {
    title: "Hukum Preneur — Hukum Praktis untuk Pengusaha",
    description:
      "Belajar melindungi merek, karya, kontrak, dan bisnis melalui edukasi hukum yang mudah dipahami.",
    url: "https://www.hossibarani.com/hukumpreneur",
    type: "website",
  },
};

const pillars = [
  {
    icon: Copyright,
    label: "Hak Kekayaan Intelektual",
    title: "Lindungi ide dan identitas usaha",
    text: "Memahami pendaftaran dan pelindungan merek, hak cipta, paten, serta aset intelektual yang membangun nilai bisnis.",
    accent: "bg-red-50 text-red-700",
  },
  {
    icon: Gavel,
    label: "Sengketa Merek & Bisnis",
    title: "Belajar dari perkara nyata",
    text: "Membedah sengketa merek terkenal dan kasus bisnis aktual agar pelaku usaha mengenali risiko sebelum menjadi masalah.",
    accent: "bg-amber-50 text-amber-700",
  },
  {
    icon: BookOpen,
    label: "Kuliah Hukum Praktis",
    title: "Hukum yang mudah dipahami",
    text: "Konsep hukum penting diterjemahkan ke dalam bahasa yang jernih, relevan, dan dapat diterapkan oleh masyarakat luas.",
    accent: "bg-sky-50 text-sky-700",
  },
];

const learning = [
  "Menentukan jenis pelindungan HKI yang tepat",
  "Mengenali risiko hukum dalam nama dan merek usaha",
  "Memahami sengketa bisnis melalui studi kasus",
  "Membangun kebiasaan usaha yang sadar hukum",
];

export default function HukumPreneurPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Hukum Preneur",
    url: "https://www.hossibarani.com/hukumpreneur",
    description:
      "Pusat edukasi hukum bisnis praktis bagi pengusaha dan masyarakat.",
    about: ["Hukum Bisnis", "Hak Kekayaan Intelektual", "Kewirausahaan"],
    isPartOf: {
      "@type": "WebSite",
      name: "Dr. Hos Arie Sibarani",
      url: "https://www.hossibarani.com",
    },
  };

  return (
    <div className="bg-[#f7f6f2] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative isolate overflow-hidden bg-[#111111] px-5 py-16 text-white sm:px-6 md:py-24 lg:px-8">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_20%,rgba(220,38,38,.27),transparent_28%),radial-gradient(circle_at_15%_90%,rgba(245,158,11,.13),transparent_32%)]" />
        <div className="absolute -right-24 top-12 -z-10 h-80 w-80 rotate-12 rounded-[4rem] border border-white/10" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-red-200">
              <Video size={17} aria-hidden="true" /> Kanal Edukasi Hukum
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-bold leading-[.94] tracking-[-.05em] sm:text-7xl lg:text-8xl">
              HUKUM<span className="text-red-500">PRENEUR</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-medium leading-8 text-slate-200 sm:text-2xl">
              Hukum praktis untuk bisnis yang tumbuh dengan aman.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Ruang belajar bagi pengusaha dan masyarakat untuk memahami hak,
              melindungi aset usaha, serta mengambil keputusan bisnis yang lebih
              sadar hukum.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={channelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-4 font-bold text-white transition hover:bg-red-500"
              >
                <Play size={19} fill="currentColor" /> Tonton di YouTube
              </a>
              <Link
                href="#topik"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 font-bold text-white transition hover:bg-white/10"
              >
                Jelajahi topik <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="rounded-[2rem] border border-white/15 bg-white/[.07] p-5 shadow-2xl backdrop-blur sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-950/50">
                    <Scale size={29} />
                  </div>
                  <div>
                    <p className="text-lg font-bold">hukum preneur</p>
                    <p className="mt-1 text-sm text-slate-400">@hukumpreneur</p>
                  </div>
                </div>
                <BadgeCheck className="text-sky-400" size={23} />
              </div>
              <div className="grid grid-cols-2 gap-3 py-6">
                <div className="rounded-2xl bg-black/25 p-5">
                  <p className="text-3xl font-black text-white">63,2K</p>
                  <p className="mt-1 text-sm text-slate-400">Subscriber</p>
                </div>
                <div className="rounded-2xl bg-black/25 p-5">
                  <p className="text-3xl font-black text-white">33+</p>
                  <p className="mt-1 text-sm text-slate-400">Video edukasi</p>
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-red-600 to-red-800 p-6">
                <Video size={36} />
                <p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-red-100">
                  Misi Hukum Preneur
                </p>
                <p className="mt-2 text-xl font-bold leading-snug">
                  Meningkatkan literasi hukum agar usaha bertumbuh di atas
                  fondasi yang kuat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-semibold text-slate-600">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="text-red-600" size={18} /> Praktis</span>
          <span className="inline-flex items-center gap-2"><Lightbulb className="text-red-600" size={18} /> Mudah dipahami</span>
          <span className="inline-flex items-center gap-2"><BriefcaseBusiness className="text-red-600" size={18} /> Relevan bagi usaha</span>
          <span className="inline-flex items-center gap-2"><Users className="text-red-600" size={18} /> Terbuka untuk publik</span>
        </div>
      </section>

      <section id="topik" className="scroll-mt-24 px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.24em] text-red-700">Topik Utama</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Hukum yang dekat dengan dunia usaha.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Materi dirancang dari persoalan yang benar-benar dihadapi pelaku
              usaha—mulai dari memilih merek hingga memahami konsekuensi sebuah
              sengketa.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pillars.map(({ icon: Icon, label, title, text, accent }, index) => (
              <article key={label} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-8">
                <div className="flex items-start justify-between">
                  <div className={`inline-flex rounded-2xl p-3.5 ${accent}`}><Icon size={27} /></div>
                  <span className="text-sm font-black text-slate-300">0{index + 1}</span>
                </div>
                <p className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-red-700">{label}</p>
                <h3 className="mt-3 text-2xl font-bold leading-tight">{title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[#191919] text-white lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-extrabold uppercase tracking-[.24em] text-red-400">Mengapa Hukum Preneur?</p>
            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Bisnis yang baik perlu lebih dari sekadar ide.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              Ia memerlukan nama yang terlindungi, kesepakatan yang jelas, dan
              keputusan yang memahami risiko. Literasi hukum membantu pengusaha
              menjaga apa yang telah dibangun.
            </p>
          </div>
          <div className="bg-red-700 p-8 sm:p-12 lg:p-16">
            <p className="font-bold">Melalui Hukum Preneur, Anda dapat:</p>
            <ul className="mt-7 space-y-5">
              {learning.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-7 text-red-50">
                  <CheckCircle2 className="mt-1 shrink-0 text-white" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-700"><Sparkles size={29} /></div>
          <p className="mt-7 text-xs font-extrabold uppercase tracking-[.24em] text-red-700">Mulai Belajar</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Jadikan hukum sebagai pelindung pertumbuhan bisnis Anda.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Kunjungi kanal Hukum Preneur untuk menyaksikan seluruh video dan
            ikuti pembahasan hukum bisnis berikutnya.
          </p>
          <a href={channelUrl} target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-3 rounded-xl bg-red-600 px-7 py-4 font-bold text-white transition hover:bg-red-700">
            <Video size={21} /> Kunjungi @hukumpreneur <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
