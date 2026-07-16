import { Tables } from "@/shared/types/supabase.types";

export type Servicio = Tables<"tbl_servicios">;

export interface ServiciosPaginados {
  items: Servicio[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}