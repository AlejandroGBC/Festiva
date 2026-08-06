"use client";

import { Briefcase, Mail, Phone, MapPin, Lock } from "lucide-react";
import Input from "@/shared/components/Input";
import Textarea from "@/shared/components/Textarea";
import Button from "@/shared/components/Button";
import ServiciosAdicionales from "./ServiciosAdicionales";
import { useRegistroProveedor } from "../hooks/useRegistroProveedor";

export default function RegistroProveedorForm() {
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
        required={true}
      />

      <Input
        label="Correo electronico"
        icon={<Mail className="h-[18px] w-[18px]" />}
        type="email"
        name="correo"
        placeholder="correo@empresa.com"
        value={formData.correo}
        onChange={handleChange}
        required={true}
      />

      <Input
        label="Telefono"
        icon={<Phone className="h-[18px] w-[18px]" />}
        type="tel"
        name="telefono"
        placeholder="9999-9999"
        value={formData.telefono}
        onChange={handleChange}
        required={true}
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
        required={true}
      />

      <Textarea
        label="Descripcion profesional"
        name="descripcion"
        placeholder="Describe brevemente tu experiencia y propuesta de valor..."
        value={formData.descripcion}
        onChange={handleChange}
        required={true}
      />

      <Input
        label="Contraseña"
        icon={<Lock className="h-[18px] w-[18px]" />}
        type="password"
        name="contrasena"
        placeholder="Minimo 6 caracteres"
        value={formData.contrasena}
        onChange={handleChange}
        required={true}
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