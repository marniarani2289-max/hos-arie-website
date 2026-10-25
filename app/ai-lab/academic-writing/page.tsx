import type { Metadata } from "next";
import Link from "next/link";

const title = "Academic Writing AI: Literatur, Argumentasi, dan Publikasi Ilmiah";
export const metadata: Metadata = {
  title,
  description: "Panduan penulisan akademik berbantuan AI: matriks literatur, argumentasi berbasis sumber, pendampingan penulis RAHRN, dan penerapan riset hukum bersama Lex Nusa.",
  alternates: { canonical: "/ai-lab/academic-writing" },
};
const button = "inline-flex min-h-11 items-center rounded-xl px-5 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700";
const stages = [
  ["Eksplorasi", "Tentukan pertanyaan dan metode tinjauan; kumpulkan sumber, periksa identitas publikasi, dan susun matriks literatur.", "Matriks sumber dan catatan penelusuran."],
  ["Perencanaan", "Petakan perdebatan, kesenjangan penelitian, serta kontribusi yang dapat dibuktikan. Susun kerangka sesuai jurnal tujuan.", "Pertanyaan penelitian, peta argumen, dan kerangka naskah."],
  ["Penulisan", "Bangun paragraf dari klaim, bukti, analisis, dan kaitannya dengan pertanyaan penelitian.", "Draf bertahap dengan penanda sumber."],
  ["Sitasi", "Cocokkan kutipan dengan sumber asli dan daftar pustaka. Tandai metadata yang belum terverifikasi.", "Daftar referensi dan peta klaim–sumber."],
  ["Revisi", "Perjelas bahasa dan hubungan antarargumen tanpa mengubah angka, kutipan, istilah, atau tingkat kepastian.", "Naskah revisi beserta alasan perubahan."],
  ["Validasi", "Periksa kesesuaian metode, kecukupan bukti, keterbatasan, dan klaim kebaruan bersama penulis.", "Daftar temuan yang sudah dan belum diselesaikan."],
  ["Persiapan publikasi", "Sesuaikan format, panduan penulis, dan dokumen pengiriman; siapkan jawaban reviewer bila diperlukan.", "Naskah dan dokumen pendukung yang ditinjau penulis."],
];
const modes = [
  ["Systematic review", "Menjawab pertanyaan terfokus melalui pencarian, seleksi, dan sintesis yang transparan."],
  ["Scoping review", "Memetakan cakupan, karakteristik, dan kesenjangan literatur."],
  ["Narrative review", "Menata perkembangan gagasan dan perdebatan akademik."],
  ["Integrative review", "Mengintegrasikan temuan dari beragam pendekatan penelitian."],
  ["Critical review", "Menelaah asumsi, konsep, metode, dan kekuatan argumen."],
  ["Meta-ethnography", "Menyintesis interpretasi penelitian kualitatif melalui penerjemahan konsep."],
];
const authorPrompt = "Bantu saya menelaah bahan penelitian berikut untuk menyiapkan artikel. Mulai dari pertanyaan penelitian dan pilihan metode yang sesuai. Buat matriks sumber, peta perdebatan, dan usulan kontribusi berdasarkan bahan yang tersedia. Pisahkan bukti dari interpretasi. Jangan membuat referensi, DOI, data, atau temuan. Tandai sumber yang belum terverifikasi dan informasi yang masih diperlukan. Jangan menulis naskah lengkap sebelum kerangka dan bukti ditinjau.";
const legalPrompt = "Bantu saya memetakan literatur dan putusan untuk riset hukum tentang [topik], pada yurisdiksi [negara] dan periode [tahun]. Pisahkan peraturan, putusan, dan pendapat akademik. Untuk setiap putusan, catat nomor, pengadilan, tanggal, fakta relevan, isu, pertimbangan, amar, halaman atau paragraf rujukan, dan tautan sumber asli. Jangan menyimpulkan kaidah hanya dari abstrak atau ringkasan. Tandai status hukum dan kutipan yang belum terverifikasi. Susun perbandingan argumen tanpa menganggap hukum antarnegara sama.";

