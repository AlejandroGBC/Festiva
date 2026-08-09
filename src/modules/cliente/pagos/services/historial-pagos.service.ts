import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { PagoCliente, ResumenPagosCliente } from "../types/historial-pagos.types";

export async function getPagosCliente(
    clienteId: string
): Promise<ResumenPagosCliente> {
    const supabase = await createServerSupabaseClient();

    // 1. Obtener los eventos del cliente
    const { data: eventos, error: errorEventos } = await supabase
        .from("tbl_eventos")
        .select("id_evento, titulo")
        .eq("id_cliente", clienteId);

    if (errorEventos) {
        console.error("Error al obtener eventos del cliente:", errorEventos);
        throw new Error("No se pudieron obtener los eventos");
    }

    if (!eventos || eventos.length === 0) {
        return { totalGastado: 0, pagos: [] };
    }

    const eventoIds = eventos.map((e) => e.id_evento);
    const eventoMap = new Map<string, string>();
    eventos.forEach((e) => eventoMap.set(e.id_evento, e.titulo));

    // 2. Obtener las contrataciones de esos eventos
    const { data: contrataciones, error: errorContrataciones } = await supabase
        .from("tbl_contrataciones")
        .select("id_contratacion, id_evento, id_proveedor")
        .in("id_evento", eventoIds);

    if (errorContrataciones) {
        console.error("Error al obtener contrataciones:", errorContrataciones);
        throw new Error("No se pudieron obtener las contrataciones");
    }

    if (!contrataciones || contrataciones.length === 0) {
        return { totalGastado: 0, pagos: [] };
    }

    const contratacionIds = contrataciones.map((c) => c.id_contratacion);
    const contratacionMap = new Map<string, { id_evento: string; id_proveedor: string }>();
    contrataciones.forEach((c) => {
        contratacionMap.set(c.id_contratacion, { id_evento: c.id_evento, id_proveedor: c.id_proveedor });
    });

    // 3. Obtener los pagos confirmados de esas contrataciones
    const { data: pagos, error: errorPagos } = await supabase
        .from("tbl_pagos")
        .select("id_pago, monto_total, metodo_pago, tarjeta_mascara, creado_en")
        .in("id_pago", contratacionIds)
        .eq("estado_pago", "pagado")
        .order("creado_en", { ascending: false });

    if (errorPagos) {
        console.error("Error al obtener pagos:", errorPagos);
        throw new Error("No se pudieron obtener los pagos");
    }

    if (!pagos || pagos.length === 0) {
        return { totalGastado: 0, pagos: [] };
    }

    // 4. Obtener nombres de los proveedores
    const proveedorIds = Array.from(
        new Set(contrataciones.map((c) => c.id_proveedor))
    );

    const { data: perfiles, error: errorPerfiles } = await supabase
        .from("tbl_perfiles_proveedor")
        .select("id_proveedor, nombre_comercial")
        .in("id_proveedor", proveedorIds);

    if (errorPerfiles) {
        console.error("Error al obtener perfiles de proveedor:", errorPerfiles);
        throw new Error("No se pudieron obtener los nombres de proveedores");
    }

    const nombreProveedorMap = new Map<string, string>();
    perfiles?.forEach((p) =>
        nombreProveedorMap.set(p.id_proveedor, p.nombre_comercial)
    );

    // 5. Calcular totales y mapear resultados
    let totalGastado = 0;
    
    const pagosFormateados: PagoCliente[] = pagos.map((p) => {
        totalGastado += p.monto_total ?? 0;

        const contratacion = contratacionMap.get(p.id_pago);
        const idEvento = contratacion?.id_evento ?? "";
        const idProveedor = contratacion?.id_proveedor ?? "";

        const nombreEvento = eventoMap.get(idEvento) ?? "Evento sin título";
        const nombreProveedor = nombreProveedorMap.get(idProveedor) ?? "Proveedor";

        return {
            idPago: p.id_pago,
            idEvento,
            nombreEvento,
            nombreProveedor,
            fechaPago: p.creado_en ?? null,
            montoTotal: p.monto_total ?? 0,
            metodoPago: p.metodo_pago ?? null,
            tarjetaMascara: p.tarjeta_mascara ?? null,
        };
    });

    return {
        totalGastado,
        pagos: pagosFormateados,
    };
}
