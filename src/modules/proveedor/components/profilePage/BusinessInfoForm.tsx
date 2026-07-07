import React from 'react';
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
        <div>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>
                Datos del negocio
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Input 
                    label="Nombre de la empresa" 
                    value={data.businessName} 
                    onChange={(e) => onChange('businessName', e.target.value)}
                    icon={<svg className="ic" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>} 
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
                    icon={<svg className="ic" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>} 
                />
                <Input 
                    label="Telefono de contacto" 
                    type="tel" 
                    value={data.phone} 
                    onChange={(e) => onChange('phone', e.target.value)}
                    icon={<svg className="ic" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>} 
                />
            </div>
        </div>
    );
}