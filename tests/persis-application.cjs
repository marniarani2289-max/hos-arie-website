const ts=require('typescript'),fs=require('fs'),assert=require('node:assert/strict');
function load(path,req){const m={exports:{}};new Function('require','module','exports',ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(req,m,m.exports);return m.exports;}
const dues=load('lib/persis/dues.ts',require),{applicationValues}=load('lib/persis/application.ts',()=>dues);
function form(changes={}){const f=new FormData();for(const [k,v]of Object.entries({full_name:'Anggota Uji',region:'Batam',member_number:'',note:'',declaration:'yes',...changes}))f.set(k,v);return f;}
const values=applicationValues(form({user_id:'forged',email:'other@example.invalid',status:'approved',start_month:'2020-01'}));
assert.deepEqual(Object.keys(values).sort(),['full_name','member_number','note','region']);
for(const invalid of [{full_name:''},{full_name:'a'},{region:'invalid'},{declaration:''},{note:'a'.repeat(501)}])assert.throws(()=>applicationValues(form(invalid)));
console.log('PASS: valid member data, required declaration, input bounds, identity/approval/liability fields ignored.');
