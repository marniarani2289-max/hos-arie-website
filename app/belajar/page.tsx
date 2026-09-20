import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import AlterWorkspace from "./workspace";
export const metadata: Metadata = {
  title: "ALTER — Ruang Belajar Pribadi",
  description:
    "Susun tujuan, telaah sumber, latihan bersama AI, dan bangun karya melalui ruang belajar ALTER.",
  robots: { index: false, follow: true },
};
export default async function LearningPage() {
  let signedIn = false;
  try {
    const db = await createClient();
    const {
      data: { user },
    } = await db.auth.getUser();
    signedIn = !!user && !user.is_anonymous;
  } catch {
    /* Show sign-in state when auth is unavailable. */
  }
  return <AlterWorkspace signedIn={signedIn} />;
}
