// src/shared/components/HeaderInicio.tsx
//
// ÚNICO CAMBIO respecto al original: el botón de notificaciones ahora
// navega a /cliente/notificaciones (antes no tenía onClick).

"use client";

import { useRouter } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import Image from "next/image";
import isotipoColor from "@/shared/img/isotipoColor.svg";
import { obtenerIniciales } from "../utils/obtenerIniciales";
import { UsuarioSesion } from "../types/auth.types";

interface HeaderProps {
    onMenuClick: () => void;
<<<<<<< HEAD
    tieneNotificacionesNuevas?: boolean;
}

export function Header({ onMenuClick, tieneNotificacionesNuevas = false }: HeaderProps) {
    const router = useRouter();
=======
    user: UsuarioSesion
}

export function Header({ onMenuClick, user }: HeaderProps) {
>>>>>>> upstream/main

    return (
        <header className="justify-between flex p-5">
            <div className="flex gap-3">
                <button id="sidebar-btn" onClick={onMenuClick} className="bg-white rounded-[999px] p-3 border-solid border-[1px] border-festiva-midnight-blue/9">
                    <Menu size={20} className="text-festiva-midnight-blue" strokeWidth={2} />
                </button>
                <Image
                    src={isotipoColor}
                    alt="Isotipo Festiva"
                    width={40}
                    height={40}
                    priority
                />
            </div>
            <div className="flex gap-2">
                <button
                    id="notif-btn"
                    onClick={() => router.push("/cliente/notificaciones")}
                    className="relative bg-white rounded-[999px] p-3 border-solid border-[1px] border-festiva-midnight-blue/9"
                >
                    <Bell size={20} className="text-festiva-midnight-blue" strokeWidth={2} />
                    {tieneNotificacionesNuevas && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-festiva-euphoric-pink border-2 border-white animate-pulse" />
                    )}
                </button>
                <span className="flex items-center justify-center w-11 h-11 bg-festiva-euphoric-pink text-white font-bold rounded-full text-sm shadow-sm">
                    {obtenerIniciales(user?.nombre)}
                </span>
            </div>
        </header>
    );
}

export default Header;