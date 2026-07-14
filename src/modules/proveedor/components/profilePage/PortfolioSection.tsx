import React from 'react';
import { Image, Flower, PartyPopper, Award, Images, Plus } from 'lucide-react';
import Card from '@/shared/components/Card';
import SectionTitle from '../../../../shared/components/SectionTitle';

interface PortfolioSectionProps {
    images: string[];
}

const brandStyles: Record<string, { bg: string; text: string; icon: React.ComponentType<{ className?: string }> }> = {
  'pink': { bg: 'bg-festiva-euphoric-pink/10', text: 'text-festiva-euphoric-pink', icon: Image },
  'purple': { bg: 'bg-festiva-electric-violet/10', text: 'text-festiva-electric-violet', icon: Flower },
  'orange': { bg: 'bg-festiva-confetti-orange/10', text: 'text-festiva-confetti-orange', icon: PartyPopper },
  'teal': { bg: 'bg-festiva-mint-neon/10', text: 'text-festiva-mint-neon', icon: Award },
  'navy': { bg: 'bg-festiva-midnight-blue/10', text: 'text-festiva-midnight-blue', icon: Images },
};

export default function PortfolioSection({ images }: PortfolioSectionProps) {
    return (
        <Card>
            <SectionTitle
                title="Portafolio"
                actionLabel="Gestionar"
                onActionClick={() => console.log('Gestionar portafolio')}
            />
            <div className="grid grid-cols-3 gap-3 mt-2">
                {images.map((colorKey, index) => {
                    const config = brandStyles[colorKey] || { bg: 'bg-slate-100', text: 'text-slate-400', icon: Image };
                    const IconComponent = config.icon;
                    return (
                        <div
                            key={index}
                            className={`aspect-square flex items-center justify-center rounded-[20px] transition-transform hover:scale-[1.02] cursor-pointer ${config.bg}`}
                        >
                            <IconComponent className={`w-7 h-7 stroke-[1.5] ${config.text}`} />
                        </div>
                    );
                })}
                <button
                    type="button"
                    className="aspect-square flex flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-slate-200 text-slate-400 bg-transparent hover:bg-slate-50 hover:border-slate-300 transition-all gap-1 cursor-pointer"
                >
                    <Plus className="w-6 h-6 stroke-[2]" />
                    <span className="text-[11px] font-medium text-slate-400">Subir</span>
                </button>
            </div>
        </Card>
    );
}