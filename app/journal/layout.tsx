import type { Metadata } from "next";
import type { ReactNode } from "react";
import JournalFooter from "./JournalFooter";

export const metadata: Metadata = {
  title: { absolute: "Journal of Malay Constitutional Studies (JMCS)" },
  description:
    "The Journal of Malay Constitutional Studies (JMCS) is an international, open-access, double-blind peer-reviewed journal advancing Malay constitutionalism, constitutional law, governance, legal history, and indigenous constitutional thought.",
  keywords: [
    "Journal of Malay Constitutional Studies",
    "JMCS",
    "Malay constitutionalism",
    "constitutional law",
    "constitutional theory",
    "comparative constitutionalism",
    "indigenous constitutionalism",
    "governance",
    "legal history",
    "public law",
  ],
  alternates: {
    canonical: "/journal",
  },
  openGraph: {
    title: "Journal of Malay Constitutional Studies (JMCS)",
    description:
      "An international, open-access, double-blind peer-reviewed journal advancing Malay constitutionalism within global constitutional scholarship.",
    url: "https://www.hossibarani.com/journal",
    siteName: "Journal of Malay Constitutional Studies",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Journal of Malay Constitutional Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal of Malay Constitutional Studies (JMCS)",
    description:
      "International peer-reviewed scholarship on Malay constitutionalism, constitutional law, governance, and legal history.",
    images: ["/og-image.jpg"],
  },
};

export default function JournalLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <JournalFooter />
    </>
  );
}
