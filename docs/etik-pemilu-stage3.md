# Asisten Etik Pemilu: prototipe Tahap 3

Route: `/ai-lab/asisten-etik-pemilu`. API: POST `/api/etik-pemilu`.

## Implemented

- Existing Supabase SSR authentication; coordinator derives from existing `rahi_admins` membership. No new admin was appointed.
- Reviewers must be explicitly assigned to existing verified website accounts by a coordinator. No invitation email is sent.
- All database access uses authenticated `etik_pemilu_app` RPC. Public wrapper is SECURITY INVOKER; private implementation validates `auth.uid()` and role before each action. Direct table access remains denied. `authenticated` now has schema USAGE only to invoke the allowlisted private function; this deliberately replaces the Stage 2 no-USAGE model without opening tables.
- Live lexical retrieval from Stage 2 database, citation cards, source excerpts and decision annotations. Source status is visible; no semantic embedding claim.
- AI SDK structured generation via existing AI Gateway authentication. Model selection: ETIK_AI_MODEL, then LEXNUSA_AI_MODEL, then catalog-verified `openai/gpt-5.4-mini` (verified 7 November 2026). Existing provider access/balance remains required.
- No model call for no answer candidates or a leading candidate with a blocking open anomaly. All generated output is a draft, including summaries of approved reference answers. Citation IDs validated against retrieved Q entries; semantic accuracy still needs humans.
- AI failure returns explicit source-only fallback, never pretends generation succeeded.
- 20 AI reservations per account/24h, 20-second spacing, serialized per-account quota and request UUID duplicate protection; no automatic retries. Requests count even if provider fails.
- Questions/responses not stored verbatim in the application database. Generations store question MD5, context IDs, model, status and token usage. Provider processing occurs only after checkbox consent. Questions are not safe for confidential case data.
- Review portal: new immutable revision; decision tied to revision hash; two distinct active reviewers; explicit resolution of open anomalies; no automatic approval or publication.

## Database

`supabase/etik_pemilu_stage3.sql` is the already applied Stage 3 migration on project `ynzxmjvtpyruzxujaofq`, schema `etik_pemilu`. Requires Stage 2 schema/data. Do not re-run CREATE statements against production. Later fixes must be additional migrations.

No service key is used by this module. It reuses public URL/anon key solely for authenticated SSR. AI credentials/OIDC stay server-side.

## Checks

Run `node --test tests/etik-pemilu.test.mjs` and `npx tsc --noEmit`.
SQL authorization/workflow tests are performed in rollback-only transactions; no legal approval is committed by tests. Live AI and authenticated browser behavior require a permitted real session; build success alone does not verify provider availability.

## Limits

This prototype is not an official DKPP service. All 37 initial reviews remain unapproved until real reviewers act. Search coverage is bounded by the Stage 2 corpus. Do not equate source matching with legal correctness. No uploads, external web search, unrestricted SQL, case decision prediction or automatic legal approval are implemented.
