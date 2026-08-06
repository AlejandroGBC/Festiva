/**
 * Ubicación sugerida:
 *   src/shared/lib/whatsapp.ts
 */

/** Arma un link wa.me con mensaje pre-cargado. wa.me necesita el
 *  teléfono en dígitos puros (sin '+', espacios ni guiones). */
export function construirLinkWhatsApp(telefono: string, mensaje: string): string {
  const soloDigitos = telefono.replace(/\D/g, "");
  return `https://wa.me/${soloDigitos}?text=${encodeURIComponent(mensaje)}`;
}

interface DatosMensajeOferta {
  nombreCliente: string;
  nombreProveedor: string;
  eventoTitulo: string;
  servicio: string;
  precio: number;
  /** true = ya aceptaste esa oferta (tono de coordinación).
   *  false = todavía la estás evaluando (tono de consulta). */
  yaAceptada: boolean;
}

/** Mensaje natural en español hondureño, distinto según si la oferta
 *  ya fue aceptada o todavía se está evaluando. */
export function construirMensajeOferta(datos: DatosMensajeOferta): string {
  const precioFormateado = `L. ${datos.precio.toLocaleString("es-HN")}`;

  if (datos.yaAceptada) {
    return `¡Hola ${datos.nombreProveedor}! Soy ${datos.nombreCliente} 👋 Te escribo por el evento "${datos.eventoTitulo}". Me enviaste una oferta de ${precioFormateado} por ${datos.servicio} y ya la acepté desde Festiva — ¡vamos coordinando los detalles! 🎉`;
  }

  return `¡Hola ${datos.nombreProveedor}! Soy ${datos.nombreCliente} 👋 Te escribo por tu oferta de ${precioFormateado} para "${datos.eventoTitulo}" (${datos.servicio}). Quería conversar un poco antes de decidir, ¿tenés un momento?`;
}