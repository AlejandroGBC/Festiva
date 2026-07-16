"use client";

import { User, Mail, Lock } from "lucide-react";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import { useRegistroCliente } from "../hooks/useRegistroCliente";

const baseInputContainerClass = "flex flex-col gap-1";

export const FormCliente = () => {
  const { formData, handleChange, handleSubmit, isSubmitting, errors } = useRegistroCliente();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className={baseInputContainerClass}>
        <Input
          label="Nombre completo"
          icon={<User />}
          name="nombreCompleto"
          type="text"
          placeholder="Tu nombre completo"
          value={formData.nombreCompleto}
          onChange={handleChange}
          required
        />
      </div>

      <div className={baseInputContainerClass}>
        <Input
          label="Correo electrónico"
          icon={<Mail />}
          name="correo"
          type="email"
          placeholder="correo@ejemplo.com"
          value={formData.correo}
          onChange={handleChange}
          required
        />
      </div>

      <div className={baseInputContainerClass}>
        <Input
          label="Contraseña"
          icon={<Lock />}
          name="contrasena"
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={formData.contrasena}
          onChange={handleChange}
          required
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-festiva-secondary">
        <input
          type="checkbox"
          name="aceptaTerminos"
          className="accent-festiva-electric-violet"
        />
        <span>
          Acepto los <b className="text-festiva-midnight-blue">Terminos y Condiciones</b> y la{" "}
          <b className="text-festiva-midnight-blue">Politica de Privacidad</b> de Festiva
        </span>
      </label>

      {errors.general && (
        <p className="text-sm text-red-500 text-center">{errors.general}</p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creando cuenta..." : "Crear mi cuenta"}
      </Button>
    </form>
  );
};