"use client";

import { Home, Calendar, MessageSquare, User, Search} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from 'next/link';

const navLinks = [
  {
    label: "Inicio",
    href: "/",
    icon: Home,
  },
  {
    label: "Buscar",
    href: "/buscar",
    icon: Search,
  },
  {
    label: "Eventos",
    href: "/eventos",
    icon: Calendar,
  },
  {
    label: "Chat",
    href: "/mensajes",
    icon: MessageSquare,
  },
  {
    label: "Perfil",
    href: "/perfil",
    icon: User,
  },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="flex w-full items-center justify-between rounded-xl border border-[#C9C4D0] bg-[#F1ECF1] p-2">
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link key={link.href} href={link.href} className={`group flex flex-1 flex-col items-center rounded-full py-1 transition-colors  `}>
            <Icon size={18} className={`text-[#48454F] transition-colors ${isActive ? "text-festiva-electric-violet" : "group-hover:text-festiva-electric-violet group-hover:font-" }`}/>
            <span className={`mt-1 text-[11px] text-[#48454F] transition-colors ${isActive ? "text-festiva-electric-violet font-extrabold" : "group-hover:text-festiva-electric-violet" } font-medium tracking-[0.5px]`}>
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default Navbar;