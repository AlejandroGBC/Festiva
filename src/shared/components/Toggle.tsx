import React from 'react';

interface ToggleProps {
    isOn: boolean;
    onToggle?: () => void;
}

export default function Toggle({ isOn, onToggle }: ToggleProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className={`relative inline-flex h-[30px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isOn ? 'bg-festiva-electric-violet' : 'bg-festiva-electric-violet/20'
            }`}
        >
            <span
                className={`pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isOn ? 'translate-x-[24px]' : 'translate-x-0'
                }`}
            />
        </button>
    );
}