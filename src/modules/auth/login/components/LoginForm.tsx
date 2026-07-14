
"use client";

import { Mail, Lock } from "lucide-react";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const { formData, handleChange, handleSubmit, isSubmitting, errors } = useLogin();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        label="Correo electronico"
        icon={<Mail className="h-[18px] w-[18px]" />}
        type="email"
        name="correo"
        placeholder="hola@festiva.app"
        value={formData.correo}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-1.5">
        <Input
          label="Contraseña"
          icon={<Lock className="h-[18px] w-[18px]" />}
          type={"password"}
          name="contrasena"
          placeholder="********"
          value={formData.contrasena}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end -mt-2 text-xs font-semibold text-festiva-electric-violet">
        Olvidaste tu contraseña
      </div>

      {errors.general && (
        <p className="text-sm text-red-500 text-center">{errors.general}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
}