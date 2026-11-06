import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ExamGO · Asesmen Digital & Ujian CBT",
  description: "Kenali MC-ExamGO dan rencanakan asesmen digital untuk kelas hukum. Panduan, sumber resmi, dan akses ke ujian kelas yang tersedia.",
  alternates: { canonical: "/ai-lab/examgo" },
};
const button = "inline-flex min-h-12 items-center rounded-lg border border-slate-300 px-5 py-3 font-semibold hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700";
const courses = [
  { key: "may", title: "Hukum Kejahatan Mayantara", text: "Rancang asesmen analisis kasus, unsur delik, yurisdiksi, dan bukti elektronik." },
  { key: "pol", title: "Politik Hukum Pidana", text: "Rancang asesmen argumentasi kebijakan, kriminalisasi, dan pilihan pemidanaan." },
];
export default function ExamGoPage() {
  return <main lang="id" className="bg-white text-slate-950">
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <nav aria-label="Navigasi halaman" className="flex flex-wrap gap-5 text-sm font-semibold text-teal-800"><Link className={button} href="/ai-lab#belajar">← AI &amp; Digital Systems Lab</Link><Link className={button} href="/kuliah">Portal kuliah</Link></nav>
      <header className="mt-10"><p className="text-sm font-bold uppercase tracking-widest text-teal-800">Teknologi pendidikan · Asesmen digital</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">ExamGO: Ujian CBT &amp; Asesmen Digital</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Kenali MC-ExamGO sebagai pilihan platform ujian berbasis komputer, lalu susun alur asesmen yang sesuai dengan tujuan pembelajaran.</p></header>
      <section aria-labelledby="status" className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6"><h2 id="status" className="text-xl font-bold">Panduan tersedia · Server ExamGO belum terhubung</h2><p className="mt-3 leading-7">Halaman ini menyediakan pengenalan dan tautan resmi MC-ExamGO. Belum ada layanan ujian ExamGO, sinkronisasi akun, atau pengiriman nilai melalui platform tersebut di website ini. Untuk UTS saat ini, gunakan formulir online di kelas masing-masing.</p><a href="https://mcode.web.id/examgo" target="_blank" rel="noopener noreferrer" className={`${button} mt-5 bg-white`}>Kunjungi situs resmi ExamGO ↗ <span className="sr-only">(tab baru)</span></a></section>
      <section aria-labelledby="fitur" className="mt-12"><h2 id="fitur" className="text-2xl font-bold">Kenali kegunaannya</h2><p className="mt-3 leading-7 text-slate-600">Menurut informasi pengembang, MC-ExamGO menyediakan bank soal, impor soal dari format Word yang didukung, bantuan AI untuk pembuatan soal, materi pembelajaran, serta integrasi MC-ExamBrowser. Paket server tersedia untuk Windows dan Linux. Fitur ini belum diuji langsung oleh Lab; periksa ketentuan dan dokumentasi terbaru pada situs resmi.</p></section>
      <section aria-labelledby="kelas" className="mt-12"><h2 id="kelas" className="text-2xl font-bold">Terhubung dengan kelas hukum</h2><p className="mt-3 leading-7 text-slate-600">Tautan berikut membuka modul dan formulir UTS website yang sudah tersedia. Pengumpulan ini terpisah dari ExamGO.</p><div className="mt-5 grid gap-5 md:grid-cols-2">{courses.map(course => <article key={course.key} className="rounded-xl border border-slate-200 p-6"><h3 className="text-xl font-bold">{course.title}</h3><p className="mt-3 leading-7 text-slate-600">{course.text}</p><div className="mt-5 flex flex-wrap gap-3"><a className={button} href={`/kuliah/modul.html?course=${course.key}`}>Buka modul kelas</a><a className={button} href={`/kuliah/modul.html?course=${course.key}&meeting=8`}>Buka UTS online yang tersedia</a></div></article>)}</div></section>
      <section aria-labelledby="persiapan" className="mt-12 rounded-xl border border-slate-200 p-6"><h2 id="persiapan" className="text-2xl font-bold">Sebelum menggunakan ExamGO untuk ujian</h2><ol className="mt-4 list-decimal space-y-3 pl-6 leading-7 text-slate-700"><li>Pengelola menyiapkan server, lisensi yang sesuai, dan alamat layanan ExamGO.</li><li>Dosen mencoba akun peserta uji, identitas mahasiswa, soal esai, penyimpanan jawaban, penilaian, dan ekspor hasil.</li><li>Uji pemulihan ketika koneksi terputus, akses dari ponsel, serta pembatasan akses jawaban mahasiswa.</li><li>Setelah pengujian berhasil, dosen mengumumkan alamat dan petunjuk ujian resmi kepada mahasiswa.</li></ol></section>
      <p className="mt-8 text-sm leading-6 text-slate-500">Rujukan: situs resmi MC-ExamGO. Ditinjau 6 November 2026. MC-ExamGO adalah produk pihak ketiga; halaman ini merupakan panduan Hossibarani Lab.</p>
    </div>
  </main>;
}
