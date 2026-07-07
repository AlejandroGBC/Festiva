import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function IconButton({ children, style, ...props }: IconButtonProps) {
    return (
        <button className="icon-btn" style={{ background: 'rgba(255,255,255,.15)', ...style }} {...props}>
            {children}
        </button>
    );
}