import React from 'react';
import { useProviderProfile } from '../hooks/useProviderProfile';
import ProfileBanner from '../components/profilePage/ProfileBanner';
import ProfileHeader from '../components/profilePage/ProfileHeader';
import CompletionProgress from '../components/profilePage/CompletionProgress';
import BusinessInfoForm from '../components/profilePage/BusinessInfoForm';
import SpecialtiesSection from '../components/profilePage/SpecialtiesSection';
import PortfolioSection from '../components/profilePage/PortfolioSection';
import AvailabilitySection from '../components/profilePage/AvailabilitySection';
import SaveProfileButton from '../components/profilePage/SaveProfileButton';

export default function EditProviderProfilePage() {
    const { profile, loading, updateField, handleSave } = useProviderProfile();

    if (loading || !profile) {
        return <div style={{ color: 'var(--navy)', fontFamily: 'var(--font)', padding: '20px' }}>Cargando Perfil...</div>;
    }

    const handleAvailabilityToggle = (index: number) => {
        const updated = [...profile.availability];
        updated[index].available = !updated[index].available;
        updateField('availability', updated);
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
            
                <SpecialtiesSection specialties={profile.specialties} />
                
                <PortfolioSection images={profile.portfolioImages} />
                
                <AvailabilitySection 
                    availability={profile.availability} 
                    onToggleChange={handleAvailabilityToggle} 
                />
                
                <SaveProfileButton onClick={handleSave} />
            </div>
        </div>
    </div>
  );
}