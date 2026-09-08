"use client";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import type { FormState } from "./actions";
export default function ActionForm({action,children}:{action:(state:FormState,form:FormData)=>Promise<FormState>;children:React.ReactNode}){
 const router=useRouter();
 const [state,formAction,pending]=useActionState(async(previous:FormState,form:FormData)=>{const result=await action(previous,form);if(result.ok)router.refresh();return result;},{ok:false,message:""});
 return <form action={formAction} className="space-y-4"><fieldset disabled={pending} className="space-y-4 disabled:opacity-60">{children}</fieldset>{pending&&<p role="status">Saving…</p>}{state.message&&<p role={state.ok?"status":"alert"} className="rounded-lg border p-3">{state.message}</p>}</form>;
}
