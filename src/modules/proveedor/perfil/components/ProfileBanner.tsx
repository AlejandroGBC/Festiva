import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Share2 } from 'lucide-react';
import Button from '@/shared/components/Button';
import Avatar from '@/shared/components/Avatar';

interface ProfileBannerProps {
    isEditable?: boolean;
    showShare?: boolean;
    initials?: string;
    avatarUrl?: string;
    onAvatarChange?: (file: File) => void;
    onAvatarRemove?: () => void;
}

export default function ProfileBanner({
    isEditable = true,
    showShare = true,
    initials = "FP",
    avatarUrl,
    onAvatarChange,
    onAvatarRemove
}: ProfileBannerProps) {
    const router = useRouter();    
    return (
        <div className="edit-banner relative">
            <div className="absolute top-4 left-0 right-0 px-4 z-20 flex items-center justify-between">
                <Button
                    variant="ghost" 
                    size="icon" 
                    shape="pill"
                    onClick={() => router.back()}
                    className="text-white hover:bg-white/20"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>

                <span className="text-white/90 text-[13px] font-semibold tracking-wide">
                    Mi Perfil
                </span>

                {showShare ? (
                    <Button
                        variant="ghost" 
                        size="icon" 
                        shape="pill"
                        className="text-white hover:bg-white/20"
                    >
                        <Share2 className="w-5 h-5" />
                    </Button>
                ) : (
                    <div className="w-10 h-10" />
                )}                
            </div>
            <div className="absolute -bottom-[30px] left-5 z-30">
                <Avatar 
                    initials={initials} 
                    imageUrl={avatarUrl}
                    editable={isEditable} 
                    onImageChange={onAvatarChange}
                    onImageRemove={onAvatarRemove}
                />
            </div>
        </div>
    );
}