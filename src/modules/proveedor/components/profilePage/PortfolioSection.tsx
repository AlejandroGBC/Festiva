import React from 'react';
import SectionTitle from '../../../../shared/components/SectionTitle';

interface PortfolioSectionProps {
    images: string[];
}

export default function PortfolioSection({ images }: PortfolioSectionProps) {
    return (
        <div>
            <SectionTitle title="Portafolio" actionLabel="Gestionar" />
            <div className="port-edit-grid">
                {images.map((colorKey, index) => (
                    <div key={index} className="port-edit-cell" style={{ background: `rgba(var(--${colorKey}-rgb, 38,30,78), .08)` }}>
                        <svg style={{ color: `var(--${colorKey})` }} className="ic" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                        </svg>
                    </div>
                ))}
                <div className="port-edit-cell port-add">
                    <svg className="ic" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"/><path d="M12 5v14"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}