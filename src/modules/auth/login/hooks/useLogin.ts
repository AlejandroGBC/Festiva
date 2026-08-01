"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { iniciarSesion } from "../services/login.service";
import { LoginFormData } from "../types/login.types";
import { routeGeneratorOverLogin } from "@/shared/utils/routeGeneratosOverLogin";
import { useAuthContext } from "@/lib/context/auth-context";

const initialState: LoginFormData = { correo: "", contrasena: "" };

export function useLogin() {
  const router = useRouter();
  const { refetch } = useAuthContext();
  const [formData, setFormData] = useState<LoginFormData>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ general?: string }>({});

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const user = await iniciarSesion(formData);
      await refetch(); // fuerza al Context a leer la sesión recién creada
      const ruta = routeGeneratorOverLogin(user.rol)
      router.push(ruta);
      router.refresh(); // fuerza a que el middleware/RSC vean la sesión nueva
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : "Error inesperado" });
      setIsSubmitting(false);
    }
  }

  return { formData, handleChange, handleSubmit, isSubmitting, errors };
}