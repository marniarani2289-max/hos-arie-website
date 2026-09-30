import s from "./ismi.module.css";

const videoUrl = "https://www.youtube.com/watch?v=LZme5o0ybfQ";
const chapters = [
  { time: "00:00", seconds: 0, title: "Selat Malaka sebagai ruang hidup" },
  { time: "04:34", seconds: 274, title: "Hak masyarakat dan dimensi keadilan" },
  { time: "09:53", seconds: 593, title: "Menguji janji ekonomi biru" },
  { time: "12:18", seconds: 738, title: "Layanan kapal dan batas hukum" },
  { time: "15:58", seconds: 958, title: "Pendidikan biru dan budaya maritim" },
  { time: "17:13", seconds: 1033, title: "Rencana aksi dan tindak lanjut" },
];

export default function MainLearningVideo() {
  return (
    <section id="materi-utama" className={`${s.section} ${s.videoSection}`} aria-labelledby="main-video-title">
      <div className={s.splitHeading}>
        <div>
          <p className={s.eyebrow}>Materi utama · Video & PDF</p>
          <h2 id="main-video-title">Selat Malaka:<br />siapa yang sejahtera?</h2>
        </div>
        <p>Tonton video analisis ICSM 2026 dan unduh materi presentasi Cetak Biru Selat Malaka. Lanjutkan pendalaman melalui dokumen sumber dan matriks tindak lanjut.</p>
      </div>
      <div className={s.actions} aria-label="Materi utama yang dapat diunduh">
        <a className={s.buttonDark} href="/ismi-kepri/dokumen/cetak-biru-selat-malaka.pdf" download="Cetak_Biru_Selat_Malaka.pdf">Unduh Materi Utama (PDF) ↓</a>
        <a className={s.textLink} href="/ismi-kepri/dokumen/cetak-biru-selat-malaka.pdf" target="_blank" rel="noopener noreferrer">Buka PDF ↗<span className={s.srOnly}> (buka tab baru)</span></a>
        <span className={s.videoMeta}>Cetak Biru Selat Malaka · 15 halaman · 12,2 MB</span>
      </div>
      <div className={s.videoGrid}>
        <div>
          <div className={s.videoFrame}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/LZme5o0ybfQ?rel=0&hl=id"
              title="Selat Malaka: Siapa yang Sejahtera? — Analisis Mendalam ICSM 2026"
              width="1280"
              height="720"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className={s.videoMeta}>
            <span>19 menit 8 detik · Bahasa Indonesia · Subtitle</span>
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">Tonton di YouTube ↗<span className={s.srOnly}> (buka tab baru)</span></a>
          </div>
        </div>
        <aside className={s.videoOverview} aria-label="Tentang materi video">
          <p className={s.eyebrow}>Dari deklarasi menuju aksi</p>
          <h3>Laut sebagai ruang hidup bersama.</h3>
          <p>Dialog pembelajaran tentang keadilan masyarakat pesisir, ekonomi biru, pendidikan, dan pelaksanaan hasil konferensi.</p>
          <p className={s.videoAuthor}><strong>Dr. Hos Arie Sibarani</strong><br />Dewan Pakar ISMI Kepulauan Riau</p>
          <a className={s.textLink} href="/ismi-kepri/icsm-2026#dokumen">Dalami analisis & dokumen ↓</a>
          <a className={s.textLink} href="/ismi-kepri/icsm-2026#tindak-lanjut">Buka matriks tindak lanjut ↓</a>
        </aside>
      </div>
      <nav className={s.videoChapters} aria-label="Pilih bagian video di YouTube">
        {chapters.map((chapter) => (
          <a key={chapter.seconds} href={`${videoUrl}&t=${chapter.seconds}s`} target="_blank" rel="noopener noreferrer">
            <span>{chapter.time}</span><strong>{chapter.title}</strong><span className={s.srOnly}> — buka di YouTube, tab baru</span>
          </a>
        ))}
      </nav>
      <p className={s.sourceNote}>Video analisis disajikan sebagai dialog pembelajaran berbantuan AI. Penanda waktu membuka bagian terkait di YouTube. Dokumen konferensi dan rancangan tindak lanjut tersedia untuk pendalaman.</p>
    </section>
  );
}
