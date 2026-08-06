/**
 * Ubicación sugerida:
 *   src/shared/lib/servicio-icono.ts
 *
 * tbl_servicios solo tiene "nombre" — no hay icono ni color en la DB.
 * En vez de un mapeo por nombre EXACTO (que se rompe apenas el nombre
 * real difiere un poco — ej. "Fotografia de eventos" vs "Fotografía"),
 * usamos matching por PALABRA CLAVE (o frase) sobre el nombre
 * normalizado (sin tildes, minúsculas). Mucho más resistente a como
 * esté redactado el nombre real en tu DB.
 *
 * Cobertura ampliada pensando en categorías típicas del rubro de
 * eventos en Honduras: marimba/mariachi/banda en vivo, quinceañeras,
 * chef privado, food truck, salones/quintas/haciendas, coordinación de
 * bodas, etc.
 *
 * ORDEN IMPORTA: el primer patrón que matchea gana, y se recorre de
 * arriba hacia abajo. Las frases/palabras más ESPECÍFICAS van primero
 * para no perderlas contra un patrón más genérico (ej: "grupo musical"
 * tiene que ganarle a "musica" — si no, "musical" matchearía el bucket
 * genérico de DJ/música porque "musical" contiene la subcadena
 * "musica"). Si agregás categorías nuevas, pensá en qué otras palabras
 * ya existentes podrían "comerse" la tuya por contener su subcadena, y
 * ubicá la más específica antes.
 *
 * Si un servicio no matchea ningún patrón, cae al ícono genérico
 * (PartyPopper) — nunca se rompe, en el peor caso se ve neutro.
 */

import {
  Sparkles,
  Camera,
  Video,
  UtensilsCrossed,
  Music,
  Palette,
  Cake,
  Lightbulb,
  PartyPopper,
  Flower2,
  Armchair,
  Car,
  Shield,
  Mic2,
  Mic,
  ChefHat,
  Truck,
  IceCreamCone,
  Wine,
  Baby,
  Projector,
  Tent,
  Bus,
  Scissors,
  Shirt,
  Landmark,
  Church,
  CalendarDays,
  Ticket,
  Gift,
  Building2,
  Flame,
  Crown,
  HeartHandshake,
  Guitar,
  type LucideIcon,
} from "lucide-react";

export interface IconoColor {
  Icon: LucideIcon;
  color: { text: string; bg: string };
}

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes/diacríticos (incluye la ñ → n)
    .toLowerCase();
}

const VIOLETA = { text: "text-festiva-electric-violet", bg: "bg-festiva-electric-violet/10" };
const ROSA = { text: "text-festiva-euphoric-pink", bg: "bg-festiva-euphoric-pink/10" };
const NARANJA = { text: "text-festiva-confetti-orange", bg: "bg-festiva-confetti-orange/10" };
const TEAL = { text: "text-festiva-mint-neon", bg: "bg-festiva-mint-neon/10" };

