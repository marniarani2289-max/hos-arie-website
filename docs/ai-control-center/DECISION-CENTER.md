# Pusat Keputusan AI

Adds /control-center/decisions and a navigation card to the existing Control Center.
Administrator email allowlist remains authoritative; every API call authenticates
and restricts records to the current user. No browser database grants. No external
messages, autonomous writes, or automatic program data imports.

## Operation
Create a brief with a problem, aggregated evidence, source/period, target metric,
and risk. Saving does not invoke AI. Explicit analysis consent sends the stored
brief to the configured gateway model. A generated UUID, input snapshot, model,
usage, timestamps and output are stored. The decision can then be approved,
deferred or rejected; approval requires an assignee and deadline. Completion
requires an outcome note. Every transition appends history.

Analysis is limited to three attempts per brief and ten per user per hour.
Database row locking and a per-user advisory lock prevent duplicate requests.
Interrupted pending calls can be retried after two minutes. No source URL is
fetched. The UI identifies evidence as administrator-provided, not verified live
data. Generations and decisions are private to their creator.

## Activation after production approval
1. Apply decision-center-schema.sql as the named migration
   control_center_decision_center to the website's Supabase project.
2. Keep existing CONTROL_CENTER_ALLOWED_EMAILS and server-only Supabase credentials.
3. Set CONTROL_CENTER_AI_MODEL or reuse configured LEXNUSA_AI_MODEL. No default
   paid model is silently selected. Keep the existing Vercel Gateway credentials.
4. Merge this PR and confirm the Vercel deployment is READY.
5. Sign in as an allowlisted administrator. Create a sanitized brief, generate
   once, refresh, approve with an assignee/deadline, complete with an outcome,
   and verify a non-admin cannot read or mutate any decision.

Estimated cost is nullable; token usage is stored and actual billing remains in
AI Gateway. No fabricated cost estimate is shown. New schemas have no dependency
on participant tables beyond the existing auth.users foreign key.

## Verification
The focused workflow runs TypeScript, brief/transition tests, and SQL tests in
a disposable PostgreSQL 17 instance. Tests cover cross-owner denial, duplicate
analysis reservation, durable output, and denied browser role privileges.
Authenticated visual and live provider checks must be completed in the configured
deployment; no login bypass or production data is committed.

## Deployment boundary
Existing docs/ai-control-center/MEMORY.md requires human approval for production
impact. This branch is prepared for review; creating the branch does not activate
database changes or merge main.
