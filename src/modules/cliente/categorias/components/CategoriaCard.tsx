import { ChevronRight, type LucideIcon } from "lucide-react";

interface CategoriaCardProps {
  nombre: string;
  Icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  onClick?: () => void;
}

export const CategoriaCard = ({ nombre, Icon, iconColor, bgColor, onClick }: CategoriaCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className="text-left bg-white rounded-2xl shadow-sm p-5 flex flex-col justify-between h-44"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${bgColor}`}>
      <Icon className={iconColor} size={26} />
    </div>

    <div>
      <p className="font-bold text-festiva-midnight-blue">{nombre}</p>
    </div>

    <div className="flex justify-end">
      <ChevronRight size={18} className="text-gray-300" />
    </div>
  </button>
);