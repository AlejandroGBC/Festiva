export interface PortfolioData {
    stats: {
        eventsCompleted: number;
        averageRating: number;
        yearsOfExperience: number;
    };
    gallery: { id: string; url: string; type: string }[];
    specialties: { id: string; name: string; variant: 'euphoric-pink' | 'electric-violet' | 'mint-neon' | 'confetti-orange' | 'default' }[];
    successCases: {
        id: string;
        title: string;
        description: string;
        location: string;
        externalUrl?: string;
        imageUrl: string;
        isVerified: boolean;
    }[];
}

// Estado simulado persistente en memoria de ejecución
const mockPortfolio: PortfolioData = {
    stats: { eventsCompleted: 124, averageRating: 4.9, yearsOfExperience: 8 },
    gallery: [
        { id: 'g-1', url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600", type: 'image' },
        { id: 'g-2', url: "https://images.unsplash.com/photo-1519225495810-7512c696505a?q=80&w=600", type: 'sparkle' },
        { id: 'g-3', url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400", type: 'layers' },
        { id: 'g-4', url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400", type: 'shield' }
    ],
    specialties: [
        { id: '1', name: 'Catering de Autor', variant: 'euphoric-pink' },
        { id: '2', name: 'Decoración Floral', variant: 'mint-neon' },
        { id: '3', name: 'Iluminación LED', variant: 'electric-violet' },
        { id: '4', name: 'Planificación Integral', variant: 'confetti-orange' }
    ],
    successCases: [
        {
            id: 'case-1',
            title: 'Boda Real 2026',
            description: 'Gestión completa para 500 invitados en el Palacio de Cristal.',
            location: 'Palacio de Cristal, Tegucigalpa',
            imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800',
            isVerified: true
        },
        {
            id: 'case-2',
            title: 'Gala Corporativa Tech',
            description: 'Experiencia inmersiva con tecnología LED para lanzamiento de IA.',
            location: 'Centro de Convenciones, San Pedro Sula',
            imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800',
            isVerified: true
        }
    ]
};

export const portfolioService = {
    getProviderPortfolio: async (): Promise<PortfolioData> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { ...mockPortfolio };
    },

    addGalleryItem: async (url: string): Promise<PortfolioData> => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        const types = ['image', 'sparkle', 'layers', 'shield'];
        mockPortfolio.gallery.push({
            id: `g-${Date.now()}`,
            url,
            type: types[Math.floor(Math.random() * types.length)]
        });
        return { ...mockPortfolio };
    },

    deleteGalleryItem: async (id: string): Promise<PortfolioData> => {
        mockPortfolio.gallery = mockPortfolio.gallery.filter(item => item.id !== id);
        return { ...mockPortfolio };
    },

    createSuccessCase: async (caseData: Omit<PortfolioData['successCases'][0], 'id' | 'imageUrl' | 'isVerified'>): Promise<PortfolioData> => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        mockPortfolio.successCases.unshift({
            id: `case-${Date.now()}`,
            ...caseData,
            imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800',
            isVerified: false
        });
        return { ...mockPortfolio };
    },

    deleteSuccessCase: async (id: string): Promise<PortfolioData> => {
        mockPortfolio.successCases = mockPortfolio.successCases.filter(c => c.id !== id);
        return { ...mockPortfolio };
    }
};