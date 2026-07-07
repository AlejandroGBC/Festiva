import React from 'react';

interface CardProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export default function Card({ children, style }: CardProps) {
    return (
        <div className="card" style={{ padding: '0 16px', ...style }}>
            {children}
        </div>
    );
}