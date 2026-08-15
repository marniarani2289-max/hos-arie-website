import type { Metadata } from "next";
import ModuleSevenLearning from "./ModuleSevenLearning";

export const metadata: Metadata = {
  title: "Modul 7 — Keadilan dan Batas Moral Kekuasaan",
  description: "Membaca Gurindam Dua Belas dan Tsamarat al-Muhimmah tentang hukum yang adil, mahkamah, dan pembatasan kekuasaan.",
};

export default function ModuleSevenPage() {
  return <ModuleSevenLearning />;
}
