const {test}=require('node:test');const assert=require('node:assert/strict');const ts=require('typescript');const fs=require('fs');const Module=require('module');
const m=new Module('notaris');m._compile(ts.transpileModule(fs.readFileSync('lib/lexnusa/notaris/model.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,'notaris.js');const {validateRecord,csvCell,brief}=m.exports;
test('rejects invalid invoice balances and fractions',()=>{for(const data of [{amount:0,paid:0},{amount:10,paid:11},{amount:-1,paid:0},{amount:10.5,paid:0},{amount:'NaN',paid:0}])assert.throws(()=>validateRecord({kind:'invoice',title:'Invoice',data}));assert.equal(validateRecord({kind:'invoice',title:'Invoice',data:{amount:'5000',paid:'2000'}}).data.paid,2000)});
test('rejects invalid dates, statuses, parents and missing appointments',()=>{for(const input of [{kind:'matter',title:'a',data:{status:'fake'}},{kind:'invoice',title:'a',data:{amount:1,due:'2026-02-30'}},{kind:'appointment',title:'a',data:{date:'2026-10-27',time:'25:00'}},{kind:'client',title:'a',parent_id:'abc',data:{}}])assert.throws(()=>validateRecord(input))});
test('strips untrusted file paths and office ownership',()=>{const v=validateRecord({kind:'document',title:'  Draf  ',office_id:'other',data:{content:'test',file_path:'other/private.pdf'}});assert.equal(v.title,'Draf');assert.equal(v.data.file_path,undefined);assert.equal(v.office_id,undefined)});
test('neutralizes spreadsheet formula injection and escapes quotes',()=>{for(const s of ['=SUM(A1)',' +2','@test','-cmd','\t=1'])assert.ok(csvCell(s).startsWith('\"\''));assert.equal(csvCell('a\"b'),'\"a\"\"b\"')});
test('brief remains an administrative draft with source data',()=>{const text=brief({title:'Test case',data:{service:'Perjanjian',notes:'Catatan pengelola'}});assert.match(text,/BUKAN AKTA/);assert.match(text,/Catatan pengelola/);assert.match(text,/Belum ditautkan/)});

const submission={kind:'submission',title:'Persiapan',parent_id:'00000000-0000-4000-8000-000000000004',data:{provider:'AHU',portal_service:'Perseroan terbatas',portal_status:'Draf persiapan'}};
test('portal draft requires valid matter, provider and service, and forces manual source',()=>{
 assert.equal(validateRecord({...submission,data:{...submission.data,source:'api'}}).data.source,'manual');
 for(const input of [{...submission,parent_id:null},{...submission,data:{...submission.data,provider:'FAKE'}},{...submission,data:{...submission.data,provider:'ATR-BPN'}},{...submission,data:{...submission.data,portal_status:'Disetujui API'}}])assert.throws(()=>validateRecord(input));
});
test('submitted portal record requires reference and observed dates; result requires evidence',()=>{
 const data={...submission.data,portal_status:'Diajukan di portal',reference:'CONTOH-1',submitted_on:'2025-01-01',checked_on:'2025-01-02'};
 assert.equal(validateRecord({...submission,data}).data.reference,'CONTOH-1');
 for(const change of [{reference:''},{checked_on:''},{submitted_on:''},{checked_on:'2024-12-31'},{checked_on:'2999-01-01'},{portal_status:'Hasil diterima'},{evidence_id:'bad'}])assert.throws(()=>validateRecord({...submission,data:{...data,...change}}));
 assert.equal(validateRecord({...submission,data:{...data,portal_status:'Hasil diterima',evidence_id:'00000000-0000-4000-8000-000000000011'}}).data.portal_status,'Hasil diterima');
});
test('portal packet makes manual provenance and no official import explicit',()=>{
 const packet=m.exports.portalPacket(submission,{title:'Pendirian',data:{assignee:'Petugas'}});
 assert.match(packet,/Bukan format impor resmi/);assert.match(packet,/tidak dikirim otomatis/);assert.match(packet,/manual/);
});
