'use client';

import React from 'react';
import Card from '@/shared/components/Card';
import { Star } from 'lucide-react';

interface CtaSectionProps {
    onPublishEvent?: () => void;
    onBecomeProvider?: () => void;
}

export default function CTASection({ onPublishEvent, onBecomeProvider }: CtaSectionProps) {
    return (
        <section className="w-full py-12 px-4 flex justify-center">
            <Card className="w-full max-w-sm p-8 rounded-[36px] border-none bg-gradient-to-tr from-festiva-electric-violet via-purple-600 to-festiva-euphoric-pink shadow-xl flex flex-col items-center text-center relative overflow-hidden">
                
                <div className="w-full flex justify-start mb-2">
                    <Star className="size-6 text-white/90 fill-none stroke-[1.5]" />
                </div>

                <h2 className="text-xl font-bold text-white mb-8 max-w-[260px]">
                    Miles de personas ya están organizando sus eventos con Festiva. ¿Y tú?
                </h2>

                <div className="w-full flex flex-col gap-3.5">
                    
                    <button
                        onClick={onPublishEvent}
                        className="w-full py-3.5 px-6 bg-white text-festiva-midnight-blue font-bold rounded-full shadow-md hover:bg-zinc-50 active:scale-[0.98] transition-all duration-200 text-base"
                    >
                        Publicar mi evento ahora
                    </button>

                    <button
                        onClick={onBecomeProvider}
                        className="w-full py-3.5 px-6 bg-transparent text-white font-semibold rounded-full border-2 border-white/90 hover:bg-white/10 active:scale-[0.98] transition-all duration-200 text-base"
                    >
                        Soy proveedor
                    </button>
                </div>
            </Card>
        </section>
    );
}