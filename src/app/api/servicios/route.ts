import { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ServiciosPaginados } from "@/shared/types/servicio.types";
import { apiError, apiSuccess } from "@/lib/api/api-response";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get("pageSize") ?? 20)));
  const search = searchParams.get("search")?.trim() ?? "";

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = await createServerSupabaseClient();

  let query = supabase
    .from("tbl_servicios")
    .select("id_servicio, nombre", { count: "exact" })
    .order("nombre", { ascending: true })
    .range(from, to);

  if (search) {
    query = query.ilike("nombre", `%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    return apiError(error.message, 500);
  }

  const total = count ?? 0;

  const body: ServiciosPaginados = {
    items: data ?? [],
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  };

  return apiSuccess(body);
}