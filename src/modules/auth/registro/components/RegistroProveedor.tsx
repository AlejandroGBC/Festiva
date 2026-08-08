import Link from "next/link";
import RegistroProveedorFooter from "./RegistroProveedorFooter";
import RegistroProveedorForm from "./RegistroProveedorForm";
import RegistroProveedorHeader from "./RegistroProveedorHeader";

export default function RegistroProveedorPage() {
  return (
    <div className="flex flex-col gap-8 bg-[#F7F5FC] h-screen">
      <RegistroProveedorHeader />
      <RegistroProveedorForm />
      <RegistroProveedorFooter />
      <p className="text-center text-festiva-secondary text-sm pb-8">
        Ya tienes cuenta — <Link href="/auth/login" className="text-festiva-electric-violet font-semibold">Inicia sesión</Link>
      </p>
    </div>
  );
}