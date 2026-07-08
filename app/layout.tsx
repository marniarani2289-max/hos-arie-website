import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
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
  metadataBase: new URL("https://www.hossibarani.com"),
  title: {
    default: "Dr. Hos Arie Sibarani | Legal Scholar",
    template: "%s | Dr. Hos Arie Sibarani",
  },
  description:
    "Official academic website of Dr. Hos Arie Sibarani. Research on Constitutional Theory, Malay Ethical Constitutionalism, Raja Ali Haji, Private Law, Environmental Law, and Malay Studies.",
  openGraph: {
    title: "Dr. Hos Arie Sibarani | Legal Scholar",
    description: "Official academic website of Dr. Hos Arie Sibarani.",
    url: "https://www.hossibarani.com",
    siteName: "Dr. Hos Arie Sibarani",
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