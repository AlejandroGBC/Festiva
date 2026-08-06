// app/proveedor/propuestas/MisPropuestasView.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Propuesta, TabPropuestas } from "@/shared/types/propuestas-proveedor.types";
import { useAuthContext } from "@/lib/context/auth-context";
import HeaderSeccion from "@/shared/components/HeaderSeccion";
import { AlertCircle } from "lucide-react";
import { PropuestaCard } from "../../propuestas/components/PropuestaCard";
import { TabsPropuestas } from "../../propuestas/components/TabsPropuestas";
import Sidebar from "@/shared/components/Sidebar";


interface MisPropuestasViewProps {
  propuestasIniciales: Propuesta[];
  error: string | null;
}

export default function MisPropuestasView({ propuestasIniciales, error }: MisPropuestasViewProps) {
  const router = useRouter();
  const [tabActivo, setTabActivo] = useState<TabPropuestas>("enviadas");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuthContext();

  const propuestasFiltradas = propuestasIniciales.filter((p) => {
    if (tabActivo === "enviadas") return p.estado === "enviada";
    if (tabActivo === "aceptadas") return p.estado === "aceptada";
    return p.estado === "rechazada" || p.estado === "cancelada";
  });

  return (
    <>
      <div className="shrink-0 bg-white">
        <HeaderSeccion titulo="Mis propuestas" onMenuClick={() => setSidebarOpen(true)} />
        <TabsPropuestas tabActivo={tabActivo} onCambiarTab={setTabActivo} />
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user!} signOut={signOut} />

      <div className="flex-1 overflow-y-auto no-scrollbar w-full px-4 pt-4 pb-36 flex flex-col gap-4">
        {error ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <AlertCircle size={24} className="text-red-400" />
            <p className="text-sm text-gray-400">{error}</p>
          </div>
        ) : propuestasFiltradas.length > 0 ? (
          propuestasFiltradas.map((propuesta) => (
            <PropuestaCard
              key={propuesta.id}
              propuesta={propuesta}
              onChat={() => router.push(`/proveedor/chat/iniciar/${propuesta.id_evento}/${propuesta.id_cliente}`)}
              onVer={() => router.push(`/proveedor/eventos/${propuesta.id_evento}`)}
              onContactarCliente={() =>
                router.push(`/proveedor/chat/iniciar/${propuesta.id_evento}/${propuesta.id_cliente}`)
              }
            />
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