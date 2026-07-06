import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: React.ReactNode;
}

export default function Input({ label, icon, ...props }: InputProps) {
    return (
        <div className="field">
            <label className="lbl">{label}</label>
            <div className="inp-wrap">
                {icon}
                <input className={`inp ${!icon ? 'inp-bare' : ''}`} {...props} />
            </div>
        </div>
    );
}