// Isolated real PostgreSQL engine; no production accounts or AI requests.
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
const { PGlite } = await import(
  process.env.PGLITE_MODULE || "@electric-sql/pglite"
);
const db = new PGlite();
const a = "00000000-0000-0000-0000-000000000001",
  b = "00000000-0000-0000-0000-000000000002",
  staff = "00000000-0000-0000-0000-000000000003";
const cohort = "LEXNUSA-PILOT-01",
  text = "Synthetic practice content with sufficient detail.";
await db.exec(
  `create role service_role bypassrls;create role anon;create role authenticated;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;grant usage on schema auth to authenticated;grant execute on function auth.uid() to authenticated;`,
);
for (const file of [
  "20260907091802_lexnusa_cohort.sql",
  "20260907105036_lexnusa_ai_certificates.sql",
])
  await db.exec(
    readFileSync(
      new URL(`../supabase/migrations/${file}`, import.meta.url),
      "utf8",
    ),
  );
await db.query(`insert into auth.users values($1),($2),($3)`, [a, b, staff]);
await db.query(`insert into lexnusa_cohort_staff values($1,$2)`, [
  cohort,
  staff,
]);
await db.query(
  `insert into lexnusa_cohort_members(cohort_code,user_id) values($1,$2),($1,$3)`,
  [cohort, a, b],
);
// Existing saved work survives the additive migration.
await db.query(
  `insert into lexnusa_cohort_versions(id,cohort_code,user_id,brief,instruction,draft,evaluation,revision) values($1,$2,$1,$3,$3,$3,$3,$3)`,
  [a, cohort, text],
);
await db.exec(
  readFileSync(
    new URL(
      "../supabase/migrations/20260907210423_lexnusa_document_workflow.sql",
      import.meta.url,
    ),
    "utf8",
  ),
);
async function as(id) {
  await db.exec("reset role;set role authenticated");
  await db.query("select set_config('request.jwt.claim.sub',$1,false)", [id]);
}
async function deny(action, pattern) {
  await assert.rejects(action, pattern);
}
async function save({
  parent = null,
  submitted = false,
  risk = "MEDIUM",
  checked = false,
  sources = "",
  refs = {},
  owner = a,
} = {}) {
  return (
    await db.query(
      `insert into lexnusa_cohort_versions(cohort_code,user_id,brief,instruction,draft,evaluation,revision,parent_version_id,submitted,risk_level,human_checked,source_notes,generation_refs,created_at,version_number,workflow_revision) values($1,$2,$3,$3,$3,$3,$3,$4,$5,$6,$7,$8,$9,'2099-01-01',999,0) returning *`,
      [
        cohort,
        owner,
        text,
        parent,
        submitted,
        risk,
        checked,
        sources,
        JSON.stringify(refs),
      ],
    )
  ).rows[0];
}
async function review(
  id,
  {
    decision = "verified",
    risk = "MEDIUM",
    notes = text,
    score = 90,
    gate = true,
  } = {},
) {
  return db.query(
    `insert into lexnusa_cohort_reviews(version_id,cohort_code,participant_id,reviewer_id,participant_score,decision,notes,quality_gate_passed,assessed_risk) values($1,$2,$3,$4,$5,$6,$7,$8,$9) returning id`,
    [id, cohort, a, staff, score, decision, notes, gate, risk],
  );
}
await as(a);
assert.equal(
  (
    await db.query(
      "select version_number,workflow_revision from lexnusa_cohort_versions",
    )
  ).rows[0].version_number,
  1,
);
await deny(() => save(), /stale_version/);
await deny(
  () => save({ parent: a, submitted: true }),
  /human_check_and_sources_required/,
);
await deny(
  () => save({ parent: a, submitted: true, checked: true }),
  /human_check_and_sources_required/,
);
const v2 = await save({ parent: a });
assert.equal(v2.version_number, 2);
assert.equal(v2.workflow_revision, 1);
assert.ok(new Date(v2.created_at) < new Date("2090-01-01"));
await deny(() => save({ parent: a }), /stale_version/);
await deny(
  () => db.exec("update lexnusa_cohort_versions set submitted=true"),
  /permission denied/,
);
await deny(
  () => db.exec("delete from lexnusa_cohort_versions"),
  /permission denied/,
);
await as(b);
assert.equal(
  (await db.query("select * from lexnusa_cohort_versions")).rows.length,
  0,
);
await deny(() => save({ parent: v2.id, owner: a }), /owner_required/);
await deny(
  () => db.query("insert into lexnusa_cohort_staff values($1,$2)", [cohort, b]),
  /permission denied/,
);
await db.exec("reset role");
const gen = (
  await db.query(
    `insert into lexnusa_cohort_generations(cohort_code,user_id,stage,model,input,output,status) values($1,$2,'draft','synthetic-model','{}','Synthetic AI draft','completed'),($1,$3,'draft','synthetic-model','{}','Private AI draft','completed'),($1,$2,'revision','synthetic-model','{}',null,'failed') returning id`,
    [cohort, a, b],
  )
).rows;
await as(a);
await deny(
  () => save({ parent: v2.id, refs: { draft: gen[1].id } }),
  /invalid_generation_reference/,
);
await deny(
  () => save({ parent: v2.id, refs: { revision: gen[2].id } }),
  /invalid_generation_reference/,
);
await deny(
  () => save({ parent: v2.id, refs: { brief: gen[0].id } }),
  /invalid_generation_reference/,
);
await deny(
  () => save({ parent: v2.id, refs: { unknown: gen[0].id } }),
  /invalid_generation_reference/,
);
const v3 = await save({
  parent: v2.id,
  submitted: true,
  checked: true,
  sources: text,
  refs: { draft: gen[0].id },
  risk: "CRITICAL",
});
await deny(() => review(v3.id), /staff_required/);
await as(staff);
await deny(() => review(v2.id), /stale_review/);
await deny(() => review(v3.id), /critical_risk_requires_revision/);
await review(v3.id, { decision: "revision_requested", risk: "CRITICAL" });
await deny(
  () => review(v3.id, { decision: "revision_requested" }),
  /already_reviewed/,
);
await as(a);
const v4 = await save({
  parent: v3.id,
  submitted: true,
  checked: true,
  sources: text,
  risk: "HIGH",
  refs: { draft: gen[0].id },
});
await as(staff);
await deny(() => review(v4.id), /risk_rationale_required/);
const rationale = text.repeat(3);
await deny(
  () => review(v4.id, { risk: "CRITICAL", notes: rationale }),
  /critical_risk_requires_revision/,
);
await deny(
  () => review(v4.id, { notes: rationale, score: 74 }),
  /check constraint/,
);
await deny(
  () => review(v4.id, { notes: rationale, gate: false }),
  /check constraint/,
);
await review(v4.id, { notes: rationale });
const certificate = (
  await db.query("select * from lexnusa_cohort_certificates")
).rows[0];
assert.equal(certificate.version_id, v4.id);
await deny(
  () => db.exec("update lexnusa_cohort_reviews set decision='verified'"),
  /permission denied/,
);
await as(a);
const v5 = await save({ parent: v4.id });
assert.equal(v5.submitted, false);
assert.equal(
  (
    await db.query("select * from lexnusa_cohort_reviews where version_id=$1", [
      v5.id,
    ])
  ).rows.length,
  0,
);
assert.equal(
  (await db.query("select version_id from lexnusa_cohort_certificates")).rows[0]
    .version_id,
  v4.id,
);
await as(staff);
await deny(() => review(v4.id, { notes: rationale }), /stale_review/);
await deny(() => review(v5.id, { notes: rationale }), /stale_review/);
await as(a);
const v6 = await save({
  parent: v5.id,
  submitted: true,
  checked: true,
  sources: text,
});
const v7 = await save({ parent: v6.id });
await as(staff);
await deny(() => review(v6.id), /stale_review/);
await as(b);
assert.equal(
  (await db.query("select * from lexnusa_cohort_reviews")).rows.length,
  0,
);
assert.equal(
  (await db.query("select * from lexnusa_cohort_certificates")).rows.length,
  0,
);
assert.equal(
  (await db.query("select * from lexnusa_cohort_generations")).rows.length,
  1,
);
await db.exec("reset role;set role anon");
await deny(
  () => db.exec("select * from lexnusa_cohort_versions"),
  /permission denied/,
);
assert.equal(
  (
    await db.query("select status from lexnusa_verify_certificate($1)", [
      certificate.id,
    ])
  ).rows[0].status,
  "valid",
);
assert.equal(v7.version_number, 7);
await db.close();
console.log(
  "PASS: legacy backfill, immutable versions, optimistic concurrency, server timestamps and ordering, source and human submission gates, private AI provenance, reviewer authorization, stale/duplicate approval denial, CRITICAL/HIGH gates, certificate snapshot preservation, participant isolation and anonymous denial",
);
