import { RegistroCliente } from "@/modules/auth/registro/components/RegistroCliente";
import RegistroProveedorPage from "@/modules/auth/registro/components/RegistroProveedor";
import { Roles } from "@/modules/auth/types/login.types";

export default function RegistroPage({ params }: { params: { rol: Roles } }) {
  const { rol } = params;  
  
  return (
    <>
      {rol === "cliente" && <RegistroCliente/>}
      {rol === "proveedor" && <RegistroProveedorPage/>}
      {rol === "admin" && (
        <div>
          <h1>Registro de Administrador</h1>
        </div>
      )}
    </>
  );
}