export default function ProveedorDetallePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Proveedor {params.id}</h1>
    </div>
  );
}
