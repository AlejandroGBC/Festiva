
import Image from "next/image";
import FestivaLogo from "@/shared/img/isotipoColor.svg";
import PuntitosIndicador from "./PuntitosIndicador";

export default function LogoBienvenida() {
  return (
    <div className="flex flex-col items-center gap-6 mb-5">
      <Image
        src={FestivaLogo}
        alt="Festiva"
        width={200}
        height={200}
        priority
      />

      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-semibold tracking-[0.2em] text-gray-400">
          CELEBRA CADA MOMENTO
        </p>
        <PuntitosIndicador />
      </div>
    </div>
  );
}