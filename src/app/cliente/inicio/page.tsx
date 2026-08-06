import { contarNotificacionesNuevas } from "@/modules/cliente/notificaciones/services/notificaciones-list.service";
import InicioView from "@/modules/cliente/inicio/components/InicioView";
import { getCategoriasInicio } from "@/modules/cliente/inicio/services/inicio.service";
import { getProveedoresDestacados } from "@/modules/cliente/proveedores/services/proveedores-destacados.service";


export default async function InicioPage() {
  const [categorias, proveedoresDestacados, notificacionesNuevas] = await Promise.all([
    getCategoriasInicio(5),
    getProveedoresDestacados(2),
    contarNotificacionesNuevas(),
  ]);

  return (
    <InicioView
      categorias={categorias}
      proveedoresDestacados={proveedoresDestacados}
      tieneNotificacionesNuevas={notificacionesNuevas > 0}
    />
  );
}
