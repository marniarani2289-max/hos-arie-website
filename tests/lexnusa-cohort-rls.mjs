// Run: PGLITE_MODULE=/absolute/path/to/pglite/dist/index.js node tests/lexnusa-cohort-rls.mjs
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const {PGlite}=await import(process.env.PGLITE_MODULE||'@electric-sql/pglite');
const db=new PGlite();
await db.exec(`create role anon; create role authenticated; create schema auth; create table auth.users(id uuid primary key); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$; grant usage on schema auth to authenticated; grant execute on function auth.uid() to authenticated;`);
await db.exec(readFileSync(new URL('../supabase/migrations/20260907091802_lexnusa_cohort.sql',import.meta.url),'utf8'));
const a='00000000-0000-0000-0000-000000000001',b='00000000-0000-0000-0000-000000000002',staff='00000000-0000-0000-0000-000000000003';
await db.exec(`insert into auth.users values('${a}'),('${b}'),('${staff}');insert into public.lexnusa_cohort_staff values('LEXNUSA-PILOT-01','${staff}');`);
async function as(id){await db.exec(`reset role;set role authenticated;select set_config('request.jwt.claim.sub','${id}',false);`);}
async function deny(sql){await assert.rejects(()=>db.exec(sql));}
await as(a);
await deny(`insert into lexnusa_cohort_members values('LEXNUSA-PILOT-01','${a}',now())`);
await deny(`insert into lexnusa_cohort_staff values('LEXNUSA-PILOT-01','${a}')`);
await as(staff);await db.exec(`update lexnusa_cohorts set enrollment_open=true`);
await as(a);await db.exec(`insert into lexnusa_cohort_members(cohort_code,user_id) values('LEXNUSA-PILOT-01','${a}')`);
const text='A complete synthetic training answer.';
await db.exec(`insert into lexnusa_cohort_versions(id,cohort_code,user_id,brief,instruction,draft,evaluation,revision,submitted) values('${a}','LEXNUSA-PILOT-01','${a}','${text}','${text}','${text}','${text}','${text}',true)`);
await deny(`update lexnusa_cohort_versions set brief='tampered'`);
await deny(`delete from lexnusa_cohort_versions`);
await as(b);assert.equal((await db.query('select * from lexnusa_cohort_versions')).rows.length,0);
await deny(`insert into lexnusa_cohort_versions(cohort_code,user_id,brief,instruction,draft,evaluation,revision) values('LEXNUSA-PILOT-01','${a}','','','','','')`);
await deny(`insert into lexnusa_cohort_reviews(version_id,cohort_code,participant_id,reviewer_id,participant_score,decision,notes) values('${a}','LEXNUSA-PILOT-01','${a}','${b}',90,'verified','${text}')`);
await as(staff);assert.equal((await db.query('select * from lexnusa_cohort_versions')).rows.length,1);
await db.exec(`insert into lexnusa_cohort_reviews(version_id,cohort_code,participant_id,reviewer_id,participant_score,decision,notes) values('${a}','LEXNUSA-PILOT-01','${a}','${staff}',90,'verified','${text}')`);
await as(a);assert.equal((await db.query('select * from lexnusa_cohort_reviews')).rows.length,1);
await as(b);assert.equal((await db.query('select * from lexnusa_cohort_reviews')).rows.length,0);
await db.exec('reset role;set role anon');await deny('select * from lexnusa_cohort_versions');
await db.close();console.log('PASS: closed enrollment, staff isolation, participant isolation, immutable versions, reviewer authorization, private feedback, anonymous denial');
