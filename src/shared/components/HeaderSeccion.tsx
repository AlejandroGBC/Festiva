import { Menu } from "lucide-react";
import Button from "@/shared/components/Button";

interface HeaderSeccionProps {
  titulo: string;
  onMenuClick: () => void;
}

export default function HeaderSeccion({
  titulo,
  onMenuClick,
}: HeaderSeccionProps) {
  return (
    <div className="w-full flex items-center justify-between px-4 py-3">
      <Button variant="light" size="icon" shape="pill" onClick={onMenuClick}>
        <Menu size={20} />
      </Button>

      <h1 className="text-xl font-extrabold text-festiva-midnight-blue">{titulo}</h1>

      <div className="h-10 w-10" />
    </div>
  );
}