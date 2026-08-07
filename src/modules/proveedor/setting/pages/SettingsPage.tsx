'use client';
import React from 'react';
import { 
  User, Shield, Phone, CreditCard, Percent, BarChart3, 
  Bell, Mail, MessageSquare, Lock, FileText, LogOut, Trash2 
} from 'lucide-react';
import TopNavbar from '@/shared/components/TopNavbar'
import { useSettings } from '../hooks/useSettings';
import ConfigSection from '../components/ConfigSection';
import ConfigRow from '../components/ConfigRow';
import Toggle from '@/shared/components/Toggle';
import Chip from '@/shared/components/Chip';
import { Check } from 'lucide-react';
import Loading from "@/shared/components/Loading";

export default function SettingPage() {
    const { settings, loading, toggleSetting } = useSettings();

    if (loading || !settings) {
        return <Loading fullScreen label="Cargando configuración de Festiva..." />;
    }

    return (
        <>
            <TopNavbar title="Configuración"/>
            <div className="flex-1 overflow-y-auto no-scrollbar w-full px-5 pt-10 pb-5 flex flex-col gap-[18px]">
                {/* Sección Cuenta */}
                <ConfigSection label="Cuenta">
                    <ConfigRow
                        icon={User} 
                        iconBg="bg-festiva-electric-violet/10" 
                        iconColor="text-festiva-electric-violet"
                        title="Información personal" 
                        subtitle="Nombre, correo, teléfono"
                    />
                    <ConfigRow
                        icon={Shield} 
                        iconBg="bg-festiva-mint-neon/10" 
                        iconColor="text-festiva-mint-neon"
                        title="Seguridad y contraseña" 
                        subtitle="Última actualización hace 3 meses"
                    />
                    <ConfigRow
                        icon={Phone} 
                        iconBg="bg-festiva-confetti-orange/10" 
                        iconColor="text-festiva-confetti-orange"
                        title="Verificación de identidad" 
                        subtitle="Cuenta verificada"
                        rightElement={<Chip variant="mint-neon" icon={Check}>Activo</Chip>}
                    />
                </ConfigSection>

                {/* Sección Pagos */}
                <ConfigSection label="Pagos y facturación">
                    <ConfigRow
                        icon={CreditCard} 
                        iconBg="bg-festiva-euphoric-pink/10" 
                        iconColor="text-festiva-euphoric-pink"
                        title="Cuenta bancaria" 
                        subtitle="BBVA •••• 4821"
                    />
                    <ConfigRow
                        icon={Percent} 
                        iconBg="bg-slate-100" 
                        iconColor="text-festiva-midnight-blue"
                        title="Comisiones Festiva" 
                        subtitle="7% por transacción completada"
                    />
                    <ConfigRow
                        icon={BarChart3} 
                        iconBg="bg-festiva-mint-neon/10" 
                        iconColor="text-festiva-mint-neon"
                        title="Historial de pagos" 
                        subtitle="Ver facturas y recibos"
                    />
                </ConfigSection>

                {/* Sección Notificaciones */}
                <ConfigSection label="Notificaciones">
                    <ConfigRow 
                        icon={Bell} 
                        iconBg="bg-festiva-electric-violet/10" 
                        iconColor="text-festiva-electric-violet"
                        title="Notificaciones push" 
                        subtitle="Nuevos eventos y mensajes"
                        rightElement={
                            <Toggle isOn={settings.pushNotifications} onToggle={() => toggleSetting('pushNotifications')} />
                        }
                    />
                    <ConfigRow 
                        icon={Mail} 
                        iconBg="bg-festiva-confetti-orange/10" 
                        iconColor="text-festiva-confetti-orange"
                        title="Correo electrónico" 
                        subtitle="Resumen semanal y alertas"
                        rightElement={
                            <Toggle isOn={settings.emailNotifications} onToggle={() => toggleSetting('emailNotifications')} />
                        }
                    />
                    <ConfigRow 
                        icon={MessageSquare} 
                        iconBg="bg-festiva-mint-neon/10" 
                        iconColor="text-festiva-mint-neon"
                        title="SMS / WhatsApp" 
                        subtitle="Solo para pagos confirmados"
                        rightElement={
                            <Toggle isOn={settings.whatsappNotifications} onToggle={() => toggleSetting('whatsappNotifications')} />
                        }
                    />
                </ConfigSection>

                {/* Sección Privacidad */}
                <ConfigSection label="Privacidad y datos">
                    <ConfigRow 
                        icon={Lock} 
                        iconBg="bg-slate-100" 
                        iconColor="text-festiva-midnight-blue"
                        title="Política de privacidad"
                    />
                    <ConfigRow 
                        icon={FileText} 
                        iconBg="bg-slate-100" 
                        iconColor="text-festiva-midnight-blue"
                        title="Términos y condiciones"
                    />
                </ConfigSection>

                {/* Secció: Peligro */}
                <ConfigSection label="Zona de peligro">
                    <ConfigRow 
                        icon={LogOut} 
                        iconBg="bg-festiva-euphoric-pink/10" 
                        iconColor="text-festiva-euphoric-pink"
                        title="Cerrar sesión"
                        isDanger
                    />
                    <ConfigRow 
                        icon={Trash2} 
                        iconBg="bg-festiva-euphoric-pink/10" 
                        iconColor="text-festiva-euphoric-pink"
                        title="Eliminar cuenta" 
                        subtitle="Esta acción es permanente"
                        isDanger
                    />
                </ConfigSection>

                {/* Footer legal */}
                <p className="text-center text-[11px] text-slate-400 font-medium mt-2">
                    Festiva v2.4.1 · © 2026 Festiva Technologies
                </p>
            </div>
        </>
    );
}