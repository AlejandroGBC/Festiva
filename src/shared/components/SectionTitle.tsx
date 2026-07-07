import React from 'react';

interface SectionTitleProps {
    title: string;
    actionLabel?: string;
    onActionClick?: () => void;
}

export default function SectionTitle({ title, actionLabel, onActionClick }: SectionTitleProps) {
    return (
        <div className="sh">
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)' }}>
                {title}
            </span>
            {actionLabel && (
                <button className="sh-link" onClick={onActionClick}>
                    {actionLabel}
                </button>
            )}
        </div>
    );
}