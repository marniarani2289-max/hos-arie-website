import type { Metadata } from "next";
import Link from "next/link";
import article from "./article.json";

const title = "Budaya Cetak dan Legitimasi Politik Kesultanan Riau–Lingga";
const path = "/research/budaya-cetak-riau-lingga";
const assets = "/materials/budaya-cetak-riau-lingga";
const description = "Kajian Dr. Hos Arie Sibarani tentang budaya cetak, Raja Ali Haji, legitimasi politik, dan jaringan intelektual Riau–Singapura. Baca artikel, tonton video, dan unduh presentasi PDF.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: path },
  authors: [{ name: "Dr. Hos Arie Sibarani" }],
  openGraph: { title, description, type: "article", locale: "id_ID", url: path, images: [{ url: `${assets}/thumbnail.webp`, width: 1672, height: 941, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [`${assets}/thumbnail.webp`] },
};

const chapters = [
  ["00:00", 0, "Pembukaan"], ["02:19", 139, "Tradisi manuskrip Melayu"],
  ["04:57", 297, "Risiko reproduksi dan etika akurasi"], ["05:50", 350, "Litografi dan tipografi"],
  ["09:09", 549, "Percetakan dan pemerintahan"], ["12:10", 730, "Teks hukum dan praktik kekuasaan"],
  ["13:32", 812, "Krisis politik 1911"], ["14:27", 867, "Jaringan Riau–Singapura"], ["16:35", 995, "Refleksi"],
] as const;

function LinkedParagraph({ text }: { text: string }) {
  return <>{text.split(/(https?:\/\/[^\s]+)/g).map((part, i) => /^https?:\/\//.test(part) ? <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="break-words text-amber-900 underline decoration-amber-600/50 underline-offset-4 hover:text-slate-950">{part}<span className="sr-only"> (tab baru)</span></a> : part)}</>;
}

export default function BudayaCetakPage() {
  const abstract = article.sections[0];
  const references = article.sections[article.sections.length - 1];
  const body = article.sections.slice(1, -1);
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: title, description, inLanguage: "id", author: { "@type": "Person", name: "Dr. Hos Arie Sibarani", url: "https://www.hossibarani.com/about" }, mainEntityOfPage: `https://www.hossibarani.com${path}`, image: `https://www.hossibarani.com${assets}/thumbnail.webp` };
  return (
    <main lang="id" className="bg-white text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className="bg-slate-950 px-6 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Jejak halaman" className="mb-10 flex flex-wrap gap-2 text-sm text-slate-300"><Link href="/" className="hover:text-amber-300">Beranda</Link><span aria-hidden="true">/</span><Link href="/research" className="hover:text-amber-300">Research</Link><span aria-hidden="true">/</span><span>Budaya Cetak Riau–Lingga</span></nav>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Kajian Sejarah Intelektual Melayu</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">{article.subtitle}</p>
          <p className="mt-6 font-semibold text-amber-300">Dr. Hos Arie Sibarani</p>
          <nav aria-label="Navigasi materi" className="mt-8 flex flex-wrap gap-3">
            {[["#video", "Tonton video · 17:44"], ["#artikel", "Baca artikel"], ["#presentasi", "Presentasi PDF"], ["#referensi", "Referensi"]].map(([href, label]) => <a key={href} href={href} className="inline-flex min-h-11 items-center rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold hover:border-amber-300 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400">{label}</a>)}
          </nav>
        </div>
      </header>

      <section aria-labelledby="ringkasan-title" className="border-b border-stone-200 bg-amber-50/50 px-6 py-12 md:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 id="ringkasan-title" className="text-2xl font-bold">Abstrak</h2>
          {abstract.paragraphs.map((p, i) => <p key={i} className={i === 0 ? "mt-5 text-lg leading-8 text-slate-700" : "mt-5 text-sm leading-7 text-slate-600"}>{p}</p>)}
        </div>
      </section>

      <section id="video" aria-labelledby="video-title" className="scroll-mt-24 px-6 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-800">Tonton dan pelajari</p>
          <h2 id="video-title" className="mt-3 text-3xl font-bold">Video pembelajaran</h2>
          <p className="mt-4 leading-7 text-slate-600">Durasi 17 menit 44 detik · Bahasa Indonesia · Subtitle langsung pada video</p>
          <div className="mt-7 aspect-video overflow-hidden rounded-2xl bg-slate-950">
            <iframe src="https://www.youtube-nocookie.com/embed/rIBIc0hyPk8" title={`${title} — Dr. Hos Arie Sibarani`} className="h-full w-full border-0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          </div>
          <a href="https://youtu.be/rIBIc0hyPk8" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center font-semibold text-amber-900 underline underline-offset-4">Tonton di YouTube ↗<span className="sr-only"> (tab baru)</span></a>
          <details className="mt-5 rounded-xl border border-stone-200 p-5">
            <summary className="cursor-pointer font-bold">Bagian video dan penanda waktu</summary>
            <p className="mt-3 text-sm text-slate-600">Tautan berikut membuka bagian terkait di YouTube.</p>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{chapters.map(([time, seconds, label]) => <li key={time}><a href={`https://www.youtube.com/watch?v=rIBIc0hyPk8&t=${seconds}s`} target="_blank" rel="noopener noreferrer" className="flex gap-3 rounded-lg p-2 text-sm hover:bg-amber-50"><span className="font-mono font-bold text-amber-900">{time}</span><span>{label}<span className="sr-only"> (YouTube, tab baru)</span></span></a></li>)}</ol>
          </details>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-600">Video memuat ilustrasi retoris dan penafsiran sejarah. Klarifikasi akademik ditampilkan pada bagian terkait; artikel di bawah menyediakan uraian dan rujukan lebih lengkap.</p>
        </div>
      </section>

      <section id="artikel" aria-labelledby="artikel-title" className="scroll-mt-24 border-y border-stone-200 bg-stone-50 px-6 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-800">Naskah akademik</p><h2 id="artikel-title" className="mt-3 text-3xl font-bold">Baca kajian lengkap</h2></div><a href={`${assets}/naskah-akademik.docx`} download="Budaya_Cetak_dan_Legitimasi_Politik_Riau_Lingga.docx" className="inline-flex min-h-12 items-center rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-amber-900">Unduh naskah Word</a></div>
          <div className="mt-9 grid items-start gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
            <nav aria-label="Daftar isi artikel" className="rounded-2xl border border-stone-200 bg-white p-5 lg:sticky lg:top-28"><h3 className="font-bold">Daftar isi</h3><ol className="mt-4 space-y-3">{body.map(s => <li key={s.id}><a href={`#${s.id}`} className="block py-1 text-sm leading-6 text-slate-600 hover:text-amber-800 hover:underline">{s.title}</a></li>)}<li><a href="#referensi" className="block py-1 text-sm text-slate-600 hover:text-amber-800 hover:underline">Daftar Pustaka</a></li></ol></nav>
            <article className="min-w-0 max-w-3xl">{body.map(s => <section id={s.id} key={s.id} aria-labelledby={`${s.id}-title`} className="mb-12 scroll-mt-28"><h3 id={`${s.id}-title`} className="text-2xl font-bold leading-snug text-slate-950">{s.title}</h3>{s.paragraphs.map((p, i) => <p key={i} className="mt-5 text-lg leading-9 text-slate-700"><LinkedParagraph text={p} /></p>)}</section>)}</article>
          </div>
        </div>
      </section>

      <section id="presentasi" aria-labelledby="presentasi-title" className="scroll-mt-24 px-6 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-800">Materi pendamping</p>
          <h2 id="presentasi-title" className="mt-3 text-3xl font-bold">Presentasi PDF</h2>
          <p className="mt-4 leading-8 text-slate-600">23 halaman mengikuti alur audio, dilengkapi penanda waktu, catatan akademik, dan rujukan. Ukuran berkas sekitar 10 MB.</p>
          <div className="mt-6 flex flex-wrap gap-4"><a href={`${assets}/presentasi.pdf`} download="Budaya_Cetak_Riau_Lingga_Presentasi.pdf" className="inline-flex min-h-12 items-center rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white hover:bg-amber-900">Unduh presentasi PDF</a><a href={`${assets}/presentasi.pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-xl border border-stone-300 px-6 py-3 font-semibold text-slate-800 hover:bg-stone-50">Buka PDF di tab baru ↗</a></div>
          <details className="mt-6 rounded-2xl border border-stone-200 p-5 sm:p-7"><summary className="cursor-pointer text-lg font-bold">Baca presentasi di halaman ini</summary><p className="mt-3 text-sm leading-7 text-slate-600">Jika pembaca PDF tidak tersedia di perangkat Anda, gunakan tombol buka atau unduh di atas.</p><iframe src={`${assets}/presentasi.pdf#view=FitH`} title="Presentasi Budaya Cetak dan Legitimasi Politik Kesultanan Riau–Lingga, 23 halaman" loading="lazy" className="mt-5 h-[75vh] min-h-96 w-full rounded-lg border border-stone-300 bg-stone-50" /></details>
        </div>
      </section>

      <section id="referensi" aria-labelledby="referensi-title" className="scroll-mt-24 border-t border-stone-200 bg-amber-50/50 px-6 py-14 md:px-8">
        <div className="mx-auto max-w-4xl"><h2 id="referensi-title" className="text-3xl font-bold">Daftar Pustaka</h2><ol className="mt-7 space-y-6">{references.paragraphs.map((p, i) => <li key={i} className="leading-8 text-slate-700"><LinkedParagraph text={p} /></li>)}</ol><div className="mt-10 flex flex-wrap gap-6 font-semibold text-amber-900"><Link href="/research" className="underline underline-offset-4">Kembali ke Research</Link><Link href="/raja-ali-haji" className="underline underline-offset-4">Raja Ali Haji Institute</Link></div></div>
      </section>
    </main>
  );
}
