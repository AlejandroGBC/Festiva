/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { EventoRecomendado } from "../types/inicio.types";

export async function getEventosRecomendados(providerId: string): Promise<EventoRecomendado[]> {
    const supabase = await createServerSupabaseClient();

    // 1. Obtener perfil del proveedor (ubicación base)
    const { data: proveedor, error: errProv } = await supabase
        .from('tbl_perfiles_proveedor')
        .select('ubicacion_base')
        .eq('id_proveedor', providerId)
        .single();

    if (errProv || !proveedor) {
        console.error('Error al obtener proveedor:', errProv);
        return [];
    }

    // 2. Obtener servicios que ofrece el proveedor
    const { data: serviciosProveedor, error: errServ } = await supabase
        .from('tbl_proveedor_servicios')
        .select('id_servicio')
        .eq('id_proveedor', providerId);

    if (errServ || !serviciosProveedor || serviciosProveedor.length === 0) {
        // Si el proveedor no tiene servicios registrados, no puede recomendar nada
        return [];
    }

    const idsServiciosProveedor = serviciosProveedor.map(s => s.id_servicio);

    // 3. Obtener eventos activos
    const { data: eventos, error: errEventos } = await supabase
        .from('tbl_eventos')
        .select(`
      id_evento,
      titulo,
      fecha_evento,
      ubicacion,
      cantidad_invitados,
      presupuesto_min,
      presupuesto_max,
      tbl_evento_servicios ( id_servicio )
    `)
        .eq('estado', 'recibiendo_ofertas')
        .gte('fecha_evento', new Date().toISOString().split('T')[0]) // solo futuros
        .not('tbl_evento_servicios', 'is', null); // que tengan servicios asociados

    if (errEventos || !eventos) {
        console.error('Error al obtener eventos:', errEventos);
        return [];
    }

    // 4. (Opcional) Obtener historial de capacidad y presupuesto del proveedor desde contrataciones (En revision porque no se si funcionara)
    let promedioCapacidad = 0;
    let promedioPresupuesto = 0;
    const { data: contratos, error: errCont } = await supabase
        .from('tbl_contrataciones')
        .select(`
      id_evento,
      tbl_eventos ( cantidad_invitados, presupuesto_min, presupuesto_max )
    `)
        .eq('id_proveedor', providerId)
        .eq('estado_servicio', 'finalizado'); // solo eventos ya realizados

    if (!errCont && contratos && contratos.length > 0) {
        const capacidades = contratos.map(c => c.tbl_eventos?.[0]?.cantidad_invitados).filter(Boolean);
        const presupuestos = contratos.map(c => {
            const ev = c.tbl_eventos[0];
            if (ev && ev.presupuesto_min && ev.presupuesto_max) {
                return (Number(ev.presupuesto_min) + Number(ev.presupuesto_max)) / 2;
            }
            return null;
        }).filter(Boolean) as number[];

        if (capacidades.length > 0) {
            promedioCapacidad = capacidades.reduce((a, b) => a + b, 0) / capacidades.length;
        }
        if (presupuestos.length > 0) {
            promedioPresupuesto = presupuestos.reduce((a, b) => a + b, 0) / presupuestos.length;
        }
    }

    // 5. Función para calcular puntuación
    function calcularPuntuacion(evento: any): number {
        let puntos = 0;

        // --- 5a. Coincidencia de servicios (obligatorio) ---
        const idsServiciosEvento = evento.tbl_evento_servicios.map((es: any) => es.id_servicio);
        const serviciosCoincidentes = idsServiciosEvento.filter((id: number) => idsServiciosProveedor.includes(id));
        if (serviciosCoincidentes.length === 0) {
            return 0; // descartado
        }
        puntos += serviciosCoincidentes.length * 20;


        // --- 5b. Ubicación ---
        const ubicacionProv = proveedor?.ubicacion_base.toLowerCase().trim();
        const ubicacionEvento = evento.ubicacion.toLowerCase().trim();
        if (ubicacionProv === ubicacionEvento) {
            puntos += 30;
        } else {
            const ciudadProv = ubicacionProv?.split(',')[0].trim();
            const ciudadEvento = ubicacionEvento.split(',')[0].trim();
            if (ciudadProv === ciudadEvento) {
                puntos += 15;
            }
        }

        if (promedioCapacidad > 0) {
            const ratio = evento.cantidad_invitados / promedioCapacidad;
            if (ratio <= 1.2) puntos += 15;
            else if (ratio <= 1.5) puntos += 5;
            else puntos -= 10;
        }

        if (promedioPresupuesto > 0 && evento.presupuesto_min && evento.presupuesto_max) {
            const presupuestoMedio = (Number(evento.presupuesto_min) + Number(evento.presupuesto_max)) / 2;
            const ratioPresupuesto = presupuestoMedio / promedioPresupuesto;
            if (ratioPresupuesto >= 1.2) puntos += 20;
            else if (ratioPresupuesto >= 0.8) puntos += 10;
            else puntos -= 10;
        }

        return puntos;
    }

    // 6. Procesar eventos, calcular puntuación y ordenar
    const eventosConPuntuacion = eventos
        .map(evento => ({
            ...evento,
            puntuacion: calcularPuntuacion(evento)
        }))
        .filter(e => e.puntuacion > 0)
        .sort((a, b) => b.puntuacion - a.puntuacion)
        .slice(0, 10); // top 10

    // 7. Obtener catálogo de servicios para mapear nombres
    const { data: catalogoServicios } = await supabase
        .from('tbl_servicios')
        .select('id_servicio, nombre');

    const mapServicios = Object.fromEntries(
        catalogoServicios?.map(s => [s.id_servicio, s.nombre]) || []
    );


    const resultado: EventoRecomendado[] = eventosConPuntuacion.map(e => {
        const idsServicios = e.tbl_evento_servicios.map((es: any) => es.id_servicio);
        const nombresCategorias = idsServicios.map((id: number) => mapServicios[id] || 'Servicio');

        return {
            id_evento: e.id_evento,
            titulo: e.titulo,
            fecha: new Date(e.fecha_evento).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            }),
            ubicacion: e.ubicacion,
            cantidadPersonas: e.cantidad_invitados,
            categorias_evento: nombresCategorias.map(nombre => ({
                label: nombre,
                variant: 'gray' 
            })),
            rangoPrecio: e.presupuesto_min && e.presupuesto_max
                ? `L${Number(e.presupuesto_min).toFixed(0)}k-L${Number(e.presupuesto_max).toFixed(0)}k`
                : 'Precio a convenir',
            puntuacion: e.puntuacion,
        };
    });

    return resultado;
}