import type { Metadata } from "next";
import DigitalArchive from "../components/DigitalArchive";
export const metadata: Metadata = { title: "Digital Archive", description: "A curated digital archive of Raja Ali Haji manuscripts, Malay intellectual heritage, research notes, and public scholarship.", alternates: { canonical: "/digital-archive" } };
export default function DigitalArchivePage() { return <DigitalArchive />; }
