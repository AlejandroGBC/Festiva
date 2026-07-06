import Navbar from "@/components/shared/Navbar";
import Button from "@/shared/components/Button";

export default function Home() {
  return (
    <>
      <Navbar />

      <Button>
        Crear evento
      </Button>

      <Button variant="secondary">
        Ver proveedores
      </Button>

      <Button variant="dark">
        Iniciar Sesión
      </Button>

      <div className="flex gap-2 py-4">
        <Button variant="success">
          Confirmar
        </Button>

        <Button variant="warning">
          Pendiente
        </Button>
      </div>

      <Button variant="outline">
        Cancelar
      </Button>

      <Button variant="ghost">
        Omitir
      </Button>

      <Button variant="link">
        Ver más
      </Button>

      <Button variant="social" size="sm">
        Google
      </Button>
    </>
  );
}
