"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function PrintCertificate({ verifyUrl }: { verifyUrl: string }) {
  const [qr, setQr] = useState("");
  useEffect(() => { QRCode.toDataURL(verifyUrl, { width: 180, margin: 1 }).then(setQr); }, [verifyUrl]);
  return <><button onClick={() => window.print()} className="no-print fixed right-6 top-6 z-10 rounded-lg bg-amber-400 px-6 py-3 font-bold text-slate-950 shadow-lg">Unduh / Cetak PDF</button>{qr && <img src={qr} alt="QR verifikasi sertifikat" className="absolute bottom-14 right-16 h-28 w-28" />}</>;
}
