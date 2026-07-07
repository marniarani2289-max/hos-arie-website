import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Hos Arie Sibarani | Legal Scholar",
  description:
    "Official academic website of Dr. Hos Arie Sibarani. Research on Constitutional Theory, Malay Ethical Constitutionalism, Raja Ali Haji, Private Law, Environmental Law, and Malay Studies.",
  keywords: [
    "Hos Arie Sibarani",
    "Dr Hos Arie Sibarani",
    "Legal Scholar",
    "Constitutional Theory",
    "Malay Ethical Constitutionalism",
    "Raja Ali Haji",
    "Malay Studies",
    "Private Law",
    "Environmental Law",
    "Indonesia",
  ],
  authors: [{ name: "Dr. Hos Arie Sibarani" }],
  creator: "Dr. Hos Arie Sibarani",
  publisher: "Hos Arie",
  openGraph: {
    title: "Dr. Hos Arie Sibarani | Legal Scholar",
    description:
      "Official academic website of Dr. Hos Arie Sibarani.",
    url: "https://hosarie.com",
    siteName: "Hos Arie",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}
      >
        {children}
      </body>
    </html>
  );
}