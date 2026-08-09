import { HistorialPago } from "../types/reportes.types";
import { SectionHeader } from "@/shared/components/SectionHeader";
import ItemHistorial from "./ItemHistorial";

interface ListaHistorialProps {
    historial: HistorialPago[];
    formatCurrency: (amount: number) => string;
}

export default function ListaHistorial({ historial, formatCurrency }: ListaHistorialProps) {
    if (historial.length === 0) {
        return (
            <div className="my-4">
                <SectionHeader title="Historial reciente" accion="Ver todos" href="pagos" />
                <div className="bg-white py-4 px-4 rounded-2xl">
                    <p className="text-festiva-midnight-blue/40 text-sm py-2">No hay movimientos recientes</p>
                </div>
            </div>
        );
    }

    return (
        <div className="my-4">
            <SectionHeader title="Historial reciente" accion="Ver todos" href="pagos" />
            <div className="bg-white py-4 px-4 rounded-2xl space-y-2">
                {historial.map((item, index) => (
                    <ItemHistorial
                        key={item.idPago || index}
                        item={item}
                        isLast={index === historial.length - 1}
                        formatCurrency={formatCurrency}
                    />
                ))}
            </div>
        </div>
    );
}