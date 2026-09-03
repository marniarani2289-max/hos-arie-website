-- Keep public certificate verification available without exposing participant tables.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists public.certificate_verification_public (
  certificate_number text primary key,
  issued_at timestamptz not null,
  full_name text not null,
  programme_code text not null
);

alter table public.certificate_verification_public enable row level security;
revoke all on table public.certificate_verification_public from public, anon, authenticated;
grant select on table public.certificate_verification_public to anon, authenticated;
grant select, insert, update, delete on table public.certificate_verification_public to service_role;

drop policy if exists "public certificate verification read" on public.certificate_verification_public;
create policy "public certificate verification read"
  on public.certificate_verification_public for select
  to anon, authenticated using (true);

insert into public.certificate_verification_public
  (certificate_number, issued_at, full_name, programme_code)
select c.certificate_number, c.issued_at, p.full_name, e.programme_code
from public.certificates c
join public.enrollments e on e.id = c.enrollment_id
join public.profiles p on p.id = e.user_id
on conflict (certificate_number) do update set
  issued_at = excluded.issued_at,
  full_name = excluded.full_name,
  programme_code = excluded.programme_code;

create or replace function private.sync_certificate_verification_from_certificate()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  if tg_op in ('UPDATE', 'DELETE') then
    delete from public.certificate_verification_public
    where certificate_number = old.certificate_number;
  end if;
  if tg_op in ('INSERT', 'UPDATE') then
    insert into public.certificate_verification_public
      (certificate_number, issued_at, full_name, programme_code)
    select new.certificate_number, new.issued_at, p.full_name, e.programme_code
    from public.enrollments e
    join public.profiles p on p.id = e.user_id
    where e.id = new.enrollment_id
    on conflict (certificate_number) do update set
      issued_at = excluded.issued_at,
      full_name = excluded.full_name,
      programme_code = excluded.programme_code;
  end if;
  return coalesce(new, old);
end;
$$;

create or replace function private.sync_certificate_verification_from_profile()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  update public.certificate_verification_public cv
  set full_name = new.full_name
  from public.certificates c
  join public.enrollments e on e.id = c.enrollment_id
  where e.user_id = new.id and cv.certificate_number = c.certificate_number;
  return new;
end;
$$;

create or replace function private.sync_certificate_verification_from_enrollment()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  update public.certificate_verification_public cv
  set programme_code = new.programme_code, full_name = p.full_name
  from public.certificates c
  join public.profiles p on p.id = new.user_id
  where c.enrollment_id = new.id and cv.certificate_number = c.certificate_number;
  return new;
end;
$$;

revoke all on function private.sync_certificate_verification_from_certificate()
  from public, anon, authenticated, service_role;
revoke all on function private.sync_certificate_verification_from_profile()
  from public, anon, authenticated, service_role;
revoke all on function private.sync_certificate_verification_from_enrollment()
  from public, anon, authenticated, service_role;

drop trigger if exists sync_certificate_verification_certificate on public.certificates;
create trigger sync_certificate_verification_certificate
after insert or update or delete on public.certificates
for each row execute function private.sync_certificate_verification_from_certificate();

drop trigger if exists sync_certificate_verification_profile on public.profiles;
create trigger sync_certificate_verification_profile
after update of full_name on public.profiles
for each row when (old.full_name is distinct from new.full_name)
execute function private.sync_certificate_verification_from_profile();

drop trigger if exists sync_certificate_verification_enrollment on public.enrollments;
create trigger sync_certificate_verification_enrollment
after update of programme_code, user_id on public.enrollments
for each row when (
  old.programme_code is distinct from new.programme_code
  or old.user_id is distinct from new.user_id
)
execute function private.sync_certificate_verification_from_enrollment();

drop view if exists public.certificate_verification;
create view public.certificate_verification
with (security_invoker = true)
as
select certificate_number, issued_at, full_name, programme_code
from public.certificate_verification_public;

revoke all on public.certificate_verification from public;
grant select on public.certificate_verification to anon, authenticated;

-- Event triggers continue to run as the database owner, but cannot be called via RPC.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;

do $$
begin
  if not exists (
    select 1 from public.certificate_verification_public
    where certificate_number is not null
  ) and exists (select 1 from public.certificates) then
    raise exception 'certificate verification projection was not populated';
  end if;
end
$$;
