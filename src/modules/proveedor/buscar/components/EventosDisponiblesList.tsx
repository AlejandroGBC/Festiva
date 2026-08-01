import EventoDisponibleCard from "./EventoDisponibleCard";
import { EventoDisponible } from "../../../../shared/types/buscar-proveedor.types";

export default function EventosDisponiblesList({ eventos }: { eventos: EventoDisponible[] }) {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar w-full pb-5 gap-3">
      {eventos.map((evento) => (
        <EventoDisponibleCard key={evento.id} evento={evento} />
      ))}
    </div>
  );
}