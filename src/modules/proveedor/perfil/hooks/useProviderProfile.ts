import { useState, useEffect } from 'react';
import { ProviderProfile } from '../../types/provider';
import { providerService } from '../../services/provider.service';

export function useProviderProfile() {
    const [profile, setProfile] = useState<ProviderProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        providerService.getProfile().then((data) => {
            setProfile(data);
            setLoading(false);
        });
    }, []);

    const updateField = <K extends keyof ProviderProfile>(field: K, value: ProviderProfile[K]) => {
        if (!profile) return;
        setProfile({ ...profile, [field]: value });
    };

    const handleSave = async () => {
        if (!profile) return;
        await providerService.updateProfile(profile);
    };

    return { profile, loading, updateField, handleSave };
}