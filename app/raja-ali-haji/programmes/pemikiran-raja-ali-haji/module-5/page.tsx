import type { Metadata } from "next";
import ModuleFiveLearning from "./ModuleFiveLearning";

export const metadata: Metadata = {
  title: "Modul 5 — Tsamarat al-Muhimmah: Tanggung Jawab Pejabat",
  description: "Membaca kekuasaan sebagai amanah, tertib tugas, keadilan mahkamah, dan pertanggungjawaban pejabat.",
  alternates: { canonical: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-5" },
};

export default function ModuleFivePage() {
  return <ModuleFiveLearning />;
}
