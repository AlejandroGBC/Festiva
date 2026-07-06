import React from 'react';
import IconButton from '../../../../shared/components/IconButton';
import Avatar from '../../../../shared/components/Avatar';

export default function ProfileBanner() {
    return (
        <div className="edit-banner">
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }} viewBox="0 0 390 160">
                <circle cx="320" cy="80" r="120" fill="white"/>
            </svg>
            <div className="edit-topbar">
                <IconButton>
                    <svg style={{ color: '#fff' }} className="ic" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
                    </svg>
                </IconButton>
                <IconButton>
                    <svg style={{ color: '#fff' }} className="ic" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
                    </svg>
                </IconButton>
            </div>
            <div className="edit-av-wrap">
                <Avatar initials="DM" editable={true} />
            </div>
        </div>
    );
}