import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, BookOpen, Compass, Play, Radio, Waves } from "lucide-react";
import { dimensions, principles, sources, subjects, weeks } from "./content";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Pendidikan Biru (Blue Education)",
  description: "Pendidikan Biru (Blue Education): literasi laut, model konseptual Kepulauan Riau, pendekatan sekolah menyeluruh, dan panduan proyek delapan minggu. Dr. Hos Arie Sibarani.",
  alternates: { canonical: "/blue-education" },
  openGraph: { title: "Pendidikan Biru (Blue Education)", description: "Belajar tentang, melalui, dan untuk keberlanjutan perairan. Konsep dan penerapan dalam konteks Kepulauan Riau.", url: "/blue-education", locale: "id_ID", type: "website", images: ["/og-image.jpg"] },
  twitter: { title: "Pendidikan Biru (Blue Education)", description: "Literasi laut, model Kepulauan Riau, dan proyek pembelajaran berbasis bukti.", images: ["/og-image.jpg"] },
};

const nav = [["materi-utama", "Materi utama"], ["dialog-publik", "Dialog publik"], ["konsep", "Konsep"], ["kepri", "Model Kepri"], ["sekolah", "Sekolah & kurikulum"], ["proyek", "Proyek 8 minggu"], ["evaluasi", "Evaluasi"], ["rujukan", "Rujukan"]] as const;

function SectionHeading({ number, label, title, children }: { number: string; label: string; title: string; children?: React.ReactNode }) {
  return <div className={s.sectionHeading}><p className={s.eyebrow}><span>{number}</span>{label}</p><h2>{title}</h2>{children && <p className={s.lead}>{children}</p>}</div>;
}

