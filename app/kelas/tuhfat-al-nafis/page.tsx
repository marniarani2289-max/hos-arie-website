import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const title = "Tuhfat al-Nafis: Perebutan Takhta Riau-Lingga 1857";
const description = "Materi Dr. Hos Arie Sibarani tentang hukum, ketatanegaraan, filsafat, dan politik dalam Tuhfat al-Nafis. Tonton video bersubtitle dan unduh presentasi PDF.";
const pagePath = "/kelas/tuhfat-al-nafis";
const pdfPath = "/materials/tuhfat-al-nafis/presentasi.pdf";
const videoId = "cikj6pvNvL0";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: pagePath },
  authors: [{ name: "Dr. Hos Arie Sibarani" }],
  openGraph: { title, description, url: pagePath, locale: "id_ID", type: "website", images: [{ url: "/materials/tuhfat-al-nafis/sampul.webp", alt: title }] },
};

const themes = [
  ["Hukum", "Sumber kewenangan, sumpah setia, dan alasan yang membenarkan keputusan penguasa."],
  ["Ketatanegaraan", "Kedudukan Sultan dan Yangdipertuan Muda, suksesi, serta pembatasan kekuasaan."],
  ["Filsafat", "Hubungan legitimasi, keadilan, etika penguasa, dan pertanggungjawaban."],
  ["Politik", "Koalisi Melayu-Bugis, pengaruh kolonial, dan penguasaan sumber daya keuangan."],
] as const;

const chapters = [
  ["00:00", 0, "Pengantar dan pertanyaan tentang kekuasaan"],
  ["03:20", 200, "Empat sudut pandang kajian"],
  ["05:57", 357, "Sumpah setia dan tatanan kekuasaan"],
  ["07:14", 434, "Sultan dan Yangdipertuan Muda"],
  ["09:43", 583, "Krisis suksesi 1857"],
  ["10:31", 631, "Kewenangan dan alasan publik"],
  ["13:03", 783, "Uang sebagai instrumen politik"],
  ["14:53", 893, "Menguji keadilan"],
  ["16:38", 998, "Etika penguasa dan koalisi"],
  ["18:59", 1139, "Pertanggungjawaban dan refleksi"],
  ["21:51", 1311, "Sintesis dan relevansi masa kini"],
] as const;

