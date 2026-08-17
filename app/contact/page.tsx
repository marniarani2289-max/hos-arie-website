import type { Metadata } from "next";
import Contact from "../components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Dr. Hos Arie Sibarani for academic collaboration, research, lectures, conferences, and media inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-[70vh] bg-gray-950">
      <Contact />
    </div>
  );
}
