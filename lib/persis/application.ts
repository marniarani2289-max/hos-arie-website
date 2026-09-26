import {REGIONS} from './dues';
export const APPLICATION_STATUS={pending:'Menunggu persetujuan',approved:'Disetujui',rejected:'Perlu diperbaiki'} as const;
export function applicationValues(form:FormData){
 const text=(key:string)=>String(form.get(key)||'').trim();
 const full_name=text('full_name'),member_number=text('member_number'),region=text('region'),note=text('note');
 if(full_name.length<2||full_name.length>120)throw new Error('Nama harus diisi, antara 2 dan 120 karakter.');
 if(member_number.length>60)throw new Error('Nomor anggota maksimal 60 karakter.');
 if(!REGIONS.some(r=>r===region))throw new Error('Pilih daerah anggota.');
 if(note.length>500)throw new Error('Catatan maksimal 500 karakter.');
 if(form.get('declaration')!=='yes')throw new Error('Konfirmasikan kebenaran data sebelum mengirim.');
 return {full_name,member_number,region,note};
}
