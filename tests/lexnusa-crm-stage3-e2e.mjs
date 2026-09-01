import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';

const base = process.env.E2E_BASE_URL || 'http://localhost:3000';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321';
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
const captureBase = process.env.LEXNUSA_EMAIL_CAPTURE_BASE_URL || 'http://127.0.0.1:4010';
const email = 'lexnusa-admin@example.invalid';
const password = 'LocalOnly-DoNotUse-123!';
const recipient = 'qualified@example.invalid';

if (!serviceRole) throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for Stage 3 E2E verification.');
const admin = createClient(supabaseUrl, serviceRole, { auth: { persistSession: false } });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

async function login() {
  await page.goto(`${base}/login?next=/lexnusa/ops`, { waitUntil: 'networkidle' });
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Kata sandi').fill(password);
  await page.getByRole('button', { name: /Masuk ke dashboard/i }).click();
  await page.waitForURL(/\/lexnusa\/ops(?:\?.*)?$/);
}

async function createProposal() {
  await page.goto(`${base}/lexnusa/ops/900001/proposal/new`, { waitUntil: 'networkidle' });
  await page.getByLabel(/Proposal title/i).fill('Stage 3 Commercial Delivery Proposal');
  await page.getByLabel(/^Scope/i).fill('Evaluate a synthetic Legal AI output set and deliver a structured reliability assessment.');
  await page.getByLabel(/Deliverables/i).fill('Evaluation matrix, findings brief, and recommendations.');
  await page.getByLabel(/Timeline/i).fill('5 business days');
  await page.getByLabel(/^Fee/i).fill('2200');
  await page.getByLabel(/Currency/i).selectOption('USD');
  await page.getByRole('button', { name: /Create Draft Proposal/i }).click();
  await page.waitForURL(/\/lexnusa\/ops\/proposals\/\d+/);
  const match = page.url().match(/\/proposals\/(\d+)/);
  assert.ok(match, 'Proposal id must be present in proposal detail URL.');
  return Number(match[1]);
}

async function proposalRow(id) {
  const { data, error } = await admin
    .from('lexnusa_proposals')
    .select('id,proposal_no,status,sent_at,pdf_generated_at,last_emailed_at,last_email_to,last_email_provider_id')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

async function waitFor(predicate, message, timeoutMs = 12000) {
  const startedAt = Date.now();
  let last = null;
  while (Date.now() - startedAt < timeoutMs) {
    last = await predicate();
    if (last) return last;
    await page.waitForTimeout(180);
  }
  throw new Error(`${message}; last=${JSON.stringify(last)}`);
}

async function activitiesForProposal(proposalId) {
  const { data, error } = await admin
    .from('lexnusa_lead_activities')
    .select('activity_type,summary,details')
    .eq('lead_id', 900001)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data || []).filter((row) => Number(row.details?.proposal_id) === proposalId);
}

