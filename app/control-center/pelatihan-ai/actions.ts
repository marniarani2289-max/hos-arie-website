'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireControlCenterAccess } from '@/lib/ai-control-center/access';
import { trainingService } from '@/lib/training-assistant/server';
import { statuses, isClosed, validDate } from '@/lib/training-assistant/model';
export async function updateLead(form: FormData) {
 const user=await requireControlCenterAccess();
 const id=String(form.get('id')||''), version=Number(form.get('version')), status=String(form.get('status')||''), date=String(form.get('follow_up_on')||'');
 let result='saved';
 try {
  if(!/^[0-9a-f-]{36}$/i.test(id)||!Number.isInteger(version)||version<1||!statuses.some(x=>x===status)||(!isClosed(status)&&!validDate(date))) throw new Error('invalid');
  const {data,error}=await trainingService().from('training_interest_leads').update({status,follow_up_on:isClosed(status)?null:date,draft:String(form.get('draft')||'').slice(0,10000),notes:String(form.get('notes')||'').slice(0,5000),updated_at:new Date().toISOString(),updated_by:user.id,version:version+1}).eq('id',id).eq('version',version).select('id').maybeSingle();
  if(error) throw new Error('unavailable');
  if(!data) throw new Error('conflict');
 } catch(error) { result=error instanceof Error && ['invalid','conflict'].includes(error.message)?error.message:'unavailable'; }
 revalidatePath('/control-center/pelatihan-ai');
 redirect(`/control-center/pelatihan-ai?id=${encodeURIComponent(id)}&result=${result}`);
}
