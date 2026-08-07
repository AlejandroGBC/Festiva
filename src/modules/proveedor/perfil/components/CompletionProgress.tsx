import React from 'react';
import { Info } from 'lucide-react';
import Card from '@/shared/components/Card';
import ProgressBar from '@/shared/components/ProgressBar';

interface CompletionProgressProps {
    percentage: number;
}

const getProgressInfo = (percentage: number) => {
    if (percentage === 100) {
        return {
            title: "¡Perfil completo!",
            subtext: "Tu perfil está listo para destacar ante nuevos clientes.",
        };
    }
    if (percentage >= 70) {
        return {
            title: "Casi listo, falta poco",
            subtext: "Agrega fotos a tu portafolio para llegar al 100%.",
        };
    }
    if (percentage >= 40) {
        return {
            title: "Buen avance",
            subtext: "Agrega tus especialidades y teléfono para atraer más eventos.",
        };
    }
    return {
        title: "Perfil inicial",
        subtext: "Completa la información básica de tu negocio para comenzar.",
    };
};

export default function CompletionProgress({ percentage }: CompletionProgressProps) {

    const { title, subtext } = getProgressInfo(percentage);

    return (
        <Card>
            <div className="flex justify-between items-start mb-3">
                <div>
                    <span className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                        Estado del perfil
                    </span>
                    <span className="block text-[16px] font-bold text-festiva-midnight-blue mt-0.5">
                        {title}
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
                <span>{subtext}</span>
            </div>
        </Card>
    );
}