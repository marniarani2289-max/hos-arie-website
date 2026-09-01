"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireLexNusaAdmin } from "./admin";

const currencies = new Set(["USD", "IDR", "SGD", "MYR"]);

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
  if (error) console.error("LexNusa proposal activity log failed", error);
}

export async function createProposal(formData: FormData) {
  const { admin, user } = await requireLexNusaAdmin();
  const leadId = Number(formData.get("lead_id"));
  const title = String(formData.get("title") || "").trim().slice(0, 240);
  const scope = String(formData.get("scope") || "").trim().slice(0, 12000);
  const deliverables = String(formData.get("deliverables") || "").trim().slice(0, 12000);
  const timeline = String(formData.get("timeline") || "").trim().slice(0, 4000);
  const feeRaw = String(formData.get("fee") || "").trim();
  const currencyRaw = String(formData.get("currency") || "USD").trim().toUpperCase();
  const validUntilRaw = String(formData.get("valid_until") || "").trim();
  const terms = String(formData.get("terms") || "").trim().slice(0, 12000);

  if (!Number.isSafeInteger(leadId) || leadId < 1 || !title || !scope || !deliverables || !timeline || !feeRaw) return;
  const fee = Number(feeRaw);
  if (!Number.isFinite(fee) || fee < 0 || fee > 999999999999) return;
  const currency = currencies.has(currencyRaw) ? currencyRaw : "USD";
  const valid_until = validUntilRaw || null;

  const { data: lead, error: leadError } = await admin
    .from("lexnusa_pilot_leads")
    .select("id,name,status,estimated_value,currency")
    .eq("id", leadId)
    .maybeSingle();
  if (leadError || !lead) throw new Error("Could not load LexNusa lead.");
  if (lead.status !== "qualified") redirect(`/lexnusa/ops/${leadId}?proposal=requires-qualified`);

  const { data: proposalNo, error: numberError } = await admin.rpc("lexnusa_next_proposal_no");
  if (numberError || !proposalNo) throw new Error("Could not generate proposal number.");

  const { data: proposal, error } = await admin.from("lexnusa_proposals").insert({
    lead_id: leadId,
    proposal_no: proposalNo,
    title,
    scope,
    deliverables,
    timeline,
    fee,
    currency,
    valid_until,
    terms: terms || null,
    status: "draft",
    created_by: user.id,
  }).select("id,proposal_no").single();

  if (error || !proposal) throw new Error("Could not create LexNusa proposal.");

  await addActivity(admin, leadId, user.id, "proposal_created", `Proposal ${proposal.proposal_no} created`, {
    proposal_id: proposal.id,
    proposal_no: proposal.proposal_no,
    fee,
    currency,
    valid_until,
  });

  // Keep pipeline value aligned with the current proposal value at creation time.
  await admin.from("lexnusa_pilot_leads").update({ estimated_value: fee, currency, updated_at: new Date().toISOString() }).eq("id", leadId);

  revalidatePath("/lexnusa/ops");
  revalidatePath(`/lexnusa/ops/${leadId}`);
  redirect(`/lexnusa/ops/proposals/${proposal.id}`);
}
