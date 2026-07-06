
const COLORS = [
  "bg-festiva-midnight-blue",
  "bg-festiva-electric-violet",
  "bg-festiva-euphoric-pink",
  "bg-festiva-confetti-orange",
  "bg-festiva-mint-neon",
];

export default function PuntitosIndicador() {
  return (
    <div className="flex items-center gap-1.5">
      {COLORS.map((color, i) => (
        <span key={i} className={`h-1.5 w-1.5 rounded-full ${color}`} />
      ))}
    </div>
  );
}