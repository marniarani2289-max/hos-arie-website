-- Run inside a transaction, then roll back. Test data is never retained.
select set_config('request.jwt.claims','{"sub":"96b73c18-f698-44aa-9af7-730ab77a64ad","role":"authenticated"}',true);
insert into storage.objects(bucket_id,name) values
('persis-cash-receipts','96b73c18-f698-44aa-9af7-730ab77a64ad/beef0000-0000-4000-8000-000000000011.pdf'),
('persis-cash-receipts','96b73c18-f698-44aa-9af7-730ab77a64ad/beef0000-0000-4000-8000-000000000012.pdf'),
('persis-cash-receipts','96b73c18-f698-44aa-9af7-730ab77a64ad/beef0000-0000-4000-8000-000000000013.pdf'),
('persis-program-documents','96b73c18-f698-44aa-9af7-730ab77a64ad/beef0000-0000-4000-8000-000000000021.pdf');
set local role service_role;
insert into public.persis_cash_settings(start_date,opening_balance,note,updated_by) select '2026-01-01',0,'Saldo uji','96b73c18-f698-44aa-9af7-730ab77a64ad' where not exists(select 1 from public.persis_cash_settings);
insert into public.persis_programs(id,year,title,division,responsible,start_date,end_date,budget,funding_source,target,change_reason,updated_by) values
('beef0000-0000-4000-8000-000000000001',2026,'Program uji A','Dakwah','Penanggung uji','2026-01-01','2026-12-31',100,'Infak anggota','Target kegiatan','Penetapan uji','96b73c18-f698-44aa-9af7-730ab77a64ad'),
('beef0000-0000-4000-8000-000000000002',2026,'Program uji B','Dakwah','Penanggung uji','2026-01-01','2026-12-31',200,'Infak anggota','Target kegiatan','Penetapan uji','96b73c18-f698-44aa-9af7-730ab77a64ad'),
('beef0000-0000-4000-8000-000000000003',2027,'Program uji 2027','Dakwah','Penanggung uji','2027-01-01','2027-12-31',200,'Infak anggota','Target kegiatan','Penetapan uji','96b73c18-f698-44aa-9af7-730ab77a64ad');
select public.persis_create_cash_with_program('{"id":"beef0000-0000-4000-8000-000000000011","transacted_on":"2026-09-26","kind":"expense","category":"Dakwah","amount":150,"party":"Penerima uji","description":"Belanja uji","method":"tunai","receipt_path":"96b73c18-f698-44aa-9af7-730ab77a64ad/beef0000-0000-4000-8000-000000000011.pdf"}', 'beef0000-0000-4000-8000-000000000001','96b73c18-f698-44aa-9af7-730ab77a64ad');
select public.persis_create_cash_with_program('{"id":"beef0000-0000-4000-8000-000000000012","transacted_on":"2026-09-26","kind":"expense","category":"Dakwah","amount":50,"party":"Penerima uji","description":"Belanja uji","method":"tunai","receipt_path":"96b73c18-f698-44aa-9af7-730ab77a64ad/beef0000-0000-4000-8000-000000000012.pdf"}',null,'96b73c18-f698-44aa-9af7-730ab77a64ad');
do $$ begin
 begin perform public.persis_create_cash_with_program('{"id":"beef0000-0000-4000-8000-000000000013","transacted_on":"2026-09-26","kind":"expense","category":"Dakwah","amount":30,"party":"Penerima uji","description":"Belanja uji","method":"tunai","receipt_path":"96b73c18-f698-44aa-9af7-730ab77a64ad/beef0000-0000-4000-8000-000000000013.pdf"}','beef0000-0000-4000-8000-000000000003','96b73c18-f698-44aa-9af7-730ab77a64ad');raise exception 'CROSS_YEAR_ALLOWED';exception when raise_exception then if sqlerrm='CROSS_YEAR_ALLOWED' then raise;end if;end;
 if exists(select 1 from public.persis_cash_entries where id='beef0000-0000-4000-8000-000000000013') then raise exception 'Cash create not atomic';end if;
 begin perform public.persis_create_cash_with_program('{"id":"beef0000-0000-4000-8000-000000000013","transacted_on":"2026-09-26","kind":"income","category":"Donasi","amount":30,"party":"Penerima uji","description":"Dana uji","method":"tunai","receipt_path":"96b73c18-f698-44aa-9af7-730ab77a64ad/beef0000-0000-4000-8000-000000000013.pdf"}','beef0000-0000-4000-8000-000000000001','96b73c18-f698-44aa-9af7-730ab77a64ad');raise exception 'INCOME_ALLOWED';exception when raise_exception then if sqlerrm='INCOME_ALLOWED' then raise;end if;end;
