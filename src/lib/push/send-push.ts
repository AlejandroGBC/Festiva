/**
 * Ubicación sugerida:
 *   src/lib/push/send-push.ts
 *
 * Server-only. Requiere `npm install web-push` y las variables de entorno
 * NEXT_PUBLIC_VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT.
 *
 * ¿Quién llama a esto? Quien construya el lado del PROVEEDOR (enviar
 * oferta), ya que ahí es donde se genera el evento "el cliente debe
 * enterarse de una oferta nueva". Ejemplo de uso al crear una oferta:
 *
 *   import { enviarPushAUsuario } from "@/lib/push/send-push";
 *   await enviarPushAUsuario(idClienteDelEvento, {
 *     title: "Nueva oferta recibida",
 *     body: `${nombreProveedor} envió una oferta para "${tituloEvento}"`,
 *     url: "/cliente/ofertas",
 *   });
 */

import webpush from "web-push";
import { createServerSupabaseClient } from "@/lib/supabase/server";

let vapidConfigurado = false;

function asegurarVapidConfigurado() {
  if (vapidConfigurado) return;

  const subject = process.env.VAPID_SUBJECT;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;

  if (!subject || !publicKey || !privateKey) {
    throw new Error(
      "Faltan variables VAPID en .env (VAPID_SUBJECT, NEXT_PUBLIC_VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)"
    );
  }

  webpush.setVapidDetails(subject, publicKey, privateKey);
  vapidConfigurado = true;
}

export interface PushPayload {
  title: string;
  body: string;
  url?: string;
}

export async function enviarPushAUsuario(
  idUsuario: string,
  payload: PushPayload
): Promise<void> {
  asegurarVapidConfigurado();

  const supabase = await createServerSupabaseClient();

  const { data: suscripciones, error } = await supabase
    .from("tbl_push_subscriptions")
    .select("id_suscripcion, endpoint, p256dh, auth")
    .eq("id_usuario", idUsuario);

  if (error || !suscripciones || suscripciones.length === 0) return;

  await Promise.all(
    suscripciones.map(async (sub) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          JSON.stringify(payload)
        );
      } catch (err: unknown) {
        // 410 Gone / 404 = la suscripción expiró o el usuario desinstaló
        // la app; la borramos para no seguir intentando en vano.
        const statusCode =
          err && typeof err === "object" && "statusCode" in err
            ? (err as { statusCode: number }).statusCode
            : undefined;

        if (statusCode === 410 || statusCode === 404) {
          await supabase
            .from("tbl_push_subscriptions")
            .delete()
            .eq("id_suscripcion", sub.id_suscripcion);
        } else {
          console.error("Error enviando push:", err);
        }
      }
    })
  );
}