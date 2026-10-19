import type { Metadata } from "next";
import BlueEducationPage, { metadata as originalMetadata } from "../page";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { ...originalMetadata, title: "Panduan & Program Pendidikan Biru", alternates: { canonical: "/blue-education/panduan" }, openGraph: { ...originalMetadata.openGraph, url: "/blue-education/panduan" } };
export default BlueEducationPage;
