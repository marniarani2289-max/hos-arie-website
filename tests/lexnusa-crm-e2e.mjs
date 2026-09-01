import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const base = process.env.E2E_BASE_URL || 'http://127.0.0.1:3000';
const email = 'lexnusa-admin@example.invalid';
const password = 'LocalOnly-DoNotUse-123!';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  // Gate 1: authenticated admin login.
  await page.goto(`${base}/login?next=/lexnusa/ops`, { waitUntil: 'networkidle' });
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Kata sandi').fill(password);
  await page.getByRole('button', { name: /Masuk ke dashboard/i }).click();
  await page.waitForURL(/\/lexnusa\/ops(?:\?.*)?$/);
  assert.match(await page.textContent('body'), /Follow-up Operations|LexNusa/i);

  // Gate 2: qualified synthetic lead is visible and reachable.
  await page.goto(`${base}/lexnusa/ops/900001`, { waitUntil: 'networkidle' });
  assert.match(await page.textContent('body'), /Qualified Demo Lead/);

  // Gate 3: create proposal through the actual UI.
  const createLink = page.getByRole('link', { name: /Create Proposal/i });
  await createLink.click();
  await page.waitForURL(/\/lexnusa\/ops\/900001\/proposal\/new/);
  await page.getByLabel(/Proposal title/i).fill('E2E Legal AI Evaluation Proposal');
  await page.getByLabel(/^Scope/i).fill('Evaluate synthetic Legal AI outputs using the LexNusa QA workflow.');
  await page.getByLabel(/Deliverables/i).fill('Evaluation scorecard and findings summary.');
  await page.getByLabel(/Timeline/i).fill('7 days');
  await page.getByLabel(/^Fee/i).fill('1250');
  const currency = page.getByLabel(/Currency/i);
  if (await currency.count()) await currency.selectOption('USD');
  await page.getByRole('button', { name: /Create Draft Proposal/i }).click();
  await page.waitForURL(/\/lexnusa\/ops\/proposals\/\d+/);

  // Gates 4-5: generated number and proposal detail.
  const proposalBody = await page.textContent('body');
  assert.match(proposalBody, /LEX-P-\d{4}-\d{3,}/);
  assert.match(proposalBody, /E2E Legal AI Evaluation Proposal/);
  assert.match(proposalBody, /1,250|1250/);

  // Gates 6-7: activity audit and pipeline value are visible on lead detail.
  await page.goto(`${base}/lexnusa/ops/900001`, { waitUntil: 'networkidle' });
  const qualifiedBody = await page.textContent('body');
  assert.match(qualifiedBody, /Proposal LEX-P-\d{4}-\d{3,} created/);
  assert.match(qualifiedBody, /1,250|1250/);

  // Gate 8: contacted lead must not be allowed to create a proposal.
  await page.goto(`${base}/lexnusa/ops/900002/proposal/new`, { waitUntil: 'networkidle' });
  assert.match(page.url(), /\/lexnusa\/ops\/900002(?:\?proposal=requires-qualified)?$/);
  const contactedBody = await page.textContent('body');
  assert.doesNotMatch(contactedBody, /Create Proposal\s*$/m);

  // Gate 9: CRM v1.2 dashboard remains operational after proposal creation.
  await page.goto(`${base}/lexnusa/ops`, { waitUntil: 'networkidle' });
  const dashboardBody = await page.textContent('body');
  assert.match(dashboardBody, /Qualified Demo Lead/);
  assert.match(dashboardBody, /Contacted Demo Lead/);
  assert.match(dashboardBody, /Follow-up Operations|Open Pipeline|Open Leads/i);

  console.log('LEXNUSA_CRM_E2E_PASS');
} finally {
  await browser.close();
}
