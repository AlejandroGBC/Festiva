import React from 'react';

interface ProfileHeaderProps {
    businessName: string;
    location: string;
    percentage: number;
}

export default function ProfileHeader({ businessName, location, percentage }: ProfileHeaderProps) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)' }}>{businessName}</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '3px' }}>{location}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Perfil completo</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--teal)' }}>{percentage}%</div>
            </div>
        </div>
    );
}