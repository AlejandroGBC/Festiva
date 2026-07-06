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
    <nav className="flex w-full items-center justify-between rounded-xl border border-[#C9C4D0] bg-[#F1ECF1] px-2 py-2">
      {navLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a key={link.href} href={link.href} className="group flex flex-1 flex-col items-center rounded-full py-2 transition-colors hover:bg-festiva-euphoric-pink">
            <Icon size={18} className="text-[#48454F] transition-colors group-hover:text-[#590027]" />
            <span className="mt-1 text-[11px] text-[#48454F] transition-colors group-hover:text-[#590027] font-medium tracking-[0.5px]">
              {link.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

export default Navbar;