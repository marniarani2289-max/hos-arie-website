import type { Metadata } from "next";
import Books from "../components/Books";
export const metadata: Metadata = { title: "Books & Monographs", description: "Books and monograph projects by Dr. Hos Arie Sibarani." };
export default function BooksPage() { return <Books />; }
