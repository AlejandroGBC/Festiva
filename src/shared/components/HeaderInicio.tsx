import { Menu, Bell } from "lucide-react";
import Image from "next/image";
import isotipoColor from "@/shared/img/isotipoColor.svg";
import { obtenerIniciales } from "../utils/obtenerIniciales";
import { UsuarioSesion } from "../types/auth.types";

interface HeaderProps {
    onMenuClick: () => void;
    user: UsuarioSesion
}

export function Header({ onMenuClick, user }: HeaderProps) {

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
                <button id="notif-btn" className="bg-white rounded-[999px] p-3 border-solid border-[1px] border-festiva-midnight-blue/9">
                    <Bell size={20} className="text-festiva-midnight-blue" strokeWidth={2} />
                </button>
                <span className="flex items-center justify-center w-11 h-11 bg-festiva-euphoric-pink text-white font-bold rounded-full text-sm shadow-sm">
                    {obtenerIniciales(user?.nombre)}
                </span>
            </div>
        </header>
    );
}

export default Header;