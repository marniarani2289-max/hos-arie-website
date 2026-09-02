export type TemplateRecord={template_key:string;name:string;channel:string;subject_template:string;body_template:string;allowed_variables:string[];active:boolean};
export function renderTemplate(template:string,variables:Record<string,string|number>){return template.replace(/\{\{([a-z_]+)\}\}/g,(_,key:string)=>String(variables[key]??`{{${key}}}`));}
