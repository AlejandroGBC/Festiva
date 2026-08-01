"use client";

import { useState } from "react";
import Sidebar from "@/shared/components/Sidebar";
import Loading from "@/shared/components/Loading";
import BuscarInput from "@/modules/proveedor/buscar/components/BuscarInput";
import FiltrosRapidos from "@/modules/proveedor/buscar/components/FiltrosRapidos";
import EventosDisponiblesList from "@/modules/proveedor/buscar/components/EventosDisponiblesList";
import { EventoDisponible } from "@/shared/types/buscar-proveedor.types";
import { useAuthContext } from "@/lib/context/auth-context";
import HeaderSeccion from "@/shared/components/HeaderSeccion";

// TODO: reemplazar por datos reales de /api/proveedor/eventos-disponibles
const eventosDisponibles: EventoDisponible[] = [
  {
    id: "1",
    titulo: "Boda de Ana y Luis",
    fecha: "24 ago, 2026",
    ubicacion: "DC",
    cantidadPersonas: 200,
    categorias: [
      { label: "Decoracion", variant: "pink" },
      { label: "Fotografia", variant: "violet" },
      { label: "Catering", variant: "orange" },
    ],
    descripcion: "Boda romantica estilo jardines, flores naturales blancas y verdes, iluminacion calida...",
    presupuesto: "L15k-L25k HN",
    estado: { tipo: "nuevo", label: "Nuevo" },
  },
  {
    id: "2",
    titulo: "XV Anos de Sophia",
    fecha: "14 jun, 2026",
    ubicacion: "Tegucigalpa",
    cantidadPersonas: 120,
    categorias: [
      { label: "Decoracion", variant: "pink" },
      { label: "Musica", variant: "mint" },
    ],
    descripcion: "Estilo bohemio con flores pampas, luces de hadas, salon interior con terraza...",
    presupuesto: "L10k-L18k HN",
    estado: { tipo: "vence_pronto", label: "Vence en 5d" },
  },
];

export default function BuscarProveedorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const { user, isLoading, signOut } = useAuthContext();

  if (isLoading) return <Loading fullScreen label="Cargando..." />;

  return (
    <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar w-full">
      <section>
        <HeaderSeccion
          titulo="Explorar eventos"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          user={user!}
          signOut={signOut}
        />

        <section className="px-5 flex flex-col gap-4 flex-1 min-h-0">
          <BuscarInput value={busqueda} onChange={setBusqueda} />
          <FiltrosRapidos filtroActivo={filtroActivo} onFiltroChange={setFiltroActivo} />
          <EventosDisponiblesList eventos={eventosDisponibles} />
        </section>
      </section>

    </div>
  );
}