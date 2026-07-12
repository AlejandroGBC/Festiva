import React from 'react';

type FestivaColor = 'midnight-blue' | 'euphoric-pink' | 'electric-violet' | 'confetti-orange' | 'mint-neon' | 'monochromatic';

interface ProgressBarProps {
    percentage: number;
    color?: FestivaColor;
}

const colorClasses: Record<FestivaColor, string> = {
  'mint-neon': 'bg-festiva-mint-neon',
  'euphoric-pink': 'bg-festiva-euphoric-pink',
  'electric-violet': 'bg-festiva-electric-violet',
  'confetti-orange': 'bg-festiva-confetti-orange',
  'midnight-blue': 'bg-festiva-midnight-blue',
  'monochromatic': 'bg-festiva-monochromatic',
};

export default function ProgressBar({ percentage, color = 'mint-neon' }: ProgressBarProps) {
    return (
        <div className="h-[7px] w-full rounded-full bg-slate-100">
            <div 
                className={`h-full rounded-full transition-all duration-300 ${colorClasses[color]}`} 
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
}