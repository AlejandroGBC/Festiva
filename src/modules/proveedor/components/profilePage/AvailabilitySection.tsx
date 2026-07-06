import React from 'react';
import Card from '../../../../shared/components/Card';
import Toggle from '../../../../shared/components/Toggle';

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
        <div>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>
                Disponibilidad semanal
            </p>
            <Card>
                {availability.map((item, index) => (
                    <div className="avail-item" key={index}>
                        <div>
                            <div className="avail-day">{item.dayRange}</div>
                            <div className="avail-hours">{item.hours}</div>
                        </div>
                        <Toggle isOn={item.available} onToggle={() => onToggleChange(index)} />
                    </div>
                ))}
            </Card>
        </div>
    );
}