try {
  await login();
  console.log('STAGE3_GATE_1_ADMIN_LOGIN_PASS');

  const proposalId = await createProposal();
  let proposal = await proposalRow(proposalId);
  assert.equal(proposal.status, 'draft');
  assert.match(await page.textContent('body'), /Commercial Delivery/i);
  console.log('STAGE3_GATE_2_DRAFT_COMMERCIAL_PROPOSAL_PASS');

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: /Download Proposal PDF/i }).click();
  const download = await downloadPromise;
  const stream = await download.createReadStream();
  assert.ok(stream, 'PDF download stream must be available.');
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  const pdfBytes = Buffer.concat(chunks);
  assert.ok(pdfBytes.subarray(0, 8).toString('latin1').startsWith('%PDF-1.4'), 'Downloaded proposal must be a valid PDF stream.');
  assert.match(download.suggestedFilename(), /^LEX-P-\d{4}-\d+-LexNusa-Proposal\.pdf$/);
  console.log('STAGE3_GATE_3_PROPOSAL_PDF_PASS');

  proposal = await waitFor(async () => {
    const row = await proposalRow(proposalId);
    return row.pdf_generated_at ? row : null;
  }, 'PDF generation timestamp was not persisted');
  assert.ok(proposal.pdf_generated_at);
  const activity = await waitFor(async () => {
    const rows = await activitiesForProposal(proposalId);
    return rows.find((row) => row.activity_type === 'proposal_pdf_generated') || null;
  }, 'PDF audit activity was not persisted');
  assert.match(activity.summary, /PDF generated/i);
  console.log('STAGE3_GATE_4_PDF_AUDIT_PASS');

  await page.getByLabel(/Email subject/i).fill('Stage 3 E2E Proposal Delivery');
  await page.getByLabel(/Email message/i).fill('Synthetic proposal delivery for isolated Stage 3 E2E verification.');
  await page.getByRole('button', { name: /Send Proposal \+ PDF/i }).click();
  await page.waitForURL(new RegExp(`/lexnusa/ops/proposals/${proposalId}\\?email=sent`));
  assert.match(await page.textContent('body'), /email sent successfully/i);
  console.log('STAGE3_GATE_5_SEND_PROPOSAL_PASS');

  const captured = await waitFor(async () => {
    const response = await fetch(`${captureBase}/last`);
    return response.ok ? response.json() : null;
  }, 'Proposal email was not captured');
  assert.deepEqual(captured.to, [recipient]);
  assert.equal(captured.subject, 'Stage 3 E2E Proposal Delivery');
  assert.equal(captured.attachments?.length, 1);
  assert.match(captured.attachments[0].filename, /^LEX-P-\d{4}-\d+-LexNusa-Proposal\.pdf$/);
  const attachmentBytes = Buffer.from(captured.attachments[0].content, 'base64');
  assert.ok(attachmentBytes.subarray(0, 8).toString('latin1').startsWith('%PDF-1.4'));
  console.log('STAGE3_GATE_6_EMAIL_ATTACHMENT_PASS');

  proposal = await waitFor(async () => {
    const row = await proposalRow(proposalId);
    return row.status === 'sent' && row.last_emailed_at ? row : null;
  }, 'Proposal delivery state was not persisted');
  assert.equal(proposal.status, 'sent');
  assert.ok(proposal.sent_at);
  assert.ok(proposal.pdf_generated_at);
  assert.ok(proposal.last_emailed_at);
  assert.equal(proposal.last_email_to, recipient);
  assert.equal(proposal.last_email_provider_id, 'e2e-proposal-email-001');
  console.log('STAGE3_GATE_7_DELIVERY_STATE_PASS');

  const auditRows = await waitFor(async () => {
    const rows = await activitiesForProposal(proposalId);
    const hasEmail = rows.some((row) => row.activity_type === 'proposal_email_sent');
    const hasSent = rows.some((row) => row.activity_type === 'proposal_sent' && /via email delivery/i.test(row.summary));
    return hasEmail && hasSent ? rows : null;
  }, 'Proposal email audit trail was not persisted');
  assert.ok(auditRows.some((row) => row.activity_type === 'proposal_email_sent' && row.details?.provider_id === 'e2e-proposal-email-001'));
  console.log('STAGE3_GATE_8_EMAIL_AUDIT_TRAIL_PASS');

  await page.getByRole('button', { name: /^Under Review$/i }).click();
  proposal = await waitFor(async () => {
    const row = await proposalRow(proposalId);
    return row.status === 'under_review' ? row : null;
  }, 'Post-delivery lifecycle transition failed');
  assert.equal(proposal.status, 'under_review');
  await page.reload({ waitUntil: 'networkidle' });
  assert.match(await page.textContent('body'), /under review/i);
  assert.equal(await page.getByRole('button', { name: /Send Proposal \+ PDF/i }).count(), 1);
  console.log('STAGE3_GATE_9_POST_DELIVERY_LIFECYCLE_PASS');

  console.log('LEXNUSA_CRM_STAGE3_E2E_PASS');
} finally {
  await browser.close();
}
