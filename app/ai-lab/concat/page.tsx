import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Concat | Penyuntingan Video Pembelajaran dengan AI",
  description: "Panduan Concat untuk mengolah slide, narasi, dan subtitle menjadi video pembelajaran. Pilih aplikasi lokal atau Hukumpreneur Studio di browser.",
  alternates: { canonical: "/ai-lab/concat" },
};
const button = "inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600";
const steps = [
  ["Siapkan bahan", "Ekspor slide menjadi gambar, siapkan rekaman narasi, dan tentukan urutan pembahasan. Gunakan materi yang Anda miliki atau berizin."],
  ["Pasang dan buka Concat", "Pilih installer yang sesuai dari GitHub Releases, pasang di perangkat, lalu buka aplikasinya. Periksa persyaratan versi dan perangkat pada dokumentasi resmi."],
  ["Susun gambar dan suara", "Buat proyek, impor bahan, letakkan narasi dan gambar pada trek, lalu sesuaikan pergantian slide dengan pembahasan. Sinkronisasi perlu diperiksa secara manual."],
  ["Buat dan koreksi subtitle", "Unduh model caption melalui pengaturan aplikasi bila diperlukan. Jalankan transkripsi, lalu periksa nama, istilah hukum, nomor pasal, ejaan, dan waktu tampil."],
  ["Ekspor dan tinjau", "Uji dahulu cuplikan singkat. Periksa keterbacaan subtitle, suara, dan transisi sebelum mengekspor video lengkap dan mengunggahnya ke kelas atau YouTube."],
];

