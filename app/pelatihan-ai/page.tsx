import type { Metadata } from "next";
import Link from "next/link";
import { trainingOffers, trainingInquiry } from "@/lib/programmes/training";

const title = "Pelatihan AI untuk Guru, Institusi & Hukum";
const description = "Pilih AI untuk Guru, pelatihan AI institusi, atau LexNusa Legal AI Practice. Lihat kurikulum, hasil kerja, pendampingan, dan indikasi biaya.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/pelatihan-ai" },
  openGraph: { title, description, url: "/pelatihan-ai", locale: "id_ID", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};
const button = "inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600";

export default function TrainingPage() {
  return <div lang="id" className="bg-stone-50 text-slate-950">
    <section className="bg-slate-950 px-6 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Link href="/id" className="text-sm text-slate-300 underline underline-offset-4">Beranda Hossibarani</Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-[.22em] text-amber-300">Hossibarani · Pelatihan AI</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">Belajar AI melalui pekerjaan yang nyata.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Rancang pembelajaran, tingkatkan cara kerja tim, atau dalami praktik hukum. Setiap program menghubungkan kebutuhan, praktik, pemeriksaan hasil, dan revisi dengan umpan balik manusia.</p>
        <nav aria-label="Pilih pelatihan" className="mt-8 flex flex-wrap gap-3">{trainingOffers.map(p => <Link key={p.id} href={`#${p.id}`} className={button}>{p.id === "lexnusa" ? "Spesialisasi LexNusa" : p.title}</Link>)}</nav>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-300">Konsultasi program tersedia. Jadwal kelas belum diumumkan. Biaya di bawah merupakan indikasi awal; jadwal, cakupan, dan biaya final dikonfirmasi tertulis sebelum pembayaran.</p>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-6 py-14" aria-labelledby="compare-heading">
      <h2 id="compare-heading" className="text-3xl font-bold">Tiga jalur, sesuai kebutuhan Anda</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">{trainingOffers.map(p => <article key={p.id} className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-teal-800">{p.label}</p><h3 className="mt-4 text-2xl font-bold">{p.title}</h3><p className="mt-4 leading-7 text-slate-600">{p.outcome}</p>
        <p className="mt-5 font-semibold">{p.format}</p><p className="mt-2 text-sm text-slate-600">{p.capacity}</p><p className="mt-5 text-2xl font-bold text-teal-800">{p.price}</p><p className="mt-1 text-xs text-slate-500">Indikasi biaya · konfirmasi sebelum pembayaran</p>
        <Link href={`#${p.id}`} className="mt-6 font-bold text-teal-800 underline underline-offset-4">Lihat kurikulum dan rincian →</Link>
      </article>)}</div>
    </section>
    {trainingOffers.map((p, i) => <section key={p.id} id={p.id} className="scroll-mt-24 border-t border-stone-200 px-6 py-16 odd:bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div><p className="text-sm font-bold text-teal-800">0{i + 1} · {p.label}</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">{p.title}</h2><p className="mt-3 text-xl text-slate-600">{p.subtitle}</p><p className="mt-6 leading-7 text-slate-600">{p.audience}</p>
          <dl className="mt-7 space-y-4 rounded-2xl bg-slate-950 p-6 text-white">{[["Format",p.format],["Kapasitas",p.capacity],["Indikasi biaya",p.price]].map(([label,value]) => <div key={label}><dt className="text-sm text-slate-300">{label}</dt><dd className="mt-1 font-bold">{value}</dd></div>)}</dl>
          <a href={trainingInquiry(p.title)} className={`${button} mt-6`}>{p.action}</a><p className="mt-3 text-sm leading-6 text-slate-500">Kirim kebutuhan dan preferensi waktu melalui email. Konsultasi belum merupakan konfirmasi tempat.</p>
          {p.id === "lexnusa" && <Link href="/lexnusa/cohort" className="mt-5 inline-block font-semibold text-teal-800 underline underline-offset-4">Lihat kelas dan ruang kerja LexNusa →</Link>}
        </div>
        <div className="space-y-7">
          <div><h3 className="text-xl font-bold">Alur belajar</h3><ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-slate-600">{p.curriculum.map(item => <li key={item}>{item}</li>)}</ol></div>
          <div><h3 className="text-xl font-bold">Hasil yang dibawa pulang</h3><ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">{p.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><h3 className="text-xl font-bold">Pendampingan</h3><p className="mt-3 leading-7 text-slate-600">{p.support}</p></div>
          <div><h3 className="text-xl font-bold">Penilaian</h3><p className="mt-3 leading-7 text-slate-600">{p.assessment}</p></div>
          <div className="rounded-2xl border border-stone-200 p-5"><h3 className="font-bold">Cakupan dan persiapan</h3><p className="mt-3 text-sm leading-7 text-slate-600">{p.scope}</p></div>
        </div>
      </div>
    </section>)}
    <section className="border-t border-stone-200 bg-white px-6 py-16"><div className="mx-auto max-w-4xl"><h2 className="text-3xl font-bold">Dari konsultasi menuju pelatihan</h2><ol className="mt-6 list-decimal space-y-4 pl-5 leading-7 text-slate-600"><li>Pilih program dan kirim kebutuhan, jumlah peserta, serta preferensi waktu.</li><li>Pengelola mengonfirmasi kecocokan program, kesiapan layanan, jadwal, dan penawaran final secara tertulis.</li><li>Ikuti instruksi pendaftaran setelah jadwal disepakati. Ketentuan pembayaran, perubahan jadwal, dan pembatalan disampaikan sebelum pembayaran.</li></ol><p className="mt-6 rounded-xl bg-teal-50 p-5 leading-7 text-teal-950">Sertifikat penyelesaian diberikan setelah persyaratan belajar dipenuhi dan diverifikasi fasilitator. Sertifikat ini tidak menyatakan akreditasi atau kualifikasi profesi.</p><p className="mt-6 text-slate-600">Pengelola: Dr. Hos Arie Sibarani · <a href="mailto:riesib8@gmail.com" className="break-all font-semibold underline">riesib8@gmail.com</a></p></div></section>
  </div>;
}
