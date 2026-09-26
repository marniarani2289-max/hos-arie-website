create table public.persis_programs (
 id uuid primary key default gen_random_uuid(),
 year integer not null check(year between 2020 and 2100),
 title text not null check(char_length(trim(title)) between 3 and 160),
 division text not null check(char_length(trim(division)) between 2 and 120),
 responsible text not null check(char_length(trim(responsible)) between 2 and 160),
 start_date date not null,end_date date not null,
 budget bigint not null check(budget between 0 and 100000000000),
 funding_source text not null check(char_length(trim(funding_source)) between 3 and 500),
 target text not null check(char_length(trim(target)) between 3 and 2000),
 status text not null default 'planned' check(status in ('planned','ongoing','completed','cancelled')),
 progress integer not null default 0 check(progress between 0 and 100),
 report text not null default '' check(char_length(report)<=2000),
 change_reason text not null check(char_length(trim(change_reason)) between 3 and 500),
 updated_by uuid not null references auth.users(id),
 updated_at timestamptz not null default now(),created_at timestamptz not null default now(),
 check(extract(year from start_date)=year and extract(year from end_date)=year and end_date>=start_date),
 check(status<>'completed' or progress=100)
);
create index persis_program_year on public.persis_programs(year,id);
create index persis_program_actor on public.persis_programs(updated_by);
create table public.persis_program_allocations (
 cash_entry_id uuid primary key references public.persis_cash_entries(id),
 program_id uuid references public.persis_programs(id),
 reason text not null check(char_length(trim(reason)) between 3 and 500),
 updated_by uuid not null references auth.users(id),updated_at timestamptz not null default now()
);
create index persis_program_alloc_program on public.persis_program_allocations(program_id);
create index persis_program_alloc_actor on public.persis_program_allocations(updated_by);
create table public.persis_program_documents (
 id uuid primary key,program_id uuid not null references public.persis_programs(id),
 file_path text not null unique,file_name text not null check(char_length(file_name) between 1 and 180),
 caption text not null check(char_length(trim(caption)) between 3 and 300),
 created_by uuid not null references auth.users(id),created_at timestamptz not null default now()
);
create index persis_program_docs_program on public.persis_program_documents(program_id,created_at desc);
create index persis_program_docs_actor on public.persis_program_documents(created_by);
create table public.persis_program_audit (
 id bigint generated always as identity primary key,entity text not null,entity_id uuid not null,
 before_data jsonb,after_data jsonb not null,actor uuid not null references auth.users(id),created_at timestamptz not null default now()
);
create index persis_program_audit_entity on public.persis_program_audit(entity,entity_id,id desc);
create index persis_program_audit_actor on public.persis_program_audit(actor);
alter table public.persis_programs enable row level security;
alter table public.persis_program_allocations enable row level security;
alter table public.persis_program_documents enable row level security;
alter table public.persis_program_audit enable row level security;
revoke all on public.persis_programs,public.persis_program_allocations,public.persis_program_documents,public.persis_program_audit from anon,authenticated,service_role;
grant select on public.persis_programs,public.persis_program_allocations,public.persis_program_documents,public.persis_program_audit to authenticated,service_role;
grant insert,update on public.persis_programs,public.persis_program_allocations to service_role;
grant insert on public.persis_program_documents,public.persis_program_audit to service_role;
grant usage,select on sequence public.persis_program_audit_id_seq to service_role;
create policy persis_programs_read on public.persis_programs for select to authenticated using(exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())));
create policy persis_program_alloc_read on public.persis_program_allocations for select to authenticated using(exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())));
create policy persis_program_docs_read on public.persis_program_documents for select to authenticated using(exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())));
create policy persis_program_audit_read on public.persis_program_audit for select to authenticated using(exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())));

create function private.persis_program_guard() returns trigger language plpgsql security invoker set search_path='' as $$
declare actor_id uuid; record_id uuid; cash public.persis_cash_entries%rowtype; program public.persis_programs%rowtype;
begin
 if tg_op='DELETE' then raise exception 'Records must not be deleted';end if;
 if tg_table_name='persis_program_documents' then
  actor_id:=new.created_by;record_id:=new.id;
  if tg_op<>'INSERT' then raise exception 'Documents are immutable';end if;
  if new.file_path not like actor_id::text||'/'||new.id::text||'.%' or not exists(select 1 from storage.objects where bucket_id='persis-program-documents' and name=new.file_path) then raise exception 'Document file required';end if;
 else
  actor_id:=new.updated_by;new.updated_at:=clock_timestamp();
  if tg_table_name='persis_programs' then
   record_id:=new.id;
   if tg_op='UPDATE' and (new.id<>old.id or new.year<>old.year or new.created_at<>old.created_at) then raise exception 'Program identity/year cannot change';end if;
  else
   record_id:=new.cash_entry_id;
   if tg_op='UPDATE' and new.cash_entry_id<>old.cash_entry_id then raise exception 'Cash identity cannot change';end if;
   select * into cash from public.persis_cash_entries where id=new.cash_entry_id for update;
   if cash.id is null or cash.kind<>'expense' or cash.voided_at is not null then raise exception 'Only active expenses can be linked';end if;
   if new.program_id is not null then
    select * into program from public.persis_programs where id=new.program_id for share;
    if program.id is null or program.year<>extract(year from cash.transacted_on) then raise exception 'Program and expense year must match';end if;
    if program.status='cancelled' then raise exception 'Cannot assign to a cancelled program';end if;
   end if;
  end if;
 end if;
 if actor_id is null or not exists(select 1 from public.persis_treasurers where user_id=actor_id) then raise exception 'Treasurer required';end if;
 insert into public.persis_program_audit(entity,entity_id,before_data,after_data,actor)
 values(tg_table_name,record_id,case when tg_op='UPDATE' then to_jsonb(old) else null end,to_jsonb(new),actor_id);
 return new;
