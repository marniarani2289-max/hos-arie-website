-- Only this module's treasurers may read financial records; all mutations run on the server.
create table public.persis_cash_settings (
 id boolean primary key default true check (id),
 start_date date not null check (start_date between '2020-01-01'::date and (now() at time zone 'Asia/Jakarta')::date),
 opening_balance bigint not null check (opening_balance between 0 and 100000000000),
 note text not null check (char_length(trim(note)) between 3 and 500),
 updated_by uuid not null references auth.users(id),
 updated_at timestamptz not null default now()
);
create table public.persis_cash_entries (
 id uuid primary key,
 transacted_on date not null check (transacted_on between '2020-01-01'::date and (now() at time zone 'Asia/Jakarta')::date),
 kind text not null check (kind in ('income','expense')),
 category text not null,
 amount bigint not null check (amount between 1 and 10000000000),
 party text not null check (char_length(trim(party)) between 2 and 160),
 activity text not null default '' check (char_length(activity)<=160),
 description text not null check (char_length(trim(description)) between 3 and 500),
 method text not null check (method in ('transfer','tunai','lainnya')),
 receipt_path text not null unique,
 created_by uuid not null references auth.users(id),
 created_at timestamptz not null default now(),
 voided_by uuid references auth.users(id),
 voided_at timestamptz,
 void_reason text not null default '',
 check ((kind='income' and category in ('Infak','Donasi','Bantuan','Pemasukan lainnya')) or
 (kind='expense' and category in ('Dakwah','Pendidikan','Sosial','Operasional','Kegiatan organisasi','Pengeluaran lainnya'))),
 check ((voided_at is null and voided_by is null and void_reason='') or
 (voided_at is not null and voided_by is not null and char_length(trim(void_reason)) between 3 and 500))
);
create index persis_cash_date on public.persis_cash_entries(transacted_on,id);
create index persis_cash_creator on public.persis_cash_entries(created_by);
create index persis_cash_voider on public.persis_cash_entries(voided_by);
create index persis_cash_settings_actor on public.persis_cash_settings(updated_by);
create table public.persis_cash_audit (
 id bigint generated always as identity primary key,
 entity text not null, entity_id text not null, action text not null,
 before_data jsonb, after_data jsonb not null,
 actor uuid not null references auth.users(id), created_at timestamptz not null default now()
);
create index persis_cash_audit_actor on public.persis_cash_audit(actor);
create index persis_cash_audit_date on public.persis_cash_audit(created_at desc);
alter table public.persis_cash_settings enable row level security;
alter table public.persis_cash_entries enable row level security;
alter table public.persis_cash_audit enable row level security;
revoke all on public.persis_cash_settings,public.persis_cash_entries,public.persis_cash_audit from anon,authenticated;
grant select on public.persis_cash_settings,public.persis_cash_entries,public.persis_cash_audit to authenticated;
grant select,insert,update on public.persis_cash_settings,public.persis_cash_entries to service_role;
grant select,insert on public.persis_cash_audit to service_role;
grant usage,select on sequence public.persis_cash_audit_id_seq to service_role;
create policy persis_cash_settings_read on public.persis_cash_settings for select to authenticated using (exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())));
create policy persis_cash_entries_read on public.persis_cash_entries for select to authenticated using (exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())));
create policy persis_cash_audit_read on public.persis_cash_audit for select to authenticated using (exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())));