export default function TuhfatLearningPage() {
  return (
    <main lang="id" className="bg-white text-slate-900">
      <header className="bg-emerald-950 px-5 py-14 text-white sm:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Jejak halaman" className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-emerald-100">
            <Link href="/raja-ali-haji" className="underline underline-offset-4">Raja Ali Haji Institute</Link>
            <span aria-hidden="true">/</span><Link href="/belajar" className="underline underline-offset-4">Ruang Belajar</Link>
          </nav>
          <p className="mt-9 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Hukumpreneur · Materi perkuliahan</p>
          <h1 className="mt-4 max-w-5xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-emerald-100">Siapa yang berhak berkuasa, siapa yang dapat membatasi kekuasaan, dan untuk kepentingan siapa kewenangan dijalankan?</p>
          <p className="mt-5 font-semibold text-amber-200">Dr. Hos Arie Sibarani</p>
          <p className="mt-2 text-sm text-emerald-100">23 menit 17 detik · Subtitle bahasa Indonesia · Presentasi 15 halaman</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#video" className="inline-flex min-h-12 items-center rounded-xl bg-amber-300 px-5 py-3 font-bold text-emerald-950 hover:bg-amber-200">Tonton video</a>
            <a href="#presentasi" className="inline-flex min-h-12 items-center rounded-xl border border-emerald-300 px-5 py-3 font-semibold hover:bg-emerald-900">Baca dan unduh PDF</a>
          </div>
        </div>
      </header>

      <section id="video" aria-labelledby="video-title" className="scroll-mt-24 px-5 py-12 sm:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="video-title" className="text-2xl font-bold sm:text-3xl">Video pembelajaran</h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-600">Pelajari krisis suksesi Riau-Lingga melalui pembacaan Tuhfat al-Nafis. Materi berfokus pada hukum, ketatanegaraan, filsafat kekuasaan, dan politik Melayu-Bugis.</p>
          <div className="mt-6 aspect-video overflow-hidden rounded-2xl bg-slate-950">
            <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}`} title={`${title} — Dr. Hos Arie Sibarani`} className="h-full w-full border-0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          </div>
          <a href={`https://youtu.be/${videoId}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-12 items-center font-semibold text-emerald-900 underline underline-offset-4">Buka video di YouTube ↗<span className="sr-only"> (tab baru)</span></a>
          <p className="text-sm leading-7 text-slate-600">Jika pemutar tidak tampil, gunakan tautan YouTube di atas.</p>
          <details className="mt-6 rounded-xl border border-stone-200 p-5">
            <summary className="cursor-pointer font-bold">Pilih bagian pembahasan</summary>
            <p className="mt-3 text-sm text-slate-600">Penanda waktu membuka bagian terkait di YouTube.</p>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">{chapters.map(([time, seconds, label]) => <li key={time}><a href={`https://www.youtube.com/watch?v=${videoId}&t=${seconds}s`} target="_blank" rel="noopener noreferrer" className="flex min-h-11 gap-3 rounded-lg p-2 text-sm hover:bg-emerald-50"><span className="font-mono font-bold text-emerald-900">{time}</span><span>{label}<span className="sr-only"> (tab baru)</span></span></a></li>)}</ol>
          </details>
        </div>
      </section>

      <section aria-labelledby="tema-title" className="border-y border-stone-200 bg-stone-50 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 id="tema-title" className="text-2xl font-bold sm:text-3xl">Empat sudut pandang kajian</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">{themes.map(([name, detail]) => <article key={name} className="rounded-xl border border-stone-200 bg-white p-6"><h3 className="text-xl font-bold text-emerald-950">{name}</h3><p className="mt-3 leading-8 text-slate-600">{detail}</p></article>)}</div>
          <p className="mt-6 max-w-4xl text-sm leading-7 text-slate-600">Konsep hukum dan politik modern digunakan sebagai perangkat analisis dengan memperhatikan konteks sejarah. Tuhfat al-Nafis dibaca sebagai narasi sejarah yang memuat praktik dan gagasan kekuasaan.</p>
        </div>
      </section>

      <section id="presentasi" aria-labelledby="pdf-title" className="scroll-mt-24 px-5 py-12 sm:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="pdf-title" className="text-2xl font-bold sm:text-3xl">Materi presentasi</h2>
          <p className="mt-4 leading-8 text-slate-600">Anatomi Kekuasaan dalam Tuhfat al-Nafis · Dr. Hos Arie Sibarani · 15 halaman · Sekitar 3,3 MB.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/materials/tuhfat-al-nafis/unduh" download="Tuhfat_al_Nafis_Dr_Hos_Arie_Sibarani.pdf" className="inline-flex min-h-12 items-center rounded-xl bg-emerald-950 px-6 py-3 font-semibold text-white hover:bg-emerald-800">Unduh presentasi PDF</a>
            <a href={pdfPath} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-xl border border-stone-300 px-6 py-3 font-semibold text-slate-800 hover:bg-stone-50">Buka PDF di tab baru ↗</a>
          </div>
          <details className="mt-6 rounded-xl border border-stone-200 p-5 sm:p-7">
            <summary className="cursor-pointer text-lg font-bold">Baca presentasi di halaman ini</summary>
            <p className="mt-3 text-sm leading-7 text-slate-600">Jika pembaca PDF tidak tersedia di ponsel Anda, pilih Buka PDF di tab baru atau Unduh presentasi PDF.</p>
            <iframe src={`${pdfPath}#view=FitH`} title="Presentasi Tuhfat al-Nafis — Dr. Hos Arie Sibarani, 15 halaman" loading="lazy" className="mt-4 h-[70vh] min-h-80 w-full rounded-lg border border-stone-300 bg-stone-50" />
          </details>
          <a href={pdfPath} target="_blank" rel="noopener noreferrer" aria-label="Lihat sampul dan buka presentasi PDF di tab baru" className="mt-7 block max-w-2xl overflow-hidden rounded-xl border border-stone-200"><Image src="/materials/tuhfat-al-nafis/sampul.webp" alt="Sampul presentasi Tuhfat al-Nafis: Blueprint Ketatanegaraan Melayu-Bugis" width={1376} height={768} sizes="(max-width: 768px) 100vw, 672px" className="h-auto w-full" /></a>
        </div>
      </section>

      <section aria-labelledby="diskusi-title" className="border-t border-emerald-100 bg-emerald-50 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 id="diskusi-title" className="text-2xl font-bold">Pertanyaan diskusi</h2>
          <ol className="mt-5 max-w-4xl list-decimal space-y-3 pl-6 leading-8 text-slate-700"><li>Apakah kewenangan yang sah sudah cukup untuk membenarkan keputusan seorang penguasa?</li><li>Bagaimana penguasaan sumber keuangan memengaruhi pelaksanaan kewenangan formal?</li><li>Siapa yang dapat membatasi kekuasaan ketika mekanisme pengawasan kelembagaan lemah?</li></ol>
          <nav aria-label="Lanjut belajar" className="mt-8 flex flex-wrap gap-5 font-semibold text-emerald-900"><Link href="/raja-ali-haji" className="underline underline-offset-4">Raja Ali Haji Institute</Link><Link href="/belajar" className="underline underline-offset-4">Kembali ke Ruang Belajar</Link></nav>
        </div>
      </section>
    </main>
  );
}
