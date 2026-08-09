import Link from "next/link";

export default function RegistroProveedorFooter() {
  return (
    <p className="text-center text-xs text-slate-400 leading-relaxed">
      Al registrarte aceptas los{" "}
      <Link href="/legal/terminos" className="text-festiva-electric-violet font-semibold underline underline-offset-2">
        Términos y Condiciones
      </Link>{" "}
      y la{" "}
      <Link href="/legal/privacidad" className="text-festiva-electric-violet font-semibold underline underline-offset-2">
        Política de Privacidad
      </Link>{" "}
      de Festiva
    </p>
  );
}