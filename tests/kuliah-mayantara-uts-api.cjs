const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),ts=require('typescript');
function compile(path,imports={}){const code=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const module={exports:{}};vm.runInNewContext(code,{module,exports:module.exports,require:id=>imports[id]||require(id),Request,URL,console,process});return module.exports}
const shared=compile('lib/kuliah/politik-uts.ts');const model=compile('lib/kuliah/mayantara-uts.ts',{'./politik-uts':shared});let current=null,account='student-a',readsFail=false,writes=0;
const db={auth:{getUser:async()=>({data:{user:account?{id:account,email:'test@example.invalid'}:null},error:null})},from(table){
 let op='select',values,filters={};const chain={select(){return chain},eq(k,v){filters[k]=v;return chain},insert(v){op='insert';values=v;return chain},update(v){op='update';values=v;return chain},single(){return result()},maybeSingle(){return result()}};
 async function result(){if(readsFail)return {data:null,error:{message:'db unavailable'}};if(table==='kuliah_politik_staff')return {data:null,error:null};assert.equal(table,'kuliah_mayantara_uts','Mayantara must use its dedicated table');if(op==='select')return {data:current,error:null};if(op==='update'&&filters.revision!==current.revision)return {data:null,error:null};writes++;current={...current,...values,user_id:account,id:'receipt',revision:(current?.revision||0)+1,updated_at:'2026-11-02T06:00:00Z',submitted_at:values.status==='submitted'?'2026-11-02T06:00:00Z':null};return {data:current,error:null}}return chain;
}};
const route=compile('app/api/kuliah/mayantara-uts/route.ts',{'@/lib/supabase/server':{createClient:async()=>db},'@/lib/kuliah/mayantara-uts':model});
const body={expectedUserId:'student-a',revision:0,intent:'save',display_name:'Name',student_number:'001',class_name:'A',answers:['','','','',''],attested:false};
const request=(value=body,origin='https://www.hossibarani.com')=>new Request('https://www.hossibarani.com/api/kuliah/mayantara-uts',{method:'POST',headers:{origin,'content-type':'application/json'},body:JSON.stringify(value)});
(async()=>{
 account=null;assert.equal((await route.GET()).status,401);assert.equal((await route.POST(request())).status,401);account='student-a';
 assert.equal((await route.POST(request(body,'https://other.example'))).status,403);
 assert.equal((await route.POST(request({...body,expectedUserId:'other'}))).status,409);
 assert.equal((await route.POST(request({...body,intent:'submit'}))).status,400);
 assert.equal((await route.POST(request({...body,answers:['one']}))).status,400);
 assert.equal((await route.POST(request({...body,answers:['a'.repeat(50001),'','','','']}))).status,400);
 assert.equal((await route.POST(request())).status,200);assert.equal(current.revision,1);assert.equal(current.status,'draft');
 assert.equal((await route.POST(request())).status,409);
 const final={...body,revision:1,intent:'submit',attested:true,answers:['1','2','3','4','5']};
 let response=await route.POST(request(final));assert.equal(response.status,200);assert.equal((await response.json()).record.status,'submitted');
 response=await route.POST(request(final));assert.equal((await response.json()).alreadySubmitted,true);assert.equal(writes,2);
 readsFail=true;assert.equal((await route.GET()).status,503);
 console.log('PASS: unauthenticated rejection, same-origin guard, account binding, input constraints, draft save, stale revision, final save, duplicate retry, database failure.');
})().catch(e=>{console.error(e);process.exitCode=1});
