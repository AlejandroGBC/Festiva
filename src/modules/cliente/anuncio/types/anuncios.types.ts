/**
 * Ubicación sugerida:
 *   src/modules/cliente/anuncio/types/anuncios.types.ts
 */

export interface PropuestaIA {
  tipo_evento?: string;
  fecha?: string;
  num_invitados?: number;
  presupuesto_min?: number;
  presupuesto_max?: number;
  ciudad?: string;
  lugar?: string;
  tematica?: string;
  descripcion_optimizada?: string;
  servicios_sugeridos?: string[];
}