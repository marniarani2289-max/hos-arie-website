import type { Metadata } from "next";
import DigitalArchive from "../components/DigitalArchive";
export const metadata: Metadata = { title: "Digital Archive", description: "A curated archive of manuscripts, research notes, and public scholarship." };
export default function DigitalArchivePage() { return <DigitalArchive />; }
