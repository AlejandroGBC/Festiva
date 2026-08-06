/**
 * Ubicación:
 *   src/app/cliente/buscar/page.tsx
 *
 * Precarga categorías completas (para los chips de filtro) y una lista
 * inicial de proveedores (reusa getProveedoresDestacados con un límite
 * más alto) para que la pantalla no arranque vacía antes de que el
 * usuario escriba algo.
 */



import { getCategoriasInicio } from "@/modules/cliente/inicio/services/inicio.service";
import { getProveedoresDestacados } from "@/modules/cliente/proveedores/services/proveedores-destacados.service";
import { contarNotificacionesNuevas } from "@/modules/cliente/notificaciones/services/notificaciones-list.service";
import BuscarProveedoresVista from "@/modules/cliente/proveedores/components/BuscarProveedoresVista";

export default async function BuscarPage() {
  const [categorias, resultadosIniciales, notificacionesNuevas] = await Promise.all([
    getCategoriasInicio(50), // todas, no solo 5 (acá no hay límite de espacio en pantalla)
    getProveedoresDestacados(10),
    contarNotificacionesNuevas(),
  ]);

  return (
    <BuscarProveedoresVista
      categorias={categorias}
      resultadosIniciales={resultadosIniciales}
      tieneNotificacionesNuevas={notificacionesNuevas > 0}
    />
  );
}