const PATRONES: { palabras: string[]; icono: IconoColor }[] = [
  // ── Música en vivo (va ANTES del bucket genérico de DJ/música,
  //    porque "musical" contiene la subcadena "musica") ──
  {
    palabras: ["banda en vivo", "grupo musical", "mariachi", "marimba", "banda musical", "trio musical"],
    icono: { Icon: Guitar, color: TEAL },
  },
  { palabras: ["karaoke"], icono: { Icon: Mic, color: TEAL } },

  // ── Foto y video ──
  { palabras: ["foto"], icono: { Icon: Camera, color: VIOLETA } },
  { palabras: ["video", "film", "cine"], icono: { Icon: Video, color: TEAL } },

  // ── Decoración y flores ──
  { palabras: ["decora", "ambient", "globo"], icono: { Icon: Sparkles, color: ROSA } },
  { palabras: ["flor", "floreria", "floristeria"], icono: { Icon: Flower2, color: ROSA } },

  // ── Comida y bebida ──
  { palabras: ["chef", "gourmet"], icono: { Icon: ChefHat, color: NARANJA } },
  { palabras: ["food truck", "carrito de comida"], icono: { Icon: Truck, color: NARANJA } },
  { palabras: ["catering", "banquete", "buffet", "comida", "menu"], icono: { Icon: UtensilsCrossed, color: NARANJA } },
  { palabras: ["reposteria", "pastel", "dulce", "torta", "cupcake"], icono: { Icon: Cake, color: NARANJA } },
  { palabras: ["helado", "paleta", "nieve"], icono: { Icon: IceCreamCone, color: NARANJA } },
  { palabras: ["bar movil", "barra libre", "mixologia", "bartender", "cantina", "bebidas"], icono: { Icon: Wine, color: NARANJA } },

  // ── Música / sonido genérico ──
  { palabras: ["dj", "musica", "sonido", "audio"], icono: { Icon: Music, color: TEAL } },

  // ── Niños / familia ──
  { palabras: ["infantil", "payaso", "inflable", "brincolin", "bautizo", "baby shower"], icono: { Icon: Baby, color: ROSA } },

  // ── Producción técnica ──
  { palabras: ["ilumina", "luz", "luces"], icono: { Icon: Lightbulb, color: VIOLETA } },
  { palabras: ["pantalla", "proyector", "audiovisual", "led"], icono: { Icon: Projector, color: VIOLETA } },

  // ── Mobiliario e infraestructura ──
  { palabras: ["mobiliario", "silla", "mesa"], icono: { Icon: Armchair, color: VIOLETA } },
  { palabras: ["toldo", "carpa"], icono: { Icon: Tent, color: VIOLETA } },

  // ── Transporte ──
  { palabras: ["transporte", "limusina", "vehiculo", "carro"], icono: { Icon: Car, color: TEAL } },
  { palabras: ["autobus", "bus ", "microbus", "van "], icono: { Icon: Bus, color: TEAL } },

  // ── Belleza y vestuario ──
  { palabras: ["maquillaje", "peinado", "estilismo", "belleza"], icono: { Icon: Palette, color: ROSA } },
  { palabras: ["peluqueria", "corte de cabello"], icono: { Icon: Scissors, color: ROSA } },
  { palabras: ["vestido", "traje", "renta de ropa", "alquiler de trajes"], icono: { Icon: Shirt, color: ROSA } },

  // ── Seguridad y staff ──
  { palabras: ["seguridad", "guardia"], icono: { Icon: Shield, color: VIOLETA } },
  { palabras: ["presentador", "locutor", "maestro de ceremonias"], icono: { Icon: Mic2, color: NARANJA } },

  // ── Lugares y ceremonia ──
  { palabras: ["salon de eventos", "quinta", "hacienda", "jardin de eventos", "centro de eventos", "casa de eventos"], icono: { Icon: Landmark, color: VIOLETA } },
  { palabras: ["iglesia", "oficiante", "ceremonia religiosa"], icono: { Icon: Church, color: VIOLETA } },
  { palabras: ["hospedaje", "hotel"], icono: { Icon: Building2, color: TEAL } },

  // ── Planificación y detalles ──
  { palabras: ["planificacion de eventos", "coordinacion de eventos", "wedding planner", "organizacion de eventos"], icono: { Icon: CalendarDays, color: ROSA } },
  { palabras: ["invitacion", "tarjeteria", "papeleria"], icono: { Icon: Ticket, color: ROSA } },
  { palabras: ["souvenir", "recuerdo", "detalle para invitados", "regalo"], icono: { Icon: Gift, color: ROSA } },
  { palabras: ["pirotecnia", "fuegos artificiales"], icono: { Icon: Flame, color: NARANJA } },

  // ── Tipos de evento (por si tbl_servicios los usa como categoría) ──
  { palabras: ["quinceanera"], icono: { Icon: Crown, color: ROSA } },
  { palabras: ["boda", "matrimonio"], icono: { Icon: HeartHandshake, color: ROSA } },
];

export const ICONO_DEFAULT: IconoColor = {
  Icon: PartyPopper,
  color: { text: "text-festiva-midnight-blue/50", bg: "bg-festiva-midnight-blue/5" },
};

export function obtenerIconoServicio(nombre: string): IconoColor {
  const nombreNormalizado = normalizar(nombre);

  for (const patron of PATRONES) {
    if (patron.palabras.some((palabra) => nombreNormalizado.includes(palabra))) {
      return patron.icono;
    }
  }

  return ICONO_DEFAULT;
}