import Image from "next/image";
import isotipoColor from "@/shared/img/isotipoColor.svg"
import Link from "next/link";

export default function SeleccionarRolHeader() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Link href={'/auth'}>
        <Image src={isotipoColor} alt="Festiva" width={44} height={44} priority />
      </Link>

      <span className="text-[11px] font-bold tracking-[0.15em] text-festiva-electric-violet">
        BIENVENIDO A FESTIVA
      </span>

      <div>
        <h1 className="text-2xl font-bold text-festiva-midnight-blue leading-tight">
          Como deseas usar la plataforma
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Elige tu perfil para personalizar tu experiencia desde el primer momento.
        </p>
      </div>
    </div>
  );
}