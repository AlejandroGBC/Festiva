"use client";

import { Briefcase, Mail, MapPin, Lock, Layers } from "lucide-react";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Textarea from "@/shared/components/Textarea";
import Button from "@/shared/components/Button";
import ServiciosAdicionales from "./ServiciosAdicionales";
import { useRegistroProveedor } from "../hooks/useRegistroProveedor";

const ESPECIALIDADES = [
  { value: "decoracion", label: "Decoracion y ambientacion" },
  { value: "fotografia", label: "Fotografia y video" },
  { value: "catering", label: "Catering y banquetes" },
  { value: "musica", label: "Musica y entretenimiento" },
  { value: "locaciones", label: "Locaciones y salones" },
];

export default function PerfilProfesionalForm() {
  const {
    formData,
    handleChange,
    toggleServicio,
    handleSubmit,
    isSubmitting,
    errors,
  } = useRegistroProveedor();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        label="Nombre o empresa"
        icon={<Briefcase className="h-[18px] w-[18px]" />}
        name="nombreEmpresa"
        placeholder="Tu nombre o razon social"
        value={formData.nombreEmpresa}
        onChange={handleChange}
      />

      <Input
        label="Correo electronico"
        icon={<Mail className="h-[18px] w-[18px]" />}
        type="email"
        name="correo"
        placeholder="correo@empresa.com"
        value={formData.correo}
        onChange={handleChange}
      />

      <Select
        label="Especialidad principal"
        icon={<Layers size={20}/>}
        name="especialidad"
        value={formData.especialidad}
        onChange={handleChange}
        options={ESPECIALIDADES}
      />

      <ServiciosAdicionales
        seleccionados={formData.serviciosAdicionales}
        onToggle={toggleServicio}
      />

      <Input
        label="Ciudad de operacion"
        icon={<MapPin className="h-[18px] w-[18px]" />}
        name="ciudad"
        placeholder="Donde operas principalmente"
        value={formData.ciudad}
        onChange={handleChange}
      />

      <Textarea
        label="Descripcion profesional"
        name="descripcion"
        placeholder="Describe brevemente tu experiencia y propuesta de valor..."
        value={formData.descripcion}
        onChange={handleChange}
      />

      <Input
        label="Contraseña"
        icon={<Lock className="h-[18px] w-[18px]" />}
        type="password"
        name="contrasena"
        placeholder="Minimo 8 caracteres"
        value={formData.contrasena}
        onChange={handleChange}
      />

      {errors.general && (
        <p className="text-sm text-red-500 text-center">{errors.general}</p>
      )}

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        shape="pill"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Creando perfil..." : "Crear perfil proveedor"}
      </Button>
    </form>
  );
}