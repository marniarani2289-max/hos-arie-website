"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireLexNusaAdmin } from "./admin";

const currencies = new Set(["USD", "IDR", "SGD", "MYR"]);
const proposalTransitions: Record<string, Set<string>> = {
  draft: new Set(["sent"]),
  sent: new Set(["under_review", "accepted", "rejected", "expired"]),
  under_review: new Set(["negotiation", "accepted", "rejected", "expired"]),
  negotiation: new Set(["accepted", "rejected", "expired"]),
  accepted: new Set(),
  rejected: new Set(),
  expired: new Set(),
};

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

  await admin.from("lexnusa_pilot_leads").update({ estimated_value: fee, currency, updated_at: new Date().toISOString() }).eq("id", leadId);

  revalidatePath("/lexnusa/ops");
  revalidatePath(`/lexnusa/ops/${leadId}`);
  redirect(`/lexnusa/ops/proposals/${proposal.id}`);
}

export async function updateProposalStatus(formData: FormData) {
  const { admin, user } = await requireLexNusaAdmin();
  const proposalId = Number(formData.get("proposal_id"));
  const requestedStatus = String(formData.get("status") || "").trim();
  const reason = String(formData.get("reason") || "").trim().slice(0, 2000);

  if (!Number.isSafeInteger(proposalId) || proposalId < 1) throw new Error("Invalid proposal.");

  const { data: proposal, error: loadError } = await admin
    .from("lexnusa_proposals")
    .select("id,lead_id,proposal_no,status")
    .eq("id", proposalId)
    .maybeSingle();
  if (loadError || !proposal) throw new Error("Could not load LexNusa proposal.");

  const allowed = proposalTransitions[proposal.status];
  if (!allowed || !allowed.has(requestedStatus)) {
    throw new Error(`Invalid proposal transition: ${proposal.status} → ${requestedStatus}`);
  }

  const now = new Date().toISOString();
  const patch: Record<string, unknown> = { status: requestedStatus, updated_at: now };
  if (requestedStatus === "sent") patch.sent_at = now;
  if (requestedStatus === "accepted") patch.accepted_at = now;
  if (requestedStatus === "rejected") {
    patch.rejected_at = now;
    patch.lost_reason = reason || null;
  }

  const { error: updateError } = await admin.from("lexnusa_proposals").update(patch).eq("id", proposalId);
  if (updateError) throw new Error("Could not update proposal status.");

  const activityType = requestedStatus === "sent"
    ? "proposal_sent"
    : requestedStatus === "accepted"
      ? "proposal_accepted"
      : requestedStatus === "rejected"
        ? "proposal_rejected"
        : "proposal_status_changed";

  await addActivity(
    admin,
    proposal.lead_id,
    user.id,
    activityType,
    `Proposal ${proposal.proposal_no} moved from ${proposal.status} to ${requestedStatus}`,
    { proposal_id: proposalId, proposal_no: proposal.proposal_no, from: proposal.status, to: requestedStatus, reason: reason || null },
  );

  revalidatePath("/lexnusa/ops");
  revalidatePath(`/lexnusa/ops/${proposal.lead_id}`);
  revalidatePath(`/lexnusa/ops/proposals/${proposalId}`);
}
