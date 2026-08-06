import { getConversaciones } from "@/modules/shared/chat/services/chat.service";
import ChatListView from "@/modules/shared/chat/components/ChatListView";

export default async function ChatPage() {
  const conversaciones = await getConversaciones("proveedor");

  return (
    <ChatListView
      conversaciones={conversaciones}
      tieneNotificacionesNuevas={false}
      basePath="/proveedor/chat"
    />
  );
}