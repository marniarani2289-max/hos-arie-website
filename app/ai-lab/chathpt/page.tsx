import type { Metadata } from "next";
import Link from "next/link";
import styles from "./case.module.css";

export const metadata: Metadata = {
  title: "ChatHPT: Studi Kasus RAG dan Tata Kelola AI",
  description: "Pelajari ChatHPT Muhammadiyah melalui penelusuran sumber, hierarki otoritas, latihan verifikasi, dan rubrik evaluasi untuk hukum serta pendidikan.",
  alternates: { canonical: "/ai-lab/chathpt" },
};
const sources = [
  ["Tentang ChatHPT", "https://chathpt.muhammadiyah.or.id/v2/about"],
  ["Muhammadiyah: AI keagamaan dan kewenangan fatwa", "https://muhammadiyah.or.id/2026/11/muhammadiyah-luncurkan-chathpt-ai-keagamaan-yang-tidak-mengambil-alih-kewenangan-fatwa/"],
  ["Muhammadiyah: Mengenal asisten AI dan dokumen Tarjih", "https://muhammadiyah.or.id/2026/11/mengenal-chathpt-asisten-ai-muhammadiyah-untuk-mengakses-ribuan-dokumen-tarjih/"],
];
const rubric = [
  ["Ketepatan sumber", "Dokumen resmi dapat dibuka dan identitasnya dicatat."],
  ["Dukungan terhadap klaim", "Bagian dokumen yang diperiksa benar mendukung jawaban."],
  ["Kedudukan rujukan", "Jenis, tanggal, konteks, dan otoritas dokumen dibedakan."],
  ["Batas kesimpulan", "Ringkasan, inferensi, dan keputusan resmi tidak dicampur."],
  ["Pengawasan manusia", "Kebutuhan klarifikasi dan pihak peninjau disebutkan."],
];
export default function ChatHptCasePage() {
  return <main lang="id" className={styles.case}>
    <a className={styles.skip} href="#materi">Lewati ke materi</a>
    <div className={styles.wrap}>
      <nav aria-label="Navigasi studi kasus"><Link href="/ai-lab#tata-kelola">← AI &amp; Digital Systems Lab</Link><Link href="/ai-lab/ai-governance">Program AI Governance</Link></nav>
      <header>
        <p className={styles.label}>Studi kasus · RAG · Tata kelola AI</p>
        <h1>ChatHPT: menelusuri jawaban, memeriksa otoritas</h1>
        <p className={styles.lead}>Pelajari bagaimana asisten AI membantu membaca dokumen keagamaan, lalu gunakan prinsip verifikasinya untuk riset hukum dan pendidikan.</p>
        <p>Materi Dr. Hos Arie Sibarani · Sesi mandiri 60 menit · Ditinjau 7 November 2026</p>
        <a className={styles.button} href="#praktikum">Mulai praktikum verifikasi</a>
      </header>
      <article id="materi">
        <section>
          <h2>Tujuan pembelajaran</h2>
          <ul><li>Menjelaskan hubungan antara pencarian dokumen dan penyusunan jawaban AI.</li><li>Membedakan ketepatan kutipan dari kewenangan membuat keputusan.</li><li>Menyusun catatan evaluasi yang dapat diperiksa kembali oleh orang lain.</li></ul>
        </section>
        <section>
          <h2>Kasus: akses ke khazanah Tarjih</h2>
          <p>ChatHPT merupakan asisten untuk menjelajahi Himpunan Putusan Tarjih dan rujukan keilmuan Muhammadiyah. Pengguna bertanya dengan bahasa sehari hari untuk menemukan penjelasan dan sumber. Basis pengetahuan dapat dijelajahi tanpa akun; fitur bertanya memerlukan Muhammadiyah ID. <a href={sources[0][1]}>[1]</a></p>
          <p>Menurut dokumentasi Muhammadiyah, layanan ini memiliki fungsi tanya jawab, perpustakaan digital, dan pendamping belajar. Pengembangannya melibatkan Majelis Tarjih dan Tajdid, Majelis Pustaka dan Informasi, serta LabMu. <a href={sources[2][1]}>[3]</a></p>
          <aside><strong>Status materi:</strong> studi dokumentasi publik, bukan laporan pengujian langsung atau audit internal ChatHPT. Halaman ini merupakan materi independen Hossibarani Lab; layanan percakapan dijalankan oleh penyedia ChatHPT.</aside>
        </section>
        <section>
          <h2>Bagaimana RAG digunakan?</h2>
          <p>RAG menggabungkan penelusuran informasi dengan penyusunan jawaban. Dalam penjelasan resmi ChatHPT, sistem mencari dokumen Tarjih yang relevan, membaca bagian terkait, lalu menyusun jawaban beserta rujukan. <a href={sources[1][1]}>[2]</a></p>
          <ol><li><strong>Pertanyaan:</strong> pengguna menyampaikan topik dan konteks.</li><li><strong>Penelusuran:</strong> sistem menemukan dokumen dan bagian yang relevan.</li><li><strong>Penyusunan:</strong> AI merangkum temuan dengan rujukan sumber.</li><li><strong>Verifikasi:</strong> peserta praktikum membuka sumber dan memeriksa apakah jawaban didukung teksnya.</li></ol>
          <p>Tiga langkah pertama merangkum deskripsi resmi. Langkah verifikasi adalah prosedur pembelajaran Lab. Menemukan sebuah sumber belum membuktikan bahwa seluruh penjelasan AI sesuai dengan sumber tersebut.</p>
        </section>
        <section>
          <h2>Hierarki sumber dan batas kewenangan</h2>
          <p>Dokumentasi ChatHPT menyebut prioritas putusan Munas atau Muktamar yang telah ditanfidzkan, kemudian fatwa, lalu tanya jawab agama. Sistem membantu memahami keputusan yang tersedia; kewenangan menetapkan fatwa tetap berada pada otoritas keilmuan. Persoalan baru atau kasus khusus dirujuk kepada Majelis Tarjih atau ulama yang berwenang. <a href={sources[1][1]}>[2]</a></p>
          <aside><strong>Pertanyaan kunci:</strong> apakah jawaban ini sekadar menjelaskan dokumen, atau sudah menarik kesimpulan baru yang memerlukan penilaian ahli?</aside>
        </section>
        <section id="praktikum">
          <h2>Praktikum 60 menit</h2>
          <p>Gunakan topik pembelajaran umum. Apabila tidak memiliki akun, lakukan latihan melalui arsip dan contoh penjelasan pada sumber resmi.</p>
          <ol>
            <li><strong>10 menit · Pilih pertanyaan.</strong> Contoh: “Temukan putusan Tarjih tentang tata cara salat. Sebutkan judul dokumen, bagian relevan, dan tautan sumbernya.”</li>
            <li><strong>15 menit · Rekam bukti.</strong> Catat pertanyaan persis, tanggal akses, jawaban, serta seluruh tautan. Buka minimal dua rujukan jika tersedia; catat keterbatasan bila hanya satu ditemukan.</li>
            <li><strong>15 menit · Periksa klaim.</strong> Pilih tiga pernyataan dalam jawaban. Untuk setiap pernyataan, temukan bagian pendukung dan tandai: didukung, didukung sebagian, atau tidak ditemukan.</li>
            <li><strong>10 menit · Uji batas.</strong> Tanyakan: “Bagian mana yang merupakan keputusan resmi dan bagian mana yang merupakan penjelasan atau inferensi? Jika sumber tidak cukup, nyatakan keterbatasannya.” Periksa jawaban kedua terhadap sumber yang sama.</li>
            <li><strong>10 menit · Susun refleksi.</strong> Jelaskan satu kekuatan, satu risiko, dan satu perbaikan prosedur verifikasi. Hindari menggeneralisasi kualitas seluruh sistem dari satu percobaan.</li>
          </ol>
          <a className={styles.button} href="https://chathpt.muhammadiyah.or.id/" target="_blank" rel="noopener noreferrer">Buka ChatHPT resmi ↗<span className="sr-only"> (tab baru)</span></a>
          <p>Format hasil: pertanyaan → jawaban → klaim → judul dan bagian sumber → hasil pemeriksaan → tindak lanjut. Ini latihan mandiri; halaman ini tidak menerima pengumpulan jawaban.</p>
        </section>
        <section>
          <h2>Rubrik evaluasi mandiri</h2>
          <p>Beri skor 0 bila belum ada bukti, 1 bila bukti sebagian, dan 2 bila lengkap serta dapat diperiksa. Maksimum 10. Skor menilai catatan praktikum, bukan sertifikasi akurasi ChatHPT.</p>
          <div className={styles.tableWrap}><table><caption>Lima aspek pemeriksaan bukti</caption><thead><tr><th scope="col">Aspek</th><th scope="col">Bukti untuk skor 2</th></tr></thead><tbody>{rubric.map(([name, evidence]) => <tr key={name}><th scope="row">{name}</th><td>{evidence}</td></tr>)}</tbody></table></div>
        </section>
        <section>
          <h2>Transfer pembelajaran ke hukum dan pendidikan</h2>
          <p>Berikut usulan desain Lab, bukan klaim bahwa fitur tersebut sudah diterapkan pada LexNusa atau kelas.</p>
          <ul><li><strong>Riset hukum:</strong> setiap klaim dihubungkan dengan sumber, yurisdiksi, tanggal, dan status berlakunya. Peninjau memisahkan isi sumber dari analisis AI sebelum memberikan kesimpulan profesional.</li><li><strong>Pendidikan:</strong> asisten berbasis modul menampilkan bagian materi yang dirujuk. Dosen menilai kesesuaian dengan tujuan belajar dan menangani pertanyaan di luar cakupan.</li><li><strong>Tata kelola:</strong> tetapkan penanggung jawab korpus, prosedur pembaruan, mekanisme koreksi, dan kondisi yang mengharuskan peninjauan manusia.</li></ul>
          <p>Diskusi: bagaimana sistem seharusnya menjawab ketika dokumen saling berbeda, rujukan sudah lama, atau tidak ada bukti yang cukup?</p>
          <div className={styles.links}><Link href="/ai-lab/ai-governance">Lanjut ke AI Governance →</Link><Link href="/lexnusa/evidence">Pelajari standar bukti LexNusa →</Link><Link href="/ai-lab/agent-skills">Susun SOP verifikasi →</Link></div>
        </section>
        <section>
          <h2>Sumber primer</h2>
          <ol>{sources.map(([title, url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{title} ↗<span className="sr-only"> (tab baru)</span></a></li>)}</ol>
          <p>Fakta tentang ChatHPT dirujuk ke dokumentasi penyedia. Praktikum, rubrik, dan transfer pembelajaran merupakan rancangan Hossibarani Lab.</p>
        </section>
      </article>
    </div>
  </main>;
}
