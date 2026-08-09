"use client";

import { User, Mail, Phone, Lock } from "lucide-react";
import Link from "next/link";
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
          label="Teléfono"
          icon={<Phone />}
          name="telefono"
          type="tel"
          placeholder="9999-9999"
          value={formData.telefono}
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

      <div className="flex items-start gap-2 text-sm text-festiva-secondary">
        <label className="flex items-center gap-2 shrink-0 mt-0.5" htmlFor="aceptaTerminos">
          <input
            id="aceptaTerminos"
            type="checkbox"
            name="aceptaTerminos"
            className="accent-festiva-electric-violet"
          />
        </label>
        <p className="leading-snug">
          Acepto los{" "}
          <Link href="/legal/terminos" className="text-festiva-electric-violet font-semibold underline underline-offset-2">
            Términos y Condiciones
          </Link>{" "}
          y la{" "}
          <Link href="/legal/privacidad" className="text-festiva-electric-violet font-semibold underline underline-offset-2">
            Política de Privacidad
          </Link>{" "}
          de Festiva
        </p>
      </div>

      {errors.general && (
        <p className="text-sm text-red-500 text-center">{errors.general}</p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creando cuenta..." : "Crear mi cuenta"}
      </Button>
    </form>
  );
};