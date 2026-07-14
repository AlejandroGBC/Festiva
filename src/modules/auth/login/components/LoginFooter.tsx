
import Button from "@/shared/components/Button";
import Link from "next/link";

export default function LoginFooter() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-slate-400 whitespace-nowrap">o continua con</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="social" type="button" className="gap-2">
          Google
        </Button>
        <Button variant="social" type="button" className="gap-2">
          Apple
        </Button>
      </div>

      <p className="text-center text-sm text-slate-400">
        No tienes cuenta —{" "}
        <Link href="registro" className="text-festiva-euphoric-pink font-semibold">
          Registrate gratis
        </Link>
      </p>
    </div>
  );
}