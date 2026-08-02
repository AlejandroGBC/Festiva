'use client';

import React from 'react';
import Image from 'next/image';
import { FeaturedProvider } from '../types/landing.types';
import Button from '@/shared/components/Button';

export default function TopProvidersSection({ providers }: { providers?: FeaturedProvider[] }) {
  return (
    <section className="w-full py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-sm flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-festiva-midnight-blue">Proveedores top</h2>
        <button className="text-festiva-euphoric-pink text-sm font-bold">Ver todos</button>
      </div>
      <div className="w-full max-w-sm flex flex-col gap-6">
        {providers?.map((provider) => (
          <div key={provider.id} className="bg-white rounded-3xl shadow-lg border border-zinc-100 overflow-hidden">
            <Image
              src={provider.image}
              alt={provider.name}
              width={400}
              height={192}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold text-festiva-midnight-blue">{provider.name}</h3>
                  {provider.verified && (
                    <span className="text-xs font-bold text-teal-500 uppercase">✓ Verificado</span>
                  )}
                </div>
                <div className="bg-festiva-monochromatic px-2 py-1 rounded-full text-xs font-bold text-festiva-midnight-blue">
                  ★ {provider.rating}
                </div>
              </div>
              <p className="text-sm text-zinc-700">{provider.description}</p>
              <Button variant="outline" className="border-festiva-midnight-blue">
                Consultar disponibilidad
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}