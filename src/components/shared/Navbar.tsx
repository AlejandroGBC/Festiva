import { Home, PartyPopper, MessageSquare, User } from "lucide-react";

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
  return (
    <nav className="flex items-center justify-center gap-10 bg-[#F1ECF1] border-[#F1ECF1] px-16 py-8 rounded-xl">
      {navLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a key={link.href} href={link.href} className="group flex flex-col items-center rounded-full px-5 py-1 transition-colors hover:bg-[#FE4C8C]">
            <Icon size={20} className="text-[#48454F] transition-colors group-hover:text-[#590027]" />

            <span className="text-[#48454F] transition-colors group-hover:text-[#590027]">
              {link.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

export default Navbar;