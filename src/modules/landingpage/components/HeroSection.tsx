'use client';

import React from 'react';
import Image from 'next/image';
import Card from '@/shared/components/Card';
import Input from '@/shared/components/Input';
import Button from '@/shared/components/Button';

import { PartyPopper, MapPin } from 'lucide-react';

interface HeroSectionProps {
    celebrationType: string;
    setCelebrationType: (val: string) => void;
    location: string;
    setLocation: (val: string) => void;
    onStart: () => void;
}

export default function HeroSection({
    celebrationType,
    setCelebrationType,
    location,
    setLocation,
    onStart,
}: HeroSectionProps) {
    const imageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBEPVrVtlsA5qKogZJlAtuM-ELXZB95ec3NaxCKiKizzjiDjXNEwX0dFx-5luq0QkjNOCJSrjar1OdkYWkJblTA8zjBMsw-ZhklMF1EJkaWgX-ZbFLEolI5uxmabBc1k5ftbYWd2NcN8VyxZppsCsTXzCBe-vR4FqX28Uf0ZGwxh84pFs5L-HpsZzFBAM66mShRV6Wzhz5c264yHUEvsLBBbywCq1I0emKYSvzR2hLGwk3inGufAssPP21I5Bose0zmsCGqSqaD_P0";
    
    return (
        <section className="relative w-full pt-12 pb-20 px-4 flex flex-col items-center text-center overflow-hidden">
            
            {/* Destellos */}
            <div className="absolute top-[-80px] right-10 size-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-[300px] left-10 size-80 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />

            <h1 className="text-2xl text-festiva-midnight-blue max-w-sm">
                Tu evento ideal <span className="text-festiva-euphoric-pink">comienza aquí</span>
            </h1>
        
            <p className="mt-4 text-sm text-festiva-midnight-blue">
                Publica una vez y recibe múltiples propuestas de los mejores proveedores. Celebra cada momento con la confianza de Festiva.
            </p>

            {/* Contenedor de Imagen + Card */}
            <div className="relative w-full max-w-sm mt-6 flex flex-col items-center">
                
                {/* Imagen del evento */}
                <div className="relative w-full h-80 rounded-t-[36px] overflow-hidden shadow-md">
                <Image
                    src={imageUrl}
                    alt="Celebración Festiva"
                    fill
                    priority
                    unoptimized
                    className="object-cover"
                />
                </div>

                {/* Card del Buscador */}            
                <Card className="w-full relative -mt-16 p-6 bg-white/70 backdrop-blur-xl rounded-[28px] border border-white/60 shadow-2xl flex flex-col gap-5 text-left z-10">
                    <Input
                        label="¿Qué celebras?"
                        placeholder="Boda, Cumpleaños, XV..."
                        variant="white"
                        icon={PartyPopper}
                        value={celebrationType}
                        onChange={(e) => setCelebrationType(e.target.value)}
                    />

                    <Input
                        label="Ubicación"
                        placeholder="Ciudad o Zona"
                        variant="white"
                        icon={MapPin}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <Button
                        variant="primary"
                        size="lg"
                        shape="pill"
                        onClick={onStart}
                        className="w-full mt-1 bg-gradient-to-r from-festiva-electric-violet to-festiva-euphoric-pink shadow-lg shadow-festiva-euphoric-pink/25 hover:brightness-105"
                    >
                        Comenzar
                    </Button>
                </Card>
            </div>
        </section>
    );
}