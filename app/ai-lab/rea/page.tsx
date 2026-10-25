import type { Metadata } from "next";
import Link from "next/link";

const title = "REA: Memahami Cara Kerja Aplikasi dengan Agen AI";
export const metadata: Metadata = {
  title,
  description: "Panduan REA di AI Lab: analisis aplikasi dengan agen AI, latihan berbasis bukti, dan penghubung ke Hukum Kejahatan Mayantara serta LexNusa.",
  alternates: { canonical: "/ai-lab/rea" },
};
const capabilities = [
  ["Website", "Mengamati struktur halaman, skrip, dan aktivitas jaringan.", "Browser keluarga Chrome; lingkup observasi mengikuti sesi yang diperiksa."],
  ["JavaScript dan Electron", "Menelusuri modul, impor, serta hubungan komponen aplikasi.", "Node.js dan npm; analisis statis dapat dilakukan tanpa mesin analisis native."],
  ["Program native", "Memeriksa pseudocode, assembly, string, dan referensi pemanggilan.", "Perangkat pendukung seperti Ghidra, Hopper, atau IDA; dukungan bergantung format dan platform."],
  ["Android APK", "Memeriksa manifest, kelas, dan metode yang didekompilasi.", "JADX dan JDK untuk alur analisis APK; tidak semua informasi kode asli dapat dipulihkan."],
];
const steps = [
  ["Tentukan pertanyaan", "Pilih satu fitur pada aplikasi contoh milik sendiri atau yang diizinkan. Contoh: bagaimana pencarian memfilter daftar dokumen?"],
  ["Catat bahan pemeriksaan", "Tuliskan nama aplikasi, versi, sumber berkas, waktu pemeriksaan, alat yang digunakan, dan batas izin. Gunakan data fiktif."],
  ["Minta penelusuran berbukti", "Minta agen menunjukkan lokasi kode atau observasi yang mendukung setiap temuan. Pisahkan perilaku yang diamati dari perilaku yang baru diduga."],
  ["Uji penjelasan", "Ulangi langkah dengan masukan berbeda. Bandingkan penjelasan agen dengan hasil aktual dan catat bagian yang belum terverifikasi."],
  ["Susun laporan", "Ringkas metode, bukti, interpretasi, alternatif penjelasan, keterbatasan, dan tindak lanjut. Jangan mengubah dugaan menjadi kepastian."],
];
const fields = [
  ["Objek dan lingkup", "Nama/versi aplikasi, fitur, sumber bahan, dan izin pemeriksaan."],
  ["Metode", "Alat, versi alat, langkah, masukan contoh, tanggal dan waktu."],
  ["Temuan teknis", "Apa yang terlihat; sertakan lokasi kode, log, atau tangkapan layar yang relevan."],
  ["Interpretasi", "Penjelasan sementara, alasan pendukung, dan alternatif penjelasan."],
  ["Verifikasi dan batas", "Langkah ulang, hasil pembanding, informasi yang belum tersedia."],
  ["Pertanyaan lanjutan", "Data tambahan yang diperlukan dan pertanyaan untuk penelaah teknis atau hukum."],
];
const button = "inline-flex min-h-11 items-center rounded-xl px-5 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700";

