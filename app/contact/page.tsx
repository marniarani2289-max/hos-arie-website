import type { Metadata } from "next";
import Contact from "../components/Contact";
import LexNusaPilotLead from "./LexNusaPilotLead";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Dr. Hos Arie Sibarani for academic collaboration, research, lectures, conferences, media inquiries, and LexNusa Legal AI projects.",
  alternates: { canonical: "/contact", languages: { id: "/id/contact", en: "/contact" } },
};

type Search = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => Array.isArray(v) ? (v[0] || "") : (v || "");

export default async function ContactPage({ searchParams }: { searchParams: Promise<Search> }) {
  const p = await searchParams;
  const isLexNusa = one(p.subject) === "LexNusa Pilot Project";
  if (isLexNusa) return <LexNusaPilotLead name={one(p.name)} organization={one(p.organization)} email={one(p.email)} project={one(p.project)} message={one(p.message)} />;
  return <div className="min-h-[70vh] bg-gray-950"><Contact /></div>;
}
