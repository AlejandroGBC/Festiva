/**
 * Ubicación sugerida:
 *   src/shared/lib/tipo-evento-icono.ts
 *
 * Mismo espíritu que servicio-icono.ts, pero para los TIPOS_EVENTO fijos
 * de CrearEventoForm (no vienen de la DB, así que acá el match es EXACTO
 * por nombre, no por palabra clave).
 */

import {
  HeartHandshake,
  Cake,
  GraduationCap,
  Crown,
  PartyPopper,
  Briefcase,
  Baby,
  Heart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface IconoColorBorde {
  Icon: LucideIcon;
  color: { text: string; bg: string; border: string };
}

const VIOLETA = {
  text: "text-festiva-electric-violet",
  bg: "bg-festiva-electric-violet/10",
  border: "border-festiva-electric-violet",
};
const ROSA = {
  text: "text-festiva-euphoric-pink",
  bg: "bg-festiva-euphoric-pink/10",
  border: "border-festiva-euphoric-pink",
};
const NARANJA = {
  text: "text-festiva-confetti-orange",
  bg: "bg-festiva-confetti-orange/10",
  border: "border-festiva-confetti-orange",
};
const TEAL = {
  text: "text-festiva-mint-neon",
  bg: "bg-festiva-mint-neon/10",
  border: "border-festiva-mint-neon",
};

const TIPO_EVENTO_ICONOS: Record<string, IconoColorBorde> = {
  Boda: { Icon: HeartHandshake, color: ROSA },
  Cumpleaños: { Icon: Cake, color: NARANJA },
  Graduación: { Icon: GraduationCap, color: VIOLETA },
  "XV Años": { Icon: Crown, color: ROSA },
  Fiesta: { Icon: PartyPopper, color: TEAL },
  Corporativo: { Icon: Briefcase, color: VIOLETA },
  Bautizo: { Icon: Baby, color: TEAL },
  Aniversario: { Icon: Heart, color: ROSA },
};

export const ICONO_TIPO_EVENTO_DEFAULT: IconoColorBorde = {
  Icon: Sparkles,
  color: {
    text: "text-festiva-midnight-blue/50",
    bg: "bg-festiva-midnight-blue/5",
    border: "border-festiva-midnight-blue/20",
  },
};

export function obtenerIconoTipoEvento(tipo: string): IconoColorBorde {
  return TIPO_EVENTO_ICONOS[tipo] ?? ICONO_TIPO_EVENTO_DEFAULT;
}