# LexNusa cohort

Routes: `/lexnusa/cohort` (public), `/lexnusa/cohort/workspace` (participant), `/lexnusa/cohort/facilitator` (assigned staff).

Uses existing Supabase sign-in and account registration. Institute accounts can join independently; Institute tables, progress and certificate rules are unchanged. New registrations confirm email, then return to `/lexnusa/cohort/workspace` and sign in. Joining is allowed only when an assigned facilitator opens enrollment.

## Deployment

1. Apply `supabase/migrations/20260907091802_lexnusa_cohort.sql` to the intended Supabase project after review.
2. Assign the actual facilitator's auth user UUID through trusted database administration:

```sql
insert into public.lexnusa_cohort_staff(cohort_code,user_id)
values ('LEXNUSA-PILOT-01', '<verified-auth-user-uuid>');
```

3. Existing `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` configure server auth. AI history writes require the existing server-only service-role key.
4. Deploy the branch, log in as assigned staff, open enrollment, and complete an end-to-end check using two participant accounts and a facilitator. Do not open paid registration before that check.

The initial cohort is closed until deployment and access verification.

## Learning and access

Five written artifacts: brief, instructions, draft, evaluation, revision. Saving creates an append-only version; submitting requires all five fields. Review records are append-only and belong to a specific submitted version. Only assigned staff can review; participants cannot review themselves or promote their permissions. Verification requires participant score >=75. The seven LEX-EVAL weights are shown separately and do not automatically determine participant verification.

AI assists all five stages through the gateway. LEX-EVAL remains a human-led methodology; the quality-gate attestation is required before a passing review can issue a certificate.

## Verification

`npx tsc --noEmit` and targeted ESLint.

`PGLITE_MODULE=/absolute/path/to/pglite/dist/index.js node tests/lexnusa-cohort-rls.mjs`

The isolated PostgreSQL test covers closed enrollment, staff escalation denial, participant isolation, append-only submissions, reviewer authorization, private feedback and anonymous denial. PGlite is a test-only runtime, not a production dependency. Authenticated browser checks use the deployed website; report their result separately from these isolated database tests.

## Live AI and certificates (September 2026)
The follow-up migration adds durable AI inputs/outputs/usage, private certificates and an ID-only verification RPC. Apply both cohort migrations in order. Assign cohort staff from verified `lexnusa_admins` accounts; never use user metadata for authorization.

Runtime needs existing `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. AI uses Vercel AI Gateway OIDC (enabled Gateway/available credits required) or server-only `AI_GATEWAY_API_KEY`. Optional `LEXNUSA_AI_MODEL`, default `openai/gpt-5.4-mini`. No API key reaches client components. Limits: 12 attempts/user/rolling 24h, 100 attempts/cohort service/rolling 24h, max 3500 output tokens; attempts reserve atomically and failures count. No fake fallback output.

Participant signup: `/lexnusa/cohort/register`; returning accounts use shared login with cohort destination. Registration requests only profile name and does not enroll in Institute programmes. Joining records the certificate display name. Workspace keeps immutable versions; AI proposals are applied explicitly, not automatically submitted. Save errors retain editor state. Provider failure leaves existing work untouched. History retains AI context separately from participant versions.

A review with score >=75 and explicit quality-gate confirmation issues one certificate per cohort/member. Staff cannot review themselves. A new version does not replace the version certified by an earlier review. Certificates identify the reviewed version internally, snapshot recipient name and allow print-to-PDF. Public verification exposes only certificate number, course, issue date and status. It is not a professional qualification. If a certificate is issued in error, authorized administrators can set `revoked_at` in the database; immutable versions and reviews remain available for audit.
