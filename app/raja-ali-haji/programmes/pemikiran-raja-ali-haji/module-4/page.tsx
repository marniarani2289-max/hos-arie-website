import type { Metadata } from "next";
import ModuleFourLearning from "./ModuleFourLearning";

export const metadata: Metadata = {
  title: "Modul 4 — Kata, Makna, dan Dunia Melayu",
  description: "Membaca Kitab Pengetahuan Bahasa sebagai kamus, peta pengetahuan, dan arsip pandangan dunia Melayu.",
  alternates: { canonical: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-4" },
};

export default function ModuleFourPage() {
  return <ModuleFourLearning />;
}
