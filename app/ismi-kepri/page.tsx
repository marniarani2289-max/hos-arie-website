import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import s from "./ismi.module.css";

export const metadata: Metadata = {
  title: "ISMI Kepulauan Riau | Ikatan Sarjana Melayu Indonesia",
  description: "Ruang digital ISMI Kepulauan Riau: keilmuan Melayu, kajian kepulauan, kegiatan, publikasi, serta dokumentasi dan tindak lanjut ICSM 2026.",
  alternates: { canonical: "/ismi-kepri" },
  openGraph: { title: "ISMI Kepulauan Riau", description: "Merawat ilmu. Menguatkan Melayu. Mengabdi untuk kepulauan.", url: "https://www.hossibarani.com/ismi-kepri", locale: "id_ID", type: "website", images: [{ url: "/ismi-kepri/logo.jpeg", width: 1080, height: 1080, alt: "ISMI Kepri" }] },
};
const themes = [
  ["01", "Pemikiran & kebudayaan Melayu", "Membaca warisan intelektual, sejarah, bahasa, dan nilai Melayu sebagai sumber pengetahuan bagi kehidupan hari ini.", "Warisan intelektual"],
  ["02", "Masyarakat & keadilan kepulauan", "Mengkaji partisipasi masyarakat, akses layanan, perlindungan ruang hidup, dan tata kelola yang berpihak pada warga kepulauan.", "Manusia dan ruang hidup"],
  ["03", "Kemaritiman & keberlanjutan", "Menghubungkan ekonomi biru, ekologi laut, pendidikan, dan kerja sama kawasan dengan kebutuhan masyarakat pesisir.", "Masa depan maritim"],
];
export default function IsmiKepriPage() {
  return <>
    <section className={s.hero}>
      <div className={s.heroCopy}>
        <p className={s.eyebrow}>Ikatan Sarjana Melayu Indonesia · Kepulauan Riau</p>
        <h1>Merawat ilmu.<br/>Menguatkan Melayu.<br/><em>Mengabdi untuk kepulauan.</em></h1>
        <p className={s.lead}>Ruang temu gagasan, pengetahuan, dan pengabdian ISMI Kepri. Menghubungkan khazanah Melayu dengan tantangan masyarakat kepulauan.</p>
        <div className={s.actions}><Link className={s.buttonGold} href="#tentang">Mengenal ISMI Kepri <span aria-hidden="true">↓</span></Link><Link className={s.buttonOutline} href="#kegiatan">Jelajahi kegiatan <span aria-hidden="true">↗</span></Link></div>
      </div>
      <div className={s.identityPanel}>
        <span className={s.panelKicker}>Ilmu · Adab · Pengabdian</span>
        <Image className={s.heroLogo} src="/ismi-kepri/logo.jpeg" width={300} height={300} priority alt="Lambang Ikatan Sarjana Melayu Indonesia Kepulauan Riau" />
        <p>ISMI <span>Kepulauan Riau</span></p>
        <div className={s.panelBottom}><span>Berakar pada budaya</span><span>Terbuka pada dunia</span></div>
      </div>
    </section>
    <div className={s.values}><span>Keilmuan yang hidup</span><span>Kebudayaan yang terawat</span><span>Pengabdian yang bermakna</span></div>
    <section id="tentang" className={s.section}>
      <div className={s.sectionHeading}><p className={s.eyebrow}>01 / Tentang ISMI Kepri</p><h2>Pengetahuan bertemu<br/>tanggung jawab sosial.</h2></div>
      <div className={s.aboutGrid}><p className={s.intro}>ISMI adalah <strong>Ikatan Sarjana Melayu Indonesia</strong>. Ruang digital ISMI Kepri ini mempertemukan kajian, dokumentasi kegiatan, dan bahan tindak lanjut dalam konteks Kepulauan Riau.</p><div><p>Sarjana, pendidik, peneliti, dan masyarakat dapat menjelajahi pemikiran Melayu serta isu kepulauan melalui bahan yang tersedia di sini.</p><p>Dokumentasi International Conference on the Strait of Malacca (ICSM) 2026 menjadi koleksi awal: sebuah pintu masuk untuk membaca hubungan kebudayaan, masyarakat pesisir, dan masa depan Selat Malaka.</p><Link className={s.textLink} href="/ismi-kepri/icsm-2026">Buka koleksi ICSM 2026 <span aria-hidden="true">↗</span></Link></div></div>
    </section>
    <section id="dewan-pakar" className={s.expertSection} aria-labelledby="expert-heading">
      <div className={s.expertLabel}><p className={s.eyebrow}>Dewan Pakar</p><span>Periode 2026–2030</span></div>
      <div className={s.expertProfile}>
        <h2 id="expert-heading">Dr. Hos Arie Sibarani, S.H., M.H.</h2>
        <p className={s.expertRole}>Dewan Pakar Pengurus Wilayah ISMI<br/>Provinsi Kepulauan Riau</p>
        <p className={s.expertSource}>Rujukan: Berita Acara Pembentukan PW ISMI Kepri, 22 September 2026, Lampiran C — Dewan Pakar.</p>
      </div>
      <Link className={s.textLink} href="/id/about">Profil akademik <span aria-hidden="true">↗</span></Link>
    </section>
    <section id="ruang-kajian" className={`${s.section} ${s.paperSection}`}>
      <div className={s.splitHeading}><div><p className={s.eyebrow}>02 / Ruang Kajian</p><h2>Dari khazanah Melayu,<br/>untuk kehidupan bersama.</h2></div><p>Tiga pintu untuk menjelajahi gagasan dan bahan kajian dalam ruang digital ini.</p></div>
      <div className={s.themeGrid}>{themes.map(([no,title,text,label])=><article key={no} className={s.theme}><span className={s.number}>{no}</span><h3>{title}</h3><p>{text}</p><span className={s.themeLabel}>{label}</span></article>)}</div>
    </section>
    <section id="kegiatan" className={s.section}>
      <div className={s.splitHeading}><div><p className={s.eyebrow}>03 / Kegiatan & Dokumentasi</p><h2>Gagasan yang terus bergerak.</h2></div><span className={s.tag}>Arsip kegiatan · 2026</span></div>
      <article className={s.event}>
        <div className={s.eventArtwork} aria-hidden="true"><span>FORUM INTERNASIONAL</span><strong>ICSM<br/><em>2026</em></strong><div>SELAT MALAKA<br/>Batam & Tanjungpinang</div></div>
        <div className={s.eventCopy}><p className={s.eyebrow}>24–25 September 2026 · Kepulauan Riau</p><h3>International Conference<br/>on the Strait of Malacca</h3><p>Membaca Selat Malaka sebagai ruang hidup, kebudayaan, ekonomi, dan kerja sama. Telusuri dokumen hasil konferensi, analisis mendalam, dan rancangan tindak lanjutnya.</p><div className={s.inlineTags}><span>Resolusi & rekomendasi</span><span>Deklarasi</span><span>Tindak lanjut</span></div><Link className={s.buttonDark} href="/ismi-kepri/icsm-2026">Jelajahi ICSM 2026 <span aria-hidden="true">↗</span></Link></div>
      </article>
    </section>
    <section className={`${s.section} ${s.publicationSection}`}>
      <div><p className={s.eyebrow}>04 / Publikasi & Bahan Kerja</p><h2>Gagasan terbuka.<br/>Dokumen mudah diakses.</h2><p>Mulai dari analisis hasil konferensi hingga matriks rencana aksi. Baca, unduh, dan gunakan sebagai bahan diskusi.</p><Link className={s.textLink} href="/ismi-kepri/icsm-2026#dokumen">Lihat seluruh dokumen ICSM <span aria-hidden="true">↗</span></Link></div>
      <div className={s.featureDownloads}>
        <a href="/ismi-kepri/dokumen/analisis-icsm-2026.pdf" download><span>ANALISIS · PDF</span><strong>Analisis mendalam<br/>hasil ICSM 2026</strong><span>Unduh dokumen ↓</span></a>
        <a href="/ismi-kepri/dokumen/matriks-icsm-2026.xlsx" download><span>BAHAN KERJA · EXCEL</span><strong>Matriks tindak lanjut<br/>24 usulan aksi</strong><span>Unduh matriks ↓</span></a>
      </div>
    </section>
    <section className={s.collaboration}><p className={s.eyebrow}>Percakapan yang Berkelanjutan</p><h2>Mari menghubungkan<br/>pengetahuan dan pengabdian.</h2><p>Untuk percakapan akademik dan kolaborasi terkait kajian Melayu serta masyarakat kepulauan, hubungi Dr. Hos Arie Sibarani selaku Dewan Pakar ISMI Kepri melalui kanal hossibarani.com.</p><Link className={s.buttonGold} href="/id/contact">Hubungi Hos Arie Sibarani <span aria-hidden="true">↗</span></Link></section>
  </>;
}
