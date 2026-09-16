import Link from "next/link";
import { requireControlCenterAccess } from "@/lib/ai-control-center/access";
import DecisionWorkspace from "./workspace";
export const dynamic = "force-dynamic";
export const metadata = { title: "Pusat Keputusan AI | Control Center", robots: { index: false, follow: false } };
export default async function Page() {
  await requireControlCenterAccess();
  return <main className="min-h-screen bg-[#f7f4ef] px-4 py-10 text-slate-950 sm:px-8"><div className="mx-auto max-w-7xl">
    <Link href="/control-center" className="text-sm font-semibold text-amber-800 underline underline-offset-4">Kembali ke Control Center</Link>
    <header className="my-7 border-b border-stone-300 pb-6"><p className="text-sm font-bold uppercase tracking-widest text-amber-800">Ruang kerja administrator</p><h1 className="mt-3 text-3xl font-black sm:text-5xl">Pusat Keputusan AI</h1><p className="mt-4 max-w-3xl leading-7 text-slate-600">Susun bukti, bandingkan pilihan, dan catat keputusan beserta tindak lanjutnya.</p></header>
    <DecisionWorkspace />
  </div></main>;
}
