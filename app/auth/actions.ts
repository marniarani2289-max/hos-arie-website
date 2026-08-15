"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const fullName = String(formData.get("fullName") || "").trim();
  const institution = String(formData.get("institution") || "").trim();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback`,
      data: { full_name: fullName, institution },
    },
  });
  redirect(error ? `/register?error=${encodeURIComponent(error.message)}` : "/register?success=1");
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email") || "").trim(),
    password: String(formData.get("password") || ""),
  });
  const requestedNext = String(formData.get("next") || "");
  const safeNext = requestedNext.startsWith("/") && !requestedNext.startsWith("//")
    ? requestedNext
    : "/dashboard";
  redirect(error ? `/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(safeNext)}` : safeNext);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/raja-ali-haji");
}
