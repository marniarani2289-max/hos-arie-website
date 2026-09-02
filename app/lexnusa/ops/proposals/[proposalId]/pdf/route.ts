import { NextResponse } from "next/server";
import { requireLexNusaAdmin } from "../../../admin";
import { proposalPdfFilename, renderProposalPdf } from "@/lib/lexnusa/proposal-pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ proposalId: string }> }) {
  const { proposalId: rawId } = await params;
  const proposalId = Number(rawId);
  if (!Number.isSafeInteger(proposalId) || proposalId < 1) return new NextResponse("Invalid proposal", { status: 400 });

  const { admin, user } = await requireLexNusaAdmin(`/lexnusa/ops/proposals/${proposalId}`);
  const { data: proposal, error } = await admin
    .from("lexnusa_proposals")
    .select("id,lead_id,proposal_no,title,scope,deliverables,timeline,fee,currency,valid_until,terms,created_at")
    .eq("id", proposalId)
    .maybeSingle();
  if (error || !proposal) return new NextResponse("Proposal not found", { status: 404 });

  const { data: lead } = await admin
    .from("lexnusa_pilot_leads")
    .select("name,organization,email")
    .eq("id", proposal.lead_id)
    .maybeSingle();
  if (!lead) return new NextResponse("Lead not found", { status: 404 });

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

  const generatedAt = new Date().toISOString();
  await admin.from("lexnusa_proposals").update({ pdf_generated_at: generatedAt, updated_at: generatedAt }).eq("id", proposalId);
  const { error: activityError } = await admin.from("lexnusa_lead_activities").insert({
    lead_id: proposal.lead_id,
    actor_user_id: user.id,
    activity_type: "proposal_pdf_generated",
    summary: `Proposal ${proposal.proposal_no} PDF generated`,
    details: { proposal_id: proposalId, proposal_no: proposal.proposal_no, generated_at: generatedAt },
  });
  if (activityError) console.error("LexNusa proposal PDF activity log failed", activityError);

  return new NextResponse(new Uint8Array(pdf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${proposalPdfFilename(proposal.proposal_no)}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
