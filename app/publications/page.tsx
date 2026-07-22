import Publications from "../components/Publications";

export default function PublicationsPage() {
  return (
    <main className="bg-white">
      <Publications />
    </main>
  );
}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications",

  description:
    "Academic publications, journal articles, books, research papers, and scholarly works by Dr. Hos Arie Sibarani in constitutional law and Malay constitutional thought.",

  alternates: {
    canonical: "/publications",
  },

  openGraph: {
    title: "Publications | Dr. Hos Arie Sibarani",
    description:
      "Explore journal articles, books, research papers, and academic publications by Dr. Hos Arie Sibarani.",
    url: "/publications",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Publications | Dr. Hos Arie Sibarani",
    description:
      "Academic publications in constitutional law, Malay constitutional thought, and indigenous constitutionalism.",
  },
};