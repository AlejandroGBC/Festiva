/**
 * Ubicación real:
 *   src/app/cliente/proveedores/[id]/page.tsx
 */

import { notFound } from "next/navigation";

import { getProveedorDetalle } from "@/modules/cliente/proveedores/services/proveedor-detalle.service";
import ProveedorDetalleView from "@/modules/cliente/proveedores/components/ProveedorDetalleView";

interface ProveedorDetallePageProps {
  params: Promise<{ id: string }>;
}

export default async function ProveedorDetallePage({ params }: ProveedorDetallePageProps) {
  const { id } = await params;
  const proveedor = await getProveedorDetalle(id);

  if (!proveedor) notFound();

  return <ProveedorDetalleView proveedor={proveedor} />;
}