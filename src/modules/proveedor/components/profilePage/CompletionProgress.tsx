import React from 'react';
import { Info } from 'lucide-react';
import Card from '../../../../shared/components/Card';
import ProgressBar from '../../../../shared/components/ProgressBar';

interface CompletionProgressProps {
    percentage: number;
}

export default function CompletionProgress({ percentage }: CompletionProgressProps) {
    return (
        <Card>
            <div className="flex justify-between items-start mb-3">
                <div>
                    <span className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                        Estado del perfil
                    </span>
                    <span className="block text-[16px] font-bold text-festiva-midnight-blue mt-0.5">
                        Casi listo, falta poco
                    </span>
                </div>
                <div className="text-[28px] font-black text-festiva-mint-neon leading-none">
                    {percentage}%
                </div>
            </div>

            <div className="mb-3">
                <ProgressBar percentage={percentage} color="mint-neon"/>
            </div>

            <div className="flex items-center gap-1.5 text-[12px] text-slate-400">
                <Info className="w-3.5 h-3.5 stroke-[2]" />
                <span>Agrega portafolio para llegar al 100%</span>
            </div>
        </Card>
    );
}