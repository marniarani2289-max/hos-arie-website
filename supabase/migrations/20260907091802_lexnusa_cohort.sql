-- Independent cohort records; no changes to Institute tables or certificate rules.
create table public.lexnusa_cohorts (
 code text primary key, title text not null, enrollment_open boolean not null default false
);
create table public.lexnusa_cohort_staff (
 cohort_code text references public.lexnusa_cohorts(code), user_id uuid references auth.users(id),
 primary key(cohort_code,user_id)
);
create table public.lexnusa_cohort_members (
 cohort_code text references public.lexnusa_cohorts(code), user_id uuid references auth.users(id),
 created_at timestamptz not null default now(), primary key(cohort_code,user_id)
);
create table public.lexnusa_cohort_versions (
 id uuid primary key default gen_random_uuid(), cohort_code text not null, user_id uuid not null,
 brief text not null check(length(brief)<=20000), instruction text not null check(length(instruction)<=20000),
 draft text not null check(length(draft)<=20000), evaluation text not null check(length(evaluation)<=20000),
 revision text not null check(length(revision)<=20000), submitted boolean not null default false,
 created_at timestamptz not null default now(),
 foreign key(cohort_code,user_id) references public.lexnusa_cohort_members(cohort_code,user_id),
 unique(id,cohort_code,user_id),
 check(not submitted or least(length(trim(brief)),length(trim(instruction)),length(trim(draft)),length(trim(evaluation)),length(trim(revision)))>=20)
);
create table public.lexnusa_cohort_reviews (
 id uuid primary key default gen_random_uuid(), version_id uuid not null, cohort_code text not null,
 participant_id uuid not null, reviewer_id uuid not null references auth.users(id),
 participant_score integer not null check(participant_score between 0 and 100),
 decision text not null check(decision in ('revision_requested','verified')),
 notes text not null check(length(trim(notes)) between 20 and 10000),
 created_at timestamptz not null default now(),
 foreign key(version_id,cohort_code,participant_id) references public.lexnusa_cohort_versions(id,cohort_code,user_id),
 check(decision <> 'verified' or participant_score >= 75),check(reviewer_id <> participant_id)
);
create index on public.lexnusa_cohort_versions(cohort_code,user_id,created_at desc);
create index on public.lexnusa_cohort_reviews(cohort_code,participant_id,created_at desc);
create index on public.lexnusa_cohort_reviews(version_id);
alter table public.lexnusa_cohorts enable row level security;
alter table public.lexnusa_cohort_staff enable row level security;
alter table public.lexnusa_cohort_members enable row level security;
alter table public.lexnusa_cohort_versions enable row level security;
alter table public.lexnusa_cohort_reviews enable row level security;
revoke all on public.lexnusa_cohorts,public.lexnusa_cohort_staff,public.lexnusa_cohort_members,public.lexnusa_cohort_versions,public.lexnusa_cohort_reviews from anon,authenticated;
grant select on public.lexnusa_cohorts,public.lexnusa_cohort_staff to authenticated;
grant update(enrollment_open) on public.lexnusa_cohorts to authenticated;
grant select,insert on public.lexnusa_cohort_members,public.lexnusa_cohort_versions,public.lexnusa_cohort_reviews to authenticated;
create policy cohort_read on public.lexnusa_cohorts for select to authenticated using(true);
create policy staff_read_self on public.lexnusa_cohort_staff for select to authenticated using(user_id=(select auth.uid()));
create policy cohort_staff_update on public.lexnusa_cohorts for update to authenticated
 using(exists(select 1 from public.lexnusa_cohort_staff s where s.cohort_code=code and s.user_id=(select auth.uid())))
 with check(exists(select 1 from public.lexnusa_cohort_staff s where s.cohort_code=code and s.user_id=(select auth.uid())));
create policy members_read on public.lexnusa_cohort_members for select to authenticated using(
 user_id=(select auth.uid()) or exists(select 1 from public.lexnusa_cohort_staff s where s.cohort_code=lexnusa_cohort_members.cohort_code and s.user_id=(select auth.uid())));
create policy members_join on public.lexnusa_cohort_members for insert to authenticated with check(
 user_id=(select auth.uid()) and exists(select 1 from public.lexnusa_cohorts c where c.code=cohort_code and c.enrollment_open));
create policy versions_read on public.lexnusa_cohort_versions for select to authenticated using(
 user_id=(select auth.uid()) or exists(select 1 from public.lexnusa_cohort_staff s where s.cohort_code=lexnusa_cohort_versions.cohort_code and s.user_id=(select auth.uid())));
create policy versions_insert on public.lexnusa_cohort_versions for insert to authenticated with check(
 user_id=(select auth.uid()) and exists(select 1 from public.lexnusa_cohort_members m where m.cohort_code=lexnusa_cohort_versions.cohort_code and m.user_id=(select auth.uid())));
create policy reviews_read on public.lexnusa_cohort_reviews for select to authenticated using(
 participant_id=(select auth.uid()) or exists(select 1 from public.lexnusa_cohort_staff s where s.cohort_code=lexnusa_cohort_reviews.cohort_code and s.user_id=(select auth.uid())));
create policy reviews_insert on public.lexnusa_cohort_reviews for insert to authenticated with check(
 reviewer_id=(select auth.uid()) and exists(select 1 from public.lexnusa_cohort_staff s where s.cohort_code=lexnusa_cohort_reviews.cohort_code and s.user_id=(select auth.uid()))
 and exists(select 1 from public.lexnusa_cohort_versions v where v.id=version_id and v.submitted));
insert into public.lexnusa_cohorts(code,title) values('LEXNUSA-PILOT-01','Praktik Kontrak Kerja dengan AI');
