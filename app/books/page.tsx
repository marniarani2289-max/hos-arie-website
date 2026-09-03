import type { Metadata } from "next";
import Books from "../components/Books";
export const metadata: Metadata = { title: "Books & Monographs", description: "Books and monograph projects by Dr. Hos Arie Sibarani on constitutional law, Raja Ali Haji, Malay constitutional thought, governance, and legal theory.", alternates: { canonical: "/books" } };
export default function BooksPage() { return <Books />; }
