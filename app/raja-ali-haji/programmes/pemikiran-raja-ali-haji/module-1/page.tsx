import type { Metadata } from "next";
import ModuleOneLearning from "./ModuleOneLearning";

export const metadata: Metadata = {
  title: "Modul 1: Mengenal Raja Ali Haji dan Dunia Melayu",
  description: "Modul pertama Program Dasar Pemikiran Raja Ali Haji.",
  alternates: { canonical: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-1" },
};

export default function ModuleOnePage() {
  return <ModuleOneLearning />;
}
