import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { PagoCliente, ResumenPagosCliente } from "../types/historial-pagos.types";

export async function getPagosCliente(
    clienteId: string
): Promise<ResumenPagosCliente> {
    const supabase = await createServerSupabaseClient();

    // Traer todos los pagos pagados cuyo evento pertenezca al cliente
    // tbl_pagos → tbl_contrataciones → tbl_eventos (filtrado por id_cliente)
    const { data: pagos, error } = await supabase
        .from("tbl_pagos")
        .select(`
            id_pago,
            monto_total,
            metodo_pago,
            tarjeta_mascara,
            creado_en,
            contratacion:tbl_contrataciones!inner (
                id_proveedor,
                evento:tbl_eventos!inner (
                    id_evento,
                    titulo,
                    id_cliente
                )
            )
        `)
        .eq("estado_pago", "pagado")
        .eq("contratacion.evento.id_cliente", clienteId)
        .order("creado_en", { ascending: false });

    if (error) {
        console.error("Error al obtener pagos del cliente:", error);
        throw new Error("No se pudieron obtener los pagos");
    }

    if (!pagos || pagos.length === 0) {
        return { totalGastado: 0, pagos: [] };
    }

    // IDs de proveedores únicos para obtener sus nombres comerciales
    const proveedorIds = Array.from(
        new Set(
            pagos
                .map((p) => p.contratacion?.id_proveedor)
                .filter(Boolean) as string[]
        )
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

    // Calcular total gastado
    let totalGastado = 0;
    pagos.forEach((p) => {
        totalGastado += p.monto_total ?? 0;
    });

    // Mapear a tipo de salida — el cliente solo ve monto_total, sin comisiones
    const pagosFormateados: PagoCliente[] = pagos.map((p) => {
        const evento = p.contratacion?.evento;
        const nombreEvento =
            // @ts-expect-error Supabase join type inference
            (Array.isArray(evento) ? evento[0]?.titulo : evento?.titulo) ??
            "Evento sin título";
        const idProveedor = p.contratacion?.id_proveedor ?? "";
        const nombreProveedor =
            nombreProveedorMap.get(idProveedor) ?? "Proveedor";

        return {
            idPago: p.id_pago,
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
