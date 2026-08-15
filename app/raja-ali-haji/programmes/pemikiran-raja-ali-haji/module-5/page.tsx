import type { Metadata } from "next";
import ModuleFiveLearning from "./ModuleFiveLearning";

export const metadata: Metadata = {
  title: "Modul 5 — Tsamarat al-Muhimmah: Tanggung Jawab Pejabat",
  description: "Membaca kekuasaan sebagai amanah, tertib tugas, keadilan mahkamah, dan pertanggungjawaban pejabat.",
};

export default function ModuleFivePage() {
  return <ModuleFiveLearning />;
}
