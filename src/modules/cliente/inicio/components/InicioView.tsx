"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/inicio/components/InicioView.tsx
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import SearchBar from "@/shared/components/SearchBar";
import HeroBanner from "@/shared/components/HeroBanner";
import { IconTile } from "@/shared/components/IconTile";
import SectionHeader from "@/shared/components/SectionHeader";
import Header from "@/shared/components/HeaderInicio";
import Sidebar from "@/shared/components/Sidebar";
import Loading from "@/shared/components/Loading";
import { useAuthContext } from "@/lib/context/auth-context";
import { obtenerIconoServicio } from "@/shared/lib/servicio-icono";

import ProveedorTarjetaCard from "@/modules/cliente/proveedores/components/ProveedorTarjetaCard";
import type { CategoriaInicio } from "@/modules/cliente/inicio/types/inicio.types";
import type { ProveedorTarjeta } from "@/modules/cliente/proveedores/types/proveedor.types";

interface InicioViewProps {
  categorias: CategoriaInicio[];
  proveedoresDestacados: ProveedorTarjeta[];
  tieneNotificacionesNuevas?: boolean;
}

export default function InicioView({
  categorias,
  proveedoresDestacados,
  tieneNotificacionesNuevas,
}: InicioViewProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading, signOut } = useAuthContext();

  if (isLoading) return <Loading fullScreen label="Cargando..." />;

  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar">
      <Header
        user={user!}
        onMenuClick={() => setSidebarOpen(true)}
        tieneNotificacionesNuevas={tieneNotificacionesNuevas}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user!}
        signOut={signOut}
      />

      <section className="px-5 flex flex-col flex-1 w-full">
        <div className="pb-7">
          <p className="text-festiva-midnight-blue/45 text-sm pb-2">Buenos días</p>
          <h1 className="text-festiva-midnight-blue font-bold text-3xl">{user?.nombre}</h1>
        </div>

        <div onClick={() => router.push("/cliente/buscar")}>
          <SearchBar showButton placeholder="Buscar proveedores o servicios" />
        </div>

        <HeroBanner
          title="Publica tu evento y recibe propuestas"
          description="Los mejores proveedores compiten por tu evento"
        >
          <button
            onClick={() => router.push("/cliente/eventos/crear")}
            className="flex items-center gap-2 font-semibold text-white bg-festiva-euphoric-pink px-[1.125rem] py-[0.625rem] rounded-[999px]"
          >
            <Plus size={16} />
            Nuevo evento
          </button>
        </HeroBanner>

        {categorias.length > 0 && (
          <article className="my-6">
            <div onClick={() => router.push("/cliente/categorias")} className="cursor-pointer">
              <SectionHeader title="Categorías" accion="Ver todos" />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {categorias.map((cat) => {
                const { Icon, color } = obtenerIconoServicio(cat.nombre);
                return (
                  <IconTile
                    key={cat.id}
                    nombre={cat.nombre}
                    Icon={Icon}
                    iconColor={color.text}
                    bgColor={color.bg}
                  />
                );
              })}
            </div>
          </article>
        )}

        {proveedoresDestacados.length > 0 && (
          <article className="my-6">
            <div onClick={() => router.push("/cliente/buscar")} className="cursor-pointer">
              <SectionHeader title="Proveedores destacados" accion="Ver todos" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {proveedoresDestacados.map((proveedor) => (
                <ProveedorTarjetaCard
                  key={proveedor.id_proveedor}
                  proveedor={proveedor}
                  onClick={() => router.push(`/cliente/proveedores/${proveedor.id_proveedor}`)}
                />
              ))}
            </div>
          </article>
        )}
      </section>

    </div>
  );
}