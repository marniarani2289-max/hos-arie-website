import type { Metadata } from "next";
import Link from "next/link";

const title = "Paper Review AI: Membaca, Membandingkan, dan Memetakan Literatur";
export const metadata: Metadata = {
  title,
  description: "Panduan Paper Review AI di AI Lab: membaca artikel, menyusun matriks literatur, menelusuri bukti, serta menyiapkan bahan penulisan untuk RAHRN dan riset hukum Lex Nusa.",
  alternates: { canonical: "/ai-lab/paper-review" },
};
const button = "inline-flex min-h-11 items-center rounded-xl px-5 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700";
const modes = [
  ["Search", "Menelusuri artikel daring sesuai topik, rentang tahun, dan kriteria yang ditentukan. Catat apakah yang tersedia hanya metadata, abstrak, atau teks lengkap."],
  ["Folder", "Menelaah koleksi PDF atau LaTeX yang sudah dimiliki. Periksa hasil ekstraksi, terutama tabel, catatan kaki, dan dokumen hasil pemindaian."],
  ["Hybrid", "Menggabungkan koleksi lokal dengan penelusuran daring. Hapus duplikasi berdasarkan DOI atau judul yang dinormalisasi, kemudian pilih sumber paling lengkap."],
];
const stages = [
  ["Tentukan cakupan", "Tetapkan pertanyaan, jumlah atau batas korpus, bahasa, kolom matriks, filter, dan format keluaran."],
  ["Kumpulkan sumber", "Cari atau buka artikel, hapus duplikasi, dan verifikasi identitas publikasinya."],
  ["Baca dan ekstrak", "Isi setiap kolom berdasarkan bagian sumber yang tersedia. Bedakan pernyataan penulis dari interpretasi penelaah."],
  ["Susun matriks", "Gunakan satu baris per artikel. Dokumentasi sumber memakai papers.json sebagai data induk untuk tabel dan ekspor."],
  ["Validasi", "Periksa DOI, cakupan klaim, penanda sumber, kelengkapan kolom, dan kesesuaian antarformat sebelum digunakan."],
];
const columns = [
  ["Judul & penulis", "Identitas karya dan nama penulis sesuai sumber."],
  ["Jurnal", "Nama jurnal atau media publikasi."],
  ["Tahun", "Tahun publikasi yang terverifikasi."],
  ["Tujuan", "Masalah atau tujuan yang dinyatakan penulis."],
  ["Metode", "Pendekatan, variabel, atau sampel bila relevan dan tersedia."],
  ["Temuan utama", "Hasil yang benar-benar didukung teks yang dibaca."],
  ["Keterbatasan", "Batas penelitian; tandai jika merupakan penilaian penelaah."],
  ["Kesenjangan", "Hal yang belum terjawab, dengan dasar penilaiannya."],
  ["Teori", "Teori atau kerangka konseptual yang digunakan."],
  ["Kebaruan / kontribusi", "Kontribusi yang diklaim penulis dan bukti pendukungnya."],
  ["Penelitian lanjutan", "Saran yang dinyatakan dalam sumber; jangan dibuat-buat."],
  ["DOI & penerbit", "Identitas pengenal, penerbit, dan status verifikasinya."],
];
const prompts = [
  ["Koleksi artikel milik sendiri", "Gunakan Paper Review dalam mode Folder untuk artikel yang saya sediakan. Buat tabel lengkap dengan satu baris per artikel dan 12 kolom standar. Sertakan penanda lokasi sumber pada setiap ekstraksi faktual. Bedakan informasi dari abstrak dan teks lengkap. Gunakan tanda — untuk informasi yang tidak tersedia dan UNVERIFIED untuk sumber yang belum dapat diverifikasi. Jangan mengarang metode, temuan, DOI, atau kontribusi."],
  ["Penelusuran dan koleksi gabungan", "Gunakan mode Hybrid untuk topik [topik], periode [tahun], dan koleksi artikel yang saya sediakan. Tentukan kriteria dan kolom terlebih dahulu. Catat tanggal, sumber pencarian, kata kunci, dan alasan pemilihan. Hapus duplikasi. Buat matriks per artikel dengan jejak sumber serta daftar keterbatasan akses. Ekspor hanya setelah isi dan metadata diperiksa."],
  ["Penerapan riset hukum", "Telaah artikel tentang [topik hukum] pada [yurisdiksi dan periode]. Tambahkan kolom yurisdiksi, pendekatan penelitian hukum, bahan hukum primer, putusan yang dibahas, posisi doktrinal, argumen tandingan, dan relevansi terhadap pertanyaan penelitian. Pisahkan kutipan penulis tentang putusan dari hasil pemeriksaan putusan asli. Tandai sumber primer yang belum dibaca. Jangan menganggap pendapat akademik sebagai kaidah yang sudah diterima pengadilan."],
];

