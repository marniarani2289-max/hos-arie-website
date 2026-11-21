import type { Metadata } from "next";
import Classroom from "./Classroom";

export const metadata: Metadata = {
  title: "Manajemen Kepemimpinan Strategis — Ruang Belajar",
  description: "Kelas terbuka Dr. Hos Arie Sibarani: kepala sekolah sebagai pemimpin strategis, video pembelajaran, presentasi 20 slide, kuis, dan rencana aksi 90 hari.",
  alternates: { canonical: "/kelas/manajemen-kepemimpinan-strategis" },
  openGraph: {
    title: "Manajemen Kepemimpinan Strategis",
    description: "Mengubah rutinitas sekolah menjadi dampak pembelajaran. Belajar bersama Dr. Hos Arie Sibarani.",
    url: "/kelas/manajemen-kepemimpinan-strategis",
    locale: "id_ID",
    type: "website",
  },
};

export default function Page() { return <Classroom />; }
