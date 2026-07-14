
import Button from "@/shared/components/Button";
import Link from "next/link";

export default function WelcomeActions() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Link href="/auth/login" className="flex justify-center">
        <Button className="w-full">Iniciar sesión</Button>
      </Link>

      <Link href="/auth/registro" className="flex justify-center">
        <Button className="w-full bg-transparent border-gray-300 border" variant={'light'}>Crear cuenta</Button>
      </Link>
    </div>
  );
}