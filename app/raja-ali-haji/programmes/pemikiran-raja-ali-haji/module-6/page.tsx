import type { Metadata } from "next";
import ModuleSixLearning from "./ModuleSixLearning";

export const metadata: Metadata = {
  title: "Modul 6 — Musyawarah dan Tanggung Jawab Bersama",
  description: "Membaca Muqaddimah fi Intizam Waza’if al-Malik tentang musyawarah, kecermatan menerima aduan, dan tanggung jawab bersama.",
};

export default function ModuleSixPage() {
  return <ModuleSixLearning />;
}
