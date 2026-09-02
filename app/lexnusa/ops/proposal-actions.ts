"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireLexNusaAdmin } from "./admin";
import { proposalPdfFilename, renderProposalPdf } from "@/lib/lexnusa/proposal-pdf";

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
const emailableProposalStatuses = new Set(["draft", "sent", "under_review", "negotiation"]);

function escapeHtml(value: string) {
  return value.replace(/[&<>'\"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[char] || char);
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

export async function sendProposalEmail(formData: FormData) {
  const { admin, user } = await requireLexNusaAdmin();
  const proposalId = Number(formData.get("proposal_id"));
  const subject = String(formData.get("subject") || "").trim().slice(0, 300);
  const message = String(formData.get("message") || "").trim().slice(0, 10000);
  if (!Number.isSafeInteger(proposalId) || proposalId < 1 || !subject || !message) return;

  const { data: proposal, error: proposalError } = await admin
    .from("lexnusa_proposals")
    .select("id,lead_id,proposal_no,title,scope,deliverables,timeline,fee,currency,valid_until,terms,status,created_at,sent_at")
    .eq("id", proposalId)
    .maybeSingle();
  if (proposalError || !proposal) throw new Error("Could not load LexNusa proposal.");
  if (!emailableProposalStatuses.has(proposal.status)) {
    redirect(`/lexnusa/ops/proposals/${proposalId}?email=terminal`);
  }

  const { data: lead, error: leadError } = await admin
    .from("lexnusa_pilot_leads")
    .select("id,name,organization,email")
    .eq("id", proposal.lead_id)
    .maybeSingle();
  if (leadError || !lead?.email) throw new Error("Could not load proposal recipient.");

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.LEXNUSA_LEAD_FROM_EMAIL;
  const replyTo = process.env.LEXNUSA_LEAD_NOTIFY_EMAIL;
  const emailApiUrl = process.env.LEXNUSA_EMAIL_API_URL || "https://api.resend.com/emails";
  if (!resendKey || !from) {
    console.error("LexNusa proposal delivery: email configuration missing.");
    redirect(`/lexnusa/ops/proposals/${proposalId}?email=config`);
  }

  const feeLabel = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: proposal.currency,
    maximumFractionDigits: 0,
  }).format(Number(proposal.fee));
  const pdf = renderProposalPdf({
    proposalNo: proposal.proposal_no,
    title: proposal.title,
    clientName: lead.name,
    organization: lead.organization,
    email: lead.email,
    scope: proposal.scope,
    deliverables: proposal.deliverables,
    timeline: proposal.timeline,
    feeLabel,
    validUntil: proposal.valid_until,
    terms: proposal.terms,
    createdAt: new Date(proposal.created_at).toLocaleString("en-GB", { timeZone: "Asia/Jakarta", dateStyle: "medium" }),
  });
  const filename = proposalPdfFilename(proposal.proposal_no);
  const html = `<div style="font-family:Arial,sans-serif;line-height:1.65;color:#0D1B2A"><div style="white-space:pre-wrap">${escapeHtml(message).replace(/\n/g, "<br/>")}</div><p style="margin-top:24px;color:#64748b;font-size:12px">Proposal ${escapeHtml(proposal.proposal_no)} is attached as PDF.</p></div>`;

  let response: Response;
  try {
    response = await fetch(emailApiUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [lead.email],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text: `${message}\n\nProposal ${proposal.proposal_no} is attached as PDF.`,
        html,
        attachments: [{ filename, content: pdf.toString("base64") }],
      }),
    });
  } catch (error) {
    console.error("LexNusa proposal delivery exception", error);
    await addActivity(admin, proposal.lead_id, user.id, "proposal_email_failed", `Proposal ${proposal.proposal_no} email delivery failed`, {
      proposal_id: proposalId, proposal_no: proposal.proposal_no, recipient: lead.email, subject, reason: "exception",
    });
    redirect(`/lexnusa/ops/proposals/${proposalId}?email=send`);
  }

  if (!response.ok) {
    const providerError = (await response.text().catch(() => "")).slice(0, 1000);
    console.error("LexNusa proposal delivery failed", providerError);
    await addActivity(admin, proposal.lead_id, user.id, "proposal_email_failed", `Proposal ${proposal.proposal_no} email delivery failed`, {
      proposal_id: proposalId, proposal_no: proposal.proposal_no, recipient: lead.email, subject, provider: "resend", provider_status: response.status,
    });
    redirect(`/lexnusa/ops/proposals/${proposalId}?email=send`);
  }

  const payload = await response.json().catch(() => null) as { id?: string } | null;
  const sentAt = new Date().toISOString();
  const statusAfter = proposal.status === "draft" ? "sent" : proposal.status;
  const patch: Record<string, unknown> = {
    status: statusAfter,
    pdf_generated_at: sentAt,
    last_emailed_at: sentAt,
    last_email_to: lead.email,
    last_email_provider_id: payload?.id || null,
    updated_at: sentAt,
  };
  if (proposal.status === "draft") patch.sent_at = sentAt;

  const { error: updateError } = await admin.from("lexnusa_proposals").update(patch).eq("id", proposalId);
  if (updateError) throw new Error("Proposal email was sent but CRM delivery state could not be updated.");

  await addActivity(admin, proposal.lead_id, user.id, "proposal_pdf_generated", `Proposal ${proposal.proposal_no} PDF generated for email delivery`, {
    proposal_id: proposalId, proposal_no: proposal.proposal_no, generated_at: sentAt, source: "email_delivery",
  });
  await addActivity(admin, proposal.lead_id, user.id, "proposal_email_sent", `Proposal ${proposal.proposal_no} emailed to ${lead.email}`, {
    proposal_id: proposalId,
    proposal_no: proposal.proposal_no,
    recipient: lead.email,
    subject,
    attachment: filename,
    provider: "resend",
    provider_id: payload?.id || null,
    sent_at: sentAt,
    status_before: proposal.status,
    status_after: statusAfter,
  });
  if (proposal.status === "draft") {
    await addActivity(admin, proposal.lead_id, user.id, "proposal_sent", `Proposal ${proposal.proposal_no} moved from draft to sent via email delivery`, {
      proposal_id: proposalId, proposal_no: proposal.proposal_no, from: "draft", to: "sent", source: "proposal_email",
    });
  }

  revalidatePath("/lexnusa/ops");
  revalidatePath(`/lexnusa/ops/${proposal.lead_id}`);
  revalidatePath(`/lexnusa/ops/proposals/${proposalId}`);
  redirect(`/lexnusa/ops/proposals/${proposalId}?email=sent`);
}
