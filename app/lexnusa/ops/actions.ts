"use server";

import { revalidatePath } from "next/cache";
import { requireLexNusaAdmin } from "./admin";

const statuses = new Set(["new", "contacted", "qualified", "won", "lost", "spam"]);
const currencies = new Set(["USD", "IDR", "SGD", "MYR"]);

type LeadSnapshot = {
  id: number;
  status: string;
  notes: string | null;
  follow_up_at: string | null;
  estimated_value: number | null;
  currency: string;
  owner_user_id: string | null;
};

function parseJakartaDate(value: string) {
  if (!value) return null;
  const parsed = new Date(`${value}:00+07:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

async function addActivity(
  admin: Awaited<ReturnType<typeof requireLexNusaAdmin>>["admin"],
  leadId: number,
  actorId: string,
  activityType: string,
  summary: string,
  details: Record<string, unknown> = {},
) {
  const { error } = await admin.from("lexnusa_lead_activities").insert({
    lead_id: leadId,
    actor_user_id: actorId,
    activity_type: activityType,
    summary,
    details,
  });
  if (error) console.error("LexNusa CRM activity log failed", error);
}

export async function quickUpdateStatus(formData: FormData) {
  const { admin, user } = await requireLexNusaAdmin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") || "");
  if (!Number.isSafeInteger(id) || id < 1 || !statuses.has(status)) return;
  const { data: before } = await admin.from("lexnusa_pilot_leads").select("status").eq("id", id).maybeSingle();
  if (!before || before.status === status) return;
  const { error } = await admin.from("lexnusa_pilot_leads").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) throw new Error("Could not update LexNusa lead status.");
  await addActivity(admin, id, user.id, "status_changed", `Status changed from ${before.status} to ${status}`, { from: before.status, to: status });
  revalidatePath("/lexnusa/ops");
  revalidatePath(`/lexnusa/ops/${id}`);
}

export async function updateLead(formData: FormData) {
  const { admin, user } = await requireLexNusaAdmin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") || "");
  const notes = String(formData.get("notes") || "").trim().slice(0, 4000);
  const followUpRaw = String(formData.get("follow_up_at") || "").trim();
  const estimatedRaw = String(formData.get("estimated_value") || "").trim();
  const currencyRaw = String(formData.get("currency") || "USD").trim().toUpperCase();
  const ownerRaw = String(formData.get("owner_user_id") || "").trim();

  if (!Number.isSafeInteger(id) || id < 1 || !statuses.has(status)) return;
  const currency = currencies.has(currencyRaw) ? currencyRaw : "USD";
  const follow_up_at = parseJakartaDate(followUpRaw);
  const estimated_value = estimatedRaw === "" ? null : Number(estimatedRaw);
  if (estimated_value !== null && (!Number.isFinite(estimated_value) || estimated_value < 0 || estimated_value > 9999999999)) return;

  let owner_user_id: string | null = ownerRaw || null;
  if (owner_user_id) {
    const { data: owner } = await admin.from("lexnusa_admins").select("user_id").eq("user_id", owner_user_id).maybeSingle();
    if (!owner) owner_user_id = null;
  }

  const { data: before, error: beforeError } = await admin
    .from("lexnusa_pilot_leads")
    .select("id,status,notes,follow_up_at,estimated_value,currency,owner_user_id")
    .eq("id", id)
    .maybeSingle();
  if (beforeError || !before) throw new Error("Could not load LexNusa lead.");
  const previous = before as LeadSnapshot;

  const { error } = await admin.from("lexnusa_pilot_leads").update({
    status,
    notes: notes || null,
    follow_up_at,
    estimated_value,
    currency,
    owner_user_id,
    updated_at: new Date().toISOString(),
  }).eq("id", id);
  if (error) throw new Error("Could not update LexNusa lead.");

  if (previous.status !== status) await addActivity(admin, id, user.id, "status_changed", `Status changed from ${previous.status} to ${status}`, { from: previous.status, to: status });
  if ((previous.notes || "") !== notes) await addActivity(admin, id, user.id, "note_updated", notes ? "Internal note updated" : "Internal note cleared", { note: notes || null });
  if ((previous.follow_up_at || null) !== follow_up_at) await addActivity(admin, id, user.id, "follow_up_changed", follow_up_at ? "Follow-up date updated" : "Follow-up date cleared", { from: previous.follow_up_at, to: follow_up_at });
  if (Number(previous.estimated_value ?? -1) !== Number(estimated_value ?? -1) || previous.currency !== currency) await addActivity(admin, id, user.id, "value_changed", "Estimated project value updated", { from: previous.estimated_value, to: estimated_value, currency });
  if ((previous.owner_user_id || null) !== owner_user_id) await addActivity(admin, id, user.id, "owner_changed", owner_user_id ? "Lead owner changed" : "Lead owner cleared", { from: previous.owner_user_id, to: owner_user_id });

  revalidatePath("/lexnusa/ops");
  revalidatePath(`/lexnusa/ops/${id}`);
}

export async function addManualActivity(formData: FormData) {
  const { admin, user } = await requireLexNusaAdmin();
  const id = Number(formData.get("id"));
  const summary = String(formData.get("summary") || "").trim().slice(0, 1000);
  if (!Number.isSafeInteger(id) || id < 1 || !summary) return;
  await addActivity(admin, id, user.id, "manual_note", summary);
  revalidatePath(`/lexnusa/ops/${id}`);
}
