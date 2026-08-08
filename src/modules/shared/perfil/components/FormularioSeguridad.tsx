"use client";

import React, { useState } from "react";
import { Lock, Check, AlertCircle } from "lucide-react";
import Card from "@/shared/components/Card";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

interface FormularioSeguridadProps {
    onCambiarContrasena: (nueva: string) => Promise<void>;
}

export default function FormularioSeguridad({ onCambiarContrasena }: FormularioSeguridadProps) {
    const [nueva, setNueva] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");
    const [exito, setExito] = useState(false);

    async function handleCambiar() {
        setError("");
        setExito(false);

        if (nueva !== confirmar) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setGuardando(true);
        try {
            await onCambiarContrasena(nueva);
            setExito(true);
            setNueva("");
            setConfirmar("");
        } catch (e) {
            setError(e instanceof Error ? e.message : "No se pudo cambiar la contraseña");
        } finally {
            setGuardando(false);
        }
    }

    return (
        <Card className="mt-4">
            <div className="flex items-center gap-2 mb-4">
                <Lock size={18} className="text-festiva-electric-violet" />
                <h2 className="font-bold text-sm text-festiva-midnight-blue m-0">
                    Cambiar contraseña
                </h2>
            </div>

            <div className="flex flex-col gap-4">
                <Input
                    label="Nueva contraseña"
                    type="password"
                    value={nueva}
                    onChange={(e) => setNueva(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                />
                <Input
                    label="Confirmar contraseña"
                    type="password"
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
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
                        Contraseña actualizada
                    </p>
                </div>
            )}

            <Button
                variant="primary"
                className="w-full mt-5"
                disabled={guardando || !nueva}
                onClick={handleCambiar}
            >
                {guardando ? "Guardando..." : "Cambiar contraseña"}
            </Button>
        </Card>
    );
}