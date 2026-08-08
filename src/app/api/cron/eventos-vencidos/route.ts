/**
  Cron Job para gestionar automáticamente eventos que la fecha ya pasó
 
  Reglas de negocio:
    - Evento vencido + al menos 1 contratación pagada  → estado: "finalizado"
    - Evento vencido + sin contrataciones pagadas       → estado: "cancelado"
 
  Seguridad: solo puede ejecutarse si el header "Authorization: Bearer <CRON_SECRET>"
  coincide con la variable de entorno CRON_SECRET. Esto permite registrarlo en
  Vercel Cron Jobs, Supabase pg_cron, GitHub Actions, etc.
 
  Ejemplo de llamada manual (dev):
    curl -X GET http://localhost:3000/api/cron/eventos-vencidos \
         -H "Authorization: Bearer [CRON_SECRET]"
 */

import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { enviarPushAUsuario } from "@/lib/push/send-push";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // Marcar como dinámica para que Next.js no la precalcule en build time

interface ResultadoCron {
  finalizados: string[];
  cancelados: string[];
  errores: { id_evento: string; razon: string }[];
}

export async function GET(req: NextRequest) {
  // Autenticación del cron 
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "No autorizado. Se requiere el header Authorization: Bearer <CRON_SECRET>." },
      { status: 401 }
    );
  }

  const supabase = createServiceRoleClient();
  const ahora = new Date().toISOString();
  const resultado: ResultadoCron = { finalizados: [], cancelados: [], errores: [] };

  // 1. Buscar eventos cuya fecha ya pasó y que están activos 
  const { data: eventosVencidos, error: errBusqueda } = await supabase
    .from("tbl_eventos")
    .select("id_evento, titulo, fecha_evento, estado, id_cliente")
    .in("estado", ["recibiendo_ofertas", "en_proceso"])
    .lt("fecha_evento", ahora); // fecha_evento < ahora → ya pasó

  if (errBusqueda) {
    return NextResponse.json(
      { error: "Error al consultar eventos vencidos.", detalle: errBusqueda.message },
      { status: 500 }
    );
  }

  if (!eventosVencidos || eventosVencidos.length === 0) {
    return NextResponse.json(
      { mensaje: "No hay eventos vencidos pendientes de procesar.", resultado },
      { status: 200 }
    );
  }

  // 2. Procesar cada evento vencido 
  for (const evento of eventosVencidos) {
    try {
      // ¿Tiene alguna contratación con pago confirmado?
      const { count: pagosConfirmados } = await supabase
        .from("tbl_pagos")
        .select(
          // tbl_pagos.id_pago === tbl_contrataciones.id_contratacion (1:1)
          // así que basta con buscar en contrataciones del evento y cruzar con pagos
          "id_pago",
          { count: "exact", head: true }
        )
        .eq("estado_pago", "pagado")
        // Para filtrar por evento usamos la relación con contrataciones:
        // tbl_pagos.id_pago = tbl_contrataciones.id_contratacion → filtramos en contrataciones primero
        .in(
          "id_pago",
          // Subconsulta: todos los id_contratacion de este evento
          (
            await supabase
              .from("tbl_contrataciones")
              .select("id_contratacion")
              .eq("id_evento", evento.id_evento)
          ).data?.map((c) => c.id_contratacion) ?? []
        );

      const nuevoEstado =
        (pagosConfirmados ?? 0) > 0 ? "finalizado" : "cancelado";

      const { error: errUpdate } = await supabase
        .from("tbl_eventos")
        .update({ estado: nuevoEstado })
        .eq("id_evento", evento.id_evento);

      if (errUpdate) throw new Error(errUpdate.message);

      if (nuevoEstado === "finalizado") {
        resultado.finalizados.push(evento.id_evento);

        // Enviar Push notification al cliente para que califique
        // No bloqueamos si falla — el banner en inicio los recordará de todas formas
        enviarPushAUsuario(evento.id_cliente, {
          title: "\uD83C\uDF89 \u00a1Tu evento finaliz\u00f3!",
          body: `\u00bfC\u00f3mo te fue en \u201c${evento.titulo}\u201d? Califica a tus proveedores.`,
          url: `/cliente/eventos/${evento.id_evento}/calificar`,
        }).catch((err) => console.error("[cron] Error enviando push:", err));
      } else {
        resultado.cancelados.push(evento.id_evento);
      }
    } catch (e) {
      resultado.errores.push({
        id_evento: evento.id_evento,
        razon: e instanceof Error ? e.message : "Error desconocido",
      });
    }
  }

  return NextResponse.json(
    {
      mensaje: `Procesados ${eventosVencidos.length} eventos vencidos.`,
      resumen: {
        total_procesados: eventosVencidos.length,
        finalizados: resultado.finalizados.length,
        cancelados: resultado.cancelados.length,
        errores: resultado.errores.length,
      },
      resultado,
    },
    { status: 200 }
  );
}
