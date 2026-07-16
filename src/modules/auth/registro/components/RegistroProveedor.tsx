import RegistroProveedorFooter from "./RegistroProveedorFooter";
import RegistroProveedorForm from "./RegistroProveedorForm";
import RegistroProveedorHeader from "./RegistroProveedorHeader";

export default function RegistroProveedorPage() {
  return (
    <div className="flex flex-col gap-8 bg-[#F7F5FC] h-screen">
      <RegistroProveedorHeader />
      <RegistroProveedorForm />
      <RegistroProveedorFooter />
    </div>
  );
}