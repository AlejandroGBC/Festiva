import BuscarProveedorView from "@/modules/proveedor/buscar/components/BuscarProveedorView";
import { getEventosDisponibles } from "@/modules/proveedor/buscar/service/buscar.service";

export default async function BuscarProveedorPage() {
  try {
    const eventos = await getEventosDisponibles();
    return <BuscarProveedorView eventosIniciales={eventos} error={null} />;
  } catch (err) {
    const mensaje = err instanceof Error ? err.message : "No se pudieron cargar los eventos";
    return <BuscarProveedorView eventosIniciales={[]} error={mensaje} />;
  }
}