import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Card from '@/shared/components/Card';
import Chip, { BrandVariant } from '@/shared/components/Chip';
import Button from '@/shared/components/Button';
import SectionTitle from '@/shared/components/SectionTitle';

interface SpecialtiesSectionProps {
    initialSpecialties: string[];
    onChange?: (specialties: string[]) => void;
}

interface SpecialtyObject {
    id: string;
    name: string;
    variant: BrandVariant;
}

export default function SpecialtiesSection({ initialSpecialties, onChange }: SpecialtiesSectionProps) {
    const brandVariants: BrandVariant[] = ['euphoric-pink', 'electric-violet', 'confetti-orange', 'mint-neon'];

    const [specialties, setSpecialties] = useState<SpecialtyObject[]>(
        initialSpecialties.map((spec, idx) => ({
            id: `${spec}-${idx}`,
            name: spec,
            variant: brandVariants[idx % brandVariants.length]
        }))
    );

    const [isEditing, setIsEditing] = useState(false);

    const notifyParent = (updatedList: SpecialtyObject[]) => {
        if (onChange) {
            onChange(updatedList.map(item => item.name));
        }
    };

    const handleDelete = (id: string) => {
        const filtered = specialties.filter(item => item.id !== id);
        setSpecialties(filtered);
        notifyParent(filtered);
    };

    const handleCycleIcon = (id: string) => {
        if (!isEditing) return;
        
        setSpecialties(specialties.map(item => {
            if (item.id === id) {
                const currentIndex = brandVariants.indexOf(item.variant);
                const nextIndex = (currentIndex + 1) % brandVariants.length;
                return { ...item, variant: brandVariants[nextIndex] };
            }
            return item;
        }));
    };

    const handleNameChange = (id: string, newName: string) => {
        const updated = specialties.map(item => 
            item.id === id ? { ...item, name: newName } : item
        );
        setSpecialties(updated);
        notifyParent(updated);
    };

    const handleAdd = () => {
        const nextVariant = brandVariants[specialties.length % brandVariants.length];
        const newSpec: SpecialtyObject = {
            id: `new-${Date.now()}`,
            name: 'Nueva Especialidad',
            variant: nextVariant
        };
        const updated = [...specialties, newSpec];
        setSpecialties(updated);
        notifyParent(updated);
        setIsEditing(true);
    };

    return (
        <Card>
            <SectionTitle 
                title="Especialidades"
                actionLabel={isEditing ? 'Guardar' : 'Editar'}
                onActionClick={() => setIsEditing(!isEditing)}
            />
            <div className="flex flex-wrap gap-2 items-center">
                {specialties.map((spec) => (
                    <Chip 
                        key={spec.id} 
                        variant={spec.variant}
                        onDelete={isEditing ? () => handleDelete(spec.id) : undefined}
                        onClickIcon={isEditing ? () => handleCycleIcon(spec.id) : undefined}
                    >
                        {isEditing ? (
                            <input
                                type="text"
                                value={spec.name}
                                onChange={(e) => handleNameChange(spec.id, e.target.value)}
                                className="bg-transparent border-none outline-none p-0 m-0 w-auto font-bold focus:ring-0 inline-block"
                                style={{ width: `${Math.max(spec.name.length * 8.5, 40)}px` }}
                            />
                        ) : (
                            spec.name
                        )}
                    </Chip>
                ))}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAdd}
                    className="h-[32px] px-3 border-dashed border-slate-300 text-slate-500 font-medium text-[12px] gap-1 hover:bg-slate-50 rounded-full w-auto"
                >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Agregar</span>
                </Button>
            </div>
        </Card>
    );
}