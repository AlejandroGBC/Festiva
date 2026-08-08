export interface SidebarLink {
    label: string;
    href: string;
    icon: React.ElementType;
    color?: {
        text: string;
        bg: string;
        hoverBg: string;
        hoverText: string;
        bl: string;
    };
}