'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Button from './Button';

/**
 * @typedef {Object} TopNavbarProps
 * @property {string} [title]
 */

/**
 * @type {React.FC<{title?: string}>}
 */

export default function TopNavbar({ title }) {
    const router = useRouter();

    return (
        <div className="w-full flex items-center justify-between px-4 py-3 bg-transparent shrink-0">
            <Button
                variant="ghost" 
                size="icon" 
                shape="pill"
                onClick={() => router.back()}
                className="text-festiva-midnight-blue hover:bg-slate-100 transition-colors"
            >
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </Button>
            
            {title && (
                <span className="text-[17px] font-bold text-festiva-midnight-blue mx-auto pr-9">
                    {title}
                </span>
            )}
            
            {!title && <div className="w-9" />}
        </div>
    );
}