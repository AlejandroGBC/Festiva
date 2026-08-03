'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/shared/components/Button';
import logoColor from '@/shared/img/logoColor.svg';
import { useAuthContext } from '@/lib/context/auth-context';
import { routeGeneratorOverLogin } from '@/shared/utils/routeGeneratosOverLogin';

export default function HeaderLanding() {
    const router = useRouter();
    const { user } = useAuthContext();

    const handleCTA = () => {
        if (user) {
            // Si ya hay sesión, ir a su panel según su rol
            router.push(routeGeneratorOverLogin(user.rol));
        } else {
            // Si no hay sesión, ir a registrarse o iniciar sesión
            router.push('/auth/registro');
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full h-20 bg-festiva-euphoric-pink/5 backdrop-blur-md shadow-sm flex items-center justify-between px-6">
            <div className="flex items-center justify-center">
                <Image 
                    src={logoColor}
                    alt="Festiva Logo"
                    width={130}
                    height={36}
                    priority
                    className='object-contain'
                />
            </div>
            <Button 
                variant="primary"
                shape="pill"
                className='m-2'
                onClick={handleCTA}
            >
                {user ? 'Ir a mi panel' : 'Publicar evento'}
            </Button>
        </header>
    );
}