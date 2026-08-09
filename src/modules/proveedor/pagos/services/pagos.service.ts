import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { PagoProveedor, ResumenPagosProveedor } from "../types/pagos.types";

export async function getPagosProveedor(
    proveedorId: string
): Promise<ResumenPagosProveedor> {
    const supabase = await createServerSupabaseClient();

    // Traer todos los pagos pagados de este proveedor con datos de contratación
    const { data: pagos, error } = await supabase
        .from("tbl_pagos")
        .select(`
            id_pago,
            monto_total,
            monto_proveedor,
            comision_festiva,
            metodo_pago,
            tarjeta_mascara,
            creado_en,
            contratacion:tbl_contrataciones!inner (
                id_evento,
                id_proveedor
            )
        `)
        .eq("estado_pago", "pagado")
        .eq("contratacion.id_proveedor", proveedorId)
        .order("creado_en", { ascending: false });

    if (error) {
        console.error("Error al obtener pagos del proveedor:", error);
        throw new Error("No se pudieron obtener los pagos");
    }

    if (!pagos || pagos.length === 0) {
        return { totalRecibido: 0, totalComisiones: 0, pagos: [] };
    }

    // IDs de eventos para obtener los títulos
    const eventoIds = Array.from(
        new Set(
            pagos
                .map((p) => p.contratacion?.id_evento)
                .filter(Boolean) as string[]
        )
    );

    const { data: eventos, error: errorEventos } = await supabase
        .from("tbl_eventos")
        .select("id_evento, titulo")
        .in("id_evento", eventoIds);

    if (errorEventos) {
        console.error("Error al obtener títulos de eventos:", errorEventos);
        throw new Error("No se pudieron obtener los títulos de eventos");
    }

    const tituloMap = new Map<string, string>();
    eventos?.forEach((e) => tituloMap.set(e.id_evento, e.titulo));

    // Calcular totales
    let totalRecibido = 0;
    let totalComisiones = 0;
    pagos.forEach((p) => {
        totalRecibido += p.monto_proveedor || 0;
        totalComisiones += p.comision_festiva || 0;
    });

    // Mapear a tipo de salida
    const pagosFormateados: PagoProveedor[] = pagos.map((p) => {
        const idEvento = p.contratacion?.id_evento;
        const nombreEvento = idEvento
            ? tituloMap.get(idEvento) ?? "Evento sin título"
            : "Evento sin título";

        return {
            idPago: p.id_pago,
            idEvento: idEvento ?? "",
            nombreEvento,
            fechaPago: p.creado_en ?? null,
            montoTotal: p.monto_total ?? 0,
            comisionFestiva: p.comision_festiva ?? 0,
            montoProveedor: p.monto_proveedor ?? 0,
            metodoPago: p.metodo_pago ?? null,
            tarjetaMascara: p.tarjeta_mascara ?? null,
        };
    });

    return {
        totalRecibido,
        totalComisiones,
        pagos: pagosFormateados,
    };
}
