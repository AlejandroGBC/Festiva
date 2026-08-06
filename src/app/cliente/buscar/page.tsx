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