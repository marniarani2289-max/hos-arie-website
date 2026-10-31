'use server';
import { createHash } from 'node:crypto';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { parseInterest, prepareInterest } from '@/lib/training-assistant/model';
import { trainingService } from '@/lib/training-assistant/server';
export async function submitInterest(form: FormData) {
  let destination='/pelatihan-ai/minat?result=received';
  try {
    if(form.get('website')) throw new Error('invalid');
    const input=parseInterest(form);
    const requestKey=String(form.get('request_key')||'');
    if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestKey)) throw new Error('invalid');
    const client=trainingService(), h=await headers();
    const ip=h.get('x-real-ip')||h.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';
    const key=createHash('sha256').update(`training-interest:${ip}`).digest('hex');
    const {data:allowed,error:rateError}=await client.rpc('lexnusa_check_rate_limit',{p_key:key,p_limit:10,p_window_seconds:900});
    if(rateError) throw new Error('unavailable');
    if(!allowed) throw new Error('rate');
    const {error}=await client.from('training_interest_leads').insert({...input,...prepareInterest(input),request_key:requestKey});
    if(error && error.code!=='23505') throw new Error('unavailable');
  } catch(error) {
    const code=error instanceof Error && ['invalid','rate'].includes(error.message) ? error.message : 'unavailable';
    destination=`/pelatihan-ai/minat?error=${code}`;
  }
  redirect(destination);
}
