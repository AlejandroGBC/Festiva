import React from 'react';
import Chip from '../../../../shared/components/Chip';
import Button from '../../../../shared/components/Button';

interface SpecialtiesSectionProps {
    specialties: string[];
}

export default function SpecialtiesSection({ specialties }: SpecialtiesSectionProps) {
    // Mapeo manual de variantes - se cambiará
    const getVariant = (index: number) => {
        const variants: ('pink' | 'purple' | 'orange' | 'teal')[] = ['pink', 'purple', 'orange', 'teal'];
        return variants[index % variants.length];
    };

  return (
    <div>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>
            Especialidades
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {specialties.map((spec, idx) => (
            <Chip key={spec} variant={getVariant(idx)}>
                {spec}
            </Chip>
            ))}
            <Button variant="outline" size="sm" style={{ width: 'auto', gap: '5px', fontSize: '12px' }}>
                <svg className="ic" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Agregar
            </Button>
        </div>
    </div>
  );
}