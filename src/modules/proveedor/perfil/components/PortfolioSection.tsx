'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, FolderHeart, Sparkles, Image as ImageIcon, Briefcase } from 'lucide-react';
import Card from '@/shared/components/Card';
import SectionTitle from '@/shared/components/SectionTitle';
import { PortfolioItem } from '@/shared/types/portfolio.types';

interface PortfolioSectionProps {
    items?: PortfolioItem[];
}

const fallbackIcons = [FolderHeart, Sparkles, ImageIcon, Briefcase];
    
export default function PortfolioSection({ items = [] }: PortfolioSectionProps) {
    
    const router = useRouter();

    const handleNavigateToManage = () => {
        router.push('/proveedor/portfolio');
    };

    const hasItems = items && items.length > 0;
    
    return (
        <Card>
            <SectionTitle
                title="Portafolio"
                actionLabel="Gestionar"
                onActionClick={handleNavigateToManage}
            />
            <div className="grid grid-cols-3 gap-3 mt-2">
                {hasItems &&
                    items.map((item, index) => {
                        const IconComponent = fallbackIcons[index % fallbackIcons.length];                      
                        const mainImage = item.imageUrls?.[0];
                        const hasImage = Boolean(mainImage && mainImage.trim().length > 0);
                        const totalImages = item.imageUrls?.length || 0;

                        return (
                            <div
                                key={item.id || index}
                                onClick={handleNavigateToManage}
                                className="relative aspect-square rounded-[20px] overflow-hidden border border-slate-100 bg-slate-50 cursor-pointer transition-transform hover:scale-[1.02] group"
                            >
                                {hasImage ? (
                                    <>
                                        <Image
                                            src={mainImage!}
                                            alt={item.title || 'Trabajo de portafolio'}
                                            fill
                                            className="object-cover"
                                        />
                                        
                                        {totalImages > 1 && (
                                            <span className="absolute top-1.5 right-1.5 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-xs">
                                                +{totalImages - 1}
                                            </span>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-festiva-electric-violet/10 to-festiva-euphoric-pink/10 flex flex-col items-center justify-center p-2 text-center">
                                        <IconComponent className="w-6 h-6 text-festiva-electric-violet mb-1" />
                                        <span className="text-[10px] font-bold text-festiva-midnight-blue line-clamp-1">
                                            {item.title}
                                        </span>
                                    </div>
                                )}
                            </div>
                        );
                })}
                
                <button
                    type="button"
                    onClick={handleNavigateToManage}
                    className="aspect-square flex flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-slate-200 text-slate-400 bg-transparent hover:bg-slate-50 hover:border-slate-300 transition-all gap-1 cursor-pointer"
                >
                    <Plus className="w-6 h-6 stroke-[2]" />
                    <span className="text-[11px] font-medium text-slate-400">Subir</span>
                </button>
            </div>
        </Card>
    );
}