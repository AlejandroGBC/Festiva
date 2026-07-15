import RolCardList from "@/modules/auth/registro/components/RolCardList";
import SeleccionarRolHeader from "@/modules/auth/registro/components/SeleccionarRolHeader";

export default function SeleccionarRolPage() {
  return (
    <div className="flex flex-col gap-10 justify-center">
      <SeleccionarRolHeader />
      <RolCardList />
    </div>
  );
}