import 'server-only';
import {createHash} from 'node:crypto';
import {createClient} from '@/lib/supabase/server';
import {reminderState,reminderMessage,type ReminderData} from './reminders';
export async function loadReminderData(client:Awaited<ReturnType<typeof createClient>>,memberId?:string){const {data,error}=await client.rpc('persis_reminder_data',{p_member:memberId||null});if(error||!data)throw new Error('Data pengingat belum dapat dimuat. Coba kembali.');return data as ReminderData;}
export function prepareReminder(data:ReminderData,memberId:string,month:string){const member=data.members.find(m=>m.id===memberId);if(!member)throw new Error('Anggota tidak ditemukan.');const state=reminderState(member,data.rates,data.payments,month);if(state.blocked)throw new Error(state.blocked);const message=reminderMessage(state,month),phone=member.contact!.phone;return {message,phone,amount:state.amount,hash:createHash('sha256').update(JSON.stringify({message,phone,user:member.user_id})).digest('hex')};}
