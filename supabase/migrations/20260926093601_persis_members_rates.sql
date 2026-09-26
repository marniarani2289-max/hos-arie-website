create table public.persis_members (
 id uuid primary key default gen_random_uuid(),
 user_id uuid unique references auth.users(id),
 full_name text not null check(char_length(trim(full_name)) between 2 and 120),
 email text unique check(email is null or (email=lower(trim(email)) and char_length(email)<=254 and email like '%@%')),
 member_number text not null default '' check(char_length(member_number)<=60),
 region text not null check(region in ('Batam','Tanjungpinang','Bintan','Karimun','Lingga','Natuna','Kepulauan Anambas','Lainnya')),
 start_month date check(start_month between date '2020-01-01' and date '2100-12-01' and extract(day from start_month)=1),
 end_month date check(end_month between date '2020-01-01' and date '2100-12-01' and extract(day from end_month)=1),
 note text not null default '' check(char_length(note)<=500),
 updated_by uuid references auth.users(id),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 check(end_month is null or (start_month is not null and end_month>=start_month))
);
create unique index persis_member_number_unique on public.persis_members(member_number) where member_number<>'';
create index persis_members_region on public.persis_members(region);
create index persis_members_editor on public.persis_members(updated_by);
create table public.persis_rates (
 id uuid primary key default gen_random_uuid(),
 effective_month date not null unique check(effective_month between date '2020-01-01' and date '2100-12-01' and extract(day from effective_month)=1),
 amount bigint not null check(amount between 1 and 100000000),
 due_day integer not null check(due_day between 1 and 28),
 reference text not null check(char_length(trim(reference)) between 3 and 300),
 created_by uuid not null references auth.users(id),
 created_at timestamptz not null default now()
);
create index persis_rates_creator on public.persis_rates(created_by);
create table public.persis_master_audit (
 id uuid primary key default gen_random_uuid(),
 entity text not null,
 record_id uuid not null,
 before_data jsonb,
 after_data jsonb not null,
 actor_id uuid references auth.users(id),
 created_at timestamptz not null default now()
);
create index persis_master_audit_record on public.persis_master_audit(record_id,created_at);
create index persis_master_audit_actor on public.persis_master_audit(actor_id);
alter table public.persis_members enable row level security;
alter table public.persis_rates enable row level security;
alter table public.persis_master_audit enable row level security;
revoke all on public.persis_members,public.persis_rates,public.persis_master_audit from anon,authenticated;
grant select on public.persis_members,public.persis_rates,public.persis_master_audit to authenticated;
grant all on public.persis_members,public.persis_rates,public.persis_master_audit to service_role;
create policy persis_members_read on public.persis_members for select to authenticated using
 (user_id=(select auth.uid()) or exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())));
create policy persis_rates_read on public.persis_rates for select to authenticated using
 (exists(select 1 from public.persis_members where user_id=(select auth.uid())) or exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())));
create policy persis_audit_read on public.persis_master_audit for select to authenticated using
 (exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())));
create function private.persis_master_audit_write() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if tg_table_name='persis_members' then new.updated_at=clock_timestamp(); end if;
 insert into public.persis_master_audit(entity,record_id,before_data,after_data,actor_id)
 values(tg_table_name,new.id,case when tg_op='UPDATE' then to_jsonb(old) else null end,to_jsonb(new),
 case when tg_table_name='persis_members' then (to_jsonb(new)->>'updated_by')::uuid else (to_jsonb(new)->>'created_by')::uuid end);
 return new;
end; $$;
revoke all on function private.persis_master_audit_write() from public;
create trigger persis_members_audit before insert or update on public.persis_members for each row execute function private.persis_master_audit_write();
create trigger persis_rates_audit before insert on public.persis_rates for each row execute function private.persis_master_audit_write();
-- Allow additional payments after verification, while preventing simultaneous pending submissions.
drop index public.persis_dues_one_active_month;
create unique index persis_dues_one_pending_month on public.persis_dues(user_id,period) where status='pending';
