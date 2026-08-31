import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, BookOpenCheck, ClipboardList,
  Compass, Database, Download, FileCheck2, FileText, GraduationCap,
  LifeBuoy, Map, MapPinned, Megaphone, Network, Newspaper,
  ShieldCheck, Users, Waves,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pusat Digital Hizbul Wathan Kepulauan Riau",
  description: "Pusat informasi, administrasi, kaderisasi, dan konsolidasi digital Kwartir Wilayah Hizbul Wathan Kepulauan Riau.",
  keywords: ["Hizbul Wathan", "HW Kepri", "Muhammadiyah", "kepanduan", "Kepulauan Riau", "Jaya Melati"],
  alternates: { canonical: "/hw-kepri" },
  openGraph: { title: "Pusat Digital HW Kepulauan Riau", description: "Berakar pada Nilai. Berlayar dalam Pengabdian.", url: "https://www.hossibarani.com/hw-kepri", type: "website" },
};

const hubs = [
  { icon: Newspaper, label: "Informasi", title: "Kabar & Agenda", text: "Berita kegiatan, pengumuman, kalender, dan dokumentasi HW se-Kepulauan Riau.", href: "#informasi", tone: "bg-amber-50 text-amber-800" },
  { icon: FileCheck2, label: "Administrasi", title: "Pusat Dokumen", text: "SK, surat edaran, pedoman, formulir, identitas visual, dan laporan organisasi.", href: "#administrasi", tone: "bg-sky-50 text-sky-800" },
  { icon: GraduationCap, label: "Kaderisasi", title: "Jalur Pelatihan", text: "Jaya Melati, pendampingan 90 hari, materi pembina, dan pengembangan pelatih.", href: "#kaderisasi", tone: "bg-violet-50 text-violet-800" },
  { icon: Network, label: "Konsolidasi", title: "Daerah & Qabilah", text: "Pemetaan kwartir daerah, qabilah, kader, pelatih, dan perkembangan organisasi.", href: "#konsolidasi", tone: "bg-emerald-50 text-emerald-800" },
];
const news = [
  { type: "Agenda Wilayah", title: "Pelantikan Kwartir Wilayah HW Kepulauan Riau", text: "Momentum peneguhan amanah, peluncuran visi HW Kepri Berjaya, dan kontrak kinerja pengurus.", status: "Coming Soon", icon: ShieldCheck },
  { type: "Kaderisasi", title: "Pelatihan Jaya Melati I Pengurus HW Kepri", text: "Penguatan ideologi, kepemimpinan, manajemen qabilah, kepanduan maritim, dan kebencanaan.", status: "Coming Soon", icon: BookOpenCheck },
  { type: "Konsolidasi", title: "Gerakan 100 Hari Aktivasi Organisasi", text: "Pendataan kader dan pelatih, pemetaan qabilah, kunjungan daerah, serta latihan gabungan perdana.", status: "Program Prioritas", icon: MapPinned },
];
const documents = [
  { category: "Organisasi", title: "Profil dan Arah Strategis HW Kepri", format: "Dokumen induk", icon: Compass },
  { category: "Kaderisasi", title: "Panduan Rencana Aksi 90 Hari", format: "Format kerja", icon: ClipboardList },
  { category: "Qabilah", title: "Paket Pembentukan dan Aktivasi Qabilah", format: "Panduan", icon: Users },
  { category: "Monitoring", title: "Format Laporan Kinerja Triwulan", format: "Templat", icon: Database },
];
const stages = [
  { no: "01", title: "Orientasi Pengurus", text: "Identitas HW, Al-Islam dan Kemuhammadiyahan, serta arah kepemimpinan wilayah." },
  { no: "02", title: "Jaya Melati I", text: "Kompetensi dasar kepanduan, kepemimpinan, manajemen qabilah, dan keterampilan lapangan." },
  { no: "03", title: "Praktik 90 Hari", text: "Setiap peserta menjalankan rencana aksi dan mengaktifkan atau membina satu qabilah." },
  { no: "04", title: "Evaluasi & Penjenjangan", text: "Penilaian kompetensi, penguatan mentor, serta persiapan menuju Jaya Melati II." },
];
const regions = ["Batam", "Tanjungpinang", "Bintan", "Karimun", "Lingga", "Natuna", "Kepulauan Anambas"];
const programs = [
  { icon: Users, title: "Satu Sekolah, Satu Qabilah" },
  { icon: Waves, title: "Pandu Kepulauan" },
  { icon: BookOpenCheck, title: "Jaya Melati Berkelanjutan" },
  { icon: LifeBuoy, title: "HW Kepri Siaga" },
  { icon: Database, title: "Digital Command Center" },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`text-xs font-bold uppercase tracking-[.24em] ${light ? "text-emerald-200" : "text-emerald-800"}`}>{children}</p>;
}

