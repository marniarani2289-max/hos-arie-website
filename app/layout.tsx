import type { Metadata } from "next";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Dr. Hos Arie Sibarani",
    template: "%s | Dr. Hos Arie Sibarani",
  },
  description:
    "Constitutional law scholar and researcher of Malay constitutional thought, Raja Ali Haji, and indigenous constitutionalism.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-800 antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}