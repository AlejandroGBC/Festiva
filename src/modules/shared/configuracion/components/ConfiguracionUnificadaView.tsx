"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
    User, Shield, Phone, CreditCard, Percent, BarChart3, Lock, FileText, LogOut, BellRing, Bell, Check 
} from "lucide-react";

import TopNavbar from "@/shared/components/TopNavbar";
import Toggle from "@/shared/components/Toggle";
import Chip from "@/shared/components/Chip";
import Loading from "@/shared/components/Loading";
import FilaConfiguracion from "./FilaConfiguracion";
import { useAuthContext } from "@/lib/context/auth-context";
import { usePushNotifications } from "../hooks/usePushNotifications";

interface ConfigData {
    usuario: {
        id: string;
        nombre: string;
        correo: string;
        telefono: string | null;
        rol: "cliente" | "proveedor" | "admin";
    };
    nombreComercial?: string;
    cuentaBancaria?: string;
    pushNotificationsEnabled: boolean;
}

export default function ConfiguracionUnificadaView() {
    const router = useRouter();
    const { signOut } = useAuthContext();

    const [loading, setLoading] = useState(true);
    const [config, setConfig] = useState<ConfigData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { soportaPush, pushActivo, cargandoPush, errorPush, togglePush } = usePushNotifications();

    useEffect(() => {
        let isMounted = true;

        async function CargarDatos() {
            try {
                const res = await fetch("/api/configuracion", { cache: "no-store" });

                if (!res.ok) {

                    if (res.status === 401) {
                        await signOut();
                        router.replace("/auth/login");
                        return;
                    }
                    const payload = await res.json().catch(() => ({}));
                    setError(payload.error || "No se pudo cargar la configuración.");
                    return;
                }

                const data = await res.json();
                if (isMounted) setConfig(data);

            } catch {
                if (isMounted) setError("No se pudo cargar la configuración. Intenta de nuevo.");
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        CargarDatos();

        return () => { isMounted = false; };
    }, [router, signOut]);

    if (loading) { return <Loading fullScreen label="Cargando configuración..." />; }

    if (error || !config) {
        return (
            <div className="min-h-dvh bg-[#F5F2FA] flex items-center justify-center px-6">
                <div className="max-w-sm w-full rounded-2xl bg-white border border-[#EDEAF8] p-6 text-center">
                    <p className="text-lg font-bold text-festiva-midnight-blue mb-2">No se pudo cargar la configuración</p>
                    <p className="text-sm text-festiva-midnight-blue/60 mb-5">{error || "Ha ocurrido un problema inesperado."}</p>
                    <button
                        className="w-full rounded-xl bg-festiva-electric-violet text-white font-bold py-3 px-4 hover:opacity-95 transition-opacity"
                        onClick={() => router.replace("/auth/login")}
                    >
                        Volver a iniciar sesión
                    </button>
                </div>
            </div>
        );
    }

    const esProveedor = config.usuario.rol === "proveedor";

    return (
        <div className="min-h-dvh bg-[#F5F2FA] flex flex-col">
        <TopNavbar title="Configuración" />

        <main className="flex-1 px-5 pb-8 lg:max-w-2xl lg:mx-auto lg:w-full overflow-y-auto no-scrollbar">
            
            {/* SECCIÓN CUENTA */}
            <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-2 mt-4 px-1">
                Cuenta
            </p>
            
            <div className="rounded-2xl bg-white border border-[#EDEAF8] overflow-hidden divide-y divide-[#F5F2FA] mb-5">
                <FilaConfiguracion
                    icon={<User size={18} className="text-festiva-electric-violet" />}
                    iconBg="rgba(123,63,228,0.08)"
                    titulo={esProveedor ? "Información comercial" : "Datos personales"}
                    subtitulo={config.usuario.nombre}
                    onClick={() =>
                        router.push(esProveedor ? "/proveedor/perfil/datos" : "/cliente/perfil/datos")
                    }
                />
                <FilaConfiguracion
                    icon={<Lock size={18} className="text-festiva-mint-neon" />}
                    iconBg="rgba(46,196,182,0.10)"
                    titulo="Seguridad y contraseña"
                    subtitulo="Cambiar contraseña"
                    onClick={() =>
                        router.push(esProveedor ? "/proveedor/perfil/seguridad" : "/cliente/perfil/seguridad")
                    }
                />
            
                {/* Condicional según Rol */}
                {esProveedor ? (
                    <FilaConfiguracion
                    icon={<Phone size={18} className="text-festiva-confetti-orange" />}
                    iconBg="rgba(255,156,46,0.10)"
                    titulo="Verificación de cuenta"
                    subtitulo={config.usuario.telefono || config.usuario.correo}
                    rightElement={<Chip variant="mint-neon" icon={Check}>Verificado</Chip>}
                    />
                ) : (
                    <FilaConfiguracion
                    icon={<Bell size={18} className="text-festiva-confetti-orange" />}
                    iconBg="rgba(255,156,46,0.10)"
                    titulo="Notificaciones"
                    subtitulo="Ver notificaciones recientes"
                    onClick={() => router.push("/cliente/notificaciones")}
                    />
                )}
            </div>

            {/* SECCIÓN PAGOS (Exclusiva Proveedor) */}
            {esProveedor && (
            <>
                <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-2 px-1">
                    Pagos y facturación
                </p>
                <div className="rounded-2xl bg-white border border-[#EDEAF8] overflow-hidden divide-y divide-[#F5F2FA] mb-5">
                    <FilaConfiguracion
                        icon={<CreditCard size={18} className="text-festiva-euphoric-pink" />}
                        iconBg="rgba(255,77,141,0.08)"
                        titulo="Cuenta bancaria"
                        subtitulo={config.cuentaBancaria || "Sin registrar"}
                        onClick={() => router.push("/proveedor/perfil")}
                    />
                    <FilaConfiguracion
                        icon={<Percent size={18} className="text-festiva-midnight-blue" />}
                        iconBg="#F5F2FA"
                        titulo="Comisiones Festiva"
                        subtitulo="7% por transacción completada"
                    />
                    <FilaConfiguracion
                        icon={<BarChart3 size={18} className="text-festiva-mint-neon" />}
                        iconBg="rgba(46,196,182,0.10)"
                        titulo="Historial de ingresos"
                        subtitulo="Ver recibos y balance"
                        onClick={() => router.push("/proveedor/historial")}
                    />
                </div>
            </>
            )}

            {/* SECCIÓN NOTIFICACIONES PUSH */}
            {soportaPush && (
                <>
                    <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-2 px-1">
                        Notificaciones push
                    </p>
                    <div className="rounded-2xl bg-white border border-[#EDEAF8] p-4 mb-5">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                style={{ background: "rgba(255,77,141,0.08)" }}
                            >
                                <BellRing size={18} className="text-festiva-euphoric-pink" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm text-festiva-midnight-blue m-0">
                                    Notificaciones en este dispositivo
                                </p>
                                <p className="text-xs text-festiva-midnight-blue/45 m-0 mt-0.5">
                                    Recibí avisos aunque no tengas la app abierta
                                </p>
                            </div>
                            <Toggle isOn={pushActivo} onToggle={togglePush}/>
                        </div>
                        {cargandoPush && (
                            <p className="text-xs text-festiva-midnight-blue/40 mt-2 mb-0">Actualizando...</p>
                        )}
                        {errorPush && (
                            <p className="text-xs text-red-500 mt-2 mb-0">{errorPush}</p>
                        )}
                    </div>
                </>
            )}

            {/* SECCIÓN LEGAL */}
            <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-2 px-1">
                Legal
            </p>
            <div className="rounded-2xl bg-white border border-[#EDEAF8] overflow-hidden divide-y divide-[#F5F2FA] mb-5">
                <FilaConfiguracion
                    icon={<FileText size={18} className="text-festiva-midnight-blue/50" />}
                    iconBg="#F5F2FA"
                    titulo="Términos y condiciones"
                    onClick={() => router.push("/legal/terminos")}
                />
                <FilaConfiguracion
                    icon={<Shield size={18} className="text-festiva-midnight-blue/50" />}
                    iconBg="#F5F2FA"
                    titulo="Política de privacidad"
                    onClick={() => router.push("/legal/privacidad")}
                />
            </div>

            {/* CERRAR SESIÓN */}
            <button
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red-500/10 text-red-500 font-bold text-sm py-3.5 hover:bg-red-500/15 transition-colors"
                onClick={async () => {
                    await signOut();
                    router.push("/auth/login");
                    router.refresh();
                }}
            >
                <LogOut size={18} />
                Cerrar sesión
            </button>

            <p className="text-center text-[11px] text-slate-400 font-medium mt-6">
                Festiva v2.4.1 · © 2026 Festiva Technologies
            </p>
        </main>
        </div>
    );
}