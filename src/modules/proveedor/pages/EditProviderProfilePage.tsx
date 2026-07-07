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

        {/* Barra de navegación inferior estática */}
        <div className="bnav" role="navigation">
            <button className="bni" aria-label="Inicio"><svg className="ic" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span>Inicio</span></button>
            <button className="bni" aria-label="Buscar"><svg className="ic" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><span>Buscar</span></button>
            <button className="bni" aria-label="Eventos"><svg className="ic" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg><span>Eventos</span></button>
            <button className="bni" aria-label="Chat"><svg className="ic" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span>Chat</span></button>
            <button className="bni on" aria-label="Perfil"><svg className="ic" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>Perfil</span></button>
        </div>
    </div>
  );
}