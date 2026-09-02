import { savePilotAssessment } from "./actions";

type AssessmentType = "baseline" | "endline" | "evaluation";

export default function AssessmentForm({
  type,
  title,
  introduction,
  items,
  openQuestions,
  savedAnswers,
  error,
  success,
}: {
  type: AssessmentType;
  title: string;
  introduction: string;
  items: string[];
  openQuestions: string[];
  savedAnswers?: { ratings?: number[]; [key: string]: unknown } | null;
  error?: string;
  success?: boolean;
}) {
  const savedRatings = Array.isArray(savedAnswers?.ratings) ? savedAnswers.ratings : [];
  return <main className="min-h-screen bg-[#f7f4ef] px-5 py-14 text-slate-950 sm:px-8">
    <div className="mx-auto max-w-4xl">
      <a href="/dashboard" className="font-bold text-amber-800">← Kembali ke dashboard</a>
      <p className="mt-10 text-xs font-bold uppercase tracking-[.25em] text-amber-700">Pilot Cohort 1 · Raja Ali Haji Institute</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">{title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{introduction}</p>
      {error && <p className="mt-7 border border-red-300 bg-red-50 p-4 font-semibold text-red-800">{error}</p>}
      {success && <p className="mt-7 border border-emerald-300 bg-emerald-50 p-4 font-semibold text-emerald-800">Jawaban Anda sudah tersimpan.</p>}
      <form action={savePilotAssessment} className="mt-10 space-y-8">
        <input type="hidden" name="assessmentType" value={type}/>
        <section className="rounded-2xl border border-stone-300 bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-5"><h2 className="text-2xl font-black">Pernyataan skala 1–5</h2><p className="text-sm text-slate-500">1 = sangat tidak setuju · 5 = sangat setuju</p></div>
          <div className="divide-y divide-stone-200">
            {items.map((item, index) => <fieldset key={item} className="py-6"><legend className="font-bold leading-7">{index + 1}. {item}</legend><div className="mt-4 flex flex-wrap gap-3">{[1,2,3,4,5].map(value => <label key={value} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-stone-300 has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100"><input className="sr-only" type="radio" name={`item_${index + 1}`} value={value} required defaultChecked={savedRatings[index] === value}/><span className="font-bold">{value}</span></label>)}</div></fieldset>)}
          </div>
        </section>
        <section className="rounded-2xl border border-stone-300 bg-white p-6 sm:p-8"><h2 className="text-2xl font-black">Pertanyaan reflektif</h2><div className="mt-5 space-y-6">{openQuestions.map((question,index) => <label key={question} className="block font-bold leading-7">{question}<textarea name={`open_${index + 1}`} rows={5} defaultValue={String(savedAnswers?.[`open_${index + 1}`] || "")} className="mt-3 w-full border border-stone-300 p-4 font-normal outline-none focus:border-amber-700" required/></label>)}</div></section>
        {type === "evaluation" && <section className="rounded-2xl border border-stone-300 bg-white p-6 sm:p-8"><h2 className="text-2xl font-black">Testimoni</h2><label className="mt-5 block font-bold">Testimoni singkat (opsional)<textarea name="testimonial" rows={5} className="mt-3 w-full border border-stone-300 p-4 font-normal outline-none focus:border-amber-700"/></label><label className="mt-4 flex items-start gap-3 leading-7"><input type="checkbox" name="testimonialConsent" className="mt-1 h-5 w-5 accent-amber-700"/>Saya mengizinkan testimoni ini dipublikasikan dengan nama dan institusi saya.</label></section>}
        <button className="w-full rounded-xl bg-slate-950 px-6 py-4 text-lg font-black text-white hover:bg-amber-700">Simpan {title}</button>
      </form>
    </div>
  </main>;
}

