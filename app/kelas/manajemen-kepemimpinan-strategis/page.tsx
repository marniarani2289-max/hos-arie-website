import type { Metadata } from "next";
import Classroom from "./Classroom";

export const metadata: Metadata = {
  title: "Manajemen Kepemimpinan Strategis — Ruang Belajar",
  description: "Kelas terbuka Dr. Hos Arie Sibarani: kepemimpinan strategis dan pelembagaan perubahan sekolah, dua video, presentasi PDF, artikel akademik, kuis, dan rencana 90 hari.",
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