end $$;
insert into public.persis_program_documents(id,program_id,file_path,file_name,caption,created_by) values('beef0000-0000-4000-8000-000000000021','beef0000-0000-4000-8000-000000000001','96b73c18-f698-44aa-9af7-730ab77a64ad/beef0000-0000-4000-8000-000000000021.pdf','uji.pdf','Laporan uji','96b73c18-f698-44aa-9af7-730ab77a64ad');
set local role authenticated;
do $$ declare r jsonb;p jsonb;begin
 r:=public.persis_program_report(2026);select v into p from jsonb_array_elements(r->'programs') v where v->>'id'='beef0000-0000-4000-8000-000000000001';
 if (p->>'spent')::numeric<>150 or (p->>'budget')::numeric<>100 or (p->>'expense_count')::int<>1 then raise exception 'Overspend total incorrect';end if;
 if not exists(select 1 from jsonb_array_elements(r->'unassigned') v where v->>'id'='beef0000-0000-4000-8000-000000000012') then raise exception 'Unassigned missing';end if;
 begin update public.persis_programs set budget=1;raise exception 'CLIENT_WRITE_ALLOWED';exception when insufficient_privilege then null;end;
 begin perform public.persis_assign_program('beef0000-0000-4000-8000-000000000012',null,'96b73c18-f698-44aa-9af7-730ab77a64ad','Forge',null);raise exception 'CLIENT_RPC_ALLOWED';exception when insufficient_privilege then null;end;
end $$;
set local role service_role;
select public.persis_assign_program('beef0000-0000-4000-8000-000000000012','beef0000-0000-4000-8000-000000000001','96b73c18-f698-44aa-9af7-730ab77a64ad','Tautan uji',null);
select public.persis_assign_program('beef0000-0000-4000-8000-000000000011','beef0000-0000-4000-8000-000000000002','96b73c18-f698-44aa-9af7-730ab77a64ad','Pindah tautan','beef0000-0000-4000-8000-000000000001');
do $$ begin
 begin perform public.persis_assign_program('beef0000-0000-4000-8000-000000000011',null,'96b73c18-f698-44aa-9af7-730ab77a64ad','Stale write','beef0000-0000-4000-8000-000000000001');raise exception 'STALE_ALLOWED';exception when raise_exception then if sqlerrm='STALE_ALLOWED' then raise;end if;end;
 begin update public.persis_programs set year=2027,start_date='2027-01-01',end_date='2027-12-31' where id='beef0000-0000-4000-8000-000000000001';raise exception 'YEAR_EDIT_ALLOWED';exception when raise_exception then if sqlerrm='YEAR_EDIT_ALLOWED' then raise;end if;end;
end $$;
update public.persis_cash_entries set voided_by='96b73c18-f698-44aa-9af7-730ab77a64ad',voided_at=now(),void_reason='Pembatalan uji' where id='beef0000-0000-4000-8000-000000000011';
update public.persis_programs set budget=80,report='Laporan hasil uji',progress=50,change_reason='Revisi uji',updated_by='96b73c18-f698-44aa-9af7-730ab77a64ad' where id='beef0000-0000-4000-8000-000000000001';
set local role authenticated;
do $$ declare r jsonb;p jsonb;begin
 r:=public.persis_program_report(2026);select v into p from jsonb_array_elements(r->'programs') v where v->>'id'='beef0000-0000-4000-8000-000000000001';if (p->>'spent')::numeric<>50 or (p->>'budget')::numeric<>80 then raise exception 'Reassignment/revision incorrect';end if;
 select v into p from jsonb_array_elements(r->'programs') v where v->>'id'='beef0000-0000-4000-8000-000000000002';if (p->>'spent')::numeric<>0 then raise exception 'Void still counted';end if;
 if (select count(*) from public.persis_program_audit where entity='persis_programs' and entity_id='beef0000-0000-4000-8000-000000000001')<>2 then raise exception 'Revision audit missing';end if;
end $$;
set local role service_role;
update public.persis_programs set status='cancelled',change_reason='Batal uji',updated_by='96b73c18-f698-44aa-9af7-730ab77a64ad' where id='beef0000-0000-4000-8000-000000000001';
do $$ begin
 begin perform public.persis_assign_program('beef0000-0000-4000-8000-000000000012','beef0000-0000-4000-8000-000000000001','96b73c18-f698-44aa-9af7-730ab77a64ad','Tautan batal','beef0000-0000-4000-8000-000000000001');raise exception 'CANCELLED_ALLOWED';exception when raise_exception then if sqlerrm='CANCELLED_ALLOWED' then raise;end if;end;
end $$;
select public.persis_assign_program('beef0000-0000-4000-8000-000000000012',null,'96b73c18-f698-44aa-9af7-730ab77a64ad','Lepas tautan','beef0000-0000-4000-8000-000000000001');
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"2adc2df2-9534-44da-b23b-ae98e3678dd1","role":"authenticated"}',true);
do $$ begin
 if exists(select 1 from public.persis_programs) or exists(select 1 from public.persis_program_documents) or exists(select 1 from public.persis_program_allocations) or exists(select 1 from public.persis_program_audit) or exists(select 1 from storage.objects where bucket_id='persis-program-documents') then raise exception 'Program privacy failure';end if;
 begin perform public.persis_program_report(2026);raise exception 'REPORT_EXPOSED';exception when raise_exception then if sqlerrm='REPORT_EXPOSED' then raise;end if;end;
end $$;
reset role;
select 'PASS: atomic cash/program creation, year and expense restrictions, overspend totals, reassignment, stale-write rejection, void exclusion, audited budget revision, document privacy and RLS' as result;
