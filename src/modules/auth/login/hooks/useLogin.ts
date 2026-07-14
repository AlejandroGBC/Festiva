"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData } from "../types/login.types";

const initialState: LoginFormData = {
  correo: "",
  contrasena: "",
};

export function useLogin() {
  //const router = useRouter();
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

    // TODO: reemplazar por llamada real cuando exista la API
    // await iniciarSesion(formData);
    console.log("Login simulado con:", formData);

    await new Promise((resolve) => setTimeout(resolve, 800)); // simula latencia

    setIsSubmitting(false);
    //router.push("/perfil");
  }

  return { formData, handleChange, handleSubmit, isSubmitting, errors };
}