export default function HwKepriDigitalHub() {
  return <div className="bg-[#f7f4ea] text-slate-900">
    <section className="relative isolate overflow-hidden bg-[#073b2c] px-5 py-16 text-white sm:px-6 md:py-20 lg:px-8">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_18%,rgba(217,170,67,.22),transparent_24%),radial-gradient(circle_at_8%_92%,rgba(16,185,129,.18),transparent_34%)]"/>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo-hw-resmi.png"
              alt="Lambang resmi Gerakan Kepanduan Hizbul Wathan"
              width={72}
              height={72}
              priority
              className="h-14 w-14 shrink-0 sm:h-[72px] sm:w-[72px]"
            />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-emerald-200 sm:text-xs">Gerakan Kepanduan Hizbul Wathan</p>
              <p className="mt-1 font-academic text-lg font-bold leading-tight text-white sm:text-2xl">Kwartir Wilayah Kepulauan Riau</p>
            </div>
          </div>
          <span className="rounded-lg bg-emerald-950/50 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-emerald-100">Pusat Digital HW Kepri</span>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div><p className="font-academic text-xl text-amber-300 sm:text-2xl">Hizbul Wathan Kepulauan Riau</p><h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.06] tracking-tight sm:text-6xl">Informasi terhubung.<br/><span className="text-emerald-200">Gerakan semakin kokoh.</span></h1><p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50/80">Pusat informasi, administrasi, kaderisasi, dan konsolidasi untuk membangun Pandu Kepulauan yang berakidah, terampil, tangguh, dan mengabdi.</p></div>
          <div className="grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/15 bg-white/5 p-5"><p className="font-academic text-4xl font-bold text-amber-300">4</p><p className="mt-2 text-sm text-emerald-50/70">Fungsi pusat digital</p></div><div className="rounded-2xl border border-white/15 bg-white/5 p-5"><p className="font-academic text-4xl font-bold text-amber-300">7</p><p className="mt-2 text-sm text-emerald-50/70">Kabupaten/kota sasaran</p></div><div className="rounded-2xl border border-white/15 bg-white/5 p-5"><p className="font-academic text-4xl font-bold text-amber-300">5</p><p className="mt-2 text-sm text-emerald-50/70">Program unggulan</p></div><div className="rounded-2xl border border-white/15 bg-white/5 p-5"><p className="font-academic text-4xl font-bold text-amber-300">90</p><p className="mt-2 text-sm text-emerald-50/70">Hari praktik kader</p></div></div>
        </div>
      </div>
    </section>

    <section className="relative z-10 -mt-1 px-5 pb-20 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-4 pt-6 md:grid-cols-2 xl:grid-cols-4">{hubs.map(({icon:Icon,label,title,text,href,tone})=><Link key={label} href={href} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className={`inline-flex rounded-xl p-3 ${tone}`}><Icon size={24}/></div><p className="mt-5 text-xs font-bold uppercase tracking-[.2em] text-emerald-700">{label}</p><h2 className="mt-2 font-academic text-2xl font-bold text-emerald-950">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-800">Buka pusat <ArrowRight className="transition group-hover:translate-x-1" size={16}/></span></Link>)}</div></section>

    <section id="informasi" className="bg-white px-5 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><div className="flex flex-wrap items-end justify-between gap-6"><div><Eyebrow>01 — Informasi</Eyebrow><h2 className="mt-4 font-academic text-4xl font-bold text-emerald-950 sm:text-5xl">Kabar dan agenda wilayah</h2></div><div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900"><Megaphone size={18}/> Informasi resmi HW Kepri</div></div><div className="mt-12 grid gap-6 lg:grid-cols-3">{news.map(({type,title,text,status,icon:Icon})=><article key={title} className="rounded-2xl border border-slate-200 bg-[#fbfaf6] p-7"><div className="flex items-center justify-between"><Icon className="text-amber-600" size={26}/><span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">{status}</span></div><p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-emerald-700">{type}</p><h3 className="mt-3 font-academic text-2xl font-bold leading-tight text-emerald-950">{title}</h3><p className="mt-4 leading-7 text-slate-600">{text}</p></article>)}</div></div></section>

    <section id="administrasi" className="px-5 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><Eyebrow>02 — Administrasi</Eyebrow><h2 className="mt-4 font-academic text-4xl font-bold text-emerald-950 sm:text-5xl">Pusat dokumen organisasi</h2></div><p className="max-w-2xl text-lg leading-8 text-slate-600">Satu tempat untuk menemukan dokumen kerja yang sahih, seragam, dan mudah digunakan oleh pengurus wilayah, daerah, serta qabilah.</p></div><div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white">{documents.map(({category,title,format,icon:Icon},i)=><div key={title} className="grid gap-4 border-b border-slate-200 p-6 last:border-0 sm:grid-cols-[3rem_1fr_auto_auto] sm:items-center"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700"><Icon size={22}/></div><div><p className="text-xs font-bold uppercase tracking-[.18em] text-slate-500">{category}</p><h3 className="mt-1 font-semibold text-slate-900">{title}</h3></div><span className="text-sm text-slate-500">{format}</span><span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700">{i === 0 ? "Sedang disusun" : "Segera tersedia"}<Download size={16}/></span></div>)}</div><div className="mt-7 rounded-2xl border border-dashed border-emerald-800/30 bg-emerald-50 p-6 text-center"><FileText className="mx-auto text-emerald-700"/><p className="mt-3 font-semibold text-emerald-950">Dokumen akan diunggah setelah ditetapkan dan diverifikasi oleh Kwartir Wilayah.</p></div></div></section>

    <section id="kaderisasi" className="bg-[#073b2c] px-5 py-20 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><Eyebrow light>03 — Kaderisasi</Eyebrow><div className="mt-4 grid gap-8 lg:grid-cols-2 lg:items-end"><h2 className="font-academic text-4xl font-bold sm:text-5xl">Jaya Melati sebagai<br/>jalan pembentukan kader.</h2><p className="max-w-2xl text-lg leading-8 text-emerald-50/70">Pelatihan tidak berhenti pada sertifikat. Setiap peserta menjalani praktik, pendampingan, evaluasi, dan penugasan nyata di qabilah.</p></div><div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{stages.map(({no,title,text})=><article key={no} className="rounded-2xl border border-white/15 bg-white/5 p-7"><p className="font-academic text-3xl italic text-amber-300">{no}</p><h3 className="mt-8 font-academic text-2xl font-bold">{title}</h3><p className="mt-4 text-sm leading-7 text-emerald-50/65">{text}</p></article>)}</div><div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-amber-500 p-6 text-emerald-950"><div><p className="text-xs font-extrabold uppercase tracking-[.2em]">Pelantikan & Pelatihan</p><p className="mt-1 font-academic text-2xl font-bold">Jaya Melati I HW Kepulauan Riau</p></div><span className="rounded-xl bg-emerald-950 px-5 py-3 text-xs font-extrabold tracking-[.16em] text-white">COMING SOON</span></div></div></section>

    <section id="konsolidasi" className="bg-white px-5 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><Eyebrow>04 — Konsolidasi</Eyebrow><h2 className="mt-4 font-academic text-4xl font-bold text-emerald-950 sm:text-5xl">Dari wilayah, daerah, hingga qabilah.</h2><p className="mt-6 text-lg leading-8 text-slate-600">Direktori ini disiapkan untuk memetakan kepengurusan, qabilah, kader, pelatih, kegiatan, dan kebutuhan pengembangan di seluruh Kepulauan Riau.</p><div className="mt-8 rounded-2xl bg-emerald-950 p-6 text-white"><div className="flex items-center gap-3"><Map className="text-amber-300"/><p className="font-bold">Tahap awal: verifikasi baseline</p></div><p className="mt-3 text-sm leading-7 text-emerald-100/70">Data akan dipublikasikan setelah dikonfirmasi oleh masing-masing Kwartir Daerah.</p></div></div><div className="grid gap-4 sm:grid-cols-2">{regions.map((region,i)=><article key={region} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-[#fbfaf6] p-5"><div className="flex items-center gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-800">{String(i+1).padStart(2,"0")}</span><div><h3 className="font-bold text-emerald-950">{region}</h3><p className="mt-1 text-xs text-slate-500">Pemetaan dan verifikasi data</p></div></div><span className="h-2.5 w-2.5 rounded-full bg-amber-400"/></article>)}</div></div></div></section>

    <section className="px-5 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><div className="text-center"><Eyebrow>Program Strategis</Eyebrow><h2 className="mt-4 font-academic text-4xl font-bold text-emerald-950">Lima penggerak HW Kepri Berjaya</h2></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{programs.map(({icon:Icon,title})=><article key={title} className="rounded-2xl border border-emerald-900/15 bg-white p-6 text-center"><Icon className="mx-auto text-amber-600" size={28}/><h3 className="mt-5 font-academic text-lg font-bold text-emerald-950">{title}</h3></article>)}</div></div></section>

    <section className="bg-emerald-800 px-5 py-20 text-white sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-end"><div><Eyebrow light>Bergerak Bersama</Eyebrow><h2 className="mt-7 font-academic text-4xl font-bold leading-tight sm:text-5xl">Konsolidasi data.<br/>Kaderisasi nyata.<br/>Pengabdian berdampak.</h2></div><div><p className="max-w-xl text-lg leading-8 text-emerald-50/75">Kwartir daerah, qabilah, sekolah Muhammadiyah, pelatih, mitra, dan kader dipersilakan terhubung untuk membangun ekosistem HW Kepulauan Riau.</p><Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-4 font-bold text-emerald-950 transition hover:bg-amber-400">Hubungi Sekretariat <ArrowRight size={18}/></Link></div></div></section>
  </div>;
}
