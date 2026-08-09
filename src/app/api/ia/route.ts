export const runtime = 'nodejs'

/**
 * Ubicación:
 *   src/app/api/ia/route.ts
 */

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { apiError, apiSuccess } from '@/lib/api/api-response'

function extraerJSON(texto: string): unknown | null {
  if (!texto?.trim()) return null

  try { return JSON.parse(texto.trim()) } catch {}

  const conMarkdown = texto.match(/```json\s*([\s\S]*?)\s*```/)
  if (conMarkdown) {
    try { return JSON.parse(conMarkdown[1]) } catch {}
  }

  const conLlaves = texto.match(/\{[\s\S]*\}/)
  if (conLlaves) {
    try { return JSON.parse(conLlaves[0]) } catch {}
  }

  return null
}

/**
 * Normaliza un nombre de servicio para comparar sin acentos,
 * mayúsculas ni espacios extra.
 */
function normalizar(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const descripcion = body?.descripcion?.trim()

    if (!descripcion) {
      return apiError('Descripción requerida', 400)
    }

    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY no definida')
      return apiError('Configuración incompleta', 500)
    }

    // ── Traer los nombres REALES de servicios desde la BD ──
    // Ahora se le pasa a la IA la lista real, para
    // que sus respuestas siempre matcheen contra la BD.
    const supabase = await createServerSupabaseClient()
    const { data: serviciosDB, error: servErr } = await supabase
      .from('tbl_servicios')
      .select('nombre')
      .order('nombre', { ascending: true })

    if (servErr || !serviciosDB?.length) {
      console.error('Error al obtener servicios:', servErr)
      return apiError('No se pudo cargar el catálogo de servicios', 500)
    }

    const nombresServicios = serviciosDB.map((s) => s.nombre)
    const listaServiciosPrompt = nombresServicios.map((n) => `"${n}"`).join(', ')

    // ── Timeout manual compatible con todas las versiones de Node ──
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 20000)

    let res: Response
    try {
      res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `Eres un asistente de Festiva, plataforma de eventos en Honduras.
Tu única tarea es extraer información de la descripción del usuario y devolver un JSON.
REGLAS ESTRICTAS:
- Responde ÚNICAMENTE con el objeto JSON, sin texto antes ni después
- No uses markdown ni bloques de código
- Si un campo no se menciona, usa null
- Corrige errores de ortografía y comprende lenguaje informal en español
- Fechas en formato YYYY-MM-DD
- Presupuesto como número entero en lempiras (sin símbolo ni comas)
- Para "servicios_sugeridos": SOLO podés usar nombres que aparezcan EXACTAMENTE igual (letra por letra) en esta lista de servicios disponibles: [${listaServiciosPrompt}]. Nunca inventes ni modifiques un nombre.
- IMPORTANTE: los nombres de servicio son categorías genéricas, no literales. Analizá el SIGNIFICADO de lo que pide el usuario, no solo coincidencias de palabras. Ejemplos: "pastel", "torta", "cupcakes" → "Reposteria"; "banda", "grupo musical" → "Banda en vivo"; "sonido", "bocinas", "equipo de audio" → "Sonido profesional"; "flores", "arco floral", "centros de mesa" → "Flores y arreglos florales". Sé exhaustivo: revisá el texto completo del usuario e incluí TODOS los servicios que apliquen, no solo los más obvios.`,
            },
            {
              role: 'user',
              content: `"${descripcion}"

Extrae y devuelve solo este JSON:
{
  "tipo_evento": "Boda|XV Años|Cumpleaños|Graduación|Corporativo|Bautizo|Aniversario|Fiesta",
  "fecha": "YYYY-MM-DD o null",
  "num_invitados": número o null,
  "presupuesto_min": número o null,
  "presupuesto_max": número o null,
  "ciudad": "string o null",
  "lugar": "string o null",
  "tematica": "string o null",
  "servicios_sugeridos": ["array de strings, usando SOLO nombres exactos de la lista de servicios disponibles"],
  "descripcion_optimizada": "descripción atractiva de 2 oraciones para proveedores en Honduras"
}`,
            },
          ],
          max_tokens: 1000,
          temperature: 0.1,
        }),
        signal: controller.signal,
      })
    } finally {
      clearTimeout(timeout)
    }

    if (!res.ok) {
      const err = await res.text()
      console.error('Groq error body:', err)
      return apiError('Error al contactar la IA', 502)
    }

    const groqData = await res.json()
    const texto = groqData.choices?.[0]?.message?.content || ''

    const datos = extraerJSON(texto) as { servicios_sugeridos?: string[] } | null

    if (!datos) {
      console.error('No se pudo parsear JSON:', texto)
      return apiError('La IA devolvió una respuesta inválida', 502)
    }

    // ── Red de seguridad: filtramos cualquier servicio que la IA haya
    // devuelto y que NO exista realmente en la BD (por si alucina un
    // nombre parecido pero no exacto). Comparación normalizada
    // (sin acentos/mayúsculas) para ser un poco más tolerantes. ──
    if (Array.isArray(datos.servicios_sugeridos)) {
      const nombresNormalizados = new Map(
        nombresServicios.map((n) => [normalizar(n), n])
      )
      datos.servicios_sugeridos = datos.servicios_sugeridos
        .map((s) => nombresNormalizados.get(normalizar(s)))
        .filter((n): n is string => Boolean(n))
    }

    return apiSuccess({ datos })

  } catch (e: unknown) {
    const esAbort = e instanceof Error && e.name === 'AbortError'
    const mensaje = esAbort
      ? 'La IA tardó demasiado, intenta de nuevo'
      : (e instanceof Error ? e.message : 'Error desconocido')
    const causa = e instanceof Error ? (e.cause ?? e) : e
    console.error('Error general:', mensaje, 'Causa:', causa)
    return apiError(mensaje, 500)
  }
}