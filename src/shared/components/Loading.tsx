import Image from "next/image";
import isotipoColor from "@/shared/img/isotipoColor.svg"

interface LoadingProps {
  size?: number;
  fullScreen?: boolean;
  label?: string;
}

export default function Loading({ size = 150, fullScreen = false, label }: LoadingProps) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <Image
        src={isotipoColor}
        alt="Cargando"
        width={size}
        height={size}
        className="animate-festiva-pulse"
      />
      {label && <p className="text-sm text-slate-400">{label}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center h-full min-h-[200px]">
        {spinner}
      </div>
    );
  }

  return spinner;
}