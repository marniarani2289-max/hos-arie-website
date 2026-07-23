import type { Metadata } from "next";
import Opinions from "../components/Opinions";

export const metadata: Metadata = {
  title: "Opinions",

  description:
    "Essays and public commentary by Dr. Hos Arie Sibarani on constitutional law, governance, public ethics, Malay civilisation, education, and contemporary legal issues.",

  alternates: {
    canonical: "/opinions",
  },

  openGraph: {
    title: "Opinions | Dr. Hos Arie Sibarani",
    description:
      "Essays and public commentary on constitutional law, governance, public ethics, Malay civilisation, and contemporary legal affairs.",
    url: "/opinions",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Opinions | Dr. Hos Arie Sibarani",
    description:
      "Essays and commentary on law, governance, ethics, education, and Malay civilisation.",
  },
};

export default function OpinionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Opinions />
    </main>
  );
}