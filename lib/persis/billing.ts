export type Member={id:string;user_id:string|null;full_name:string;email:string|null;member_number:string;region:string;start_month:string|null;end_month:string|null;note:string;updated_at:string};
export type Rate={id:string;effective_month:string;amount:number;due_day:number;reference:string};
export type Payment={user_id:string;period:string;amount:number;status:string};
export type Bill={month:string;status:string;expected:number|null;paid:number;pending:number;remaining:number;arrears:number;surplus:number;due:string|null};
export function memberBills(member:Member,rates:Rate[],payments:Payment[],year:number,today:string):Bill[]{
 const sorted=[...rates].sort((a,b)=>b.effective_month.localeCompare(a.effective_month));
 return Array.from({length:12},(_,i)=>{
  const month=`${year}-${String(i+1).padStart(2,'0')}-01`;
  const rows=member.user_id?payments.filter(p=>p.user_id===member.user_id&&p.period===month):[];
  const paid=rows.filter(p=>p.status==='verified').reduce((s,p)=>s+Number(p.amount),0),pending=rows.filter(p=>p.status==='pending').reduce((s,p)=>s+Number(p.amount),0);
  const empty={month,paid,pending,expected:null,remaining:0,arrears:0,surplus:0,due:null};
  if(!member.start_month)return {...empty,status:'Mulai wajib belum ditetapkan'};
  if(month<member.start_month || (member.end_month&&month>member.end_month))return {...empty,status:'Di luar masa wajib'};
  if(month.slice(0,7)>today.slice(0,7))return {...empty,status:'Bulan mendatang'};
  const rate=sorted.find(r=>r.effective_month<=month);
  if(!rate)return {...empty,status:'Tarif belum ditetapkan'};
  const expected=Number(rate.amount),remaining=Math.max(0,expected-paid),surplus=Math.max(0,paid-expected),due=month.slice(0,8)+String(rate.due_day).padStart(2,'0');
  const arrears=today>due?remaining:0;
  const status=remaining===0?(surplus?'Lunas · lebih bayar':'Lunas'):pending>0?'Menunggu verifikasi':paid>0?'Kurang bayar':today>due?'Belum dibayar':'Belum jatuh tempo';
  return {month,status,expected,paid,pending,remaining,arrears,surplus,due};
 });
}
export function totals(bills:Bill[]){return bills.reduce((s,b)=>({expected:s.expected+(b.expected??0),paid:s.paid+b.paid,pending:s.pending+b.pending,arrears:s.arrears+b.arrears,unknown:s.unknown+(b.status==='Tarif belum ditetapkan'||b.status==='Mulai wajib belum ditetapkan'?1:0)}),{expected:0,paid:0,pending:0,arrears:0,unknown:0});}
