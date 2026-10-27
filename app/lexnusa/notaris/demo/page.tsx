import NotaryWorkspace from '../NotaryWorkspace';
import type { RecordItem } from '@/lib/lexnusa/notaris/model';
export const dynamic='force-dynamic';
export const metadata={title:'Demo Interaktif | LexNusa Notaris',robots:{index:false,follow:false}};
export default function DemoPage(){
 const date=(n:number)=>{const d=new Date();d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
 const id=(n:number)=>'00000000-0000-4000-8000-'+String(n).padStart(12,'0');
 const now=new Date().toISOString();
 const raw:[number,RecordItem['kind'],string,number|null,RecordItem['data']][]=[
 [1,'client','PT Cakrawala Contoh',null,{category:'Badan usaha',email:'kantor@example.com',phone:'',address:'Alamat contoh, Tanjungpinang',notes:'Data fiktif untuk demonstrasi.'}],
 [2,'client','Ibu Nadia (contoh)',null,{category:'Perorangan',email:'nadia@example.com',notes:'Data fiktif untuk demonstrasi.'}],
 [3,'client','CV Bahari Contoh',null,{category:'Badan usaha',email:'bahari@example.com',notes:'Data fiktif untuk demonstrasi.'}],
 [4,'matter','Pendirian perseroan — Cakrawala',1,{service:'Pendirian badan usaha',status:'Pemeriksaan',due:date(3),assignee:'Staf kantor (contoh)',identity_checked:true,authority_checked:true,support_checked:false,draft_checked:false,notes:'Lengkapi data pengurus dan dokumen pendukung.'}],
 [5,'matter','Perjanjian kerja sama — Bahari',3,{service:'Perjanjian',status:'Penyusunan draf',due:date(-1),assignee:'Pengelola (contoh)',identity_checked:true,authority_checked:true,support_checked:true,draft_checked:false,notes:'Draf menunggu telaah notaris.'}],
 [6,'matter','Legalisasi dokumen — Nadia',2,{service:'Legalisasi',status:'Penjadwalan',due:date(2),assignee:'Pengelola (contoh)',identity_checked:true,authority_checked:true,support_checked:true,draft_checked:true,notes:'Konfirmasi jadwal pertemuan.'}],
 [7,'appointment','Pertemuan penelaahan draf',5,{date:date(1),time:'09:30',location:'Ruang pertemuan kantor',notes:'Agenda contoh.'}],
 [8,'appointment','Jadwal tanda tangan',6,{date:date(2),time:'14:00',location:'Kantor notaris',notes:'Agenda contoh.'}],
 [9,'invoice','INV-CONTOH-001 · Cakrawala',4,{amount:4500000,paid:1500000,due:date(7),notes:'Nominal fiktif, bukan tarif layanan LexNusa atau tarif notaris.'}],
 [10,'invoice','INV-CONTOH-002 · Bahari',5,{amount:2500000,paid:1000000,due:date(5),notes:'Nominal fiktif untuk demonstrasi.'}],
 [11,'document','Catatan penerimaan berkas',4,{content:'DRAF CATATAN KERJA — DATA CONTOH\n\nPeriksa kelengkapan dokumen pendukung dan konfirmasi data pengurus.\n\nCatatan ini bukan akta dan belum merupakan hasil pemeriksaan hukum.',notes:'Contoh dokumen kerja.'}],
 ];
 const records:RecordItem[]=raw.map(([n,kind,title,parent,data])=>({id:id(n),office_id:id(99),kind,title,parent_id:parent?id(parent):null,data,version:1,archived:false,created_at:now,updated_at:now}));
 return <NotaryWorkspace demo office={{id:id(99),name:'Kantor Notaris Contoh'}} records={records} audit={[{id:1,action:'Dibuat',record_title:'Data demonstrasi kantor',created_at:now}]}/>;
}
