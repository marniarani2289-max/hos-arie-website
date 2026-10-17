import type { Metadata } from "next";
import Link from "next/link";
import BiafHeader from "../BiafHeader";
import CollaborationForm from "../CollaborationForm";
import styles from "../biaf.module.css";
import summitStyles from "./summit.module.css";

const title = "The 1st ASEAN Scholarly Publishing Summit | BIAF";
const description = "Rancangan program BIAF yang diinisiasi RAHRN di Batam: integritas publikasi, tata kelola AI, dan kolaborasi penerbitan ilmiah Asia Tenggara.";
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: "/biaf/summit" },
  openGraph: { title, description, url: "https://www.hossibarani.com/biaf/summit", siteName: "BIAF · hossibarani.com", locale: "id_ID", type: "website", images: [{ url: "/biaf/opengraph-image", width: 1200, height: 630, alt: "Batam International Academic Forum" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/biaf/opengraph-image"] },
  icons: { icon: "/biaf/favicon.svg" },
};

const pillars = [
  { number: "01", title: "Integritas publikasi", question: "Bagaimana kebijakan editorial yang transparan, terukur, dan akuntabel dapat diterapkan dalam pekerjaan sehari-hari?", items: ["Mutu peer review, kualifikasi reviewer, dan rekam keputusan editorial.", "Kontribusi penulis, keterbukaan konflik kepentingan, dan transparansi biaya publikasi.", "Prosedur penanganan pelanggaran etika, koreksi, penarikan artikel, dan hak jawab."], output: "Draf checklist evaluasi kebijakan editorial." },
  { number: "02", title: "Tata kelola AI", question: "Bagaimana memanfaatkan AI sambil menjaga kerahasiaan naskah, integritas data, dan pengawasan manusia?", items: ["Deklarasi penggunaan AI dan batas perannya dalam kepengarangan.", "Verifikasi referensi dan data; perlindungan naskah yang belum diterbitkan.", "Akuntabilitas editor manusia atas penilaian substansi dan keputusan publikasi."], output: "Draf pedoman dan klausul etika AI untuk jurnal peserta." },
  { number: "03", title: "Kolaborasi kawasan", question: "Instrumen kemitraan apa yang paling dapat diterapkan untuk memperkuat kapasitas pengelola jurnal di Asia Tenggara?", items: ["Pertukaran praktik baik dan pengembangan jejaring editor serta reviewer.", "Klinik metadata, infrastruktur penerbitan, dan kesiapan pengindeksan.", "Pemetaan kebutuhan mitra, narahubung institusi, dan rencana pendampingan."], output: "Peta minat kolaborasi dan agenda awal pendampingan lintas institusi." },
];
const team = [
  ["Dr. Albert Efendi Pohan", "Ketua Pelaksana", "Koordinasi umum, pembagian kerja lintas fungsi, jadwal kerja, dan kesiapan operasional."],
  ["Dr. Fadhila Yonata", "Program Akademik", "Kerangka ilmiah, rancangan sesi, kurasi narasumber, dan penjaminan mutu luaran akademik."],
  ["Eva Amalia", "Kemitraan & Hubungan Kelembagaan", "Pemetaan calon mitra, komunikasi penjajakan, perumusan peran, dan dokumentasi kemitraan."],
];
const outputs = [
  ["Rekomendasi Summit", "Executive summary atau policy brief 3–5 halaman tentang etika dan penguatan mutu penerbitan ilmiah kawasan."],
  ["Perangkat evaluasi editorial", "Checklist audit mandiri tata kelola jurnal dan draf klausul etika AI yang dapat diadaptasi."],
  ["Peta minat kolaborasi", "Matriks kebutuhan mitra, profil jurnal peserta, dan agenda awal peer mentoring atau sister journal."],
  ["Evaluasi & tindak lanjut", "Umpan balik peserta dan linimasa tindak lanjut untuk menjaga keberlanjutan kerja sama."],
];

export default function SummitPage() {
  return <div lang="id" className={`${styles.site} ${summitStyles.summit}`} id="summit-top">
    <a className="skip" href="#summit-content">Langsung ke isi Summit</a>
    <BiafHeader />
    <div id="summit-content">
      <section className={summitStyles.hero} aria-labelledby="summit-title">
        <div className={summitStyles.heroCopy}>
          <Link className={summitStyles.breadcrumb} href="/biaf">BIAF / Program akademik</Link>
          <p className="eyebrow light">BATAM, INDONESIA · INISIATIF RAHRN</p>
          <h1 id="summit-title">The 1st ASEAN<br /><em>Scholarly Publishing</em><br />Summit</h1>
          <p className={summitStyles.subtitle} lang="en">Advancing Scholarly Publishing through Integrity, AI Governance, and Regional Collaboration</p>
          <p className={summitStyles.intro}>Forum yang dirancang untuk menghubungkan dialog akademik, klinik editorial, dan kerja sama penerbitan ilmiah di Asia Tenggara.</p>
          <div className="actions"><a className="button gold" href="#agenda">Lihat rancangan agenda <span aria-hidden="true">↓</span></a><a className="text-link" href="#kemitraan">Jajaki kemitraan <span aria-hidden="true">↗</span></a></div>
        </div>
        <aside className={summitStyles.brief} aria-label="Status dan gambaran kegiatan">
          <span className={summitStyles.badge}>WORKING DRAFT / DRAF KONSULTATIF</span>
          <p className={summitStyles.version}>Berdasarkan kerangka versi 1.1 · Oktober 2026</p>
          <dl><div><dt>Penyelenggara</dt><dd>Batam International Academic Forum</dd></div><div><dt>Penggagas inisiatif</dt><dd>Raja Ali Haji Research Network</dd></div><div><dt>Rancangan format</dt><dd>2 hari · Dialog, klinik & roundtable</dd></div><div><dt>Sasaran awal</dt><dd>60–100 delegasi</dd></div><div><dt>Bahasa kerja</dt><dd>Inggris; dukungan Indonesia/Melayu sesuai kebutuhan klinik</dd></div></dl>
          <p className={summitStyles.status}>Tanggal dan tempat spesifik belum ditetapkan. Skala kegiatan, narasumber, serta kemitraan akan disesuaikan setelah konfirmasi. Pendaftaran peserta belum dibuka.</p>
        </aside>
      </section>
      <div className={summitStyles.sectionLinks} aria-label="Bagian halaman Summit"><a href="#kerangka">Kerangka akademik</a><a href="#agenda">Agenda</a><a href="#luaran">Luaran</a><a href="#tim">Tim inti</a><a href="#kemitraan">Kemitraan</a></div>
      <section id="kerangka" className="section">
        <div className="section-label"><span>01 / KERANGKA AKADEMIK</span><span className="rule" /></div>
        <div className="section-heading"><h2>Mutu penerbitan.<br /><em>Tanggung jawab bersama.</em></h2><p>Ketiga pilar menjadi dasar perumusan sesi, pemilihan narasumber, dan rekomendasi tindak lanjut. Forum ditujukan bagi editor, manajer jurnal, reviewer, peneliti, pimpinan riset perguruan tinggi, serta penyedia infrastruktur teknologi.</p></div>
        <div className={summitStyles.cards}>{pillars.map(p => <article className={summitStyles.card} key={p.number}><span className="index">{p.number}</span><h3>{p.title}</h3><p className={summitStyles.question}>{p.question}</p><ul>{p.items.map(item => <li key={item}>{item}</li>)}</ul><p className={summitStyles.output}><strong>Luaran sesi</strong>{p.output}</p></article>)}</div>
        <p className={summitStyles.note}>Penguatan kesiapan indeksasi berfokus pada mutu tata kelola. Keputusan penerimaan tetap menjadi kewenangan independen setiap lembaga pengindeks.</p>
      </section>
      <section id="agenda" className="section disciplines">
        <div className="section-label"><span>02 / RANCANGAN PROGRAM</span><span className="rule" /></div>
        <div className="section-heading"><h2>Dua hari.<br /><em>Dari dialog ke tindak lanjut.</em></h2><p>Susunan awal untuk konsultasi akademik dan penjajakan mitra. Jadwal rinci serta pembicara akan diumumkan setelah ditetapkan.</p></div>
        <div className={summitStyles.agenda}>
          <article><span className="mini-label">HARI 01</span><h3>Simposium pleno & dialog akademik</h3><ol><li><strong>Pagi</strong><span>Pidato kunci dan Pleno I: standar integritas publikasi.</span></li><li><strong>Siang</strong><span>Pleno II: tata kelola AI, hak kekayaan intelektual, dan akuntabilitas penelaahan.</span></li><li><strong>Sore</strong><span>Panel kebijakan regional: lanskap dan tantangan jurnal Asia Tenggara.</span></li></ol></article>
          <article><span className="mini-label">HARI 02</span><h3>Lokakarya teknis & konsensus kebijakan</h3><ol><li><strong>Pagi</strong><span>Klinik paralel: tata kelola naskah, integritas data, dan audit kesiapan indeksasi.</span></li><li><strong>Siang</strong><span>ASEAN Editors’ Roundtable: konsolidasi agenda kerja sama dan perumusan rekomendasi awal bersama.</span></li></ol></article>
        </div>
      </section>
      <section id="luaran" className="section">
        <div className="section-label"><span>03 / LUARAN YANG DITUJU</span><span className="rule" /></div>
        <div className="section-heading"><h2>Hasil yang dapat<br /><em>ditindaklanjuti.</em></h2><p>Rancangan keluaran diarahkan pada perangkat kerja yang dapat digunakan peserta dan menjadi dasar kolaborasi setelah forum.</p></div>
        <div className={summitStyles.outputs}>{outputs.map(([name, text], i) => <article key={name}><span className="index">0{i + 1}</span><h3>{name}</h3><p>{text}</p></article>)}</div>
      </section>
      <section id="tim" className="section disciplines">
        <div className="section-label"><span>04 / TATA KELOLA PENYELENGGARAAN</span><span className="rule" /></div>
        <div className="section-heading"><h2>Peran yang jelas.<br /><em>Kerja yang terarah.</em></h2><p>Rancangan tim pelaksana inti Summit di bawah payung BIAF, dengan inisiasi RAHRN. Penetapan tim dan fungsi pendukung mengikuti proses konsolidasi serta keputusan kepanitiaan definitif.</p></div>
        <div className={summitStyles.cards}>{team.map(([name, role, text]) => <article className={summitStyles.card} key={name}><span className="mini-label">{role}</span><h3>{name}</h3><p>{text}</p></article>)}</div>
        <p className={summitStyles.note}>Dewan Pengarah/Penasihat Akademik dalam proses konfirmasi. Sekretariat, kehumasan, bendahara, dan logistik akan dilengkapi dalam SK kepanitiaan definitif.</p>
      </section>
      <section id="kemitraan" className="section">
        <div className="section-label"><span>05 / PENJAJAKAN KEMITRAAN</span><span className="rule" /></div>
        <div className="section-heading"><h2>Dari Batam,<br /><em>menghubungkan kawasan.</em></h2><p>Penjajakan awal berfokus pada Indonesia, Malaysia, dan Singapura, dengan prinsip kesetaraan, kontribusi substantif, dan keberlanjutan program.</p></div>
        <div className={summitStyles.cards}>
          <article className={summitStyles.card}><span className="index">01</span><h3>Perguruan tinggi & konsorsium akademik</h3><p>Kontribusi keahlian, delegasi, pertukaran editor, dan dukungan akademik. JournalMu tercantum dalam rencana penjajakan untuk diskusi praktik pengelolaan jurnal berbasis konsorsium.</p></article>
          <article className={summitStyles.card}><span className="index">02</span><h3>Editor, jurnal & jejaring penelitian</h3><p>Pertukaran praktik baik, pemetaan kebutuhan jurnal, dan perintisan pendampingan lintas institusi serta negara.</p></article>
          <article className={summitStyles.card}><span className="index">03</span><h3>Teknologi penerbitan</h3><p>Demonstrasi perangkat pendukung editorial, konsultasi infrastruktur OJS/XML, dan dialog tata kelola serta perlindungan data.</p></article>
        </div>
        <p className={summitStyles.note}>Seluruh peran dan negara sasaran berstatus rencana penjajakan. Pencantuman nama entitas tidak menyatakan komitmen kerja sama atau kehadiran delegasi yang telah terkonfirmasi.</p>
        <div className={summitStyles.nextSteps}><h3>Tahapan persiapan</h3><ol><li><strong>Konsolidasi mandat & tim</strong><span>Penetapan tim kerja, pembagian peran, dan tata cara koordinasi.</span></li><li><strong>Penjajakan kemitraan</strong><span>Pembahasan concept note dan bentuk kontribusi calon mitra.</span></li><li><strong>Finalisasi operasional</strong><span>Penetapan anggaran, tempat, tanggal, serta undangan setelah kesiapan minimum terpenuhi.</span></li></ol></div>
      </section>
      <section id="minat-kolaborasi" className="collaboration section">
        <div className="section-label"><span>06 / MULAI PERCAKAPAN</span><span className="rule" /></div>
        <div className="collab-grid"><div><p className="eyebrow light">KONTRIBUSI AKADEMIK · KEMITRAAN · PENDAMPINGAN</p><h2>Mari menyusun<br /><em>langkah bersama.</em></h2><p className="collab-intro">Sampaikan bidang keahlian, kebutuhan jurnal, atau bentuk dukungan institusi Anda. Ringkasan ini dapat menjadi bahan pembicaraan awal mengenai Summit.</p><p className={summitStyles.contactNote}>Untuk komunikasi langsung, gunakan <Link href="/id/contact">halaman kontak Hos Arie ↗</Link>.</p></div><CollaborationForm summit /></div>
      </section>
      <section className="closing"><p>Integritas. Tata kelola. Kolaborasi.</p><span>BIAF · INITIATED BY RAHRN · BATAM, INDONESIA</span></section>
      <footer><div className="footer-main"><Link className="brand" href="/biaf"><span className="mark">bıaf<span className="dot">.</span></span><span className="brand-name">BATAM INTERNATIONAL<br />ACADEMIC FORUM</span></Link><p>ASEAN Scholarly Publishing Summit<br />Program dalam pengembangan · Draf konsultatif</p><Link href="/biaf">Kembali ke profil BIAF ↗</Link></div><div className="footer-bottom"><span>© 2026 BIAF · Inisiasi RAHRN</span><span>Kerangka akademik versi 1.1 · Oktober 2026</span><a href="#summit-top">Kembali ke atas ↑</a></div></footer>
    </div>
  </div>;
}
