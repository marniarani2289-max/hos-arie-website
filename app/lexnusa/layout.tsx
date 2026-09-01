import type { Metadata } from "next";
import PilotFormBridge from "./PilotFormBridge";

export const metadata: Metadata = {
  openGraph: {
    title: "LexNusa Legal AI | Human Legal Judgment. AI-Ready Intelligence.",
    description: "Boutique Legal Intelligence & AI Evaluation for LegalTech teams, AI companies, law firms, researchers, and international organizations, with Indonesia & ASEAN expertise.",
    url: "https://www.hossibarani.com/lexnusa",
    siteName: "LexNusa Legal AI",
    type: "website",
    images: [{ url: "/lexnusa/opengraph-image", width: 1200, height: 630, alt: "LexNusa Legal AI - Human Legal Judgment. AI-Ready Intelligence." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LexNusa Legal AI | Legal Intelligence & AI Evaluation",
    description: "Human-led Legal AI evaluation, benchmark development, case-law mapping, and Indonesia & ASEAN legal intelligence.",
    images: ["/lexnusa/opengraph-image"],
  },
  keywords: ["Legal AI", "Legal AI evaluation", "Legal intelligence", "Indonesia legal research", "ASEAN legal research", "LLM legal evaluation", "legal benchmark", "LEX-EVAL"],
};

export default function LexNusaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <PilotFormBridge />
    </>
  );
}
