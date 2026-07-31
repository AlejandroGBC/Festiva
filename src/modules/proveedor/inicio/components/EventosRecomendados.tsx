import Link from "next/link";
import EventoRecomendadoCard from "./EventoRecomendadoCard";
import { EventoRecomendado } from "@/shared/types/inicio-proveedor.types";

interface EventosRecomendadosProps {
  eventos: EventoRecomendado[];
}

export default function EventosRecomendados({ eventos }: EventosRecomendadosProps) {
  return (
    <article className="my-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-festiva-midnight-blue">Eventos recomendados</h2>
        <Link href="/proveedor/buscar" className="text-sm font-semibold text-festiva-euphoric-pink">
          Explorar todos
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {eventos.map((evento) => (
          <EventoRecomendadoCard key={evento.id} evento={evento} />
        ))}
      </div>
    </article>
  );
}