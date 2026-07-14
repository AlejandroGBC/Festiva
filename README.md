# Festiva

Aplicación web modular construida con Next.js App Router, Supabase y un backend Node.js independiente. El sistema contempla dos tipos de usuario: **clientes** y **proveedores**, cada uno con su propio conjunto de features, rutas y layouts aislados.

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Base de datos / Auth | Supabase (PostgreSQL + RLS) |
| Backend | Node.js (API REST independiente) |
| Estilos | Tailwind CSS |
| Lenguaje | TypeScript |

---

## Estructura del proyecto

```
Festiva/
├── middleware.ts                   # Protección de rutas (servidor)
└── src/
    ├── app/                        # Rutas Next.js (App Router)
    │   ├── layout.tsx              # Layout raíz — envuelve con AuthProvider
    │   ├── page.tsx                # Landing / redirect
    │   ├── (auth)/
    │   │   └── login/page.tsx
    │   ├── (cliente)/              # Route group — sistema cliente
    │   │   ├── layout.tsx          # Layout del cliente
    │   │   └── perfil/page.tsx
    │   ├── (proveedor)/            # Route group — sistema proveedor
    │   │   ├── layout.tsx          # Layout del proveedor
    │   │   └── perfil/page.tsx
    │   └── api/                    # Route handlers (proxy hacia Node si se necesita)
    │
    ├── modules/                    # Lógica de negocio por dominio
    │   ├── cliente/
    │   │   ├── anuncio/
    │   │   │   ├── components/     # AnuncioCard.tsx, AnuncioBuscador.tsx...
    │   │   │   ├── services/       # anuncios.service.ts
    │   │   │   ├── hooks/          # Se crean hooks solo si se hace un llamado a la api desde un componente client
    │   │   │   ├── types/          # anuncios.types.ts
    │   │   └── perfil/             # misma estructura
    │   └── proveedor/
    │       └── perfil/             # misma estructura
    │
    ├── lib/                        # Inicialización y clientes externos
    │   ├── supabase.ts             # Cliente Supabase (browser)
    │   ├── supabase-server.ts      # Cliente Supabase (SSR / Server Components)
    │   ├── api-client.ts           # Wrapper fetch hacia el backend Node
    │   └── auth-context.tsx        # AuthProvider para Client Components
    │
    └── shared/               # Hooks globales
        ├── hooks/
        │    └── useAuth.ts
        ├── components/                 # Cualquier componente compartido (botones, colores, etc.)
        └── types/                      # Tipos globales
            ├── api.types.ts
            ├── supabase.types.ts       # Generado con Supabase CLI
            └── auth.types.ts
```

---

## Arquitectura

### Dos sistemas, un repo

Los route groups `(cliente)` y `(proveedor)` permiten layouts, navegación y guards completamente independientes sin que el nombre del grupo aparezca en la URL.


### Protección de rutas

`middleware.ts` intercepta todas las rutas de `/cliente/*` y `/proveedor/*` antes de renderizar. Si no hay sesión válida, redirige a `/login`. 

---

## Reglas de la estructura

**Si algo es exclusivo de un feature** → vive en `modules/<sistema>/<feature>/`.

**Si lo usan dos o más features** → va a `components/shared/`, `hooks/shared/` o `types/shared/`.

**Los hooks son solo para estado UI** — `useState`, eventos, interacción. El fetch lo hacen los Server Components directamente desde el service.

**Un service puede mezclar Supabase y Node** sin problema:

```ts
// Lectura simple → Supabase directo
export async function getPedidos(clienteId: string) {
  const { data } = await supabase.from('pedidos').select('*').eq('cliente_id', clienteId)
  return data
}

// Lógica compleja → backend Node
export async function crearPedido(payload: CrearPedidoDTO) {
  return apiPost('/pedidos', payload)
}
```

---

## Variables de entorno

```bash
# .env (agregar valores)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## Instalación y desarrollo

```bash
# Copiar .env.example y reemplazar variable
cp .env.example .env

# Instalar dependencias
npm install

# Ejecución
npm run dev

# Build
npm run build

# Extra para supabase

# Generar tipos de Supabase (requiere Supabase CLI)
# --project-id <id>: reemplazar '<id>' por el ID del proyecto en Supabase
# Se obtiene en: Supabase Dashboard → Project Settings → General → Project ID
# Este comando sirve tambien para volver a generar los tipados si llegasen a cambiar en la base de datos
npx supabase gen types typescript --project-id <id> > src/shared/types/supabase.types.ts

```

---

## Convenciones

- Nombres de archivos en `kebab-case` para servicios, hooks y tipos: `pedidos.service.ts`
- Nombres de componentes en `PascalCase`: `PedidoCard.tsx`
