import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
    return (
        <div
            className={`rounded-[16px] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}