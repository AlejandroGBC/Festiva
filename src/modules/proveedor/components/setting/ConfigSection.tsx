import React from 'react';
import Card from '@/shared/components/Card';

interface ConfigSectionProps {
    label: string;
    children: React.ReactNode;
}

export default function ConfigSection({ label, children }: ConfigSectionProps) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-[10.5px] font-bold tracking-[1.5px] text-slate-400 uppercase pl-0.5">
                {label}
            </span>
            <Card className="overflow-hidden p-0">
                <div className="flex flex-col">
                    {children}
                </div>
            </Card>
        </div>
    );
}