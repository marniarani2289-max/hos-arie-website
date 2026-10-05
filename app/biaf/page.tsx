import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BiafHeader from "./BiafHeader";
import CollaborationForm from "./CollaborationForm";
import styles from "./biaf.module.css";

export const metadata: Metadata = {
  title: { absolute: "BIAF — Batam International Academic Forum" },
  description: "Mengenal BIAF: inisiatif jejaring akademik lintas disiplin dari Batam. Profil, arah keilmuan, rancangan tata kelola, dan peluang kolaborasi.",
  alternates: { canonical: "/biaf" },
  openGraph: {
    title: "BIAF — Batam International Academic Forum",
    description: "Dari Batam, mempertemukan gagasan. Jelajahi profil, keilmuan, tata kelola, dan ruang kolaborasi BIAF.",
    url: "https://www.hossibarani.com/biaf",
    siteName: "BIAF · hossibarani.com",
    type: "website",
    locale: "id_ID",
    images: [{ url: "/biaf/opengraph-image", width: 1200, height: 630, alt: "Batam International Academic Forum" }],
  },
  twitter: { card: "summary_large_image", title: "BIAF — Batam International Academic Forum", description: "Dari Batam, mempertemukan gagasan.", images: ["/biaf/opengraph-image"] },
  icons: { icon: "/biaf/favicon.svg", shortcut: "/biaf/favicon.svg" },
};

