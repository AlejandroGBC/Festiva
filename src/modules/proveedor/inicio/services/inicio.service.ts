import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { StatsInicio } from "../types/inicio.types";

export async function getStatsInicio(id: number): Promise <StatsInicio>{
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
    .from("")
}