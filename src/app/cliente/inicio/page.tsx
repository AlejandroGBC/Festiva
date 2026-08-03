/**
 * Ubicación:
 *   src/app/cliente/inicio/page.tsx
 */

<<<<<<< HEAD
import { getCategoriasInicio } from "@/modules/cliente/inicio/services/inicio.service";
import { getProveedoresDestacados } from "@/modules/cliente/proveedores/services/proveedores-destacados.service";
import { contarNotificacionesNuevas } from "@/modules/cliente/notificaciones/services/notificaciones-list.service";
import InicioView from "@/modules/cliente/inicio/components/InicioView";
=======
import SearchBar from "@/shared/components/SearchBar";
import HeroBanner from "@/shared/components/HeroBanner";
import { Plus } from "lucide-react"
import { servicios } from "@/shared/mocks/servicios";
import { IconTile } from "@/shared/components/IconTile";
import SectionHeader from "@/shared/components/SectionHeader";
import { proveedoresDestacados } from "@/shared/mocks/proveedoresDestacados";
import { ProviderCard } from "@/shared/components/ProviderCard";
import Header from "@/shared/components/HeaderInicio";
import Sidebar from "@/shared/components/Sidebar";
import { useState } from "react";
import { useAuthContext } from "@/lib/context/auth-context";
import Loading from "@/shared/components/Loading";
>>>>>>> upstream/main

export default async function InicioPage() {
  const [categorias, proveedoresDestacados, notificacionesNuevas] = await Promise.all([
    getCategoriasInicio(5),
    getProveedoresDestacados(2),
    contarNotificacionesNuevas(),
  ]);

<<<<<<< HEAD
  return (
    <InicioView
      categorias={categorias}
      proveedoresDestacados={proveedoresDestacados}
      tieneNotificacionesNuevas={notificacionesNuevas > 0}
    />
  );
}
=======
export default function InicioPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {user, isLoading, signOut} = useAuthContext()

    if (isLoading) return <Loading fullScreen label="Cargando..." />;

    return (
        <div className="flex-1 overflow-y-auto no-scrollbar w-full">
            
            <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar w-full pb-10 gap-3">
                <Header user={user!} onMenuClick={() => setSidebarOpen(true)} />

                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    user={user!}
                    signOut={signOut}
                />

                <section className="px-5">
                    <div className="pb-7 ">
                        <p className="text-festiva-midnight-blue/45 text-sm pb-2">Buenos dias</p>
                        <h1 className="text-festiva-midnight-blue font-bold text-3xl">{user?.nombre}</h1>
                    </div>
                    <SearchBar showButton placeholder="Buscar proveedores o servicios" />
                    <HeroBanner title="Publica tu evento y recibe propuestas" description="Los mejores proveedores compiten por tu evento">
                        <button className="flex items-center gap-2 font-semibold text-white bg-festiva-euphoric-pink px-[1.125rem] py-[0.625rem] rounded-[999px] ">
                            <Plus size={16} />
                            Nuevo evento
                        </button>
                    </HeroBanner>

                    <article className="my-6">
                        <SectionHeader title="Categorias" accion="Ver todos" href="/cliente/categorias" />
                        <div className="flex justify-between text-center items-center">
                            {servicios.slice(0, 5).map((servicio) => (
                                <IconTile
                                    key={servicio.id}
                                    nombre={servicio.nombre}
                                    Icon={servicio.icon}
                                    iconColor={servicio.color.text}
                                    bgColor={servicio.color.bg}
                                />))}
                        </div>
                    </article>
                    <article className="my-6">
                        <SectionHeader title="Proveedores destacados" accion="Ver todos" />
                        <div className="flex justify-between">
                            {proveedoresDestacados.slice(0, 2).map((proveedor) =>
                                <ProviderCard key={proveedor.id} nombre={proveedor.nombre} categoria={proveedor.categoria} calificacion={proveedor.calificacion}
                                    cantidadCalificaciones={proveedor.cantidadCalificaciones} precio={proveedor.precioContratacion}
                                    img={proveedor.link} />
                            )}
                        </div>
                    </article>
                </section>
                
            </div>
            
        </div>
        
    );
}
>>>>>>> upstream/main
