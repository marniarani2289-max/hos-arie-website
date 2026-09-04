import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireControlCenterAccess() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const allowlist = (process.env.CONTROL_CENTER_ALLOWED_EMAILS || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  const email = user.email?.toLowerCase();
  if (!email || !allowlist.includes(email)) redirect("/");

  return user;
}
