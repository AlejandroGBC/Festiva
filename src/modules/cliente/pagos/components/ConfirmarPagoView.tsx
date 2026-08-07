"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Lock, CreditCard, Store } from "lucide-react";
import Button from "@/shared/components/Button";
import SectionTitle from "@/shared/components/SectionTitle";
import Card from "@/shared/components/Card";
import { MetodoPagoOption } from "@/modules/cliente/pagos/components/MetodoPagoOption";
import { AgregarTarjetaButton } from "@/modules/cliente/pagos/components/AgregarTarjetaButton";
import { confirmarPago } from "@/modules/cliente/pagos/services/confirmar-pago.service";
import type { ResumenPago, MetodoPago } from "@/shared/types/pagos-cliente.types";

// Métodos de pago simulados (no hay gateway real por ahora)
const METODOS_SIMULADOS: MetodoPago[] = [
  { id: "1", marca: "visa", ultimosDigitos: "4821", vencimiento: "09/27" },
  { id: "2", marca: "mastercard", ultimosDigitos: "2394", vencimiento: "03/28" },
];

interface ConfirmarPagoViewProps {
  resumen: ResumenPago;
}

export default function ConfirmarPagoView({ resumen }: ConfirmarPagoViewProps) {
  const router = useRouter();
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(METODOS_SIMULADOS[0].id);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");

  const metodoActual = METODOS_SIMULADOS.find((m) => m.id === metodoSeleccionado)!;

  async function handlePagar() {
    setProcesando(true);
    setError("");
    try {
      await confirmarPago({
        id_contratacion: resumen.id_contratacion,
        tarjeta_mascara: metodoActual.ultimosDigitos,
      });
      // Volver al detalle del evento y refrescar para ver el chip "Confirmado"
      router.push(`/cliente/eventos/${resumen.id_evento}`);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo procesar el pago");
      setProcesando(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar w-full">
      {/* Header */}
      <div className="flex items-center gap-4 px-5 pt-6 pb-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0"
        >
          <ChevronLeft size={20} className="text-festiva-midnight-blue" />
        </button>
        <h1 className="text-lg font-bold text-festiva-midnight-blue">Confirmar pago</h1>
      </div>

      <div className="px-5 pt-4 pb-10 flex flex-col gap-6">

        {/* Resumen del proveedor */}
        <div>
          <SectionTitle title="Resumen del pago" />
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-festiva-electric-violet/10 border border-festiva-electric-violet/20 flex items-center justify-center shrink-0">
                <Store size={20} className="text-festiva-electric-violet" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[14px] text-festiva-midnight-blue m-0 truncate">
                  {resumen.nombre_proveedor}
                </p>
                <p className="text-[12px] text-festiva-midnight-blue/50 m-0 mt-0.5">
                  {resumen.servicio}
                </p>
              </div>
              <span className="font-extrabold text-[15px] text-festiva-midnight-blue shrink-0">
                L{resumen.monto_total.toLocaleString("es-HN")} HN
              </span>
            </div>
          </Card>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-festiva-midnight-blue">Total a pagar</span>
          <span className="font-extrabold text-2xl text-festiva-midnight-blue">
            L{resumen.monto_total.toLocaleString("es-HN")} HN
          </span>
        </div>

        {/* Método de pago */}
        <div>
          <SectionTitle title="Método de pago" />
          <div className="flex flex-col gap-3">
            {METODOS_SIMULADOS.map((m) => (
              <MetodoPagoOption
                key={m.id}
                metodo={m}
                seleccionado={m.id === metodoSeleccionado}
                onSeleccionar={() => setMetodoSeleccionado(m.id)}
              />
            ))}
            <AgregarTarjetaButton />
          </div>
        </div>

        {/* Aviso SSL */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Lock size={14} className="text-festiva-mint-neon shrink-0" />
          Pago seguro. Tus datos están protegidos.
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        {/* Botón principal */}
        <Button
          variant="primary"
          size="lg"
          shape="pill"
          className="w-full"
          disabled={procesando}
          onClick={handlePagar}
        >
          <CreditCard size={18} />
          {procesando
            ? "Procesando..."
            : `Pagar L${resumen.monto_total.toLocaleString("es-HN")} HN`}
        </Button>

        <p className="text-xs text-center text-gray-400 leading-relaxed">
          Al confirmar aceptas los{" "}
          <span className="font-semibold text-festiva-electric-violet">
            Términos de pago
          </span>
          . El cargo se realizará de inmediato.
        </p>
      </div>
    </div>
  );
}
