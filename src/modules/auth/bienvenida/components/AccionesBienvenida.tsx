
import Link from "next/link";

export default function WelcomeActions() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Link href="/auth/login" className="flex justify-center">
        <button className="bg-festiva-euphoric-pink text-white p-3 rounded-xl w-full">Iniciar sesión</button>
      </Link>

      <Link href="/auth/registro/cliente" className="flex justify-center">
        <button className="border border-gray-500 p-3 rounded-xl w-full">Crear cuenta</button>
      </Link>
    </div>
  );
}