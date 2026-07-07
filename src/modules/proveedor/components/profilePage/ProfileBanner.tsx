import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Share2 } from 'lucide-react';
import Button from '../../../../shared/components/Button';
import Avatar from '../../../../shared/components/Avatar';

export default function ProfileBanner() {

    const router = useRouter();

    return (
        <div className="edit-banner">
            <svg 
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.04,
                    pointerEvents: 'none' 
                }} 
                viewBox="0 0 390 160"
                preserveAspectRatio="xMidYMid slice"
            >
                <circle cx="320" cy="80" r="120" fill="white"/>
            </svg>
            <div className="absolute top-4 left-0 right-0 px-4 z-20 flex justify-between">
                <Button
                    variant="ghost" 
                    size="icon" 
                    shape="pill"
                    onClick={() => router.back()}
                    className="text-white hover:bg-white/20"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <Button
                    variant="ghost" 
                    size="icon" 
                    shape="pill"
                    className="text-white hover:bg-white/20"
                >
                    <Share2 className="w-5 h-5" />
                </Button>
            </div>
            <div className="absolute -bottom-[30px] left-5 z-30">
                <Avatar initials="DM" editable={true} />
            </div>
        </div>
    );
}