"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export const EnviarPropuestaHeader = () => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center gap-4 px-5 py-4">
      <button
        type="button"
        onClick={() => router.back()}
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0"
      >
        <X size={20} className="text-festiva-midnight-blue" />
      </button>
      <h1 className="text-xl font-extrabold text-festiva-midnight-blue">Enviar propuesta</h1>
    </div>
  );
};