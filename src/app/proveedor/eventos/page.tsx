"use client";

import { useState } from "react";
import { TabsPropuestas } from "@/modules/proveedor/propuestas/components/TabsPropuestas";
import { PropuestaCard } from "@/modules/proveedor/propuestas/components/PropuestaCard";
import type { Propuesta, TabPropuestas } from "@/shared/types/propuestas-proveedor.types";
import HeaderSeccion from "@/shared/components/HeaderSeccion";
import Sidebar from "@/shared/components/Sidebar";
import Loading from "@/shared/components/Loading";
import { useAuthContext } from "@/lib/context/auth-context";

// TODO: reemplazar por fetch real a TBL_OFERTAS (proveedor autenticado) cuando conectemos Supabase
const propuestasMock: Propuesta[] = [
  {
    id: "1",
    tituloEvento: "Boda de Ana y Luis",
    ubicacion: "DC",
    fechaEvento: "24 ago, 2026",
    cantidadInvitados: 200,
    actividadReciente: "Enviada hace 2h",
    precioTotal: 18500,
    estado: "enviada",
    servicios: ["Decoración floral", "Iluminación LED"],
  },
  {
    id: "2",
    tituloEvento: "Cumpleaños Carlos 40",
    ubicacion: "Monterrey",
    fechaEvento: "10 jul, 2026",
    cantidadInvitados: 60,
    actividadReciente: "",
    precioTotal: 8500,
    estado: "aceptada",
    progresoPago: 45,
  },
  {
    id: "3",
    tituloEvento: "XV Años de Sophia",
    ubicacion: "Guadalajara",
    fechaEvento: "14 jun, 2026",
    cantidadInvitados: 120,
    actividadReciente: "Enviada hace 1 día",
    precioTotal: 12000,
    estado: "enviada",
  },
];

export default function MisPropuestasPage() {
  const [tabActivo, setTabActivo] = useState<TabPropuestas>("enviadas");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading, signOut } = useAuthContext();
  
  if (isLoading) return <Loading fullScreen label="Cargando..." />;

  const propuestasFiltradas = propuestasMock.filter((p) => {
    if (tabActivo === "enviadas") return p.estado === "enviada";
    if (tabActivo === "aceptadas") return p.estado === "aceptada";
    return p.estado === "rechazada" || p.estado === "cancelada";
  });

  return (
    <>
      <div className="shrink-0 bg-white">
      <HeaderSeccion
        titulo="Mis propuestas"
        onMenuClick={() => setSidebarOpen(true)}
      />
        <TabsPropuestas tabActivo={tabActivo} onCambiarTab={setTabActivo} />
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user!}
        signOut={signOut}
      />

      <div className="flex-1 overflow-y-auto no-scrollbar w-full px-4 pt-4 pb-36 flex flex-col gap-4">
        {propuestasFiltradas.length > 0 ? (
          propuestasFiltradas.map((propuesta) => (
            <PropuestaCard key={propuesta.id} propuesta={propuesta} />
          ))
        ) : (
          <p className="text-sm text-gray-400 text-center py-10">
            No tienes propuestas {tabActivo === "aceptadas" ? "aceptadas" : "rechazadas"} por ahora.
          </p>
        )}
      </div>

    </>
  );
}