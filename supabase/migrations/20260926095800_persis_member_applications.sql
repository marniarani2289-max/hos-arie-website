create table public.persis_member_applications (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id),
 email text not null check(email=lower(trim(email)) and char_length(email)<=254),
 full_name text not null check(char_length(trim(full_name)) between 2 and 120),
 member_number text not null default '' check(char_length(member_number)<=60),
 region text not null check(region in ('Batam','Tanjungpinang','Bintan','Karimun','Lingga','Natuna','Kepulauan Anambas','Lainnya')),
 note text not null default '' check(char_length(note)<=500),
 status text not null default 'pending' check(status in ('pending','approved','rejected')),
 review_note text not null default '' check(char_length(review_note)<=500),
 reviewed_by uuid references auth.users(id),
 reviewed_at timestamptz,
 member_id uuid references public.persis_members(id),
 created_at timestamptz not null default now(),
 check ((status='pending' and reviewed_by is null and reviewed_at is null and member_id is null and review_note='') or
 (status='approved' and reviewed_by is not null and reviewed_at is not null and member_id is not null) or
 (status='rejected' and reviewed_by is not null and reviewed_at is not null and member_id is null and char_length(trim(review_note))>=3))
);
create unique index persis_application_active on public.persis_member_applications(user_id) where status in ('pending','approved');
create index persis_application_history on public.persis_member_applications(user_id,created_at desc);
create index persis_application_queue on public.persis_member_applications(status,created_at);
create index persis_application_reviewer on public.persis_member_applications(reviewed_by);
create index persis_application_member on public.persis_member_applications(member_id);
alter table public.persis_member_applications enable row level security;
revoke all on public.persis_member_applications from anon,authenticated;
grant select on public.persis_member_applications to authenticated;
grant all on public.persis_member_applications to service_role;
create policy persis_application_read on public.persis_member_applications for select to authenticated using
 (user_id=(select auth.uid()) or exists(select 1 from public.persis_treasurers where user_id=(select auth.uid())));

-- Service-only, invoker RPC: server verifies the current treasurer before calling.
-- A single transaction locks the request, creates/links the master and records the decision.
create function public.persis_review_application(p_id uuid,p_reviewer uuid,p_decision text,p_start_month date default null,p_note text default '')
returns uuid language plpgsql security invoker set search_path='' as $$
declare a public.persis_member_applications; m public.persis_members; result_id uuid;
begin
 if not exists(select 1 from public.persis_treasurers where user_id=p_reviewer) then raise exception 'Treasurer required'; end if;
 if p_decision not in ('approved','rejected') or p_decision is null or char_length(coalesce(p_note,''))>500 then raise exception 'Invalid decision'; end if;
 select * into a from public.persis_member_applications where id=p_id for update;
 if not found or a.status<>'pending' then raise exception 'Application is not pending'; end if;
 if p_decision='rejected' then
  if char_length(trim(coalesce(p_note,'')))<3 then raise exception 'Correction note required'; end if;
  update public.persis_member_applications set status='rejected',review_note=trim(p_note),reviewed_by=p_reviewer,reviewed_at=now() where id=p_id;
  return null;
 end if;
 if p_start_month is not null and (extract(day from p_start_month)<>1 or p_start_month not between date '2020-01-01' and date '2100-12-01') then raise exception 'Invalid liability month'; end if;
 select * into m from public.persis_members where user_id=a.user_id or email=a.email order by created_at limit 1 for update;
 if found then
  if m.user_id is not null and m.user_id<>a.user_id then raise exception 'Email linked to another member'; end if;
  update public.persis_members set user_id=a.user_id,start_month=coalesce(start_month,p_start_month),updated_by=p_reviewer where id=m.id;
  result_id=m.id;
 else
  insert into public.persis_members(user_id,full_name,email,member_number,region,start_month,updated_by)
  values(a.user_id,a.full_name,a.email,a.member_number,a.region,p_start_month,p_reviewer) returning id into result_id;
 end if;
 update public.persis_member_applications set status='approved',review_note=coalesce(trim(p_note),''),reviewed_by=p_reviewer,reviewed_at=now(),member_id=result_id where id=p_id;
 return result_id;
end; $$;
revoke all on function public.persis_review_application(uuid,uuid,text,date,text) from public,anon,authenticated;
grant execute on function public.persis_review_application(uuid,uuid,text,date,text) to service_role;
