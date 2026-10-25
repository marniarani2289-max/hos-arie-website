import type { Metadata } from "next";
import Link from "next/link";

const title = "Humanize Writing AI: Menyunting Bahasa, Menjaga Makna, dan Memperjelas Argumentasi";
export const metadata: Metadata = {
  title,
  description: "Panduan penyuntingan bahasa Indonesia dan Inggris dengan AI: menjaga klaim, kutipan, istilah, dan tingkat kepastian untuk naskah RAHRN serta tulisan hukum Lex Nusa.",
  alternates: { canonical: "/ai-lab/humanize-writing" },
};
const button = "inline-flex min-h-11 items-center rounded-xl px-5 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700";
const capabilities = [
  ["Parafrasa", "Menata ulang kata, kalimat, dan paragraf sambil mempertahankan klaim serta hubungan antargagasan."],
  ["Bahasa yang alami", "Mengurangi pengulangan, pembuka klise, susunan mekanis, dan bahasa berlebihan agar tulisan lebih mudah dipahami."],
  ["Pemeriksaan bahasa", "Meninjau ejaan dan tata bahasa Indonesia atau Inggris sesuai bahasa, pembaca, dan gaya yang dipilih."],
  ["Pemeriksaan klaim", "Membandingkan klaim sebelum dan sesudah revisi serta menandai pernyataan yang perlu diverifikasi."],
  ["Penataan sitasi", "Menyesuaikan format referensi dari data yang diberikan atau terverifikasi, tanpa mengisi metadata dengan dugaan."],
  ["Evaluasi revisi", "Memeriksa kesetiaan makna, alur, keterbacaan, dan perubahan yang memerlukan keputusan penulis."],
];
const stages = [
  ["Tetapkan makna", "Catat klaim, angka, nama, istilah, kutipan, sumber, dan tingkat kepastian yang harus dipertahankan."],
  ["Diagnosis", "Tentukan masalah yang nyata: pengulangan, kalimat terlalu panjang, hubungan logis kabur, atau gaya yang tidak sesuai pembaca."],
  ["Tinjau isi", "Tandai klaim meragukan dan kekurangan sumber. Jangan mengganti informasi yang belum pasti dengan fakta rekaan."],
  ["Sunting gaya", "Perjelas struktur kalimat dan paragraf sesuai tujuan serta gaya penulis tanpa memperluas kesimpulan."],
  ["Periksa bahasa", "Rapikan ejaan, tanda baca, tata bahasa, dan konsistensi istilah tanpa mengubah kutipan langsung."],
  ["Bandingkan klaim", "Cocokkan teks awal dan revisi: pastikan subjek, lingkup, angka, negasi, syarat, dan modalitas tetap sama."],
  ["Audit penulis", "Tinjau naskah akhir, catatan perubahan, serta bagian yang belum terverifikasi sebelum menyetujuinya."],
];
const prompts = [
  ["Penyuntingan naskah akademik", "Sunting naskah berikut dalam gaya akademik yang jelas dan alami. Pertahankan bahasa asal, seluruh klaim, angka, nama, istilah, kutipan langsung, sitasi, batasan, dan tingkat kepastian. Kurangi pengulangan dan kalimat berlebihan. Jangan menambahkan fakta atau referensi. Tandai klaim yang perlu diverifikasi. Kembalikan teks revisi, ringkasan perubahan, dan daftar pertanyaan untuk penulis."],
  ["Ketepatan bahasa hukum", "Sunting teks hukum berikut untuk memperjelas bahasa tanpa mengubah substansi. Pertahankan istilah teknis, yurisdiksi, tanggal, nomor perkara, nomor pasal, kutipan, negasi, syarat, pengecualian, serta kata dapat, wajib, dan dilarang. Bedakan pendapat akademik, dalil para pihak, pertimbangan hakim, dan amar. Jangan memperluas kesimpulan. Tampilkan perubahan yang berisiko mengubah makna dan minta penulis meninjaunya."],
  ["Membandingkan draf awal dan revisi", "Bandingkan teks awal dengan revisi berikut. Periksa klaim satu per satu, termasuk angka, subjek, cakupan, atribusi, hubungan sebab-akibat, dan tingkat kepastian. Laporkan klaim yang hilang, bertambah, atau berubah. Jangan menyatakan fakta sudah terverifikasi jika sumbernya belum diperiksa. Usulkan koreksi hanya pada bagian yang bermasalah."],
];

