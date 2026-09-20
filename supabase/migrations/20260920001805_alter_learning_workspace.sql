-- Additive ALTER workspace. Learners may only read/write their own workspace.
create table public.alter_workspaces (
  user_id uuid primary key references auth.users(id) on delete cascade,
  content jsonb not null default '{}'::jsonb check (jsonb_typeof(content) = 'object' and octet_length(content::text) <= 500000),
  updated_at timestamptz not null default now()
);
alter table public.alter_workspaces enable row level security;
revoke all on public.alter_workspaces from anon, authenticated;
grant select, insert, update, delete on public.alter_workspaces to authenticated;
grant all on public.alter_workspaces to service_role;
create policy alter_workspace_read on public.alter_workspaces for select to authenticated using ((select auth.uid()) = user_id);
create policy alter_workspace_insert on public.alter_workspaces for insert to authenticated with check ((select auth.uid()) = user_id);
create policy alter_workspace_update on public.alter_workspaces for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy alter_workspace_delete on public.alter_workspaces for delete to authenticated using ((select auth.uid()) = user_id);

create table public.alter_generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('advisor','librarian','tutor','editor','roommate')),
  model text not null,
  question text not null check (char_length(question) between 1 and 4000),
  input jsonb not null,
  output text,
  status text not null default 'pending' check (status in ('pending','completed','failed')),
  usage jsonb,
  created_at timestamptz not null default now()
);
create index alter_generations_user_time on public.alter_generations(user_id, created_at desc);
alter table public.alter_generations enable row level security;
revoke all on public.alter_generations from anon, authenticated;
grant select on public.alter_generations to authenticated;
grant all on public.alter_generations to service_role;
create policy alter_generation_read on public.alter_generations for select to authenticated using ((select auth.uid()) = user_id);

-- Invoker privileges: only the server's service_role can reserve paid requests.
-- Transaction lock makes quota checks safe across concurrent serverless instances.
create function public.alter_reserve_generation(p_user uuid, p_role text, p_model text, p_question text, p_input jsonb)
returns uuid language plpgsql security invoker set search_path = '' as $$
declare result_id uuid;
begin
  perform pg_advisory_xact_lock(hashtextextended('alter:' || p_user::text, 0));
  if (select count(*) from public.alter_generations where user_id=p_user and created_at > now() - interval '24 hours') >= 20
    or exists(select 1 from public.alter_generations where user_id=p_user and (created_at > now() - interval '1 minute' or (status='pending' and created_at > now() - interval '2 minutes')))
  then raise exception 'alter_limit'; end if;
  insert into public.alter_generations(user_id,role,model,question,input)
    values(p_user,p_role,p_model,p_question,p_input) returning id into result_id;
  return result_id;
end;
$$;
revoke all on function public.alter_reserve_generation(uuid,text,text,text,jsonb) from public, anon, authenticated;
grant execute on function public.alter_reserve_generation(uuid,text,text,text,jsonb) to service_role;
