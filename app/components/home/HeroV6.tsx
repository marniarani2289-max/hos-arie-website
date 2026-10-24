import Image from "next/image";
import Link from "next/link";

export default function HeroV6({ locale = "en" }: { locale?: "en" | "id" }) {
  const id = locale === "id";
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-amber-300">{id ? "Hukum tata negara · Pemikiran Melayu" : "Constitutional law · Malay thought"}</p>
          <p className="mt-5 text-xl font-semibold">Dr. Hos Arie Sibarani</p>
          <h1 className="font-academic mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{id ? "Pemikiran Melayu, kajian konstitusi masa kini." : "Malay thought, contemporary constitutional scholarship."}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{id ? "Riset tentang kewenangan, keadilan, dan etika pemerintahan dalam karya Raja Ali Haji, disertai publikasi dan materi pembelajaran hukum." : "Research on authority, justice, and ethical government in Raja Ali Haji’s works, alongside publications and resources for legal education."}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={id ? "/id/research" : "/research"} className="inline-flex min-h-11 items-center rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{id ? "Lihat penelitian" : "View research"}</Link>
            <Link href="#programmes" className="inline-flex min-h-11 items-center rounded-xl border border-slate-500 px-5 py-3 font-semibold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{id ? "Buka materi belajar" : "Browse learning resources"}</Link>
          </div>
        </div>
        <div className="relative mx-auto aspect-[6/5] w-full max-w-lg overflow-hidden rounded-2xl border border-white/10">
          <Image src="/images/profile/hos-arie.png" alt={id ? "Dr. Hos Arie Sibarani mengenakan busana Melayu" : "Dr. Hos Arie Sibarani wearing traditional Malay attire"} fill priority sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover object-top" />
        </div>
      </div>
    </section>
  );
}
