"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { RegistroProveedorFormData } from "../types/registro.types";
import { registrarProveedor } from "../services/registro.service";

const initialState: RegistroProveedorFormData = {
  nombreEmpresa: "",
  correo: "",
  especialidad: "",
  serviciosAdicionales: [],
  ciudad: "",
  rol: "proveedor",
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

  function toggleServicio(id: number) {
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

    try {
      await registrarProveedor({
        nombreCompleto: formData.nombreEmpresa,
        correo: formData.correo,
        contrasena: formData.contrasena,
        rol: "proveedor",
        ciudad: formData.ciudad,
        descripcion: formData.descripcion,
        especialidad: formData.especialidad,
        serviciosAdicionales: formData.serviciosAdicionales,
      });

      router.push("/proveedor/perfil");
      router.refresh();
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : "No se pudo crear el perfil" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return { formData, handleChange, toggleServicio, handleSubmit, isSubmitting, errors };
}