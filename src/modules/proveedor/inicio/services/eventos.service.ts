/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { EventoRecomendado } from "../types/inicio.types";

export async function getEventosRecomendados(providerId: string): Promise<EventoRecomendado[]> {
    const supabase = await createServerSupabaseClient();

    // 1-4. Todas las queries iniciales son independientes entre sí (ninguna depende
    // del resultado de otra), así que se disparan en paralelo en vez de esperarlas
    // una por una.
    const [
        { data: proveedor, error: errProv },
        { data: serviciosProveedor, error: errServ },
        { data: eventos, error: errEventos },
        { data: contratos, error: errCont },
        { data: catalogoServicios },
    ] = await Promise.all([
        // 1. Perfil del proveedor (ubicación base)
        supabase
            .from('tbl_perfiles_proveedor')
            .select('ubicacion_base')
            .eq('id_proveedor', providerId)
            .single(),

        // 2. Servicios que ofrece el proveedor
        supabase
            .from('tbl_proveedor_servicios')
            .select('id_servicio')
            .eq('id_proveedor', providerId),

        // 3. Eventos activos
        supabase
            .from('tbl_eventos')
            .select(`
        id_evento,
        titulo,
        fecha_evento,
        ubicacion,
        cantidad_invitados,
        presupuesto_min,
        presupuesto_max,
        tbl_evento_servicios!inner ( id_servicio )
      `)
            .eq('estado', 'recibiendo_ofertas')
            .gte('fecha_evento', new Date().toISOString().split('T')[0]), // solo futuros

        // 4. Contrataciones finalizadas del proveedor (solo id_evento; no hay FK
        // directo tbl_contrataciones -> tbl_eventos, así que no se puede embeber)
        supabase
            .from('tbl_contrataciones')
            .select('id_evento')
            .eq('id_proveedor', providerId)
            .eq('estado_servicio', 'finalizado'),

        // 5. Catálogo de servicios (para mapear id_servicio -> nombre)
        supabase
            .from('tbl_servicios')
            .select('id_servicio, nombre'),
    ]);

    if (errProv || !proveedor) {
        console.error('Error al obtener proveedor:', errProv);
        return [];
    }

    if (errServ || !serviciosProveedor || serviciosProveedor.length === 0) {
        // Si el proveedor no tiene servicios registrados, no puede recomendar nada
        return [];
    }

    if (errEventos || !eventos) {
        console.error('Error al obtener eventos:', errEventos);
        return [];
    }

    const idsServiciosProveedor = serviciosProveedor.map(s => s.id_servicio);

    // tbl_contrataciones no tiene FK directo a tbl_eventos (va por tbl_ofertas),
    // así que se resuelve con una segunda query filtrando por los id_evento
    // de las contrataciones finalizadas del proveedor.
    let promedioCapacidad = 0;
    let promedioPresupuesto = 0;

    if (!errCont && contratos && contratos.length > 0) {
        const idsEventosContratados = contratos.map(c => c.id_evento);

        const { data: eventosHistoricos, error: errHist } = await supabase
            .from('tbl_eventos')
            .select('cantidad_invitados, presupuesto_min, presupuesto_max')
            .in('id_evento', idsEventosContratados);

        if (!errHist && eventosHistoricos && eventosHistoricos.length > 0) {
            const capacidades = eventosHistoricos
                .map(e => e.cantidad_invitados)
                .filter(Boolean) as number[];

            const presupuestos = eventosHistoricos.map(e => {
                if (e.presupuesto_min && e.presupuesto_max) {
                    return (Number(e.presupuesto_min) + Number(e.presupuesto_max)) / 2;
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
        .slice(0, 4); // top 4 

    // Mapear id_servicio -> nombre usando el catálogo ya obtenido arriba
    const mapServicios = Object.fromEntries(
        catalogoServicios?.map(s => [s.id_servicio, s.nombre]) || []
    );


    const resultado: EventoRecomendado[] = eventosConPuntuacion.map(e => {
        const idsServicios = e.tbl_evento_servicios?.map((es: any) => es.id_servicio) ?? [];
        const nombresCategorias = idsServicios.map((id: number) => mapServicios[id] || 'Servicio');
        const COLORES = ['midnight-blue', 'euphoric-pink', 'electric-violet', 'confetti-orange', 'mint-neon'];
        const coloresMezclados = [...COLORES].sort(() => Math.random() - 0.5);


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
            categorias_evento: nombresCategorias.map((nombre, index) => ({
                label: nombre,
                variant: coloresMezclados[index % coloresMezclados.length]
            })),
            rangoPrecio: e.presupuesto_min && e.presupuesto_max
                ? `L${Number(e.presupuesto_min).toFixed(0)}k-L${Number(e.presupuesto_max).toFixed(0)}k`
                : 'Precio a convenir',
            puntuacion: e.puntuacion,
        };
    });

    return resultado;
}