import React from 'react';

interface SectionTitleProps {
    title: string;
    actionLabel?: string;
    onActionClick?: () => void;
    actionClassName?: string;
}

export default function SectionTitle({ 
    title,
    actionLabel,
    onActionClick,
    actionClassName = 'text-festiva-euphoric-pink hover:opacity-80'
}:SectionTitleProps) {
    return (
        <div className="flex justify-between items-center mb-4 w-full">
            <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                {title}
            </p>
            {actionLabel && (
                <button 
                    type="button"
                    onClick={onActionClick}
                    className={`text-[13px] font-bold transition-all ${actionClassName}`}
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}