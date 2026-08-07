'use client';

import React, { useState, useRef } from 'react';
import { Type, MapPin, AlignLeft, Link2, Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import TopNavbar from '@/shared/components/TopNavbar';
import PortfolioUploadGrid from '../components/PortfolioUploadGrid';
import CaseListCard from '../components/CaseListCard';
import Card from '@/shared/components/Card';
import Input from '@/shared/components/Input';
import SectionTitle from '@/shared/components/SectionTitle';
import Button from '@/shared/components/Button';
import Loading from '@/shared/components/Loading';
import { usePortfolio } from '../hooks/usePortfolio';
import { PortfolioItem } from '@/shared/types/portfolio.types';
import { uploadPortfolioImage } from '@/shared/services/upload.service';

export default function ManagePortfolioView() {
    const { 
        data, 
        loading, 
        saveItem, 
        deleteItem
    } = usePortfolio();
    
    const [activeSection, setActiveSection] = useState<'multimedia' | 'casos'>('multimedia');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        externalUrl: '',
        imageUrl: ''
    });

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            
            const previewUrl = URL.createObjectURL(file);
            setForm((prev) => ({ ...prev, imageUrl: previewUrl }));
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setSelectedFile(null);
        setForm({ title: '', description: '', location: '', externalUrl: '', imageUrl: '' });
    };

    const handleOpenCreateNew = () => {
        resetForm();
        setActiveSection('casos');
    };

    const handleOpenEdit = (item: PortfolioItem) => {
        setEditingId(item.id);
        setSelectedFile(null);
        setForm({
            title: item.title,
            description: item.description,
            location: item.location,
            externalUrl: item.externalUrl || '',
            imageUrl: item.imageUrl || ''
        });
        setActiveSection('casos');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim()) return;

        try {
            setUploadingImage(true);
            let finalImageUrl = form.imageUrl;

            if (selectedFile) {
                finalImageUrl = await uploadPortfolioImage(selectedFile, 'proveedor');
            }

            const success = await saveItem({
                ...(editingId ? { id: editingId } : {}),
                title: form.title,
                description: form.description,
                location: form.location,
                externalUrl: form.externalUrl,
                imageUrl: finalImageUrl
            });

            if (success) {
                resetForm();
            }
        } catch (error) {
            console.error("Error al procesar el caso de éxito:", error);
        } finally {
            setUploadingImage(false);
        }
    };

    if (loading) {
        return <Loading fullScreen label="Cargando portafolio de Festiva..." />;
    }

    return (
        <>
            <TopNavbar title="Gestionar Portafolio" />

            <div className="flex-1 overflow-y-auto no-scrollbar w-full px-3 pt-6 pb-5 flex flex-col gap-[18px]">
                <div className="bg-white p-1 rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] grid grid-cols-2 text-center text-sm font-bold text-slate-400">
                    <button
                        onClick={() => setActiveSection('multimedia')}
                        className={`py-2.5 px-4 rounded-[16px] transition-all cursor-pointer ${
                            activeSection === 'multimedia'
                                ? 'bg-festiva-monochromatic text-festiva-electric-violet shadow-inner'
                                : 'hover:text-slate-500'
                        }`}
                    >
                        Vista previa
                    </button>

                    <button 
                        onClick={() => setActiveSection('casos')}
                        className={`py-2.5 px-4 rounded-[16px] transition-all cursor-pointer ${
                            activeSection === 'casos'
                                ? 'bg-festiva-monochromatic text-festiva-electric-violet shadow-inner'
                                : 'hover:text-slate-500'
                        }`}
                    >
                        Mis Casos de Éxito
                    </button>
                </div>

                {activeSection === 'casos' && (
                    <Card className="flex flex-col gap-5 p-6 mb-3">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                    {editingId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                                </h2>
                                <p className="text-xs text-slate-400 font-medium">
                                    Completa los detalles para publicar en tu portafolio.
                                </p>
                            </div>
                            {editingId && (
                                <button
                                    onClick={resetForm}
                                    className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1"
                                >
                                    <X className="w-3.5 h-3.5" /> Cancelar
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-600">Imagen del Portafolio</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />

                                {form.imageUrl ? (
                                    <div className="relative w-full h-36 rounded-xl overflow-hidden border border-slate-200">
                                        <Image src={form.imageUrl} alt="Preview" fill className="object-cover" unoptimized />

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedFile(null);
                                                setForm((p) => ({ ...p, imageUrl: '' }));
                                            }}
                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full h-24 border-2 border-dashed border-slate-200 hover:border-festiva-electric-violet rounded-xl flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-festiva-electric-violet transition-colors bg-slate-50 cursor-pointer"
                                    >
                                        <Upload className="w-5 h-5" />
                                        <span className="text-xs font-semibold">Cargar imagen</span>
                                    </button>
                                )}
                            </div>

                            <Button 
                                type="submit" 
                                variant="secondary" 
                                size="sm" 
                                className="w-full mt-2 flex items-center justify-center gap-2"
                                disabled={uploadingImage}
                            >
                                {uploadingImage && <Loader2 className="w-4 h-4 animate-spin" />}
                                {editingId ? 'Actualizar Portafolio' : 'Guardar Caso de Éxito'}
                            </Button>
                        </form>
                    </Card>
                )}

                <Card className='mb-3'>
                    <SectionTitle
                        title={activeSection === 'multimedia' ? 'Mosaico Multimedia' : 'Listado de Proyectos'}
                        actionLabel={activeSection === 'multimedia' ? 'Gestionar Casos' : 'Mis Casos de Éxito'}
                        onActionClick={() => setActiveSection(activeSection === 'multimedia' ? 'casos' : 'casos')}
                    />

                    {activeSection === 'multimedia' && (
                        <PortfolioUploadGrid
                            items={data?.items || []}
                            onDelete={deleteItem}
                            onEdit={handleOpenEdit}
                            onNew={handleOpenCreateNew}
                        />
                    )}

                    {activeSection === 'casos' && (
                        <div className="flex flex-col gap-3 mt-2">
                            {data?.items && data.items.length > 0 ? (
                                data.items.map((c) => (
                                    <CaseListCard
                                        key={c.id}
                                        id={c.id}
                                        title={c.title}
                                        imageUrl={c.imageUrl || ''}
                                        isVerified={!!c.isVerified}
                                        onDelete={() => deleteItem(c.id)}
                                        onEdit={() => handleOpenEdit(c)}
                                    />
                                ))
                            ) : (
                                <p className="text-xs text-slate-400 text-center py-4 font-medium">
                                    No hay casos de éxito registrados.
                                </p>
                            )}
                        </div>
                    )}
                </Card>
            </div>
        </>
    );
}