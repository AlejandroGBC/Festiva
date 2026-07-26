import type { TabPropuestas } from "../types/propuestas.types";

interface TabsPropuestasProps {
  tabActivo: TabPropuestas;
  onCambiarTab: (tab: TabPropuestas) => void;
}

const tabs: { id: TabPropuestas; label: string }[] = [
  { id: "enviadas", label: "Enviadas" },
  { id: "aceptadas", label: "Aceptadas" },
  { id: "rechazadas", label: "Rechazadas" },
];

export const TabsPropuestas = ({ tabActivo, onCambiarTab }: TabsPropuestasProps) => (
  <div className="flex border-b border-gray-200 px-4">
    {tabs.map((tab) => {
      const activo = tab.id === tabActivo;
      return (
        <button
          key={tab.id}
          type="button"
          onClick={() => onCambiarTab(tab.id)}
          className={`flex-1 pb-3 text-[15px] font-bold border-b-2 -mb-px transition-colors ${
            activo ? "border-festiva-electric-violet text-festiva-electric-violet" : "border-transparent text-gray-400"
          }`}
        >
          {tab.label}
        </button>
      );
    })}
  </div>
);