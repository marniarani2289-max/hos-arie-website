begin;
-- Synthetic identities only; the whole transaction is rolled back.
insert into auth.users(id,email) values ('f72b89a1-a566-47a4-a314-a19d767fd001','notary-test-a@example.invalid'),('f72b89a1-a566-47a4-a314-a19d767fd002','notary-test-b@example.invalid');
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"f72b89a1-a566-47a4-a314-a19d767fd001","role":"authenticated","is_anonymous":false}',true);
insert into public.lexnusa_notary_offices(id,owner_id,name) values('f72b89a1-a566-47a4-a314-a19d767fe001',auth.uid(),'Synthetic office A');
insert into public.lexnusa_notary_records(id,office_id,kind,title) values('f72b89a1-a566-47a4-a314-a19d767ff001','f72b89a1-a566-47a4-a314-a19d767fe001','client','Synthetic client A');
update public.lexnusa_notary_records set title='Edited synthetic client' where id='f72b89a1-a566-47a4-a314-a19d767ff001' and version=1;
do $$ begin
 if (select version from public.lexnusa_notary_records where id='f72b89a1-a566-47a4-a314-a19d767ff001')<>2 then raise exception 'version check failed';end if;
 if (select count(*) from public.lexnusa_notary_audit)<>2 then raise exception 'audit check failed';end if;
 begin update public.lexnusa_notary_audit set action='tampered'; raise exception 'audit was writable'; exception when insufficient_privilege then null;end;
end $$;
select set_config('request.jwt.claims','{"sub":"f72b89a1-a566-47a4-a314-a19d767fd002","role":"authenticated","is_anonymous":false}',true);
insert into public.lexnusa_notary_offices(id,owner_id,name) values('f72b89a1-a566-47a4-a314-a19d767fe002',auth.uid(),'Synthetic office B');
do $$ declare n int;begin
 if exists(select 1 from public.lexnusa_notary_records) then raise exception 'Cross-office records leaked';end if;
 if exists(select 1 from public.lexnusa_notary_audit) then raise exception 'Cross-office audit leaked';end if;
 update public.lexnusa_notary_records set title='Cross office overwrite' where id='f72b89a1-a566-47a4-a314-a19d767ff001';get diagnostics n=row_count;if n<>0 then raise exception 'Cross-office update succeeded';end if;
 begin insert into public.lexnusa_notary_records(office_id,kind,title) values('f72b89a1-a566-47a4-a314-a19d767fe001','client','Unauthorized');raise exception 'Cross-office insert succeeded';exception when insufficient_privilege then null; when raise_exception then if sqlerrm<>'Not authorized' then raise;end if;end;
 begin insert into public.lexnusa_notary_records(office_id,kind,title,parent_id) values('f72b89a1-a566-47a4-a314-a19d767fe002','matter','Cross office parent','f72b89a1-a566-47a4-a314-a19d767ff001');raise exception 'Cross-office parent succeeded';exception when raise_exception then if sqlerrm<>'Invalid parent' then raise;end if;end;
end $$;
reset role;
set local role anon;
do $$ begin begin perform * from public.lexnusa_notary_records;raise exception 'Anonymous read succeeded';exception when insufficient_privilege then null;end;end $$;
reset role;
select 'PASS: owner CRUD, version increment, append-only audit, cross-office read/write/link isolation and anonymous denial' as result;
rollback;