export default function ReaPage() {
  return <main lang="id" className="bg-white text-slate-900">
    <header className="bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <Link href="/ai-lab" className="inline-flex min-h-11 items-center font-semibold text-amber-300 underline underline-offset-4">Kembali ke AI &amp; Digital Systems Lab</Link>
        <p className="mt-7 text-xs font-bold uppercase tracking-widest text-amber-300">Analisis aplikasi · Pembelajaran berbasis bukti</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Pelajari bagaimana sebuah fitur bekerja, telusuri bukti teknisnya, dan jelaskan batas temuan sebelum menarik kesimpulan.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#praktikum" className={button + " bg-amber-400 text-slate-950 hover:bg-amber-300"}>Mulai latihan</a>
          <a href="https://github.com/morluto/rea" className={button + " border border-slate-500 hover:bg-slate-800"}>Buka repositori REA</a>
        </div>
      </div>
    </header>
    <div className="mx-auto max-w-6xl space-y-14 px-5 py-12 sm:px-8">
      <section aria-labelledby="tentang">
        <h2 id="tentang" className="text-2xl font-bold">Apa itu REA?</h2>
        <p className="mt-4 leading-8 text-slate-700">REA (Reverse Engineer Anything) menghubungkan agen AI dengan alat analisis aplikasi melalui Model Context Protocol (MCP). Agen dapat menelusuri komponen dan perilaku aplikasi, lalu menyusun penjelasan berdasarkan hasil pemeriksaan.</p>
        <p className="mt-3 leading-8 text-slate-700">Halaman ini merupakan panduan belajar dan penghubung ke sumber resmi. REA tidak dijalankan di dalam website ini. Pemasangan dan analisis dilakukan pada lingkungan komputer serta agen yang mendukungnya.</p>
      </section>
      <section aria-labelledby="kemampuan">
        <h2 id="kemampuan" className="text-2xl font-bold">Objek yang dapat dipelajari</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">{capabilities.map(([name, description, requirement]) => <article key={name} className="rounded-xl border border-slate-200 p-6">
          <h3 className="text-xl font-bold">{name}</h3><p className="mt-3 leading-7 text-slate-700">{description}</p><p className="mt-3 text-sm leading-7 text-slate-600">{requirement}</p>
        </article>)}</div>
        <p className="mt-4 text-sm leading-7 text-slate-600">Ringkasan berdasarkan dokumentasi REA. Periksa dokumentasi terbaru untuk dukungan platform dan versi. Pseudocode atau rekonstruksi tidak menjamin pemulihan kode sumber asli secara utuh.</p>
      </section>
      <section id="praktikum" className="scroll-mt-24" aria-labelledby="praktikum-title">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-800">Usulan latihan AI Lab</p>
        <h2 id="praktikum-title" className="mt-3 text-2xl font-bold">Menelusuri fitur pencarian pada aplikasi contoh</h2>
        <p className="mt-4 leading-8 text-slate-700">Gunakan aplikasi lokal berisi daftar dokumen fiktif. Bandingkan pencarian judul lengkap, kata sebagian, huruf kapital, dan kata yang tidak ditemukan. Tujuannya adalah menjelaskan mekanisme pencarian dengan bukti yang dapat diperiksa kembali.</p>
        <ol className="mt-6 divide-y divide-slate-200 border-y border-slate-200">{steps.map(([name, description], i) => <li key={name} className="grid gap-3 py-5 md:grid-cols-[14rem_1fr]"><h3 className="font-bold">{i + 1}. {name}</h3><p className="leading-8 text-slate-700">{description}</p></li>)}</ol>
        <h3 className="mt-7 text-lg font-bold">Contoh instruksi untuk agen yang sudah terhubung ke REA</h3>
        <blockquote className="mt-4 rounded-xl border-l-4 border-amber-500 bg-stone-100 p-6 leading-8">Periksa fitur pencarian pada aplikasi contoh lokal yang saya sediakan. Mulai dari analisis statis. Jelaskan alur masukan hingga hasil pencarian dan tunjukkan bukti untuk setiap temuan. Pisahkan hasil observasi, inferensi, dan hal yang belum diketahui. Jangan mengubah berkas. Jika perlu menjalankan aplikasi, jelaskan dahulu tindakan dan dampaknya. Susun langkah verifikasi menggunakan data fiktif.</blockquote>
      </section>
      <section id="lembar-analisis" className="scroll-mt-24" aria-labelledby="lembar-title">
        <h2 id="lembar-title" className="text-2xl font-bold">Format lembar analisis hasil</h2>
        <p className="mt-4 leading-8 text-slate-700">Salin enam bagian berikut ke laporan latihan. Lampirkan bukti secukupnya agar pembaca dapat menelusuri kesimpulan.</p>
        <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200">{fields.map(([label, detail]) => <div key={label} className="grid gap-3 py-5 md:grid-cols-[14rem_1fr]"><dt className="font-bold">{label}</dt><dd className="leading-8 text-slate-700">{detail}</dd></div>)}</dl>
      </section>
      <section id="kajian-hukum" className="scroll-mt-24 rounded-xl bg-stone-100 p-6 sm:p-8" aria-labelledby="hukum-title">
        <h2 id="hukum-title" className="text-2xl font-bold">Dari temuan teknis ke pertanyaan hukum</h2>
        <p className="mt-4 leading-8 text-slate-700">Dalam pembelajaran Hukum Kejahatan Mayantara dan LexNusa, gunakan laporan teknis sebagai bahan untuk merumuskan pertanyaan. Contohnya, deklarasi izin akses pada manifest APK belum membuktikan bahwa data benar-benar dikirim. Perilaku pengiriman memerlukan bukti tambahan; penilaian hukumnya memerlukan konteks dan sumber hukum yang diverifikasi secara terpisah.</p>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-8 text-slate-700">
          <li><strong>Temuan:</strong> bagian kode atau perilaku apa yang benar-benar teramati?</li>
          <li><strong>Interpretasi:</strong> apakah ada penjelasan lain atau bukti yang belum diperoleh?</li>
          <li><strong>Pertanyaan hukum:</strong> fakta dan bahan hukum apa yang perlu ditelaah sebelum mengambil kesimpulan?</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3"><Link href="/lexnusa/mayantara" className={button + " bg-slate-950 text-white hover:bg-slate-800"}>Kelas Hukum Kejahatan Mayantara</Link><Link href="/lexnusa" className={button + " border border-slate-400 hover:bg-white"}>LexNusa Legal AI</Link></div>
      </section>
      <section aria-labelledby="persiapan">
        <h2 id="persiapan" className="text-2xl font-bold">Persiapan penggunaan</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 leading-8 text-slate-700">
          <li>Siapkan komputer, Node.js/npm yang sesuai dokumentasi, dan agen AI yang mendukung MCP lokal.</li>
          <li>Baca panduan resmi, lalu jalankan perintah penyiapan di terminal lingkungan yang dipilih.</li>
          <li>Tinjau perubahan konfigurasi yang ditawarkan, pilih agen, dan mulai ulang agen setelah penyiapan.</li>
          <li>Siapkan perangkat analisis tambahan hanya sesuai jenis aplikasi yang akan diperiksa.</li>
        </ol>
        <pre className="mt-5 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm text-amber-200"><code>npx rea-agents setup</code></pre>
        <p className="mt-4 leading-8 text-slate-700">Analisis target berlangsung lokal, tetapi hasil alat diteruskan ke agen dan tunduk pada kebijakan penyedia model. Untuk latihan, gunakan aplikasi yang diizinkan dan data fiktif. Analisis runtime dapat menjalankan atau berinteraksi dengan aplikasi; periksa dampaknya sebelum melanjutkan.</p>
      </section>
      <section aria-labelledby="sumber">
        <h2 id="sumber" className="text-2xl font-bold">Sumber resmi dan materi terkait</h2>
        <p className="mt-4 leading-8 text-slate-700">Panduan independen AI Lab, berdasarkan dokumentasi REA yang ditelaah pada 26 Oktober 2026. Skenario dan format laporan disusun untuk pembelajaran; bukan laporan pengujian REA pada sistem Bapak.</p>
        <ul className="mt-4 space-y-3">
          <li><a className="inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4" href="https://github.com/morluto/rea">Repositori resmi morluto/rea</a></li>
          <li><a className="inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4" href="https://rea.tools">Website dan dokumentasi REA</a></li>
          <li><Link className="inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4" href="/ai-lab/engineering-skills">AI Engineering Skills: perancangan, pengujian, dan perbaikan</Link></li>
          <li><Link className="inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4" href="/lexnusa/mayantara/praktikum-osint">Praktikum OSINT: latihan penelusuran informasi publik</Link></li>
        </ul>
      </section>
    </div>
  </main>;
}
