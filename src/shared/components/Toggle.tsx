import React from 'react';

interface ToggleProps {
    isOn: boolean;
    onToggle?: () => void;
}

export default function Toggle({ isOn, onToggle }: ToggleProps) {
    return (
        <div className={`toggle ${isOn ? 'on' : 'off'}`} onClick={onToggle}>
            <div className="toggle-knob"></div>
        </div>
    );
}