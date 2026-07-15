// src/app/(proveedor)/[id]/page.tsx
// TODO: reemplazar por la vista real de detalle/perfil del proveedor.

interface PageProps {
  params: { id: string };
}

export default function ProveedorDetallePage({ params }: PageProps) {
  return (
    <div className="p-6">
      <p className="text-festiva-midnight-blue">
        Perfil del proveedor: {params.id}
      </p>
    </div>
  );
}