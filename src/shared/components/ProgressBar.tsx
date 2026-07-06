import React from 'react';

interface ProgressBarProps {
    percentage: number;
    color?: string;
}

export default function ProgressBar({ percentage, color = 'var(--teal)' }: ProgressBarProps) {
    return (
        <div className="prog">
            <div className="prog-fill" style={{ width: `${percentage}%`, background: color }}></div>
        </div>
    );
}