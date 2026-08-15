import type { Metadata } from "next";
import ModuleThreeLearning from "./ModuleThreeLearning";

export const metadata: Metadata = {
  title: "Modul 3 — Bahasa, Adab, dan Tata Pikiran",
  description: "Pembelajaran Bustan al-Katibin sebagai tata bahasa, pendidikan akal, adab belajar, dan tanggung jawab komunikasi.",
};

export default function ModuleThreePage() {
  return <ModuleThreeLearning />;
}
