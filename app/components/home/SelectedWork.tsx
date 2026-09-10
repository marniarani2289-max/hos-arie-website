import Link from "next/link";

const selectedWorks = [
  {
    type: "Public Research Framework",
    year: "2026",
    title: "Malay Ethical Constitutionalism",
    description:
      "A documented research programme with primary sources, methodology, five constitutional principles, progress, and planned scholarly outputs.",
    href: "/research/malay-ethical-constitutionalism",
    action: "Open the framework",
  },
  {
    type: "Available Learning Materials",
    year: "2026",
    title: "Foundations of Raja Ali Haji’s Thought",
    description:
      "Eight modules with readings, podcasts, reflection, essays, and quizzes. Guided learning and certificate requirements are explained on the programme page.",
    href: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji",
    action: "Review all modules",
  },
  {
    type: "Published Doctoral Research",
    year: "2025",
    title: "The Riau-Lingga Sultanate in the Perspective of Maqasid al-Shariah",
    description:
      "Doctoral research examining Raja Ali Haji’s principal works as sources of ethical, political, legal, and governmental thought.",
    href: "/publications",
    action: "View publication record",
  },
];

const selectedWorksId = [
  { type: "Kerangka riset publik", year: "2026", title: "Konstitusionalisme Etis Melayu", description: "Program riset dengan sumber primer, metode, lima prinsip konstitusional, perkembangan, dan rencana publikasi ilmiah.", href: "/research/malay-ethical-constitutionalism", action: "Buka kerangka riset" },
  { type: "Materi pembelajaran tersedia", year: "2026", title: "Dasar Pemikiran Raja Ali Haji", description: "Delapan modul dengan bacaan, podcast, refleksi, esai, dan kuis. Persyaratan pendampingan dan sertifikat dijelaskan pada halaman program.", href: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji", action: "Lihat seluruh modul" },
  { type: "Penelitian doktoral", year: "2025", title: "Kesultanan Riau-Lingga dalam Perspektif Maqasid al-Syariah", description: "Penelitian doktoral yang mengkaji karya utama Raja Ali Haji sebagai sumber pemikiran etika, politik, hukum, dan pemerintahan.", href: "/id/publications", action: "Lihat catatan publikasi" },
];
export default function SelectedWork({ locale = "en" }: { locale?: "en" | "id" }) {
  const id = locale === "id";
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
              {id ? "Karya yang dapat diperiksa" : "Verifiable Work"}
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              {id ? "Riset, materi belajar, dan karya yang dapat ditelusuri" : "Work that can be opened, reviewed, and verified"}
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {id ? "Riset, materi pembelajaran, dan dokumentasi karya akademik yang dapat diakses publik." : "Publicly accessible research, learning materials, and documented academic work."}
            </p>
          </div>

          <Link
            href={id ? "/id/publications" : "/publications"}
            className="inline-flex items-center font-semibold text-slate-950 transition hover:text-amber-700"
          >
            {id ? "Lihat seluruh publikasi" : "View All Publications"}
            <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="mt-16 divide-y divide-slate-200 border-y border-slate-200">
          {(id ? selectedWorksId : selectedWorks).map((work) => (
            <article
              key={work.title}
              className="group grid gap-6 py-10 md:grid-cols-[190px_1fr_auto] md:items-center"
            >
              <div>
                <p className="text-sm font-semibold leading-6 text-amber-700">
                  {work.type}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {work.year}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                  {work.title}
                </h3>

                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                  {work.description}
                </p>
              </div>

              <Link
                href={work.href}
                className="inline-flex items-center whitespace-nowrap font-semibold text-slate-900 transition group-hover:text-amber-700"
              >
                {work.action}
                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-slate-950 p-8 text-white md:flex md:items-center md:justify-between md:gap-10 md:p-10"><div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">{id ? "Bangun karya berikutnya bersama" : "Build the next serious work together"}</p><h3 className="font-academic mt-3 text-3xl font-bold">{id ? "Kolaborasi riset, pengajaran, dan institusi" : "Research, teaching, and institutional collaboration"}</h3><p className="mt-4 leading-7 text-slate-300">{id ? "Untuk perguruan tinggi, jejaring peneliti, instansi pemerintah, jurnal, dan mitra pembelajaran masyarakat." : "For universities, research networks, government institutions, journals, and public-learning partners seeking a substantive collaboration."}</p></div><Link href={id ? "/id/contact" : "/contact"} className="mt-7 inline-flex shrink-0 rounded-xl bg-amber-400 px-6 py-3.5 font-bold text-slate-950 hover:bg-amber-300 md:mt-0">{id ? "Ajukan kolaborasi →" : "Propose a collaboration →"}</Link></div>
      </div>
    </section>
  );
}
