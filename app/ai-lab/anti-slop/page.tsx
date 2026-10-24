import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Anti-Slop | Evaluasi Desain dan Konten AI",
  description: "Panduan Anti-Slop di AI & Digital Systems Lab: meninjau desain, tulisan, dan kode hasil AI dengan pemeriksaan manusia.",
  alternates: { canonical: "/ai-lab/anti-slop" },
};

const reviewQuestions = [
  ["Tujuan halaman", "Apakah pengunjung segera memahami isi halaman dan tindakan yang dapat dilakukan?"],
  ["Navigasi", "Apakah nama menu sesuai dengan halaman tujuan, dan setiap tombol berfungsi?"],
  ["Isi dan bukti", "Apakah klaim memiliki sumber? Tandai informasi yang perlu dikonfirmasi, termasuk jadwal dan status program."],
  ["Pengulangan", "Apakah ada bagian yang mengulang informasi tanpa membantu keputusan pengunjung?"],
  ["Keterbacaan", "Apakah judul, paragraf, warna, dan urutan isi mudah dibaca?"],
  ["Ponsel dan aksesibilitas", "Periksa teks terpotong, gulir mendatar, tombol sentuh, navigasi keyboard, dan fokus yang terlihat."],
];
const linkStyle = "inline-flex min-h-11 items-center rounded-lg px-5 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700";

export default function AntiSlopPage() {
  return <main lang="id" className="bg-white text-slate-900">
    <header className="bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <Link href="/ai-lab" className="inline-flex min-h-11 items-center text-sm font-semibold text-amber-300 underline underline-offset-4">Kembali ke AI &amp; Digital Systems Lab</Link>
        <p className="mt-7 text-xs font-bold uppercase tracking-widest text-amber-300">Referensi terbuka · Panduan evaluasi</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">Anti-Slop: Evaluasi Desain dan Konten AI</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Gunakan pertanyaan yang jelas untuk meninjau hasil AI: apa gunanya, apa buktinya, dan apakah pengunjung dapat menggunakannya?</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#panduan" className={`${linkStyle} bg-amber-400 text-slate-950 hover:bg-amber-300`}>Baca panduan penggunaan</a>
          <a href="https://github.com/miqdadbadjuber/anti-slop" className={`${linkStyle} border border-slate-500 hover:bg-slate-800`}>Buka repositori resmi</a>
        </div>
      </div>
    </header>
    <div className="mx-auto max-w-6xl space-y-14 px-5 py-12 sm:px-8 sm:py-16">
      <section aria-labelledby="tentang">
        <h2 id="tentang" className="text-2xl font-bold">Apa yang tersedia di sini?</h2>
        <p className="mt-4 max-w-3xl leading-8 text-slate-700">Anti-Slop, proyek miqdadbadjuber, menyediakan aturan bagi agen AI untuk meninjau desain antarmuka, tulisan, dan kode. Arah visual tetap ditentukan pemilik proyek. Halaman AI Lab ini menyediakan panduan dan lembar pemeriksaan mandiri; belum menjalankan pemindaian website atau penilaian otomatis.</p>
        <p className="mt-3 max-w-3xl leading-8 text-slate-700">Aturan dapat digunakan selama pembuatan atau untuk meninjau hasil yang sudah ada. Berkas <code>antislop.md</code> dapat dipakai dalam percakapan AI. Pemasangan melalui terminal tersedia dengan <code>npx antislop-ai</code>; ikuti petunjuk resmi sesuai agen yang digunakan.</p>
        <a href="https://github.com/miqdadbadjuber/anti-slop/blob/main/GUIDE.md" className="mt-4 inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4">Panduan pemasangan resmi</a>
      </section>
      <section id="panduan" className="scroll-mt-8" aria-labelledby="panduan-title">
        <h2 id="panduan-title" className="text-2xl font-bold">Alur penggunaan di AI Lab</h2>
        <ol className="mt-5 list-decimal space-y-4 pl-6 leading-8 text-slate-700">
          <li>Tentukan halaman, pembaca, dan tujuan yang ingin diperbaiki. Simpan tampilan awal sebagai pembanding.</li>
          <li>Baca aturan resmi dan berikan konteks proyek kepada agen AI. Untuk audit, minta daftar temuan beserta bukti dan prioritas.</li>
          <li>Pilih perubahan yang membantu pengunjung. Pertahankan nama, identitas visual, dan materi yang masih diperlukan.</li>
          <li>Periksa hasil pada komputer dan ponsel, uji tautan serta keyboard, lalu catat apa yang sudah dan belum teruji.</li>
        </ol>
      </section>
      <section aria-labelledby="checklist">
        <h2 id="checklist" className="text-2xl font-bold">Lembar pemeriksaan mandiri</h2>
        <p className="mt-3 leading-7 text-slate-600">Pertanyaan berikut disusun AI Lab untuk latihan. Ini bukan skor atau sertifikasi resmi Anti-Slop.</p>
        <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
          {reviewQuestions.map(([title, question]) => <div key={title} className="grid gap-2 py-5 md:grid-cols-[14rem_1fr]"><dt className="font-bold">{title}</dt><dd className="leading-7 text-slate-700">{question}</dd></div>)}
        </dl>
      </section>
      <section aria-labelledby="contoh" className="rounded-xl bg-stone-100 p-6 sm:p-8">
        <h2 id="contoh" className="text-2xl font-bold">Contoh penerapan: beranda Hossibarani</h2>
        <p className="mt-4 leading-8 text-slate-700">Audit beranda menemukan navigasi berulang dan pembuka yang terlalu panjang. Perbaikan menghapus blok pilihan tujuan, meringkas pembuka, memisahkan riset dan publikasi, serta menyelaraskan label menu kedua bahasa.</p>
        <p className="mt-3 leading-8 text-slate-700">Build produksi, pergantian bahasa, tombol materi belajar, dan menu Journal telah diperiksa. Pengujian langsung pada ponsel belum dilakukan. Contoh ini menunjukkan perubahan yang dikerjakan, tanpa mengklaim kenaikan skor atau dampak pengguna yang belum diukur.</p>
        <Link href="/id" className="mt-4 inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4">Lihat beranda setelah perbaikan</Link>
      </section>
      <section aria-labelledby="sumber">
        <h2 id="sumber" className="text-2xl font-bold">Sumber dan batas penggunaan</h2>
        <p className="mt-4 leading-8 text-slate-700">Proyek asli: <a href="https://github.com/miqdadbadjuber/anti-slop" className="font-semibold underline underline-offset-4">miqdadbadjuber/anti-slop</a>, berlisensi <a href="https://github.com/miqdadbadjuber/anti-slop/blob/main/LICENSE" className="underline underline-offset-4">MIT</a>. AI Lab menyediakan panduan penerapan independen. Pemeriksaan desain dan bahasa tidak menggantikan verifikasi fakta, kutipan, atau ketepatan hukum.</p>
        <Link href="/lexnusa/lex-eval" className="mt-4 inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4">Pelajari evaluasi jawaban hukum melalui LEX-EVAL</Link>
      </section>
    </div>
  </main>;
}
