import { ProviderProfile } from '../types/provider';

export const providerService = {
    getProfile: async (): Promise<ProviderProfile> => {
      // Simulación de data
      return {
        businessName: 'Decos Magicos',
        description: '5 años de experiencia en decoración para eventos especiales. Especialistas en bodas, xv anos y corporativos. Trabajamos con flores naturales de temporada.',
        city: 'Tegucigalpa, Francisco Morazan',
        phone: '+504 33345678',
        completionPercentage: 92,
        specialties: ['Decoracion floral', 'Iluminacion', 'Montajes', 'Bodas', 'XV Anos'],
        portfolioImages: ['pink', 'purple', 'orange', 'teal', 'navy'],
        availability: [
          { dayRange: 'Lunes – Viernes', hours: '9:00 – 19:00', available: true },
          { dayRange: 'Sabado', hours: '8:00 – 22:00', available: true },
          { dayRange: 'Domingo', hours: 'No disponible', available: false },
        ]
      };
    },

    updateProfile: async (profile: ProviderProfile): Promise<boolean> => {
      console.log('Guardando perfil en el servidor...', profile);
      return true;
    }
};