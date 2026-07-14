import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

interface SuccessCaseProps {
    title: string;
    description: string;
    imageUrl: string;
    isVerified: boolean;
}

export default function SuccessCaseCard({ title, description, imageUrl, isVerified }: SuccessCaseProps) {
    return (
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="relative h-48 overflow-hidden bg-slate-100">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-5 flex flex-col gap-1.5">
                <h4 className="font-sans font-bold text-base text-festiva-midnight-blue">
                    {title}
                </h4>
                <p className="font-sans text-[13px] text-slate-500 leading-relaxed">
                    {description}
                </p>
                    {isVerified && (
                <div className="flex items-center gap-1.5 mt-2 text-festiva-mint-neon font-sans text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 fill-festiva-mint-neon/10" />
                    <span>Proyecto Verificado</span>
                </div>
                )}
            </div>
        </div>
    );
}