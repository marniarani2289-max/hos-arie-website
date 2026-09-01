"use server";

import { createClient as createAdminClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const statuses = new Set(["new", "contacted", "qualified", "won", "lost", "spam"]);

async function requireAdmin() {
  const auth = await createClient();
  const { data: { user } } = await auth.auth.getUser();
  if (!user) redirect("/login?next=/lexnusa/ops");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("LexNusa operations backend is unavailable.");
  const admin = createAdminClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: allowed } = await admin.from("lexnusa_admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!allowed) redirect("/dashboard");
  return admin;
}

export async function updateLead(formData: FormData) {
  const admin = await requireAdmin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") || "");
  const notes = String(formData.get("notes") || "").trim().slice(0, 4000);
  if (!Number.isSafeInteger(id) || id < 1 || !statuses.has(status)) return;
  const { error } = await admin.from("lexnusa_pilot_leads").update({ status, notes: notes || null, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) throw new Error("Could not update LexNusa lead.");
  revalidatePath("/lexnusa/ops");
}
