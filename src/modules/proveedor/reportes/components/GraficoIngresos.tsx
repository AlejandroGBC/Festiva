import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { IngresosUltimosMeses } from "../types/reportes.types";

interface GraficoIngresosProps {
    data: IngresosUltimosMeses[];
    porcentaje: number;
    formatCurrency: (amount: number) => string;
}

export default function GraficoIngresos({ data, porcentaje, formatCurrency }: GraficoIngresosProps) {
    const chartData = data.map((item) => ({
        name: item.mes,
        value: item.valor,
    }));

    const isPositive = porcentaje >= 0;

    // Colores y clases según signo
    const trendColor = isPositive ? "text-festiva-mint-neon" : "text-festiva-berry-punch";
    const bgColor = isPositive ? "bg-festiva-mint-neon/10" : "bg-festiva-berry-punch/10";
    const IconComponent = isPositive ? TrendingUp : TrendingDown;

    // Formatear el porcentaje para mostrar siempre con signo
    const displayPercentage = isPositive && porcentaje > 0 ? `+${porcentaje}%` : `${porcentaje}%`;

    return (
        <div className="bg-white py-5 px-4 rounded-[20px] mb-5">
            <div className="flex justify-between items-center">
                <h1 className="text-festiva-midnight-blue font-semibold text-sm">
                    Ingresos — Últimos 6 meses
                </h1>
                <div
                    className={`flex font-semibold text-xs w-fit h-fit px-3 py-2 rounded-[999px] justify-between gap-2 ${trendColor} ${bgColor}`}
                >
                    <IconComponent size={12} className={trendColor} />
                    {displayPercentage}
                </div>
            </div>

            <div className="w-full h-36 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barSize={20} barGap={4}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: "#6b7280" }}
                            dy={8}
                        />
                        <YAxis hide domain={[0, 'dataMax + 10']} />
                        <Tooltip
                            cursor={{ fill: "transparent" }}
                            contentStyle={{
                                backgroundColor: "#fff",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                fontSize: "12px",
                            }}
                            formatter={(value) => [`${formatCurrency(value as number)}`, "Ingresos"]}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill="#7C3AED" />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}