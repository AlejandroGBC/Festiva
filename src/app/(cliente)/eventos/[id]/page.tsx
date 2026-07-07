import { DetalleEventoHeader } from "@/modules/cliente/eventos/components/DetalleEventoHeader";
import { ProveedorContratadoCard } from "@/modules/cliente/eventos/components/ProveedorContratadoCard";
import { TimelineItem } from "@/modules/cliente/eventos/components/TimelineItem";
import { ChatRapidoCard } from "@/modules/cliente/eventos/components/ChatRapidoCard";
import type { TimelinePaso, ProveedorContratado } from "@/modules/cliente/eventos/types/eventos.types";

// TODO: reemplazar por fetch real a eventos.service.ts cuando conectemos Supabase
const proveedoresMock: ProveedorContratado[] = [
  { id: "1", nombreComercial: "Decos Mágicos", iniciales: "DM", servicio: "Decoración", monto: 8500, estado: "confirmado" },
  { id: "2", nombreComercial: "Lens Studio", iniciales: "LS", servicio: "Fotografía", monto: 14000, estado: "pendiente" },
];

const pasosMock: TimelinePaso[] = [
  { titulo: "Evento publicado", descripcion: "Evento visible para proveedores", fecha: "15 mayo, 2026", status: "completado", icon: "check" },
  { titulo: "Ofertas recibidas", descripcion: "6 propuestas de proveedores", fecha: "18-25 mayo, 2026", status: "completado", icon: "check" },
  { titulo: "Proveedores seleccionados", descripcion: "2 de 3 servicios confirmados", fecha: "28 mayo, 2026", status: "actual", icon: "check" },
  { titulo: "Pago y confirmación", descripcion: "Pendiente de completar", fecha: "Próximo paso", status: "pendiente", icon: "calendar" },
  { titulo: "Evento realizado", descripcion: "", fecha: "10 julio, 2026", status: "pendiente", icon: "award" },
];

export default function DetalleEventoPage({ params }: { params: { id: string } }) {
  return (
    // -m-8 cancela el padding de 2rem heredado de .mobile-shell (globals.css)
    // así esta página controla su propio espaciado de borde a borde
    <div className="-m-8 min-h-screen">
      <DetalleEventoHeader
        titulo="Cumpleaños Carlos 40"
        fecha="10 julio, 2026"
        ubicacion="Tegucigalpa"
        progreso={65}
      />

      <div className="px-5 pt-6 pb-24 flex flex-col gap-8">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-festiva-midnight-blue">Proveedores contratados</h2>
            <button type="button" className="text-sm font-semibold text-festiva-euphoric-pink">
              Ver todos
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {proveedoresMock.map((proveedor) => (
              <ProveedorContratadoCard key={proveedor.id} proveedor={proveedor} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-festiva-midnight-blue mb-4">Timeline del evento</h2>
          <div className="flex flex-col">
            {pasosMock.map((paso, index) => (
              <TimelineItem key={paso.titulo} {...paso} esUltimo={index === pasosMock.length - 1}>
                {paso.titulo === "Proveedores seleccionados" && <ChatRapidoCard />}
              </TimelineItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}