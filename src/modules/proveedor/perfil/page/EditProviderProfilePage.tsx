'use client';

import React, { useState } from 'react';
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

export default function EditProviderProfilePage() {
    const { profile, loading, updateField, handleSave } = useProviderProfile();
    const [isSaving, setIsSaving] = useState(false);

    if (loading || !profile) {
        return <Loading fullScreen label="Cargando perfil de Festiva..." />;
    }

    const handleAvailabilityToggle = (index: number) => {
        const updated = [...profile.availability];
        updated[index].available = !updated[index].available;
        updateField('availability', updated);
    };

    // const handleSpecialtiesChange = (updatedSpecs: string[]) => {
    //     updateField('initialSpecialties', updatedSpecs);
    // };

    // const handlePortfolioChange = (updatedImages: string[]) => {
    //     updateField('portfolioImages', updatedImages);
    // };

    const onSaveTrigger = async () => {
        setIsSaving(true);
        try {
            await handleSave();
        } catch (error) {
            console.error("Error al guardar el perfil:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <ProfileBanner />
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
                        // onChange={handleSpecialtiesChange} 
                    />
                    
                    <PortfolioSection 
                        images={profile.portfolioImages || []}
                        // onChange={handlePortfolioChange}
                    />
                    
                    <AvailabilitySection 
                        availability={profile.availability} 
                        onToggleChange={handleAvailabilityToggle} 
                    />
                    
                    <SaveProfileButton onClick={onSaveTrigger} isSaving={isSaving} />
                </div>
            </div>
        </>
    );
}