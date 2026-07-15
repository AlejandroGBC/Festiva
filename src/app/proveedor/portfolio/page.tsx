import React from 'react';
import PortfolioView from '@/modules/proveedor/pages/ManagePortfolioView';
import { Navbar } from '@/shared/components/Navbar';

export const metadata = {
    title: 'Festiva - Mi Portafolio',
    description: 'Gestiona tu escaparate profesional y destaca ante los clientes.',
};

export default function Page() {
    return (
        <main className="flex-1 flex flex-col min-h-0 w-full overflow-hidden">
            <PortfolioView />
            <Navbar/>
        </main>
    )
}