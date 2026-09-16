\set ON_ERROR_STOP on
begin;
create schema if not exists auth;
create table if not exists auth.users(id uuid primary key);
create role anon;
create role authenticated;
create role service_role bypassrls;
grant usage on schema public,auth to service_role;
grant select on auth.users to service_role;
\i docs/ai-control-center/decision-center-schema.sql
insert into auth.users values('10000000-0000-0000-0000-000000000001'),('10000000-0000-0000-0000-000000000002');
set local role service_role;
insert into public.control_center_decisions(id,owner_id,project,title,problem,evidence,source,metric,risk)
values('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','training','Test decision','Problem with sufficient detail','Evidence with sufficient detail','Test source','Target metric','medium');
do $$
declare g uuid; d public.control_center_decisions; n integer;
begin
 begin
  perform public.control_center_reserve_analysis('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000002','test/model');
  raise exception 'TEST_FAIL foreign owner accepted';
 exception when others then
  if sqlerrm <> 'not_found' then raise; end if;
 end;
 g:=public.control_center_reserve_analysis('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','test/model');
 begin
  perform public.control_center_reserve_analysis('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','test/model');
  raise exception 'TEST_FAIL duplicate generation accepted';
 exception when others then
  if sqlerrm <> 'not_ready' then raise; end if;
 end;
 if public.control_center_finish_analysis('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000002',g,'result','{}',null) then raise exception 'foreign owner completed'; end if;
 if not public.control_center_finish_analysis('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001',g,'Evidence-based result','{"totalTokens":10}',null) then raise exception 'completion failed'; end if;
 select * into d from public.control_center_decisions where id='20000000-0000-0000-0000-000000000001';
 if d.status <> 'review' or d.analysis <> 'Evidence-based result' or d.attempts <> 1 then raise exception 'persistence failed'; end if;
 select count(*) into n from public.control_center_decision_generations where id=g and status='completed' and output='Evidence-based result';
 if n <> 1 then raise exception 'generation persistence failed'; end if;
 if has_table_privilege('anon','public.control_center_decisions','SELECT') or has_table_privilege('authenticated','public.control_center_decisions','INSERT') then raise exception 'browser table access allowed'; end if;
 if has_function_privilege('anon','public.control_center_reserve_analysis(uuid,uuid,text)','EXECUTE') or has_function_privilege('authenticated','public.control_center_finish_analysis(uuid,uuid,uuid,text,jsonb,text)','EXECUTE') then raise exception 'browser RPC access allowed'; end if;
 raise notice 'PASS: ownership, duplicate prevention, durable generation, and server-only grants';
end $$;
reset role;
rollback;
