'use client';

import React from 'react';
import { StatsData } from '../types/landing.types';

export default function StatsSection({ stats }: { stats?: StatsData }) {
    if (!stats) return null;

    return (
        <section className="w-full py-8 bg-festiva-midnight-blue text-white flex justify-center items-center">
            <div className="flex justify-around items-center w-full max-w-md px-4">
                <div className="flex flex-col items-center">
                    <span className="text-base font-bold">{stats.events}</span>
                    <span className="text-xs text-violet-300 uppercase tracking-wide">Eventos</span>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="flex flex-col items-center">
                    <span className="text-base font-bold">{stats.providers}</span>
                    <span className="text-xs text-violet-300 uppercase tracking-wide">Proveedores</span>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="flex flex-col items-center">
                    <span className="text-base font-bold">{stats.satisfaction}</span>
                    <span className="text-xs text-violet-300 uppercase tracking-wide">Satisfacción</span>
                </div>
            </div>
        </section>
    );
}