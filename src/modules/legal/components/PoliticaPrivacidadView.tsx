"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export default function PoliticaPrivacidadView() {
    const router = useRouter();

    return (
        <div className="min-h-dvh bg-[#F5F2FA] flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#F5F2FA]/90 backdrop-blur-sm border-b border-[#EDEAF8] px-4 py-3 flex items-center gap-3 shrink-0">
                <button
                    onClick={() => router.back()}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white transition-colors text-festiva-midnight-blue"
                    aria-label="Volver"
                >
                    <ArrowLeft size={20} strokeWidth={2.5} />
                </button>
                <span className="text-[17px] font-bold text-festiva-midnight-blue">
                    Política de Privacidad
                </span>
            </div>

            {/* Content */}
            <main className="flex-1 overflow-y-auto no-scrollbar px-5 pb-12 pt-6 lg:max-w-2xl lg:mx-auto lg:w-full">

                {/* Badge + intro */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-festiva-mint-neon/15 flex items-center justify-center shrink-0">
                        <Shield size={22} className="text-festiva-mint-neon" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-festiva-mint-neon uppercase tracking-wide">Tu privacidad importa</p>
                        <p className="text-[11px] text-festiva-midnight-blue/50 mt-0.5">Última actualización: 1 de agosto de 2026</p>
                    </div>
                </div>

                <div className="rounded-2xl bg-white border border-[#EDEAF8] p-5 mb-4">
                    <p className="text-sm text-festiva-midnight-blue/70 leading-relaxed">
                        En <strong className="text-festiva-midnight-blue">Festiva Technologies Inc.</strong> nos tomamos muy en serio la
                        protección de tus datos personales. Esta Política de Privacidad explica qué información recopilamos,
                        cómo la usamos, con quién la compartimos y qué derechos tienes sobre ella. Al usar Festiva, aceptas
                        los términos de esta Política.
                    </p>
                </div>

                <PrivacySection number="1" title="Responsable del Tratamiento de Datos">
                    <p>
                        El responsable del tratamiento de los datos personales recopilados a través de la plataforma Festiva es:
                    </p>
                    <ul>
                        <li><strong>Razón social:</strong> Festiva Technologies Inc.</li>
                        <li><strong>Domicilio:</strong> Tegucigalpa, Honduras</li>
                        <li><strong>Correo de privacidad:</strong> privacidad@festiva.hn</li>
                    </ul>
                    <p>
                        Festiva actúa conforme a la normativa hondureña de protección de datos personales y estándares internacionales de privacidad.
                    </p>
                </PrivacySection>

                <PrivacySection number="2" title="Datos que Recopilamos">
                    <p>Dependiendo de tu rol en la plataforma (Cliente o Proveedor), recopilamos los siguientes tipos de datos:</p>

                    <p className="font-semibold text-festiva-midnight-blue mt-2">2.1 Datos de registro y perfil</p>
                    <ul>
                        <li>Nombre completo o nombre comercial</li>
                        <li>Correo electrónico</li>
                        <li>Número de teléfono</li>
                        <li>Contraseña (almacenada de forma encriptada, nunca en texto plano)</li>
                        <li>Fotografía de perfil (opcional)</li>
                        <li>Para Proveedores: información comercial, RTN/NIT, área de cobertura, categoría de servicio y portafolio</li>
                    </ul>

                    <p className="font-semibold text-festiva-midnight-blue mt-2">2.2 Datos de actividad en la plataforma</p>
                    <ul>
                        <li>Eventos publicados por Clientes (tipo, fecha, ubicación, presupuesto)</li>
                        <li>Propuestas enviadas y recibidas</li>
                        <li>Mensajes del chat interno (entre Cliente y Proveedor)</li>
                        <li>Calificaciones y reseñas publicadas</li>
                        <li>Historial de contrataciones y pagos</li>
                    </ul>

                    <p className="font-semibold text-festiva-midnight-blue mt-2">2.3 Datos técnicos y de dispositivo</p>
                    <ul>
                        <li>Dirección IP</li>
                        <li>Tipo de dispositivo, sistema operativo y navegador</li>
                        <li>Token de notificaciones push (si el usuario otorga permiso)</li>
                        <li>Datos de sesión y cookies de autenticación</li>
                        <li>Logs de errores y trazas de uso para mejora del servicio</li>
                    </ul>

                    <p className="font-semibold text-festiva-midnight-blue mt-2">2.4 Datos de pago</p>
                    <ul>
                        <li>Festiva <strong>no almacena</strong> datos de tarjetas bancarias. Los pagos son procesados por proveedores de pago certificados (PCI-DSS). Solo conservamos información de referencia de la transacción (monto, fecha, estado).</li>
                        <li>Para Proveedores: datos de cuenta bancaria para liquidación de pagos, tratados con medidas de seguridad reforzadas.</li>
                    </ul>
                </PrivacySection>

                <PrivacySection number="3" title="Finalidad del Tratamiento de Datos">
                    <p>Utilizamos tus datos personales para las siguientes finalidades:</p>
                    <ul>
                        <li><strong>Prestación del servicio:</strong> Crear y gestionar tu cuenta, facilitar la conexión entre Clientes y Proveedores, procesar pagos y gestionar contrataciones.</li>
                        <li><strong>Comunicaciones del servicio:</strong> Enviarte notificaciones push, correos transaccionales (confirmaciones de pago, nuevas propuestas, mensajes del chat) y alertas de seguridad.</li>
                        <li><strong>Mejora de la plataforma:</strong> Analizar patrones de uso, detectar errores y desarrollar nuevas funcionalidades.</li>
                        <li><strong>Seguridad y prevención de fraude:</strong> Verificar identidades, detectar actividades sospechosas y proteger la integridad del ecosistema.</li>
                        <li><strong>Cumplimiento legal:</strong> Cumplir con obligaciones legales, fiscales y regulatorias aplicables.</li>
                        <li><strong>Comunicaciones comerciales:</strong> Con tu consentimiento previo, enviarte información sobre nuevas funciones, promociones o eventos relevantes para ti.</li>
                    </ul>
                </PrivacySection>

                <PrivacySection number="4" title="Base Legal del Tratamiento">
                    <p>El tratamiento de tus datos se fundamenta en:</p>
                    <ul>
                        <li><strong>Ejecución del contrato:</strong> Necesario para prestarte el servicio que solicitaste al registrarte en Festiva.</li>
                        <li><strong>Consentimiento:</strong> Para finalidades opcionales como notificaciones push y comunicaciones de marketing.</li>
                        <li><strong>Interés legítimo:</strong> Para seguridad, prevención de fraude y mejora continua del servicio.</li>
                        <li><strong>Obligación legal:</strong> Cuando la ley nos requiere conservar o revelar información.</li>
                    </ul>
                </PrivacySection>

                <PrivacySection number="5" title="Compartición de Datos con Terceros">
                    <p>
                        Festiva <strong>no vende ni cede</strong> tus datos personales a terceros con fines comerciales propios. Sin embargo, podemos compartirlos con:
                    </p>
                    <ul>
                        <li><strong>Proveedores de servicios tecnológicos:</strong> Plataformas de hosting, bases de datos, procesadores de pago y servicios de notificaciones. Todos bajo acuerdos de confidencialidad y procesamiento de datos.</li>
                        <li><strong>Autoridades competentes:</strong> Cuando sea legalmente requerido por orden judicial, autoridad regulatoria o para prevenir actividades ilícitas.</li>
                        <li><strong>Entre usuarios de la plataforma:</strong> Para facilitar la comunicación, los datos básicos de perfil (nombre, foto, calificación) de un Proveedor son visibles para los Clientes y viceversa dentro del contexto de una contratación.</li>
                    </ul>
                </PrivacySection>

                <PrivacySection number="6" title="Almacenamiento y Seguridad de los Datos">
                    <p>
                        Los datos de Festiva son almacenados en servidores con las siguientes medidas de seguridad:
                    </p>
                    <ul>
                        <li>Cifrado en tránsito mediante TLS/HTTPS en todas las comunicaciones.</li>
                        <li>Cifrado en reposo para datos sensibles (contraseñas, datos bancarios de Proveedores).</li>
                        <li>Acceso restringido a los datos únicamente para el personal autorizado de Festiva.</li>
                        <li>Monitoreo continuo de accesos y alertas de seguridad.</li>
                        <li>Copias de seguridad periódicas con retención controlada.</li>
                    </ul>
                    <p>
                        Conservamos tus datos durante el tiempo que mantengas tu cuenta activa y por el periodo adicional requerido por obligaciones legales o fiscales (generalmente 5 años tras la última actividad).
                    </p>
                </PrivacySection>

                <PrivacySection number="7" title="Cookies y Tecnologías de Seguimiento">
                    <p>
                        Festiva utiliza cookies y tecnologías similares para:
                    </p>
                    <ul>
                        <li><strong>Cookies esenciales:</strong> Gestión de sesión autenticada. Necesarias para el funcionamiento básico de la plataforma y no pueden desactivarse.</li>
                        <li><strong>Cookies de análisis:</strong> Estadísticas de uso anónimas para comprender cómo se usa la plataforma y mejorar la experiencia.</li>
                        <li><strong>Almacenamiento local del dispositivo:</strong> Preferencias de la aplicación (como configuración de notificaciones) guardadas localmente en tu dispositivo.</li>
                    </ul>
                    <p>
                        Puedes gestionar tus preferencias de cookies desde la configuración de tu navegador o dispositivo. La desactivación de cookies esenciales puede afectar el funcionamiento de la plataforma.
                    </p>
                </PrivacySection>

                <PrivacySection number="8" title="Tus Derechos sobre tus Datos">
                    <p>
                        Como usuario de Festiva, tienes los siguientes derechos respecto a tus datos personales:
                    </p>
                    <ul>
                        <li><strong>Acceso:</strong> Solicitar una copia de los datos personales que tenemos sobre ti.</li>
                        <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos desde tu perfil o mediante solicitud al equipo de Festiva.</li>
                        <li><strong>Cancelación/Eliminación:</strong> Solicitar la eliminación de tu cuenta y datos personales, sujeto a obligaciones legales de retención.</li>
                        <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos para finalidades de marketing o interés legítimo en circunstancias específicas.</li>
                        <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado y de uso común para transferirlos a otro servicio.</li>
                        <li><strong>Retirada del consentimiento:</strong> Revocar en cualquier momento el consentimiento otorgado para finalidades opcionales (como notificaciones push o correos de marketing), sin que esto afecte el tratamiento previo.</li>
                    </ul>
                    <p>
                        Para ejercer cualquiera de estos derechos, escríbenos a <strong>privacidad@festiva.hn</strong>. Responderemos en un plazo máximo de 15 días hábiles.
                    </p>
                </PrivacySection>

                <PrivacySection number="9" title="Privacidad de Menores de Edad">
                    <p>
                        La plataforma Festiva no está dirigida a personas menores de 18 años. No recopilamos conscientemente datos de menores de edad. Si como padre, madre o tutor tienes conocimiento de que un menor ha proporcionado datos en nuestra plataforma, comunícate con nosotros a <strong>privacidad@festiva.hn</strong> para proceder a su eliminación inmediata.
                    </p>
                </PrivacySection>

                <PrivacySection number="10" title="Notificaciones Push">
                    <p>
                        Si otorgas permiso para recibir notificaciones push, Festiva las usará exclusivamente para enviarte información relevante sobre:
                    </p>
                    <ul>
                        <li>Nuevas propuestas recibidas (Clientes)</li>
                        <li>Confirmaciones y actualizaciones de eventos contratados</li>
                        <li>Nuevos mensajes de chat</li>
                        <li>Pagos procesados o pendientes</li>
                        <li>Alertas de seguridad de tu cuenta</li>
                    </ul>
                    <p>
                        Puedes desactivar las notificaciones push en cualquier momento desde la sección <strong>Configuración</strong> dentro de la aplicación o desde los ajustes de tu dispositivo.
                    </p>
                </PrivacySection>

                <PrivacySection number="11" title="Cambios en esta Política">
                    <p>
                        Festiva puede actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas, nuevas funcionalidades o requisitos legales. Te notificaremos los cambios relevantes por correo electrónico o mediante aviso en la plataforma. La fecha de la última actualización siempre estará visible al inicio de este documento.
                    </p>
                </PrivacySection>

                <PrivacySection number="12" title="Contacto y Reclamos">
                    <p>Para consultas, solicitudes o reclamos relacionados con el tratamiento de tus datos personales:</p>
                    <ul>
                        <li><strong>Correo:</strong> privacidad@festiva.hn</li>
                        <li><strong>Dirección:</strong> Tegucigalpa, Honduras</li>
                        <li><strong>Chat de soporte:</strong> Disponible dentro de la plataforma Festiva</li>
                    </ul>
                    <p>
                        Si no obtienes una respuesta satisfactoria, tienes derecho a presentar un reclamo ante la autoridad reguladora competente en Honduras.
                    </p>
                </PrivacySection>

                <div className="mt-6 rounded-2xl bg-festiva-mint-neon/10 border border-festiva-mint-neon/20 p-4 text-center">
                    <p className="text-xs text-festiva-midnight-blue/60 leading-relaxed">
                        ¿Quieres conocer las condiciones de uso de la plataforma? Consulta nuestros{" "}
                        <Link href="/legal/terminos" className="text-festiva-electric-violet font-semibold underline underline-offset-2">
                            Términos y Condiciones
                        </Link>
                        .
                    </p>
                    <p className="text-[11px] text-festiva-midnight-blue/40 mt-2">
                        © 2026 Festiva Technologies Inc. — Todos los derechos reservados.
                    </p>
                </div>
            </main>
        </div>
    );
}

/* ─── Helper: Sección de privacidad ─── */
function PrivacySection({
    number,
    title,
    children,
}: {
    number: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl bg-white border border-[#EDEAF8] p-5 mb-4">
            <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-festiva-mint-neon text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    {number}
                </span>
                <h2 className="text-sm font-bold text-festiva-midnight-blue">{title}</h2>
            </div>
            <div className="text-sm text-festiva-midnight-blue/70 leading-relaxed space-y-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-1.5 [&_strong]:text-festiva-midnight-blue">
                {children}
            </div>
        </div>
    );
}
