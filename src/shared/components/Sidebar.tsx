import usuarioCliente from "../mocks/usuarioCliente";
import { User, Home, Calendar, Briefcase, MessageSquare, CreditCard, Settings, LogOut } from "lucide-react";
import Link from "next/link";

const sidebarMainLinks = [
    {
        label: "Inicio",
        href: "/cliente/inicio",
        icon: Home,
        color: "festiva-electric-violet"
    },
    {
        label: "Mis Eventos",
        href: "",
        icon: Calendar,
        color: "festiva-confetti-orange"
    },
    {
        label: "Ofertas recibidas",
        href: "",
        icon: Briefcase,
        color: "festiva-euphoric-pink"
    },
    {
        label: "Chat",
        href: "",
        icon: MessageSquare,
        color: "festiva-mint-neon"
    }
]

const sidebarSecondaryLinks = [
    {
        label: "Perfil",
        href: "",
        icon: User,
    },
    {
        label: "Pagos",
        href: "",
        icon: CreditCard,
    },
    {
        label: "Configuracion",
        href: "",
        icon: Settings,
    }
]

export function Sidebar() {
    return (
        <div className="w-80 h-full">
            <div className="bg-festiva-midnight-blue px-4 pt-10 pb-4">
                <span className="bg-festiva-euphoric-pink text-white rounded-[999px] p-3 h-auto items-center text-lg font-bold">
                    {usuarioCliente.abreviatura}
                </span>
                <h1 className="text-white font-bold mt-4 mb-0">{usuarioCliente.nombre}</h1>
                <p className="text-white/55 text-xs mb-3">{usuarioCliente.correo}</p>
                <span className="flex items-center bg-festiva-euphoric-pink/10 text-festiva-euphoric-pink text-xs px-3 py-2 w-fit gap-1 rounded-[999px]">
                    <User size={12} strokeWidth={1.5} />
                    {usuarioCliente.clienteVerificado ? "Cliente verificado" : "Cliente no verificado"}
                </span>
            </div>
            <div className="px-4">
                <div className="flex flex-col gap-2 mt-3">
                    {sidebarMainLinks.map((link) => {
                        const Icon = link.icon;
                        const color = link.color;
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="flex items-center gap-3 rounded-lg text-sm transition-colors py-1"
                            >
                                <Icon size={36} className={`text-${color} bg-${color}/10 p-2 rounded-xl`} />
                                <span className="text-festiva-midnight-blue font-semibold">{link.label}</span>
                            </Link>
                        );
                    })}
                </div>
                <div className="border-t-2 border-solid b-festiva-midnight-blue/45 mt-3 pt-4">
                    {sidebarSecondaryLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="flex items-center gap-3 transition-colors text-sm text-festiva-midnight-blue font-semibold py-1"
                            >
                                <Icon size={36} className="bg-festiva-midnight-blue/5 p-2 rounded-xl" />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-center px-4">
                <button className="flex items-center justify-center gap-2 w-full bg-festiva-midnight-blue/10 text-festiva-midnight-blue font-bold py-2.5 px-[1.125rem] rounded-xl">
                    <LogOut size={20} />
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}

export default Sidebar;