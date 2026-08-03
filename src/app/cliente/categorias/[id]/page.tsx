"use client";

import { useState } from "react";
import { ProveedoresHeader } from "@/modules/cliente/categorias/components/ProveedoresHeader";
import { OrdenToggle } from "@/modules/cliente/categorias/components/OrdenToggle";
import { ProveedorListingCard } from "@/modules/cliente/categorias/components/ProveedorListingCard";
import type { ProveedorListado, OrdenProveedores } from "@/shared/types/proveedores-cliente.types";

// TODO: reemplazar por fetch real a TBL_PERFILES_PROVEEDOR filtrando por categoria (params.id)
// + JOIN con TBL_TRABAJOS_PORTAFOLIO/TBL_PORTAFOLIO_IMAGENES (vista previa) y calificaciones promedio

// imágenes placeholder

const proveedoresMock: ProveedorListado[] = [
  {
    id: "1",
    nombreComercial: "Decos Mágicos",
    iniciales: "DM",
    calificacion: 4.9,
    cantidadResenas: 124,
    verificado: true,
    imagenes: [
      "https://picsum.photos/seed/decosmagicos-1/800/600",
      "https://picsum.photos/seed/decosmagicos-2/800/600",
      "https://picsum.photos/seed/decosmagicos-3/800/600",
    ],
    etiquetas: [
      { label: "Decoracion floral", variant: "pink" },
      { label: "Bodas", variant: "violet" },
    ],
    descripcion: "Decoracion tematica y floral para bodas y eventos sociales, montajes en Guadalajara y zona metropolitana.",
    precioDesde: 800,
  },
  {
    id: "2",
    nombreComercial: "Flor y Evento",
    iniciales: "FE",
    calificacion: 4.7,
    cantidadResenas: 58,
    verificado: false,
    imagenes: [
      "https://picsum.photos/seed/florevento-1/800/600",
      "https://picsum.photos/seed/florevento-2/800/600",
    ],
    etiquetas: [
      { label: "Montajes", variant: "orange" },
      { label: "XV Anos", variant: "mint" },
    ],
    descripcion: "Especialistas en decoracion de interiores y jardines, iluminacion calida y centros de mesa personalizados.",
    precioDesde: 650,
  },
  {
    id: "3",
    nombreComercial: "Estilo & Bodas",
    iniciales: "EB",
    calificacion: 5.0,
    cantidadResenas: 41,
    verificado: true,
    imagenes: [
      "https://picsum.photos/seed/estilobodas-1/800/600",
      "https://picsum.photos/seed/estilobodas-2/800/600",
      "https://picsum.photos/seed/estilobodas-3/800/600",
    ],
    etiquetas: [
      { label: "Iluminacion", variant: "violet" },
      { label: "Corporativos", variant: "pink" },
    ],
    descripcion: "Diseno de escenografia y ambientacion completa, del concepto al montaje final el mismo dia del evento.",
    precioDesde: 1100,
  },
];

export default function ProveedoresPorCategoriaPage({ params }: { params: { id: string } }) {
  const [orden, setOrden] = useState<OrdenProveedores>("recomendados");

  console.log("ID de categoria:", params.id);

  const proveedoresOrdenados =
    orden === "mejor_calificados"
      ? [...proveedoresMock].sort((a, b) => b.calificacion - a.calificacion)
      : proveedoresMock;

  return (
    <>
      <div className="shrink-0 bg-white">
        <ProveedoresHeader titulo="Proveedores" />
        <div className="px-4 pb-4 flex flex-col gap-3">
          <p className="text-sm text-gray-400">{proveedoresMock.length} proveedores encontrados</p>
          <OrdenToggle orden={orden} onCambiar={setOrden} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar w-full px-4 pt-4 pb-36 flex flex-col gap-4">
        {proveedoresOrdenados.map((proveedor) => (
          <ProveedorListingCard key={proveedor.id} proveedor={proveedor} />
        ))}
      </div>

    </>
  );
}