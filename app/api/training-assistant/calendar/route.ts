import { NextRequest, NextResponse } from 'next/server';
import { requireControlCenterAccess } from '@/lib/ai-control-center/access';
import { trainingService } from '@/lib/training-assistant/server';
import { calendarEvent, isClosed } from '@/lib/training-assistant/model';
export async function GET(request:NextRequest) {
 await requireControlCenterAccess();
 const id=request.nextUrl.searchParams.get('id')||'';
 if(!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({error:'Kontak tidak valid'},{status:400});
 try {
  const {data,error}=await trainingService().from('training_interest_leads').select('id,status,follow_up_on').eq('id',id).maybeSingle();
  if(error) throw error;
  if(!data||!data.follow_up_on||isClosed(data.status)) return NextResponse.json({error:'Tidak ada jadwal aktif'},{status:404});
  return new Response(calendarEvent(data.id,data.follow_up_on),{headers:{'Content-Type':'text/calendar; charset=utf-8','Content-Disposition':'attachment; filename="tindak-lanjut-pelatihan.ics"','Cache-Control':'private, no-store'}});
 } catch {return NextResponse.json({error:'Kalender belum dapat dibuat'},{status:503});}
}
