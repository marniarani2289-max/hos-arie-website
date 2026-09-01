import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';

const base = process.env.E2E_BASE_URL || 'http://localhost:3000';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321';
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = 'lexnusa-admin@example.invalid';
const password = 'LocalOnly-DoNotUse-123!';

if (!serviceRole) throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for Stage 2 E2E verification.');
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

async function createProposal(title, fee) {
  await page.goto(`${base}/lexnusa/ops/900001/proposal/new`, { waitUntil: 'networkidle' });
  await page.getByLabel(/Proposal title/i).fill(title);
  await page.getByLabel(/^Scope/i).fill('Stage 2 lifecycle synthetic scope.');
  await page.getByLabel(/Deliverables/i).fill('Lifecycle verification deliverable.');
  await page.getByLabel(/Timeline/i).fill('5 business days');
  await page.getByLabel(/^Fee/i).fill(String(fee));
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
    .select('id,proposal_no,status,sent_at,accepted_at,rejected_at,lost_reason')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

async function waitForProposalStatus(id, expectedStatus, timeoutMs = 10000) {
  const startedAt = Date.now();
  let lastStatus = null;
  while (Date.now() - startedAt < timeoutMs) {
    const row = await proposalRow(id);
    lastStatus = row.status;
    if (lastStatus === expectedStatus) return row;
    await page.waitForTimeout(150);
  }
  throw new Error(`Timed out waiting for proposal ${id} status ${expectedStatus}; last status was ${lastStatus}`);
}

async function clickLifecycle(label, proposalId, expectedStatus) {
  const button = page.getByRole('button', { name: new RegExp(`^${label}$`, 'i') });
  await button.waitFor({ state: 'visible' });
  await button.click();
  const row = await waitForProposalStatus(proposalId, expectedStatus);
  await page.reload({ waitUntil: 'networkidle' });
  return row;
}

try {
  // Gate 1: authenticated local admin can access CRM.
  await login();
  console.log('STAGE2_GATE_1_ADMIN_LOGIN_PASS');

  // Gates 2-6: Draft -> Sent -> Under Review -> Negotiation -> Accepted.
  const acceptedId = await createProposal('Stage 2 Accepted Lifecycle Proposal', 1800);
  assert.match(await page.textContent('body'), /draft/i);
  console.log('STAGE2_GATE_2_DRAFT_PASS');

  let accepted = await clickLifecycle('Mark as Sent', acceptedId, 'sent');
  assert.equal(accepted.status, 'sent');
  assert.ok(accepted.sent_at, 'sent_at must be persisted');
  console.log('STAGE2_GATE_3_SENT_PASS');

  accepted = await clickLifecycle('Under Review', acceptedId, 'under_review');
  assert.equal(accepted.status, 'under_review');
  console.log('STAGE2_GATE_4_UNDER_REVIEW_PASS');

  accepted = await clickLifecycle('Start Negotiation', acceptedId, 'negotiation');
  assert.equal(accepted.status, 'negotiation');
  console.log('STAGE2_GATE_5_NEGOTIATION_PASS');

  accepted = await clickLifecycle('Accept', acceptedId, 'accepted');
  assert.equal(accepted.status, 'accepted');
  assert.ok(accepted.accepted_at, 'accepted_at must be persisted');
  assert.match(await page.textContent('body'), /terminal lifecycle state/i);
  assert.equal(await page.getByRole('button', { name: /Mark as Sent|Under Review|Start Negotiation|Accept|Reject|Expire/i }).count(), 0);
  assert.match(await page.textContent('body'), /accepted/i);
  console.log('STAGE2_GATE_6_ACCEPTED_TERMINAL_PASS');

  // Gate 7: activity history persists all accepted-path transitions.
  await page.goto(`${base}/lexnusa/ops/900001`, { waitUntil: 'networkidle' });
  const leadBody = await page.textContent('body');
  assert.match(leadBody, /moved from draft to sent/i);
  assert.match(leadBody, /moved from sent to under_review/i);
  assert.match(leadBody, /moved from under_review to negotiation/i);
  assert.match(leadBody, /moved from negotiation to accepted/i);
  console.log('STAGE2_GATE_7_ACTIVITY_HISTORY_PASS');

  // Gates 8-9: independent rejection path + terminal protection and reason persistence.
  const rejectedId = await createProposal('Stage 2 Rejected Lifecycle Proposal', 950);
  await clickLifecycle('Mark as Sent', rejectedId, 'sent');
  await page.getByLabel(/Rejection reason/i).fill('Synthetic E2E rejection reason');
  const rejected = await clickLifecycle('Reject', rejectedId, 'rejected');

  assert.equal(rejected.status, 'rejected');
  assert.ok(rejected.rejected_at, 'rejected_at must be persisted');
  assert.equal(rejected.lost_reason, 'Synthetic E2E rejection reason');
  assert.match(await page.textContent('body'), /terminal lifecycle state/i);
  assert.equal(await page.getByRole('button', { name: /Mark as Sent|Under Review|Start Negotiation|Accept|Reject|Expire/i }).count(), 0);
  assert.match(await page.textContent('body'), /rejected/i);
  console.log('STAGE2_GATE_8_REJECTED_TERMINAL_PASS');

  await page.goto(`${base}/lexnusa/ops/900001`, { waitUntil: 'networkidle' });
  const finalLeadBody = await page.textContent('body');
  assert.match(finalLeadBody, /moved from sent to rejected/i);
  console.log('STAGE2_GATE_9_REJECTION_AUDIT_PASS');

  console.log('LEXNUSA_CRM_STAGE2_E2E_PASS');
} finally {
  await browser.close();
}
