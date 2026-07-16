import AccionesBienvenida from "@/modules/auth/bienvenida/components/AccionesBienvenida";
import LogoBienvenida from "@/modules/auth/bienvenida/components/LogoBienvenida";

export default function PaginaBienvenida() {
  return (
    <div className="flex flex-col h-full justify-center px-6 pt-16 pb-16">
      <div className="flex-1 flex items-center justify-center">
        <LogoBienvenida />
      </div>

      <AccionesBienvenida />
    </div>
  );
}