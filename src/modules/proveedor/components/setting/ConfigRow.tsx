import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ConfigRowProps {
    icon: React.ComponentType<{ className?: string }>;
    iconBg: string;
    iconColor: string;
    title: string;
    subtitle?: string;
    rightElement?: React.ReactNode;
    isDanger?: boolean;
    onClick?: () => void;
}

export default function ConfigRow({
    icon: Icon,
    iconBg,
    iconColor,
    title,
    subtitle,
    rightElement,
    isDanger = false,
    onClick
}: ConfigRowProps) {
    return (
        <div 
            onClick={onClick}
            className="flex items-center gap-3 padding p-3.5 border-b border-slate-100 last:border-b-0 cursor-pointer hover:bg-slate-50/60 transition-colors"
        >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                <Icon className={`w-[17px] h-[17px] stroke-[1.8] ${iconColor}`} />
            </div>
            
            <div className="flex-1 min-w-0">
                <div className={`text-[14px] font-semibold leading-tight ${isDanger ? 'text-festiva-euphoric-pink' : 'text-festiva-midnight-blue'}`}>
                    {title}
                </div>
                {subtitle && (
                    <p className="text-[12px] text-slate-400 mt-0.5 truncate">{subtitle}</p>
                )}
            </div>

            <div className="flex items-center gap-2">
                {rightElement}
                {!rightElement && !isDanger && (
                    <ChevronRight className="w-4 h-4 text-slate-300 stroke-[2.2]" />
                )}
            </div>
        </div>
    );
}