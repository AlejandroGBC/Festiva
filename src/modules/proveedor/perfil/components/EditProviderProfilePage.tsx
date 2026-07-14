import React, { useState } from 'react';
import { useProviderProfile } from '../hooks/useProviderProfile';
import ProfileBanner from './ProfileBanner';
import ProfileHeader from './ProfileHeader';
import CompletionProgress from './CompletionProgress';
import BusinessInfoForm from './BusinessInfoForm';
import SpecialtiesSection from './SpecialtiesSection';
import PortfolioSection from './PortfolioSection';
import AvailabilitySection from './AvailabilitySection';
import SaveProfileButton from './SaveProfileButton';

export default function EditProviderProfilePage() {
    const { profile, loading, updateField, handleSave } = useProviderProfile();
    const [isSaving, setIsSaving] = useState(false);

    if (loading || !profile) {
        return ( 
            <div style={{ color: 'var(--navy)', fontFamily: 'var(--font)', padding: '20px' }}>
                Cargando Perfil...
            </div>
        )
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
        <div>
            <div className="body">
                <ProfileBanner />
                
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
        </div>
  );
}