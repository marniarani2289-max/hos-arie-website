-- Execute inside a transaction, then roll back.
select set_config('request.jwt.claims','{"sub":"96b73c18-f698-44aa-9af7-730ab77a64ad","role":"authenticated"}',true);
set local role service_role;
insert into public.persis_members(id,full_name,region,start_month,updated_by) values('cafe0000-0000-4000-8000-000000000001','Pengingat uji','Batam','2026-01-01','96b73c18-f698-44aa-9af7-730ab77a64ad');
insert into public.persis_member_contacts(member_id,phone,verified_at,updated_by) values('cafe0000-0000-4000-8000-000000000001','6280000000000',now(),'96b73c18-f698-44aa-9af7-730ab77a64ad');
insert into public.persis_reminders(id,member_id,status,cutoff,amount,phone,message,snapshot_hash,created_by,updated_by) values('cafe0000-0000-4000-8000-000000000002','cafe0000-0000-4000-8000-000000000001','draft','2026-09-01',100,'6280000000000','Pesan pengingat uji',repeat('a',64),'96b73c18-f698-44aa-9af7-730ab77a64ad','96b73c18-f698-44aa-9af7-730ab77a64ad');
do $$ begin
 begin insert into public.persis_reminders(member_id,status,cutoff,amount,phone,message,snapshot_hash,sent_at,created_by,updated_by) values('cafe0000-0000-4000-8000-000000000001','sent','2026-09-01',100,'6280000000000','Pesan pengingat uji',repeat('a',64),now(),'96b73c18-f698-44aa-9af7-730ab77a64ad','96b73c18-f698-44aa-9af7-730ab77a64ad');raise exception 'AUTO_SENT_ALLOWED';exception when raise_exception then if sqlerrm='AUTO_SENT_ALLOWED' then raise;end if;end;
end $$;
set local role authenticated;
do $$ declare r jsonb;begin
 r:=public.persis_reminder_data('cafe0000-0000-4000-8000-000000000001');
 if jsonb_array_length(r->'members')<>1 or r->'members'->0->'contact'->>'phone'<>'6280000000000' then raise exception 'Treasurer snapshot incorrect';end if;
 if r->'members'->0->'latest'<>'null'::jsonb then raise exception 'Draft incorrectly treated as contact';end if;
 begin update public.persis_member_contacts set phone='6280000000001';raise exception 'CLIENT_WRITE_ALLOWED';exception when insufficient_privilege then null;end;
end $$;
set local role service_role;
update public.persis_reminders set status='sent',sent_at=now(),updated_by='96b73c18-f698-44aa-9af7-730ab77a64ad' where id='cafe0000-0000-4000-8000-000000000002';
do $$ begin
 begin update public.persis_reminders set message='Manipulated message' where id='cafe0000-0000-4000-8000-000000000002';raise exception 'HISTORY_EDIT_ALLOWED';exception when raise_exception then if sqlerrm='HISTORY_EDIT_ALLOWED' then raise;end if;end;
 begin delete from public.persis_reminders where id='cafe0000-0000-4000-8000-000000000002';raise exception 'HISTORY_DELETE_ALLOWED';exception when insufficient_privilege then null;end;
end $$;
insert into public.persis_reminders(member_id,status,cutoff,note,next_followup,created_by,updated_by) values('cafe0000-0000-4000-8000-000000000001','promised','2026-09-01','Janji bayar uji','2026-10-01','96b73c18-f698-44aa-9af7-730ab77a64ad','96b73c18-f698-44aa-9af7-730ab77a64ad');
set local role authenticated;
do $$ declare r jsonb;begin
 r:=public.persis_reminder_data('cafe0000-0000-4000-8000-000000000001');if r->'members'->0->'latest'->>'status'<>'promised' then raise exception 'Latest followup incorrect';end if;
 if not exists(select 1 from public.persis_master_audit where entity='persis_member_contacts' and record_id='cafe0000-0000-4000-8000-000000000001') then raise exception 'Contact audit missing';end if;
end $$;
select set_config('request.jwt.claims','{"sub":"cafe0000-0000-4000-8000-000000000099","role":"authenticated"}',true);
do $$ begin
 if exists(select 1 from public.persis_member_contacts where member_id='cafe0000-0000-4000-8000-000000000001') or exists(select 1 from public.persis_reminders where member_id='cafe0000-0000-4000-8000-000000000001') then raise exception 'Private data exposed';end if;
 begin perform public.persis_reminder_data(null);raise exception 'RPC_EXPOSED';exception when raise_exception then if sqlerrm='RPC_EXPOSED' then raise;end if;end;
end $$;
reset role;
do $$ begin if has_table_privilege('anon','public.persis_reminders','select') or has_function_privilege('anon','public.persis_reminder_data(uuid)','execute') then raise exception 'Anonymous access';end if;end $$;
select 'PASS: treasurer snapshot, private contact/history RLS, anonymous denial, contact audit, draft vs sent distinction, immutable history and latest followup' as result;
