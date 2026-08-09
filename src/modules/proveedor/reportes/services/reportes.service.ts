import { DatosReportes, HistorialPago, IngresosUltimosMeses } from "../types/reportes.types";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export async function getDatosReportes(proveedorId: string): Promise<DatosReportes> {
    const supabase = await createServerSupabaseClient();

    // 1. Obtener pagos pagados con datos de contratación (id_evento, id_proveedor)
    const { data: pagos, error } = await supabase
        .from("tbl_pagos")
        .select(`
      id_pago,
      monto_proveedor,
      comision_festiva,
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
        console.error("Error al obtener pagos:", error);
        throw new Error("No se pudieron obtener los datos de reportes");
    }

    // Si no hay pagos, devolver datos vacíos
    if (!pagos || pagos.length === 0) {
        return {
            ingresos: 0,
            egresos: 0,
            porcentajeIngresos: 0,
            historial: [],
            ingresosUltimosMeses: generarMesesVacios(),
        };
    }

    // 2. Obtener los IDs de eventos únicos para consultar sus títulos
    const eventoIds = [...new Set(pagos.map(p => p.contratacion?.id_evento).filter(Boolean))];

    const { data: eventos, error: errorEventos } = await supabase
        .from("tbl_eventos")
        .select("id_evento, titulo")
        .in("id_evento", eventoIds);

    if (errorEventos) {
        console.error("Error al obtener títulos de eventos:", errorEventos);
        throw new Error("No se pudieron obtener los títulos de los eventos");
    }

    // Crear un mapa de id_evento -> titulo
    const tituloEventoMap = new Map<string, string>();
    eventos?.forEach(e => tituloEventoMap.set(e.id_evento, e.titulo));

    // 3. Calcular totales
    let totalIngresos = 0;
    let totalEgresos = 0;
    pagos.forEach(p => {
        totalIngresos += p.monto_proveedor || 0;
        totalEgresos += p.comision_festiva || 0;
    });

    // 4. Historial reciente (últimos 5 pagos)
    const historial: HistorialPago[] = pagos.slice(0, 5).map(p => {
        const idEvento = p.contratacion?.id_evento;
        const nombreEvento = idEvento ? tituloEventoMap.get(idEvento) || "Evento sin título" : "Evento sin título";
        return {
            idPago: p.id_pago,
            montoPago: p.monto_proveedor,
            nombreEvento,
            fechaPago: p.creado_en || null,
        };
    });

    // 5. Ingresos últimos 6 meses
    const hoy = new Date();
    const mesesUltimos6 = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
        return {
            año: d.getFullYear(),
            mes: d.getMonth(),
            nombre: MESES[d.getMonth()],
            key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        };
    }).reverse();

    const mapaMeses: Record<string, number> = {};
    mesesUltimos6.forEach(m => { mapaMeses[m.key] = 0; });

    pagos.forEach(p => {
        if (!p.creado_en) return;
        const fecha = new Date(p.creado_en);
        const key = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
        if (Object.prototype.hasOwnProperty.call(mapaMeses, key)) {
            mapaMeses[key] += p.monto_proveedor || 0;
        }
    });

    const ingresosUltimosMeses: IngresosUltimosMeses[] = mesesUltimos6.map(m => ({
        mes: m.nombre,
        valor: mapaMeses[m.key] || 0,
    }));

    // 6. Porcentaje de crecimiento
    let porcentaje = 0;
    if (ingresosUltimosMeses.length >= 2) {
        const ultimo = ingresosUltimosMeses[ingresosUltimosMeses.length - 1].valor;
        const penultimo = ingresosUltimosMeses[ingresosUltimosMeses.length - 2].valor;
        if (penultimo !== 0) {
            porcentaje = Math.round(((ultimo - penultimo) / penultimo) * 100);
        } else if (ultimo > 0) {
            porcentaje = 100;
        }
    }

    return {
        ingresos: totalIngresos,
        egresos: totalEgresos,
        porcentajeIngresos: porcentaje,
        historial,
        ingresosUltimosMeses,
    };
}

function generarMesesVacios(): IngresosUltimosMeses[] {
    const hoy = new Date();
    return Array.from({ length: 6 }, (_, i) => {
        const d = new Date(hoy.getFullYear(), hoy.getMonth() - (5 - i), 1);
        return {
            mes: MESES[d.getMonth()],
            valor: 0,
        };
    });
}