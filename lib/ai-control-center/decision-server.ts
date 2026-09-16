import "server-only";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
export async function decisionUser() {
  const client = await createClient();
  const { data: { user } } = await client.auth.getUser();
  const allowed = (process.env.CONTROL_CENTER_ALLOWED_EMAILS || "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
  return user?.email && allowed.includes(user.email.toLowerCase()) ? user : null;
}
export function decisionService() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("decision_storage_unavailable");
  return createServiceClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
