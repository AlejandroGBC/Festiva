"use client";

import { createClient } from "@/lib/supabase/client";

function getVapidPublicKey(): string {
  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  if (!vapidPublicKey || !vapidPublicKey.trim()) {
    throw new Error("La clave pública de notificaciones push no está configurada.");
  }

  return vapidPublicKey;
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  if (!base64String || typeof base64String !== "string") {
    throw new Error("La clave pública de notificaciones push no es válida.");
  }

  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  // Array.from en vez de [...rawData]: evita el error de downlevelIteration
  // al iterar un string sin --target es2015+.
  return Uint8Array.from(Array.from(rawData).map((c) => c.charCodeAt(0)));
}

export function pushEsSoportado(): boolean {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window
  );
}

export async function estaSuscrito(): Promise<boolean> {
  if (!pushEsSoportado()) return false;
  const registro = await navigator.serviceWorker.ready;
  const suscripcion = await registro.pushManager.getSubscription();
  return suscripcion !== null;
}

export async function activarPush(): Promise<void> {
  if (!pushEsSoportado()) {
    throw new Error("Tu navegador no soporta notificaciones push");
  }

  const permiso = await Notification.requestPermission();
  if (permiso !== "granted") {
    throw new Error("Permiso de notificaciones denegado");
  }

  const registro = await navigator.serviceWorker.ready;
  const vapidPublicKey = getVapidPublicKey();
  const suscripcion = await registro.pushManager.subscribe({
    userVisibleOnly: true,
    // Cast a BufferSource: choque de tipos conocido entre Uint8Array y
    // ArrayBufferLike en versiones nuevas de TS/lib.dom, no es un bug real.
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
  });

  const json = suscripcion.toJSON();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Debes iniciar sesión");

  const { error } = await supabase.from("tbl_push_subscriptions").upsert(
    {
      id_usuario: user.id,
      endpoint: json.endpoint!,
      p256dh: json.keys!.p256dh,
      auth: json.keys!.auth,
    },
    { onConflict: "endpoint" }
  );

  if (error) throw error;
}

export async function desactivarPush(): Promise<void> {
  if (!pushEsSoportado()) return;

  const registro = await navigator.serviceWorker.ready;
  const suscripcion = await registro.pushManager.getSubscription();
  if (!suscripcion) return;

  const endpoint = suscripcion.endpoint;
  await suscripcion.unsubscribe();

  const supabase = createClient();
  await supabase.from("tbl_push_subscriptions").delete().eq("endpoint", endpoint);
}