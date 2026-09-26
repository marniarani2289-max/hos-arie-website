const ts=require('typescript'),fs=require('fs'),assert=require('node:assert/strict');
function load(path,req){const m={exports:{}};new Function('require','module','exports',ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText)(req,m,m.exports);return m.exports;}
const dues=load('lib/persis/dues.ts',require),cash=load('lib/persis/cash.ts',()=>dues),exp=load('lib/persis/cash-export.ts',name=>name==='./dues'?dues:name==='./cash'?cash:require(name));
function form(changes={}){const f=new FormData();for(const [k,v]of Object.entries({id:'ad23f1d2-7aa1-4a39-a801-fff012345678',kind:'income',category:'Donasi',transacted_on:'2026-09-26',amount:'10000',party:'Pemberi Uji',activity:'',description:'Donasi kegiatan',method:'tunai',...changes}))f.set(k,v);return f;}
const valid=cash.cashValues(form({created_by:'forged',voided_by:'forged',status:'verified'}),'2026-09-26');
assert.equal(valid.amount,10000);assert.equal(valid.created_by,undefined);assert.equal(valid.voided_by,undefined);
for(const changes of [{kind:'opening'},{category:'Iuran anggota'},{category:'Dakwah'},{amount:'1.1'},{amount:'1e3'},{amount:'-10'},{amount:'10000000001'},{transacted_on:'2026-09-27'},{transacted_on:'2026-02-30'},{method:'toString'},{id:'bad'},{description:''}])assert.throws(()=>cash.cashValues(form(changes),'2026-09-26'));
assert.throws(()=>cash.openingValues(form({start_date:'2026-01-01',opening_balance:'-1',note:'Saldo uji'}),'2026-09-26'));
assert.equal(cash.openingValues(form({start_date:'2026-01-01',opening_balance:'0',note:'Saldo nol'}),'2026-09-26').opening_balance,0);
(async()=>{
 const row={id:valid.id,source:'manual',transacted_on:'2026-09-26',kind:'income',category:'Donasi',amount:10000,party:'=HYPERLINK("bad")',activity:'Kegiatan',description:'Bukti penerimaan é — 😀 '+('Uraian panjang '.repeat(30)),method:'tunai',balance:110000};
 const report={month:'2026-09',settings:{start_date:'2026-01-01',opening_balance:100000,note:'Saldo uji'},opening:100000,income:10000,expense:0,closing:110000,rows:[row],voided:[{...row,void_reason:'Salah input',voided_at:'2026-09-26T10:00:00Z'}]};
 const bytes=await exp.cashExcel(report),book=new (require('exceljs').Workbook)();await book.xlsx.load(bytes);
 assert.equal(book.getWorksheet('Buku kas').getCell('B7').value,110000);
 assert.equal(book.getWorksheet('Buku kas').getCell('C11').type,require('exceljs').ValueType.String);
 assert.equal(book.getWorksheet('Buku kas').getCell('J11').value,110000);
 assert.equal(book.getWorksheet('Pembatalan').getCell('G3').value,'Salah input');
 const pdf=await exp.cashPdf({...report,rows:Array.from({length:30},()=>row)});const parsed=await require('pdf-lib').PDFDocument.load(pdf);assert.ok(parsed.getPageCount()>1);
 fs.writeFileSync('/tmp/persis-cash-report-test.pdf',pdf);fs.writeFileSync('/tmp/persis-cash-report-test.xlsx',bytes);
 console.log('PASS: validation, identity isolation, real XLSX totals/string safety, PDF wrapping and pagination.');
})().catch(e=>{console.error(e);process.exitCode=1;});
