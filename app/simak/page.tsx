import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "SIMAKS | Sistem Monitoring Akreditasi Sekolah",
  description:
    "Akses SIMAKS, platform monitoring akreditasi sekolah berbasis data, bukti, evaluasi, dan perbaikan.",
};

export default function SimakPage() {
  redirect("https://simaks.hossibarani.com");
}
