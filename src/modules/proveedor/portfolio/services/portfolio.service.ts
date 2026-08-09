import { PortfolioItem, PortfolioData } from '@/shared/types/portfolio.types';

export interface SavePortfolioPayload extends Omit<PortfolioItem, 'id' | 'imageUrls'> {
    id?: string;
    imageUrls: string[];
    removedImageUrls?: string[];
}

export const portfolioService = {
    getProviderPortfolio: async (): Promise<PortfolioData> => {
        const res = await fetch('/api/proveedor/portfolio');
        
        if (!res.ok) throw new Error('Error obteniendo portafolio');
        return res.json();
    },

    savePortfolioItem: async (item: SavePortfolioPayload): Promise<PortfolioData> => {
        const res = await fetch('/api/proveedor/portfolio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
        
        if (!res.ok) throw new Error('Error guardando ítem');
        return res.json();
    },

    deletePortfolioItem: async (id: string): Promise<PortfolioData> => {
        const res = await fetch(`/api/proveedor/portfolio?id=${encodeURIComponent(id)}`, {
            method: 'DELETE',
        });
        
        if (!res.ok) throw new Error('Error eliminando ítem');
        return res.json();
    }
};