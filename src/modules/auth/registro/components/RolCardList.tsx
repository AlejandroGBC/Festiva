import { User, Briefcase } from "lucide-react";
import RolCard from "./RolCard";


export default function RolCardList() {
  return (
    <div className="flex flex-col gap-4">
      <RolCard
        slug="registro/cliente"
        variant="euphoric-pink"
        icon={<User/>}
        titulo="Soy Cliente"
        descripcion="Publica tu evento y recibe propuestas personalizadas de los mejores proveedores."
        tagLabel="Organizar eventos"
      />

      <RolCard
        slug="registro/proveedor"
        variant="electric-violet"
        icon={<Briefcase/>}
        titulo="Soy Proveedor"
        descripcion="Explora eventos publicados, envia propuestas y haz crecer tu negocio con nuevos clientes."
        tagLabel="Ofrecer servicios"
      />
    </div>
  );
}