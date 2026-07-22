import type { Metadata, Viewport } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import FooterV3 from "./components/layout/FooterV3";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dr. Hos Arie Sibarani",
    template: "%s | Dr. Hos Arie Sibarani",
  },
  description:
    "Constitutional law scholar and researcher of Malay constitutional thought, Raja Ali Haji, and indigenous constitutionalism.",
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
    <html lang="en">
      <body
        className={`${inter.variable} ${libreBaskerville.variable} min-w-[320px] overflow-x-hidden bg-white text-slate-800 antialiased`}
      >
        <Navbar />

        <main>{children}</main>

        <FooterV3 />
      </body>
    </html>
  );
}