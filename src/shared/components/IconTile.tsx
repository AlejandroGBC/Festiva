import { LucideIcon } from "lucide-react";

interface IconTileProps {
  nombre: string;
  Icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

export function IconTile({ nombre = "", Icon, iconColor = "", bgColor = "" }: IconTileProps) {
  return (
    <span className="flex flex-col gap-2 items-center text-center w-full">
      <span className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${bgColor}`}>
        <Icon className={iconColor} size={24} />
      </span>
      <span className="font-semibold text-xs text-festiva-midnight-blue leading-tight line-clamp-2">
        {nombre}
      </span>
    </span>
  );
}