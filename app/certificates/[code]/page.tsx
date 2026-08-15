import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PrintCertificate from "./PrintCertificate";

export default async function CertificatePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("certificate_verification").select("*").eq("certificate_number", code).maybeSingle();
  if (!data) notFound();
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hossibarani.com";
  return <main className="certificate-shell min-h-screen bg-stone-200 p-6 text-slate-950"><section className="certificate relative mx-auto aspect-[1.414/1] max-w-6xl overflow-hidden border-[14px] border-double border-amber-600 bg-[#fffdf7] p-12 text-center shadow-2xl">
    <div className="absolute inset-5 border border-slate-900/20"/><p className="relative text-sm font-bold uppercase tracking-[.4em] text-amber-700">Raja Ali Haji Institute</p><h1 className="relative mt-8 font-serif text-5xl font-bold">Certificate of Completion</h1><p className="relative mt-7 text-lg">This certificate is proudly presented to</p><h2 className="relative mt-4 border-b border-amber-600 pb-4 font-serif text-4xl font-bold">{data.full_name}</h2><p className="relative mx-auto mt-7 max-w-3xl text-lg leading-8">for successfully completing all eight modules of</p><h3 className="relative mt-3 text-2xl font-black">Foundations of Raja Ali Haji&apos;s Thought</h3><p className="relative mt-7">Issued on {new Date(data.issued_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p><div className="absolute bottom-14 left-16 text-left"><div className="w-64 border-b border-slate-800"/><p className="mt-2 font-serif font-bold">Dr. Hos Arie Sibarani</p><p className="text-sm">Founder &amp; Executive Director</p></div><p className="absolute bottom-16 left-1/2 -translate-x-1/2 text-xs font-bold tracking-wider">{data.certificate_number}</p><PrintCertificate verifyUrl={`${site}/certificates/${code}`} />
  </section></main>;
}