export default function ConcatPage() {
  return <main lang="id" className="bg-white text-slate-950">
    <header className="bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <Link href="/ai-lab" className="inline-flex min-h-11 items-center text-sm font-semibold text-amber-300 underline underline-offset-4">Kembali ke AI &amp; Digital Systems Lab</Link>
        <p className="mt-7 text-xs font-bold uppercase tracking-widest text-amber-300">Studio pembelajaran · Aplikasi lokal</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">Concat: Penyuntingan Video Pembelajaran dengan AI</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Susun slide, narasi, dan subtitle menjadi materi yang mudah diikuti. Mulai dari satu cuplikan, periksa hasilnya, lalu kembangkan menjadi video kuliah.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="https://github.com/jub0t/Concat/releases" className={button + " bg-amber-400 text-slate-950 hover:bg-amber-300"}>Unduh aplikasi Concat</a>
          <a href="#mulai" className={button + " border border-slate-500 hover:bg-slate-800"}>Cara menjalankan editor</a>
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-300">Status Lab: panduan tersedia; aplikasi Concat dan koneksi MCP belum diuji atau diaktifkan oleh Lab. Proyek Concat masih beta.</p>
      </div>
    </header>
    <div className="mx-auto max-w-6xl space-y-14 px-5 py-12 sm:px-8 sm:py-16">
      <section id="mulai" aria-labelledby="mulai-title">
        <h2 id="mulai-title" className="text-2xl font-bold">Di mana editor dijalankan?</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 p-6">
            <p className="text-sm font-semibold text-amber-800">Pilihan 1 · Concat</p>
            <h3 className="mt-3 text-xl font-bold">Pasang di perangkat Anda</h3>
            <p className="mt-4 leading-8 text-slate-700">Concat adalah aplikasi native. Unduh versi yang sesuai, pasang, lalu buka dari menu aplikasi perangkat. Dokumentasi mencantumkan Windows, macOS, Linux, dan Android. Fitur dan kompatibilitas dapat berbeda antarversi.</p>
            <p className="mt-3 leading-8 text-slate-700">Tautan website ini tidak memasang atau membuka Concat secara otomatis. Editor Concat tidak tertanam di halaman ini.</p>
            <a href="https://github.com/jub0t/Concat/releases" className={button + " mt-5 bg-slate-950 text-white hover:bg-slate-800"}>Pilih installer resmi</a>
          </article>
          <article className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="text-sm font-semibold text-amber-800">Pilihan 2 · Editor website</p>
            <h3 className="mt-3 text-xl font-bold">Buka Hukumpreneur Studio</h3>
            <p className="mt-4 leading-8 text-slate-700">Gunakan editor browser yang sudah tersedia di ekosistem Hossibarani untuk mengolah klip video lokal. Hukumpreneur Studio merupakan aplikasi terpisah, bukan versi web Concat.</p>
            <p className="mt-3 leading-8 text-slate-700">Dukungan ekspor mengikuti kemampuan browser. Unduh hasil sebelum menutup halaman dan periksa kembali video yang dihasilkan.</p>
            <a href="/clip-studio/" className={button + " mt-5 bg-slate-950 text-white hover:bg-slate-800"}>Buka editor browser</a>
          </article>
        </div>
      </section>
      <section aria-labelledby="fitur">
        <h2 id="fitur" className="text-2xl font-bold">Fitur yang dapat dieksplorasi</h2>
        <p className="mt-4 leading-8 text-slate-700">Dokumentasi Concat mencantumkan penyuntingan beberapa trek, subtitle otomatis berbasis Whisper, text-to-speech, pembersihan suara, animasi keyframe, efek, dan ekspor hingga 4K. Model AI perlu diunduh sebelum digunakan secara offline. Kemampuan ini berasal dari dokumentasi pengembang, belum merupakan hasil pengujian Lab.</p>
      </section>
      <section aria-labelledby="praktikum">
        <h2 id="praktikum" className="text-2xl font-bold">Praktikum: dari slide dan narasi ke video</h2>
        <ol className="mt-6 space-y-5">
          {steps.map(([title, body], index) => <li key={title} className="rounded-xl bg-stone-100 p-6"><h3 className="text-lg font-bold">{index + 1}. {title}</h3><p className="mt-2 leading-8 text-slate-700">{body}</p></li>)}
        </ol>
        <p className="mt-5 leading-8 text-slate-700">Latihan awal: buat cuplikan 60–90 detik dari tiga slide dan satu narasi. Catat versi aplikasi, perangkat, waktu ekspor, kesalahan subtitle, dan perbaikan yang dilakukan.</p>
      </section>
      <section aria-labelledby="otomasi" className="rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
        <h2 id="otomasi" className="text-2xl font-bold">Bisakah agen AI mengoperasikan Concat?</h2>
        <p className="mt-4 leading-8 text-slate-300">Ya, dokumentasi menyediakan MCP melalui perintah <code className="text-amber-300">concat --mcp</code>. Klien MCP yang kompatibel menjalankan binary Concat pada komputer yang memiliki aplikasi dan bahan video. Agen dapat membuat proyek, mengimpor media, menyunting, serta mengekspor.</p>
        <p className="mt-4 leading-8 text-slate-300">Integrasi halaman ini belum menghubungkan website atau ChatGPT ke perangkat Anda. Layanan penyuntingan dari website memerlukan pengembangan tambahan: mesin pemroses yang menjalankan Concat, akses pengguna, penyimpanan media, dan antrean ekspor.</p>
        <a href="https://github.com/jub0t/Concat/blob/main/docs/MCP.md" className={button + " mt-5 bg-amber-400 text-slate-950 hover:bg-amber-300"}>Baca dokumentasi MCP</a>
      </section>
      <section aria-labelledby="sumber">
        <h2 id="sumber" className="text-2xl font-bold">Sumber dan ruang praktik</h2>
        <p className="mt-4 leading-8 text-slate-700">Panduan independen AI Lab berdasarkan dokumentasi jub0t/Concat, ditinjau 31 Oktober 2026. Periksa informasi terbaru sebelum memasang.</p>
        <div className="mt-5 flex flex-wrap gap-4">
          <a href="https://github.com/jub0t/Concat" className={button + " border border-slate-300"}>Repositori resmi</a>
          <Link href="/blue-education" className={button + " border border-slate-300"}>Blue Education</Link>
          <Link href="/hukumpreneur" className={button + " border border-slate-300"}>Hukumpreneur</Link>
        </div>
      </section>
    </div>
  </main>;
}
