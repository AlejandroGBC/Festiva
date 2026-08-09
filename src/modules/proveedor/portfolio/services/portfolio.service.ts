import { PortfolioItem, PortfolioData } from '@/shared/types/portfolio.types';

export const portfolioService = {
    getProviderPortfolio: async (): Promise<PortfolioData> => {
        const res = await fetch('/api/proveedor/portfolio');
        
        if (!res.ok) throw new Error('Error obteniendo portafolio');
        return res.json();
    },

    savePortfolioItem: async (item: Omit<PortfolioItem, 'id'> & { id?: string; removeExistingImage?: boolean }): Promise<PortfolioData> => {
        const res = await fetch('/api/proveedor/portfolio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...item,
                imageUrl: item.imageUrl ?? null,
                removeExistingImage: Boolean(item.removeExistingImage),
            }),
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