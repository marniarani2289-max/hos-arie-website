const {JSDOM}=require('jsdom');const fs=require('fs');const assert=require('node:assert/strict');
const html=fs.readFileSync('public/kuliah/modul.html','utf8');
const source=fs.readFileSync('public/kuliah/uts-online.js','utf8')+'\n'+html.match(/<script>([\s\S]*?)<\/script>/)[1];
const user={id:'student-a',email:'student-a@example.invalid'};
const state={record:null,fail:false,anonymous:false,conflict:false};
const reply=(data,status=200)=>({ok:status>=200&&status<300,status,json:async()=>data});
let writes=0;
async function transport(_url,options){
 assert.equal(_url,'/api/kuliah/mayantara-uts');
 if(state.anonymous)return reply({error:'Masuk'},401);
 if(!options.method)return reply({user,record:state.record,isLecturer:false});
 const b=JSON.parse(options.body);
 if(state.record?.status==='submitted')return reply({record:state.record,alreadySubmitted:true});
 if(state.conflict)return reply({error:'Conflict',record:{...state.record,revision:9,answers:['New server','2','3','4','5']}},409);
 state.record={...b,user_id:user.id,id:'receipt-1',revision:(state.record?.revision||0)+1,status:b.intent==='submit'?'submitted':'draft',updated_at:'2026-11-02T06:00:00Z',submitted_at:b.intent==='submit'?'2026-11-02T06:00:00Z':null};
 writes++;if(state.fail)throw Error('network lost');return reply({record:state.record});
}
async function boot(){const dom=new JSDOM(html.replace(/<script[\s\S]*?<\/script>/g,''),{url:'https://www.hossibarani.com/kuliah/modul.html?course=may&meeting=8',runScripts:'outside-only'});dom.window.localStorage.setItem('ruang-hukum-uts-pol-v1',JSON.stringify({'uts-name':'Politics draft'}));dom.window.fetch=transport;dom.window.eval(source);await tick();return dom}
async function tick(){for(let i=0;i<4;i++)await new Promise(r=>setTimeout(r,0))}
function input(d,id,value){const el=d.window.document.getElementById(id);el.value=value;el.dispatchEvent(new d.window.Event('input',{bubbles:true}))}
function $(d,id){return d.window.document.getElementById(id)}
(async()=>{
 let d=await boot();assert.equal($(d,'uts-name').value,'');assert.match($(d,'uts-soal-1').textContent,/Kejahatan Mayantara/);assert.match($(d,'uts-soal-5').textContent,/Korporasi/);assert.equal($(d,'uts-send').disabled,false);
 input(d,'uts-name','Student A');input(d,'uts-nim','001');input(d,'uts-class','A');for(let i=1;i<=5;i++)input(d,'uts-answer-'+i,'Answer '+i);
 $(d,'uts-save-online').click();await tick();assert.equal(state.record.status,'draft');assert.match($(d,'uts-online-status').textContent,/berhasil disimpan online/);assert.equal(writes,1);assert.ok(d.window.localStorage.getItem('ruang-hukum-uts-may-v1:'+user.id));assert.equal(JSON.parse(d.window.localStorage.getItem('ruang-hukum-uts-pol-v1'))['uts-name'],'Politics draft');
 const otherDevice=await boot();assert.equal($(otherDevice,'uts-answer-5').value,'Answer 5');otherDevice.window.close();
 state.conflict=true;input(d,'uts-answer-1','Local conflict');$(d,'uts-save-online').click();await tick();assert.equal($(d,'uts-answer-1').value,'Local conflict');assert.equal($(d,'uts-load-server').classList.contains('hidden'),false);$(d,'uts-load-server').click();assert.equal($(d,'uts-answer-1').value,'New server');state.conflict=false;
 $(d,'uts-attested').checked=true;state.fail=true;
 $(d,'uts-form').dispatchEvent(new d.window.Event('submit',{bubbles:true,cancelable:true}));await tick();assert.match($(d,'uts-online-status').textContent,/belum terkonfirmasi/);assert.doesNotMatch($(d,'uts-receipt').textContent,/TERKIRIM/);
 state.fail=false;$(d,'uts-form').dispatchEvent(new d.window.Event('submit',{bubbles:true,cancelable:true}));await tick();assert.match($(d,'uts-receipt').textContent,/receipt-1/);assert.match($(d,'uts-receipt').textContent,/TERKIRIM KE DOSEN/);assert.equal($(d,'uts-answer-1').disabled,true);assert.equal(writes,2,'lost-response retry must not create duplicate submission');
 d.window.close();state.anonymous=true;d=await boot();assert.equal($(d,'uts-send').disabled,true);assert.equal($(d,'uts-auth-links').classList.contains('hidden'),false);d.window.close();
 console.log('PASS: online draft, cross-device restore, conflict preservation, lost-response retry, no false receipt, final lock, anonymous login requirement.');
})().catch(e=>{console.error(e);process.exitCode=1});
