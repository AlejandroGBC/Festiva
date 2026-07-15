import { useState, useEffect } from 'react';
import { portfolioService, PortfolioData } from '../services/portfolio.service';

export function usePortfolio() {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updating, setUpdating] = useState(false);

    async function loadPortfolio() {
        try {
            setLoading(true);
            const portfolioData = await portfolioService.getProviderPortfolio();
            setData(portfolioData);
        } catch {
            setError('No se pudo cargar el portafolio.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPortfolio();
    }, []);

    const handleAddGalleryItem = async (url: string) => {
        try {
            setUpdating(true);
            const updated = await portfolioService.addGalleryItem(url);
            setData(updated);
        } catch {
            console.error('Error añadiendo imagen al mosaico');
        } finally {
            setUpdating(false);
        }
    };

    const handleDeleteGalleryItem = async (id: string) => {
        const updated = await portfolioService.deleteGalleryItem(id);
        setData(updated);
    };

    const handleCreateSuccessCase = async (caseData: { title: string; description: string; location: string; externalUrl?: string }) => {
        try {
            setUpdating(true);
            const updated = await portfolioService.createSuccessCase(caseData);
            setData(updated);
            return true;
        } catch {
            return false;
        } finally {
            setUpdating(false);
        }
    };

    const handleDeleteSuccessCase = async (id: string) => {
        const updated = await portfolioService.deleteSuccessCase(id);
        setData(updated);
    };

    return { 
        data, 
        loading, 
        error, 
        updating,
        addGalleryItem: handleAddGalleryItem,
        deleteGalleryItem: handleDeleteGalleryItem,
        createSuccessCase: handleCreateSuccessCase,
        deleteSuccessCase: handleDeleteSuccessCase
    };
}