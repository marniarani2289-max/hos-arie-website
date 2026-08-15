-- Raja Ali Haji Institute: registration, learning progress, and certificates.
-- Run the complete file once in Supabase SQL Editor.

create extension if not exists pgcrypto;
create sequence if not exists public.certificate_serial_seq;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 2 and 120),
  institution text,
  created_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  programme_code text not null check (programme_code in ('RAHI-01','RAHI-02','RAHI-03')),
  enrolled_at timestamptz not null default now(),
  unique (user_id, programme_code)
);

create table if not exists public.module_progress (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references public.enrollments(id) on delete cascade,
  module_number integer not null check (module_number between 1 and 20),
  progress_percent integer not null default 0 check (progress_percent between 0 and 100),
  quiz_score integer not null default 0 check (quiz_score between 0 and 100),
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (enrollment_id, module_number)
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null unique references public.enrollments(id) on delete cascade,
  certificate_number text not null unique,
  issued_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.enrollments enable row level security;
alter table public.module_progress enable row level security;
alter table public.certificates enable row level security;

create policy "profile owner read" on public.profiles for select using (auth.uid() = id);
create policy "profile owner update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "enrollment owner read" on public.enrollments for select using (auth.uid() = user_id);
create policy "enrollment owner insert" on public.enrollments for insert with check (auth.uid() = user_id);
create policy "enrollment owner update" on public.enrollments for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "progress owner read" on public.module_progress for select using (exists (select 1 from public.enrollments e where e.id = enrollment_id and e.user_id = auth.uid()));
create policy "progress owner insert" on public.module_progress for insert with check (exists (select 1 from public.enrollments e where e.id = enrollment_id and e.user_id = auth.uid()));
create policy "progress owner update" on public.module_progress for update using (exists (select 1 from public.enrollments e where e.id = enrollment_id and e.user_id = auth.uid())) with check (exists (select 1 from public.enrollments e where e.id = enrollment_id and e.user_id = auth.uid()));
create policy "certificate owner read" on public.certificates for select using (exists (select 1 from public.enrollments e where e.id = enrollment_id and e.user_id = auth.uid()));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, institution)
  values (new.id, coalesce(nullif(new.raw_user_meta_data->>'full_name',''), split_part(new.email,'@',1)), nullif(new.raw_user_meta_data->>'institution',''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.issue_certificate_if_eligible(target_enrollment uuid)
returns text language plpgsql security definer set search_path = public
as $$
declare
  owner_id uuid;
  programme text;
  completed_count integer;
  cert_no text;
begin
  select user_id, programme_code into owner_id, programme from public.enrollments where id = target_enrollment;
  if owner_id is null or owner_id <> auth.uid() then raise exception 'not authorised'; end if;
  select count(*) into completed_count from public.module_progress where enrollment_id = target_enrollment and completed and quiz_score >= 70;
  if programme = 'RAHI-01' and completed_count >= 8 then
    cert_no := programme || '-' || extract(year from now())::integer || '-' || lpad(nextval('public.certificate_serial_seq')::text, 6, '0');
    insert into public.certificates (enrollment_id, certificate_number) values (target_enrollment, cert_no)
    on conflict (enrollment_id) do nothing;
    select certificate_number into cert_no from public.certificates where enrollment_id = target_enrollment;
    return cert_no;
  end if;
  return null;
end;
$$;

grant execute on function public.issue_certificate_if_eligible(uuid) to authenticated;

create or replace view public.certificate_verification
with (security_invoker = false)
as
select c.certificate_number, c.issued_at, p.full_name, e.programme_code
from public.certificates c
join public.enrollments e on e.id = c.enrollment_id
join public.profiles p on p.id = e.user_id;

revoke all on public.certificate_verification from public;
grant select on public.certificate_verification to anon, authenticated;
