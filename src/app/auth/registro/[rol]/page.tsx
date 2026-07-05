import { RegistroCliente } from "@/modules/auth/registro/components/RegistroCliente";
import { Roles } from "@/modules/auth/types/login.types";

export default function RegistroPage({ params }: { params: { rol: Roles } }) {
  const { rol } = params;
  
  return (
    <>
      {rol === "cliente" && (
        <RegistroCliente/>
      )}

      {rol === "proveedor" && (
        <div>
          <h1>Registro de Proveedor</h1>
        </div>
      )}

      {rol === "admin" && (
        <div>
          <h1>Registro de Administrador</h1>
        </div>
      )}
    </>
  );
}