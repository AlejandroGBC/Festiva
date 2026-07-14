"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { RegistroProveedorFormData } from "../types/registro.types";

const initialState: RegistroProveedorFormData = {
  nombreEmpresa: "",
  correo: "",
  especialidad: "",
  serviciosAdicionales: [],
  ciudad: "",
  descripcion: "",
  contrasena: "",
};

export function useRegistroProveedor() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegistroProveedorFormData>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ general?: string }>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function toggleServicio(id: string) {
    setFormData((prev) => ({
      ...prev,
      serviciosAdicionales: prev.serviciosAdicionales.includes(id)
        ? prev.serviciosAdicionales.filter((s) => s !== id)
        : [...prev.serviciosAdicionales, id],
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    // TODO: reemplazar por llamada real (perfil.service.ts) cuando exista la API
    console.log("Registro proveedor simulado:", formData);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    router.push("/proveedor/perfil");
  }

  return { formData, handleChange, toggleServicio, handleSubmit, isSubmitting, errors };
}