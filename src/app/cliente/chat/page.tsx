// app/cliente/chat/page.tsx
import { contarNotificacionesNuevas } from "@/modules/cliente/notificaciones/services/notificaciones-list.service";
import ChatListView from "@/modules/shared/chat/components/ChatListView";
import { getConversaciones } from "@/modules/shared/chat/services/chat.service";

export default async function ChatPage() {
  const [conversaciones, notificacionesNuevas] = await Promise.all([
    getConversaciones("cliente"),
    contarNotificacionesNuevas(),
  ]);

  return (
    <ChatListView
      conversaciones={conversaciones}
      tieneNotificacionesNuevas={notificacionesNuevas > 0}
      basePath="/cliente/chat"
    />
  );
}