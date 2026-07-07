import React from 'react';
import { Plus } from 'lucide-react';

interface AvatarProps {
    initials: string;
    editable?: boolean;
}

export default function Avatar({ initials, editable = false }: AvatarProps) {
    return (
        <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border-[3px] border-white bg-festiva-electric-violet font-sans text-[22px] font-extrabold text-white shadow-sm">
            {initials}
            
            {editable && (
                <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-festiva-euphoric-pink shadow-sm">
                <Plus className="h-3 w-3 stroke-[2.5] text-white" />
                </div>
            )}
        </div>
    );
}