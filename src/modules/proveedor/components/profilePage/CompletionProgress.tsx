import React from 'react';
import ProgressBar from '../../../../shared/components/ProgressBar';

interface CompletionProgressProps {
    percentage: number;
}

export default function CompletionProgress({ percentage }: CompletionProgressProps) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px' }}>
                <span>Agrega portafolio para llegar al 100%</span>
            </div>
            <ProgressBar percentage={percentage} color="var(--teal)" />
        </div>
    );
}