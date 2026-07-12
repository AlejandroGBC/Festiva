import { Briefcase } from "lucide-react";

export default function RegistroProveedorHeader() {
  return (
    <div className="flex flex-col gap-4">
      <span className="flex items-center gap-1.5 w-fit rounded-full bg-festiva-electric-violet/10 text-festiva-electric-violet text-xs font-bold px-3 py-1.5">
        <Briefcase className="h-3.5 w-3.5" />
        Soy Proveedor
      </span>

      <div>
        <h1 className="text-2xl font-bold text-festiva-midnight-blue">Perfil Proveedor</h1>
        <p className="text-sm text-slate-400 mt-1">
          Conecta con clientes que buscan exactamente lo que ofreces.
        </p>
      </div>
    </div>
  );
}