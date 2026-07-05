import { FormCliente } from "./FormCliente";
import { HeaderRegistroCliente } from "./HeaderRegistroCliente";

export const RegistroCliente = () => {
  return (
    <div className="flex flex-col gap-6">
      <HeaderRegistroCliente />

      <FormCliente/>

      {/* Social Login */}
      <div className="text-center text-festiva-secondary text-sm">o continua con</div>
      <div className="flex gap-4">
        <button type="button" className="flex-1 p-3 border border-gray-200 rounded-lg font-medium text-festiva-midnight-blue">Google</button>
        <button type="button" className="flex-1 p-3 border border-gray-200 rounded-lg font-medium text-festiva-midnight-blue">Apple</button>
      </div>

      <p className="text-center text-festiva-secondary text-sm">
        Ya tienes cuenta — <a href="/auth/login" className="text-festiva-electric-violet font-semibold">Inicia sesión</a>
      </p>
    </div>
  );
};