import 'server-only';
import {createClient} from '@supabase/supabase-js';
export function cohortService(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)throw new Error('cohort_service_unavailable');
 return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
}
