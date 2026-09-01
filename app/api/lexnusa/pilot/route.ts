import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const allowedProjects = new Set([
  "Legal AI Output Evaluation",
  "Legal Research Intelligence",
  "Case Law & Doctrine Mapping",
  "Legal AI Dataset & Benchmark",
  "Indonesia & ASEAN Legal Intelligence",
]);

const CONSENT_VERSION = "lexnusa-pilot-2026-09-01";

function clean(value: FormDataEntryValue | null, max = 4000) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'\"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[char] || char);
}

function redirectTo(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}

function clientFingerprint(request: NextRequest, email: string) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(`${ip}|${email}|lexnusa-pilot-v1`).digest("hex");
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = clean(formData.get("name"), 120);
  const organization = clean(formData.get("organization"), 180);
  const email = clean(formData.get("email"), 254).toLowerCase();
  const project = clean(formData.get("project"), 120);
  const message = clean(formData.get("message"), 6000);
  const website = clean(formData.get("website"), 200);
  const consent = clean(formData.get("consent"), 20);

  if (website) return redirectTo(request, "/lexnusa/request-received");
  if (!name || !email || !message || consent !== "accepted" || !allowedProjects.has(project)) return redirectTo(request, "/lexnusa/pilot?error=invalid");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return redirectTo(request, "/lexnusa/pilot?error=invalid");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error("LexNusa lead capture: Supabase server credentials are missing.");
    return redirectTo(request, "/lexnusa/pilot?error=unavailable");
  }

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: rateAllowed, error: rateError } = await supabase.rpc("lexnusa_check_rate_limit", {
    p_key: clientFingerprint(request, email), p_limit: 5, p_window_seconds: 900,
  });
  if (rateError) {
    console.error("LexNusa lead capture: rate-limit check failed", rateError);
    return redirectTo(request, "/lexnusa/pilot?error=unavailable");
  }
  if (!rateAllowed) return redirectTo(request, "/lexnusa/pilot?error=rate-limit");

  const { data, error } = await supabase.from("lexnusa_pilot_leads").insert({
    name,
    organization: organization || null,
    email,
    project_type: project,
    message,
    source: "lexnusa-landing",
    status: "new",
    consent_at: new Date().toISOString(),
    consent_version: CONSENT_VERSION,
    notification_status: "pending",
  }).select("id").single();

  if (error || !data) {
    console.error("LexNusa lead capture: database insert failed", error);
    return redirectTo(request, "/lexnusa/pilot?error=failed");
  }

  const { error: activityError } = await supabase.from("lexnusa_lead_activities").insert({
    lead_id: data.id,
    activity_type: "created",
    summary: "Lead created from Request a Pilot",
    details: { source: "lexnusa-landing", project_type: project },
  });
  if (activityError) console.error("LexNusa lead capture: activity creation failed", activityError);

  const resendKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.LEXNUSA_LEAD_NOTIFY_EMAIL;
  const from = process.env.LEXNUSA_LEAD_FROM_EMAIL || "LexNusa Leads <onboarding@resend.dev>";
  let notificationStatus: "sent" | "failed" | "skipped" = "skipped";
  let providerId: string | null = null;

  if (resendKey && notifyTo) {
    const subject = `New LexNusa Pilot Request — ${project}`;
    const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#0D1B2A">
      <h2>New LexNusa Pilot Request</h2><p><strong>Lead ID:</strong> ${data.id}</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Organization:</strong> ${escapeHtml(organization || "—")}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Project:</strong> ${escapeHtml(project)}</p>
      <p><strong>Brief:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p></div>`;
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: [notifyTo], reply_to: email, subject, html }),
      });
      if (response.ok) {
        notificationStatus = "sent";
        const payload = await response.json().catch(() => null) as { id?: string } | null;
        providerId = payload?.id || null;
      } else {
        notificationStatus = "failed";
        console.error("LexNusa lead capture: notification failed", await response.text());
      }
    } catch (notificationError) {
      notificationStatus = "failed";
      console.error("LexNusa lead capture: notification exception", notificationError);
    }
  } else {
    console.warn("LexNusa lead stored, but Resend notification is not configured.");
  }

  const { error: trackingError } = await supabase.from("lexnusa_pilot_leads").update({
    notification_status: notificationStatus,
    notification_provider_id: providerId,
    notified_at: notificationStatus === "sent" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }).eq("id", data.id);
  if (trackingError) console.error("LexNusa lead capture: notification tracking update failed", trackingError);

  return redirectTo(request, `/lexnusa/request-received?ref=${encodeURIComponent(String(data.id))}`);
}
