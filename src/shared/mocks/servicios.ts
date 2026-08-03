import { Sparkles, Image, Package, Zap, Building, Heart, Leaf, Truck, Mic, Lightbulb } from "lucide-react";
import type { Categoria } from "@/shared/types/categorias-cliente.types";

// TODO: reemplazar por fetch real agrupando TBL_SERVICIOS por categoria + COUNT de TBL_PROVEEDOR_SERVICIOS
export const servicios: Categoria[] = [
  {
    id: 1,
    nombre: "Decoracion",
    icon: Sparkles,
    proveedores: 38,
    color: { text: "text-festiva-euphoric-pink", bg: "bg-festiva-euphoric-pink/10" },
  },
  {
    id: 2,
    nombre: "Fotografia",
    icon: Image,
    proveedores: 27,
    color: { text: "text-festiva-electric-violet", bg: "bg-festiva-electric-violet/10" },
  },
  {
    id: 3,
    nombre: "Catering",
    icon: Package,
    proveedores: 31,
    color: { text: "text-festiva-confetti-orange", bg: "bg-festiva-confetti-orange/10" },
  },
  {
    id: 4,
    nombre: "Musica",
    icon: Zap,
    proveedores: 19,
    color: { text: "text-festiva-mint-neon", bg: "bg-festiva-mint-neon/10" },
  },
  {
    id: 5,
    nombre: "Salones",
    icon: Building,
    proveedores: 22,
    color: { text: "text-festiva-midnight-blue", bg: "bg-festiva-midnight-blue/10" },
  },
  {
    id: 6,
    nombre: "Reposteria",
    icon: Heart,
    proveedores: 16,
    color: { text: "text-festiva-euphoric-pink", bg: "bg-festiva-euphoric-pink/10" },
  },
  {
    id: 7,
    nombre: "Flores",
    icon: Leaf,
    proveedores: 14,
    color: { text: "text-festiva-mint-neon", bg: "bg-festiva-mint-neon/10" },
  },
  {
    id: 8,
    nombre: "Transporte",
    icon: Truck,
    proveedores: 9,
    color: { text: "text-festiva-electric-violet", bg: "bg-festiva-electric-violet/10" },
  },
  {
    id: 9,
    nombre: "Animacion",
    icon: Mic,
    proveedores: 12,
    color: { text: "text-festiva-confetti-orange", bg: "bg-festiva-confetti-orange/10" },
  },
  {
    id: 10,
    nombre: "Iluminacion",
    icon: Lightbulb,
    proveedores: 11,
    color: { text: "text-festiva-midnight-blue", bg: "bg-festiva-midnight-blue/10" },
  },
];