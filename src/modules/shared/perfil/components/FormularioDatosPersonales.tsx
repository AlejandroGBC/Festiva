"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, AlertCircle } from "lucide-react";
import Card from "@/shared/components/Card";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import { actualizarDatosProveedor } from "@/modules/proveedor/setting/services/setting.client";

export interface DatosBaseUser {
    nombreCompleto: string;
    correo: string;
    telefono: string | null;
}

interface FormularioDatosPersonalesProps {
    perfil: DatosBaseUser;
    onGuardar?: (datos: { nombreCompleto: string; telefono: string }) => Promise<void>;
    tituloLabel?: string;
}

export default function FormularioDatosPersonales({
    perfil,
    onGuardar,
    tituloLabel = "Nombre completo"
}: FormularioDatosPersonalesProps) {
    const router = useRouter();
    const [nombre, setNombre] = useState(perfil.nombreCompleto);
    const [telefono, setTelefono] = useState(perfil.telefono ?? "");
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");
    const [exito, setExito] = useState(false);

    async function handleGuardar() {
        setGuardando(true);
        setError("");
        setExito(false);

        try {
            if (typeof onGuardar === "function") {
                await onGuardar({ nombreCompleto: nombre, telefono });
            } else {
                await actualizarDatosProveedor({ nombreCompleto: nombre, telefono });
            }

            setExito(true);
            router.refresh();
        } catch (e) {
            setError(e instanceof Error ? e.message : "No se pudo guardar");
        } finally {
            setGuardando(false);
        }
    }

    return (
        <Card className="mt-4">
            <div className="flex flex-col gap-4">
                <Input
                    label={tituloLabel}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <div>
                    <label className="text-[14px] font-bold text-festiva-midnight-blue block mb-1.5">
                        Correo electrónico
                    </label>
                    <div className="h-[54px] rounded-[16px] bg-[#f8f9fd] flex items-center px-4 text-[15px] text-festiva-midnight-blue/60">
                        {perfil.correo}
                    </div>
                    <p className="text-[11px] text-festiva-midnight-blue/40 mt-1">
                        Para cambiar tu correo, contactá soporte.
                    </p>
                </div>

                <Input
                    label="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Ej. 9999-9999"
                />
            </div>

            {error && (
                <div className="flex items-center gap-2 mt-4 px-3.5 py-2.5 rounded-xl bg-red-500/5 border border-red-500/15">
                    <AlertCircle size={14} className="text-red-500 shrink-0" />
                    <p className="text-xs text-red-500 m-0">{error}</p>
                </div>
            )}

            {exito && (
                <div className="flex items-center gap-2 mt-4 px-3.5 py-2.5 rounded-xl bg-festiva-mint-neon/10 border border-festiva-mint-neon/20">
                    <Check size={14} className="text-festiva-midnight-blue" />
                    <p className="text-xs font-bold text-festiva-midnight-blue m-0">
                        Datos guardados
                    </p>
                </div>
            )}

            <Button
                variant="primary"
                className="w-full mt-5"
                disabled={guardando || !nombre.trim()}
                onClick={handleGuardar}
            >
                {guardando ? "Guardando..." : "Guardar cambios"}
            </Button>
        </Card>
    );
}