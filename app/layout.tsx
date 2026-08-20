import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Libre_Baskerville } from "next/font/google";

import "./globals.css";

import Navbar from "./components/Navbar";
import FooterV3 from "./components/layout/FooterV3";
import PersonSchema from "./components/seo/PersonSchema";
import ProgressSync from "./components/learning/ProgressSync";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hossibarani.com"),

  title: {
    default: "Dr. Hos Arie Sibarani | Constitutional Law Scholar",
    template: "%s | Dr. Hos Arie Sibarani",
  },

  description:
    "Official academic website of Dr. Hos Arie Sibarani, a constitutional law scholar researching Malay constitutional thought, Raja Ali Haji, indigenous constitutionalism, governance, and institutional responsibility.",

  keywords: [
    "Hos Arie Sibarani",
    "Constitutional Law",
    "Malay Constitutional Thought",
    "Malay Ethical Constitutionalism",
    "Raja Ali Haji",
    "Indigenous Constitutionalism",
    "Comparative Constitutional Law",
    "Governance",
    "Legal Theory",
    "Indonesia",
  ],

  authors: [
    {
      name: "Dr. Hos Arie Sibarani",
      url: "https://www.hossibarani.com",
    },
  ],

  creator: "Dr. Hos Arie Sibarani",
  publisher: "Dr. Hos Arie Sibarani",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Dr. Hos Arie Sibarani",
    description:
      "Constitutional Law Scholar and Researcher of Malay Constitutional Thought.",
    url: "https://www.hossibarani.com",
    siteName: "Dr. Hos Arie Sibarani",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Hos Arie Sibarani",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dr. Hos Arie Sibarani",
    description:
      "Constitutional Law Scholar and Researcher of Malay Constitutional Thought.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-content-language="en-id">
      <body
        className={`${inter.variable} ${libreBaskerville.variable} min-w-[320px] overflow-x-hidden bg-white text-slate-800 antialiased`}
      >
        <PersonSchema />
        <ProgressSync />

        <Navbar />

        <main>{children}</main>

        <FooterV3 />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-P9LZS36GGV"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              window.dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-P9LZS36GGV', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
