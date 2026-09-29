create table public.cji_members (
 user_id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null,
 role text not null check (role in ('owner','editor','viewer')),
 created_at timestamptz not null default now()
);
alter table public.cji_members enable row level security;
revoke all on public.cji_members from anon, authenticated;
grant select on public.cji_members to authenticated;
create policy cji_member_self on public.cji_members for select to authenticated using (user_id = (select auth.uid()));

create table public.cji_records (
 id uuid primary key default gen_random_uuid(),
 kind text not null check (kind in ('client','matter','hearing','task','appointment','decision','finance','contact')),
 title text not null check (char_length(trim(title)) between 1 and 200),
 status text not null,
 parent_id uuid references public.cji_records(id) on delete restrict,
 due_at timestamptz,
 details jsonb not null default '{}' check (jsonb_typeof(details) = 'object' and octet_length(details::text) <= 20000),
 notes text not null default '' check (char_length(notes) <= 10000),
 created_by uuid not null references auth.users(id),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 check (parent_id is null or parent_id <> id),
 check (kind not in ('matter','hearing','decision') or parent_id is not null),
 check (kind not in ('hearing','appointment','finance') or due_at is not null),
 check (
 (kind='client' and status in ('Menunggu','Aktif','Selesai')) or
 (kind='matter' and status in ('Konsultasi','Aktif','Ditunda','Selesai')) or
 (kind='hearing' and status in ('Terjadwal','Selesai','Ditunda','Dibatalkan')) or
 (kind='task' and status in ('Terbuka','Dikerjakan','Selesai')) or
 (kind='appointment' and status in ('Terjadwal','Selesai','Dibatalkan')) or
 (kind='decision' and status in ('Dicatat','Ditelaah','Selesai')) or
 (kind='finance' and status in ('Belum dibayar','Dibayar','Dibatalkan')) or
 (kind='contact' and status in ('Aktif','Arsip'))),
 check (kind <> 'finance' or (coalesce(details->>'direction','') in ('Pemasukan','Pengeluaran') and coalesce(details->>'amount','') ~ '^[0-9]{1,13}$' and (details->>'amount')::numeric between 1 and 1000000000000))
);
create index cji_records_parent on public.cji_records(parent_id);
create index cji_records_kind_due on public.cji_records(kind,due_at);
create index cji_records_created_by on public.cji_records(created_by);
alter table public.cji_records enable row level security;
revoke all on public.cji_records from anon, authenticated;
grant select,insert,update on public.cji_records to authenticated;
create policy cji_records_read on public.cji_records for select to authenticated using (exists(select 1 from public.cji_members where user_id=(select auth.uid())));
create policy cji_records_insert on public.cji_records for insert to authenticated with check (created_by=(select auth.uid()) and exists(select 1 from public.cji_members where user_id=(select auth.uid()) and role in ('owner','editor')));
create policy cji_records_update on public.cji_records for update to authenticated using (exists(select 1 from public.cji_members where user_id=(select auth.uid()) and role in ('owner','editor'))) with check (exists(select 1 from public.cji_members where user_id=(select auth.uid()) and role in ('owner','editor')));

create schema if not exists private;
create function private.cji_record_guard() returns trigger language plpgsql security invoker set search_path='' as $$
declare expected text; actual text;
begin
 if TG_OP='UPDATE' and (new.id <> old.id or new.kind <> old.kind or new.created_by <> old.created_by or new.created_at <> old.created_at) then raise exception 'Immutable record identity'; end if;
 expected := case when new.kind in ('matter','appointment') then 'client' when new.kind in ('hearing','task','decision','finance') then 'matter' else null end;
 if new.parent_id is not null then
  select kind into actual from public.cji_records where id=new.parent_id;
  if expected is null or actual is distinct from expected then raise exception 'Invalid related record'; end if;
 end if;
 new.updated_at := clock_timestamp();
 return new;
end $$;
revoke all on function private.cji_record_guard() from public,anon,authenticated;
create trigger cji_record_guard before insert or update on public.cji_records for each row execute function private.cji_record_guard();

-- The office owner is resolved by verified existing account; public signup cannot grant access.
insert into public.cji_members(user_id,display_name,role)
select id,'Dr. Hos Arie Sibarani','owner' from auth.users
where lower(email)='riesib8@gmail.com' and email_confirmed_at is not null and coalesce(is_anonymous,false)=false;