export default function BiafPage() {
  return <div lang="id" className={styles.site} id="biaf-top">
    <a className="skip" href="#biaf-content">Langsung ke isi BIAF</a>
    <BiafHeader />
    <div id="biaf-content">
<section className="hero" aria-labelledby="hero-title">
 <div className="hero-inner">
  <div className="hero-copy"><p className="eyebrow light"><span className="tiny-line"></span> BATAM · KEPULAUAN RIAU · INDONESIA</p>
   <h1 id="hero-title">Dari Batam,<br />mempertemukan<br /><em>gagasan.</em></h1>
   <p className="hero-description">Ruang kolaborasi lintas disiplin untuk menghubungkan pengetahuan, memperluas jejaring, dan menumbuhkan kontribusi bagi masyarakat.</p>
   <div className="actions"><a className="button gold" href="#profil">Mengenal BIAF <span aria-hidden="true">↗</span></a><a className="text-link" href="#kolaborasi">Temukan ruang kolaborasi <span aria-hidden="true">→</span></a></div>
  </div>
  <div className="hero-art hero-art-image">
   <Image
     src="/biaf/hero-network.jpg"
     width={2048}
     height={1021}
     priority
     sizes="(max-width: 900px) 850px, 115vw"
     className="hero-reference-image"
     alt="Ilustrasi bola dunia dengan jejaring cahaya yang menghubungkan Batam dan dunia."
   />
  </div>
 </div>
 <div className="hero-bottom"><span><span className="status-dot"></span> Inisiatif dalam pengembangan</span><span>Pengetahuan melampaui batas <span aria-hidden="true">↓</span></span></div>
</section>
<section id="profil" className="section profile">
 <div className="section-label"><span>01 / MENGENAL BIAF</span><span className="rule"></span></div>
 <div className="intro-grid"><h2>Sebuah titik temu.<br /><em>Banyak kemungkinan.</em></h2><div className="body-copy"><p className="lead">Batam International Academic Forum dirancang sebagai wadah perjumpaan akademisi, peneliti, pendidik, praktisi, dan lembaga yang ingin bekerja lintas disiplin dan lintas negara.</p><p>Berangkat dari Batam, BIAF ingin mempertemukan persoalan lokal dan kepulauan dengan percakapan akademik yang lebih luas. Dialog ilmiah, penelitian bersama, dan pertukaran pengetahuan menjadi arah pengembangannya.</p><p className="small-note">BIAF saat ini berada pada tahap pengembangan konsep dan jejaring. Struktur pengurus, program, serta kemitraan akan diumumkan setelah ditetapkan.</p></div></div>
 <div className="purpose-grid"><div className="purpose"><span className="mini-label">VISI YANG DITUJU</span><h3>Ilmu yang terhubung.<br />Kontribusi yang bermakna.</h3><p>Menjadi ruang kolaborasi akademik yang terbuka, berintegritas, dan relevan bagi masyarakat, dengan perspektif kepulauan dan jangkauan internasional.</p></div><div className="missions"><h3>Langkah yang ingin kita bangun</h3><ol><li><span>01</span> Mempertemukan keahlian melalui dialog lintas disiplin.</li><li><span>02</span> Mengembangkan penelitian dan pertukaran pengetahuan.</li><li><span>03</span> Menghubungkan gagasan akademik dengan kebutuhan masyarakat.</li><li><span>04</span> Menumbuhkan kemitraan yang setara dan berkelanjutan.</li></ol></div></div>
</section>
<section id="keilmuan" className="section disciplines">
 <div className="section-label"><span>02 / ARAH KEILMUAN</span><span className="rule"></span></div>
 <div className="section-heading"><h2>Lintas disiplin.<br /><em>Saling memperkaya.</em></h2><p>Enam rumpun awal untuk membuka percakapan. Setiap rumpun dapat bertemu dalam agenda riset dan kegiatan bersama.</p></div>
 <div className="discipline-grid">
  <article><span className="index">01</span><h3>Hukum & tata kelola</h3><p>Konstitusi, kebijakan publik, kelembagaan, akses keadilan, serta tata kelola yang bertanggung jawab.</p><span className="topic">HUKUM · KEBIJAKAN · KELEMBAGAAN</span></article>
  <article><span className="index">02</span><h3>Pendidikan & pembelajaran</h3><p>Praktik pembelajaran berbasis bukti, pengembangan pendidik, pemerataan akses, dan pendidikan kepulauan.</p><span className="topic">PENDIDIK · PEMBELAJARAN · AKSES</span></article>
  <article><span className="index">03</span><h3>Ekonomi & kewirausahaan</h3><p>Ekonomi daerah, tata kelola usaha, kewirausahaan, dan pengembangan ekonomi yang inklusif.</p><span className="topic">USAHA · INKLUSI · PEMBANGUNAN</span></article>
  <article><span className="index">04</span><h3>Teknologi & masyarakat</h3><p>Kecerdasan artifisial, transformasi digital, etika teknologi, dan dampaknya bagi kehidupan sosial.</p><span className="topic">AI · ETIKA · TRANSFORMASI DIGITAL</span></article>
  <article><span className="index">05</span><h3>Maritim & keberlanjutan</h3><p>Ekonomi biru, masyarakat pesisir, lingkungan, dan ketahanan wilayah kepulauan.</p><span className="topic">PESISIR · EKONOMI BIRU · LINGKUNGAN</span></article>
  <article><span className="index">06</span><h3>Budaya & hubungan kawasan</h3><p>Tradisi intelektual Melayu, kebudayaan, hubungan antarwilayah, dan dialog akademik Asia Tenggara.</p><span className="topic">MELAYU · KEBUDAYAAN · KAWASAN</span></article>
 </div>
 <aside className="research-note"><span aria-hidden="true">↗</span><p><strong>Berangkat dari pertanyaan bersama.</strong> Misalnya: bagaimana hukum, teknologi, dan pendidikan dapat mendukung keberlanjutan masyarakat kepulauan?</p></aside>
</section>
<section id="tata-kelola" className="section governance">
 <div className="section-label"><span>03 / TATA KELOLA</span><span className="rule"></span></div>
 <div className="section-heading"><h2>Kepercayaan dibangun<br /><em>melalui cara bekerja.</em></h2><p>Rancangan tata kelola BIAF memisahkan arah akademik, pelaksanaan program, dan pengelolaan sumber daya dengan tanggung jawab yang jelas.</p></div>
 <div className="governance-grid"><div className="principles"><span className="mini-label">PRINSIP DASAR</span><h3>Terbuka dalam dialog.<br />Teguh dalam integritas.</h3><ul><li><strong>Integritas akademik</strong><span>Keaslian karya, ketepatan atribusi, dan keterbukaan tentang konflik kepentingan.</span></li><li><strong>Akuntabilitas</strong><span>Mandat, keputusan, penggunaan dana, dan hasil kegiatan terdokumentasi.</span></li><li><strong>Kemandirian ilmiah</strong><span>Kemitraan mendukung kegiatan tanpa mengendalikan kesimpulan akademik.</span></li><li><strong>Inklusivitas</strong><span>Ruang partisipasi yang menghargai perbedaan disiplin, latar belakang, dan pandangan.</span></li></ul></div>
 <div className="structure"><p className="structure-label">RANCANGAN FUNGSI ORGANISASI</p>
 <details open><summary><span><small>01</small>Dewan Penasihat</span><span className="expand">+</span></summary><p>Memberikan masukan strategis, menjaga kesesuaian arah pengembangan dengan visi, dan membantu memperluas jejaring. Tidak menjalankan operasional harian.</p></details>
 <details><summary><span><small>02</small>Dewan Akademik</span><span className="expand">+</span></summary><p>Merumuskan prioritas keilmuan, menilai mutu usulan kegiatan, serta menyusun standar etika dan penelaahan akademik. Anggota mengungkapkan konflik kepentingan dan tidak menilai usulan yang melibatkan dirinya.</p></details>
 <details><summary><span><small>03</small>Pengurus Pelaksana</span><span className="expand">+</span></summary><p>Menerjemahkan arah strategis menjadi rencana kerja, anggaran, dan kegiatan. Menyiapkan keputusan operasional serta menyampaikan laporan pelaksanaan dan keuangan secara berkala.</p></details>
 <details><summary><span><small>04</small>Sekretariat & Keuangan</span><span className="expand">+</span></summary><p>Mengelola administrasi, korespondensi, dokumentasi, pencatatan keuangan, dan pelaporan. Pengajuan, persetujuan, dan pencatatan transaksi dirancang memiliki pemeriksaan berjenjang.</p></details>
 <details><summary><span><small>05</small>Kelompok Keilmuan & Kemitraan</span><span className="expand">+</span></summary><p>Mengembangkan diskusi tematik, usulan riset, dan hubungan dengan calon mitra. Setiap kegiatan memiliki penanggung jawab, tujuan, keluaran, serta evaluasi yang jelas.</p></details>
 <p className="small-note">Struktur di atas merupakan rancangan fungsi, bukan daftar pengurus yang telah ditetapkan. Susunan personalia dan ketentuan organisasi akan ditampilkan setelah pengesahan internal.</p></div></div>
 <div className="process"><h3>Dari gagasan ke pertanggungjawaban</h3><div><span><b>01</b>Usulan kegiatan</span><span><b>02</b>Telaah akademik</span><span><b>03</b>Persetujuan & pelaksanaan</span><span><b>04</b>Evaluasi & pelaporan</span></div></div>
</section>
<section id="kolaborasi" className="collaboration section">
 <div className="section-label"><span>04 / AJAKAN KOLABORASI</span><span className="rule"></span></div>
 <div className="collab-grid"><div><p className="eyebrow light">RUANGNYA TERBUKA. MULAI DARI SATU GAGASAN.</p><h2>Mari membangun<br />sesuatu yang<br /><em>bermakna.</em></h2><p className="collab-intro">Kami mengundang akademisi, peneliti, praktisi, perguruan tinggi, komunitas, dan lembaga untuk menjajaki pengembangan BIAF.</p><div className="collab-options"><span>Diskusi & forum ilmiah</span><span>Riset lintas disiplin</span><span>Pertukaran pengetahuan</span><span>Kemitraan kelembagaan</span></div><p className="collab-note">Mulai dengan menyampaikan keahlian, persoalan yang ingin dijawab, atau bentuk kontribusi yang dapat dikerjakan bersama.</p></div>
 <CollaborationForm /></div>
</section>
<section className="closing"><p>Berakar di Batam. Terbuka bagi dunia.</p><span>CONNECTING MINDS. ADVANCING KNOWLEDGE.</span></section>

<footer><div className="footer-main"><a className="brand" href="#biaf-top"><span className="mark">b<span>ı</span>af<span className="dot">.</span></span><span className="brand-name">BATAM INTERNATIONAL<br />ACADEMIC FORUM</span></a><p>Inisiatif jejaring akademik lintas disiplin.<br />Batam, Kepulauan Riau, Indonesia.</p><Link href="/id">Kembali ke hossibarani.com ↗</Link></div><div className="footer-bottom"><span>© 2026 BIAF · Profil pengembangan</span><span>Integritas · Keterbukaan · Kolaborasi</span><a href="#biaf-top">Kembali ke atas ↑</a></div></footer>
    </div>
  </div>;
}
