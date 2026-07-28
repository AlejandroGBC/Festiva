export const runtime = 'nodejs'

/**
 * Ubicación:
 *   src/app/api/ia/route.ts
 *
 * Este endpoint es el que consume
 * src/modules/cliente/anuncio/services/eventos.service.ts (generarPropuestaIA).
 *
 * NOTA: en Windows, Node a veces intenta resolver el DNS por IPv6 primero,
 * eso tarda/falla, y recién el segundo intento cae a IPv4 y conecta bien
 * (por eso la IA fallaba "la primera vez" y funcionaba al reintentar).
 * Esta línea fuerza IPv4 primero para evitar ese fallo de entrada.
 */
// El fix de DNS/timeout ahora es global (instrumentation.ts) — ya no
// hace falta repetirlo acá.

import { NextResponse } from 'next/server'

function extraerJSON(texto: string): unknown | null {
  if (!texto?.trim()) return null

  // Intento 1: JSON limpio directo
  try { return JSON.parse(texto.trim()) } catch {}

  // Intento 2: bloque ```json ... ```
  const conMarkdown = texto.match(/```json\s*([\s\S]*?)\s*```/)
  if (conMarkdown) {
    try { return JSON.parse(conMarkdown[1]) } catch {}
  }

  // Intento 3: primer { ... } que encuentre
  const conLlaves = texto.match(/\{[\s\S]*\}/)
  if (conLlaves) {
    try { return JSON.parse(conLlaves[0]) } catch {}
  }

  return null
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const descripcion = body?.descripcion?.trim()

    if (!descripcion) {
      return NextResponse.json({ error: 'Descripción requerida' }, { status: 400 })
    }

    //  Logs de diagnóstico temporal
    console.log('GROQ_API_KEY existe:', !!process.env.GROQ_API_KEY)
    console.log('GROQ_API_KEY longitud:', process.env.GROQ_API_KEY?.length)

    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY no definida')
      return NextResponse.json({ error: 'Configuración incompleta' }, { status: 500 })
    }

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
- Presupuesto como número entero en lempiras (sin símbolo ni comas)`,
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
  "servicios_sugeridos": ["Decoración","Fotografía","Catering","Música","Maquillaje","Pastelería","Iluminación","Video"],
  "descripcion_optimizada": "descripción atractiva de 2 oraciones para proveedores en Honduras"
}`,
            },
          ],
          max_tokens: 500,
          temperature: 0.1,
        }),
        signal: controller.signal,
      })
    } finally {
      clearTimeout(timeout)
    }

    console.log('Groq status:', res.status)

    if (!res.ok) {
      const err = await res.text()
      console.error('Groq error body:', err)
      return NextResponse.json({ error: 'Error al contactar la IA' }, { status: 502 })
    }

    const groqData = await res.json()
    const texto = groqData.choices?.[0]?.message?.content || ''
    console.log('Groq respuesta cruda:', texto)

    const datos = extraerJSON(texto)

    if (!datos) {
      console.error('No se pudo parsear JSON:', texto)
      return NextResponse.json({ error: 'La IA devolvió una respuesta inválida' }, { status: 502 })
    }

    return NextResponse.json({ datos })

  } catch (e: unknown) {
    const esAbort = e instanceof Error && e.name === 'AbortError'
    const mensaje = esAbort
      ? 'La IA tardó demasiado, intenta de nuevo'
      : (e instanceof Error ? e.message : 'Error desconocido')
    const causa = e instanceof Error ? (e.cause ?? e) : e
    console.error('Error general:', mensaje, 'Causa:', causa)
    return NextResponse.json({ error: mensaje }, { status: 500 })
  }
}