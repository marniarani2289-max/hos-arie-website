import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  LockKeyhole,
  School,
  ShieldCheck,
  UserRoundCheck,
  Users,
} from "lucide-react";

const appUrl = "https://simaks.hossibarani.com";
const loginUrl = `${appUrl}/login`;
const registerUrl = `${appUrl}/register`;

export const metadata: Metadata = {
  title: "SIMAKS | Sistem Monitoring Akreditasi Sekolah",
  description:
    "SIMAKS adalah platform monitoring akreditasi sekolah berbasis data dan bukti untuk membantu sekolah, tim akreditasi, pengawas, dan dinas memantau kesiapan, verifikasi, serta tindak lanjut perbaikan.",
  keywords: [
    "SIMAKS",
    "Sistem Monitoring Akreditasi Sekolah",
    "monitoring akreditasi sekolah",
    "akreditasi sekolah",
    "dashboard akreditasi",
    "bukti akreditasi sekolah",
    "pengawas sekolah",
    "dinas pendidikan",
  ],
  alternates: { canonical: "/simak" },
  openGraph: {
    title: "SIMAKS | Sistem Monitoring Akreditasi Sekolah",
    description:
      "Platform monitoring akreditasi sekolah berbasis data, bukti, verifikasi, dan perbaikan berkelanjutan.",
    url: "https://www.hossibarani.com/simak",
    siteName: "Hossibarani Digital Ecosystem",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SIMAKS - Sistem Monitoring Akreditasi Sekolah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIMAKS | Sistem Monitoring Akreditasi Sekolah",
    description:
      "Pantau kesiapan, bukti, verifikasi, dan tindak lanjut akreditasi sekolah dalam satu sistem.",
    images: ["/og-image.jpg"],
  },
};

const audiences = [
  {
    icon: School,
    title: "Kepala Sekolah",
    text: "Melihat gambaran kesiapan sekolah, menetapkan tim, dan memantau kemajuan secara terstruktur.",
  },
  {
    icon: Users,
    title: "Tim Akreditasi",
    text: "Mengelola bukti, pembagian tugas, status kelengkapan, dan tindak lanjut dalam satu ruang kerja.",
  },
  {
    icon: UserRoundCheck,
    title: "Pengawas",
    text: "Melakukan pemantauan dan verifikasi sesuai kewenangan tanpa membuka akses yang tidak diperlukan.",
  },
  {
    icon: Building2,
    title: "Dinas Pendidikan",
    text: "Mendapatkan gambaran agregat kesiapan sekolah untuk mendukung pembinaan dan pengambilan keputusan.",
  },
];

const features = [
  {
    icon: ClipboardCheck,
    title: "Monitoring Kesiapan",
    text: "Pantau status pekerjaan, indikator yang belum lengkap, dan prioritas tindak lanjut secara lebih jelas.",
  },
  {
    icon: FileCheck2,
    title: "Bukti Terorganisasi",
    text: "Dokumen dan eviden dikelola sebagai bagian dari proses penjaminan mutu, bukan sekadar arsip terpisah.",
  },
  {
    icon: BadgeCheck,
    title: "Verifikasi Berjenjang",
    text: "Peran sekolah, tim, pengawas, dan dinas dipisahkan agar proses validasi lebih akuntabel.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Kemajuan",
    text: "Kemajuan dapat dibaca sebagai data kerja untuk menentukan area yang membutuhkan perhatian lebih dahulu.",
  },
];

const principles = [
  "Akses berbasis peran dan kewenangan",
  "Data sekolah tidak dibuka kepada pengguna yang tidak berhak",
  "Setiap orang dapat membuat akun, tetapi hak administratif diberikan secara terpisah",
  "Monitoring dirancang untuk mendukung perbaikan, bukan hanya mengejar kelengkapan dokumen",
];

