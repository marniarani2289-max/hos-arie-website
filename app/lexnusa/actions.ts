"use server";

import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const allowedProjects = new Set([
  "Legal AI Output Evaluation",
  "Legal Research Intelligence",
  "Case Law & Doctrine Mapping",
  "Legal AI Dataset & Benchmark",
  "Indonesia & ASEAN Legal Intelligence",
]);

function clean(value: FormDataEntryValue | null, max = 4000) {
  return String(value ?? "").trim().slice(0, max);
}

export async function submitPilotRequest(formData: FormData) {
  const name = clean(formData.get("name"), 120);
  const organization = clean(formData.get("organization"), 180);
  const email = clean(formData.get("email"), 254).toLowerCase();
  const project = clean(formData.get("project"), 120);
  const message = clean(formData.get("message"), 6000);
  const website = clean(formData.get("website"), 200);

  // Honeypot: bots often fill hidden fields.
  if (website) redirect("/lexnusa/request-received");

  if (!name || !email || !message || !allowedProjects.has(project)) {
    redirect("/lexnusa?pilot=invalid#pilot");
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) redirect("/lexnusa?pilot=invalid#pilot");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error("LexNusa lead capture: Supabase server credentials are missing.");
    redirect("/lexnusa?pilot=unavailable#pilot");
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase
    .from("lexnusa_pilot_leads")
    .insert({
      name,
      organization: organization || null,
      email,
      project_type: project,
      message,
      source: "lexnusa-landing",
      status: "new",
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("LexNusa lead capture: database insert failed", error);
    redirect("/lexnusa?pilot=failed#pilot");
  }

  // Notification is best-effort after durable storage. The lead is never lost
  // merely because the email provider is temporarily unavailable.
  const resendKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.LEXNUSA_LEAD_NOTIFY_EMAIL;
  if (resendKey && notifyTo) {
    const from = process.env.LEXNUSA_LEAD_FROM_EMAIL || "LexNusa Leads <onboarding@resend.dev>";
    const subject = `New LexNusa Pilot Request — ${project}`;
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0D1B2A">
        <h2>New LexNusa Pilot Request</h2>
        <p><strong>Lead ID:</strong> ${data.id}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Organization:</strong> ${escapeHtml(organization || "—")}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Project:</strong> ${escapeHtml(project)}</p>
        <p><strong>Brief:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      </div>`;

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to: [notifyTo], reply_to: email, subject, html }),
      });
      if (!response.ok) console.error("LexNusa lead capture: notification failed", await response.text());
    } catch (error) {
      console.error("LexNusa lead capture: notification exception", error);
    }
  } else {
    console.warn("LexNusa lead stored, but Resend notification is not configured.");
  }

  redirect(`/lexnusa/request-received?ref=${encodeURIComponent(String(data.id))}`);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[char] || char);
}
