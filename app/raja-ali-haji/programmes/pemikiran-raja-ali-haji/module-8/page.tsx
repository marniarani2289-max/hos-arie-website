import type { Metadata } from "next";
import ModuleEightLearning from "./ModuleEightLearning";

export const metadata: Metadata = {
  title: "Modul 8 — Relevansi Pemikiran Raja Ali Haji bagi Dunia Kontemporer",
  description: "Modul sintesis tentang bahasa, etika, pengetahuan, masyarakat, dan kekuasaan dalam pemikiran Raja Ali Haji untuk menjawab persoalan masa kini.",
  alternates: { canonical: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-8" },
};

export default function ModuleEightPage() {
  return <ModuleEightLearning />;
}
