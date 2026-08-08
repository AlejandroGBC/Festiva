'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Camera, Trash2 } from 'lucide-react';
import { getAvatarUrl } from '@/shared/utils/getAvatarUrl';

interface AvatarProps {
    initials?: string;
    imageUrl?: string;
    editable?: boolean;
    onImageChange?: (file: File) => void;
    onImageRemove?: () => void;
}

export default function Avatar({
    initials = 'FP',
    imageUrl,
    editable = false,
    onImageChange,
    onImageRemove,
}: AvatarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const resolvedImageUrl = getAvatarUrl(imageUrl);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onImageChange) {
            onImageChange(file);
        }
    };

    return (
        <div className="group relative flex h-[72px] w-[72px] items-center justify-center rounded-full border-[3px] border-white bg-festiva-electric-violet shadow-md">
            <div className="w-full h-full rounded-full overflow-hidden relative flex items-center justify-center">
                {resolvedImageUrl ? (
                    <Image
                        src={resolvedImageUrl}
                        alt="Foto de Perfil"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <span className="font-sans text-[22px] font-extrabold text-white">{initials}</span>
                )}

                {editable && (
                    <>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white"
                        >
                            <Camera className="w-5 h-5" />
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </>
                )}
            </div>

            {editable && imageUrl && onImageRemove && (
                <button
                    type="button"
                    onClick={onImageRemove}
                    className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow-md z-40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Eliminar foto de perfil"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
    );
}