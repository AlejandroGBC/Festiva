import { MessageSquare } from "lucide-react";

export const ChatRapidoCard = () => {
  return (
    <button
      type="button"
      className="mt-3 flex items-center gap-2 bg-white border border-festiva-electric-violet rounded-xl px-4 py-3 w-full"
    >
      <MessageSquare size={16} className="text-festiva-electric-violet shrink-0" />
      <span className="text-sm font-semibold text-festiva-electric-violet">Chat rápido con proveedor</span>
    </button>
  );
};