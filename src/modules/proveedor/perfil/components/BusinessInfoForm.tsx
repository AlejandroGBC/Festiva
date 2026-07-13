import React from 'react';
import { Building2, MapPin, Phone } from 'lucide-react';
import Card from '../../../../shared/components/Card';
import Input from '../../../../shared/components/Input';
import Textarea from '../../../../shared/components/Textarea';

interface BusinessInfoData {
    businessName: string;
    description: string;
    city: string;
    phone: string;
}

interface BusinessInfoFormProps {
    data: BusinessInfoData;
    onChange: (field: keyof BusinessInfoData, value: string) => void;
}

export default function BusinessInfoForm({ data, onChange }: BusinessInfoFormProps) {
    return (
        <Card className="flex flex-col gap-4">
            <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Datos del negocio
            </p>
            <div className="flex flex-col gap-4">
                <Input 
                    label="Nombre de la empresa" 
                    value={data.businessName} 
                    onChange={(e) => onChange('businessName', e.target.value)}
                    icon={<Building2 className="w-4 h-4 text-slate-400 stroke-[1.8]" />}
                    variant={'muted'}
                />
                <Textarea 
                    label="Descripcion profesional" 
                    value={data.description} 
                    onChange={(e) => onChange('description', e.target.value)}
                />
                <Input 
                    label="Ciudad principal" 
                    value={data.city} 
                    onChange={(e) => onChange('city', e.target.value)}
                    icon={<MapPin className="w-4 h-4 text-slate-400 stroke-[1.8]" />} 
                    variant={'muted'}
                />
                <Input 
                    label="Telefono de contacto" 
                    type="tel" 
                    value={data.phone} 
                    onChange={(e) => onChange('phone', e.target.value)}
                    icon={<Phone className="w-4 h-4 text-slate-400 stroke-[1.8]" />}
                    variant={'muted'}
                />
            </div>
        </Card>
    );
}