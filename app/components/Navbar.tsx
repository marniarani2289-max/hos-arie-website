import { createClient } from "@/lib/supabase/server";
import NavbarClient from "./layout/NavbarClient";

export default async function Navbar() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    return <NavbarClient participant={user ? { name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Participant", email: user.email || "" } : null} />;
  } catch {
    return <NavbarClient participant={null} />;
  }
}
