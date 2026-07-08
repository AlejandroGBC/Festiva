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
        <div className="rounded-xl overflow-hidden border bg-white w-1/2">
            <img
                src={img}
                alt={nombre}
                className="w-full h-40 object-cover"
            />

            <div className="p-4">
                <h3 className="font-semibold text-lg">{nombre}</h3>
                <p className="text-sm text-gray-500">{categoria}</p>

                <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-1 text-sm">
                        <Star
                            className="w-4 h-4 fill-festiva-confetti-orange text-festiva-confetti-orange"
                        />
                        <span>{calificacion}</span>
                        <span className="text-gray-500">
                            ({cantidadCalificaciones})
                        </span>
                    </div>

                    <p className="font-semibold">
                        Desde L.{precio}
                    </p>
                </div>
            </div>
        </div>
    );
}