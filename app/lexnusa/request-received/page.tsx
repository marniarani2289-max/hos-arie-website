import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Request Received | LexNusa Legal AI",
  description: "Confirmation that a LexNusa pilot request has been received.",
  robots: { index: false, follow: false },
};

export default async function RequestReceived({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  return (
    <main className="min-h-[75vh] bg-[#0D1B2A] px-5 py-20 text-white sm:px-8">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[.06] p-8 shadow-2xl sm:p-12">
        <div className="inline-flex rounded-full bg-[#0E6B6F] p-4"><CheckCircle2 size={34}/></div>
        <p className="mt-7 text-xs font-black uppercase tracking-[.22em] text-[#C9A24B]">LexNusa Legal AI</p>
        <h1 className="mt-3 font-academic text-4xl font-bold sm:text-5xl">Request received.</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">Thank you. Your pilot request has been securely recorded. LexNusa will review the scope and respond using the work email you provided.</p>
        {ref ? <p className="mt-5 rounded-xl bg-black/20 px-4 py-3 text-sm text-slate-300">Reference: <strong className="text-white">{ref}</strong></p> : null}
        <p className="mt-5 text-sm leading-6 text-slate-400">Please do not send confidential documents until scope and handling arrangements have been agreed.</p>
        <Link href="/lexnusa" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#C9A24B] px-5 py-3 font-black text-[#0D1B2A]"><ArrowLeft size={17}/> Back to LexNusa</Link>
      </div>
    </main>
  );
}
