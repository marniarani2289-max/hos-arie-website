import {jakartaDate} from './dues';
export const CASH_BASE='/persis-kepri/iuran/bendahara/kas';
export const CASH_BUCKET='persis-cash-receipts';
export const CATEGORIES={income:['Infak','Donasi','Bantuan','Pemasukan lainnya'],expense:['Dakwah','Pendidikan','Sosial','Operasional','Kegiatan organisasi','Pengeluaran lainnya']} as const;
export const METHODS={transfer:'Transfer',tunai:'Tunai',lainnya:'Lainnya'} as const;
export const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export type CashSettings={start_date:string;opening_balance:number;note:string;updated_at:string};
export type CashRow={id:string;source:'manual'|'dues';transacted_on:string;kind:'income'|'expense';category:string;amount:number;party:string;activity:string;description:string;method:keyof typeof METHODS;balance:number};
export type Voided=CashRow&{void_reason:string;voided_at:string};
export type CashReport={month:string;settings:CashSettings|null;opening:number;income:number;expense:number;closing:number;rows:CashRow[];voided:Voided[]};
export function cashMonth(value?:string){return /^(20[2-9]\d|2100)-(0[1-9]|1[0-2])$/.test(value||'')?value!:jakartaDate().slice(0,7);}
export function validCashDate(value:string,today=jakartaDate()){
 const d=new Date(`${value}T00:00:00Z`);
 return /^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===value&&value>='2020-01-01'&&value<=today;
}
export function cashValues(form:FormData,today=jakartaDate()){
 const text=(k:string)=>String(form.get(k)||'').trim();
 const id=text('id'),kind=text('kind'),category=text('category'),transacted_on=text('transacted_on'),raw=text('amount'),amount=Number(raw),party=text('party'),activity=text('activity'),description=text('description'),method=text('method');
 if(!UUID.test(id))throw new Error('Muat ulang formulir sebelum menyimpan.');
 if(kind!=='income'&&kind!=='expense')throw new Error('Pilih jenis transaksi.');
 if(!(CATEGORIES[kind] as readonly string[]).includes(category))throw new Error('Pilih kategori yang sesuai. Iuran masuk otomatis melalui verifikasi.');
 if(!validCashDate(transacted_on,today))throw new Error('Tanggal transaksi tidak valid atau masih di masa depan.');
 if(!/^\d+$/.test(raw)||!Number.isSafeInteger(amount)||amount<1||amount>10000000000)throw new Error('Nominal harus rupiah utuh, antara 1 dan 10.000.000.000.');
 if(party.length<2||party.length>160||activity.length>160||description.length<3||description.length>500)throw new Error('Isi pemberi/penerima dan uraian; periksa panjang teks.');
 if(!Object.prototype.hasOwnProperty.call(METHODS,method))throw new Error('Pilih metode transaksi.');
 return {id,kind,category,transacted_on,amount,party,activity,description,method};
}
export function openingValues(form:FormData,today=jakartaDate()){
 const start_date=String(form.get('start_date')||''),raw=String(form.get('opening_balance')||''),opening_balance=Number(raw),note=String(form.get('note')||'').trim();
 if(!validCashDate(start_date,today))throw new Error('Tanggal mulai buku kas tidak valid.');
 if(!/^\d+$/.test(raw)||!Number.isSafeInteger(opening_balance)||opening_balance<0||opening_balance>100000000000)throw new Error('Saldo awal harus rupiah utuh antara 0 dan 100.000.000.000.');
 if(note.length<3||note.length>500)throw new Error('Isi dasar saldo awal atau alasan koreksi (3–500 karakter).');
 return {start_date,opening_balance,note};
}
