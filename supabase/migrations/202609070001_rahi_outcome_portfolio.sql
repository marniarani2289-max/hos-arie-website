-- Outcome-based learning + verified portfolio vertical slice for RAHI Pilot Cohort.
-- Security note: the two authenticated SECURITY DEFINER RPCs below are intentional narrow gates.
-- Each validates auth.uid() ownership before performing writes participants cannot do directly through RLS.
create table if not exists public.rahi_learning_outcomes (
  code text primary key,
  title text not null,
  description text not null,
  sort_order smallint not null unique
);

insert into public.rahi_learning_outcomes(code,title,description,sort_order) values
('LO-1','Knowledge','Memahami konsep utama pemikiran Raja Ali Haji dan Malay Ethical Constitutionalism.',1),
('LO-2','Analysis','Menganalisis persoalan kontemporer menggunakan kerangka yang dipelajari.',2),
('LO-3','Application','Menerapkan konsep pada kasus, kebijakan, atau problem nyata.',3),
('LO-4','Communication','Menyajikan argumentasi secara terstruktur, jelas, dan bertanggung jawab.',4),
('LO-5','Production','Menghasilkan karya final yang layak menjadi portofolio terverifikasi.',5)
on conflict (code) do update set title=excluded.title,description=excluded.description,sort_order=excluded.sort_order;

create table if not exists public.rahi_portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references public.enrollments(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  cohort_code text not null default 'RAHI-PILOT-01',
  track text not null check (track in ('Constitutional Analysis','Policy Brief','Legal / Historical Analysis','Public Knowledge','AI & Digital Humanities')),
  title text not null check (char_length(title) between 3 and 180),
  problem_statement text not null default '' check (char_length(problem_statement) <= 4000),
  visibility text not null default 'private' check (visibility in ('private','unlisted','public')),
  status text not null default 'draft' check (status in ('draft','submitted','revision_requested','verified')),
  showcase_approved boolean not null default false,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(enrollment_id)
);

create table if not exists public.rahi_portfolio_versions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.rahi_portfolio_projects(id) on delete cascade,
  version_number integer not null check (version_number > 0),
  artifact_url text,
  narrative text not null default '' check (char_length(narrative) <= 20000),
  evidence jsonb not null default '[]'::jsonb check (jsonb_typeof(evidence)='array'),
  submitted_by uuid not null references public.profiles(id),
  submitted_at timestamptz not null default now(),
  unique(project_id,version_number)
);

create table if not exists public.rahi_portfolio_reviews (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.rahi_portfolio_projects(id) on delete cascade,
  version_id uuid not null references public.rahi_portfolio_versions(id) on delete cascade,
  reviewer_user_id uuid not null references public.rahi_admins(user_id),
  rubric_scores jsonb not null default '{}'::jsonb check (jsonb_typeof(rubric_scores)='object'),
  outcome_scores jsonb not null default '{}'::jsonb check (jsonb_typeof(outcome_scores)='object'),
  total_score integer not null check (total_score between 0 and 100),
  decision text not null check (decision in ('revision_requested','verified')),
  reviewer_notes text not null default '' check (char_length(reviewer_notes) <= 6000),
  reviewed_at timestamptz not null default now()
);

create index if not exists rahi_portfolio_projects_user_idx on public.rahi_portfolio_projects(user_id,cohort_code);
create index if not exists rahi_portfolio_versions_project_idx on public.rahi_portfolio_versions(project_id,version_number desc);
create index if not exists rahi_portfolio_reviews_project_idx on public.rahi_portfolio_reviews(project_id,reviewed_at desc);

alter table public.rahi_learning_outcomes enable row level security;
alter table public.rahi_portfolio_projects enable row level security;
alter table public.rahi_portfolio_versions enable row level security;
alter table public.rahi_portfolio_reviews enable row level security;

grant select on public.rahi_learning_outcomes to authenticated;
grant select,insert,update on public.rahi_portfolio_projects to authenticated;
grant select,insert on public.rahi_portfolio_versions to authenticated;
grant select on public.rahi_portfolio_reviews to authenticated;
grant all on public.rahi_learning_outcomes,public.rahi_portfolio_projects,public.rahi_portfolio_versions,public.rahi_portfolio_reviews to service_role;

