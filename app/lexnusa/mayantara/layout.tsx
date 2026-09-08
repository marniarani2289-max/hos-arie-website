import type { Metadata } from "next";

const title = "Hukum Kejahatan Mayantara | LexNusa";
const description = "Kelas Hukum Kejahatan Mayantara UMRAH, Program Studi Ilmu Hukum, semester V, 2 SKS. Materi, tugas, rubrik, dan tinjauan dosen sesuai draf RPS.";
export const metadata: Metadata = {
  description,
  openGraph: { title, description, locale: "id_ID", type: "website", url: "https://www.hossibarani.com/lexnusa/mayantara", siteName: "LexNusa", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};
export default function MayantaraLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="id">{children}</div>;
}
