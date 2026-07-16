import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    icon: LucideIcon;
    value: string | number;
    label: string;
    iconColorClass: string;
    iconBgClass: string;
}

export default function StatCard({ icon: Icon, value, label, iconColorClass, iconBgClass }: StatCardProps) {
    return (
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${iconBgClass}`}>
                <Icon className={`w-6 h-6 ${iconColorClass}`} />
            </div>
            <span className="font-sans font-bold text-3xl text-festiva-midnight-blue tracking-tight">
                {value}
            </span>
            <span className="font-sans text-[11px] font-bold tracking-wider text-slate-400 uppercase mt-1">
                {label}
            </span>
        </div>
    );
}