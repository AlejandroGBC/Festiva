import React from 'react';

interface AvatarProps {
    initials: string;
    editable?: boolean;
}

export default function Avatar({ initials, editable = false }: AvatarProps) {
    return (
        <div className="edit-av">
            {initials}
            {editable && (
                <div className="edit-av-badge">
                    <svg className="ic" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"/><path d="M12 5v14"/>
                    </svg>
                </div>
            )}
        </div>
    );
}