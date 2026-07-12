import React from 'react';

interface ProfileHeaderProps {
    businessName: string;
    specialist: string;
    location: string;
    percentage: number;
}

export default function ProfileHeader({ businessName, specialist, location }: ProfileHeaderProps) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)' }}>{businessName}</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '3px' }}>{specialist} - {location}</div>
            </div>
        </div>
    );
}