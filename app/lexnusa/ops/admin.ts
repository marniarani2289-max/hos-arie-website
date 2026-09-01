import { createClient as createAdminClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireLexNusaAdmin(next = "/lexnusa/ops") {
  const auth = await createClient();
  const { data: { user } } = await auth.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("LexNusa operations backend is unavailable.");

  const admin = createAdminClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: allowed } = await admin
    .from("lexnusa_admins")
    .select("user_id,email,display_name")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!allowed) redirect("/dashboard");
  return { admin, user, profile: allowed };
}

export function formatMoney(value: number | string | null | undefined, currency = "USD") {
  if (value === null || value === undefined || value === "") return "—";
  const number = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(number)) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(number);
}

export function formatJakarta(value: string | null | undefined) {
  if (!value) return "—";
  return `${new Date(value).toLocaleString("en-GB", { timeZone: "Asia/Jakarta", dateStyle: "medium", timeStyle: "short" })} WIB`;
}
