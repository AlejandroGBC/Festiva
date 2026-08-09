import { useState, useEffect } from 'react';
import { portfolioService } from '../services/portfolio.service';
import { PortfolioItem, PortfolioData } from '@/shared/types/portfolio.types';

export function usePortfolio() {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    async function loadPortfolio() {
        try {
            setLoading(true);
            const res = await portfolioService.getProviderPortfolio();
            setData(res);
        } catch {
            console.error('Error cargando el portafolio');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPortfolio();
    }, []);

    const saveItem = async (item: Omit<PortfolioItem, 'id'> & { id?: string; removeExistingImage?: boolean }) => {
        try {
            setUpdating(true);
            const updated = await portfolioService.savePortfolioItem(item);
            setData(updated);
            return true;
        } catch {
            return false;
        } finally {
            setUpdating(false);
        }
    };

    const deleteItem = async (id: string) => {
        try {
            setUpdating(true);
            const updated = await portfolioService.deletePortfolioItem(id);
            if (updated && Array.isArray(updated.items)) {
                setData(updated);
            } else {
                await loadPortfolio();
            }
        } catch {
            console.error('Error al borrar el trabajo de portafolio');
        } finally {
            setUpdating(false);
        }
    };

    return { 
        data, 
        loading, 
        updating,
        saveItem,
        deleteItem
    };
}