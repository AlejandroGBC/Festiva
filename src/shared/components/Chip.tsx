import React from 'react';

interface ChipProps {
    variant?: 'pink' | 'purple' | 'teal' | 'orange' | 'default';
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export default function Chip({ variant = 'default', icon, children }: ChipProps) {
    const variantClass = variant !== 'default' ? `chip-${variant}` : '';
    return (
        <span className={`chip ${variantClass}`}>
            {icon}
            {children}
        </span>
    );
}