import { runPilotAutomation } from "@/lib/rahi/automation";

export const runtime="nodejs";
export const maxDuration=60;

export async function GET(request:Request){
  const secret=process.env.CRON_SECRET;
  if(!secret)return Response.json({ok:false,error:"Cron secret is not configured"},{status:503});
  if(request.headers.get("authorization")!==`Bearer ${secret}`)return new Response("Unauthorized",{status:401});
  try{return Response.json(await runPilotAutomation());}catch(error){console.error("RAHI pilot automation failed",error);return Response.json({ok:false,error:"Automation failed"},{status:500});}
}
