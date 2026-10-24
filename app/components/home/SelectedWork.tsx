import Link from "next/link";

const selectedWorks = [{ type: "Doctoral research", year: "2025", title: "The Riau-Lingga Sultanate in the Perspective of Maqasid al-Shariah", description: "Research examining Raja Ali Haji’s principal works as sources of ethical, political, legal, and governmental thought.", href: "/publications", action: "View publication record" }];
const selectedWorksId = [{ type: "Penelitian doktoral", year: "2025", title: "Kesultanan Riau-Lingga dalam Perspektif Maqasid al-Syariah", description: "Penelitian yang mengkaji karya utama Raja Ali Haji sebagai sumber pemikiran etika, politik, hukum, dan pemerintahan.", href: "/id/publications", action: "Lihat catatan publikasi" }];
export default function SelectedWork({ locale = "en" }: { locale?: "en" | "id" }) {
  const id = locale === "id";
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
              {id ? "Publikasi pilihan" : "Selected publication"}
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              {id ? "Penelitian doktoral tentang Riau-Lingga" : "Doctoral research on Riau-Lingga"}
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {id ? "Telusuri catatan publikasi dan karya akademik lainnya." : "Browse the publication record and other academic work."}
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

        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
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


      </div>
    </section>
  );
}
