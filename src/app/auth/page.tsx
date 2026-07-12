import AccionesBienvenida from "@/modules/auth/bienvenida/components/AccionesBienvenida";
import LogoBienvenida from "@/modules/auth/bienvenida/components/LogoBienvenida";

export default function PaginaBienvenida() {
  return (
    <div className="flex flex-col h-screen justify-center px-6 pt-16 pb-16">
      <div className="flex items-center justify-center">
        <LogoBienvenida />
      </div>

      <AccionesBienvenida />
    </div>
  );
}