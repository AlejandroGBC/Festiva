import Button from "@/shared/components/Button"
import Input from "@/shared/components/Input"
import { Lock, Mail, User } from "lucide-react"

const baseInputContainerClass = 'flex flex-col gap-1'

export const FormCliente = () => {
    return(
      <form className="flex flex-col gap-4">
        <div className={baseInputContainerClass}>
          <Input
            label="Nombre completo"
            icon={<User/>}
            type="text" 
            placeholder="Tu nombre completo"
            required={true}
          />
        </div>

        <div className={baseInputContainerClass}>
          <Input
            label="Correo electrónico"
            icon={<Mail/>}
            type="email" 
            placeholder="correo@ejemplo.com"
            required={true} 
          />
        </div>

        <div className={baseInputContainerClass}>
          <Input 
            label="Contraseña"
            icon={<Lock/>}
            type="password" 
            placeholder="Mínimo 6 caracteres"
            required={true}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-festiva-secondary">
          <input type="checkbox" className="accent-festiva-electric-violet" />
          <span>Acepto los <b className="text-festiva-midnight-blue">Terminos y Condiciones</b> y la <b className="text-festiva-midnight-blue">Politica de Privacidad</b> de Festiva</span>
        </label>

        <Button>
          Crear mi cuenta
        </Button>
      </form>
    )
}