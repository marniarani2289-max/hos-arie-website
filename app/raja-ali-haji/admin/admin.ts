import { createClient as createAdminClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireRahiAdmin(next = "/raja-ali-haji/admin/pilot-01") {
  const auth = await createClient();
  const { data: { user } } = await auth.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("RAHI admin configuration is unavailable.");
  const admin = createAdminClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: allowed } = await admin.from("rahi_admins").select("user_id,email,display_name").eq("user_id", user.id).maybeSingle();
  if (!allowed) redirect("/dashboard?error=admin-access-denied");
  return { admin, user, profile: allowed };
}

