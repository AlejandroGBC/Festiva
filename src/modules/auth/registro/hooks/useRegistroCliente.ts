"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registrarCliente } from "../services/registro.service";
import { RegistroClienteFormData } from "../types/registro.types";
import { routeGeneratorOverLogin } from "@/shared/utils/routeGeneratosOverLogin";

const initialState: RegistroClienteFormData = {
  nombreCompleto: "",
  correo: "",
  telefono: "",
  contrasena: "",
};

export function useRegistroCliente() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegistroClienteFormData>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ general?: string }>({});

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    setIsSubmitting(true);

    registrarCliente({
        nombreCompleto: formData.nombreCompleto,
        correo: formData.correo,
        telefono: formData.telefono,
        contrasena: formData.contrasena,
        rol: "cliente",
    })
    .then((user) => {
        const ruta = routeGeneratorOverLogin(user.rol)
        router.push(ruta);
        router.refresh();
    })
    .catch((err) => {
        setErrors({ general: err instanceof Error ? err.message : "No se pudo crear la cuenta" });
    })
    .finally(() => {
        setIsSubmitting(false);
    })

  }

  return { formData, handleChange, handleSubmit, isSubmitting, errors };
}