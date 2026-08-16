"use client";

import Image from "next/image";
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
        className="no-print fixed right-6 top-6 z-10 rounded-lg bg-amber-400 px-6 py-3 font-bold text-slate-950 shadow-lg"
      >
        Unduh / Cetak PDF
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
