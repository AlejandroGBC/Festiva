/**
 * Ubicación:
 *   instrumentation.ts (en la RAÍZ del proyecto, junto a next.config.mjs
 *   — NO dentro de src/, a menos que tu next.config tenga configurado
 *   `src` como base, en cuyo caso va en src/instrumentation.ts)
 *
 * Next.js ejecuta la función register() UNA VEZ al arrancar el proceso
 * del servidor, antes de atender cualquier request. Es el lugar
 * correcto para configuración global de red, en vez de repetir el
 * mismo fix en cada route.ts que hace un fetch externo.
 *
 * Qué arregla:
 * - En Windows, Node a veces intenta resolver DNS por IPv6 primero,
 *   tarda/falla, y recién el segundo intento cae a IPv4 y conecta bien
 *   (por eso el primer login o la primera llamada a la IA fallaban).
 * - El connect timeout interno de undici (el motor de fetch de Node)
 *   es de 10s por defecto — a veces no alcanza en la primera conexión
 *   "fría" hacia un host externo (Groq, Supabase Auth, etc).
 *
 * Requiere el flag experimental en next.config.mjs (Next 14):
 *   experimental: { instrumentationHook: true }
 */

export async function register() {
  // Esto también corre en el Edge Runtime (middleware) si no filtramos,
  // y ahí no existen los módulos de Node — nos aseguramos de que esto
  // solo corra en el runtime de Node real (donde sí hacemos fetches
  // externos: rutas API, Server Components, etc).
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const dns = await import("node:dns");
    dns.setDefaultResultOrder("ipv4first");

    const { Agent, setGlobalDispatcher } = await import("undici");
    setGlobalDispatcher(new Agent({ connect: { timeout: 30_000 } }));

    console.log("[instrumentation] DNS ipv4first + connect timeout 30s configurados globalmente");
  }
}