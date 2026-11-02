/* Online UTS transport. The classroom retains a local backup; server responses
   alone establish saved drafts and final receipts. No public database key here. */
const utsOnline={loaded:false,loading:false,user:null,record:null,revision:0,busy:false,dirty:false,message:'Memeriksa akun dan draf online…',candidate:null,conflict:null};
const UTS_API='/api/kuliah/politik-uts';
async function utsFetch(options){const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);try{return await fetch(UTS_API,{...options,signal:controller.signal})}finally{clearTimeout(timer)}}
function utsOnScreen(){return typeof course!=='undefined'&&course==='pol'&&idx===7&&tab===0&&$('uts-online-status')}
function utsServerTime(value){return new Date(value).toLocaleString('id-ID',{timeZone:'Asia/Jakarta'})+' WIB'}
function utsDraftFromRecord(r){
  const d={'uts-name':r.display_name,'uts-nim':r.student_number,'uts-class':r.class_name,updatedAt:r.updated_at};
  for(let i=0;i<5;i++)d['uts-answer-'+(i+1)]=r.answers[i];
  return d;
}
function utsOnlineApply(r){
  utsOnline.record=r;utsOnline.revision=r?r.revision:0;utsOnline.dirty=false;
  utsDraft=r?utsDraftFromRecord(r):{};
  if(utsOnScreen()){
    for(const id of UTS_FIELDS){$(id).value=utsDraft[id]||'';$(id).setCustomValidity('');}
    $('uts-attested').checked=!!r?.attested;utsProgress();
    $('uts-save-status').textContent=r?'Versi dari server dimuat.':'Belum ada draf online. Isi jawaban, lalu pilih Simpan draf online.';
  }
}
function utsOnlinePaint(){
  if(!utsOnScreen())return;
  const final=utsOnline.record?.status==='submitted';
  const disabled=!utsOnline.loaded||!utsOnline.user||utsOnline.busy||final;
  for(const id of [...UTS_FIELDS,'uts-attested','uts-send','uts-save-online'])$(id).disabled=disabled;
  $('uts-clear').disabled=utsOnline.busy||final;if(final)$('uts-attested').checked=true;
  $('uts-online-status').textContent=utsOnline.message;
  $('uts-account').textContent=utsOnline.user?'Masuk sebagai '+utsOnline.user.email:'Masuk ke akun mahasiswa untuk menyimpan dan mengirim jawaban online.';
  $('uts-auth-links').classList.toggle('hidden',!!utsOnline.user);
  $('uts-restore-local').classList.toggle('hidden',!utsOnline.candidate||final||!utsOnline.user);
  $('uts-load-server').classList.toggle('hidden',!utsOnline.conflict);
  $('uts-refresh-online').disabled=utsOnline.loading||utsOnline.busy;
  $('uts-send').textContent=utsOnline.busy?'Memproses…':final?'Jawaban sudah terkirim':'Kirim jawaban final';
  $('uts-receipt').textContent=final?'TERKIRIM KE DOSEN · Nomor bukti: '+utsOnline.record.id+' · '+utsServerTime(utsOnline.record.submitted_at):'Belum dikumpulkan. Simpan draf online menyimpan pekerjaan; Kirim jawaban final menyerahkannya kepada dosen.';
  $('uts-receipt').className=final?'feedback':'notice';
}
async function utsOnlineLoad(){
  if(utsOnline.loading||utsOnline.busy)return;
  if(!/^https?:$/.test(location.protocol)){utsOnline.loaded=true;utsOnline.message='Pengumpulan online tersedia di https://www.hossibarani.com/kuliah/modul.html?course=pol&meeting=8';utsOnlinePaint();return}
  utsOnline.loading=true;utsOnline.loaded=false;utsOnline.message='Memuat akun dan jawaban dari server…';utsOnlinePaint();
  try{
    const response=await utsFetch({credentials:'same-origin',cache:'no-store'});
    const data=await response.json();
    if(response.status===401){utsOnline.user=null;utsOnline.message='Silakan masuk atau daftar akun mahasiswa. Draf lama di perangkat tidak akan dikirim otomatis.';return}
    if(!response.ok)throw Error(data.error||'Server belum dapat diakses.');
    const sameAccount=utsOnline.user?.id===data.user.id;
    const previousDraft=utsDraft;
    utsOnline.user=data.user;UTS_STORAGE_KEY='ruang-hukum-uts-pol-v1:'+data.user.id;
    let local={};try{const stored=JSON.parse(localStorage.getItem(UTS_STORAGE_KEY)||'{}');if(stored&&typeof stored==='object'&&!Array.isArray(stored))local=stored;}catch{}
    if(sameAccount&&utsOnline.dirty){utsOnline.conflict=data.record;utsOnline.message='Versi server diperiksa. Jawaban di layar tetap dipertahankan; pilih Muat versi server jika ingin menggantinya.';}
    else{
      utsOnline.candidate=UTS_FIELDS.some(id=>typeof local[id]==='string'&&local[id].trim())?local:(!sameAccount&&UTS_FIELDS.some(id=>typeof previousDraft[id]==='string'&&previousDraft[id].trim())?previousDraft:null);
      utsOnlineApply(data.record);
      utsOnline.message=data.record?.status==='submitted'?'Jawaban final telah diterima dan dapat dilihat dosen.':data.record?'Draf online dimuat · '+utsServerTime(data.record.updated_at):'Akun siap. Isi identitas dan jawaban; simpan draf online selama mengerjakan.';
    }
  }catch(e){utsOnline.message='Belum dapat memuat data online. '+e.message;utsOnline.user=null;}
  finally{utsOnline.loading=false;utsOnline.loaded=true;utsOnlinePaint()}
}
function utsOnlineEdited(){
  utsOnline.dirty=true;
  if(utsOnline.user)utsOnline.message='Ada perubahan yang belum disimpan online. Pilih Simpan draf online atau Kirim jawaban final.';
  utsOnlinePaint();
}
async function utsOnlineSend(intent){
  if(utsOnline.busy||!utsOnline.loaded||!utsOnline.user||utsOnline.record?.status==='submitted')return;
  utsCollect();
  if(intent==='submit'&&(!utsValidate()||!$('uts-attested').reportValidity()))return;
  const body={expectedUserId:utsOnline.user.id,revision:utsOnline.revision,intent,
    display_name:utsDraft['uts-name']||'',student_number:utsDraft['uts-nim']||'',class_name:utsDraft['uts-class']||'',
    answers:[1,2,3,4,5].map(i=>utsDraft['uts-answer-'+i]||''),attested:intent==='submit'&&$('uts-attested').checked};
  utsOnline.busy=true;utsOnline.message=intent==='submit'?'Mengirim jawaban final ke dosen…':'Menyimpan draf ke server…';utsOnlinePaint();
  try{
    const response=await utsFetch({method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    const data=await response.json();
    if(response.status===401){utsOnline.user=null;throw Error(data.error)}
    if(response.status===409){utsOnline.conflict=data.record||null;throw Error(data.error)}
    if(!response.ok||!data.record)throw Error(data.error||'Server belum mengonfirmasi penyimpanan.');
    utsOnlineApply(data.record);utsOnline.conflict=null;utsOnline.candidate=null;
    try{localStorage.setItem(UTS_STORAGE_KEY,JSON.stringify(utsDraft))}catch{}
    utsOnline.message=data.record.status==='submitted'
      ?data.alreadySubmitted?'Server sudah menerima jawaban final sebelumnya. Versi final dari server ditampilkan; pengiriman ulang tidak membuat kiriman ganda.':'Jawaban berhasil dikirim. Dosen dapat membacanya melalui dasbor.'
      :'Draf berhasil disimpan online · '+utsServerTime(data.record.updated_at)+'. Belum dikumpulkan.';
  }catch(e){utsOnline.message='Penyimpanan/pengiriman belum terkonfirmasi. '+e.message+' Jangan hapus draf. Coba lagi atau periksa status server.'}
  finally{utsOnline.busy=false;utsOnlinePaint()}
}
function utsOnlineBind(){
  $('uts-form').onsubmit=e=>{e.preventDefault();void utsOnlineSend('submit')};
  $('uts-save-online').onclick=()=>void utsOnlineSend('save');
  $('uts-refresh-online').onclick=()=>void utsOnlineLoad();
  $('uts-download').onclick=()=>{if(!utsValidate())return;download(utsText(),utsFilename(),'text/plain;charset=utf-8');$('uts-action-status').textContent='Cadangan jawaban diunduh. Status pengumpulan tetap mengikuti bukti dari server.'};
  $('uts-restore-local').onclick=()=>{
    if(!utsOnline.candidate||utsOnline.record?.status==='submitted')return;
    for(const id of UTS_FIELDS){const v=utsOnline.candidate[id];utsDraft[id]=typeof v==='string'?v:'';$(id).value=utsDraft[id];}
    utsOnline.candidate=null;utsProgress();utsPersist();utsOnlineEdited();
  };
  $('uts-load-server').onclick=()=>{if(!utsOnline.conflict)return;utsOnlineApply(utsOnline.conflict);utsOnline.conflict=null;utsOnline.message='Versi terbaru dari server dimuat.';utsOnlinePaint()};
  utsOnlinePaint();if(!utsOnline.loaded&&!utsOnline.loading)void utsOnlineLoad();
}
