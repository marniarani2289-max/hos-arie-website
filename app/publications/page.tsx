import type { Metadata } from "next";
import Publications from "../components/Publications";

export const metadata: Metadata = {
  title: "Academic Publications",
  description:
    "Academic publications, journal articles, books, and research by Dr. Hos Arie Sibarani on constitutional law, Raja Ali Haji, Malay constitutional thought, and governance.",
  alternates: { canonical: "/publications" },
  openGraph: {
    title: "Academic Publications | Dr. Hos Arie Sibarani",
    description:
      "Journal articles, books, and research in constitutional law, Malay constitutional thought, Raja Ali Haji studies, and governance.",
    url: "/publications",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Academic Publications | Dr. Hos Arie Sibarani",
    description:
      "Academic publications in constitutional law, Malay constitutional thought, Raja Ali Haji studies, and indigenous constitutionalism.",
  },
};

export default function PublicationsPage() {
  return (
    <main className="bg-white">
      <Publications />
    </main>
  );
}
