export const UTS_TABLE = "kuliah_politik_uts";
export const UTS_PATH = "/kuliah/modul.html?course=pol&meeting=8";
export const DOSEN_PATH = "/kuliah/politik-hukum-pidana/dosen";
export const questions = [
  {title:"Konsep dan ruang lingkup politik hukum pidana",points:15},
  {title:"Tahapan kebijakan hukum pidana",points:20},
  {title:"Kriminalisasi dan batas penggunaan hukum pidana",points:25},
  {title:"Tujuan pemidanaan dan pilihan kebijakan",points:20},
  {title:"Kebijakan penal dan nonpenal",points:20},
];
export type UtsRecord = {id:string;user_id:string;display_name:string;student_number:string;class_name:string;answers:string[];status:"draft"|"submitted";revision:number;attested:boolean;updated_at:string;submitted_at:string|null};
export type UtsInput = {expectedUserId:string;revision:number;intent:"save"|"submit";display_name:string;student_number:string;class_name:string;answers:string[];attested:boolean};
export function parseUtsInput(value:unknown):UtsInput|null {
  if(!value||typeof value!=="object"||Array.isArray(value))return null;
  const v=value as Record<string,unknown>;
  if(typeof v.expectedUserId!=="string"||!Number.isSafeInteger(v.revision)||Number(v.revision)<0||!["save","submit"].includes(String(v.intent)))return null;
  if(typeof v.display_name!=="string"||v.display_name.length>160||typeof v.student_number!=="string"||v.student_number.length>80||typeof v.class_name!=="string"||v.class_name.length>160)return null;
  if(!Array.isArray(v.answers)||v.answers.length!==5||v.answers.some(a=>typeof a!=="string"||a.length>50000))return null;
  const result:UtsInput={expectedUserId:v.expectedUserId,revision:Number(v.revision),intent:v.intent as UtsInput["intent"],display_name:v.display_name.trim(),student_number:v.student_number.trim(),class_name:v.class_name.trim(),answers:v.answers.map(a=>a.trim()),attested:v.attested===true};
  if(result.intent==="submit"&&(!result.attested||!result.display_name||!result.student_number||!result.class_name||result.answers.some(a=>!a)))return null;
  return result;
}
export const recordColumns="id,user_id,display_name,student_number,class_name,answers,status,revision,attested,updated_at,submitted_at";
export function waktu(value:string){return new Date(value).toLocaleString("id-ID",{timeZone:"Asia/Jakarta"})+" WIB";}
