import { Menu, Bell } from "lucide-react";
import Image from "next/image";
import isotipoColor from "@/shared/img/isotipoColor.svg";
import usuarioCliente from "@/shared/mocks/usuarioCliente";

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="justify-between flex pb-4 p-5">
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
                    {usuarioCliente.abreviatura}
                </span>
            </div>
        </header>
    );
}

export default Header;