export function registrationCourse(value:unknown){return value==='may'?'may':'pol'}
export function examPath(value:unknown){return '/kuliah/modul.html?course='+registrationCourse(value)+'&meeting=8'}
