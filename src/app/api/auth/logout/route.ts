import { apiSuccess } from "@/lib/api/api-response";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  return apiSuccess({ loggedOut: true });
}