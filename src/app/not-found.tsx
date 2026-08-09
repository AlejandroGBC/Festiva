import Link from "next/link";
import { Ghost } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-white p-8">
            <div className="max-w-md w-full text-center">
                <div className="flex justify-center mb-4">
                    <Ghost
                        className="w-20 h-20 text-festiva-midnight-blue"
                        strokeWidth={1.5}
                    />
                </div>

                <h1 className="text-8xl font-bold text-festiva-midnight-blue leading-none">
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-festiva-midnight-blue mt-2">
                    ¡Página fantasma!
                </h2>
                <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                    Parece que has encontrado un fantasma digital. <br />
                    <span className="text-festiva-euphoric-pink font-medium">
                        ¡Vuelve al inicio y sigue explorando!
                    </span>
                </p>

                <Link
                    href="inicio"
                    className="inline-block mt-6 px-6 py-3 bg-festiva-midnight-blue text-white font-semibold rounded-lg   duration-300 transform hover:scale-105"
                >
                    Volver al inicio
                </Link>
            </div>
        </main>
    );
}