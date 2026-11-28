import { BookOpen, Download } from "lucide-react";
import styles from "./classroom.module.css";

const presentation = "/materials/melembagakan-perubahan-sekolah-dr-hos-arie-sibarani.pdf";
const article = "/materials/artikel-pelembagaan-perubahan-sekolah-dr-hos-arie-sibarani.docx";
const chapters = [
  ["00:00", 0, "Mengapa inovasi berhenti setelah penggagas pergi?"],
  ["02:04", 124, "Keberhasilan awal, pelembagaan, dan perluasan"],
  ["03:03", 183, "Persiapan keberlanjutan dalam kerangka EEF"],
  ["03:54", 234, "Uji kemandirian organisasi"],
  ["05:43", 343, "Fungsi inti dan pelaksanaan yang fleksibel"],
  ["07:13", 433, "Kepemimpinan terdistribusi"],
  ["07:32", 452, "Batas kewenangan dan akuntabilitas"],
  ["09:01", 541, "Pembelajaran organisasi"],
  ["09:35", 575, "Regenerasi dan serah terima"],
  ["10:47", 647, "Pengukuran keberlanjutan"],
  ["11:48", 708, "Keputusan berbasis bukti"],
  ["12:38", 758, "Keberlanjutan sebagai kemampuan beradaptasi"],
] as const;

export default function InstitutionalizationLesson() {
  return (
    <section id="melembagakan-perubahan" aria-labelledby="pelembagaan-title" className={styles.section}>
      <div className={styles.heading}>
        <div><p className={styles.eyebrow}>MATERI LANJUTAN · KEBERLANJUTAN PERUBAHAN</p><h2 id="pelembagaan-title">Melembagakan Perubahan Sekolah</h2></div>
        <a href="https://youtu.be/gnOB01xx0ws" target="_blank" rel="noopener noreferrer">Buka di YouTube</a>
      </div>
      <p className={styles.intro}>Setelah merancang dan menguji perbaikan, bagaimana sekolah menjaga manfaatnya ketika penggagas berpindah tugas? Pelajari hubungan antara kemampuan penerus, batas kewenangan, dukungan rutin, dan keputusan berbasis bukti.</p>
      <p className={styles.author}>Dr. Hos Arie Sibarani · Video 13:32 · Subtitle bahasa Indonesia</p>
      <div className={styles.videoGrid}>
        <div className={styles.video}>
          <iframe src="https://www.youtube-nocookie.com/embed/gnOB01xx0ws?rel=0&hl=id&cc_load_policy=1&cc_lang_pref=id" title="Melembagakan Perubahan Sekolah — Dr. Hos Arie Sibarani" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        </div>
        <aside className={styles.watchGuide}>
          <BookOpen size={26} aria-hidden="true" /><h3>Sambil menonton</h3>
          <ol><li>Bedakan keberhasilan awal, pelembagaan, dan perluasan.</li><li>Petakan keputusan, pengetahuan, dan akses yang masih bergantung pada satu orang.</li><li>Tentukan bukti kesiapan penerus dan alasan meninjau ulang program.</li></ol>
          <p className={styles.small}>Jika pemutar tidak tampil, gunakan tautan Buka di YouTube.</p>
        </aside>
      </div>
      <div className={styles.actions}>
        <a className={styles.primary} href={presentation} download="Melembagakan_Perubahan_Sekolah_Dr_Hos_Arie_Sibarani.pdf"><Download size={18} aria-hidden="true" /> Unduh presentasi PDF · 15 halaman</a>
        <a className={styles.secondary} href={article} download="Artikel_Akademik_Pelembagaan_Perubahan_Sekolah_Dr_Hos_Arie_Sibarani.docx"><Download size={18} aria-hidden="true" /> Unduh artikel akademik · Word</a>
      </div>
      <p className={styles.small}>Artikel pendamping: “Pelembagaan Perubahan Sekolah untuk Menjaga Keberlanjutan Manfaat Pembelajaran”. Kajian konseptual; proposisinya belum merupakan hasil pengujian empiris.</p>
      <details className={styles.pdf}>
        <summary>Baca presentasi di halaman ini</summary>
        <p><a href={presentation} target="_blank" rel="noopener noreferrer">Buka PDF di tab baru</a></p>
        <iframe src={`${presentation}#view=FitH`} title="Presentasi Melembagakan Perubahan Sekolah — 15 halaman" loading="lazy" />
        <p className={styles.small}>Jika pratinjau tidak tampil, gunakan tautan Buka PDF atau Unduh presentasi PDF.</p>
      </details>
      <details className={styles.rubric}>
        <summary>Penanda bab video</summary>
        <p className={styles.small}>Setiap tautan membuka bagian terkait di YouTube.</p>
        <ol>{chapters.map(([time, seconds, title]) => <li key={time}><a href={`https://www.youtube.com/watch?v=gnOB01xx0ws&t=${seconds}s`} target="_blank" rel="noopener noreferrer">{time} — {title}</a></li>)}</ol>
      </details>
      <details className={styles.rubric}>
        <summary>Catatan akademik dan batas penerapan</summary>
        <ul>
          <li><strong>Atribusi IHI:</strong> tiga jenis ukuran adalah hasil, proses, dan penyeimbang. Ukuran regenerasi merupakan tambahan penulis. Klarifikasi atas penyebutan dalam audio ditampilkan di video.</li>
          <li><strong>Waktu pelembagaan:</strong> persiapannya dimulai sejak perencanaan. Rencana 90 hari bukan durasi universal; simulasi ketidakhadiran satu bulan adalah latihan diagnosis.</li>
          <li><strong>Batas kewenangan:</strong> pembagian peran dan jalur eskalasi bersifat ilustratif serta perlu mengikuti mandat yang berlaku di sekolah.</li>
          <li><strong>Dasar penilaian:</strong> dimensi konseptual tidak otomatis menjadi skor atau grafik radar. Definisi operasional, sumber data, prosedur, dan dasar pembobotan perlu ditetapkan lebih dahulu.</li>
        </ul>
      </details>
      <div className={styles.prompt}><strong>Pertanyaan refleksi lanjutan</strong><p>Jika penggagas tidak dapat dihubungi selama satu bulan, keputusan apa yang terhenti, akses apa yang terputus, dan kemampuan apa yang belum dimiliki penerus? Susun prioritas perbaikannya beserta penanggung jawab dan waktu peninjauan.</p></div>
    </section>
  );
}
