import { RolUsuario } from "@/shared/types/auth.types";

export function routeGeneratorOverLogin(userRol: RolUsuario){
    const ruta = userRol === "cliente" ? "/cliente/inicio" : `/proveedor/editar`; //temporales
    return ruta;
}