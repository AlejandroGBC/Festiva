'use client';

import React from 'react';
import Image from 'next/image';
import { Plus, Trash2, Edit3, FolderHeart, Sparkles, Image as ImageIcon, Briefcase } from 'lucide-react';
import { PortfolioItem } from '@/shared/types/portfolio.types';

interface PortfolioUploadGridProps {
    items: PortfolioItem[];
    onDelete: (id: string) => void;
    onEdit: (item: PortfolioItem) => void;
    onNew: () => void;
}

const fallbackIcons = [FolderHeart, Sparkles, ImageIcon, Briefcase];

export default function PortfolioUploadGrid({ items, onDelete, onEdit, onNew }: PortfolioUploadGridProps) {

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
            {items.map((item, idx) => {
                const IconComponent = fallbackIcons[idx % fallbackIcons.length];
                const hasImage = item.imageUrl && item.imageUrl.trim().length > 0;

                return (
                <div
                    key={item.id}
                    onClick={() => onEdit(item)}
                    className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-festiva-electric-violet/30"
                >
                    {hasImage ? (
                        <Image
                            src={item.imageUrl!}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                    <div className="w-full h-full bg-gradient-to-br from-festiva-electric-violet/10 to-festiva-euphoric-pink/10 flex flex-col items-center justify-center p-3 text-center">
                        <IconComponent className="w-8 h-8 text-festiva-electric-violet mb-1" />
                        <span className="text-[11px] font-bold text-festiva-midnight-blue line-clamp-2">
                            {item.title}
                        </span>
                    </div>
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                        <button
                            type="button"
                            onClick={(e) => {
                            e.stopPropagation();
                            onEdit(item);
                            }}
                            className="p-2 bg-white/90 text-festiva-midnight-blue rounded-xl hover:bg-white transition-colors"
                            title="Editar"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(item.id);
                            }}
                            className="p-2 bg-red-500/90 text-white rounded-xl hover:bg-red-600 transition-colors"
                            title="Eliminar"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                );
            })}

            <button 
                type="button"
                onClick={onNew}
                className="aspect-square border-2 border-dashed border-slate-200 hover:border-festiva-electric-violet rounded-2xl flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-festiva-electric-violet transition-colors bg-white cursor-pointer group"
            >
                <Plus className="w-6 h-6 stroke-[2]" />
                <span className="text-[11px] font-medium text-slate-400">Subir</span>
            </button>
        </div>
    );
}