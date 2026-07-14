
export const FormCliente = () => {
    return(
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-festiva-midnight-blue">Nombre completo</label>
          <input 
            type="text" 
            placeholder="Tu nombre completo" 
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-festiva-electric-violet"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-festiva-midnight-blue">Correo electronico</label>
          <input 
            type="email" 
            placeholder="correo@ejemplo.com" 
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-festiva-electric-violet"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-festiva-midnight-blue">Contrasena</label>
          <input 
            type="password" 
            placeholder="Minimo 8 caracteres" 
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-festiva-electric-violet"
          />
        </div>

        {/* Barra de progreso */}
        <div className="flex gap-2">
          <div className="h-1 flex-1 bg-festiva-mint-neon rounded-full" />
          <div className="h-1 flex-1 bg-festiva-mint-neon rounded-full" />
          <div className="h-1 flex-1 bg-festiva-mint-neon rounded-full" />
          <div className="h-1 flex-1 bg-gray-200 rounded-full" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-festiva-midnight-blue">Confirmar contrasena</label>
          <input 
            type="password" 
            placeholder="Repite tu contraseña" 
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-festiva-electric-violet"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-festiva-secondary">
          <input type="checkbox" className="accent-festiva-electric-violet" />
          <span>Acepto los <b className="text-festiva-midnight-blue">Terminos y Condiciones</b> y la <b className="text-festiva-midnight-blue">Politica de Privacidad</b> de Festiva</span>
        </label>

        <button 
          type="button" //Submit mas adelante
          className="bg-festiva-euphoric-pink text-white w-full py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Crear mi cuenta
        </button>
      </form>
    )
}