-- Phase 3: weekly participant check-ins and facilitator operations.
alter table public.profiles add column if not exists whatsapp_number text;

update public.profiles p
set whatsapp_number = nullif(regexp_replace(u.raw_user_meta_data->>'whatsapp_number', '[^0-9+]', '', 'g'), '')
from auth.users u
where u.id = p.id and p.whatsapp_number is null;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, institution, participant_category, cohort_code, whatsapp_number)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'full_name',''), split_part(new.email,'@',1)),
    nullif(new.raw_user_meta_data->>'institution',''),
    nullif(new.raw_user_meta_data->>'participant_category',''),
    nullif(new.raw_user_meta_data->>'pilot_cohort',''),
    nullif(regexp_replace(new.raw_user_meta_data->>'whatsapp_number', '[^0-9+]', '', 'g'), '')
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    institution = excluded.institution,
    participant_category = excluded.participant_category,
    cohort_code = excluded.cohort_code,
    whatsapp_number = coalesce(excluded.whatsapp_number, public.profiles.whatsapp_number);
  return new;
end;
$$;
revoke execute on function public.handle_new_user() from public, anon, authenticated;

create table if not exists public.rahi_pilot_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  cohort_code text not null default 'RAHI-PILOT-01',
  week_number smallint not null check (week_number between 1 and 4),
  confidence smallint not null check (confidence between 1 and 5),
  workload_status text not null check (workload_status in ('ringan','sesuai','berat')),
  blocker text not null default '' check (char_length(blocker) <= 3000),
  support_request text not null default '' check (char_length(support_request) <= 3000),
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, cohort_code, week_number)
);

alter table public.rahi_pilot_checkins enable row level security;
grant select, insert, update on table public.rahi_pilot_checkins to authenticated;
grant select, insert, update, delete on table public.rahi_pilot_checkins to service_role;

create policy "pilot checkin owner read" on public.rahi_pilot_checkins
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "pilot checkin owner insert" on public.rahi_pilot_checkins
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "pilot checkin owner update" on public.rahi_pilot_checkins
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create index if not exists rahi_pilot_checkins_cohort_week_idx
  on public.rahi_pilot_checkins (cohort_code, week_number);
create index if not exists rahi_pilot_checkins_user_idx
  on public.rahi_pilot_checkins (user_id);

create index if not exists rahi_pilot_interventions_status_idx
  on public.rahi_pilot_interventions (action_status, created_at desc);