end; $$;
revoke all on function private.persis_program_guard() from public;
create trigger persis_program_guard before insert or update or delete on public.persis_programs for each row execute function private.persis_program_guard();
create trigger persis_program_allocation_guard before insert or update or delete on public.persis_program_allocations for each row execute function private.persis_program_guard();
create trigger persis_program_document_guard before insert or update or delete on public.persis_program_documents for each row execute function private.persis_program_guard();

-- Server-only atomic entry creation. Existing cash guard/audit remain unchanged.
create function public.persis_create_cash_with_program(p_entry jsonb,p_program_id uuid,p_actor uuid) returns uuid language plpgsql security invoker set search_path='' as $$
declare entry_id uuid:=(p_entry->>'id')::uuid;
begin
 if not exists(select 1 from public.persis_treasurers where user_id=p_actor) then raise exception 'Treasurer required';end if;
 insert into public.persis_cash_entries(id,transacted_on,kind,category,amount,party,activity,description,method,receipt_path,created_by)
 values(entry_id,(p_entry->>'transacted_on')::date,p_entry->>'kind',p_entry->>'category',(p_entry->>'amount')::bigint,p_entry->>'party',coalesce(p_entry->>'activity',''),p_entry->>'description',p_entry->>'method',p_entry->>'receipt_path',p_actor);
 if p_program_id is not null then
  insert into public.persis_program_allocations(cash_entry_id,program_id,reason,updated_by) values(entry_id,p_program_id,'Ditautkan saat pencatatan pengeluaran',p_actor);
 end if;
 return entry_id;
end; $$;
revoke all on function public.persis_create_cash_with_program(jsonb,uuid,uuid) from public,anon,authenticated;
grant execute on function public.persis_create_cash_with_program(jsonb,uuid,uuid) to service_role;

-- Optimistic conflict check prevents two reviewers overwriting assignments.
create function public.persis_assign_program(p_entry_id uuid,p_program_id uuid,p_actor uuid,p_reason text,p_expected uuid) returns void language plpgsql security invoker set search_path='' as $$
declare current_program uuid;
begin
 if not exists(select 1 from public.persis_treasurers where user_id=p_actor) then raise exception 'Treasurer required';end if;
 perform 1 from public.persis_cash_entries where id=p_entry_id for update;
 select program_id into current_program from public.persis_program_allocations where cash_entry_id=p_entry_id;
 if current_program is distinct from p_expected then raise exception 'Assignment changed; reload';end if;
 if exists(select 1 from public.persis_program_allocations where cash_entry_id=p_entry_id) then
  update public.persis_program_allocations set program_id=p_program_id,reason=p_reason,updated_by=p_actor where cash_entry_id=p_entry_id;
 else
  insert into public.persis_program_allocations(cash_entry_id,program_id,reason,updated_by) values(p_entry_id,p_program_id,p_reason,p_actor);
 end if;
end; $$;
revoke all on function public.persis_assign_program(uuid,uuid,uuid,text,uuid) from public,anon,authenticated;
grant execute on function public.persis_assign_program(uuid,uuid,uuid,text,uuid) to service_role;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('persis-program-documents','persis-program-documents',false,3145728,array['image/jpeg','image/png','application/pdf']);
create policy persis_program_document_read on storage.objects for select to authenticated using(bucket_id='persis-program-documents' and exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())));

create function public.persis_program_report(p_year integer) returns jsonb language plpgsql stable security invoker set search_path='' as $$
declare result jsonb;
begin
 if not exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())) then raise exception 'Treasurer required';end if;
 if p_year is null or p_year not between 2020 and 2100 then raise exception 'Invalid year';end if;
 with expenses as (select c.*,a.program_id from public.persis_cash_entries c left join public.persis_program_allocations a on a.cash_entry_id=c.id where c.kind='expense' and c.voided_at is null and c.transacted_on>=make_date(p_year,1,1) and c.transacted_on<make_date(p_year+1,1,1)),
 programs as (select p.*,coalesce((select sum(e.amount) from expenses e where e.program_id=p.id),0) as spent,(select count(*) from expenses e where e.program_id=p.id) as expense_count from public.persis_programs p where p.year=p_year)
 select jsonb_build_object('programs',coalesce((select jsonb_agg(to_jsonb(p) order by start_date,title,id) from programs p),'[]'::jsonb),
 'unassigned',coalesce((select jsonb_agg(to_jsonb(e) order by transacted_on,id) from expenses e where program_id is null),'[]'::jsonb),
 'cash_start_date',(select start_date from public.persis_cash_settings where id=true)) into result;
 return result;
end; $$;
revoke all on function public.persis_program_report(integer) from public,anon;
grant execute on function public.persis_program_report(integer) to authenticated;

-- Expose the current program link in the existing cashbook without changing any cash amounts.
create or replace view public.persis_cash_ledger with (security_invoker=true) as
select c.id,'manual'::text as source,c.transacted_on,c.kind,c.category,c.amount,c.party,c.activity,c.description,c.method,c.created_at,a.program_id,p.title as program_title
from public.persis_cash_entries c left join public.persis_program_allocations a on a.cash_entry_id=c.id left join public.persis_programs p on p.id=a.program_id where c.voided_at is null
union all
select id,'dues',paid_on,'income','Iuran anggota',amount,member_name,'Iuran '||to_char(period,'YYYY-MM'),
'Iuran '||to_char(period,'YYYY-MM')||case when note<>'' then ' · '||note else '' end,method,created_at,null::uuid,null::text
from public.persis_dues where status='verified';