export default function SimakPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SIMAKS",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: "https://www.hossibarani.com/simak",
    description:
      "Sistem Monitoring Akreditasi Sekolah berbasis data, bukti, verifikasi, dan perbaikan berkelanjutan.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
    },
  };

  return (
    <main className="bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(14,165,233,.18),transparent_30%),radial-gradient(circle_at_12%_88%,rgba(16,185,129,.13),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 md:px-8 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[.22em] text-sky-200">
              <GraduationCap size={17} /> Hossibarani Digital Ecosystem
            </div>
            <p className="mt-8 text-sm font-bold uppercase tracking-[.3em] text-emerald-300">
              SIMAKS
            </p>
            <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
              Sistem Monitoring Akreditasi Sekolah
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-300">
              Membantu sekolah mengelola kesiapan akreditasi sebagai proses
              berbasis data, bukti, verifikasi, dan perbaikan berkelanjutan.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={registerUrl}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-4 font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Daftar Gratis <ArrowRight size={18} />
              </a>
              <a
                href={loginUrl}
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-4 font-bold text-white transition hover:bg-white/10"
              >
                Masuk ke SIMAKS
              </a>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              Pendaftaran mandiri tersedia untuk publik. Hak akses administratif
              tetap diberikan sesuai peran dan kewenangan.
            </p>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/[.06] p-7 shadow-2xl backdrop-blur sm:p-9">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-black text-slate-950">
                S
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[.2em] text-sky-200">SIMAKS</p>
                <p className="mt-1 font-academic text-xl font-bold">Akreditasi yang lebih terkelola</p>
              </div>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                ["01", "Pantau kesiapan"],
                ["02", "Kelola bukti"],
                ["03", "Verifikasi peran"],
                ["04", "Tindak lanjuti"],
              ].map(([number, label]) => (
                <div key={number} className="rounded-2xl bg-slate-900/80 p-5">
                  <p className="text-xs font-black tracking-[.2em] text-emerald-300">{number}</p>
                  <p className="mt-3 font-bold text-white">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
              <ShieldCheck className="text-emerald-300" size={28} />
              <p className="mt-4 font-bold">Data sekolah dilindungi berdasarkan peran.</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                SIMAKS memisahkan akses peserta, tim sekolah, pengawas, dinas,
                dan administrator agar setiap pengguna hanya melihat data yang relevan.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-px px-5 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            ["Berbasis Data", "Status dan kemajuan dapat dibaca secara terstruktur."],
            ["Berbasis Bukti", "Dokumen dihubungkan dengan proses kerja akreditasi."],
            ["Berbasis Peran", "Akses disesuaikan dengan kewenangan pengguna."],
            ["Berorientasi Perbaikan", "Temuan diarahkan menjadi tindak lanjut nyata."],
          ].map(([title, text]) => (
            <div key={title} className="p-5">
              <p className="font-black text-slate-950">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-8 lg:py-24">
        <div className="max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[.24em] text-sky-700">Mengapa SIMAKS?</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Akreditasi bukan pekerjaan mendadak menjelang asesmen.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            SIMAKS dirancang untuk mengubah akreditasi dari pekerjaan berburu
            dokumen menjadi proses monitoring mutu yang berlangsung secara lebih
            tertib. Sekolah dapat melihat apa yang sudah siap, apa yang masih
            kurang, siapa yang bertanggung jawab, dan apa yang perlu diperbaiki.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="inline-flex rounded-2xl bg-sky-50 p-3 text-sky-700"><Icon size={25} /></div>
              <h3 className="mt-6 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[.24em] text-emerald-300">Untuk Siapa?</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                Satu ekosistem, peran yang berbeda.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              SIMAKS tidak menyamakan semua pengguna. Setiap peran memiliki
              kebutuhan, tanggung jawab, dan ruang akses yang berbeda.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {audiences.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-3xl border border-white/10 bg-white/[.05] p-7">
                <Icon className="text-emerald-300" size={28} />
                <h3 className="mt-6 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 md:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start lg:py-24">
        <div>
          <p className="text-xs font-black uppercase tracking-[.24em] text-sky-700">Keamanan & Tata Kelola</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Terbuka untuk mendaftar, terkendali untuk mengakses data.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Pendaftaran mandiri memudahkan masyarakat mulai menggunakan SIMAKS,
            tetapi akses terhadap data sekolah tetap mengikuti proses klaim,
            undangan tim, dan verifikasi peran.
          </p>
        </div>

        <div className="rounded-[2rem] bg-slate-50 p-7 sm:p-9">
          <div className="flex items-center gap-3">
            <LockKeyhole className="text-sky-700" size={28} />
            <p className="text-xl font-black">Prinsip akses SIMAKS</p>
          </div>
          <div className="mt-6 space-y-4">
            {principles.map((item) => (
              <p key={item} className="flex gap-3 leading-7 text-slate-700">
                <CheckCircle2 className="mt-1 shrink-0 text-emerald-600" size={19} />
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-6 md:px-8">
          <p className="text-xs font-black uppercase tracking-[.24em] text-sky-700">Mulai Menggunakan SIMAKS</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">
            Bangun kesiapan akreditasi sebagai proses kerja yang berkelanjutan.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Buat akun gratis untuk memulai. Setelah itu, sekolah dapat mengatur
            peran, membangun tim, dan menggunakan SIMAKS sesuai kebutuhan serta kewenangan.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={registerUrl}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-4 font-black text-white transition hover:bg-sky-800"
            >
              Daftar Mandiri <ArrowRight size={18} />
            </a>
            <a
              href={loginUrl}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 font-black text-slate-950 transition hover:border-sky-500"
            >
              Sudah Punya Akun? Masuk
            </a>
          </div>
          <p className="mt-5 text-sm text-slate-500">
            Aplikasi SIMAKS berjalan di simaks.hossibarani.com.
          </p>
        </div>
      </section>
    </main>
  );
}
