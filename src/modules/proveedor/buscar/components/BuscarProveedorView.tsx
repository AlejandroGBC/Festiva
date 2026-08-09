"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import Sidebar from "@/shared/components/Sidebar";
import HeaderSeccion from "@/shared/components/HeaderSeccion";
import BuscarInput from "@/modules/proveedor/buscar/components/BuscarInput";
import FiltrosRapidos, { FiltroRapido } from "@/modules/proveedor/buscar/components/FiltrosRapidos";
import EventosDisponiblesList from "@/modules/proveedor/buscar/components/EventosDisponiblesList";
import { useAuthContext } from "@/lib/context/auth-context";
import type { EventoDisponible } from "@/shared/types/buscar-proveedor.types";
import { clienteLinks, proveedorLinks } from "@/shared/constant/sidebarLinks";

interface BuscarProveedorViewProps {
  eventosIniciales: EventoDisponible[];
  error: string | null;
}

export default function BuscarProveedorView({ eventosIniciales, error }: BuscarProveedorViewProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroActivo, setFiltroActivo] = useState<FiltroRapido>("todos");
  const { user, signOut } = useAuthContext();
  const mainLinks = user?.rol === "cliente" ? clienteLinks : proveedorLinks;


  const eventosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return eventosIniciales.filter((evento) => {
      const coincideTexto =
        texto === "" ||
        evento.titulo.toLowerCase().includes(texto) ||
        evento.ubicacion.toLowerCase().includes(texto) ||
        evento.categorias.some((c) => c.label.toLowerCase().includes(texto));

      if (!coincideTexto) return false;

      if (filtroActivo === "vence_pronto") {
        return evento.estado?.tipo === "vence_pronto";
      }

      if (filtroActivo === "este_mes") {
        // La fecha ya viene formateada como texto ("24 ago, 2026"), así
        // que comparamos por el mes actual en formato corto es-HN.
        const mesActual = new Intl.DateTimeFormat("es-HN", { month: "short" })
          .format(new Date())
          .replace(".", "");
        return evento.fecha.toLowerCase().includes(mesActual.toLowerCase());
      }

      return true;
    });
  }, [eventosIniciales, busqueda, filtroActivo]);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar w-full">
      <section>
        <HeaderSeccion titulo="Explorar eventos" onMenuClick={() => setSidebarOpen(true)} />

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user!} signOut={signOut} mainLinks={mainLinks} />

        <section className="px-5 flex flex-col gap-4 flex-1 min-h-0">
          <BuscarInput value={busqueda} onChange={setBusqueda} />
          <FiltrosRapidos filtroActivo={filtroActivo} onFiltroChange={setFiltroActivo} />

          {error ? (
            <div className="flex flex-col items-center gap-2 py-10 text-center">
              <AlertCircle size={24} className="text-red-400" />
              <p className="text-sm text-gray-400">{error}</p>
            </div>
          ) : (
            <EventosDisponiblesList eventos={eventosFiltrados} />
          )}
        </section>
      </section>
    </div>
  );
}