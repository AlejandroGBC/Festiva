"use client";

import { useState } from "react";
import { Clock, Send, Save } from "lucide-react";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Textarea from "@/shared/components/Textarea";
import { EnviarPropuestaHeader } from "@/modules/proveedor/buscar/components/EnviarPropuestaHeader";
import { ResumenEventoCard } from "@/modules/proveedor/buscar/components/ResumenEventoCard";
import { PrecioPropuestaInput } from "@/modules/proveedor/buscar/components/PrecioPropuestaInput";
import { ServicioIncluidoItem } from "@/modules/proveedor/buscar/components/ServicioIncluidoItem";
import type { EventoDisponible } from "@/shared/types/buscar-proveedor.types";
import type { ServicioIncluido } from "@/shared/types/enviar-propuesta-proveedor.types";

// TODO: reemplazar por fetch real del evento (params.id) a TBL_EVENTOS
const eventoMock: EventoDisponible = {
  id: "1",
  titulo: "Boda de Ana y Luis",
  fecha: "24 agosto, 2025",
  ubicacion: "CDMX",
  cantidadPersonas: 200,
  categorias: [{ label: "Decoración", variant: "violet" }],
  descripcion: "",
  presupuesto: "L15k-L25k HN",
};

const serviciosIniciales: ServicioIncluido[] = [
  { id: "1", titulo: "Decoración floral completa", descripcion: "Centro de mesas y arco principal", incluido: true },
  { id: "2", titulo: "Iluminación LED", descripcion: "Ambiente, pista y proyecciones", incluido: true },
  { id: "3", titulo: "Montaje y desmontaje", descripcion: "Incluido sin costo adicional", incluido: true },
  { id: "4", titulo: "Mobiliario adicional", descripcion: "Sillas y mesas extra", incluido: false },
];

export default function EnviarPropuestaPage({ params }: { params: { id: string } }) {
  const [precio, setPrecio] = useState(18500);
  const [servicios, setServicios] = useState(serviciosIniciales);
  const [montajeHoras, setMontajeHoras] = useState(4);
  const [servicioHoras, setServicioHoras] = useState(8);
  const [mensaje, setMensaje] = useState("");

  const toggleServicio = (id: string) => {
    setServicios((prev) => prev.map((s) => (s.id === id ? { ...s, incluido: !s.incluido } : s)));
  };

  return (
    <>
      <div className="shrink-0 bg-white">
        <EnviarPropuestaHeader />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar w-full px-5 pt-2 pb-10 flex flex-col gap-5">
        <ResumenEventoCard evento={eventoMock} />

        <PrecioPropuestaInput precio={precio} onChange={setPrecio} comisionPorcentaje={8} />

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

        <div className="bg-white rounded-3xl shadow-sm p-5">
          <p className="font-bold text-festiva-midnight-blue mb-3">Tiempo de servicio</p>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Montaje"
              icon={Clock}
              type="number"
              value={montajeHoras}
              onChange={(e) => setMontajeHoras(Number(e.target.value))}
              variant="monochromatic"
            />
            <Input
              label="Servicio"
              icon={Clock}
              type="number"
              value={servicioHoras}
              onChange={(e) => setServicioHoras(Number(e.target.value))}
              variant="monochromatic"
            />
          </div>
        </div>

        <Textarea
          label="Mensaje personalizado al cliente"
          placeholder="Presenta tu propuesta, menciona tu experiencia, puntos diferenciales y disponibilidad para una llamada..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />

        <div className="flex flex-col gap-3 mt-2">
          <Button variant="secondary" size="lg" shape="pill" className="w-full">
            <Send size={18} />
            Enviar propuesta
          </Button>
          <Button variant="light" size="lg" shape="pill" className="w-full">
            <Save size={18} />
            Guardar como borrador
          </Button>
        </div>
      </div>
    </>
  );
}