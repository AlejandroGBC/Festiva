import Link from "next/link";

export default function RegistroProveedorFooter() {
  return (
    <p className="text-center text-xs text-slate-400 leading-relaxed">
      Al registrarte aceptas los{" "}
      <Link href="/terminos" className="text-festiva-electric-violet font-semibold">
        Terminos
      </Link>{" "}
      y la{" "}
      <Link href="/privacidad" className="text-festiva-electric-violet font-semibold">
        Politica de Privacidad
      </Link>
    </p>
  );
}