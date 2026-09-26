import 'server-only';
import {createClient as serviceClient} from '@supabase/supabase-js';
import {redirect} from 'next/navigation';
import {createClient} from '@/lib/supabase/server';
import type {Member,Rate,Payment} from './billing';

function admin(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)throw new Error('Konfigurasi pengelolaan anggota belum tersedia.');
 return serviceClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
}
export async function requireTreasurer(next='/persis-kepri/iuran/bendahara/anggota'){
 const client=await createClient();const {data:{user}}=await client.auth.getUser();
 if(!user)redirect(`/login?next=${encodeURIComponent(next)}`);
 const {data,error}=await client.from('persis_treasurers').select('user_id').eq('user_id',user.id).maybeSingle();
 if(error||!data)redirect('/persis-kepri/iuran');
 return {client,user,service:admin()};
}
export async function requireApplicant(){
 const client=await createClient();const {data:{user}}=await client.auth.getUser();
 if(!user?.email||!user.email_confirmed_at||user.is_anonymous)redirect('/login?next=%2Fpersis-kepri%2Fpendaftaran');
 return {client,user,service:admin()};
}
export async function resolveAccount(service:ReturnType<typeof admin>,email:string|null){
 if(!email)return null;
 for(let page=1;;page++){
  const {data,error}=await service.auth.admin.listUsers({page,perPage:1000});
  if(error)throw new Error('Akun anggota belum dapat diperiksa. Coba kembali.');
  const user=data.users.find(u=>u.email?.toLowerCase()===email&&u.email_confirmed_at&&!u.is_anonymous);
  if(user)return user.id;
  if(data.users.length<1000)return null;
 }
}
export async function linkCurrentMember(){
 const client=await createClient();const {data:{user}}=await client.auth.getUser();
 if(!user?.email||!user.email_confirmed_at||user.is_anonymous)return;
 const {error}=await admin().from('persis_members').update({user_id:user.id,updated_by:user.id}).eq('email',user.email.toLowerCase()).is('user_id',null);
 if(error)throw new Error('Data anggota belum dapat dihubungkan. Hubungi bendahara.');
}
export async function loadBilling(client:Awaited<ReturnType<typeof createClient>>,year:number,userId?:string){
 const members:Member[]=[],rates:Rate[]=[],payments:Payment[]=[];
 for(let offset=0;;offset+=500){
  let query=client.from('persis_members').select('*');if(userId)query=query.eq('user_id',userId);
  const {data,error}=await query.order('id').range(offset,offset+499);
  if(error)throw new Error('Master anggota belum dapat dimuat.');members.push(...(data||[]));if((data?.length||0)<500)break;
 }
 for(let offset=0;;offset+=500){
  const {data,error}=await client.from('persis_rates').select('*').lte('effective_month',`${year}-12-01`).order('effective_month').range(offset,offset+499);
  if(error)throw new Error('Ketentuan iuran belum dapat dimuat.');rates.push(...(data||[]));if((data?.length||0)<500)break;
 }
 for(let offset=0;;offset+=500){
  let query=client.from('persis_dues').select('user_id,period,amount,status').gte('period',`${year}-01-01`).lte('period',`${year}-12-01`).in('status',['pending','verified']);if(userId)query=query.eq('user_id',userId);
  const {data,error}=await query.order('id').range(offset,offset+499);
  if(error)throw new Error('Pembayaran belum dapat dimuat.');payments.push(...(data||[]));if((data?.length||0)<500)break;
 }
 return {members,rates,payments};
}
