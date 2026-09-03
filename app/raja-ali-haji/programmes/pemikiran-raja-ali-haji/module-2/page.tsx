import type { Metadata } from "next";
import ModuleTwoLearning from "./ModuleTwoLearning";

export const metadata: Metadata = {
  title: "Modul 2: Gurindam Dua Belas — Etika dan Pembentukan Karakter",
  description: "Modul kedua Program Dasar Pemikiran Raja Ali Haji.",
  alternates: { canonical: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-2" },
};

export default function ModuleTwoPage() {
  return <ModuleTwoLearning />;
}
