import Image from "next/image";
import Link from "next/link";

export const budayaCetakPath = "/research/budaya-cetak-riau-lingga";

export default function BudayaCetakFeature({ context = "home" }: { context?: "home" | "research" | "institute" }) {
  const label = context === "home" ? "Kajian Terbaru" : context === "research" ? "Raja Ali Haji and Malay Intellectual History" : "Sumber Belajar · Sejarah Intelektual Melayu";
  return (
    <section id="kajian-budaya-cetak" lang="id" aria-labelledby="budaya-cetak-feature-title" className="scroll-mt-24 border-y border-amber-900/10 bg-amber-50/50 px-6 py-14 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Link href={budayaCetakPath} className="group relative block overflow-hidden rounded-2xl bg-slate-950 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-amber-700" aria-label="Buka kajian Budaya Cetak Riau–Lingga">
          <Image src="/materials/budaya-cetak-riau-lingga/thumbnail.webp" alt="Istana Runtuh, Ilmu Bertahan — ilustrasi mesin cetak dan warisan intelektual Riau–Lingga" width={1672} height={941} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full transition duration-300 group-hover:scale-[1.02]" />
          <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white">Video · 17:44</span>
        </Link>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-800">{label}</p>
          <h2 id="budaya-cetak-feature-title" className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 md:text-4xl">Budaya Cetak dan Legitimasi Politik Kesultanan Riau–Lingga</h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">Menelusuri hubungan mesin cetak, kewibawaan pengetahuan, dan jaringan intelektual Melayu melalui Raja Ali Haji serta hubungan Riau–Singapura.</p>
          <p className="mt-4 text-sm text-slate-600">Dr. Hos Arie Sibarani · Artikel akademik · Video bersubtitle · Presentasi PDF</p>
          <Link href={budayaCetakPath} className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white hover:bg-amber-900 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-amber-700">{context === "institute" ? "Pelajari Budaya Cetak Riau–Lingga" : "Buka kajian lengkap"}<span aria-hidden="true" className="ml-2">→</span></Link>
        </div>
      </div>
    </section>
  );
}
