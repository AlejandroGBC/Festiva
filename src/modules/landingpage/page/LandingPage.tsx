'use client';

import React from 'react';
import { useLandingPage } from '../hooks/useLandingPage';

import HeaderLanding from '../components/HeaderLanding';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import BenefitsSection from '../components/BenefitsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TopProvidersSection from '../components/TopProvidersSection';
import CTASection from '../components/CTASection';
import FaqSection from '../components/FaqSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FooterLanding from '../components/FooterLanding';

import Loading from '@/shared/components/Loading';

export default function LandingPage() {
    const {
        loading,
        celebrationType,
        setCelebrationType,
        location,
        setLocation,
        handleStartSearch,
        stats,
        benefits,
        steps,
        topProviders,
        testimonials,
        faqs,
    } = useLandingPage();

    if (loading) {
        return <Loading fullScreen label="Cargando experiencia Festiva..." />;
    }

    return (
        <div className="flex-1 overflow-y-auto no-scrollbar w-full flex flex-col">
            <HeaderLanding />

            <main className="w-full max-w-md flex flex-col items-center">
                <HeroSection
                    celebrationType={celebrationType}
                    setCelebrationType={setCelebrationType}
                    location={location}
                    setLocation={setLocation}
                    onStart={handleStartSearch}
                />

                <StatsSection stats={stats} />

                <BenefitsSection benefits={benefits} />

                <HowItWorksSection steps={steps} />

                <TopProvidersSection providers={topProviders} />

                <FaqSection faqs={faqs} />

                <CTASection
                    onPublishEvent={handleStartSearch}
                    onBecomeProvider={() => {
                    }}
                />
                <TestimonialsSection testimonials={testimonials} />
            </main>

            <FooterLanding />
        </div>
    );
}