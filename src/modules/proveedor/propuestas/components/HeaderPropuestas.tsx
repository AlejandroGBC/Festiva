import { Menu, SlidersHorizontal } from "lucide-react";
import Button from "@/shared/components/Button";

interface HeaderPropuestasProps {
  onMenuClick?: () => void;
  onFiltroClick?: () => void;
}

export const HeaderPropuestas = ({ onMenuClick, onFiltroClick }: HeaderPropuestasProps) => (
  <div className="w-full flex items-center justify-between px-4 py-3">
    <Button variant="light" size="icon" shape="pill" onClick={onMenuClick}>
      <Menu size={20} />
    </Button>
    <h1 className="text-xl font-extrabold text-festiva-midnight-blue">Mis propuestas</h1>
    <Button variant="light" size="icon" shape="pill" onClick={onFiltroClick}>
      <SlidersHorizontal size={18} />
    </Button>
  </div>
);