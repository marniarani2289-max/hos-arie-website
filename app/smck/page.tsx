import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const title = "Seri Mahkota Cendekia Kepri";
const description = "Jurnal Pendidikan, Kebudayaan dan Peradaban, diterbitkan oleh Raja Ali Haji Research Network. Dalam tahap persiapan penerbitan.";

export const metadata: Metadata = {
  title: { absolute: `${title} (SMCK) | Raja Ali Haji Research Network` },
  description,
  publisher: "Raja Ali Haji Research Network",
  alternates: { canonical: "/smck" },
  openGraph: {
    title, description, url: "https://www.hossibarani.com/smck",
    siteName: "Raja Ali Haji Research Network", locale: "id_ID", type: "website",
    images: [{ url: "/smck/identity", width: 1254, height: 1254, alt: `${title}: Jurnal Pendidikan, Kebudayaan dan Peradaban` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/smck/identity"] },
};

const scope = [
  ["Pendidikan & kearifan lokal", "Pedagogi berbasis budaya, pendidikan karakter, serta pewarisan nilai dan pengetahuan antargenerasi."],
  ["Bahasa, sastra & manuskrip", "Bahasa Melayu, tradisi lisan, sastra, filologi, dan pemikiran yang terekam dalam naskah."],
  ["Sejarah & peradaban Melayu", "Sejarah intelektual, institusi sosial dan keagamaan, serta jaringan kebudayaan di dunia Melayu."],
  ["Masyarakat kepulauan", "Identitas, perubahan sosial, kehidupan maritim, dan hubungan antarkomunitas."],
  ["Pelestarian & transformasi budaya", "Warisan budaya, digitalisasi, serta peran sekolah, museum, dan komunitas dalam merawat pengetahuan."],
];

export default function SmckPage() {
  return (
    <div lang="id" className="bg-[#faf8f2] text-[#082b48]">
      <section className="border-b border-[#c49a43]/30">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-12 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:px-8">
          <div>
            <Link href="/raja-ali-haji" className="text-sm font-semibold underline underline-offset-4 hover:text-amber-800">← Ekosistem Raja Ali Haji</Link>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-[#80601e]">Jurnal ilmiah · Raja Ali Haji Research Network</p>
            <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">Seri Mahkota<br />Cendekia Kepri</h1>
            <p className="mt-5 text-xl leading-8 text-[#526373]">Jurnal Pendidikan, Kebudayaan dan Peradaban</p>
            <p className="mt-6 max-w-xl text-base leading-8">Merawat pengetahuan, menghidupkan kebudayaan. Ruang ilmiah yang berakar pada dunia Melayu dan kehidupan kepulauan.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://journal.hossibarani.com/smck/en/index" className="rounded-lg bg-[#082b48] px-6 py-3 font-semibold text-white hover:bg-[#164767]">Kunjungi jurnal di OJS ↗</a>
              <a href="#tentang" className="rounded-lg border border-[#082b48]/30 px-6 py-3 font-semibold hover:bg-white">Mengenal jurnal</a>
              <a href="#ruang-lingkup" className="rounded-lg border border-[#082b48]/30 px-6 py-3 font-semibold hover:bg-white">Ruang lingkup ↓</a>
            </div>
            <p className="mt-6 text-sm leading-6 text-[#526373]">Persiapan penerbitan · Penerimaan naskah belum dibuka</p>
          </div>
          <div className="mx-auto w-full max-w-sm rounded-2xl border border-[#c49a43]/25 bg-white p-5 shadow-sm sm:p-7">
            <Image src="/smck/identity" alt="Lambang Seri Mahkota Cendekia Kepri: mahkota emas, pena, buku, perahu dan kepulauan" width={1254} height={1254} sizes="(max-width: 640px) 90vw, 384px" priority className="h-auto w-full" />
          </div>
        </div>
      </section>

      <section id="tentang" className="mx-auto grid max-w-7xl scroll-mt-28 gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#80601e]">Mengenal SMCK</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">Pendidikan bertemu kebudayaan.</h2>
          <p className="mt-6 leading-8 text-[#526373]">Seri Mahkota Cendekia Kepri mengkaji hubungan pendidikan, kebudayaan, dan peradaban, dengan perhatian khusus pada masyarakat Melayu dan kehidupan kepulauan. Jurnal ini disiapkan sebagai ruang bagi penelitian dan pemikiran kritis mengenai pewarisan pengetahuan, pengembangan pendidikan, pelestarian kebudayaan, serta perubahan sosial.</p>
          <p className="mt-4 leading-8 text-[#526373]">Berakar pada konteks Kepulauan Riau, SMCK terbuka terhadap kajian dari berbagai wilayah dan pendekatan komparatif yang memperluas dialog keilmuan.</p>
        </div>
        <aside className="rounded-xl border border-[#c49a43]/30 bg-white p-7">
          <h2 className="font-serif text-2xl">Identitas jurnal</h2>
          <dl className="mt-5 divide-y divide-slate-200 text-sm">
            {[
              ["Penerbit", "Raja Ali Haji Research Network"],
              ["Singkatan", "SMCK"],
              ["Bahasa naskah yang direncanakan", "Indonesia dan Inggris"],
              ["Tim editorial", "Belum ditetapkan"],
              ["ISSN, jadwal terbit & biaya", "Belum ditetapkan"],
            ].map(([label, value]) => <div key={label} className="py-4"><dt className="font-semibold text-[#80601e]">{label}</dt><dd className="mt-1 leading-6">{value}</dd></div>)}
          </dl>
        </aside>
      </section>

      <section id="ruang-lingkup" className="scroll-mt-24 bg-[#082b48] px-6 py-16 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ecd399]">Fokus & ruang lingkup</p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">Dari pengetahuan lokal menuju dialog keilmuan.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scope.map(([name, detail], index) => <article key={name} className="rounded-xl border border-white/20 p-6"><p className="text-sm text-[#ecd399]">0{index + 1}</p><h3 className="mt-4 font-serif text-xl">{name}</h3><p className="mt-3 text-sm leading-7 text-slate-200">{detail}</p></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-xl border border-[#c49a43]/30 bg-white p-7 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#80601e]">Pengembangan jurnal</p>
          <h2 className="mt-4 font-serif text-3xl">Menyiapkan penerbitan yang bertanggung jawab.</h2>
          <p className="mt-5 max-w-3xl leading-8 text-[#526373]">Jurnal belum menerbitkan edisi dan belum membuka penerimaan naskah. Tim editorial, pedoman penulis, kebijakan penelaahan, lisensi, ISSN, jadwal terbit, dan biaya publikasi akan diumumkan setelah ditetapkan. Laman OJS SMCK sudah dibuat untuk pengelolaan jurnal. Penerimaan naskah tetap dinonaktifkan selama tahap persiapan.</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <a href="mailto:editor@hossibarani.com?subject=Informasi%20SMCK" className="rounded-lg bg-[#082b48] px-6 py-3 font-semibold text-white hover:bg-[#164767]">Hubungi sekretariat</a>
            <Link href="/raja-ali-haji" className="rounded-lg border border-[#082b48]/30 px-6 py-3 font-semibold hover:bg-stone-50">Ekosistem Raja Ali Haji</Link>
          </div>
          <p className="mt-6 text-sm text-[#526373]">Diterbitkan oleh Raja Ali Haji Research Network · <a className="underline underline-offset-4" href="mailto:editor@hossibarani.com">editor@hossibarani.com</a></p>
        </div>
      </section>
    </div>
  );
}
