-- Raja Ali Haji Institute Pilot Management: assessments, cohort monitoring, and admin authorization.

create table if not exists public.rahi_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.rahi_admins enable row level security;
revoke all on table public.rahi_admins from anon, authenticated;
grant select, insert, update, delete on table public.rahi_admins to service_role;

-- Reuse only accounts already designated as system administrators.
insert into public.rahi_admins (user_id, email, display_name)
select user_id, email, display_name from public.lexnusa_admins
on conflict (user_id) do update set
  email = excluded.email,
  display_name = excluded.display_name;

alter table public.profiles
  add column if not exists participant_category text,
  add column if not exists cohort_code text;

update public.profiles p
set participant_category = nullif(u.raw_user_meta_data->>'participant_category', ''),
    cohort_code = nullif(u.raw_user_meta_data->>'pilot_cohort', '')
from auth.users u
where u.id = p.id
  and (p.participant_category is null or p.cohort_code is null);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, institution, participant_category, cohort_code)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'full_name',''), split_part(new.email,'@',1)),
    nullif(new.raw_user_meta_data->>'institution',''),
    nullif(new.raw_user_meta_data->>'participant_category',''),
    nullif(new.raw_user_meta_data->>'pilot_cohort','')
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    institution = excluded.institution,
    participant_category = excluded.participant_category,
    cohort_code = excluded.cohort_code;
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

create table if not exists public.rahi_pilot_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  cohort_code text not null default 'RAHI-PILOT-01',
  assessment_type text not null check (assessment_type in ('baseline','endline','evaluation')),
  answers jsonb not null default '{}'::jsonb check (jsonb_typeof(answers) = 'object'),
  total_score integer check (total_score between 0 and 100),
  testimonial text,
  testimonial_consent boolean not null default false,
  completed_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, cohort_code, assessment_type)
);

alter table public.rahi_pilot_assessments enable row level security;
grant select, insert, update on table public.rahi_pilot_assessments to authenticated;
grant select, insert, update, delete on table public.rahi_pilot_assessments to service_role;

drop policy if exists "pilot assessment owner read" on public.rahi_pilot_assessments;
drop policy if exists "pilot assessment owner insert" on public.rahi_pilot_assessments;
drop policy if exists "pilot assessment owner update" on public.rahi_pilot_assessments;
create policy "pilot assessment owner read" on public.rahi_pilot_assessments
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "pilot assessment owner insert" on public.rahi_pilot_assessments
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "pilot assessment owner update" on public.rahi_pilot_assessments
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create table if not exists public.rahi_pilot_interventions (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references public.enrollments(id) on delete cascade,
  actor_user_id uuid not null references public.rahi_admins(user_id),
  risk_status text not null check (risk_status in ('green','yellow','red')),
  note text not null check (char_length(note) between 2 and 2000),
  action_status text not null default 'open' check (action_status in ('open','contacted','resolved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.rahi_pilot_interventions enable row level security;
revoke all on table public.rahi_pilot_interventions from anon, authenticated;
grant select, insert, update, delete on table public.rahi_pilot_interventions to service_role;

-- Tighten existing participant policies to authenticated users and explicit ownership.
drop policy if exists "profile owner read" on public.profiles;
drop policy if exists "profile owner update" on public.profiles;
create policy "profile owner read" on public.profiles for select to authenticated
  using ((select auth.uid()) = id);
create policy "profile owner update" on public.profiles for update to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

drop policy if exists "enrollment owner read" on public.enrollments;
drop policy if exists "enrollment owner insert" on public.enrollments;
drop policy if exists "enrollment owner update" on public.enrollments;
create policy "enrollment owner read" on public.enrollments for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "enrollment owner insert" on public.enrollments for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "enrollment owner update" on public.enrollments for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "progress owner read" on public.module_progress;
drop policy if exists "progress owner insert" on public.module_progress;
drop policy if exists "progress owner update" on public.module_progress;
create policy "progress owner read" on public.module_progress for select to authenticated
  using (exists (select 1 from public.enrollments e where e.id = enrollment_id and e.user_id = (select auth.uid())));
create policy "progress owner insert" on public.module_progress for insert to authenticated
  with check (exists (select 1 from public.enrollments e where e.id = enrollment_id and e.user_id = (select auth.uid())));
create policy "progress owner update" on public.module_progress for update to authenticated
  using (exists (select 1 from public.enrollments e where e.id = enrollment_id and e.user_id = (select auth.uid())))
  with check (exists (select 1 from public.enrollments e where e.id = enrollment_id and e.user_id = (select auth.uid())));

drop policy if exists "certificate owner read" on public.certificates;
create policy "certificate owner read" on public.certificates for select to authenticated
  using (exists (select 1 from public.enrollments e where e.id = enrollment_id and e.user_id = (select auth.uid())));

revoke execute on function public.issue_certificate_if_eligible(uuid) from public, anon;
grant execute on function public.issue_certificate_if_eligible(uuid) to authenticated;

