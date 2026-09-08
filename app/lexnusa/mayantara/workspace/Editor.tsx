"use client";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { saveWork, type FormState } from "../actions";
type Initial={id:string;answer:string;sources:string;reflection:string}|null;
export default function Editor({assignment,initial}:{assignment:string;initial:Initial}){
 const router=useRouter();
 const [checked,setChecked]=useState(false);
 const [state,action,pending]=useActionState(async(previous:FormState,form:FormData)=>{const result=await saveWork(previous,form);if(result.ok){setChecked(false);router.refresh();}return result;},{ok:false,message:"",versionId:initial?.id??null});
 const input="mt-2 w-full rounded-lg border border-slate-400 bg-white p-3 text-slate-950";
 return <form action={action} className="space-y-5"><input type="hidden" name="assignment" value={assignment}/><input type="hidden" name="parent_id" value={state.versionId??""}/><fieldset disabled={pending} className="space-y-5 disabled:opacity-60" onChange={()=>setChecked(false)}>
 <label className="block font-semibold">Analysis<textarea name="answer" rows={14} maxLength={30000} defaultValue={initial?.answer??""} className={input}/></label>
 <label className="block font-semibold">Sources and verification notes<textarea name="sources" rows={6} maxLength={12000} defaultValue={initial?.sources??""} placeholder="Source title, exact provision/page, URL, version/date checked, proposition supported, and unresolved questions." className={input}/></label>
 <label className="block font-semibold">Reflection, revision log and tool disclosure<textarea name="reflection" rows={5} maxLength={8000} defaultValue={initial?.reflection??""} placeholder="What changed and why? Declare any external AI use, including what you checked. If none, say so." className={input}/></label>
 </fieldset><label className="flex gap-3"><input name="attested" type="checkbox" checked={checked} disabled={pending} onChange={e=>setChecked(e.target.checked)}/><span>I have checked my sources, identified uncertainties, and disclosed assistance. This is my own analysis using simulated or authorized material.</span></label>
 <div className="flex flex-wrap gap-3"><button disabled={pending} name="intent" value="save" className="rounded-lg border px-5 py-3 font-bold disabled:opacity-50">Save draft</button><button disabled={pending||!checked} name="intent" value="submit" className="rounded-lg bg-teal-800 px-5 py-3 font-bold text-white disabled:opacity-50">Submit for lecturer review</button></div>
 {pending&&<p role="status">Saving…</p>}{state.message&&<p role={state.ok?"status":"alert"} className="rounded-lg bg-amber-50 p-4">{state.message}</p>}
 <p className="text-sm text-slate-600">Each save creates a version. Drafts are visible to your lecturer. Save before leaving this page. Submission is not an official university grade.</p></form>;
}
