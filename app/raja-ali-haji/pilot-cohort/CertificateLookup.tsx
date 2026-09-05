"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function CertificateLookup() {
  const router = useRouter();
  const [code, setCode] = useState("");

  function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const certificateCode = code.trim();
    if (certificateCode) router.push(`/certificates/${encodeURIComponent(certificateCode)}`);
  }

  return (
    <form onSubmit={verify} className="mt-6 flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="certificate-code">Nomor sertifikat</label>
      <input
        id="certificate-code"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        placeholder="Contoh: RAHI-01-2026-000001"
        className="min-h-12 flex-1 rounded-xl border border-stone-300 bg-white px-4 text-base outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/15"
      />
      <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 font-bold text-white transition hover:bg-amber-700">
        <Search size={18} aria-hidden="true" /> Verifikasi
      </button>
    </form>
  );
}
