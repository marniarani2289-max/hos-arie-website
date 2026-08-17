import type { Metadata } from "next";
import ModuleOneLearning from "./ModuleOneLearning";

export const metadata: Metadata = {
  title: "Modul 1: Mengenal Raja Ali Haji dan Dunia Melayu",
  description: "Modul pertama Program Dasar Pemikiran Raja Ali Haji.",
};

export default function ModuleOnePage() {
  return <ModuleOneLearning />;
}
