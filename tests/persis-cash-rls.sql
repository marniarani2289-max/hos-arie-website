-- Run inside a transaction and always roll back. Uses existing verified test identities.
select set_config('request.jwt.claims','{"sub":"96b73c18-f698-44aa-9af7-730ab77a64ad","role":"authenticated"}',true);
insert into storage.objects(bucket_id,name) values
('persis-cash-receipts','96b73c18-f698-44aa-9af7-730ab77a64ad/ca510000-0000-4000-8000-000000000001.pdf'),
('persis-cash-receipts','96b73c18-f698-44aa-9af7-730ab77a64ad/ca510000-0000-4000-8000-000000000002.pdf');
set local role service_role;
insert into public.persis_cash_settings(start_date,opening_balance,note,updated_by) values('2026-08-01',1000,'Saldo pengujian','96b73c18-f698-44aa-9af7-730ab77a64ad');
insert into public.persis_cash_entries(id,transacted_on,kind,category,amount,party,description,method,receipt_path,created_by) values
('ca510000-0000-4000-8000-000000000001','2026-08-15','income','Donasi',100,'Pemberi uji','Donasi uji','tunai','96b73c18-f698-44aa-9af7-730ab77a64ad/ca510000-0000-4000-8000-000000000001.pdf','96b73c18-f698-44aa-9af7-730ab77a64ad'),
('ca510000-0000-4000-8000-000000000002','2026-09-15','expense','Dakwah',30,'Penerima uji','Kegiatan uji','tunai','96b73c18-f698-44aa-9af7-730ab77a64ad/ca510000-0000-4000-8000-000000000002.pdf','96b73c18-f698-44aa-9af7-730ab77a64ad');
reset role;
insert into public.persis_dues(id,user_id,member_name,region,period,amount,paid_on,method,receipt_path,status,reviewed_by,reviewed_at) values
('ca510000-0000-4000-8000-000000000011','96b73c18-f698-44aa-9af7-730ab77a64ad','Cash test','Batam','2026-07-01',100,'2026-07-15','tunai','cash-test-july','verified','96b73c18-f698-44aa-9af7-730ab77a64ad',now()),
('ca510000-0000-4000-8000-000000000012','96b73c18-f698-44aa-9af7-730ab77a64ad','Cash test','Batam','2026-08-01',50,'2026-08-15','tunai','cash-test-aug','verified','96b73c18-f698-44aa-9af7-730ab77a64ad',now()),
('ca510000-0000-4000-8000-000000000013','96b73c18-f698-44aa-9af7-730ab77a64ad','Cash test','Batam','2026-08-01',70,'2026-09-15','tunai','cash-test-sept','verified','96b73c18-f698-44aa-9af7-730ab77a64ad',now());
insert into public.persis_dues(id,user_id,member_name,region,period,amount,paid_on,method,receipt_path) values('ca510000-0000-4000-8000-000000000014','96b73c18-f698-44aa-9af7-730ab77a64ad','Cash test','Batam','2026-10-01',90,'2026-09-15','tunai','cash-test-pending');
set local role authenticated;
do $$ declare r jsonb; begin
 r:=public.persis_cash_report('2026-09-01');
 if (r->>'opening')::numeric<>1150 or (r->>'income')::numeric<>70 or (r->>'expense')::numeric<>30 or jsonb_array_length(r->'rows')<>2 then raise exception 'Totals incorrect: %',r; end if;
 if (r->'rows'->1->>'balance')::numeric<>1190 then raise exception 'Running balance incorrect'; end if;
 begin insert into public.persis_cash_settings(start_date,opening_balance,note,updated_by) values('2026-01-01',0,'Forgery','96b73c18-f698-44aa-9af7-730ab77a64ad');raise exception 'Unexpected write access';exception when insufficient_privilege then null;end;
end $$;
set local role service_role;
do $$ begin
 begin update public.persis_cash_entries set amount=999 where id='ca510000-0000-4000-8000-000000000002';raise exception 'EDIT_ALLOWED';exception when raise_exception then if sqlerrm='EDIT_ALLOWED' then raise;end if;end;
 begin update public.persis_cash_settings set start_date='2026-09-01';raise exception 'DATE_EDIT_ALLOWED';exception when raise_exception then if sqlerrm='DATE_EDIT_ALLOWED' then raise;end if;end;
 begin delete from public.persis_cash_entries where id='ca510000-0000-4000-8000-000000000002';raise exception 'DELETE_ALLOWED';exception when insufficient_privilege then null;when raise_exception then if sqlerrm='DELETE_ALLOWED' then raise;end if;end;
end $$;
update public.persis_cash_entries set voided_by='96b73c18-f698-44aa-9af7-730ab77a64ad',voided_at=now(),void_reason='Salah catat uji' where id='ca510000-0000-4000-8000-000000000002';
update public.persis_cash_settings set opening_balance=1200,note='Koreksi saldo uji',updated_by='96b73c18-f698-44aa-9af7-730ab77a64ad';
set local role authenticated;
do $$ declare r jsonb; begin
 r:=public.persis_cash_report('2026-09-01');
 if (r->>'opening')::numeric<>1350 or (r->>'income')::numeric<>70 or (r->>'expense')::numeric<>0 or jsonb_array_length(r->'voided')<>1 then raise exception 'Void/correction incorrect'; end if;
 if (select count(*) from public.persis_cash_audit)<>5 then raise exception 'Audit missing';end if;
end $$;
select set_config('request.jwt.claims','{"sub":"2adc2df2-9534-44da-b23b-ae98e3678dd1","role":"authenticated"}',true);
do $$ begin
 if exists(select 1 from public.persis_cash_settings) or exists(select 1 from public.persis_cash_entries) or exists(select 1 from public.persis_cash_audit) or exists(select 1 from storage.objects where bucket_id='persis-cash-receipts') then raise exception 'Private records exposed';end if;
 begin perform public.persis_cash_report('2026-09-01');raise exception 'REPORT_EXPOSED';exception when raise_exception then if sqlerrm='REPORT_EXPOSED' then raise;end if;end;
end $$;
reset role;
select 'PASS: cash totals, payment-date basis, rollover, void, audit, immutable fields, member RLS and private receipts' as result;
