/* eslint-disable @next/next/no-img-element */
import { Star } from "lucide-react";

interface ProviderCardProps {
    nombre: string;
    categoria: string;
    calificacion: number;
    cantidadCalificaciones: number;
    precio: number;
    img: string;
}

export function ProviderCard({
    nombre,
    categoria,
    calificacion,
    cantidadCalificaciones,
    precio,
    img,
}: ProviderCardProps) {
    return (
        <div className="rounded-xl overflow-hidden border bg-white w-[10.75rem]">
            <img
                src={img}
                alt={nombre}
                className="w-full h-24 object-cover"
            />

            <div className="px-3 py-1">
                <h3 className="font-bold text-sm text-festiva-midnight-blue">{nombre}</h3>
                <p className="text-xs text-festiva-midnight-blue/45">{categoria}</p>

                <div className="flex justify-between items-center gap-7">
                    <div className="flex items-center gap-1 text-sm">
                        <Star
                            className="w-4 h-4 fill-festiva-confetti-orange text-festiva-confetti-orange"
                        />
                        <span className="text-festiva-midnight-blue font-bold">{calificacion}</span>
                        <span className="text-festiva-midnight-blue/45">
                            ({cantidadCalificaciones})
                        </span>
                    </div>

                    <p className="font-bold text-xs text-festiva-electric-violet">
                        Desde L.{precio}
                    </p>
                </div>
            </div>
        </div>
    );
}