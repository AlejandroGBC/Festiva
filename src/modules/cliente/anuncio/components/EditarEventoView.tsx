"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/anuncio/components/EditarEventoView.tsx
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, AlertCircle } from "lucide-react";

import TopNavbar from "@/shared/components/TopNavbar";
import Card from "@/shared/components/Card";
import Input from "@/shared/components/Input";
import Textarea from "@/shared/components/Textarea";
import Button from "@/shared/components/Button";

import { actualizarEvento } from "@/modules/cliente/anuncio/services/evento-gestion.service";
import type { EventoDetalle } from "@/modules/cliente/anuncio/types/evento-detalle.types";

interface EditarEventoViewProps {
  evento: EventoDetalle;
}

export default function EditarEventoView({ evento }: EditarEventoViewProps) {
  const router = useRouter();
  const [titulo, setTitulo] = useState(evento.titulo);
  const [descripcion, setDescripcion] = useState(evento.descripcion);
  const [fecha, setFecha] = useState(evento.fecha_evento);
  const [ubicacion, setUbicacion] = useState(evento.ubicacion);
  const [invitados, setInvitados] = useState(String(evento.cantidad_invitados));
  const [presupuestoMin, setPresupuestoMin] = useState(
    evento.presupuesto_min ? String(evento.presupuesto_min) : ""
  );
  const [presupuestoMax, setPresupuestoMax] = useState(
    evento.presupuesto_max ? String(evento.presupuesto_max) : ""
  );
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  async function handleGuardar() {
    setGuardando(true);
    setError("");
    try {
      await actualizarEvento(evento.id_evento, {
        titulo,
        descripcion,
        fecha_evento: fecha,
        ubicacion,
        cantidad_invitados: Number(invitados),
        presupuesto_min: presupuestoMin ? Number(presupuestoMin) : null,
        presupuesto_max: presupuestoMax ? Number(presupuestoMax) : null,
      });
      router.push(`/cliente/eventos/${evento.id_evento}`);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="min-h-dvh bg-[#F5F2FA] flex flex-col">
      <TopNavbar title="Editar evento" />

      <main className="flex-1 px-5 pb-8 lg:max-w-2xl lg:mx-auto lg:w-full">
        <Card className="mt-4">
          <div className="flex flex-col gap-4">
            <Input label="Nombre del evento" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Input
                label="Fecha del evento"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
              <Input
                label="Número de invitados"
                type="number"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
              />
            </div>

            <Input label="Ubicación" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Input
                label="Presupuesto mínimo"
                value={presupuestoMin}
                onChange={(e) => setPresupuestoMin(e.target.value)}
                placeholder="L. 50,000"
              />
              <Input
                label="Presupuesto máximo"
                value={presupuestoMax}
                onChange={(e) => setPresupuestoMax(e.target.value)}
                placeholder="L. 90,000"
              />
            </div>

            <Textarea
              label="Descripción"
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 mt-4 px-3.5 py-2.5 rounded-xl bg-red-500/5 border border-red-500/15">
              <AlertCircle size={14} className="text-red-500 shrink-0" />
              <p className="text-xs text-red-500 m-0">{error}</p>
            </div>
          )}

          <div className="flex gap-3 mt-5">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => router.push(`/cliente/eventos/${evento.id_evento}`)}
            >
              Cancelar
            </Button>
            <Button variant="primary" className="flex-[2]" disabled={guardando} onClick={handleGuardar}>
              {guardando ? (
                "Guardando..."
              ) : (
                <>
                  <Check size={16} />
                  Guardar cambios
                </>
              )}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}