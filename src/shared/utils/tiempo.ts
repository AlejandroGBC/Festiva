
export function tiempoRelativo(fechaISO: string): string {
  const diffMs = Date.now() - new Date(fechaISO).getTime();
  const horas = Math.floor(diffMs / (1000 * 60 * 60));
  if (horas < 1) return "hace un momento";
  if (horas < 24) return `hace ${horas}h`;
  const dias = Math.floor(horas / 24);
  return `hace ${dias}d`;
}

export function formatFecha(iso: string): string {
  return new Intl.DateTimeFormat("es-HN", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso)
  );
}