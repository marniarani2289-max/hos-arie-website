# LexNusa cohort foundation

Routes: `/lexnusa/cohort` (public), `/lexnusa/cohort/workspace` (participant), `/lexnusa/cohort/facilitator` (assigned staff).

Uses existing Supabase sign-in and account registration. Institute accounts can join independently; Institute tables, progress and certificate rules are unchanged. New registrations confirm email, then return to `/lexnusa/cohort/workspace` and sign in. Joining is allowed only when an assigned facilitator opens enrollment.

## Deployment

1. Apply `supabase/migrations/20260907091802_lexnusa_cohort.sql` to the intended Supabase project after review.
2. Assign the actual facilitator's auth user UUID through trusted database administration:

```sql
insert into public.lexnusa_cohort_staff(cohort_code,user_id)
values ('LEXNUSA-PILOT-01', '<verified-auth-user-uuid>');
```

3. Existing `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` configure server auth. No service-role key is needed for cohort operations.
4. Deploy the branch, log in as assigned staff, open enrollment, and complete an end-to-end check using two participant accounts and a facilitator. Do not open paid registration before that check.

The initial cohort is closed. This change does not apply production migrations, assign real users, open registration or issue certificates.

## Learning and access

Five written artifacts: brief, instructions, draft, evaluation, revision. Saving creates an append-only version; submitting requires all five fields. Review records are append-only and belong to a specific submitted version. Only assigned staff can review; participants cannot review themselves or promote their permissions. Verification requires participant score >=75. The seven LEX-EVAL weights are shown separately and do not automatically determine participant verification.

Generation of AI text is not wired to an LLM provider in this change. The workspace explicitly states this. Participants can record prompts and outputs from facilitated practice. Integrating a provider, full dimension scorecards/CLF gate automation, final reflection and certificate eligibility are follow-up work; never represent this foundation as a complete autonomous drafting service.

## Verification

`npx tsc --noEmit` and targeted ESLint.

`PGLITE_MODULE=/absolute/path/to/pglite/dist/index.js node tests/lexnusa-cohort-rls.mjs`

The isolated PostgreSQL test covers closed enrollment, staff escalation denial, participant isolation, append-only submissions, reviewer authorization, private feedback and anonymous denial. PGlite is a test-only runtime, not a production dependency. Authenticated browser operations still require a configured test Supabase project; no real credentials were used locally.
