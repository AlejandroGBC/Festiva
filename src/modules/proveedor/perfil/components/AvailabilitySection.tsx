import React from 'react';
import Card from '../../../../shared/components/Card';
import Toggle from '../../../../shared/components/Toggle';
import SectionTitle from '@/shared/components/SectionTitle';

interface AvailabilityItem {
    dayRange: string;
    hours: string;
    available: boolean;
}

interface AvailabilitySectionProps {
    availability: AvailabilityItem[];
    onToggleChange: (index: number) => void;
}

export default function AvailabilitySection({ availability, onToggleChange }: AvailabilitySectionProps) {
    return (
        <Card>
            <SectionTitle
                title="Disponibilidad semanal"
                actionLabel='Cambiar' //Pronto: cambiar horarios de disponibilidad
            />
            <div className="flex flex-col mt-2">
                {availability.map((item, index) => (
                    <div 
                        key={index} 
                        className={`flex justify-between items-center py-3.5 ${
                        index !== availability.length - 1 ? 'border-b border-slate-100' : ''
                        }`}
                    >
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[15px] font-bold text-festiva-midnight-blue leading-tight">
                                {item.dayRange}
                            </span>
                            <span className={`text-[13px] font-medium leading-tight ${
                                item.available ? 'text-slate-400' : 'text-slate-300'
                            }`}>
                                {item.hours}
                            </span>
                        </div>
                        <Toggle isOn={item.available} onToggle={() => onToggleChange(index)} />
                    </div>
                ))}
            </div>
        </Card>
    );
}