create policy "learning outcomes authenticated read" on public.rahi_learning_outcomes for select to authenticated using (true);
create policy "portfolio project owner read" on public.rahi_portfolio_projects for select to authenticated using ((select auth.uid())=user_id);
create policy "portfolio project owner insert" on public.rahi_portfolio_projects for insert to authenticated with check (
  (select auth.uid())=user_id and status='draft' and showcase_approved=false and verified_at is null
  and exists(select 1 from public.enrollments e where e.id=enrollment_id and e.user_id=(select auth.uid()) and e.programme_code='RAHI-01')
);
create policy "portfolio project owner update" on public.rahi_portfolio_projects for update to authenticated
  using ((select auth.uid())=user_id and status in ('draft','revision_requested'))
  with check ((select auth.uid())=user_id and status in ('draft','submitted') and showcase_approved=false and verified_at is null);
create policy "portfolio version owner read" on public.rahi_portfolio_versions for select to authenticated using (
  exists(select 1 from public.rahi_portfolio_projects p where p.id=project_id and p.user_id=(select auth.uid()))
);
create policy "portfolio version owner insert" on public.rahi_portfolio_versions for insert to authenticated with check (
  submitted_by=(select auth.uid()) and exists(select 1 from public.rahi_portfolio_projects p where p.id=project_id and p.user_id=(select auth.uid()) and p.status in ('draft','revision_requested'))
);
create policy "portfolio review owner read" on public.rahi_portfolio_reviews for select to authenticated using (
  exists(select 1 from public.rahi_portfolio_projects p where p.id=project_id and p.user_id=(select auth.uid()))
);

create or replace function public.submit_rahi_portfolio_version(target_project uuid, artifact text, narrative_text text, evidence_items jsonb default '[]'::jsonb)
returns uuid language plpgsql security definer set search_path='public'
as $$
declare owner_id uuid; current_status text; next_version integer; new_id uuid;
begin
  select user_id,status into owner_id,current_status from public.rahi_portfolio_projects where id=target_project for update;
  if owner_id is null or owner_id<>(select auth.uid()) then raise exception 'not authorised'; end if;
  if current_status not in ('draft','revision_requested') then raise exception 'project is not editable'; end if;
  if jsonb_typeof(coalesce(evidence_items,'[]'::jsonb))<>'array' then raise exception 'evidence must be an array'; end if;
  select coalesce(max(version_number),0)+1 into next_version from public.rahi_portfolio_versions where project_id=target_project;
  insert into public.rahi_portfolio_versions(project_id,version_number,artifact_url,narrative,evidence,submitted_by)
  values(target_project,next_version,nullif(trim(artifact),''),left(coalesce(narrative_text,''),20000),coalesce(evidence_items,'[]'::jsonb),(select auth.uid())) returning id into new_id;
  update public.rahi_portfolio_projects set status='submitted',updated_at=now() where id=target_project;
  return new_id;
end; $$;
revoke execute on function public.submit_rahi_portfolio_version(uuid,text,text,jsonb) from public,anon;
grant execute on function public.submit_rahi_portfolio_version(uuid,text,text,jsonb) to authenticated;

create or replace function public.issue_certificate_if_eligible(target_enrollment uuid)
returns text language plpgsql security definer set search_path='public'
as $$
declare owner_id uuid; programme text; completed_count integer; passed_count integer; portfolio_ok boolean; cert_no text;
begin
  select user_id,programme_code into owner_id,programme from public.enrollments where id=target_enrollment;
  if owner_id is null or owner_id<>(select auth.uid()) then raise exception 'not allowed'; end if;
  select count(*) filter(where completed),count(*) filter(where quiz_score>=70) into completed_count,passed_count
    from public.module_progress where enrollment_id=target_enrollment and module_number between 1 and 8;
  select exists(
    select 1 from public.rahi_portfolio_projects p
    join lateral (select r.total_score,r.decision from public.rahi_portfolio_reviews r where r.project_id=p.id order by r.reviewed_at desc limit 1) lr on true
    where p.enrollment_id=target_enrollment and p.status='verified' and p.verified_at is not null and lr.decision='verified' and lr.total_score>=60
  ) into portfolio_ok;
  if completed_count<8 or passed_count<8 or not portfolio_ok then return null; end if;
  cert_no:=programme||'-'||extract(year from now())::integer||'-'||lpad(nextval('public.certificate_serial_seq')::text,6,'0');
  insert into public.certificates(enrollment_id,certificate_number) values(target_enrollment,cert_no) on conflict(enrollment_id) do nothing;
  select certificate_number into cert_no from public.certificates where enrollment_id=target_enrollment;
  return cert_no;
end; $$;
revoke execute on function public.issue_certificate_if_eligible(uuid) from public,anon;
grant execute on function public.issue_certificate_if_eligible(uuid) to authenticated;
