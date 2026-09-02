export type PilotProgress={module_number:number;completed:boolean;quiz_score:number};
export type PilotEnrollment={id:string;user_id:string;module_progress:PilotProgress[]};
export type PilotAssessment={user_id:string;assessment_type:string;total_score:number|null};
export type PilotCheckin={user_id:string;week_number:number;confidence:number;workload_status:string};

export function expectedModulesAt(date=new Date()){
  const time=date.getTime();
  if(time<Date.parse("2026-10-05T00:00:00+07:00"))return 0;
  if(time<Date.parse("2026-10-12T00:00:00+07:00"))return 2;
  if(time<Date.parse("2026-10-19T00:00:00+07:00"))return 4;
  if(time<Date.parse("2026-10-26T00:00:00+07:00"))return 6;
  return 8;
}
export function pilotWeekAt(date=new Date()){const expected=expectedModulesAt(date);return expected===0?0:Math.min(4,Math.ceil(expected/2));}
export function completedModules(enrollment:PilotEnrollment|undefined){return (enrollment?.module_progress||[]).filter(x=>x.completed).length;}
export function passedQuizzes(enrollment:PilotEnrollment|undefined){return (enrollment?.module_progress||[]).filter(x=>x.quiz_score>=70).length;}
export function certificateEligible(enrollment:PilotEnrollment|undefined){return completedModules(enrollment)>=8&&passedQuizzes(enrollment)>=8;}
