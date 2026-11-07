import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Konoha: Mengelola Tim Agen AI | AI Lab",
  description: "Panduan Konoha untuk orkestrasi agen AI: peran spesialis, pemasangan lokal, praktikum, dan lembar kerja evaluasi.",
  alternates: { canonical: "/ai-lab/konoha" },
};
const repo = "https://github.com/andycungkrinx91/konoha";
const agents = [
  ["Sannin", "Membagi tugas dan merangkum hasil tim."],
  ["Genin", "Menelusuri kode dan mencatat temuan tanpa mengubahnya."],
  ["Chunin", "Mencari dokumentasi dan sumber pendukung."],
  ["Jonin", "Mengerjakan tampilan dan interaksi aplikasi."],
  ["Anbu", "Mengerjakan backend, integrasi, dan pengujian."],
  ["Tokubetsu Jonin", "Menyusun dokumentasi dan laporan teknis."],
  ["Kage", "Menilai rencana, arsitektur, dan bukti hasil kerja."],
  ["Akatsuki", "Memeriksa keamanan dalam lingkup yang diizinkan."],
];
const steps = [
  ["Siapkan lingkungan", "Gunakan komputer atau VPS dengan Node.js versi 24 atau lebih baru dan coding client yang didukung. Model AI serta akun layanan mengikuti konfigurasi client. Cadangkan konfigurasi client karena proses init dapat mengubah pengaturan MCP dan instruksi agen."],
  ["Pasang dan inisialisasi", "Jalankan perintah berikut di terminal lingkungan percobaan. Tinjau pilihan konfigurasi yang ditawarkan sebelum melanjutkan."],
  ["Periksa koneksi", "Jalankan pemeriksaan MCP dan status instalasi. Buka kembali coding client setelah konfigurasi selesai, lalu mulai dari proyek latihan."],
];
export default function KonohaPage() {
  return <main lang="id" className={styles.page}>
    <div className={styles.container}>
      <nav aria-label="Navigasi materi" className={styles.nav}><Link href="/ai-lab">AI &amp; Digital Systems Lab</Link><Link href="/ai-lab/agent-skills">Agent Skills</Link></nav>
      <header className={styles.hero}>
        <p className={styles.caption}>Materi lanjutan Agent Skills · Panduan dan praktikum</p>
        <h1 className={styles.heading1}>Konoha: mengelola<br />tim agen AI</h1>
        <p className={styles.lead}>Bagi pekerjaan pengembangan aplikasi ke agen spesialis, tetapkan batas tugas, lalu periksa hasilnya dengan bukti.</p>
        <a href="#praktikum" className={styles.button}>Mulai praktikum</a>
        <p className={styles.caption}>Berdasarkan dokumentasi proyek Konoha · Ditinjau 7 November 2026</p>
      </header>
      <aside className={styles.notice} aria-label="Status integrasi"><strong>Materi tersedia. Dashboard Konoha belum aktif di website.</strong><p>Halaman ini menyediakan panduan dan lembar kerja. Eksekusi agen berlangsung di komputer atau server yang telah dipasangi Konoha dan terhubung ke model AI.</p></aside>
      <section className={styles.section} aria-labelledby="fungsi"><h2 id="fungsi" className={styles.heading2}>Dari SOP ke kerja tim</h2><p>Agent Skills menjelaskan cara melakukan suatu pekerjaan. Konoha mengatur pencarian skills, pembagian tugas, konteks proyek, dan pemeriksaan hasil melalui MCP, yaitu protokol penghubung agen AI dengan alat.</p><div className={styles.grid}>{[["Pembagian peran", "Pisahkan penelusuran, implementasi, dan review agar tanggung jawab dapat diperiksa."], ["Konteks sesuai kebutuhan", "Muat skills dan potongan kode yang relevan saat diperlukan."], ["Bukti sebelum selesai", "Catat perubahan, hasil pengujian, dan keterbatasan sebelum menerima keluaran agen."]].map(([title, body]) => <article className={styles.card} key={title}><h3 className={styles.heading3}>{title}</h3><p>{body}</p></article>)}</div></section>
      <section className={styles.section} aria-labelledby="peran"><h2 id="peran" className={styles.heading2}>Kenali delapan peran</h2><div className={styles.grid}>{agents.map(([name, task]) => <article className={styles.card} key={name}><h3 className={styles.heading3}>{name}</h3><p>{task}</p></article>)}</div><p className={styles.caption}>Ringkasan peran mengikuti README proyek. Hasil kerja tetap bergantung pada model, konfigurasi, dan pengujian.</p></section>
      <section className={styles.section} aria-labelledby="instalasi"><h2 id="instalasi" className={styles.heading2}>Panduan pemasangan lokal</h2>{steps.map(([title, body], index) => <article className={styles.step} key={title}><h3 className={styles.heading3}>{index + 1}. {title}</h3><p>{body}</p>{index === 1 && <pre><code>{"npm install -g konoha-mcp\nkonoha init"}</code></pre>}{index === 2 && <pre><code>{"konoha test\nkonoha status\nkonoha ui start"}</code></pre>}</article>)}<p>Dashboard lokal menggunakan <code>127.0.0.1:1404</code>. Buka pada komputer tempat Konoha berjalan dan ikuti penggantian kata sandi pada login pertama. Dashboard pengelolaan tidak disematkan sebagai panel publik di Lab.</p><a className={styles.textLink} href={`${repo}/blob/master/docs/SETUP-WEB-UI.md`} target="_blank" rel="noopener noreferrer">Baca panduan dashboard resmi ↗</a></section>
      <section id="praktikum" className={styles.section} aria-labelledby="latihan"><h2 id="latihan" className={styles.heading2}>Praktikum: halaman kelas dengan bukti uji</h2><p>Gunakan proyek percobaan untuk membuat satu halaman kelas yang berisi tujuan belajar, materi, latihan, dan rubrik. Jangan gunakan data mahasiswa asli.</p><ol className={styles.list}><li><strong>Susun brief.</strong> Tentukan peserta, tujuan, bahan, keluaran, dan batas akses agen.</li><li><strong>Tinjau rencana.</strong> Minta pembagian peran, daftar file yang akan berubah, serta kriteria keberhasilan.</li><li><strong>Implementasikan.</strong> Kerjakan halaman pada salinan proyek dan catat perubahan.</li><li><strong>Uji hasil.</strong> Periksa tautan, tampilan ponsel, navigasi keyboard, ketepatan materi, dan hasil build.</li><li><strong>Putuskan.</strong> Terima hasil hanya setelah bukti diperiksa; catat bagian yang memerlukan perbaikan.</li></ol><h3 className={styles.heading3}>Contoh brief untuk coding client</h3><pre><code>{"Buat satu halaman kelas pada proyek latihan.\nMasukan: tujuan belajar dan materi yang saya sediakan.\nSusun rencana dan pembagian peran terlebih dahulu.\nJangan mengubah autentikasi, database, atau produksi.\nJangan mengarang rujukan atau hasil pengujian.\nKeluaran: halaman, daftar perubahan, bukti uji,\ndan keterbatasan yang masih perlu diperiksa."}</code></pre><a className={styles.button} href="/downloads/konoha/lembar-kerja-konoha.txt" download>Unduh lembar kerja (.txt)</a><p className={styles.caption}>Unduhan dapat diisi di editor teks. Jawaban tidak dikirim atau disimpan otomatis ke website.</p></section>
      <section className={styles.section} aria-labelledby="evaluasi"><h2 id="evaluasi" className={styles.heading2}>Nilai bukti, bukan label agen</h2><p>Beri skor 0 jika belum ada bukti, 1 jika bukti belum lengkap, dan 2 jika bukti memenuhi kriteria untuk setiap aspek: ketepatan materi, kepatuhan terhadap lingkup tugas, fungsi halaman, dan keterlacakan hasil uji. Total 0–8 merupakan rubrik praktikum Lab, bukan sertifikasi Konoha.</p><p>Pengembang melaporkan pengurangan konteks pada benchmark mereka. Angka tersebut bukan jaminan penghematan biaya API, ketepatan jawaban, atau keamanan aplikasi Anda.</p></section>
      <section className={styles.section} aria-labelledby="tanya"><h2 id="tanya" className={styles.heading2}>Pertanyaan umum</h2>{[["Apakah agen bisa dijalankan dari halaman ini?", "Belum. Halaman ini adalah materi pembelajaran. Instalasi lokal atau server dan koneksi model diperlukan untuk menjalankan agen."], ["Apakah wajib menyewa server?", "Tidak untuk praktikum lokal. Server dibutuhkan jika Anda ingin menyediakan lingkungan yang terus berjalan dan dapat diakses dari perangkat lain."], ["Apakah gratis?", "Kode Konoha menggunakan lisensi MIT. Layanan model AI, hosting, dan layanan tambahan dapat memiliki biaya tersendiri."], ["Apa kaitannya dengan LexNusa?", "Praktikum ini dapat digunakan untuk mempelajari proses pengembangan fitur layanan hukum. Belum ada koneksi Konoha ke backend atau data pengguna LexNusa."]].map(([q,a]) => <details key={q} className={styles.card}><summary>{q}</summary><p>{a}</p></details>)}</section>
      <footer className={styles.section}><h2 className={styles.heading2}>Lanjutkan eksplorasi</h2><div className={styles.nav}><Link href="/ai-lab/agent-skills">Kembali ke Agent Skills</Link><a href={repo} target="_blank" rel="noopener noreferrer">Repositori resmi Konoha ↗</a></div><p className={styles.caption}>Panduan independen · Dr. Hos Arie Sibarani. Konoha dikembangkan oleh Andy Setiyawan. Dokumentasi sumber dapat berubah; periksa versi yang digunakan sebelum praktikum.</p></footer>
    </div>
  </main>;
}
