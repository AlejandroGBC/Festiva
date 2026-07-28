"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/inicio/components/CategoriasView.tsx
 */

import { useRouter } from "next/navigation";
import TopNavbar from "@/shared/components/TopNavbar";
import Navbar from "@/shared/components/Navbar";
import Card from "@/shared/components/Card";
import { obtenerIconoServicio } from "@/shared/lib/servicio-icono";
import type { CategoriaInicio } from "@/modules/cliente/inicio/types/inicio.types";

interface CategoriasViewProps {
  categorias: CategoriaInicio[];
}

export default function CategoriasView({ categorias }: CategoriasViewProps) {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-[#F5F2FA] flex flex-col">
      <TopNavbar title="Categorías" />

      <main className="flex-1 px-5 pb-8 lg:max-w-2xl lg:mx-auto lg:w-full">
        <p className="text-[13px] text-festiva-midnight-blue/50 mt-4 mb-4">
          Elegí una categoría para ver los proveedores disponibles
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categorias.map((cat) => {
            const { Icon, color } = obtenerIconoServicio(cat.nombre);
            return (
              <div
                key={cat.id}
                onClick={() => router.push(`/cliente/buscar?categoria=${encodeURIComponent(cat.nombre)}`)}
                className="cursor-pointer"
              >
                <Card className="flex flex-col items-center justify-center text-center gap-2.5 !py-6 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color.bg}`}>
                    <Icon size={22} className={color.text} />
                  </div>
                  <span className="text-sm font-semibold text-festiva-midnight-blue">{cat.nombre}</span>
                </Card>
              </div>
            );
          })}
        </div>
      </main>

      <Navbar />
    </div>
  );
}