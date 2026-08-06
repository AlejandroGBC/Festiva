import { TrendingUp, HelpCircle, CircleX, MinusCircle, CircleCheckBig, TrendingDown } from "lucide-react";

export const getVariacionDetalle = (variacion: string) => {
  const clean = variacion.replace("%", "").trim();
  const num = parseFloat(clean);

  if (isNaN(num) || num === 0) {
    return {
      detalle: `0% vs anterior`,
      detalleColor: "text-festiva-monochromatic",
      detalleIcon: <TrendingUp className="h-3.5 w-3.5" />,
    };
  }

  if (num > 0) {
    return {
      detalle: `${variacion} vs anterior`,
      detalleColor: "text-festiva-mint-neon",
      detalleIcon: <TrendingUp className="h-3.5 w-3.5" />,
    };
  }
  return {
    detalle: `${variacion} vs anterior`,
    detalleColor: "text-festiva-berry-punch",
    detalleIcon: <TrendingDown className="h-3.5 w-3.5" />,
  };
};

export const getTasaRespuestaDetalle = (tasa: string | number) => {
  const tasaStr = String(tasa).trim();

  if (!tasaStr || tasaStr === '' || tasaStr === 'N/A' || tasaStr === '-') {
    return {
      detalle: "Sin datos",
      detalleColor: "text-festiva-gray",
      detalleIcon: <HelpCircle className="h-3.5 w-3.5" />,
    };
  }

  const cleanStr = tasaStr.replace('%', '').replace(',', '.').trim();
  const tasaNum = parseFloat(cleanStr);

  if (isNaN(tasaNum)) {
    return {
      detalle: "Valor inválido",
      detalleColor: "text-festiva-gray",
      detalleIcon: <HelpCircle className="h-3.5 w-3.5" />,
    };
  }

  if (tasaNum < 30) {
    return {
      detalle: "Malo",
      detalleColor: "text-festiva-berry-punch",
      detalleIcon: <CircleX className="h-3.5 w-3.5" />,
    };
  }

  if (tasaNum < 70) {
    return {
      detalle: "Mejorable",
      detalleColor: "text-festiva-sunset-gold",
      detalleIcon: <MinusCircle className="h-3.5 w-3.5" />,
    };
  }

  return {
    detalle: "Excelente",
    detalleColor: "text-festiva-mint-neon",
    detalleIcon: <CircleCheckBig className="h-3.5 w-3.5" />,
  };
};