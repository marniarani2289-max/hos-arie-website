'use server';
import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import {requireTreasurer} from '@/lib/persis/master-server';
import {PROGRAM_BASE,programValues,programYear} from '@/lib/persis/program';
import {UUID,CASH_BASE} from '@/lib/persis/cash';
export async function saveProgram(form:FormData){
 const {service,user}=await requireTreasurer(PROGRAM_BASE),givenId=String(form.get('id')||''),id=givenId||String(form.get('new_id')||''),back=givenId&&UUID.test(givenId)?`${PROGRAM_BASE}/${givenId}`:PROGRAM_BASE;
 if(!UUID.test(id))redirect(`${PROGRAM_BASE}?error=Program+tidak+valid.`);
 let values:ReturnType<typeof programValues>;
 try{values=programValues(form);}catch(e){redirect(`${back}?error=${encodeURIComponent(e instanceof Error?e.message:'Periksa isian.')}`);}
 let failed=false;
 if(givenId){const {data,error}=await service.from('persis_programs').update({...values,updated_by:user.id}).eq('id',id).eq('updated_at',String(form.get('version')||'')).select('id');failed=!!error||!data?.length;}
 else{const {error}=await service.from('persis_programs').insert({...values,id,updated_by:user.id});failed=!!error;}
 if(failed)redirect(`${back}?error=Program+belum+tersimpan.+Muat+ulang+untuk+memeriksa+perubahan+terbaru.`);
 revalidatePath(PROGRAM_BASE,'layout');revalidatePath(CASH_BASE);redirect(`${PROGRAM_BASE}/${id}?success=program`);
}
export async function assignProgram(form:FormData){
 const {service,user}=await requireTreasurer(PROGRAM_BASE),entryId=String(form.get('entry_id')||''),programId=String(form.get('program_id')||''),expected=String(form.get('expected')||''),reason=String(form.get('reason')||'').trim(),returnId=String(form.get('return_id')||''),year=programYear(String(form.get('year')||''));
 const back=UUID.test(returnId)?`${PROGRAM_BASE}/${returnId}`:`${PROGRAM_BASE}?year=${year}`,sep=back.includes('?')?'&':'?';
 if(!UUID.test(entryId)||(programId&&!UUID.test(programId))||(expected&&!UUID.test(expected))||reason.length<3||reason.length>500)redirect(`${back}${sep}error=Periksa+pilihan+program+dan+alasan+penautan.`);
 const {error}=await service.rpc('persis_assign_program',{p_entry_id:entryId,p_program_id:programId||null,p_actor:user.id,p_reason:reason,p_expected:expected||null});
 if(error)redirect(`${back}${sep}error=Penautan+belum+tersimpan.+Pastikan+tahun+sama,+transaksi+aktif,+dan+program+tidak+dibatalkan.+Muat+ulang+jika+data+berubah.`);
 revalidatePath(PROGRAM_BASE,'layout');revalidatePath(CASH_BASE);redirect(`${back}${sep}success=linked`);
}
