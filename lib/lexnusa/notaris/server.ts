import 'server-only';
import { createClient } from '@/lib/supabase/server';

export async function context() {
  const db = await createClient();
  const { data: { user }, error } = await db.auth.getUser();
  if (error || !user || user.is_anonymous) throw new Error('Silakan masuk dengan akun terdaftar.');
  const { data: office, error: officeError } = await db.from('lexnusa_notary_offices').select('id,name,owner_id').eq('owner_id', user.id).maybeSingle();
  if (officeError) throw new Error('Ruang kerja belum dapat dimuat. Coba kembali.');
  return { db, user, office };
}
