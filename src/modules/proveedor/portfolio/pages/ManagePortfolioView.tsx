'use client';

import React, { useState } from 'react';
import { 
    Type, MapPin, AlignLeft, Link2, 
} from 'lucide-react';
import TopNavbar from '@/shared/components/TopNavbar'
import PortfolioUploadGrid from '../components/PortfolioUploadGrid';
import CaseListCard from '../components/CaseListCard';
import Card from '@/shared/components/Card';
import Input from '@/shared/components/Input';
import SectionTitle from '@/shared/components/SectionTitle';
import Button from '@/shared/components/Button'
import { usePortfolio } from '../hooks/usePortfolio';
import Loading from "@/shared/components/Loading";
import { Navbar } from '@/shared/components/Navbar';

interface PortfolioForm {
    title: string;
    description: string;
    location: string;
    externalUrl: string;
}

export default function ManagePortfolioView() {
    const { 
        data, 
        loading, 
        addGalleryItem, 
        deleteGalleryItem, 
        createSuccessCase, 
        deleteSuccessCase 
    } = usePortfolio();
    
    const [activeSection, setActiveSection] = useState<'multimedia' | 'casos'>('multimedia');

    const [form, setForm] = useState<PortfolioForm>({
        title: '',
        description: '',
        location: '',
        externalUrl: '',
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name as keyof PortfolioForm]: value }));
    };

    const handleUploadSample = () => {
        const samplePool = [
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600",
            "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600",
            "https://images.unsplash.com/photo-1520854221256-17451cc35953?q=80&w=600",
            "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600"
        ];
        const randomUrl = samplePool[Math.floor(Math.random() * samplePool.length)];
        addGalleryItem(randomUrl);
    };

    if (loading) {
        return <Loading fullScreen label="Cargando portafolio de Festiva..." />;
    }

    return (
        <>
            <TopNavbar title="Gestionar Portafolio"/>

            <div className="flex-1 overflow-y-auto no-scrollbar w-full px-3 pt-6 pb-36 flex flex-col gap-[18px]">

                    <div className="bg-white p-1 rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] grid grid-cols-2 text-center text-sm font-bold text-slate-400">
                        <button
                            onClick={() => setActiveSection('multimedia')}
                            className={`py-2.5 px-4 rounded-[16px] transition-all cursor-pointer ${activeSection === 'multimedia' ? 'bg-festiva-monochromatic text-festiva-electric-violet shadow-inner' : 'hover:text-slate-500'}`}
                        >
                            Vista previa
                        </button>
                        <button 
                            onClick={() => setActiveSection('casos')}
                            className={`py-2.5 px-4 rounded-[16px] transition-all cursor-pointer ${activeSection === 'casos' ? 'bg-festiva-monochromatic text-festiva-electric-violet shadow-inner' : 'hover:text-slate-500'}`}
                        >
                            Mis Casos de Éxito
                        </button>
                    </div>

                    {activeSection === 'casos' && (
                        <Card className="flex flex-col gap-6 p-6 mb-3">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                    Datos del Proyecto
                                </h2>
                                <p className="text-xs text-slate-400 font-medium">Completa la información para tu caso de éxito.</p>
                            </div>

                            <Input 
                                label="Título del Proyecto"
                                name="title"
                                value={form.title}
                                onChange={handleFormChange}
                                placeholder="Ej. Boda Real 2026"
                                icon={Type}
                            />

                            <Input
                                label="Descripción Detallada"
                                name="description"
                                value={form.description}
                                onChange={handleFormChange}
                                placeholder="Ej. Gestión completa para 500 invitados..."
                                icon={AlignLeft}
                            />

                            <Input
                                label="Lugar del Evento"
                                name="location"
                                value={form.location}
                                onChange={handleFormChange}
                                placeholder="Ej. Palacio de Cristal, Tegucigalpa"
                                icon={MapPin}
                            />

                            <Input
                                label="Enlace a Reseña o Galería (Opcional)"
                                name="externalUrl"
                                value={form.externalUrl}
                                onChange={handleFormChange}
                                placeholder="https://tupagina.com/proyecto"
                                icon={Link2}
                            />
                            
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                className="w-full mt-2"
                                onClick={async () => {
                                    if (!form.title || !form.description) return;
                                    const success = await createSuccessCase(form);
                                    if (success) {
                                        setForm({ title: '', description: '', location: '', externalUrl: '' });
                                    }
                                }}
                            >
                                Guardar Caso de Éxito
                            </Button>
                        </Card>
                    )}

                    <Card className='mb-3'>
                        <SectionTitle
                            title={activeSection === 'multimedia' ? "Mosaico Multimedia" : "Listado de Proyectos"}
                            actionLabel={activeSection === 'casos' ? 'Volver a Portafolio' : 'Gestionar Casos'}
                            onActionClick={() => setActiveSection(activeSection === 'multimedia' ? 'casos' : 'multimedia')}
                        />

                        {activeSection === 'multimedia' && (
                            <PortfolioUploadGrid 
                                items={data?.gallery || []} 
                                onDelete={deleteGalleryItem} 
                                onAddSample={handleUploadSample} 
                            />
                        )}

                        {activeSection === 'casos' && (
                            <div className="flex flex-col gap-3 mt-2">
                                {data?.successCases && data.successCases.length > 0 ? (
                                    data.successCases.map((c) => (
                                        <CaseListCard
                                            key={c.id}
                                            id={c.id}
                                            title={c.title}
                                            imageUrl={c.imageUrl}
                                            isVerified={c.isVerified}
                                            onDelete={() => deleteSuccessCase(c.id)}
                                        />
                                    ))
                                ) : (
                                    <p className="text-xs text-slate-400 text-center py-4 font-medium">No hay casos de éxito registrados.</p>
                                )}
                            </div>
                        )}
                    </Card>
            </div>
            <Navbar/>
        </>
    );
}