create function private.persis_cash_guard() returns trigger language plpgsql security invoker set search_path='' as $$
declare actor_id uuid; base_date date;
begin
 if tg_op='DELETE' then raise exception 'Cash records cannot be deleted'; end if;
 if tg_table_name='persis_cash_settings' then
  actor_id:=new.updated_by;
  if tg_op='UPDATE' and (new.id<>old.id or new.start_date<>old.start_date) then raise exception 'Opening date cannot change'; end if;
  new.updated_at:=now();
 else
  if tg_op='INSERT' then
   actor_id:=new.created_by;
   if new.voided_at is not null then raise exception 'New entry cannot be void'; end if;
   select start_date into base_date from public.persis_cash_settings where id=true;
   if base_date is null or new.transacted_on<base_date then raise exception 'Entry must be within cashbook period'; end if;
   if new.receipt_path not like new.created_by::text || '/' || new.id::text || '.%' or not exists(select 1 from storage.objects where bucket_id='persis-cash-receipts' and name=new.receipt_path) then raise exception 'Valid receipt required'; end if;
  else
   actor_id:=new.voided_by;
   if old.voided_at is not null or new.voided_at is null or
    (to_jsonb(new)-array['voided_at','voided_by','void_reason']) is distinct from (to_jsonb(old)-array['voided_at','voided_by','void_reason']) then raise exception 'Only cancellation is allowed'; end if;
   new.voided_at:=now();
  end if;
 end if;
 if actor_id is null or not exists(select 1 from public.persis_treasurers where user_id=actor_id) then raise exception 'Treasurer required'; end if;
 insert into public.persis_cash_audit(entity,entity_id,action,before_data,after_data,actor)
 values(tg_table_name,new.id::text,case when tg_op='INSERT' then 'create' when tg_table_name='persis_cash_settings' then 'opening_correction' else 'void' end,case when tg_op='UPDATE' then to_jsonb(old) else null end,to_jsonb(new),actor_id);
 return new;
end; $$;
revoke all on function private.persis_cash_guard() from public;
create trigger persis_cash_settings_guard before insert or update or delete on public.persis_cash_settings for each row execute function private.persis_cash_guard();
create trigger persis_cash_entries_guard before insert or update or delete on public.persis_cash_entries for each row execute function private.persis_cash_guard();

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('persis-cash-receipts','persis-cash-receipts',false,3145728,array['image/jpeg','image/png','application/pdf']);
-- Upload/cleanup use server credentials only; authenticated readers must be assigned treasurers.
create policy persis_cash_receipt_read on storage.objects for select to authenticated using (
 bucket_id='persis-cash-receipts' and exists(select 1 from public.persis_treasurers where user_id=(select auth.uid()))
);

create view public.persis_cash_ledger with (security_invoker=true) as
select id,'manual'::text as source,transacted_on,kind,category,amount,party,activity,description,method,created_at
from public.persis_cash_entries where voided_at is null
union all
select id,'dues',paid_on,'income','Iuran anggota',amount,member_name,'Iuran '||to_char(period,'YYYY-MM'),
 'Iuran '||to_char(period,'YYYY-MM')||case when note<>'' then ' · '||note else '' end,method,created_at
from public.persis_dues where status='verified';
revoke all on public.persis_cash_ledger from anon,authenticated;
grant select on public.persis_cash_ledger to authenticated;

-- A single statement snapshot keeps totals, rows, and running balances consistent.
create function public.persis_cash_report(p_month date) returns jsonb language plpgsql stable security invoker set search_path='' as $$
declare result jsonb;
begin
 if not exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())) then raise exception 'Treasurer required'; end if;
 if p_month is null or extract(day from p_month)<>1 or p_month not between '2020-01-01'::date and '2100-12-01'::date then raise exception 'Invalid month'; end if;
 with settings as (select * from public.persis_cash_settings where id=true),
 ledger as (select l.* from public.persis_cash_ledger l,settings s where l.transacted_on>=s.start_date and l.transacted_on<(p_month+interval '1 month')::date),
 opening as (select s.opening_balance+coalesce((select sum(case when kind='income' then amount else -amount end) from ledger where transacted_on<p_month),0) as amount from settings s),
 rows as (select l.*, (select amount from opening)+sum(case when kind='income' then amount else -amount end) over(order by transacted_on,created_at,source,id rows unbounded preceding) as balance from ledger l where transacted_on>=p_month)
 select jsonb_build_object(
 'settings',(select to_jsonb(s) from settings s),
 'opening',coalesce((select amount from opening),0),
 'income',coalesce((select sum(amount) from rows where kind='income'),0),
 'expense',coalesce((select sum(amount) from rows where kind='expense'),0),
 'rows',coalesce((select jsonb_agg(to_jsonb(r) order by transacted_on,created_at,source,id) from rows r),'[]'::jsonb),
 'voided',coalesce((select jsonb_agg(to_jsonb(e) order by voided_at desc) from public.persis_cash_entries e where e.voided_at is not null and e.transacted_on>=p_month and e.transacted_on<(p_month+interval '1 month')::date),'[]'::jsonb)
 ) into result;
 return result;
end; $$;
revoke all on function public.persis_cash_report(date) from public,anon;
grant execute on function public.persis_cash_report(date) to authenticated;
