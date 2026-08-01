import { RolUsuario } from "@/shared/types/auth.types";

export function routeGeneratorOverLogin(userRol: RolUsuario){
    const ruta = userRol === "cliente" ? "/cliente/inicio" : `/proveedor/inicio`;
    return ruta;
}