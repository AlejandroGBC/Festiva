import { useState, useEffect } from 'react';
import { ProviderProfile } from '@/shared/types/perfi-proveedor.types';
import { providerService } from '../service/provider.service';

export function useProviderProfile() {
    const [profile, setProfile] = useState<ProviderProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        providerService.getProfile().then((data) => {
            setProfile(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    const updateField = <K extends keyof ProviderProfile>(field: K, value: ProviderProfile[K]) => {
        if (!profile) return;
        setProfile({ ...profile, [field]: value });
    };

    const handleSave = async () => {
        if (!profile) return;

        const ok = await providerService.updateProfile(profile);
        
        if (!ok) {
            throw new Error("No se pudieron guardar los cambios");
        }
    };

    return { profile, loading, error, updateField, handleSave };
}