export default function HumanizeWritingPage() {
  return <main lang="id" className="bg-white text-slate-900">
    <header className="border-b-4 border-amber-400 bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <Link href="/ai-lab" className="inline-flex min-h-11 items-center text-sm font-semibold text-amber-300 underline underline-offset-4">Kembali ke AI &amp; Digital System Lab</Link>
        <p className="mt-7 text-xs font-bold uppercase tracking-widest text-amber-300">Panduan belajar · Penyuntingan naskah</p>
        <h1 className="mt-4 max-w-5xl font-academic text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Buat tulisan lebih jernih dan mudah dibaca. Pertahankan suara penulis, ketepatan sumber, serta makna setiap klaim selama proses penyuntingan.</p>
        <nav aria-label="Jalur belajar Humanize Writing AI" className="mt-8 flex flex-wrap gap-3">
          <a href="#alur" className={button + " bg-amber-400 text-slate-950 hover:bg-amber-300"}>Pelajari alur penyuntingan</a>
          <a href="#penyuntingan-naskah" className={button + " border border-slate-500 hover:bg-slate-800"}>Untuk penulis RAHRN</a>
          <a href="#bahasa-hukum" className={button + " border border-slate-500 hover:bg-slate-800"}>Ketepatan bahasa hukum</a>
        </nav>
      </div>
    </header>
    <div className="mx-auto max-w-6xl space-y-16 px-5 py-12 sm:px-8 sm:py-16">
      <section aria-labelledby="tentang">
        <h2 id="tentang" className="text-2xl font-bold">Menyunting dengan makna yang tetap terjaga</h2>
        <p className="mt-4 max-w-4xl leading-8 text-slate-700">Humanize Writing dari bimajanuri merupakan paket instruksi untuk membantu agen AI menyunting teks bahasa Indonesia dan Inggris. Dokumentasinya menekankan penjagaan makna, larangan mengarang fakta, dan pemilihan gaya sesuai pembaca. Bahasa keluaran mengikuti masukan kecuali penerjemahan diminta.</p>
        <p className="mt-3 max-w-4xl leading-8 text-slate-700">Halaman ini adalah panduan penerapan independen. Tidak ada pengunggahan naskah atau penyuntingan otomatis di halaman ini. Penggunaan paket dilakukan pada lingkungan agen yang mendukungnya, mengikuti petunjuk repositori.</p>
        <a href="https://github.com/bimajanuri/humanize-writing" className={button + " mt-5 bg-slate-950 text-white hover:bg-amber-800"}>Buka repositori dan petunjuk penggunaan ↗</a>
      </section>
      <section aria-labelledby="fitur">
        <h2 id="fitur" className="text-2xl font-bold">Pilih bagian yang perlu diperbaiki</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">{capabilities.map(([name, text]) => <article key={name} className="rounded-xl border border-slate-200 p-6"><h3 className="text-xl font-bold">{name}</h3><p className="mt-3 leading-7 text-slate-700">{text}</p></article>)}</div>
        <p className="mt-5 leading-8 text-slate-700">Sertakan tujuan, pembaca, dan contoh tulisan Anda. Pilihan gaya dalam dokumentasi mencakup formal, akademik, profesional, santai, diplomatis, edukatif, sederhana, percaya diri, dan pemasaran. Gaya yang lebih tegas tetap harus mempertahankan batas klaim.</p>
      </section>
      <section id="alur" aria-labelledby="alur-title" className="scroll-mt-28">
        <h2 id="alur-title" className="text-2xl font-bold">Tujuh tahap dari draf hingga audit</h2>
        <ol className="mt-6 divide-y divide-slate-200 border-y border-slate-200">{stages.map(([name, text], index) => <li key={name} className="grid gap-3 py-5 md:grid-cols-[14rem_1fr]"><h3 className="font-bold"><span className="mr-3 text-amber-800">0{index + 1}</span>{name}</h3><p className="leading-7 text-slate-700">{text}</p></li>)}</ol>
      </section>
      <section aria-labelledby="contoh">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-800">Contoh ilustratif · Disusun AI Lab</p>
        <h2 id="contoh" className="mt-3 text-2xl font-bold">Perbaiki kalimat, pertahankan kekuatan klaim</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 p-6"><h3 className="font-bold">Draf awal</h3><p className="mt-3 leading-8 text-slate-700">Kajian ini memiliki tujuan untuk melakukan penelaahan terhadap perbedaan argumentasi yang digunakan oleh para penulis dalam membahas pertanggungjawaban pemberi kerja.</p></article>
          <article className="rounded-xl border border-teal-200 bg-teal-50 p-6"><h3 className="font-bold">Revisi bahasa</h3><p className="mt-3 leading-8 text-slate-700">Kajian ini menelaah perbedaan argumentasi para penulis tentang pertanggungjawaban pemberi kerja.</p></article>
        </div>
        <p className="mt-4 leading-8 text-slate-700">Revisi memadatkan kalimat tanpa menambahkan temuan. Jika sumber menyatakan “temuan ini mengindikasikan”, jangan mengubahnya menjadi “temuan ini membuktikan” hanya agar tulisan terdengar lebih tegas.</p>
      </section>
      <section id="penyuntingan-naskah" aria-labelledby="penulis-title" className="scroll-mt-28 rounded-2xl bg-stone-100 p-6 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-800">Journal / RAHRN</p>
        <h2 id="penulis-title" className="mt-3 text-3xl font-bold">Penyuntingan naskah dengan kendali penulis</h2>
        <p className="mt-4 leading-8 text-slate-700">Gunakan setelah sumber, kerangka, dan klaim utama tersedia. Penulis tetap memutuskan perubahan yang menyentuh substansi penelitian.</p>
        <ol className="mt-5 list-decimal space-y-3 pl-6 leading-8 text-slate-700">
          <li>Pilih satu bagian naskah dan nyatakan tujuan revisinya, misalnya memperjelas alur pembahasan.</li>
          <li>Sertakan gaya jurnal, bahasa yang digunakan, serta istilah atau kutipan yang harus dipertahankan.</li>
          <li>Minta teks revisi bersama catatan perubahan dan daftar klaim yang perlu diperiksa.</li>
          <li>Bandingkan kembali dengan data, sumber, dan draf awal sebelum menyetujui revisi.</li>
          <li>Ikuti kebijakan jurnal tujuan mengenai penggunaan dan pengungkapan bantuan AI.</li>
        </ol>
        <p className="mt-4 text-sm leading-7 text-slate-600">Penyuntingan bahasa tidak menggantikan penilaian metode atau proses mitra bestari dan tidak menjamin penerimaan naskah.</p>
        <div className="mt-6 flex flex-wrap gap-3"><Link href="/journals" className={button + " bg-slate-950 text-white hover:bg-slate-800"}>Jelajahi Journal / RAHRN</Link><Link href="/ai-lab/academic-writing#pendampingan-penulis" className={button + " border border-slate-400 hover:bg-white"}>Kembali ke pendampingan penulisan</Link></div>
      </section>
      <section id="bahasa-hukum" aria-labelledby="hukum-title" className="scroll-mt-28 rounded-2xl border border-teal-200 bg-teal-50 p-6 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-800">Lex Nusa · Ketepatan istilah dan argumentasi</p>
        <h2 id="hukum-title" className="mt-3 text-3xl font-bold">Sunting bahasa hukum tanpa menggeser substansi</h2>
        <p className="mt-4 leading-8 text-slate-700">Dalam latihan penyuntingan hukum, periksa siapa yang membuat pernyataan, pada yurisdiksi dan periode apa, serta dalam konteks apa pernyataan itu berlaku. Hindari mengganti istilah teknis hanya demi variasi kata.</p>
        <dl className="mt-6 space-y-5">{[
          ["Modalitas dan syarat", "Pertahankan perbedaan antara dapat, wajib, dilarang, serta syarat dan pengecualiannya. “Dapat dimintai pertanggungjawaban” tidak sama dengan “pasti bertanggung jawab”."],
          ["Atribusi", "Bedakan pendapat akademisi, dalil para pihak, pertimbangan hakim, dan amar. Jangan mengubah siapa yang menyatakan atau menyimpulkan sesuatu."],
          ["Identitas sumber", "Pertahankan nomor perkara, pengadilan, tanggal, pasal, halaman, serta kutipan langsung. Koreksi dugaan salah kutip hanya setelah memeriksa sumber asli."],
          ["Istilah dan lingkup", "Jaga konsistensi istilah, yurisdiksi, negasi, dan hubungan sebab-akibat. Jangan menyamakan istilah atau sistem hukum tanpa dasar."],
        ].map(([name, text]) => <div key={name}><dt className="font-bold text-teal-950">{name}</dt><dd className="mt-2 leading-7 text-slate-700">{text}</dd></div>)}</dl>
        <div className="mt-6 rounded-xl bg-white p-6"><h3 className="text-lg font-bold">Latihan: satu paragraf vicarious liability</h3><p className="mt-3 leading-8 text-slate-700">Gunakan paragraf milik sendiri beserta sumbernya. Tandai istilah, dasar argumen, syarat, dan tingkat kepastian. Minta penyederhanaan bahasa, lalu bandingkan setiap klaim dengan draf awal. Catat perubahan yang hanya menyentuh gaya dan perubahan yang memerlukan penilaian substantif.</p><p className="mt-3 text-sm leading-7 text-slate-600">Ini latihan penyuntingan, bukan kesimpulan hukum atas perkara tertentu.</p></div>
        <div className="mt-6 flex flex-wrap gap-3"><Link href="/lexnusa" className={button + " bg-teal-900 text-white hover:bg-teal-800"}>Jelajahi Lex Nusa Legal AI</Link><Link href="/lexnusa/lex-eval" className={button + " border border-teal-700 hover:bg-white"}>Pelajari evaluasi keluaran AI hukum</Link></div>
      </section>
      <section aria-labelledby="instruksi">
        <h2 id="instruksi" className="text-2xl font-bold">Contoh instruksi penyuntingan</h2>
        <p className="mt-4 leading-8 text-slate-700">Buka contoh dan salin ke agen yang digunakan bersama naskah serta bahan pendukung yang sesuai.</p>
        <div className="mt-6 space-y-4">{prompts.map(([name, text]) => <details key={name} className="rounded-xl border border-slate-200 p-5"><summary className="cursor-pointer font-bold">{name}</summary><p className="mt-4 whitespace-pre-wrap leading-8 text-slate-700">{text}</p></details>)}</div>
      </section>
      <section aria-labelledby="audit">
        <h2 id="audit" className="text-2xl font-bold">Sebelum menerima hasil revisi</h2>
        <ul className="mt-5 list-disc space-y-3 pl-6 leading-8 text-slate-700">
          <li>Tidak ada fakta, angka, kutipan, atau sumber baru yang ditambahkan tanpa dasar.</li>
          <li>Klaim, atribusi, tingkat kepastian, syarat, dan pengecualian tetap sama.</li>
          <li>Istilah, sitasi, dan kutipan langsung sudah dibandingkan dengan sumbernya.</li>
          <li>Bagian yang belum terverifikasi ditandai, bukan dianggap benar karena bahasanya lebih meyakinkan.</li>
          <li>Gaya sesuai pembaca dan suara penulis; catatan perubahan sudah ditinjau.</li>
        </ul>
        <p className="mt-5 leading-8 text-slate-700">Tujuannya adalah keterbacaan, kesetiaan makna, dan ketepatan. Dokumentasi tidak menempatkan pengelabuan detektor AI sebagai tujuan. Instruksi pemeriksaan klaim juga tidak menggantikan verifikasi fakta dengan sumber.</p>
      </section>
      <section aria-labelledby="panduan-terkait" className="rounded-2xl bg-slate-950 p-6 text-white sm:p-9">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-300">Baca · Tulis · Sunting</p>
        <h2 id="panduan-terkait" className="mt-3 text-3xl font-bold">Satu alur, tiga panduan</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div><h3 className="text-xl font-bold">Paper Review AI</h3><p className="mt-3 leading-7 text-slate-300">Kembali ke matriks literatur ketika klaim atau sumber perlu diperiksa sebelum revisi.</p><Link href="/ai-lab/paper-review" className={button + " mt-5 bg-amber-400 text-slate-950 hover:bg-amber-300"}>Buka Paper Review AI</Link></div>
          <div><h3 className="text-xl font-bold">Academic Writing AI</h3><p className="mt-3 leading-7 text-slate-300">Perbaiki kerangka dan hubungan antarargumen ketika masalah naskah melampaui penyuntingan bahasa.</p><Link href="/ai-lab/academic-writing" className={button + " mt-5 bg-amber-400 text-slate-950 hover:bg-amber-300"}>Buka Academic Writing AI</Link></div>
        </div>
      </section>
      <footer className="border-t border-slate-200 pt-8 text-sm leading-7 text-slate-600">
        <p>Sumber utama: <a href="https://github.com/bimajanuri/humanize-writing" className="font-semibold underline underline-offset-4">bimajanuri/humanize-writing</a>, ditinjau 25 Oktober 2026. Ringkasan kemampuan mengacu pada dokumentasi repositori; contoh dan latihan merupakan adaptasi pembelajaran AI Lab. Paket belum diuji langsung oleh AI Lab. Hasil tetap memerlukan tinjauan penulis.</p>
        <Link href="/ai-lab" className="mt-4 inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4">Kembali ke koleksi pembelajaran AI Lab</Link>
      </footer>
    </div>
  </main>;
}
