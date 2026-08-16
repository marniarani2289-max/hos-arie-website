import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PrintCertificate from "./PrintCertificate";

export default async function CertificatePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("certificate_verification")
    .select("*")
    .eq("certificate_number", code)
    .maybeSingle();

  if (!data) notFound();

  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hossibarani.com";
  const issuedAt = new Date(data.issued_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="certificate-shell min-h-screen bg-stone-200 p-6 text-slate-950">
      <section className="certificate relative mx-auto flex min-h-[1200px] max-w-[850px] flex-col overflow-hidden border-[14px] border-double border-amber-600 bg-[#fffdf7] px-14 py-12 text-center shadow-2xl">
        <div className="absolute inset-5 border border-slate-900/20" />

        <p className="relative z-[1] self-end text-xs font-black tracking-wider text-slate-900">
          {data.certificate_number}
        </p>

        <div className="relative mx-auto mt-6 h-56 w-56">
          <Image
            src="/raja-ali-haji-institute-logo.png"
            alt="Logo Raja Ali Haji Institute"
            fill
            sizes="224px"
            className="object-contain"
            priority
          />
        </div>
        <p className="relative mt-5 text-sm font-bold uppercase tracking-[.4em] text-amber-700">
          Raja Ali Haji Institute
        </p>
        <h1 className="relative mt-7 font-serif text-5xl font-bold">Certificate of Completion</h1>
        <p className="relative mt-9 text-lg">This certificate is proudly presented to</p>
        <h2 className="relative mx-auto mt-5 w-full max-w-2xl border-b border-amber-600 pb-5 font-serif text-4xl font-bold">
          {data.full_name}
        </h2>
        <p className="relative mx-auto mt-10 max-w-3xl text-lg leading-8">
          for successfully completing all eight modules of
        </p>
        <h3 className="relative mt-3 text-2xl font-black">Foundations of Raja Ali Haji&apos;s Thought</h3>
        <p className="relative mt-8">Issued on {issuedAt}</p>

        <PrintCertificate verifyUrl={`${site}/certificates/${code}`} />
      </section>
    </main>
  );
}
