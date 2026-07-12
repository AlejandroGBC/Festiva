import { LucideIcon } from "lucide-react";

interface IconTileProps {
    nombre : string,
    Icon : LucideIcon,
    iconColor : string,
    bgColor : string
}

export function IconTile ({nombre = "", Icon , iconColor = "", bgColor = ""} : IconTileProps) {
    return (
        <span className="flex flex-col gap-2 justify-center items-center font-semibold text-xs text-festiva-midnight-blue">
            <Icon className={`${iconColor} ${bgColor} p-4 rounded-2xl`} size={53}/>
            {nombre}
        </span>
    );
}