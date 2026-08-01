import type { LucideIcon } from "lucide-react";

export interface Categoria {
  id: number;
  nombre: string;
  icon: LucideIcon;
  proveedores: number;
  color: {
    text: string;
    bg: string;
  };
}