interface TarjetasResumenProps {
    ingresos: number;
    egresos: number;
    formatCurrency: (amount: number) => string;
}

export default function TarjetasResumen({ ingresos, egresos, formatCurrency }: TarjetasResumenProps) {
    const porcentajeFestiva = ingresos + egresos > 0
        ? Math.round((egresos / (ingresos + egresos)) * 100)
        : 0;

    return (
        <div className="flex justify-between gap-3">
            <div className="bg-white py-3 px-4 rounded-2xl w-[50%]">
                <h2 className="text-festiva-midnight-blue/40 text-xs">Este mes</h2>
                <span className="font-bold text-festiva-mint-neon text-xl">
                    {formatCurrency(ingresos)}
                </span>
                <p className="text-xs text-festiva-midnight-blue/40">HN ingresados</p>
            </div>
            <div className="bg-white py-3 px-4 rounded-2xl w-[50%]">
                <h2 className="text-festiva-midnight-blue/40 text-xs">Comisiones</h2>
                <span className="font-bold text-festiva-euphoric-pink text-xl">
                    -{formatCurrency(egresos)}
                </span>
                <p className="text-xs text-festiva-midnight-blue/40">HN Festiva {porcentajeFestiva}%</p>
            </div>
        </div>
    );
}