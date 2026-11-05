import type { Metadata } from "next";
import Link from "next/link";
import VideoBrief from "./VideoBrief";

export const metadata: Metadata = {
  title: "AI Video Studio | AI & Digital Systems Lab",
  description: "Siapkan brief, naskah, dan rencana video pendek untuk Hukumpreneur, LexNusa, serta pembelajaran. Panduan produksi dengan MoneyPrinterTurbo.",
  alternates: { canonical: "/ai-lab/video-studio" },
};
const button = "inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700";
export default function VideoStudioPage() {
  return <main lang="id" className="bg-white text-slate-950">
    <header className="bg-slate-950 text-white"><div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <Link href="/ai-lab" className="inline-flex min-h-11 items-center text-sm font-semibold text-amber-300 underline underline-offset-4">← AI &amp; Digital Systems Lab</Link>
      <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-amber-300">Ide → Naskah → Produksi</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">AI Video Studio</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Siapkan video pendek untuk berbagi pengetahuan. Rancang pesan, tulis narasi, lalu bawa bahan Anda ke proses produksi.</p>
      <div className="mt-7 flex flex-wrap gap-3"><a href="#ruang-kerja" className={button + " bg-amber-400 text-slate-950 hover:bg-amber-300"}>Mulai rencana video</a><a href="#produksi" className={button + " border border-slate-500 hover:bg-slate-800"}>Cara membuat video</a></div>
    </div></header>
    <div className="mx-auto max-w-6xl space-y-12 px-5 py-10 sm:px-8">
      <section className="rounded-xl border border-amber-200 bg-amber-50 p-5" aria-labelledby="status-title"><h2 id="status-title" className="font-bold">Ruang persiapan aktif · Pembuatan MP4 belum terhubung</h2><p className="mt-2 leading-7 text-slate-700">Formulir dan unduhan rencana dapat digunakan sekarang. Narasi AI, subtitle otomatis, dan rendering video memerlukan MoneyPrinterTurbo pada komputer atau server terpisah. Halaman ini belum mengirim pekerjaan ke mesin produksi.</p></section>
      <VideoBrief />
      <section id="produksi" className="scroll-mt-8" aria-labelledby="produksi-title"><h2 id="produksi-title" className="text-3xl font-bold">Dari rencana menjadi video</h2><ol className="mt-6 grid gap-4 md:grid-cols-3">{[
        ["1. Periksa naskah", "Tentukan satu pesan utama. Verifikasi sumber, istilah, nama, dan setiap klaim sebelum menyiapkan narasi."],
        ["2. Produksi di MoneyPrinterTurbo", "Buka aplikasi yang sudah dipasang, salin naskah Anda, pilih suara, materi visual, dan rasio video. Siapkan layanan serta API key sesuai dokumentasi resmi."],
        ["3. Tinjau dan ekspor", "Periksa suara, kecocokan gambar, hak penggunaan materi, dan waktu subtitle. Ekspor video setelah hasilnya sesuai; unggah secara manual ke kanal tujuan."],
      ].map(([title, body]) => <li key={title} className="rounded-xl border border-slate-200 p-6"><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{body}</p></li>)}</ol><div className="mt-6 flex flex-wrap gap-3"><a href="https://github.com/harry0703/MoneyPrinterTurbo" className={button + " bg-slate-950 text-white hover:bg-slate-800"}>Dokumentasi MoneyPrinterTurbo ↗</a><a href="/clip-studio/" className={button + " border border-slate-300 hover:bg-stone-50"}>Edit klip di Hukumpreneur Studio</a><Link href="/ai-lab/concat" className={button + " border border-slate-300 hover:bg-stone-50"}>Panduan Concat</Link></div></section>
      <section className="border-t border-slate-200 pt-8"><h2 className="text-2xl font-bold">Satu studio, beragam ruang belajar</h2><div className="mt-4 flex flex-wrap gap-3">{[["/hukumpreneur", "Hukumpreneur"], ["/lexnusa", "LexNusa"], ["/blue-education", "Blue Education"], ["/ai-lab", "Kembali ke AI Lab"]].map(([href, name]) => <Link key={href} href={href} className={button + " border border-slate-300"}>{name}</Link>)}</div></section>
    </div>
  </main>;
}
