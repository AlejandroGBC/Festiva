// public/sw.js
//
// Service worker de Festiva: cacheo básico para que la app abra offline
// (shell mínimo), + recepción y click de notificaciones push.
//
// FIX 1 (navegación): el fallback offline tenía un bug real —
// `caches.match("/") ?? caches.match(request)` compara dos objetos
// Promise (nunca null/undefined), así que SIEMPRE devolvía la página "/"
// cacheada (la splash screen) apenas la red tardaba o fallaba una vez.
//
// FIX 2 (RSC / navegación client-side de Next.js): el handler genérico de
// fetch no tenía `.catch`, y además interceptaba TODO, incluyendo los
// fetches que Next.js App Router hace para pedir el RSC payload al usar
// router.push() (mode !== "navigate"). Si ese fetch fallaba (común en dev
// con HMR), la promesa quedaba rechazada sin manejar (o el SW devolvía un
// 504 fabricado), el navegador reportaba error al router, y Next
// interpretaba eso como navegación fallida → volvía a la página anterior
// (el "loading de un segundo y regresa al inicio" que veías al tocar
// "Ver todos" en Categorías).
//
// OJO: intentar filtrar esto por query param (?_rsc=...) NO es confiable,
// porque el nombre/formato cambia entre versiones de Next.js y a veces la
// diferenciación RSC se hace por headers en vez de query string. El
// filtro robusto es por `request.destination`: los fetch() programáticos
// que hace el router de Next (RSC, prefetch, data fetching) tienen
// destination === "" (vacío). Un <a>/navegación real tiene "document",
// un <img> tiene "image", un <script src> tiene "script", etc. Así que
// solo interceptamos destinations de assets estáticos conocidos, y todo
// lo demás (fetch/XHR programático) pasa directo a la red sin que el SW
// se meta — que es exactamente el comportamiento correcto acá.

const CACHE_NAME = "festiva-v2";
const URLS_PRECACHE = ["/", "/manifest.webmanifest", "/icons/icon-192.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nombres) =>
      Promise.all(
        nombres
          .filter((nombre) => nombre !== CACHE_NAME)
          .map((nombre) => caches.delete(nombre))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Solo interceptamos GET. POST/PUT/PATCH/DELETE van directo a la red
  // sin pasar por el SW (evita romper mutaciones, formularios, etc.).
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Nunca tocar requests cross-origin (CDNs, APIs externas, etc.) ni
  // rutas de API propias — esas siempre van directo a la red.
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api")) {
    return;
  }

  // Estrategia: network-first para navegación real (recarga de página,
  // escribir la URL, abrir un link, un <a> normal). Si la red falla DE
  // VERDAD (usuario sin conexión), recién ahí cae al shell offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        // 1. ¿Tenemos esta página exacta en caché? (visitada antes)
        const cacheadaExacta = await caches.match(request);
        if (cacheadaExacta) return cacheadaExacta;

        // 2. Si no, shell mínimo offline como último recurso
        const shell = await caches.match("/");
        if (shell) return shell;

        // 3. Si ni eso hay, un 503 honesto en vez de servir cualquier cosa
        return new Response("Estás sin conexión y esta página no está guardada.", {
          status: 503,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      })
    );
    return;
  }

  // Para todo lo que NO es navegación, solo nos interesa cachear assets
  // estáticos reales del navegador (imágenes, fuentes, css, scripts,
  // el manifest). Cualquier otra cosa — y en particular los fetch()
  // programáticos que hace Next.js para pedir el RSC payload al navegar
  // con router.push(), que tienen destination === "" — la dejamos pasar
  // SIN intervención del SW. Nada de respondWith acá: si no entra en
  // este set, hacemos return y el navegador maneja la request normal,
  // tal como si el SW no existiera.
  const DESTINOS_CACHEABLES = new Set([
    "style",
    "script",
    "image",
    "font",
    "manifest",
  ]);

  if (!DESTINOS_CACHEABLES.has(request.destination)) {
    return;
  }

  // Cache-first para los assets estáticos, con fallback a red y catch
  // para no dejar promesas rechazadas sin manejar.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        // Guardamos una copia en caché para la próxima vez, sin bloquear
        // la respuesta actual.
        if (response.ok) {
          const copia = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
        }
        return response;
      });
    })
  );
});

// ── Push notifications ──
self.addEventListener("push", (event) => {
  if (!event.data) return;

  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: "Festiva", body: event.data.text() };
  }

  const { title, body, url } = payload;

  event.waitUntil(
    self.registration.showNotification(title ?? "Festiva", {
      body: body ?? "Tenés una novedad nueva.",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      data: { url: url ?? "/cliente/notificaciones" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? "/cliente/notificaciones";

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(url) && "focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});