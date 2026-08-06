import { ProviderProfile } from '@/shared/types/perfi-proveedor.types';

export const providerService = {
    getProfile: async (): Promise<ProviderProfile> => {
      const res = await fetch('/api/proveedor/perfil', { method: 'GET' });
      if (!res.ok) {
        throw new Error('Error al cargar perfil');
      }
      return res.json();
    },

    updateProfile: async (profile: ProviderProfile): Promise<boolean> => {
      const res = await fetch('/api/proveedor/perfil', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      return res.ok;
    }
};