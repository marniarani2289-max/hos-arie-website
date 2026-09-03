import type { Metadata } from "next";
import ModuleSixLearning from "./ModuleSixLearning";

export const metadata: Metadata = {
  title: "Modul 6 — Musyawarah dan Tanggung Jawab Bersama",
  description: "Membaca Muqaddimah fi Intizam Waza’if al-Malik tentang musyawarah, kecermatan menerima aduan, dan tanggung jawab bersama.",
  alternates: { canonical: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-6" },
};

export default function ModuleSixPage() {
  return <ModuleSixLearning />;
}
