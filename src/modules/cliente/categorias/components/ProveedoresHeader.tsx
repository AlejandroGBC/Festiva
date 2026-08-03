"use client";

import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/shared/components/Button";

export const ProveedoresHeader = ({ titulo, onFiltroClick }: { titulo: string; onFiltroClick?: () => void }) => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-between px-4 py-3">
      <Button variant="light" size="icon" shape="pill" onClick={() => router.back()}>
        <ArrowLeft size={20} />
      </Button>
      <h1 className="text-xl font-extrabold text-festiva-midnight-blue">{titulo}</h1>
      <Button variant="light" size="icon" shape="pill" onClick={onFiltroClick}>
        <SlidersHorizontal size={18} />
      </Button>
    </div>
  );
};