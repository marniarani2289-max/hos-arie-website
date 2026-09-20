begin;
create temporary table alter_test_ids as select gen_random_uuid() as a, gen_random_uuid() as b;
grant select on alter_test_ids to authenticated, service_role;
insert into auth.users(id,email,raw_user_meta_data) select a,a::text || '@alter-test.invalid','{"full_name":"ALTER isolated test"}'::jsonb from alter_test_ids union all select b,b::text || '@alter-test.invalid','{"full_name":"ALTER isolated test"}'::jsonb from alter_test_ids;
insert into public.alter_workspaces(user_id,content) select a,'{"goal":"A"}'::jsonb from alter_test_ids union all select b,'{"goal":"B"}'::jsonb from alter_test_ids;
insert into public.alter_generations(user_id,role,model,question,input,status) select b,'tutor','test','test','{}','completed' from alter_test_ids;
select set_config('request.jwt.claim.sub',(select a::text from alter_test_ids),true);
set local role authenticated;
do $$
begin
  if (select count(*) from public.alter_workspaces) <> 1 then raise exception 'cross-user workspace leak'; end if;
  if (select count(*) from public.alter_generations) <> 0 then raise exception 'cross-user generation leak'; end if;
  update public.alter_workspaces set content='{"goal":"Own update"}' where user_id=(select a from alter_test_ids);
  if not found then raise exception 'own update denied'; end if;
  update public.alter_workspaces set content='{}' where user_id=(select b from alter_test_ids);
  if found then raise exception 'cross-user update allowed'; end if;
  delete from public.alter_workspaces where user_id=(select b from alter_test_ids);
  if found then raise exception 'cross-user delete allowed'; end if;
  begin
    update public.alter_workspaces set user_id=(select b from alter_test_ids) where user_id=(select a from alter_test_ids);
    raise exception 'owner reassignment allowed';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.alter_generations(user_id,role,model,question,input) select a,'tutor','test','test','{}' from alter_test_ids;
    raise exception 'client generation write allowed';
  exception when insufficient_privilege then null; end;
  begin
    perform public.alter_reserve_generation((select a from alter_test_ids),'tutor','test','test','{}');
    raise exception 'client paid generation allowed';
  exception when insufficient_privilege then null; end;
  delete from public.alter_workspaces where user_id=(select a from alter_test_ids);
  insert into public.alter_workspaces(user_id,content) select a,'{}' from alter_test_ids;
end $$;
reset role;
set local role anon;
do $$ begin
  begin perform 1 from public.alter_workspaces; raise exception 'anon workspace access'; exception when insufficient_privilege then null; end;
  begin perform 1 from public.alter_generations; raise exception 'anon history access'; exception when insufficient_privilege then null; end;
end $$;
reset role;
set local role service_role;
select public.alter_reserve_generation((select a from alter_test_ids),'tutor','test','test','{}');
do $$ begin
  begin
    perform public.alter_reserve_generation((select a from alter_test_ids),'tutor','test','test','{}');
    raise exception 'quota not enforced';
  exception when raise_exception then if sqlerrm <> 'alter_limit' then raise; end if; end;
end $$;
reset role;
rollback;
select 'ALTER RLS, ownership, server-only generation and quota checks passed; test data rolled back' as result;
