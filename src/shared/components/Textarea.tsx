import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

export default function Textarea({ label, style, ...props }: TextareaProps) {
    return (
        <div className="field">
            <label className="lbl">{label}</label>
            <textarea 
                className="inp inp-bare" 
                rows={3} 
                style={{ padding: '12px 14px', resize: 'none', ...style }} 
                {...props} 
            />
        </div>
    );
}