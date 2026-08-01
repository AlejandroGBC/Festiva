import { Menu, SlidersHorizontal } from "lucide-react";

interface BuscarHeaderProps {
  onMenuClick: () => void;
  onFiltrosClick?: () => void;
}

export default function BuscarHeader({ onMenuClick, onFiltrosClick }: BuscarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-5 pt-4 pb-2">
      <button onClick={onMenuClick} className="h-10 w-10 flex items-center justify-center">
        <Menu className="h-5 w-5 text-festiva-midnight-blue" />
      </button>

      <h1 className="text-lg font-bold text-festiva-midnight-blue">Explorar eventos</h1>

      <button
        onClick={onFiltrosClick}
        className="h-10 w-10 rounded-full bg-festiva-midnight-blue/5 flex items-center justify-center"
      >
        <SlidersHorizontal className="h-4 w-4 text-festiva-midnight-blue" />
      </button>
    </div>
  );
}