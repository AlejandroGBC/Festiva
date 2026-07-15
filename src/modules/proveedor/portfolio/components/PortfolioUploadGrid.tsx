'use client';

import React from 'react';
import { Image as ImageIcon, Flower, Sparkles, Award, Plus, Trash2, ImagesIcon } from 'lucide-react';

interface PortfolioUploadGridProps {
    items: { id: string; url: string; type: string }[];
    onDelete: (id: string) => void;
    onAddSample: () => void;
}

const brandStyles: Record<string, { bg: string; text: string; icon: React.ComponentType<{ className?: string }> }> = {
    'pink': { bg: 'bg-festiva-euphoric-pink/10', text: 'text-festiva-euphoric-pink', icon: ImageIcon },
    'purple': { bg: 'bg-festiva-electric-violet/10', text: 'text-festiva-electric-violet', icon: Flower },
    'orange': { bg: 'bg-festiva-confetti-orange/10', text: 'text-festiva-confetti-orange', icon: Sparkles },
    'teal': { bg: 'bg-festiva-mint-neon/10', text: 'text-festiva-mint-neon', icon: Award },
    'navy': { bg: 'bg-festiva-midnight-blue/10', text: 'text-festiva-midnight-blue', icon: ImagesIcon },
};

export default function PortfolioUploadGrid({ items, onDelete, onAddSample }: PortfolioUploadGridProps) {

    return (
        <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-3 w-full min-w-0">
            {items?.map((item) => {
                const config = brandStyles[item.type] || { bg: 'bg-slate-100', text: 'text-slate-400', icon: ImageIcon };
                const IconComponent = config.icon;
                
                return (
                    <div 
                        key={item.id} 
                        className={`aspect-square border rounded-2xl flex items-center justify-center shadow-sm relative group transition-all`}
                    >
                        <IconComponent className={`w-7 h-7 stroke-[1.5] ${config.text}`} />
                        <button 
                            type="button"
                            onClick={() => onDelete(item.id)}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer hover:bg-red-600 z-10"
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>
                    </div>
                );
            })}
            
            <button 
                onClick={onAddSample}
                className="aspect-square border border-dashed border-slate-200 hover:border-slate-300 rounded-2xl flex flex-col items-center justify-center gap-1 text-slate-400 transition-colors bg-white cursor-pointer group"
            >
                <Plus className="w-5 h-5 text-slate-400 stroke-[2] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold tracking-wide">Subir</span>
            </button>
        </div>
    );
}