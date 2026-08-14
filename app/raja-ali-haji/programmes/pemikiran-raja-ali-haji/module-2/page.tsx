import type { Metadata } from "next";
import ModuleTwoLearning from "./ModuleTwoLearning";

export const metadata: Metadata = {
  title: "Modul 2: Gurindam Dua Belas — Etika dan Pembentukan Karakter",
  description: "Modul kedua Program Dasar Pemikiran Raja Ali Haji.",
};

export default function ModuleTwoPage() {
  return <ModuleTwoLearning />;
}
