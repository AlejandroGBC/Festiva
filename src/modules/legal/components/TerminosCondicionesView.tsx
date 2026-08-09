"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

export default function TerminosCondicionesView() {
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
                    Términos y Condiciones
                </span>
            </div>

            {/* Content */}
            <main className="flex-1 overflow-y-auto no-scrollbar px-5 pb-12 pt-6 lg:max-w-2xl lg:mx-auto lg:w-full">

                {/* Badge + intro */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-festiva-electric-violet/10 flex items-center justify-center shrink-0">
                        <FileText size={22} className="text-festiva-electric-violet" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-festiva-electric-violet uppercase tracking-wide">Documento legal</p>
                        <p className="text-[11px] text-festiva-midnight-blue/50 mt-0.5">Última actualización: 1 de agosto de 2026</p>
                    </div>
                </div>

                <div className="rounded-2xl bg-white border border-[#EDEAF8] p-5 mb-4">
                    <p className="text-sm text-festiva-midnight-blue/70 leading-relaxed">
                        Bienvenido/a a <strong className="text-festiva-midnight-blue">Festiva</strong>. Al acceder o utilizar nuestra plataforma
                        —disponible como aplicación web y móvil— aceptas íntegramente los presentes Términos y Condiciones.
                        Si no estás de acuerdo con alguna disposición, te pedimos que te abstengas de usar el servicio.
                    </p>
                </div>

                {/* Sections */}
                <LegalSection number="1" title="Definiciones">
                    <p>Para efectos de estos Términos, se entiende por:</p>
                    <ul>
                        <li><strong>Festiva / Plataforma:</strong> El marketplace digital operado por Festiva Technologies Inc., que conecta a organizadores de eventos con proveedores de servicios.</li>
                        <li><strong>Cliente:</strong> Persona natural o jurídica registrada en la plataforma con el propósito de publicar eventos y recibir propuestas de proveedores.</li>
                        <li><strong>Proveedor:</strong> Persona natural o empresa registrada que ofrece servicios relacionados con la organización y producción de eventos (fotografía, catering, decoración, música, animación, entre otros).</li>
                        <li><strong>Evento:</strong> La solicitud de servicio publicada por un Cliente dentro de la plataforma, especificando tipo de celebración, fecha, ubicación y requerimientos.</li>
                        <li><strong>Propuesta:</strong> La oferta económica y de servicio que un Proveedor envía al Cliente en respuesta a un Evento publicado.</li>
                        <li><strong>Contratación:</strong> El acuerdo entre Cliente y Proveedor cuando se acepta una Propuesta y se confirma el pago dentro de la plataforma.</li>
                    </ul>
                </LegalSection>

                <LegalSection number="2" title="Descripción del Servicio">
                    <p>
                        Festiva opera como una plataforma intermediaria de tipo marketplace que facilita el encuentro entre Clientes que organizan celebraciones y Proveedores que ofrecen servicios para eventos. Festiva <strong>no presta directamente los servicios de evento</strong>; actúa como intermediario tecnológico y administrador de la relación comercial.
                    </p>
                    <p>
                        La plataforma ofrece las siguientes funcionalidades principales:
                    </p>
                    <ul>
                        <li>Publicación de eventos con detalle de tipo, fecha, ubicación y presupuesto.</li>
                        <li>Recepción y comparación de propuestas de múltiples proveedores.</li>
                        <li>Sistema de calificaciones y reseñas verificadas post-evento.</li>
                        <li>Chat integrado para coordinación entre Cliente y Proveedor.</li>
                        <li>Gestión de pagos seguros mediante intermediación de la plataforma.</li>
                        <li>Panel de reportes y estadísticas para Proveedores.</li>
                    </ul>
                </LegalSection>

                <LegalSection number="3" title="Registro y Cuenta de Usuario">
                    <p>
                        Para acceder a las funcionalidades de Festiva es necesario crear una cuenta. El usuario garantiza que:
                    </p>
                    <ul>
                        <li>La información proporcionada durante el registro es veraz, completa y actualizada.</li>
                        <li>Es mayor de 18 años o cuenta con autorización de su representante legal.</li>
                        <li>No creará más de una cuenta personal activa por rol (Cliente o Proveedor) sin autorización previa.</li>
                        <li>Mantendrá la confidencialidad de sus credenciales de acceso y notificará de inmediato a Festiva ante cualquier uso no autorizado.</li>
                    </ul>
                    <p>
                        Festiva se reserva el derecho de suspender o eliminar cuentas que presenten información falsa, comportamiento fraudulento o que infrinjan estos Términos.
                    </p>
                </LegalSection>

                <LegalSection number="4" title="Obligaciones del Cliente">
                    <p>El Cliente se compromete a:</p>
                    <ul>
                        <li>Publicar eventos reales, con información precisa sobre el tipo de celebración, fecha, número de invitados y presupuesto aproximado.</li>
                        <li>No publicar eventos con fines distintos a la contratación de servicios legítimos de eventos.</li>
                        <li>Evaluar honestamente a los Proveedores al finalizar el servicio.</li>
                        <li>Efectuar el pago acordado dentro de los plazos establecidos una vez aceptada la Propuesta.</li>
                        <li>Respetar las condiciones de cancelación pactadas con el Proveedor y aprobadas por Festiva.</li>
                        <li>No solicitar al Proveedor que preste servicios fuera de la plataforma para evadir comisiones.</li>
                    </ul>
                </LegalSection>

                <LegalSection number="5" title="Obligaciones del Proveedor">
                    <p>El Proveedor se compromete a:</p>
                    <ul>
                        <li>Completar su perfil con información verídica sobre sus servicios, portafolio, precios y área de cobertura geográfica.</li>
                        <li>Enviar propuestas claras, detalladas y realizables dentro de su capacidad operativa real.</li>
                        <li>Cumplir estrictamente con los servicios contratados en tiempo, forma y calidad acordada.</li>
                        <li>Mantener comunicación activa con el Cliente durante la preparación y ejecución del evento.</li>
                        <li>No cobrar montos distintos a los acordados en la Propuesta aceptada sin justificación y aprobación del Cliente.</li>
                        <li>Aceptar el proceso de verificación de identidad y capacidad operativa que Festiva establezca.</li>
                        <li>No contactar a Clientes fuera de la plataforma para evadir el cobro de comisiones.</li>
                    </ul>
                </LegalSection>

                <LegalSection number="6" title="Pagos, Comisiones y Facturación">
                    <p>
                        Festiva actúa como intermediario de pago. Al confirmarse una Contratación, el Cliente realiza el pago total o parcial a través de la plataforma, y Festiva lo administra de acuerdo con las siguientes condiciones:
                    </p>
                    <ul>
                        <li><strong>Comisión de Festiva:</strong> Festiva cobra al Proveedor una comisión del <strong>7%</strong> sobre el valor total de cada transacción completada. Dicha comisión se descuenta automáticamente antes de liquidar al Proveedor.</li>
                        <li><strong>Pago al Proveedor:</strong> El desembolso al Proveedor se realiza dentro de los 3 a 5 días hábiles posteriores a la confirmación de que el evento se realizó satisfactoriamente.</li>
                        <li><strong>Anticipo:</strong> En eventos que así lo requieran, Festiva puede gestionar anticipos según lo acordado entre las partes. El anticipo no es reembolsable salvo que el Proveedor incumpla el contrato.</li>
                        <li><strong>Métodos de pago aceptados:</strong> Tarjeta de crédito/débito, transferencias bancarias y métodos digitales habilitados por la plataforma. Festiva no almacena datos de tarjetas; los pagos se procesan a través de proveedores de pago certificados (PCI-DSS).</li>
                    </ul>
                </LegalSection>

                <LegalSection number="7" title="Cancelaciones y Reembolsos">
                    <p>
                        Las políticas de cancelación varían según el tiempo de anticipación y si el incumplimiento es del Cliente o del Proveedor:
                    </p>
                    <ul>
                        <li><strong>Cancelación por el Cliente (más de 30 días antes):</strong> Reembolso del 80% del monto pagado. El 20% restante cubre gastos operativos del Proveedor.</li>
                        <li><strong>Cancelación por el Cliente (entre 15 y 30 días antes):</strong> Reembolso del 50% del monto pagado.</li>
                        <li><strong>Cancelación por el Cliente (menos de 15 días antes):</strong> Sin reembolso, salvo caso fortuito o fuerza mayor debidamente documentado.</li>
                        <li><strong>Cancelación por el Proveedor:</strong> Reembolso completo al Cliente. El Proveedor podrá recibir una penalización y restricciones en su cuenta según la frecuencia y motivo de cancelación.</li>
                        <li><strong>Fuerza mayor:</strong> Festiva evaluará caso por caso eventos fuera del control de las partes (desastres naturales, emergencias nacionales, etc.) para determinar los reembolsos aplicables.</li>
                    </ul>
                </LegalSection>

                <LegalSection number="8" title="Sistema de Calificaciones y Reseñas">
                    <p>
                        Festiva cuenta con un sistema de calificaciones mutuas (Cliente califica al Proveedor y viceversa) para mantener la confianza y calidad del ecosistema. Las reseñas deben ser:
                    </p>
                    <ul>
                        <li>Basadas en la experiencia real de la contratación.</li>
                        <li>Respetuosas y libres de contenido difamatorio, discriminatorio o falso.</li>
                        <li>Publicadas dentro de los 7 días hábiles posteriores al evento.</li>
                    </ul>
                    <p>
                        Festiva se reserva el derecho de eliminar reseñas que infrinjan estas condiciones. Los Proveedores con calificación promedio inferior a 3.0 estrellas podrán ser suspendidos temporalmente hasta mejorar su desempeño.
                    </p>
                </LegalSection>

                <LegalSection number="9" title="Propiedad Intelectual">
                    <p>
                        Todo el contenido de la plataforma —marca, logotipo, diseño, código fuente, textos, imágenes corporativas— es propiedad exclusiva de Festiva Technologies Inc. y está protegido por las leyes de propiedad intelectual aplicables.
                    </p>
                    <p>
                        El usuario conserva los derechos sobre el contenido que suba a la plataforma (fotografías de portafolio, descripciones de servicios), pero otorga a Festiva una licencia no exclusiva, gratuita y mundial para usar, reproducir y mostrar dicho contenido dentro de la plataforma con fines operativos y promocionales.
                    </p>
                </LegalSection>

                <LegalSection number="10" title="Limitación de Responsabilidad">
                    <p>
                        Festiva actúa como intermediario y no garantiza el resultado final de los servicios prestados por los Proveedores. En consecuencia:
                    </p>
                    <ul>
                        <li>Festiva no será responsable por incumplimientos directos del Proveedor hacia el Cliente (salvo dolo o culpa grave imputable a Festiva).</li>
                        <li>La responsabilidad total de Festiva ante cualquier reclamo no superará el monto total pagado por el Cliente en la transacción específica objeto del reclamo.</li>
                        <li>Festiva no responde por daños indirectos, pérdida de ganancias, lucro cesante ni daños consecuentes.</li>
                        <li>Festiva no garantiza la disponibilidad continua e ininterrumpida de la plataforma y no asume responsabilidad por interrupciones técnicas fuera de su control.</li>
                    </ul>
                </LegalSection>

                <LegalSection number="11" title="Resolución de Disputas">
                    <p>
                        Ante cualquier conflicto entre Cliente y Proveedor derivado de una contratación en la plataforma, Festiva ofrece un proceso de mediación interna:
                    </p>
                    <ul>
                        <li>Cualquier parte puede abrir un caso de disputa desde la plataforma dentro de los 7 días hábiles posteriores al evento.</li>
                        <li>El equipo de Festiva revisará la evidencia presentada por ambas partes (mensajes, fotos, acuerdos) en un plazo máximo de 10 días hábiles.</li>
                        <li>La resolución de Festiva es vinculante en cuanto a la distribución de los fondos retenidos en la plataforma.</li>
                        <li>Si alguna de las partes no acepta la resolución, podrá recurrir a los tribunales competentes del domicilio legal de Festiva Technologies Inc.</li>
                    </ul>
                </LegalSection>

                <LegalSection number="12" title="Modificaciones a los Términos">
                    <p>
                        Festiva podrá actualizar estos Términos en cualquier momento. Los cambios significativos serán notificados a los usuarios por correo electrónico o mediante aviso prominente dentro de la plataforma con al menos <strong>15 días de anticipación</strong>. El uso continuado de la plataforma tras la vigencia de los nuevos Términos implica la aceptación de los mismos.
                    </p>
                </LegalSection>

                <LegalSection number="13" title="Legislación Aplicable">
                    <p>
                        Estos Términos y Condiciones se rigen por las leyes de la <strong>República de Honduras</strong>, incluyendo el Código de Comercio, Ley del Consumidor y demás normativas aplicables a plataformas digitales de marketplace. Cualquier controversia que no pueda resolverse mediante mediación interna será sometida a la jurisdicción de los tribunales competentes de Tegucigalpa, Honduras.
                    </p>
                </LegalSection>

                <LegalSection number="14" title="Contacto">
                    <p>Para consultas relacionadas con estos Términos y Condiciones, puedes comunicarte con nosotros a través de:</p>
                    <ul>
                        <li><strong>Correo:</strong> legal@festiva.hn</li>
                        <li><strong>Dirección:</strong> Tegucigalpa, Honduras</li>
                    </ul>
                </LegalSection>

                <div className="mt-6 rounded-2xl bg-festiva-electric-violet/5 border border-festiva-electric-violet/15 p-4 text-center">
                    <p className="text-xs text-festiva-midnight-blue/60 leading-relaxed">
                        ¿Tienes preguntas? Consulta también nuestra{" "}
                        <Link href="/legal/privacidad" className="text-festiva-electric-violet font-semibold underline underline-offset-2">
                            Política de Privacidad
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

/* ─── Helper: Sección legal ─── */
function LegalSection({
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
                <span className="w-6 h-6 rounded-full bg-festiva-electric-violet text-white text-[11px] font-bold flex items-center justify-center shrink-0">
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
