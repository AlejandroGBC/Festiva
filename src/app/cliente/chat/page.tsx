import { getConversaciones } from "@/modules/cliente/chat/services/conversaciones-list.service";
import ChatListView from "@/modules/cliente/chat/components/ChatListView";

export default async function ChatPage() {
  const conversaciones = await getConversaciones();

  return <ChatListView conversaciones={conversaciones} />;
}