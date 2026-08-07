import { 
    ShieldCheck, 
    Headset, 
    Sparkles, 
    Shield 
} from 'lucide-react';

import { StatsData, Benefit, HowItWorksStep, FeaturedProvider, FAQItem, Testimonial } from '../types/landing.types';

export const getLandingData = async () => {
    // Simulación de carga desde API
    const stats: StatsData = {
        events: '+15k',
        providers: '+5k',
        satisfaction: '98%',
    };

    const benefits: Benefit[] = [
        { id: '1', title: 'Proveedores Verificados', description: 'Cada profesional en nuestra red pasa por un riguroso proceso de validación.', iconBgColor: 'bg-festiva-mint-neon/20', icon: ShieldCheck },
        { id: '2', title: 'Atención 24/7', description: 'Nuestro equipo está listo para ayudarte en cada paso de tu planificación.', iconBgColor: 'bg-festiva-electric-violet/20',  icon: Headset},
        { id: '3', title: 'IA Festiva', description: 'Inteligencia artificial que entiende tus sueños y los convierte en realidades.', iconBgColor: 'bg-festiva-confetti-orange/20', icon: Sparkles },
        { id: '4', title: 'Pagos Protegidos', description: 'Tu dinero está seguro hasta que el servicio sea entregado satisfactoriamente.', iconBgColor: 'bg-festiva-euphoric-pink/20', icon: Shield },
    ];

    const steps: HowItWorksStep[] = [
        { stepNumber: 1, title: 'Publica tu evento', description: 'Dinos qué necesitas, cuándo y dónde. Es gratis y rápido.', colorClass: 'bg-festiva-electric-violet' },
        { stepNumber: 2, title: 'Recibe propuestas', description: 'Proveedores calificados te enviarán cotizaciones personalizadas.', colorClass: 'bg-festiva-euphoric-pink' },
        { stepNumber: 3, title: 'Compara y reserva', description: 'Revisa perfiles, fotos y reseñas. Elige al mejor con un click.', colorClass: 'bg-festiva-confetti-orange' },
        { stepNumber: 4, title: '¡Celebra!', description: 'Relájate y disfruta. Festiva se encarga de que todo sea perfecto.', colorClass: 'bg-festiva-mint-neon' },
    ];

    const topProviders: FeaturedProvider[] = [
        { id: '1', name: 'Gourmet Fusion Catering', verified: true, rating: 4.9, description: 'Experiencias culinarias únicas para eventos exclusivos.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGlCwfRMMWpxuV1SIji0iow1j06BnEqy_clF-ZNeNFZkZ9Z8y-1RJpSYsWLl0djQph7f0JpHtrHQj-sPhlJCu3TwF069uA9Yt2HR2lo7htClTr61ntP8bm0qvvAE-xxs2Q2sY2DsBbJlU6MYSk9c1aFNdprjn4wyUEa0QmpkLFLlAkv4sugdjoVp3qO_2zPs61LQ2iEidXhulAcvDUKdXaF3oKPvUf1DhI9uA9ADbcgZqEcr0Ylmlz0Sap7lLoZnSyhn-OqUVRKks' },
        { id: '2', name: 'Sound & Light Masters', verified: true, rating: 4.8, description: 'Iluminación robótica y sonido de alta fidelidad para tu fiesta.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANNk8CO2dqIi5A8Hfml1GvKSw0GlVMWHfdIS2-rf4Uyy_ainrHufy7f67SRcrr9g9SpsTC81UzcDKFAsma9kvfeqQIiJtjCpa3WwTx0w072VRGZZXfjFNM9zl7G34R0AhGO8bDe3xF__djsT4sQ8RV-ZlfHFgbGq0vIQh5BLVyXItF9GH2cm7iBlYsaelHYqSm2snFB2DB_fFR6ZyUVBMpRFL7T_SBhL13mGJdEZbch2edc6OD-5_PS-qYSmh7DuGzpFrJGda4K2w' },
    ];

    const faqs: FAQItem[] = [
        { id: '1', question: '¿Tiene algún costo publicar mi evento?', answer: '¡Absolutamente no! Publicar tu evento es 100% gratuito.' },
        { id: '2', question: '¿Cómo sé si el proveedor es confiable?', answer: 'Todos nuestros proveedores pasan por un proceso de verificación previo e incluyen valoraciones reales de otros clientes.' },
    ];

    const testimonials: Testimonial[] = [
        { id: '1', author: 'Mariana R.', rating: 5, comment: 'Organizar el bautizo de mi hijo fue un sueño gracias a Festiva. Recibí 5 propuestas en menos de una hora y el catering fue espectacular.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuNfRz3YJ0FuFQeY1sQu8gqTriWE1fHWBrLT4VyEAZx2TNlBdoIQRaXmGaN3sJIcLmf0Oz2kdXjWvFv41mXbeubN4OPH_pAYfuRqRkXD69k0fdKQGpY_1Jy4M4umlgjFIP5xryrXtrLd8osTOhBLBeZb97fRExKkZRokuMr9ATX5fr8i4ztM87HLNp4IWiQguZR0YBtSoM1zD-CdkDsWxMkGdx2oMXriJhZX7dHLTJGcn-CI9ca_ts8UzAqqaj03hBgBZ8G74ylss' },
        { id: '2', author: 'Carlos M.', rating: 5, comment: 'La seguridad de pagar a través de la plataforma me dio mucha paz mental. Todo salió tal como lo planeamos.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5OKY5FYmdAeg-MLY0YzUP9-XXHeqsR73oqWhYu7s-okXJVpp4cjSroDwlbwXdIgUxAluT5dLPALKYj5FKlGjBqIsNVbNICS7AbbX6_lFmy15JurL8rIzfFZKEbzLVFUBGoOoI8dR40ZEztVugP8xJqNrWqRpU_ag-wobZrHNqRgWVWyEoVpSMxZXcL6ykEcFvRKDidkH221pUrbUBSlj6kUUJHikeGWTPFuTc0f5MXL7XHH8J01Q4AUQdyZmODvZxIjgES5yS9S4' },
    ];

    return { stats, benefits, steps, topProviders, faqs, testimonials };
};