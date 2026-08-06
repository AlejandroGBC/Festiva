# Módulo Cliente — Festiva

Resumen del trabajo realizado en el sistema de cliente: Crear Evento, Mis Eventos, Ofertas Recibidas, Notificaciones, Perfil, Inicio/Búsqueda, PWA, y las correcciones de infraestructura que surgieron en el camino.

---

## 1. Arquitectura general

Se siguió el patrón ya establecido en el proyecto:

- **`src/app/`** — solo enrutamiento. Cada `page.tsx` es un **Server Component** delgado: hace el `fetch` de datos vía un `service` y renderiza el componente cliente correspondiente, sin lógica propia.
- **`src/modules/cliente/<feature>/`** — cada feature (`anuncio`, `ofertas`, `notificaciones`, `perfil`, `inicio`, `proveedores`) tiene su propia carpeta con:
  - `types/` — interfaces TypeScript
  - `services/` — un archivo **servidor** (lectura, usa `createServerSupabaseClient`) y uno **cliente** (mutaciones, usa `createClient` del navegador) cuando corresponde
  - `components/` — Client Components (`"use client"`), reciben los datos ya cargados por props

**Regla clave que se respetó en todo el módulo:** un Server Component **nunca** puede pasarle a un Client Component algo que no sea dato puro (string, number, boolean, objeto/array plano). Íconos de Lucide, funciones, clases de Supabase, etc. tienen que resolverse **dentro** del Client Component. Esto causó un bug real (ver sección de fixes) y quedó documentado para no repetirlo.

---

## 2. Features implementadas

### Crear Evento (`/cliente/eventos/crear`)
Wizard de 4 pasos: asistente IA (Groq/Llama vía `/api/ia`), datos básicos, detalles/servicios, resumen y publicación.
- Validación de campos obligatorios antes de publicar (coincide con las columnas `NOT NULL` reales de `tbl_eventos`).
- Al publicar: resuelve `id_tipo_evento` e `id_servicio` por nombre, inserta el evento y sus servicios relacionados (`tbl_evento_servicios`).

### Mis Eventos (`/cliente/eventos`)
Lista de eventos del cliente con filtro por estado. Cada card lleva al detalle.

### Detalle de Evento (`/cliente/eventos/[id_evento]`)
Ver evento completo (servicios, cantidad de ofertas), y según su estado:
- **Editar** (formulario simple, no repite el wizard completo)
- **Cancelar** (estado → `cancelado`)
- **Eliminar** (solo si todavía no tiene ninguna oferta — si ya tiene, se cancela en vez de borrar, para no perder ofertas reales en cascada)
- **Marcar como finalizado** (si está `en_proceso`)

*Pendiente: una versión más rica de esta pantalla (progreso %, lista de proveedores contratados con estado, timeline) — diseño ya definido, falta implementar con datos reales de `tbl_contrataciones`/`tbl_pagos`.*

### Ofertas Recibidas (`/cliente/ofertas`)
Ofertas de todos los eventos del cliente, con filtro por evento (mostrando cantidad de ofertas por evento) y por estado (`enviada`/`aceptada`/`rechazada`/`cancelada`). Incluye calificación promedio del proveedor cuando existe.

### Notificaciones (`/cliente/notificaciones`)
**No se creó una tabla nueva.** Las notificaciones se **derivan** de ofertas recientes (`tbl_ofertas`), comparando su fecha contra una sola columna nueva: `tbl_perfiles_cliente.notificaciones_vistas_en` (ver migraciones). Esto evita duplicar datos y mantiene el esquema simple.
- Badge rojo pulsante en la campana del `Header` cuando hay notificaciones nuevas, en todas las páginas principales.

### Perfil (`/cliente/perfil`)
Perfil con estadísticas reales (eventos, proveedores contratados, reseñas escritas) y accesos a:
- **Datos personales** (`/cliente/perfil/datos`) — editar nombre/teléfono (correo no editable desde acá, requiere flujo de confirmación aparte)
- **Seguridad** (`/cliente/perfil/seguridad`) — cambiar contraseña
- **Configuración** (`/cliente/configuracion`) — hub con accesos a lo anterior + notificaciones push + legal + cerrar sesión

### Inicio y Búsqueda
- **Inicio** (`/cliente/inicio`) ahora usa categorías y proveedores destacados **reales** (antes eran mocks estáticos).
- **Categorías** (`/cliente/categorias`) — grid de todas las categorías; tocar una lleva a Buscar ya filtrado.
- **Buscar** (`/cliente/buscar`) — búsqueda de proveedores con debounce (350ms), filtro por categoría vía `?categoria=`, resultados en vivo.
- El "destacado" y el precio de un proveedor son **derivados** (no hay columnas para eso en el schema): destacado = rating ≥ 4.8 con ≥ 3 reseñas; precio = la oferta más barata que ese proveedor haya enviado.