export default function PaperReviewPage() {
  return <main lang="id" className="bg-white text-slate-900">
    <header className="border-b-4 border-amber-400 bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <Link href="/ai-lab" className="inline-flex min-h-11 items-center text-sm font-semibold text-amber-300 underline underline-offset-4">Kembali ke AI &amp; Digital System Lab</Link>
        <p className="mt-7 text-xs font-bold uppercase tracking-widest text-amber-300">Panduan belajar · Telaah literatur</p>
        <h1 className="mt-4 max-w-5xl font-academic text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Baca setiap artikel dengan pertanyaan yang jelas. Bandingkan temuan, teori, dan keterbatasannya dalam matriks yang dapat ditelusuri sebelum mengembangkan argumen ilmiah.</p>
        <nav aria-label="Jalur belajar Paper Review AI" className="mt-8 flex flex-wrap gap-3">
          <a href="#matriks" className={button + " bg-amber-400 text-slate-950 hover:bg-amber-300"}>Pelajari matriks literatur</a>
          <a href="#pendampingan-penulis" className={button + " border border-slate-500 hover:bg-slate-800"}>Untuk penulis RAHRN</a>
          <a href="#riset-hukum" className={button + " border border-slate-500 hover:bg-slate-800"}>Untuk riset hukum</a>
        </nav>
      </div>
    </header>
    <div className="mx-auto max-w-6xl space-y-16 px-5 py-12 sm:px-8 sm:py-16">
      <section aria-labelledby="tentang">
        <h2 id="tentang" className="text-2xl font-bold">Dari kumpulan artikel menjadi bahan analisis</h2>
        <p className="mt-4 max-w-4xl leading-8 text-slate-700">Paper Review Skill dari bimajanuri menyediakan alur bagi agen AI untuk mencari, membaca, dan mengekstraksi artikel menjadi matriks literatur. Keluaran utamanya adalah tabel lengkap per artikel, disertai jejak sumber.</p>
        <p className="mt-3 max-w-4xl leading-8 text-slate-700">Paper review di sini berarti telaah literatur, bukan keputusan editorial atau pengganti mitra bestari. Halaman ini adalah panduan belajar; tidak mengunggah dokumen, memasang skill, atau menjalankan pencarian otomatis.</p>
        <a href="https://github.com/bimajanuri/paper-review-skill" className={button + " mt-5 bg-slate-950 text-white hover:bg-amber-800"}>Buka repositori dan petunjuk penggunaan ↗</a>
      </section>
      <section aria-labelledby="mode">
        <h2 id="mode" className="text-2xl font-bold">Tiga cara memulai</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">{modes.map(([name, text]) => <article key={name} className="rounded-xl border border-slate-200 p-6"><h3 className="text-xl font-bold">{name}</h3><p className="mt-3 leading-7 text-slate-700">{text}</p></article>)}</div>
      </section>
      <section aria-labelledby="alur">
        <h2 id="alur" className="text-2xl font-bold">Alur membaca dan memeriksa</h2>
        <ol className="mt-6 divide-y divide-slate-200 border-y border-slate-200">{stages.map(([name, text], index) => <li key={name} className="grid gap-3 py-5 md:grid-cols-[14rem_1fr]"><h3 className="font-bold"><span className="mr-3 text-amber-800">0{index + 1}</span>{name}</h3><p className="leading-7 text-slate-700">{text}</p></li>)}</ol>
      </section>
      <section id="matriks" aria-labelledby="matriks-title" className="scroll-mt-28">
        <h2 id="matriks-title" className="text-2xl font-bold">Dua belas kolom untuk membandingkan artikel</h2>
        <p className="mt-4 leading-8 text-slate-700">Gunakan satu baris per artikel dan tambahkan kolom sesuai pertanyaan penelitian. Daftar berikut menjelaskan kolom bawaan; isinya diisi setelah sumber dibaca.</p>
        <dl className="mt-6 grid gap-x-8 md:grid-cols-2">{columns.map(([name, text], index) => <div key={name} className="border-b border-slate-200 py-5"><dt className="font-bold"><span className="mr-2 text-amber-800">{index + 1}.</span>{name}</dt><dd className="mt-2 leading-7 text-slate-700">{text}</dd></div>)}</dl>
        <div className="mt-6 rounded-xl bg-amber-50 p-6"><h3 className="font-bold">Jejak sumber adalah bagian dari matriks</h3><p className="mt-3 leading-8 text-slate-700">Dokumentasi menggunakan penanda seperti [AB], [M-2], dan [R-1]. Pertahankan hubungan penanda dengan bagian teks yang dirujuk. Informasi yang tidak tersedia diberi —; sumber yang belum terverifikasi ditandai UNVERIFIED. Jangan menyimpulkan rincian metode atau hasil yang tidak terdapat dalam abstrak yang tersedia.</p></div>
      </section>
      <section id="pendampingan-penulis" aria-labelledby="penulis-title" className="scroll-mt-28 rounded-2xl bg-stone-100 p-6 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-800">Journal / RAHRN</p>
        <h2 id="penulis-title" className="mt-3 text-3xl font-bold">Bahan awal untuk pendampingan penulis</h2>
        <p className="mt-4 leading-8 text-slate-700">Bawa matriks literatur ke diskusi penulisan. Penulis dan pendamping dapat memeriksa apakah pertanyaan penelitian, pilihan metode, dan kontribusi telah memiliki dasar yang memadai.</p>
        <ul className="mt-5 list-disc space-y-3 pl-6 leading-8 text-slate-700">
          <li>Kelompokkan persamaan, perbedaan, dan pertentangan temuan tanpa menghilangkan konteks setiap penelitian.</li>
          <li>Pisahkan kesenjangan yang dinyatakan penulis sumber dari kesenjangan yang Anda rumuskan sendiri.</li>
          <li>Catat sumber yang perlu dibaca lengkap sebelum merumuskan kebaruan atau menyusun tinjauan pustaka.</li>
          <li>Lanjutkan ke Academic Writing AI untuk menyusun peta argumen, kerangka naskah, dan persiapan publikasi.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3"><Link href="/journals" className={button + " bg-slate-950 text-white hover:bg-slate-800"}>Jelajahi Journal / RAHRN</Link><Link href="/ai-lab/academic-writing#pendampingan-penulis" className={button + " border border-slate-400 hover:bg-white"}>Lanjutkan pendampingan penulisan</Link></div>
        <p className="mt-4 text-sm leading-7 text-slate-600">Penggunaan alat ini tidak menjamin penerimaan naskah. Pedoman dan keputusan editorial mengikuti jurnal tujuan.</p>
      </section>
      <section id="riset-hukum" aria-labelledby="hukum-title" className="scroll-mt-28 rounded-2xl border border-teal-200 bg-teal-50 p-6 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-800">Lex Nusa · Adaptasi pembelajaran AI Lab</p>
        <h2 id="hukum-title" className="mt-3 text-3xl font-bold">Peta literatur untuk riset hukum</h2>
        <p className="mt-4 leading-8 text-slate-700">Tambahkan kolom yurisdiksi, pendekatan penelitian hukum, bahan hukum primer, putusan yang dibahas, posisi doktrinal, dan argumen tandingan. Simpan rujukan halaman atau paragraf agar perbandingan dapat diperiksa.</p>
        <div className="mt-6 rounded-xl bg-white p-6"><h3 className="text-lg font-bold">Latihan: perdebatan vicarious liability</h3><p className="mt-3 leading-8 text-slate-700">Pilih lima artikel yang sudah dimiliki. Bandingkan cara masing-masing membahas dasar dan justifikasi pertanggungjawaban, hubungan para pihak, serta kaitan perbuatan dengan pekerjaan. Tandai setiap perbedaan yurisdiksi dan sumber putusan yang belum diperiksa langsung.</p><p className="mt-3 leading-8 text-slate-700"><strong>Keluaran:</strong> lima baris matriks, peta persamaan dan perbedaan argumen, serta daftar bahan hukum primer yang perlu diverifikasi. Ini rancangan latihan, bukan hasil telaah atas lima artikel tertentu.</p></div>
        <p className="mt-5 leading-8 text-slate-700">Ringkasan artikel tidak menggantikan pembacaan peraturan dan putusan asli. Bedakan pendapat akademik, dalil pihak, pertimbangan hakim, dan amar sebelum menggunakannya dalam analisis hukum.</p>
        <div className="mt-6 flex flex-wrap gap-3"><Link href="/lexnusa" className={button + " bg-teal-900 text-white hover:bg-teal-800"}>Jelajahi Lex Nusa Legal AI</Link><Link href="/ai-lab/academic-writing#riset-hukum" className={button + " border border-teal-700 hover:bg-white"}>Kembangkan argumentasi hukum</Link></div>
      </section>
      <section aria-labelledby="instruksi">
        <h2 id="instruksi" className="text-2xl font-bold">Contoh instruksi yang dapat disesuaikan</h2>
        <p className="mt-4 leading-8 text-slate-700">Buka contoh, salin teksnya ke agen yang digunakan, lalu ganti bagian dalam kurung siku sesuai penelitian Anda.</p>
        <div className="mt-6 space-y-4">{prompts.map(([name, text]) => <details key={name} className="rounded-xl border border-slate-200 p-5"><summary className="cursor-pointer font-bold">{name}</summary><p className="mt-4 whitespace-pre-wrap leading-8 text-slate-700">{text}</p></details>)}</div>
      </section>
      <section aria-labelledby="ekspor">
        <h2 id="ekspor" className="text-2xl font-bold">Gunakan kembali hasil yang sudah diperiksa</h2>
        <p className="mt-4 leading-8 text-slate-700">Dokumentasi repositori menyediakan Markdown, CSV, XLSX, BibTeX, EndNote XML, dan RIS dari data induk yang sama. Tabel dapat digunakan untuk analisis, sedangkan format bibliografi membantu pemindahan referensi ke pengelola pustaka.</p>
        <p className="mt-3 leading-8 text-slate-700">Ekspor dilakukan di lingkungan yang menjalankan skill dengan dependensi yang diperlukan. AI Lab belum menguji proses ekspor repositori ini. Periksa kembali jumlah artikel, metadata, dan jejak sumber setelah konversi.</p>
      </section>
      <section aria-labelledby="lanjut" className="rounded-2xl bg-slate-950 p-6 text-white sm:p-9">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-300">Dua panduan yang saling melengkapi</p>
        <h2 id="lanjut" className="mt-3 text-3xl font-bold">Dari matriks literatur menuju naskah ilmiah</h2>
        <p className="mt-4 max-w-3xl leading-8 text-slate-300">Paper Review AI membantu membaca dan membandingkan sumber. Academic Writing AI melanjutkannya menjadi pertanyaan penelitian, argumentasi, kerangka, dan naskah yang ditinjau penulis.</p>
        <Link href="/ai-lab/academic-writing" className={button + " mt-6 bg-amber-400 text-slate-950 hover:bg-amber-300"}>Lanjutkan ke Academic Writing AI →</Link>
      </section>
      <footer className="border-t border-slate-200 pt-8 text-sm leading-7 text-slate-600">
        <p>Sumber: <a href="https://github.com/bimajanuri/paper-review-skill" className="font-semibold underline underline-offset-4">bimajanuri/paper-review-skill</a>, ditinjau 25 Oktober 2026. Alur dan format merujuk dokumentasi repositori; latihan RAHRN dan riset hukum merupakan adaptasi pembelajaran AI Lab. Hasil tetap memerlukan pemeriksaan manusia.</p>
        <Link href="/ai-lab" className="mt-4 inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4">Kembali ke koleksi pembelajaran AI Lab</Link>
      </footer>
    </div>
  </main>;
}
