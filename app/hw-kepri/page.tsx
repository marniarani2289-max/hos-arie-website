import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  Compass,
  Database,
  GraduationCap,
  HandHeart,
  LifeBuoy,
  MapPinned,
  ShieldCheck,
  Users,
  Waves,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hizbul Wathan Kepulauan Riau",
  description: "Kwartir Wilayah Hizbul Wathan Kepulauan Riau—gerakan kepanduan Islam yang berakidah, berkarakter, terampil, tangguh, dan mengabdi.",
  keywords: ["Hizbul Wathan", "HW Kepri", "Muhammadiyah", "kepanduan", "Kepulauan Riau", "Jaya Melati"],
  alternates: { canonical: "/hw-kepri" },
  openGraph: {
    title: "Hizbul Wathan Kepulauan Riau",
    description: "Berakar pada Nilai. Berlayar dalam Pengabdian.",
    url: "https://www.hossibarani.com/hw-kepri",
    type: "website",
  },
};

const values = ["Berakidah", "Berkarakter", "Terampil", "Tangguh", "Mengabdi"];
const identities = [
  { icon: GraduationCap, title: "Kader Islam Berkemajuan", text: "Kuat dalam akidah, ibadah, akhlak, ilmu, dan wawasan kebangsaan." },
  { icon: Award, title: "Pemimpin Muda", text: "Disiplin, amanah, mandiri, dan berani mengambil tanggung jawab." },
  { icon: HandHeart, title: "Relawan Kepulauan", text: "Terampil, sigap, peduli lingkungan, dan hadir saat masyarakat membutuhkan." },
];
const programmes = [
  { number: "01", icon: Users, title: "Satu Sekolah, Satu Qabilah", text: "Mengaktifkan qabilah sebagai pusat kaderisasi di sekolah, kampus, masjid, dan komunitas Muhammadiyah." },
  { number: "02", icon: Waves, title: "Pandu Kepulauan", text: "Kepanduan maritim, navigasi, keselamatan laut, konservasi pesisir, dan pengabdian di wilayah kepulauan." },
  { number: "03", icon: BookOpenCheck, title: "Jaya Melati Berkelanjutan", text: "Pelatihan dengan pendampingan 90 hari, praktik lapangan, dan evaluasi berbasis kompetensi." },
  { number: "04", icon: LifeBuoy, title: "HW Kepri Siaga", text: "Kader terlatih untuk kebencanaan, pertolongan pertama, kemanusiaan, dan pelayanan masyarakat." },
  { number: "05", icon: Database, title: "Digital Command Center", text: "Data anggota, qabilah, pelatih, program kerja, dokumentasi, dan dashboard kinerja dalam satu sistem." },
];
const training = ["Rencana aksi individual 90 hari", "Pendampingan oleh pelatih senior", "Praktik mengaktifkan atau membina qabilah", "Evaluasi kompetensi dan tindak lanjut"];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`text-xs font-bold uppercase tracking-[0.25em] ${light ? "text-emerald-200" : "text-emerald-800"}`}>{children}</p>;
}

