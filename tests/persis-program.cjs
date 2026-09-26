const ts=require('typescript'),fs=require('fs'),assert=require('node:assert/strict');
function load(path,req){const m={exports:{}};new Function('require','module','exports',ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText)(req,m,m.exports);return m.exports;}
const dues=load('lib/persis/dues.ts',require),cash=load('lib/persis/cash.ts',()=>dues),program=load('lib/persis/program.ts',n=>n==='./cash'?cash:dues),exp=load('lib/persis/program-export.ts',n=>n==='./program'?program:n==='./dues'?dues:require(n));
function form(changes={}){const f=new FormData();for(const [k,v]of Object.entries({year:'2026',title:'Program uji',division:'Dakwah',responsible:'Pengurus uji',start_date:'2026-09-01',end_date:'2026-09-26',budget:'100',funding_source:'Infak anggota',target:'Pembinaan kegiatan',status:'planned',progress:'0',report:'',change_reason:'Keputusan rapat',...changes}))f.set(k,v);return f;}
const value=program.programValues(form({spent:'999',updated_by:'forged'}));assert.equal(value.budget,100);assert.equal(value.spent,undefined);assert.equal(value.updated_by,undefined);
for(const invalid of [{year:'2101'},{start_date:'2026-02-30'},{end_date:'2027-01-01'},{end_date:'2026-08-01'},{budget:'1e2'},{budget:'-1'},{budget:'1.5'},{status:'completed',progress:'99'},{status:'toString'},{progress:'101'},{change_reason:''},{target:'x'.repeat(2001)}])assert.throws(()=>program.programValues(form(invalid)));
assert.equal(program.programValues(form({status:'completed',progress:'100'})).progress,100);
assert.throws(()=>program.programLink(form({program_id:'beef0000-0000-4000-8000-000000000001'}),'income'));
assert.equal(program.programLink(form(),'expense'),null);
(async()=>{
 const p={...value,id:'beef0000-0000-4000-8000-000000000001',title:'=HYPERLINK("test")',spent:150,expense_count:1,updated_at:'2026-09-26',report:'Laporan kegiatan '+('rincian '.repeat(200))};
 const report={year:2026,programs:[p],unassigned:[{id:'beef0000-0000-4000-8000-000000000011',transacted_on:'2026-09-26',party:'Pihak uji',description:'Belum tertaut',amount:25}],cash_start_date:'2026-09-01'};
 assert.deepEqual(program.programTotals(report),{budget:100,spent:150,remaining:-50,over:1,completed:0,unassigned:25});
 const xlsx=await exp.programExcel(report),book=new (require('exceljs').Workbook)();await book.xlsx.load(xlsx);const sheet=book.getWorksheet('Anggaran dan realisasi');assert.equal(sheet.getCell('B4').value,-50);assert.equal(sheet.getCell('J10').value,-50);assert.equal(sheet.getCell('A10').type,require('exceljs').ValueType.String);assert.equal(book.getWorksheet('Belum ditautkan').getCell('D2').value,25);
 const pdf=await exp.programPdf({...report,programs:Array.from({length:8},()=>p)});assert.ok((await require('pdf-lib').PDFDocument.load(pdf)).getPageCount()>1);fs.writeFileSync('/tmp/persis-program-test.pdf',pdf);fs.writeFileSync('/tmp/persis-program-test.xlsx',xlsx);
 console.log('PASS: input bounds, year/date consistency, trusted-field isolation, expense-only linking, overspend totals, Excel exact values/string safety, multipage PDF.');
})().catch(e=>{console.error(e);process.exitCode=1;});
