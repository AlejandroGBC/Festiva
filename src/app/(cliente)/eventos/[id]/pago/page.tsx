"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Sparkles, Camera, Percent, Lock, CreditCard } from "lucide-react";
import Button from "@/shared/components/Button";
import SectionTitle from "@/shared/components/SectionTitle";
import { ResumenPagoCard } from "@/modules/cliente/pagos/components/ResumenPagoCard";
import { MetodoPagoOption } from "@/modules/cliente/pagos/components/MetodoPagoOption";
import { AgregarTarjetaButton } from "@/modules/cliente/pagos/components/AgregarTarjetaButton";
import type { ItemResumenPago, MetodoPago } from "@/modules/cliente/pagos/types/pagos.types";

// TODO: reemplazar por fetch real (join TBL_CONTRATACIONES + TBL_PAGOS + TBL_OFERTAS) cuando conectemos Supabase
const itemsResumenMock: ItemResumenPago[] = [
  { id: "1", nombre: "Decos Mágicos", monto: 18500, icon: Sparkles },
  { id: "2", nombre: "Lens Studio", monto: 22000, icon: Camera },
  { id: "3", nombre: "Comisión Festiva (10%)", monto: 4050, icon: Percent, destacado: true },
];

const metodosMock: MetodoPago[] = [
  { id: "1", marca: "visa", ultimosDigitos: "4821", vencimiento: "09/25" },
  { id: "2", marca: "mastercard", ultimosDigitos: "2394", vencimiento: "03/26" },
];

const totalAPagar = itemsResumenMock.reduce((acc, item) => acc + item.monto, 0);

export default function ConfirmarPagoPage() {
  const router = useRouter();
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(metodosMock[0].id);

  return (
    <div>
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
        <div>
          <SectionTitle title="Resumen del pago" />
          <ResumenPagoCard items={itemsResumenMock} />
        </div>

        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-festiva-midnight-blue">Total a pagar</span>
          <span className="font-extrabold text-2xl text-festiva-midnight-blue">
            L{totalAPagar.toLocaleString("es-HN")} HN
          </span>
        </div>

        <div>
          <SectionTitle title="Método de pago" />
          <div className="flex flex-col gap-3">
            {metodosMock.map((metodo) => (
              <MetodoPagoOption
                key={metodo.id}
                metodo={metodo}
                seleccionado={metodo.id === metodoSeleccionado}
                onSeleccionar={() => setMetodoSeleccionado(metodo.id)}
              />
            ))}
            <AgregarTarjetaButton />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Lock size={14} className="text-festiva-mint-neon shrink-0" />
          Pago cifrado con SSL 256-bit. Tus datos están seguros.
        </div>

        <Button variant="primary" size="lg" shape="pill" className="w-full">
          <CreditCard size={18} />
          Pagar L{totalAPagar.toLocaleString("es-HN")} HN
        </Button>

        <p className="text-xs text-center text-gray-400 leading-relaxed">
          Al confirmar aceptas los{" "}
          <span className="font-semibold text-festiva-electric-violet">Términos de pago</span>. El cargo se
          realizará de inmediato.
        </p>
      </div>
    </div>
  );
}