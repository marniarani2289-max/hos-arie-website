create table public.persis_member_contacts (
 member_id uuid primary key references public.persis_members(id),
 phone text not null default '' check(phone='' or phone ~ '^628[0-9]{7,12}$'),
 verified_at timestamptz, paused boolean not null default false,
 updated_by uuid not null references auth.users(id),updated_at timestamptz not null default now(),
 check((phone='' and verified_at is null) or (phone<>'' and verified_at is not null))
);
create index persis_contact_actor on public.persis_member_contacts(updated_by);
create table public.persis_reminders (
 id uuid primary key default gen_random_uuid(),member_id uuid not null references public.persis_members(id),
 status text not null check(status in ('draft','sent','note','promised','disputed','no_response')),
 cutoff date not null check(extract(day from cutoff)=1 and cutoff between '2020-01-01'::date and '2100-12-01'::date),
 amount bigint not null default 0 check(amount between 0 and 1000000000000),
 phone text not null default '',message text not null default '' check(char_length(message)<=20000),
 snapshot_hash text not null default '',note text not null default '' check(char_length(note)<=1000),
 next_followup date check(next_followup between '2020-01-01'::date and '2100-12-31'::date),
 created_by uuid not null references auth.users(id),updated_by uuid not null references auth.users(id),
 created_at timestamptz not null default now(),sent_at timestamptz,
 check((status in ('draft','sent') and amount>0 and phone ~ '^628[0-9]{7,12}$' and char_length(message)>10 and snapshot_hash ~ '^[0-9a-f]{64}$') or (status not in ('draft','sent') and phone='' and message='' and snapshot_hash='' and char_length(trim(note))>=3)),
 check((status='sent' and sent_at is not null) or (status<>'sent' and sent_at is null))
);
create index persis_reminders_member_date on public.persis_reminders(member_id,created_at desc,id);
create index persis_reminders_creator on public.persis_reminders(created_by);
create index persis_reminders_editor on public.persis_reminders(updated_by);
alter table public.persis_member_contacts enable row level security;
alter table public.persis_reminders enable row level security;
revoke all on public.persis_member_contacts,public.persis_reminders from anon,authenticated,service_role;
grant select on public.persis_member_contacts,public.persis_reminders to authenticated,service_role;
grant insert,update on public.persis_member_contacts,public.persis_reminders to service_role;
create policy persis_contact_read on public.persis_member_contacts for select to authenticated using(exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())));
create policy persis_reminder_read on public.persis_reminders for select to authenticated using(exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())));
create function private.persis_reminder_guard() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if not exists(select 1 from public.persis_treasurers where user_id=new.updated_by) then raise exception 'Treasurer required';end if;
 if tg_table_name='persis_member_contacts' then
  if tg_op='UPDATE' and new.member_id<>old.member_id then raise exception 'Member cannot change';end if;
  new.updated_at:=clock_timestamp();
  insert into public.persis_master_audit(entity,record_id,before_data,after_data,actor_id) values(tg_table_name,new.member_id,case when tg_op='UPDATE' then to_jsonb(old) else null end,to_jsonb(new),new.updated_by);
 else
  if tg_op='INSERT' then
   if new.created_by<>new.updated_by or new.status='sent' then raise exception 'New records cannot claim delivery';end if;
   new.created_at:=clock_timestamp();
  else
   if old.status<>'draft' or new.status<>'sent' or (to_jsonb(new)-array['status','sent_at','updated_by']) is distinct from (to_jsonb(old)-array['status','sent_at','updated_by']) then raise exception 'Only manual sent confirmation allowed';end if;
   new.sent_at:=clock_timestamp();
  end if;
 end if;
 return new;
end; $$;
revoke all on function private.persis_reminder_guard() from public;
create trigger persis_contact_guard before insert or update on public.persis_member_contacts for each row execute function private.persis_reminder_guard();
create trigger persis_reminder_guard before insert or update on public.persis_reminders for each row execute function private.persis_reminder_guard();
-- Consistent snapshot for reminder preparation; never expose contact or collection history to members.
create function public.persis_reminder_data(p_member uuid default null) returns jsonb language plpgsql stable security invoker set search_path='' as $$
declare result jsonb;
begin
 if not exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())) then raise exception 'Treasurer required';end if;
 select jsonb_build_object(
 'members',coalesce((select jsonb_agg(to_jsonb(m)||jsonb_build_object('contact',(select to_jsonb(c) from public.persis_member_contacts c where c.member_id=m.id),'latest',(select to_jsonb(r) from public.persis_reminders r where r.member_id=m.id and r.status<>'draft' order by greatest(r.created_at,coalesce(r.sent_at,r.created_at)) desc,r.id limit 1))) from public.persis_members m where p_member is null or m.id=p_member),'[]'::jsonb),
 'rates',coalesce((select jsonb_agg(to_jsonb(r) order by effective_month) from public.persis_rates r),'[]'::jsonb),
 'payments',coalesce((select jsonb_agg(jsonb_build_object('user_id',d.user_id,'period',d.period,'amount',d.amount,'status',d.status)) from public.persis_dues d where d.status in ('verified','pending') and (p_member is null or exists(select 1 from public.persis_members m where m.id=p_member and m.user_id=d.user_id))),'[]'::jsonb)
 ) into result;return result;
end; $$;
revoke all on function public.persis_reminder_data(uuid) from public,anon;
grant execute on function public.persis_reminder_data(uuid) to authenticated;
