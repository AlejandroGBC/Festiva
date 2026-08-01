"use client";

import Card from "@/shared/components/Card";
import SectionHeader from "@/shared/components/SectionHeader";
import { BalanceHeader } from "@/modules/proveedor/historial/components/BalanceHeader";
import { IngresosChartCard } from "@/modules/proveedor/historial/components/IngresosChartCard";
import { ResumenStatCard } from "@/modules/proveedor/historial/components/ResumenStatCard";
import { HistorialItem } from "@/modules/proveedor/historial/components/HistorialItem";
import type { PuntoIngresoMensual, TransaccionHistorial } from "@/shared/types/historial-proveedor.types";

// TODO: reemplazar por fetch real a TBL_PAGOS del proveedor autenticado cuando conectemos Supabase
const ingresosMock: PuntoIngresoMensual[] = [
  { mes: "Ene", monto: 12000 },
  { mes: "Feb", monto: 15000 },
  { mes: "Mar", monto: 10000 },
  { mes: "Abr", monto: 28000 },
  { mes: "May", monto: 22000 },
  { mes: "Jun", monto: 48500 },
];

const historialMock: TransaccionHistorial[] = [
  { id: "1", titulo: "Cumpleaños Carlos 40", descripcion: "Pago recibido", fecha: "2 jun, 2026", monto: 8500, tipo: "ingreso" },
  { id: "2", titulo: "Graduación ITESM", descripcion: "Pago recibido", fecha: "28 may, 2026", monto: 22000, tipo: "ingreso" },
  { id: "3", titulo: "Comisión Festiva", descripcion: "Descuento automático", fecha: "28 may, 2026", monto: 2200, tipo: "comision" },
];

export default function DashboardProveedorPage() {
  return (
    <>
      <div className="flex-1 overflow-y-auto no-scrollbar w-full pb-10">
        <BalanceHeader montoDisponible={48500} cicloActual="junio 2026" actualizadoTexto="Actualizado hoy" />

        <div className="px-4 pt-6 flex flex-col gap-4">
          <IngresosChartCard puntos={ingresosMock} crecimientoPorcentaje={18} />

          <div className="grid grid-cols-2 gap-4">
            <ResumenStatCard etiqueta="Este mes" monto={48500} descripcion="HN ingresados" color="mint-neon" />
            <ResumenStatCard etiqueta="Comisiones" monto={4850} descripcion="HN Festiva 10%" color="euphoric-pink" signo="-" />
          </div>

          <div>
            <SectionHeader title="Historial reciente" accion="Ver todo" />
            <Card>
              <div className="flex flex-col">
                {historialMock.map((item, index) => (
                  <HistorialItem key={item.id} {...item} esUltimo={index === historialMock.length - 1} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

    </>
  );
}