export const institutionTypes = [["sekolah", "Sekolah"], ["komunitas", "Komunitas"]] as const;
export const focusOptions = [["sampah", "Sampah dan pesisir"], ["air", "Air dan ekosistem perairan"], ["literasi", "Literasi laut dan pembelajaran"], ["budaya", "Budaya maritim dan pengetahuan lokal"], ["lainnya", "Fokus lainnya"]] as const;
export const readinessOptions = [["menjajaki", "Masih menjajaki"], ["siap", "Siap menyusun uji coba"], ["berjalan", "Sudah menjalankan kegiatan"]] as const;
export const statusOptions = [["baru", "Baru"], ["dihubungi", "Sudah dihubungi"], ["diskusi", "Dalam pembahasan"], ["aktif", "Perintis aktif"], ["ditutup", "Ditutup"], ["spam", "Spam"]] as const;
export const consentVersion = "blue-pilot-2026-09-24";
export const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export type PilotInput = {
 institution_type: string; institution_name: string; province: string; district: string;
 contact_name: string; contact_role: string; email: string; phone: string;
 focus: string; readiness: string; plan: string; consent: boolean;
};
export type PilotErrors = Partial<Record<keyof PilotInput, string>>;
export function validatePilot(raw: unknown): { data: PilotInput; errors: PilotErrors } {
 const o = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
 const text = (key: string) => typeof o[key] === "string" ? (o[key] as string).trim() : "";
 const data: PilotInput = {
  institution_type:text("institution_type"), institution_name:text("institution_name"), province:text("province"), district:text("district"),
  contact_name:text("contact_name"), contact_role:text("contact_role"), email:text("email").toLowerCase(),
  phone:text("phone").replace(/[\s()-]/g,""), focus:text("focus"), readiness:text("readiness"), plan:text("plan"), consent:o.consent===true,
 };
 const errors: PilotErrors = {};
 const lengths: [keyof PilotInput, number, number, string][] = [
  ["institution_name",2,180,"Nama lembaga"], ["province",2,100,"Provinsi"], ["district",2,120,"Kabupaten/kota"],
  ["contact_name",2,120,"Nama penanggung jawab"], ["contact_role",2,120,"Peran penanggung jawab"], ["plan",20,3000,"Rencana awal"],
 ];
 for (const [key,min,max,label] of lengths) {
  const value = data[key] as string;
  if(value.length<min || value.length>max) errors[key]=label+" perlu diisi "+min+"–"+max+" karakter.";
 }
 if(!institutionTypes.some(([id])=>id===data.institution_type)) errors.institution_type="Pilih sekolah atau komunitas.";
 if(data.email.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email="Masukkan alamat email yang valid.";
 if(data.phone && !/^\+?[0-9]{8,15}$/.test(data.phone)) errors.phone="Gunakan 8–15 digit, misalnya 081234567890 atau +6281234567890.";
 if(!focusOptions.some(([id])=>id===data.focus)) errors.focus="Pilih fokus kegiatan.";
 if(!readinessOptions.some(([id])=>id===data.readiness)) errors.readiness="Pilih kesiapan lembaga.";
 if(!data.consent) errors.consent="Persetujuan diperlukan untuk memproses pendaftaran.";
 return {data, errors};
}
