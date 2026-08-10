"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import Button from "@/shared/components/Button";
import Textarea from "@/shared/components/Textarea";
import { EnviarPropuestaHeader } from "@/modules/proveedor/buscar/components/EnviarPropuestaHeader";
import { ResumenEventoCard } from "@/modules/proveedor/buscar/components/ResumenEventoCard";
import { PrecioPropuestaInput } from "@/modules/proveedor/buscar/components/PrecioPropuestaInput";
import { ServicioIncluidoItem } from "@/modules/proveedor/buscar/components/ServicioIncluidoItem";
import type { EventoParaPropuesta } from "@/shared/types/enviar-propuesta-proveedor.types";
import type { ServicioIncluido } from "@/shared/types/enviar-propuesta-proveedor.types";
import { enviarPropuesta } from "../service/enviar-propuesta.service";
import { DetalleEventoPropuestaCard } from "./DetalleEventoPropuestaCard";

interface EnviarPropuestaViewProps {
  evento: EventoParaPropuesta;
}

export default function EnviarPropuestaView({ evento }: EnviarPropuestaViewProps) {
  const router = useRouter();

  const [precio, setPrecio] = useState(0);
  const [servicios, setServicios] = useState<ServicioIncluido[]>(
    evento.serviciosDisponibles.map((s) => ({
      id: String(s.id_servicio),
      titulo: s.nombre,
      descripcion: "",
      incluido: true, // por defecto, todo lo que el evento pidió y el proveedor ofrece va marcado
    }))
  );
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const toggleServicio = (id: string) => {
    setServicios((prev) => prev.map((s) => (s.id === id ? { ...s, incluido: !s.incluido } : s)));
  };

  async function handleEnviar() {
    const serviciosSeleccionados = servicios.filter((s) => s.incluido).map((s) => Number(s.id));

    if (serviciosSeleccionados.length === 0) {
      setError("Seleccioná al menos un servicio para incluir en la propuesta");
      return;
    }
    if (precio <= 0) {
      setError("El precio debe ser mayor a cero");
      return;
    }

    setEnviando(true);
    setError("");
    try {
      await enviarPropuesta({
        id_evento: evento.id_evento,
        precio_total: precio,
        mensaje,
        servicios_incluidos: serviciosSeleccionados,
      });
      router.push("/proveedor/eventos"); //seria este, para mostrar las propuestas enviadas
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar la propuesta");
      setEnviando(false);
    }
  }

  return (
    <>
      <div className="shrink-0 bg-white">
        <EnviarPropuestaHeader />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar w-full px-5 pt-2 pb-10 flex flex-col gap-5">
        <ResumenEventoCard evento={evento} />

        <DetalleEventoPropuestaCard evento={evento} />

        <PrecioPropuestaInput precio={precio} onChange={setPrecio} comisionPorcentaje={7} />

        <div className="bg-white rounded-3xl shadow-sm p-5">
          <p className="font-bold text-festiva-midnight-blue mb-2">Servicios que incluyes</p>
          <div className="flex flex-col">
            {servicios.map((servicio, index) => (
              <ServicioIncluidoItem
                key={servicio.id}
                servicio={servicio}
                onToggle={() => toggleServicio(servicio.id)}
                esUltimo={index === servicios.length - 1}
              />
            ))}
          </div>
        </div>

        <Textarea
          label="Mensaje personalizado al cliente"
          placeholder="Presenta tu propuesta, menciona tu experiencia, puntos diferenciales y disponibilidad para una llamada..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <div className="flex flex-col gap-3 mt-2">
          <Button
            variant="secondary"
            size="lg"
            shape="pill"
            className="w-full"
            disabled={enviando}
            onClick={handleEnviar}
          >
            <Send size={18} />
            {enviando ? "Enviando..." : "Enviar propuesta"}
          </Button>
        </div>
      </div>
    </>
  );
}