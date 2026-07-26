interface ChipAtributoProps {
  label: string;
  seleccionado: boolean;
  onToggle: () => void;
}

export const ChipAtributo = ({ label, seleccionado, onToggle }: ChipAtributoProps) => (
  <button
    type="button"
    onClick={onToggle}
    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
      seleccionado
        ? "bg-festiva-confetti-orange/10 border-festiva-confetti-orange text-festiva-confetti-orange"
        : "bg-white border-gray-200 text-gray-500"
    }`}
  >
    {label}
  </button>
);