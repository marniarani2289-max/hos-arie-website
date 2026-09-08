-- Separate academic classroom; no workshop records or certificates are changed.
create table public.lexnusa_mayantara_staff (
 user_id uuid primary key references auth.users(id)
);
insert into public.lexnusa_mayantara_staff(user_id) select user_id from public.lexnusa_admins;
create table public.lexnusa_mayantara_members (
 user_id uuid primary key references auth.users(id),
 display_name text not null check(length(trim(display_name)) between 2 and 120),
 student_number text not null check(length(trim(student_number)) between 2 and 50),
 status text not null default 'pending' check(status in ('pending','active','suspended')),
 created_at timestamptz not null default now()
);
create table public.lexnusa_mayantara_work (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.lexnusa_mayantara_members(user_id),
 assignment text not null check(assignment in ('issue-map','privacy-memo','evidence-file','final-opinion')),
 answer text not null default '' check(length(answer)<=30000),
 sources text not null default '' check(length(sources)<=12000),
 reflection text not null default '' check(length(reflection)<=8000),
 submitted boolean not null default false,
 attested boolean not null default false,
 parent_id uuid,
 version_number integer not null,
 created_at timestamptz not null default now(),
 unique(id,user_id,assignment),
 unique(user_id,assignment,version_number),
 foreign key(parent_id,user_id,assignment) references public.lexnusa_mayantara_work(id,user_id,assignment),
 check(not submitted or (attested and length(trim(answer))>=200 and length(trim(sources))>=40 and length(trim(reflection))>=40))
);
create table public.lexnusa_mayantara_reviews (
 id uuid primary key default gen_random_uuid(),
 work_id uuid not null unique,
 student_id uuid not null,
 assignment text not null,
 reviewer_id uuid not null references public.lexnusa_mayantara_staff(user_id),
 issue_score integer not null check(issue_score between 0 and 20),
 source_score integer not null check(source_score between 0 and 25),
 reasoning_score integer not null check(reasoning_score between 0 and 25),
 remedy_score integer not null check(remedy_score between 0 and 15),
 integrity_score integer not null check(integrity_score between 0 and 15),
 score integer generated always as (issue_score+source_score+reasoning_score+remedy_score+integrity_score) stored,
 decision text not null check(decision in ('reviewed','revise')),
 feedback text not null check(length(trim(feedback)) between 40 and 10000),
 created_at timestamptz not null default now(),
 foreign key(work_id,student_id,assignment) references public.lexnusa_mayantara_work(id,user_id,assignment),
 check(student_id<>reviewer_id)
);
create index on public.lexnusa_mayantara_work(user_id,assignment,created_at desc);
create index on public.lexnusa_mayantara_reviews(student_id);
alter table public.lexnusa_mayantara_staff enable row level security;
alter table public.lexnusa_mayantara_members enable row level security;
alter table public.lexnusa_mayantara_work enable row level security;
alter table public.lexnusa_mayantara_reviews enable row level security;
revoke all on public.lexnusa_mayantara_staff,public.lexnusa_mayantara_members,public.lexnusa_mayantara_work,public.lexnusa_mayantara_reviews from anon,authenticated;
grant select on public.lexnusa_mayantara_staff to authenticated;
grant select,insert on public.lexnusa_mayantara_members,public.lexnusa_mayantara_work,public.lexnusa_mayantara_reviews to authenticated;
grant update(status) on public.lexnusa_mayantara_members to authenticated;
grant all on public.lexnusa_mayantara_staff,public.lexnusa_mayantara_members,public.lexnusa_mayantara_work,public.lexnusa_mayantara_reviews to service_role;
create policy own_staff on public.lexnusa_mayantara_staff for select to authenticated using(user_id=(select auth.uid()));
create policy read_member on public.lexnusa_mayantara_members for select to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.lexnusa_mayantara_staff where user_id=(select auth.uid())));
create policy request_seat on public.lexnusa_mayantara_members for insert to authenticated with check(user_id=(select auth.uid()) and status='pending');
create policy admit_student on public.lexnusa_mayantara_members for update to authenticated using(exists(select 1 from public.lexnusa_mayantara_staff where user_id=(select auth.uid()))) with check(exists(select 1 from public.lexnusa_mayantara_staff where user_id=(select auth.uid())));
create policy read_work on public.lexnusa_mayantara_work for select to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.lexnusa_mayantara_staff where user_id=(select auth.uid())));
create policy write_work on public.lexnusa_mayantara_work for insert to authenticated with check(user_id=(select auth.uid()) and exists(select 1 from public.lexnusa_mayantara_members where user_id=(select auth.uid()) and status='active'));
create policy read_review on public.lexnusa_mayantara_reviews for select to authenticated using(student_id=(select auth.uid()) or exists(select 1 from public.lexnusa_mayantara_staff where user_id=(select auth.uid())));
create policy write_review on public.lexnusa_mayantara_reviews for insert to authenticated with check(reviewer_id=(select auth.uid()) and exists(select 1 from public.lexnusa_mayantara_staff where user_id=(select auth.uid())));
create function lexnusa_private.mayantara_work_guard() returns trigger language plpgsql security invoker set search_path='' as $$
declare previous uuid; n integer;
begin
 if new.user_id is distinct from auth.uid() then raise exception 'owner_required'; end if;
 perform pg_advisory_xact_lock(hashtextextended('mayantara:'||new.user_id::text||':'||new.assignment,181));
 select id,version_number into previous,n from public.lexnusa_mayantara_work where user_id=new.user_id and assignment=new.assignment order by version_number desc limit 1;
 if new.parent_id is distinct from previous then raise exception 'stale_version'; end if;
 new.version_number:=coalesce(n,0)+1; new.created_at:=now(); return new;
end $$;
create trigger mayantara_version before insert on public.lexnusa_mayantara_work for each row execute function lexnusa_private.mayantara_work_guard();
create function lexnusa_private.mayantara_review_guard() returns trigger language plpgsql security invoker set search_path='' as $$
declare latest uuid; ready boolean;
begin
 perform pg_advisory_xact_lock(hashtextextended('mayantara:'||new.student_id::text||':'||new.assignment,181));
 select id,submitted into latest,ready from public.lexnusa_mayantara_work where user_id=new.student_id and assignment=new.assignment order by version_number desc limit 1;
 if latest is distinct from new.work_id or not coalesce(ready,false) then raise exception 'latest_submission_required'; end if;
 new.created_at:=now(); return new;
end $$;
create trigger mayantara_review before insert on public.lexnusa_mayantara_reviews for each row execute function lexnusa_private.mayantara_review_guard();
revoke all on function lexnusa_private.mayantara_work_guard(),lexnusa_private.mayantara_review_guard() from public;
