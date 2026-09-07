'use client';
export default function PrintButton(){return <button onClick={()=>window.print()} className="rounded-lg bg-teal-800 px-6 py-3 text-white print:hidden">Cetak / Simpan PDF</button>;}