export default function HizbulWathanKepriPage() {
  return <div className="bg-[#f7f4ea] text-slate-900">
    <section className="relative isolate overflow-hidden bg-[#073b2c] px-5 py-20 text-white sm:px-6 md:py-28 lg:px-8 lg:py-32">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_80%_20%,rgba(217,170,67,0.2),transparent_25%),radial-gradient(circle_at_10%_90%,rgba(16,185,129,0.18),transparent_32%)]" />
      <div className="absolute -right-32 top-12 -z-10 h-[32rem] w-[32rem] rounded-full border border-amber-300/20" />
      <div className="absolute right-2 top-44 -z-10 h-[20rem] w-[20rem] rounded-full border border-emerald-200/15" />
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200/20 bg-white/5 px-4 py-2"><span className="h-2 w-2 rounded-full bg-amber-400"/><Eyebrow light>Kwartir Wilayah Kepulauan Riau</Eyebrow></div>
          <p className="mt-8 font-academic text-xl text-amber-300 sm:text-2xl">Hizbul Wathan Kepulauan Riau</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">Berakar pada Nilai.<br/><span className="text-emerald-200">Berlayar dalam Pengabdian.</span></h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-emerald-50/80 sm:text-xl">Gerakan kepanduan Islam yang membentuk kader berakidah, berkarakter, terampil, tangguh, dan siap mengabdi untuk negeri kepulauan.</p>
          <div className="mt-10 flex flex-wrap gap-4"><Link href="#program" className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-4 font-bold text-emerald-950 transition hover:bg-amber-400">Jelajahi Program <ArrowRight size={18}/></Link><Link href="#tentang" className="inline-flex items-center rounded-xl border border-white/25 bg-white/5 px-6 py-4 font-semibold transition hover:bg-white/10">Mengenal HW Kepri</Link></div>
        </div>
        <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center rounded-full border border-amber-300/30 bg-emerald-950/30 shadow-2xl shadow-emerald-950/40">
          <div className="absolute inset-10 rounded-full border border-dashed border-emerald-200/25"/><Compass className="absolute h-72 w-72 text-emerald-200/10" strokeWidth={1}/><div className="relative text-center"><Waves className="mx-auto mb-5 text-amber-300" size={52}/><p className="font-academic text-7xl font-bold text-amber-300">HW</p><p className="mt-3 text-xs font-bold uppercase tracking-[.45em] text-emerald-100">Pandu Kepulauan</p></div>
        </div>
      </div>
    </section>

    <div className="bg-amber-500 px-5 py-5"><div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-12 gap-y-3">{values.map((value)=><span key={value} className="text-xs font-extrabold uppercase tracking-[.18em] text-emerald-950">{value}</span>)}</div></div>

    <section id="tentang" className="px-5 py-20 sm:px-6 md:py-28 lg:px-8"><div className="mx-auto max-w-7xl"><Eyebrow>01 — Arah Gerakan</Eyebrow><div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-20"><h2 className="font-academic text-4xl font-bold leading-tight text-emerald-950 sm:text-5xl">Membangun generasi utama dari wilayah kepulauan.</h2><div className="space-y-5 text-lg leading-8 text-slate-600"><p>HW Kepri hadir sebagai gerakan kepanduan Islam berkemajuan yang tertib organisasi, kuat kaderisasi, tangguh menghadapi tantangan kepulauan, dan memberi manfaat nyata bagi persyarikatan serta masyarakat.</p><p>Dengan semangat <strong className="text-emerald-900">“Sedikit Bicara, Banyak Bekerja”</strong>, setiap latihan menjadi jalan pembentukan akhlak, kepemimpinan, keterampilan hidup, dan keberanian untuk melayani.</p></div></div><div className="mt-16 grid overflow-hidden rounded-2xl border border-emerald-900/15 bg-white md:grid-cols-3">{identities.map(({icon:Icon,title,text})=><article key={title} className="border-b border-emerald-900/10 p-8 last:border-0 md:border-b-0 md:border-r md:last:border-r-0"><Icon className="text-amber-600" size={28}/><h3 className="mt-6 font-academic text-2xl font-bold text-emerald-950">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}</div></div></section>

    <section id="program" className="bg-[#073b2c] px-5 py-20 text-white sm:px-6 md:py-28 lg:px-8"><div className="mx-auto max-w-7xl"><Eyebrow light>02 — Program Unggulan</Eyebrow><div className="mt-9 grid gap-8 lg:grid-cols-2 lg:items-end"><h2 className="font-academic text-4xl font-bold leading-tight sm:text-5xl">Lima layar menuju<br/>HW Kepri Berjaya.</h2><p className="max-w-xl text-lg leading-8 text-emerald-50/70">Program yang terukur, terdokumentasi, dievaluasi, dan ditindaklanjuti untuk menghasilkan dampak nyata.</p></div><div className="mt-14 divide-y divide-white/15 border-y border-white/15">{programmes.map(({number,icon:Icon,title,text})=><article key={number} className="group grid gap-5 py-7 transition hover:bg-white/5 sm:grid-cols-[3rem_3rem_1fr_1.35fr] sm:items-center sm:px-4"><span className="font-academic italic text-amber-300">{number}</span><Icon className="text-emerald-200" size={25}/><h3 className="font-academic text-xl font-bold sm:text-2xl">{title}</h3><p className="leading-7 text-emerald-50/65">{text}</p></article>)}</div></div></section>

    <section id="pelatihan" className="px-5 py-20 sm:px-6 md:py-28 lg:px-8"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center lg:gap-24"><div className="relative rounded-2xl border border-emerald-950/15 bg-[#dcebdd] p-8 shadow-[18px_18px_0_#e5ad3d] sm:p-12"><Eyebrow>03 — Agenda Terdekat</Eyebrow><p className="mt-20 text-xs font-extrabold uppercase tracking-[.24em] text-emerald-800">Pelantikan &amp; Pelatihan</p><h2 className="mt-3 font-academic text-5xl font-bold text-emerald-950 sm:text-7xl">Jaya Melati I</h2><p className="mt-6 font-academic text-lg italic leading-7 text-emerald-800">Menguatkan Kader, Memajukan Persyarikatan, Membangun Kepanduan Kepulauan.</p><div className="mt-16 flex items-center justify-between gap-4"><span className="rounded-lg bg-emerald-950 px-4 py-3 text-xs font-extrabold tracking-[.16em] text-white">COMING SOON</span><MapPinned className="text-amber-700"/></div></div><div><ShieldCheck className="text-amber-600" size={38}/><h3 className="mt-6 font-academic text-4xl font-bold leading-tight text-emerald-950">Bukan sekadar pelatihan. Ini awal gerakan.</h3><p className="mt-6 text-lg leading-8 text-slate-600">Peserta memperoleh penguatan ideologi, kepemimpinan, manajemen qabilah, keterampilan lapangan, kepanduan maritim, kebencanaan, dan komunikasi digital.</p><ul className="mt-8 divide-y divide-emerald-950/15 border-y border-emerald-950/15">{training.map(item=><li key={item} className="flex gap-3 py-4 font-semibold text-slate-700"><span className="text-amber-600">✓</span>{item}</li>)}</ul></div></div></section>

    <section className="bg-emerald-800 px-5 py-20 text-white sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-end"><div><Eyebrow light>04 — Bergerak Bersama</Eyebrow><h2 className="mt-8 font-academic text-4xl font-bold leading-tight sm:text-5xl">Mari besarkan HW<br/>dari pulau ke pulau.</h2></div><div><p className="max-w-xl text-lg leading-8 text-emerald-50/75">Terbuka untuk kolaborasi pendidikan, kepanduan, kemaritiman, lingkungan, kebencanaan, dan pengabdian masyarakat.</p><Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-4 font-bold text-emerald-950 transition hover:bg-amber-400">Bangun Kolaborasi <ArrowRight size={18}/></Link></div></div></section>
  </div>;
}
