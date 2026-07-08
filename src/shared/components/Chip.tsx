import React from 'react';

import { Sparkles, Zap, Layers, Heart, HelpCircle, X } from 'lucide-react';

export type BrandVariant = 'euphoric-pink' | 'electric-violet' | 'mint-neon' | 'confetti-orange' | 'default';

interface ChipProps {
    variant?: BrandVariant;
    children: React.ReactNode;
    onDelete?: () => void;
    onClickIcon?: () => void;
}

const variantClasses: Record<BrandVariant, string> = {
  'euphoric-pink': 'bg-festiva-euphoric-pink/10 text-festiva-euphoric-pink border-festiva-euphoric-pink/20',
  'electric-violet': 'bg-festiva-electric-violet/10 text-festiva-electric-violet border-festiva-electric-violet/20',
  'mint-neon': 'bg-festiva-mint-neon/10 text-festiva-mint-neon border-festiva-mint-neon/20',
  'confetti-orange': 'bg-festiva-confetti-orange/10 text-festiva-confetti-orange border-festiva-confetti-orange/20',
  'default': 'bg-slate-100 text-slate-700 border-slate-200'
};

const variantIcons: Record<BrandVariant, React.ComponentType<{ className?: string }>> = {
  'euphoric-pink': Sparkles,
  'electric-violet': Zap,
  'confetti-orange': Layers,
  'mint-neon': Heart,
  'default': HelpCircle
};

export default function Chip({ variant = 'default', children, onDelete, onClickIcon }: ChipProps) {
    
    const IconComponent = variantIcons[variant];
    
    return (
        <span className={`inline-flex items-center gap-1.5 h-[32px] px-3.5 rounded-full border text-[13px] font-bold transition-all ${variantClasses[variant]}`}>
            {/* Icono izquierdo interactivo si se pasa onClickIcon */}
            {variant !== 'default' && IconComponent && (
                <button 
                    type="button"
                    disabled={!onClickIcon} 
                    onClick={onClickIcon}
                    className={`${onClickIcon ? 'hover:scale-115 active:scale-95 transition-transform cursor-pointer' : ''}`}
                >
                    <IconComponent className="w-3.5 h-3.5 stroke-[2.2]" />
                </button>
            )}
            
            <span>{children}</span>

            {/* Botón de eliminación a la derecha */}
            {onDelete && (
                <button
                    type="button"
                    onClick={onDelete}
                    className="ml-1 flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-black/10 text-current transition-colors cursor-pointer"
                >
                    <X className="w-2.5 h-2.5 stroke-[3]" />
                </button>
            )}
            </span>
    );
}