'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { useProviderProfile } from '../hooks/useProviderProfile';
import ProfileBanner from '../components/ProfileBanner';
import ProfileHeader from '../components/ProfileHeader';
import CompletionProgress from '../components/CompletionProgress';
import BusinessInfoForm from '../components/BusinessInfoForm';
import SpecialtiesSection from '../components/SpecialtiesSection';
import PortfolioSection from '../components/PortfolioSection';
import AvailabilitySection from '../components/AvailabilitySection';
import SaveProfileButton from '../components/SaveProfileButton';
import Loading from "@/shared/components/Loading";
import { obtenerIniciales } from '@/shared/utils/obtenerIniciales';
import { portfolioService } from '../../portfolio/services/portfolio.service';
import { PortfolioItem } from '@/shared/types/portfolio.types';
import { uploadAvatarImage } from '@/shared/services/upload.service';
import { getAvatarUrl } from '@/shared/utils/getAvatarUrl';

export default function EditProviderProfilePage() {
    const router = useRouter();
    const { profile, loading, updateField, handleSave } = useProviderProfile();
    const [isSaving, setIsSaving] = useState(false);
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const data = await portfolioService.getProviderPortfolio();
                setPortfolioItems(data.items || []);
            } catch (error) {
                console.error("Error al obtener ítems del portafolio:", error);
            }
        };
        fetchPortfolio();
    }, []);    

    if (loading || !profile) {
        return <Loading fullScreen label="Cargando perfil de Festiva..." />;
    }

    const handleAvatarSelect = (file: File) => {
        setSelectedAvatarFile(file);
        const localPreview = URL.createObjectURL(file);
        updateField('foto_perfil_url', localPreview);
    };

    const handleAvatarRemove = () => {
        setSelectedAvatarFile(null);
        updateField('foto_perfil_url', '');
    };

    const handleAvailabilityToggle = (index: number) => {
        const updated = [...profile.availability];
        updated[index].available = !updated[index].available;
        updateField('availability', updated);
    };

    const handleSpecialtiesChange = (specialties: string[]) => {
        updateField('initialSpecialties', specialties);
    };

    const onSaveTrigger = async () => {
        setIsSaving(true);
        try {
            let finalFotoUrl = profile.foto_perfil_url;

            if (selectedAvatarFile && profile.id_proveedor) {
                finalFotoUrl = await uploadAvatarImage(selectedAvatarFile, profile.id_proveedor);
            }

            const updatedProfileData = {
                ...profile,
                foto_perfil_url: finalFotoUrl || ""
            };

            await handleSave(updatedProfileData);
            setSelectedAvatarFile(null);

            router.refresh();
        } catch (error) {
            console.error("Error al guardar el perfil:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const initials = obtenerIniciales(profile.businessName);
    const avatarUrl = getAvatarUrl(profile.foto_perfil_url);

    return (
        <>
            <ProfileBanner 
                initials={initials} 
                avatarUrl={avatarUrl}
                onAvatarChange={handleAvatarSelect}
                onAvatarRemove={handleAvatarRemove}
            />

            <div className="flex-1 overflow-y-auto no-scrollbar w-full pb-5">
                <div style={{ padding: '42px 20px 24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>

                    <ProfileHeader 
                        businessName={profile.businessName} 
                        specialist={profile.specialist}
                        location={profile.city}
                        percentage={profile.completionPercentage}
                    />
                    
                    <CompletionProgress percentage={profile.completionPercentage} />
                    
                    <BusinessInfoForm 
                        data={{
                            businessName: profile.businessName,
                            description: profile.description,
                            city: profile.city,
                            phone: profile.phone
                        }} 
                        onChange={updateField} 
                    />
                
                    <SpecialtiesSection 
                        initialSpecialties={profile.initialSpecialties || []}
                        onChange={handleSpecialtiesChange} 
                    />

                    <PortfolioSection 
                        items={portfolioItems}
                    />
                    
                    <AvailabilitySection 
                        availability={profile.availability} 
                        onToggleChange={handleAvailabilityToggle} 
                    />

                    {/* Acceso rápido — Mis reseñas */}
                    <div>
                        <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-2">
                            Mi reputación
                        </p>
                        <div
                            onClick={() => router.push('/proveedor/reportes/resenas')}
                            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white border border-[#EDEAF8] cursor-pointer hover:bg-[#F9F8FF] transition-colors"
                        >
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,156,46,0.10)' }}>
                                <Star size={18} className="text-festiva-confetti-orange" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm text-festiva-midnight-blue m-0">Mis reseñas</p>
                                <p className="text-xs text-festiva-midnight-blue/45 m-0 mt-0.5">Calificaciones que te dejaron los clientes</p>
                            </div>
                            <ChevronRight size={16} className="text-festiva-midnight-blue/25 shrink-0" />
                        </div>
                    </div>

                    <SaveProfileButton onClick={onSaveTrigger} isSaving={isSaving} />
                </div>
            </div>
        </>
    );
}