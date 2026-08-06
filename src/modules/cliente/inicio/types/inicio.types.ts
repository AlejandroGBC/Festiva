/**
 * Ubicación sugerida:
 *   src/modules/cliente/inicio/types/inicio.types.ts
 *
 * IMPORTANTE: este tipo viaja de un Server Component (page.tsx) a un
 * Client Component (InicioView/CategoriasView) — por eso NO puede
 * incluir el ícono (una función/componente React no es serializable
 * a través de ese límite). El ícono se resuelve del lado del cliente
 * con obtenerIconoServicio(nombre).
 */

export interface CategoriaInicio {
  id: string;
  nombre: string;
}