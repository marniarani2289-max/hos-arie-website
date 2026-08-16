"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function PrintCertificate({ verifyUrl }: { verifyUrl: string }) {
  const [qr, setQr] = useState("");

  useEffect(() => {
    QRCode.toDataURL(verifyUrl, { width: 240, margin: 1 }).then(setQr);
  }, [verifyUrl]);

  return (
    <>
      <button
        type="button"
        onClick={() => window.print()}
        aria-label="Unduh sertifikat sebagai PDF"
        title="Unduh sertifikat sebagai PDF"
        className="no-print fixed right-4 top-24 z-[100] inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 shadow-xl transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 sm:right-6"
      >
        <Download aria-hidden="true" size={20} />
        Unduh Sertifikat PDF
      </button>

      <div className="relative z-[1] mt-auto flex flex-col items-center pt-10">
        {qr ? (
          <Image
            src={qr}
            alt="QR verifikasi sertifikat"
            width={144}
            height={144}
            unoptimized
            className="h-36 w-36"
          />
        ) : (
          <div className="h-36 w-36" aria-hidden="true" />
        )}
        <p className="mt-3 font-serif text-lg font-bold">Dr. Hos Arie Sibarani</p>
        <p className="mt-1 text-sm">Founder &amp; Executive Director</p>
        <p className="mt-2 text-sm font-black">Digitally Issued &amp; Verified</p>
        <p className="mt-1 text-xs">Scan to verify this certificate</p>
      </div>
    </>
  );
}
