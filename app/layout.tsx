import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PersonSchema from "./components/seo/PersonSchema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hossibarani.com"),

  title: {
    default:
      "Dr. Hos Arie Rhamadhan Sibarani | Constitutional Law Scholar",
    template: "%s | Dr. Hos Arie Rhamadhan Sibarani",
  },

  description:
    "Official academic website of Dr. Hos Arie Rhamadhan Sibarani, an Indonesian constitutional law scholar researching Raja Ali Haji, Malay Ethical Constitutionalism, indigenous constitutionalism, comparative constitutional theory, private law, and environmental governance.",

  keywords: [
    "Dr. Hos Arie Rhamadhan Sibarani",
    "Hos Arie Sibarani",
    "Constitutional Law",
    "Constitutional Theory",
    "Comparative Constitutional Law",
    "Malay Ethical Constitutionalism",
    "Raja Ali Haji",
    "Indigenous Constitutionalism",
    "Malay Intellectual History",
    "Islamic Constitutional Thought",
    "Riau-Lingga Sultanate",
    "Vicarious Liability",
    "Corrective Justice",
    "Environmental Governance",
  ],

  authors: [
    {
      name: "Dr. Hos Arie Rhamadhan Sibarani",
      url: "https://www.hossibarani.com",
    },
  ],

  creator: "Dr. Hos Arie Rhamadhan Sibarani",
  publisher: "Dr. Hos Arie Rhamadhan Sibarani",

  alternates: {
    canonical: "https://www.hossibarani.com",
  },

  openGraph: {
    title:
      "Dr. Hos Arie Rhamadhan Sibarani | Constitutional Law Scholar",
    description:
      "Research on Raja Ali Haji, Malay Ethical Constitutionalism, indigenous constitutionalism, comparative constitutional law, and governance.",
    url: "https://www.hossibarani.com",
    siteName: "Dr. Hos Arie Rhamadhan Sibarani",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Dr. Hos Arie Rhamadhan Sibarani academic website",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Dr. Hos Arie Rhamadhan Sibarani | Constitutional Law Scholar",
    description:
      "Research on Raja Ali Haji, Malay Ethical Constitutionalism, indigenous constitutionalism, and comparative constitutional law.",
    images: ["/opengraph-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },

  category: "Academic Research",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white text-slate-900 antialiased`}
      >
        <PersonSchema />
        {children}
      </body>
    </html>
  );
}