"use client";

import { Home, PartyPopper, MessageSquare, User} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from 'next/link';

const navLinks = [
  {
    label: "Inicio",
    href: "/",
    icon: Home,
  },
  {
    label: "Eventos",
    href: "/eventos",
    icon: PartyPopper,
  },
  {
    label: "Mensajes",
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
          <Link key={link.href} href={link.href} className={`group flex flex-1 flex-col items-center rounded-full py-1 transition-colors ${isActive ? "bg-festiva-euphoric-pink" : "hover:bg-festiva-euphoric-pink"} `}>
            <Icon size={18} className={`text-[#48454F] transition-colors ${isActive ? "text-[#590027]" : "group-hover:text-[#590027]" }`}/>
            <span className={`mt-1 text-[11px] text-[#48454F] transition-colors ${isActive ? "text-[#590027]" : "group-hover:text-[#590027]" } font-medium tracking-[0.5px]`}>
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default Navbar;