export default function AcademicWritingPage() {
  return <main lang="id" className="bg-white text-slate-900">
    <header className="border-b-4 border-amber-400 bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <Link href="/ai-lab" className="inline-flex min-h-11 items-center text-sm font-semibold text-amber-300 underline underline-offset-4">Kembali ke AI &amp; Digital System Lab</Link>
        <p className="mt-7 text-xs font-bold uppercase tracking-widest text-amber-300">Panduan belajar · Penulisan akademik</p>
        <h1 className="mt-4 max-w-5xl font-academic text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Dari membaca sumber hingga menyusun kontribusi ilmiah. Gunakan AI untuk menata literatur dan menguji argumen, dengan keputusan akademik tetap berada pada penulis.</p>
        <nav aria-label="Jalur belajar Academic Writing AI" className="mt-8 flex flex-wrap gap-3">
          <a href="#alur" className={button + " bg-amber-400 text-slate-950 hover:bg-amber-300"}>Pelajari alur kerja</a>
          <a href="#pendampingan-penulis" className={button + " border border-slate-500 hover:bg-slate-800"}>Pendampingan penulis RAHRN</a>
          <a href="#riset-hukum" className={button + " border border-slate-500 hover:bg-slate-800"}>Riset hukum bersama Lex Nusa</a>
        </nav>
      </div>
    </header>
    <div className="mx-auto max-w-6xl space-y-16 px-5 py-12 sm:px-8 sm:py-16">
      <section aria-labelledby="tentang">
        <h2 id="tentang" className="text-2xl font-bold">Mengenal Academic Writing Skill</h2>
        <p className="mt-4 max-w-4xl leading-8 text-slate-700">Repositori bimajanuri/academic-writing-skill menyediakan instruksi, templat, dan checklist untuk membantu agen AI melakukan sintesis literatur dan penulisan akademik. Halaman ini menyajikan panduan penerapan independen untuk pembelajaran di AI Lab.</p>
        <p className="mt-3 max-w-4xl leading-8 text-slate-700">Membuka halaman ini tidak memasang skill atau menjalankan pencarian otomatis. Gunakan paket lengkap pada lingkungan agen yang mendukungnya sesuai dokumentasi sumber. Versi asli mengarahkan naskah akhir ke bahasa Inggris Amerika; kebutuhan bahasa Indonesia harus dinyatakan dan disesuaikan.</p>
        <a href="https://github.com/bimajanuri/academic-writing-skill" className={button + " mt-5 bg-slate-950 text-white hover:bg-amber-800"}>Buka repositori dan petunjuk penggunaan ↗</a>
      </section>
      <section aria-label="Siapkan literatur dengan Paper Review AI" lang="id" className="border-b border-slate-200 bg-stone-50 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-800">AI Lab · Telaah literatur</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950">Siapkan literatur dengan Paper Review AI</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-700">Sebelum menyusun argumen, baca dan bandingkan artikel dalam matriks yang memiliki jejak sumber. Gunakan panduan pendamping untuk menata teori, temuan, keterbatasan, dan kontribusi.</p>
          <Link href="/ai-lab/paper-review" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Buka Paper Review AI →</Link>
        </div>
      </section>

      <section id="alur" aria-labelledby="alur-title" className="scroll-mt-28">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-800">Literatur → Argumentasi → Publikasi</p>
        <h2 id="alur-title" className="mt-3 text-2xl font-bold">Tujuh tahap dengan tinjauan manusia</h2>
        <ol className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
          {stages.map(([name, text, output], index) => <li key={name} className="grid gap-4 py-6 md:grid-cols-[13rem_1fr]"><h3 className="text-lg font-bold"><span className="mr-3 text-amber-800">0{index + 1}</span>{name}</h3><div><p className="leading-7 text-slate-700">{text}</p><p className="mt-2 text-sm font-semibold leading-7">Keluaran: {output}</p></div></li>)}
        </ol>
      </section>
      <section aria-labelledby="metode">
        <h2 id="metode" className="text-2xl font-bold">Pilih metode sesuai pertanyaan penelitian</h2>
        <p className="mt-4 leading-8 text-slate-700">Enam mode berikut tersedia dalam dokumentasi sumber. Pilihan metode menentukan strategi pencarian, kriteria pemilihan, ekstraksi, dan cara sintesis.</p>
        <dl className="mt-6 grid gap-4 md:grid-cols-2">{modes.map(([name, text]) => <div key={name} className="rounded-xl border border-slate-200 p-6"><dt className="text-lg font-bold">{name}</dt><dd className="mt-3 leading-7 text-slate-700">{text}</dd></div>)}</dl>
        <p className="mt-4 text-sm leading-7 text-slate-600">Penelitian hukum doktrinal memerlukan rancangan metode tersendiri. Checklist tinjauan literatur tidak menggantikan analisis bahan hukum primer.</p>
      </section>
      <section id="pendampingan-penulis" aria-labelledby="penulis-title" className="scroll-mt-28 rounded-2xl bg-stone-100 p-6 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-800">Journal / RAHRN</p>
        <h2 id="penulis-title" className="mt-3 text-3xl font-bold">Pendampingan penulis: siapkan naskah yang dapat ditelaah</h2>
        <p className="mt-4 leading-8 text-slate-700">Gunakan panduan ini untuk belajar mandiri atau sebagai bahan diskusi pendampingan. Mulai dengan topik, jurnal tujuan, sumber yang sudah dibaca, dan bagian naskah yang perlu diperbaiki.</p>
        <ol className="mt-5 list-decimal space-y-3 pl-6 leading-8 text-slate-700">
          <li><strong>Petakan literatur:</strong> catat tujuan, metode, temuan, keterbatasan, dan relevansi setiap sumber.</li>
          <li><strong>Uji kontribusi:</strong> jelaskan perbedaan penelitian dengan karya terdahulu menggunakan bukti yang dapat ditelusuri.</li>
          <li><strong>Perkuat argumen:</strong> periksa apakah setiap klaim utama didukung sumber dan analisis penulis.</li>
          <li><strong>Siapkan pengiriman:</strong> cocokkan ruang lingkup, format, etika publikasi, serta kebijakan penggunaan AI pada jurnal tujuan.</li>
          <li><strong>Tanggapi reviewer:</strong> susun jawaban per komentar, perubahan yang dilakukan, dan lokasi revisi.</li>
        </ol>
        <details className="mt-6 rounded-xl border border-slate-300 bg-white p-5"><summary className="cursor-pointer font-bold">Contoh instruksi untuk pendampingan penulis</summary><p className="mt-4 whitespace-pre-wrap leading-8 text-slate-700">{authorPrompt}</p></details>
        <div className="mt-6 flex flex-wrap gap-3"><Link href="/journals" className={button + " bg-slate-950 text-white hover:bg-slate-800"}>Pilih jurnal RAHRN</Link><a href="https://journal.hossibarani.com/" className={button + " border border-slate-400 hover:bg-white"}>Panduan penulis di OJS ↗</a><Link href="/contact" className={button + " border border-slate-400 hover:bg-white"}>Diskusikan kebutuhan pendampingan</Link></div>
        <p className="mt-4 text-sm leading-7 text-slate-600">Pendampingan membantu persiapan naskah. Keputusan penerimaan tetap mengikuti proses editorial dan penelaahan jurnal masing-masing.</p>
      </section>
      <section id="riset-hukum" aria-labelledby="hukum-title" className="scroll-mt-28 rounded-2xl border border-teal-200 bg-teal-50 p-6 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-800">Lex Nusa · Penerapan khusus</p>
        <h2 id="hukum-title" className="mt-3 text-3xl font-bold">Riset hukum: hubungkan doktrin dengan bahan hukum primer</h2>
        <p className="mt-4 leading-8 text-slate-700">Adaptasi pembelajaran AI Lab ini menambahkan pemeriksaan yurisdiksi, periode, sumber primer, dan ketepatan pembacaan putusan pada alur penulisan akademik.</p>
        <dl className="mt-6 space-y-5">{[
          ["Peraturan", "Catat judul, nomor, tahun, pasal yang relevan, sumber resmi, tanggal pemeriksaan, serta status perubahan atau pencabutannya."],
          ["Putusan", "Catat nomor perkara, pengadilan, tanggal, fakta relevan, isu, pertimbangan hakim, amar, dan halaman atau paragraf sumber."],
          ["Doktrin", "Pisahkan pendapat penulis, dasar argumentasinya, kritik, dan kedudukannya dalam perdebatan literatur."],
          ["Perbandingan", "Jelaskan persamaan dan perbedaan konteks hukum sebelum menarik kesimpulan antarnegara."],
        ].map(([name, text]) => <div key={name}><dt className="font-bold text-teal-950">{name}</dt><dd className="mt-1 leading-7 text-slate-700">{text}</dd></div>)}</dl>
        <div className="mt-6 rounded-xl bg-white p-5"><h3 className="text-lg font-bold">Latihan: memetakan perdebatan vicarious liability</h3><p className="mt-3 leading-8 text-slate-700">Pilih sumber primer dan artikel yang sudah tersedia. Susun matriks tentang hubungan para pihak, kaitan perbuatan dengan pekerjaan, dasar pertanggungjawaban, argumen yang berlawanan, serta hasil perkara. Bedakan dalil pihak berperkara dari pertimbangan yang benar-benar diterima hakim.</p><p className="mt-3 text-sm leading-7 text-slate-600">Keluaran latihan: matriks bahan hukum, peta perdebatan, dan satu paragraf analisis dengan rujukan terverifikasi. Contoh ini adalah rancangan latihan, bukan kesimpulan atas perkara tertentu.</p></div>
        <details className="mt-6 rounded-xl border border-teal-200 bg-white p-5"><summary className="cursor-pointer font-bold">Contoh instruksi untuk riset hukum</summary><p className="mt-4 whitespace-pre-wrap leading-8 text-slate-700">{legalPrompt}</p></details>
        <div className="mt-6 flex flex-wrap gap-3"><Link href="/lexnusa" className={button + " bg-teal-900 text-white hover:bg-teal-800"}>Jelajahi Lex Nusa Legal AI</Link><Link href="/lexnusa/lex-eval" className={button + " border border-teal-700 text-teal-950 hover:bg-white"}>Pelajari evaluasi keluaran AI hukum</Link></div>
      </section>
      <section aria-labelledby="checklist">
        <h2 id="checklist" className="text-2xl font-bold">Sebelum naskah digunakan atau dikirim</h2>
        <ul className="mt-5 list-disc space-y-3 pl-6 leading-8 text-slate-700">
          <li>Periksa sumber asli, kutipan, angka, dan metadata; jangan mengisi kekosongan dengan referensi rekaan.</li>
          <li>Bedakan temuan sumber, interpretasi AI, dan analisis penulis. DOI yang valid belum membuktikan bahwa sebuah sumber mendukung klaim.</li>
          <li>Tinjau kemiripan dan atribusi secara memadai. Checklist AI tidak setara dengan pemeriksaan menyeluruh menggunakan basis data pembanding.</li>
          <li>Perbaiki gaya bahasa tanpa mengubah substansi; ikuti ketentuan pengungkapan penggunaan AI pada jurnal tujuan.</li>
          <li>Catat bagian yang belum terverifikasi dan mintakan tinjauan penulis sebelum melanjutkan.</li>
        </ul>
      </section>
      <footer className="border-t border-slate-200 pt-8 text-sm leading-7 text-slate-600">
        <p>Sumber utama: <a href="https://github.com/bimajanuri/academic-writing-skill" className="font-semibold underline underline-offset-4">bimajanuri/academic-writing-skill</a>. Dokumentasi ditinjau 25 Oktober 2026. Ringkasan alur mengacu pada dokumentasi repositori; contoh pendampingan dan riset hukum merupakan adaptasi pembelajaran AI Lab. Kemampuan aktual bergantung pada agen, akses sumber, dan pemeriksaan manusia.</p>
        <Link href="/ai-lab" className="mt-4 inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4">Kembali ke koleksi pembelajaran AI Lab</Link>
      </footer>
    </div>
  </main>;
}
