import Link from "next/link";
import { programmeCards, type ProgrammeLocale } from "@/lib/programmes/catalogue";

export default function ProgrammeCards({ locale = "en" }: { locale?: ProgrammeLocale }) {
  const id = locale === "id";
  return (
    <section id="programmes" aria-labelledby="programmes-heading" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-amber-800">{id ? "Program pembelajaran" : "Learning programmes"}</p>
        <h2 id="programmes-heading" className="font-academic mt-4 text-3xl font-bold text-slate-950 sm:text-4xl">{id ? "Pilih cara belajar yang sesuai tujuan Anda" : "Choose how you want to learn"}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{id ? "Bandingkan sasaran peserta, hasil belajar, jadwal, dan status setiap program sebelum melanjutkan." : "Compare the audience, learning outcomes, schedule, and status of each programme before taking the next step."}</p>
        <Link href="/pelatihan-ai" className="mt-6 inline-flex rounded-xl bg-teal-800 px-5 py-3 font-bold text-white hover:bg-teal-700">{id ? "Pelatihan AI: Guru, Institusi & LexNusa →" : "AI Training: Teachers, Institutions & LexNusa →"}</Link>
        <div className="mt-9 grid gap-6 lg:grid-cols-3">
          {programmeCards[locale].map((programme) => (
            <article key={programme.href} className="flex flex-col rounded-2xl border border-slate-200 bg-stone-50 p-6 sm:p-7">
              <p className="self-start rounded-lg bg-amber-100 px-3 py-2 text-xs font-bold leading-5 text-amber-950">{programme.status}</p>
              <h3 className="font-academic mt-5 text-2xl font-bold text-slate-950">{programme.title}</h3>
              <dl className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
                {[[id ? "Untuk siapa" : "Who it is for", programme.audience], [id ? "Hasil belajar" : "Learning outcomes", programme.outcome], [id ? "Metode" : "Format", programme.format], [id ? "Jadwal dan status" : "Schedule and status", programme.schedule]].map(([label, value]) => <div key={label}><dt className="font-bold text-slate-900">{label}</dt><dd className="mt-1">{value}</dd></div>)}
              </dl>
              <Link href={programme.href} className="mt-7 inline-flex min-h-11 items-center justify-between gap-3 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700">{programme.action}<span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
