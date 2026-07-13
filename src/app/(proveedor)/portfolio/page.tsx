import React from 'react';
import PortfolioView from '@/modules/proveedor/pages/PortfolioView';
import Navbar from '@/shared/components/Navbar';

export const metadata = {
    title: 'Mi Portafolio - Festiva Provider',
    description: 'Gestiona tu escaparate profesional y destaca ante los clientes.',
};

export default function PortfolioPage() {
    return (
        <main>
            <PortfolioView />
            <Navbar/>
        </main>
    )
}