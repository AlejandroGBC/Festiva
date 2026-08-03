'use client';

import React from 'react';
import Image from 'next/image';
import logoBlanco from '@/shared/img/logoBlanco.svg';

export default function FooterLanding() {
    return (
        <footer className="w-full bg-festiva-midnight-blue text-white py-6 flex flex-col items-center">
            <div className="w-full max-w-sm flex flex-col gap-3">
                <div className="relative w-36">
                    <Image
                        src={logoBlanco}
                        alt="Festiva"
                        priority
                        className='object-contain'                        
                    />
                </div>
                <p className="text-violet-300 text-sm px-4">Celebra cada momento</p>
                
                <div className="flex justify-between text-sm text-zinc-200 mt-4">
                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-red-100">Servicios</span>
                        <span>Explorar Proveedores</span>
                        <span>Cómo Funciona</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-bold text-red-100">Soporte</span>
                        <span>Centro de Ayuda</span>
                        <span>Términos</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/20 text-center text-xs text-zinc-400">
                    © 2026 Festiva Technologies Inc. Elevando cada celebración.
                </div>
            </div>
        </footer>
    );
}