*Pendiente: `/cliente/proveedores/[id]` (perfil público del proveedor al tocar una card) — todavía no está construida, es el siguiente paso lógico.*

---

## 3. PWA

- **Manifest** (`src/app/manifest.ts`), íconos reales (isotipo de Festiva, versiones normal + maskable).
- **Service Worker** (`public/sw.js`) — caché básica offline + recepción de push. Tuvo un bug real de lógica (ver fixes) ya corregido.
- **Push notifications reales** vía Web Push (VAPID) — tabla nueva `tbl_push_subscriptions`, toggle en Configuración, función `enviarPushAUsuario()` lista para que el lado de **proveedor** la llame cuando se envíe una oferta nueva (integración pendiente de coordinar).
- **Splash screen** (`src/app/page.tsx`) — animación de entrada con el isotipo real, redirige automático a `/auth/login`.

---

## 4. Fixes de infraestructura (importantes para el equipo)

Estos no son features, pero valen la pena que el equipo los conozca porque afectan a **todo el proyecto**, no solo a mi parte:

| Problema | Causa | Fix |
|---|---|---|
| Botones aparecían por encima del `Sidebar` | `Button.tsx` fuerza `z-50` en todos los botones | Subí el z-index del `Sidebar` (`z-[55]`/`z-[60]`) en `shared/components/Sidebar.tsx` |
| Login/IA fallaban la primera vez tras arrancar el server | Node en Windows intenta DNS por IPv6 primero + timeout de conexión corto (10s) | `src/instrumentation.ts` — fix global de DNS/timeout, corre una vez al iniciar el servidor |
| Navegación a páginas nuevas rebotaba sola a Inicio | Bug real en `sw.js`: `caches.match("/") ?? caches.match(request)` comparaba dos `Promise` (nunca `null`), así que servía la splash cacheada ante cualquier demora de red | Reescrito el fallback offline con `async/await` encadenado correctamente |
| El fix de `sw.js` no se notaba al probarlo | El navegador cachea el propio service worker agresivamente | Header `Cache-Control: no-cache` para `/sw.js` en `next.config.mjs` |
| Errores de tipos con Supabase | `supabase.types.ts` desactualizado tras cambios de schema | Recordatorio: correr `npx supabase gen types typescript --project-id <id> \| Out-File -Encoding utf8 src/shared/types/supabase.types.ts` cada vez que cambie el schema (ojo con `Out-File` sin `-Encoding utf8` en PowerShell — genera UTF-16 y rompe el parser de ESLint) |

---

## 5. Migraciones SQL agregadas

Todas en el SQL Editor de Supabase, ya corridas:
- `migracion_notificaciones.sql` — columna `notificaciones_vistas_en` en `tbl_perfiles_cliente`
- `migracion_push_subscriptions.sql` — tabla `tbl_push_subscriptions` + RLS
- `seed_tipos_y_servicios.sql` — catálogo base de tipos de evento y servicios
- `seed_datos_prueba.sql` — eventos/ofertas de prueba (usa automáticamente el primer cliente/proveedores que existan, sin IDs manuales)

---

## 6. Pendientes conocidos

- [ ] `/cliente/proveedores/[id]` — perfil público de proveedor
- [ ] Vista de detalle de evento v2 (progreso, proveedores contratados, timeline)
- [ ] `/legal/terminos` y `/legal/privacidad` (contenido estático, enlazadas desde Configuración pero no creadas)
- [ ] Integración del lado de proveedor: llamar a `enviarPushAUsuario()` al crear una oferta nueva
- [ ] Eliminar `src/app/api/push/test/route.ts` antes de la entrega final (era solo para probar push manualmente)
- [ ] Función de eliminar cuenta (no implementada a propósito — requiere diseño cuidadoso de cascada)

---

## 7. Cómo probar todo el flujo

1. Registrarse como cliente (y, si se quiere probar Ofertas, también un par de cuentas de proveedor).
2. Correr `seed_datos_prueba.sql` para tener eventos/ofertas de ejemplo sin cargar todo a mano.
3. `npm run build && npm run start` (el service worker y el `instrumentation.ts` requieren build de producción para probarse correctamente — `npm run dev` no siempre refleja este comportamiento).
4. Recorrido sugerido: Inicio → Categorías → Buscar → Mis Eventos → Crear Evento (con IA) → Detalle de Evento → Ofertas Recibidas → Notificaciones → Perfil → Configuración (activar push).