export default function BlueEducationPage() {
  return <article lang="id" className={s.page}>
    <a className={s.skipLink} href="#materi-utama">Langsung ke materi utama Pendidikan Biru</a>
    <section className={s.hero} aria-labelledby="blue-title">
      <div className={`${s.container} ${s.heroGrid}`}>
      <div className={s.heroContent}>
        <p className={s.eyebrow}><Waves size={22} aria-hidden="true" />Pembelajaran · Kepulauan · Keberlanjutan</p>
        <h1 id="blue-title">Pendidikan Biru <span>(Blue Education)</span></h1>
        <p className={s.heroStatement}>Belajar dari perairan.<br />Bertindak untuk masa depan.</p>
        <p className={s.heroDescription}>Menghubungkan literasi laut, penghidupan masyarakat, budaya maritim, dan tata kelola melalui pendidikan yang berakar pada kawasan.</p>
        <p className={s.author}>Dr. Hos Arie Sibarani</p>
        <div className={s.actions}><a className={s.primaryButton} href="#materi-utama"><Play size={18} aria-hidden="true" />Tonton materi utama</a><a className={s.lightButton} href="#proyek">Lihat proyek 8 minggu <ArrowUpRight size={18} aria-hidden="true" /></a></div>
      </div>
      <figure className={s.heroMap}>
        <Image src="/blue-education/kepri-atlas.svg" alt="Peta orientasi Kepulauan Riau dengan penanda Karimun, Batam, Bintan, Tanjungpinang, Lingga, Kepulauan Anambas, dan Natuna; gugus Tambelan juga ditampilkan." width={760} height={650} priority unoptimized className={s.mapImage} />
        <figcaption className={s.mapCaption}>
          <span>Dari pulau ke pulau, satu ruang belajar.</span>
          <small>© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> · <a href="https://www.geoboundaries.org/" target="_blank" rel="noopener noreferrer">geoBoundaries</a> · <a href="/blue-education/kepri-map-sources.md" target="_blank" rel="noopener noreferrer">Sumber peta</a></small>
        </figcaption>
      </figure>
      </div>
    </section>

    <nav className={s.sectionNav} aria-label="Daftar isi Pendidikan Biru"><div className={s.container}>{nav.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div></nav>

    <section id="materi-utama" className={`${s.section} ${s.tinted}`} aria-labelledby="main-video-title"><div className={s.container}>
      <div className={s.sectionHeading}>
        <p className={s.eyebrow}><Play size={20} aria-hidden="true" />Materi utama · Video pembelajaran</p>
        <h2 id="main-video-title">Laut jadi ruang kelas.</h2>
        <p className={s.lead}>Mulai dari video Pendidikan Biru (Blue Education) untuk memahami literasi laut, model Kepulauan Riau, dan penerapannya melalui proyek delapan minggu.</p>
      </div>
      <div className={s.videoFrame}>
        <iframe
          src="https://www.youtube-nocookie.com/embed/spkT2Ayj8GE?rel=0&hl=id"
          title="Materi utama: Laut Jadi Ruang Kelas? Pendidikan Biru (Blue Education) di Kepulauan Riau"
          width="1280"
          height="720"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className={s.videoDetails}>
        <p>Materi Dr. Hos Arie Sibarani <span aria-hidden="true">·</span> Hukumpreneur <span aria-hidden="true">·</span> 15 menit</p>
        <a href="https://youtu.be/spkT2Ayj8GE" target="_blank" rel="noopener noreferrer">Buka di YouTube <ArrowUpRight size={18} aria-hidden="true" /><span className={s.srOnly}> (buka tab baru)</span></a>
      </div>
      <a className={s.videoContinue} href="#dialog-publik">Perdalam melalui dialog publik <ArrowDown size={18} aria-hidden="true" /></a>
    </div></section>

    <section id="dialog-publik" className={`${s.section} ${s.dialogueSection}`} aria-labelledby="dialogue-title"><div className={s.container}>
      <div className={s.sectionHeading}>
        <p className={s.eyebrow}><Radio size={20} aria-hidden="true" />Dialog Publik Blue Education</p>
        <h2 id="dialogue-title">Menghidupkan Blue Education di Bumi Segantang Lada.</h2>
        <p className={s.lead}>Dari konsep ke percakapan publik. Perdalam pembelajaran melalui rekaman Sembang Komunitas RRI Pro 4 Tanjungpinang, lalu hubungkan gagasannya dengan kehidupan sekolah dan masyarakat Kepulauan Riau.</p>
      </div>
      <div className={s.videoFrame}>
        <iframe
          src="https://www.youtube-nocookie.com/embed/nTigo6q7y20?rel=0&hl=id"
          title="Dialog Publik Blue Education: Menghidupkan Blue Education di Bumi Segantang Lada — Sembang Komunitas RRI Pro 4 Tanjungpinang"
          width="1280"
          height="720"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className={s.videoDetails}>
        <p>Sembang Komunitas <span aria-hidden="true">·</span> RRI Pro 4 Tanjungpinang <span aria-hidden="true">·</span> <time dateTime="2026-09-23">23 September 2026</time></p>
        <a href="https://www.youtube.com/live/nTigo6q7y20" target="_blank" rel="noopener noreferrer">Buka dialog di YouTube <ArrowUpRight size={18} aria-hidden="true" /><span className={s.srOnly}> (buka tab baru)</span></a>
      </div>
      <div className={`${s.introGrid} ${s.dialogueContext}`}>
        <div>
          <h3>Narasumber &amp; pemandu</h3>
          <ul className={s.speakerList}>
            <li><strong>Dr. Hos Arie Sibarani</strong><span>Akademisi dan pemerhati sosial, politik, dan budaya</span></li>
            <li><strong>Mustamid, S.Si.</strong><span>Pemerhati pendidikan · PERSIS Kota Tanjungpinang</span></li>
            <li><strong>Dr. Drs. Encik Abdul Hajar, M.M.</strong><span>Dosen Magister Pedagogi Pascasarjana UMRAH</span></li>
            <li><strong>Salwa</strong><span>Pemandu acara</span></li>
          </ul>
        </div>
        <aside className={s.callout} aria-labelledby="dialogue-reflection">
          <BookOpen size={26} aria-hidden="true" />
          <h3 id="dialogue-reflection">Refleksi setelah menonton</h3>
          <p>Apa satu perubahan yang dapat dilakukan sekolah dan masyarakat di sekitar kita untuk menjadikan perairan sebagai ruang belajar?</p>
          <p className={s.reflectionPrompt}>Catat satu gagasan dari dialog, tindakan yang ingin dicoba, pihak yang perlu dilibatkan, dan bukti yang akan digunakan untuk menilai hasilnya.</p>
          <a className={s.videoContinue} href="#proyek">Hubungkan dengan proyek 8 minggu <ArrowUpRight size={18} aria-hidden="true" /></a>
        </aside>
      </div>
      <a className={s.videoContinue} href="#konsep">Lanjutkan ke materi bacaan <ArrowDown size={18} aria-hidden="true" /></a>
    </div></section>

    <section id="konsep" className={`${s.container} ${s.section}`}>
      <SectionHeading number="01" label="Landasan" title="Hubungan manusia dan perairan sebagai ruang belajar.">Pendidikan Biru (Blue Education) dipahami di sini sebagai pendekatan pendidikan sistemis dan berbasis kawasan yang memperkuat pengetahuan, kepedulian, kompetensi, dan tanggung jawab manusia terhadap ekosistem laut serta perairan tawar.</SectionHeading>
      <div className={s.introGrid}>
        <div><p>Pendekatan ini mencakup pembelajaran di kelas, budaya sekolah, kapasitas pendidik, pengelolaan lembaga, dan kolaborasi masyarakat. Pengalaman belajar diarahkan pada keputusan serta tindakan yang dapat diperiksa dengan bukti.</p><p>Sekolah di pedalaman pun relevan: penggunaan air, konsumsi, sungai, dan saluran pembuangan menghubungkan kehidupan di darat dengan pesisir serta laut.</p></div>
        <aside className={s.callout}><BookOpen size={26} aria-hidden="true" /><h3>Dari mengetahui menjadi bertanggung jawab</h3><p>Keberhasilan terlihat pada pemahaman, perubahan praktik yang bertahan, dan keputusan lembaga. Manfaat ekonomi maupun ekologis jangka panjang perlu dibuktikan, bukan diasumsikan.</p></aside>
      </div>
      <div className={s.threeColumns}>{[
        ["Tentang perairan", "Memahami ekosistem, siklus air, iklim, serta hubungan manusia dan laut."],
        ["Melalui perairan", "Menggunakan lingkungan dan kehidupan maritim untuk belajar sains, bahasa, sejarah, matematika, dan teknologi."],
        ["Untuk perairan", "Mengambil keputusan etis, menguji solusi, dan merawat keberlanjutan bersama masyarakat."],
      ].map(([title, text], i) => <div className={s.learningMode} key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
      <details className={s.disclosure}><summary>Memahami istilah: literasi laut, Blue Curriculum, Blue School, dan ekonomi biru</summary><div className={s.detailBody}><dl className={s.definitionList}>{[
        ["Literasi laut (ocean literacy)", "Memahami pengaruh laut terhadap manusia dan pengaruh manusia terhadap laut; mengomunikasikannya dan mengambil keputusan yang bertanggung jawab."],
        ["Blue Curriculum", "Mengintegrasikan literasi laut dan keberlanjutan ke tujuan, isi, aktivitas, serta asesmen lintas mata pelajaran."],
        ["Blue School", "Menerapkan pembelajaran laut melalui keterlibatan peserta didik, praktik sekolah, dan hubungan dengan masyarakat. Status dalam jejaring resmi mengikuti kriteria penyelenggara."],
        ["Ekonomi biru", "Pemanfaatan sumber daya dan kegiatan ekonomi terkait perairan dengan perhatian pada keberlanjutan serta kesejahteraan. Pendidikan mendukung kompetensinya, tetapi tidak menjamin pendapatan."],
        ["Pendidikan untuk pembangunan berkelanjutan", "Kerangka lebih luas untuk membangun kompetensi keberlanjutan; Pendidikan Biru memberi konteks khusus hubungan manusia dengan perairan."],
      ].map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></div></details>
      <details className={s.disclosure}><summary>Tujuh prinsip literasi laut</summary><div className={s.detailBody}><ol className={s.principles}>{principles.map(p => <li key={p}>{p}</li>)}</ol><p className={s.small}>Ringkasan prinsip Ocean Literacy; lihat sumber National Park Service pada bagian rujukan.</p></div></details>
    </section>

    <section id="kepri" className={`${s.section} ${s.tinted}`}><div className={s.container}>
      <SectionHeading number="02" label="Konteks Kepulauan Riau" title="Empat dimensi. Satu kawasan yang saling terhubung.">Model konseptual ini menghubungkan kesehatan ekosistem dengan kehidupan masyarakat kepulauan. Empat dimensi dipelajari bersama sesuai persoalan setempat.</SectionHeading>
      <blockquote className={s.drivingQuestion}><span>Pertanyaan penggerak</span>Bagaimana masyarakat kepulauan meningkatkan kesejahteraan sambil menjaga kesehatan perairan dan keberlanjutan budayanya?</blockquote>
      <div className={s.dimensionGrid}>{dimensions.map(d => <article className={s.dimension} key={d.number}><div className={s.dimensionTop}><span>{d.number}</span><Waves size={24} aria-hidden="true" /></div><p className={s.small}>{d.subtitle}</p><h3>{d.title}</h3><p>{d.text}</p><div className={s.dimensionQuestion}>{d.question}</div><p className={s.example}><strong>Contoh kegiatan</strong>{d.example}</p></article>)}</div>
      <p className={s.modelNote}><Compass size={22} aria-hidden="true" /><span><strong>Status: rancangan konseptual.</strong> Kerangka empat dimensi ini merupakan usulan kontekstual untuk Kepulauan Riau yang perlu divalidasi bersama pendidik dan masyarakat. Ini bukan model resmi atau pernyataan sertifikasi UNESCO.</span></p>
    </div></section>

    <section id="sekolah" className={`${s.container} ${s.section}`}>
      <SectionHeading number="03" label="Blue School & Blue Curriculum" title="Perubahan belajar menjadi perubahan sekolah.">Pendekatan sekolah menyeluruh (whole-school approach) menyelaraskan pengalaman belajar, kebiasaan sehari-hari, kapasitas guru, dan keputusan kelembagaan.</SectionHeading>
      <div className={s.wholeSchool}>{[
        ["Kurikulum", "Tujuan belajar dan asesmen lintas disiplin berangkat dari persoalan perairan yang nyata."],
        ["Budaya & praktik", "Penggunaan air, konsumsi, dan pengelolaan sampah sekolah konsisten dengan materi yang dipelajari."],
        ["Kapasitas pendidik", "Guru merancang penyelidikan, membaca data, memfasilitasi dialog, serta merefleksikan hasil bersama."],
        ["Tata kelola & kemitraan", "Sekolah menyediakan waktu, sarana, anggaran yang relevan, ruang suara siswa, dan tindak lanjut bersama warga."],
      ].map(([title, text], i) => <div key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
      <div className={s.splitHeading}><div><h3>Kompetensi yang dikembangkan</h3><p>Nilai proses berpikir dan praktik, bukan hanya hafalan atau jumlah kegiatan.</p></div><ul className={s.competencies}>{["Pemahaman ekologi", "Penalaran kritis berbasis data", "Kepedulian dan pertimbangan etis", "Pemecahan masalah", "Kolaborasi dan partisipasi", "Inovasi serta usaha berkelanjutan"].map(x => <li key={x}>{x}</li>)}</ul></div>
      <details className={s.disclosure}><summary>Sesuaikan pembelajaran dengan jenjang dan konteks</summary><div className={s.detailBody}><dl className={s.definitionList}>{[
        ["PAUD & SD", "Cerita, permainan, pengamatan air dan sampah, serta kebiasaan merawat lingkungan dengan pendampingan."],
        ["SMP", "Audit sederhana, wawancara, pembacaan grafik, dan proyek kolaboratif berbasis lingkungan sekitar."],
        ["SMA & SMK", "Analisis sebab-akibat, teknologi tepat guna, rantai nilai, dan keterampilan vokasional sesuai bidang."],
        ["Perguruan tinggi", "Riset terapan, evaluasi program, pengabdian masyarakat, serta dukungan metodologi bagi sekolah."],
        ["Komunitas & pendidikan nonformal", "Pemecahan persoalan penghidupan dan lingkungan bersama pemilik pengetahuan lokal."],
      ].map(([term, text]) => <div key={term}><dt>{term}</dt><dd>{text}</dd></div>)}</dl></div></details>
    </section>

    <section id="proyek" className={`${s.section} ${s.projectSection}`}><div className={s.container}>
      <SectionHeading number="04" label="Panduan penerapan" title="Satu pertanyaan. Delapan minggu penyelidikan dan aksi.">Contoh proyek: “Ke mana sampah sekolah kita berakhir?” Gunakan urutan ini sebagai panduan yang dapat disesuaikan dengan kalender belajar, usia peserta, dan kondisi lokal.</SectionHeading>
      <div className={s.cycle} aria-label="Siklus pembelajaran"><div><span>01</span><strong>Selidiki</strong><p>Ukur kondisi awal dan cari penyebab.</p></div><div><span>02</span><strong>Bertindak</strong><p>Pilih serta uji perubahan yang layak.</p></div><div><span>03</span><strong>Evaluasi</strong><p>Ukur ulang, refleksikan, dan perbaiki.</p></div></div>
      <div className={s.weeks}>{weeks.map((week, i) => <details key={week.title} className={s.week} open={i === 0}><summary><span className={s.weekNumber}>Minggu {i + 1}</span><span className={s.weekTitle}>{week.title}</span><span className={s.phase}>{week.phase}</span><span className={s.plus} aria-hidden="true">+</span></summary><div className={s.weekBody}><p>{week.action}</p><div><h4>Bukti yang dihasilkan</h4><p>{week.evidence}</p></div><blockquote>{week.prompt}</blockquote></div></details>)}</div>
      <div className={s.curriculum}><h3>Satu proyek, banyak sudut pandang</h3><div>{subjects.map(([name, text]) => <article key={name}><h4>{name}</h4><p>{text}</p></article>)}</div></div>
    </div></section>

    <section id="evaluasi" className={`${s.container} ${s.section}`}>
      <SectionHeading number="05" label="Bukti & akuntabilitas" title="Ukur perubahan. Jelaskan batas kesimpulan.">Dokumentasikan apa yang dilaksanakan, apa yang dipelajari, dan praktik apa yang bertahan. Kontribusi jangka panjang memerlukan pengamatan serta dukungan lebih lanjut.</SectionHeading>
      <div className={s.evaluationGrid}>{[
        ["Pelaksanaan", "Apakah kegiatan berjalan?", "Catatan kehadiran, keterlaksanaan intervensi, keterlibatan warga, dan kendala."],
        ["Pembelajaran", "Apa yang berubah dalam pemahaman?", "Tugas awal–akhir, kualitas penalaran, portofolio, serta refleksi siswa."],
        ["Praktik & lembaga", "Apakah perubahan bertahan?", "Pengukuran berulang, prosedur sekolah, penanggung jawab, dan dukungan sumber daya."],
        ["Kontribusi jangka panjang", "Apa manfaat yang dapat dibuktikan?", "Data ekologi, penghidupan, atau pelestarian budaya dengan periode dan metode yang memadai."],
      ].map(([title, question, text]) => <article key={title}><p className={s.eyebrow}>{title}</p><h3>{question}</h3><p>{text}</p></article>)}</div>
      <aside className={s.evidenceNote}><h3>Perubahan sebelum–sesudah belum membuktikan sebab-akibat.</h3><p>Pertimbangkan musim, arus, jumlah pengunjung, kehadiran siswa, dan program lain. Gunakan pengukuran berulang serta pembanding bila layak. Berkurangnya sampah di sekolah belum membuktikan membaiknya kesehatan laut.</p><p>Demikian pula, kompetensi usaha tidak otomatis menghasilkan kemandirian ekonomi. Sarana produksi, pembiayaan, akses pasar, dan tata kelola turut menentukan hasil.</p></aside>
    </section>

    <section className={`${s.section} ${s.tinted}`} id="penerapan"><div className={s.container}>
      <SectionHeading number="06" label="Rencana satu semester" title="Mulai dari lingkup yang mampu ditindaklanjuti.">Bangun satu pilot yang jelas, pelajari hasilnya, lalu putuskan kelanjutannya bersama sekolah dan masyarakat.</SectionHeading>
      <ol className={s.roadmap}>{[
        ["Siapkan", "Bentuk tim, pilih kawasan atau masalah, petakan mitra, dan sepakati ruang partisipasi siswa."],
        ["Rancang", "Hubungkan tujuan kurikulum, indikator, instrumen baseline, waktu, dan sumber daya."],
        ["Laksanakan", "Jalankan proyek delapan minggu dengan pendampingan serta pencatatan yang konsisten."],
        ["Tinjau", "Evaluasi bukti dan keterbatasan; tetapkan perbaikan, keberlanjutan, atau perluasan yang layak."],
      ].map(([title, text], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
      <div className={s.twoColumns}>
        <details className={s.disclosure}><summary>Siapa berperan dalam kolaborasi?</summary><div className={s.detailBody}><ul className={s.bulletList}><li><strong>Siswa:</strong> merumuskan pertanyaan, mengumpulkan bukti, menguji aksi, dan menyampaikan usulan.</li><li><strong>Guru dan pimpinan sekolah:</strong> mengintegrasikan kurikulum, mendampingi, serta menetapkan dukungan kelembagaan.</li><li><strong>Masyarakat:</strong> ikut menentukan masalah, menyumbangkan pengetahuan dengan persetujuan, dan menilai relevansi solusi.</li><li><strong>Perguruan tinggi:</strong> membantu metode penyelidikan dan evaluasi.</li><li><strong>Pemerintah dan pelaku usaha:</strong> mendukung layanan, sarana, dan tindak lanjut sesuai kewenangan.</li></ul><p className={s.small}>Pembagian peran ini merupakan rancangan kemitraan, bukan daftar kerja sama yang telah disepakati.</p></div></details>
        <details className={s.disclosure}><summary>Etika, keselamatan, dan akses belajar</summary><div className={s.detailBody}><ul className={s.bulletList}><li>Sesuaikan kegiatan lapangan dengan cuaca, pasang surut, usia peserta, pendampingan, dan izin yang diperlukan.</li><li>Sediakan alternatif observasi dari sekolah, bahan cetak, serta akses bagi peserta dengan kebutuhan berbeda.</li><li>Minta persetujuan untuk wawancara, dokumentasi, dan penggunaan pengetahuan lokal.</li><li>Verifikasi data, kutipan, serta keluaran AI; jangan membuat klaim melebihi bukti.</li><li>Kegiatan restorasi seperti penanaman memerlukan kesesuaian ekologis dan pendampingan ahli.</li></ul></div></details>
      </div>
    </div></section>

    <section id="rujukan" className={`${s.container} ${s.section}`}>
      <SectionHeading number="07" label="Bacaan lanjutan" title="Telusuri landasan, kembangkan penerapan.">Materi ini merupakan sintesis edukatif. Rancangan Kepulauan Riau dan contoh proyek disajikan sebagai usulan penerapan yang dapat ditelaah lebih lanjut.</SectionHeading>
      <div className={s.sources}>{sources.map((source, i) => <a href={source.href} key={source.href} target="_blank" rel="noopener noreferrer"><span className={s.sourceNumber}>0{i + 1}</span><div><p className={s.small}>{source.publisher}</p><h3>{source.title}</h3><p>{source.note}</p></div><ArrowUpRight size={22} aria-hidden="true" /><span className={s.srOnly}> (buka tab baru)</span></a>)}</div>
      <div className={s.closing}><div><Waves size={32} aria-hidden="true" /><h2>Pahami. Alami. Lindungi.</h2><p>Pendidikan Biru tumbuh ketika pengetahuan menjadi tanggung jawab dan tindakan bersama.</p><p className={s.author}>Dr. Hos Arie Sibarani</p></div><Link href="/id/contact" className={s.primaryButton}>Diskusikan penerapan <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
    </section>
  </article>;
}
