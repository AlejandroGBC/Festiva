// src/shared/components/Sidebar.tsx
//
// Cambios respecto al original:
// - z-index del backdrop/aside subido (z-[55]/z-[60]) por encima de
//   cualquier Button (que fuerza z-50 vía buttonVariants).
// - "Configuración" usa la ruta real /cliente/configuracion en vez de
//   href vacío.
// - user/signOut vienen del contexto real de autenticación.

"use client";

import { User, Home, Calendar, Briefcase, MessageSquare, CreditCard, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { obtenerIniciales } from "../utils/obtenerIniciales";
import { UsuarioSesion } from "../types/auth.types";

const sidebarMainLinks = [
    {
        label: "Inicio",
        href: "/cliente/inicio",
        icon: Home,
        color: {
            text: "text-festiva-electric-violet",
            bg: "bg-festiva-electric-violet/10",
            hoverBg: "hover:bg-festiva-electric-violet/10",
            hoverText: "group-hover:text-festiva-electric-violet",
            bl: "border-l-4 border-l-festiva-electric-violet"
        }
    },
    {
        label: "Mis Eventos",
        href: "/cliente/eventos",
        icon: Calendar,
        color: {
            text: "text-festiva-confetti-orange",
            bg: "bg-festiva-confetti-orange/10",
            hoverBg: "hover:bg-festiva-confetti-orange/10",
            hoverText: "group-hover:text-festiva-confetti-orange",
            bl: "border-l-4 border-l-festiva-confetti-orange"
        }
    },
    {
        label: "Ofertas recibidas",
        href: "/cliente/ofertas",
        icon: Briefcase,
        color: {
            text: "text-festiva-euphoric-pink",
            bg: "bg-festiva-euphoric-pink/10",
            hoverBg: "hover:bg-festiva-euphoric-pink/10",
            hoverText: "group-hover:text-festiva-euphoric-pink",
            bl: "border-l-4 border-l-festiva-euphoric-pink"
        }
    },
    {
        label: "Chat",
        href: "/cliente/chat",
        icon: MessageSquare,
        color: {
            text: "text-festiva-mint-neon",
            bg: "bg-festiva-mint-neon/10",
            hoverBg: "hover:bg-festiva-mint-neon/10",
            hoverText: "group-hover:text-festiva-mint-neon",
            bl: "border-l-4 border-l-festiva-mint-neon"
        }
    }
]

const sidebarSecondaryLinks = [
    {
        label: "Perfil",
        href: "/cliente/perfil",
        icon: User,
    },
    {
        label: "Pagos",
        href: "/cliente/pagos",
        icon: CreditCard,
    },
    {
        label: "Configuración",
        href: "/cliente/configuracion",
        icon: Settings,
    }
]

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    user: UsuarioSesion | null;
    signOut: () => void;
}

export function Sidebar({ isOpen, onClose, user, signOut }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        await signOut();
        router.push("/auth/login");
        router.refresh(); // fuerza que el middleware/RSC vean que ya no hay sesión
    }

    return (
        <div>
            {/* z-40 → z-[55]: por encima de cualquier Button (z-50 fijo) */}
            <div onClick={onClose} className={`absolute inset-0 z-[55] bg-black/30 transition-opacity duration-300 ${ isOpen ? "opacity-100 visible" : "opacity-0 invisible" }`}/>
            {/* z-50 → z-[60]: por encima de cualquier Button (z-50 fijo) */}
            <aside className={`absolute top-0 left-0 z-[60] w-72 h-full flex flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out ${ isOpen ? "translate-x-0" : "-translate-x-full" }`}>
                <div className="bg-festiva-midnight-blue px-4 pt-9 pb-4">
                    <span className="bg-festiva-euphoric-pink text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                        {obtenerIniciales(user?.nombre)}
                    </span>
                    <h1 className="text-white font-bold mt-4 mb-0">{user?.nombre}</h1>
                    <p className="text-white/55 text-xs mb-3">{user?.correo}</p>
                    <span className="flex items-center bg-festiva-euphoric-pink/10 text-festiva-euphoric-pink text-xs px-3 py-2 w-fit gap-1 rounded-[999px]">
                        <User size={12} strokeWidth={1.5} />
                        {"Cliente verificado"}
                    </span>
                </div>
                <div className="py-4">
                    <div className="flex flex-col gap-2">
                        {sidebarMainLinks.map((link) => {
                            const Icon = link.icon;
                            const textColor = link.color.text;
                            const backgroundColor = link.color.bg;
                            const isActive = pathname === link.href;
                            const borderLeftColor = link.color.bl;
                            const hoverBg = link.color.hoverBg;
                            const hoverText = link.color.hoverText;
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`group flex items-center gap-3 px-4 py-2 text-sm transition-all duration-200 
                                    ${isActive ? `${backgroundColor} ${borderLeftColor}` : hoverBg}`}>
                                    <Icon size={36} className={`${textColor} ${backgroundColor} p-2 rounded-xl`} />
                                    <span className={`font-semibold transition-colors ${isActive ? textColor : `text-festiva-midnight-blue ${hoverText}`}`}>
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
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`flex items-center gap-3 text-sm px-4 py-2 font-semibold text-festiva-midnight-blue transition-colors duration-200 ${isActive
                                        ? "bg-festiva-midnight-blue/5"
                                        : "hover:bg-festiva-midnight-blue/5"
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
                    <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full bg-festiva-midnight-blue/10 text-festiva-midnight-blue font-bold py-2.5 px-[1.125rem] rounded-xl">
                        <LogOut size={20} />
                        Cerrar sesión
                    </button>
                </div>
            </aside>
        </div>
    );
}

export default Sidebar;