'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/context/auth-context';
import { getLandingData } from '../services/landing.service';
import { 
    StatsData,
    Benefit,
    HowItWorksStep,
    FeaturedProvider,
    FAQItem,
    Testimonial
} from '../types/landing.types';

export const useLandingPage = () => {
    const router = useRouter();
    const { user } = useAuthContext();

    const [loading, setLoading] = useState(true);
    const [celebrationType, setCelebrationType] = useState('');
    const [location, setLocation] = useState('');
    const [data, setData] = useState<{
        stats?: StatsData;
        benefits?: Benefit[];
        steps?: HowItWorksStep[];
        topProviders?: FeaturedProvider[];
        faqs?: FAQItem[];
        testimonials?: Testimonial[];
    }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getLandingData();
                setData(res);
            } catch (error) {
                console.error('Error al obtener datos de landing:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleStartSearch = () => {
        if (user) {
            const params = new URLSearchParams();
            if (celebrationType) params.append('celebration', celebrationType);
            if (location) params.append('location', location);

            const queryString = params.toString();
            const targetPath = `/cliente/inicio${queryString ? `?${queryString}` : ''}`;

            router.push(targetPath);

        } else {
            router.push('/auth/login');
        }
    };

    return {
        loading,
        celebrationType,
        setCelebrationType,
        location,
        setLocation,
        handleStartSearch,
        ...data,
    };
};