"use client";

import { User, Home, Calendar, Briefcase, MessageSquare, CreditCard, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { obtenerIniciales } from "../utils/obtenerIniciales";
import { UsuarioSesion } from "../types/auth.types";
import { getAvatarUrl } from "../utils/getAvatarUrl";

const sidebarMainLinks = [
    {
        label: "Inicio",
        href: "inicio",
        icon: Home,
        color: {
            text: "text-festiva-electric-violet",
            bg: "bg-festiva-electric-violet/10",
            hoverBg: "hover:bg-festiva-electric-violet/10",
            hoverText: "group-hover:text-festiva-electric-violet",
            bl: "border-l-4 border-l-festiva-electric-violet",
        },
    },
    {
        label: "Mis Eventos",
        href: "eventos",
        icon: Calendar,
        color: {
            text: "text-festiva-confetti-orange",
            bg: "bg-festiva-confetti-orange/10",
            hoverBg: "hover:bg-festiva-confetti-orange/10",
            hoverText: "group-hover:text-festiva-confetti-orange",
            bl: "border-l-4 border-l-festiva-confetti-orange",
        },
    },
    {
        label: "Ofertas recibidas",
        href: "ofertas",
        icon: Briefcase,
        color: {
            text: "text-festiva-euphoric-pink",
            bg: "bg-festiva-euphoric-pink/10",
            hoverBg: "hover:bg-festiva-euphoric-pink/10",
            hoverText: "group-hover:text-festiva-euphoric-pink",
            bl: "border-l-4 border-l-festiva-euphoric-pink",
        },
    },
    {
        label: "Chat",
        href: "chat",
        icon: MessageSquare,
        color: {
            text: "text-festiva-mint-neon",
            bg: "bg-festiva-mint-neon/10",
            hoverBg: "hover:bg-festiva-mint-neon/10",
            hoverText: "group-hover:text-festiva-mint-neon",
            bl: "border-l-4 border-l-festiva-mint-neon",
        },
    },
];

const sidebarSecondaryLinks = [
    { label: "Perfil", href: "perfil", icon: User },
    { label: "Pagos", href: "pagos", icon: CreditCard },
    { label: "Configuración", href: "configuracion", icon: Settings },
];

const ROL_LABEL: Record<UsuarioSesion["rol"], string> = {
    cliente: "Cliente verificado",
    proveedor: "Proveedor verificado",
    admin: "Administrador",
};

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    user?: UsuarioSesion;
    signOut: () => void;
}

export function SidebarInicio({ isOpen, onClose, user, signOut }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const avatarUrl = getAvatarUrl(user?.foto_perfil_url);

    const basePath = `/${user?.rol}`;

    async function handleLogout() {
        setIsSigningOut(true);

        try {
            await signOut();
            router.push("/auth/login");
            router.refresh();
        } catch (err) {
            setIsSigningOut(false);
            console.error("Error al cerrar sesión:", err);
        }
    }

    return (
        <div>
            <div
                onClick={onClose}
                className={`absolute inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            />
            <aside
                className={`absolute top-0 left-0 z-50 w-72 h-full flex flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="bg-festiva-midnight-blue px-4 pt-9 pb-4">
                    {avatarUrl ? (
                        <Image
                            src={avatarUrl}
                            alt={user?.nombre ?? "Foto de perfil"}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover border-2 border-festiva-euphoric-pink"
                            unoptimized
                        />
                    ) : (
                        <span className="bg-festiva-euphoric-pink text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                            {obtenerIniciales(user?.nombre)}
                        </span>
                    )}
                    <h1 className="text-white font-bold mt-4 mb-0">{user?.nombre}</h1>
                    <p className="text-white/55 text-xs mb-3">{user?.correo}</p>
                    <span className="flex items-center bg-festiva-euphoric-pink/10 text-festiva-euphoric-pink text-xs px-3 py-2 w-fit gap-1 rounded-[999px]">
                        <User size={12} strokeWidth={1.5} />
                        {user?.rol && ROL_LABEL[user.rol]}
                    </span>
                </div>

                <div className="py-4">
                    <div className="flex flex-col gap-2">
                        {sidebarMainLinks.map((link) => {
                            const Icon = link.icon;
                            const href = `${basePath}/${link.href}`;
                            const isActive = pathname === href;
                            return (
                                <Link
                                    key={link.label}
                                    href={href}
                                    className={`group flex items-center gap-3 px-4 py-2 text-sm transition-all duration-200 ${
                                        isActive ? `${link.color.bg} ${link.color.bl}` : link.color.hoverBg
                                    }`}
                                >
                                    <Icon size={36} className={`${link.color.text} ${link.color.bg} p-2 rounded-xl`} />
                                    <span
                                        className={`font-semibold transition-colors ${
                                            isActive ? link.color.text : `text-festiva-midnight-blue ${link.color.hoverText}`
                                        }`}
                                    >
                                        {link.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="px-4 my-4">
                        <hr className="border-t-2 border-festiva-midnight-blue/10" />
                    </div>

                    <div className="mt-3">
                        {sidebarSecondaryLinks.map((link) => {
                            const Icon = link.icon;
                            const href = `${basePath}/${link.href}`;
                            const isActive = pathname === href;
                            return (
                                <Link
                                    key={link.label}
                                    href={href}
                                    className={`flex items-center gap-3 text-sm px-4 py-2 font-semibold text-festiva-midnight-blue transition-colors duration-200 ${
                                        isActive ? "bg-festiva-midnight-blue/5" : "hover:bg-festiva-midnight-blue/5"
                                    }`}
                                >
                                    <Icon size={36} className="bg-festiva-midnight-blue/5 p-2 rounded-xl" />
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-center px-4 mt-auto pb-6">
                    <button
                        onClick={handleLogout}
                        disabled={isSigningOut}
                        className="flex items-center justify-center gap-2 w-full bg-festiva-midnight-blue/10 text-festiva-midnight-blue font-bold py-2.5 px-[1.125rem] rounded-xl disabled:opacity-60"
                    >
                        <LogOut size={20} />
                        {isSigningOut ? "Cerrando sesión..." : "Cerrar sesión"}
                    </button>
                </div>
            </aside>
        </div>
    );
}
