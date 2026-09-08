import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PathwayChooser, { PurposeNavigation } from "../components/home/PathwayChooser";

export const metadata: Metadata = {
  title: "Akademisi Hukum Tata Negara & Pemikiran Raja Ali Haji",
  description: "Situs resmi Dr. Hos Arie Sibarani tentang hukum tata negara, pemikiran konstitusional Melayu, Raja Ali Haji, publikasi, dan kolaborasi akademik.",
  alternates: { canonical: "/id", languages: { id: "/id", en: "/" } },
};


export default function IndonesianHomePage() {
  return <main className="bg-white text-slate-900">
    <PurposeNavigation />
    <section className="relative overflow-hidden bg-slate-950 text-white"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,.15),transparent_35%)]"/><div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-8 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:py-24"><div><p className="text-xs font-bold uppercase tracking-[.25em] text-amber-300">Dari Penyengat menuju diskursus konstitusi global</p><h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">Membawa pemikiran konstitusional Melayu ke panggung keilmuan dunia.</h1><p className="mt-7 max-w-3xl text-xl leading-9 text-slate-300">Dr. Hos Arie Sibarani mengembangkan riset tentang kewenangan, keadilan, akuntabilitas, pembatasan kekuasaan, serta etika pemerintahan dalam pemikiran Raja Ali Haji.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/id/research" className="rounded-xl bg-amber-600 px-6 py-4 font-semibold text-white hover:bg-amber-500">Jelajahi Riset</Link><Link href="/id/contact" className="rounded-xl border border-white/20 px-6 py-4 font-semibold hover:bg-white/10">Bangun Kolaborasi</Link></div></div><div className="relative mx-auto h-[420px] w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10"><Image src="/images/profile/hos-arie.png" alt="Dr. Hos Arie Sibarani" fill priority sizes="(max-width:1024px) 90vw, 40vw" className="object-cover object-top"/><div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"/><div className="absolute inset-x-0 bottom-0 p-7"><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-300">Program Riset Utama</p><p className="mt-2 text-2xl font-bold">Konstitusionalisme Etis Melayu</p></div></div></div></section>
    <PathwayChooser compact />
  </main>;
}
