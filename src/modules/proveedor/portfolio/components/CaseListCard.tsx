'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Edit, Trash2 } from 'lucide-react';

interface CaseListCardProps {
    id: string;
    title: string;
    imageUrl: string;
    isVerified: boolean;
    onDelete: (id: string) => void;
}

export default function CaseListCard({ id, title, imageUrl, isVerified, onDelete }: CaseListCardProps) {
    return (
        <div className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100">
                    <Image
                        src={imageUrl}
                        alt={title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
                <div className="flex flex-col gap-0.5">
                    <h3 className="font-bold text-[14px] text-festiva-midnight-blue tracking-tight">{title}</h3>
                    {isVerified && (
                        <div className="flex items-center gap-1 text-festiva-mint-neon">
                            <CheckCircle2 className="w-3.5 h-3.5 fill-current text-white" />
                            <span className="text-[11px] font-medium tracking-tight">Proyecto Verificado</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-1">
                <button className="p-2 text-slate-400 hover:text-festiva-electric-violet rounded-lg transition-colors cursor-pointer">
                    <Edit className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => onDelete(id)}
                    className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}