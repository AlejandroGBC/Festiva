// src/shared/components/Navbar.tsx
//
// ÚNICO CAMBIO respecto al original: todas las rutas ahora llevan el
// prefijo /cliente/, consistente con que "cliente" es una carpeta real
// en tu app/ (no un route group). Antes solo "Inicio" lo tenía, por eso
// los otros 4 links no redirigían a ningún lado real.

"use client";

import { Home, Calendar, MessageSquare, User, Search} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from 'next/link';

const navLinks = [
  {
    label: "Inicio",
    href: "/cliente/inicio",
    icon: Home,
  },
  {
    label: "Buscar",
    href: "/cliente/buscar",
    icon: Search,
  },
  {
    label: "Eventos",
    href: "/cliente/eventos",
    icon: Calendar,
  },
  {
    label: "Chat",
    href: "/cliente/chat",
    icon: MessageSquare,
  },
  {
    label: "Perfil",
    href: "/cliente/perfil",
    icon: User,
  },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 z-[52] flex w-full items-center justify-between border-t border-[#C9C4D0] bg-white p-2">
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link key={link.href} href={link.href} className={`group flex flex-1 flex-col items-center rounded-full py-1 transition-colors `}>
            <Icon size={22} className={` ${isActive ? "text-festiva-electric-violet" : "group-hover:text-festiva-electric-violet text-festiva-midnight-blue/45" } transition-colors`}/>
            <span className={`mt-1 text-[11px] ${isActive ? "text-festiva-electric-violet font-extrabold" : "group-hover:text-festiva-electric-violet font-medium text-festiva-midnight-blue/45 tracking-[0.5px]" } transition-colors`}>
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default Navbar;