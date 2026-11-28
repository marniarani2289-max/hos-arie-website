import Link from "next/link";

export const tuhfatPath = "/research/tuhfat-al-nafis";

export default function TuhfatFeature({ compact = false }: { compact?: boolean }) {
  return (
    <section id="tuhfat-al-nafis" lang="id" aria-labelledby="tuhfat-feature-title" className={compact ? "my-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8" : "scroll-mt-24 border-y border-emerald-900/10 bg-emerald-50 px-6 py-14 md:px-8 md:py-20"}>
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">Materi terbuka · Hukum dan ketatanegaraan Melayu</p>
        <h2 id="tuhfat-feature-title" className="mt-3 max-w-4xl text-2xl font-bold leading-tight text-slate-950 sm:text-3xl">Tuhfat al-Nafis: Perebutan Takhta Riau-Lingga 1857</h2>
        <p className="mt-4 max-w-3xl leading-8 text-slate-700">Membaca legitimasi, batas kekuasaan, dan koalisi Melayu-Bugis melalui kajian hukum, ketatanegaraan, filsafat, dan politik.</p>
        <p className="mt-3 text-sm text-slate-600">Dr. Hos Arie Sibarani · Video 23:17 bersubtitle Indonesia · PDF 15 halaman</p>
        <Link href={tuhfatPath} className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-emerald-950 px-6 py-3 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800">Tonton video dan baca materi <span aria-hidden="true" className="ml-2">→</span></Link>
      </div>
    </section>
  );
}
