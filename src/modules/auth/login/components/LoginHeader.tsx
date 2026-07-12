
import Image from "next/image";
import isotipoColor from "@/shared/img/isotipoColor.svg"
import Link from "next/link";

export default function LoginHeader() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Link href={'/auth'}>
        <Image src={isotipoColor} alt="Festiva" width={56} height={56} priority />
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-festiva-midnight-blue">
          Bienvenido de nuevo
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Inicia sesión en tu cuenta Festiva
        </p>
      </div>
    </div>
  );
}