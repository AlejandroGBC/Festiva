'use client';

import React, { useState } from 'react';
import Card from '@/shared/components/Card';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../types/landing.types';

export default function FaqSection({ faqs }: { faqs?: FAQItem[] }) {
    const [openId, setOpenId] = useState<string | null>('1');

    const toggleFaq = (id: string) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section className="w-full py-12 px-4 flex flex-col items-center">
            <h2 className="text-xl font-bold text-festiva-midnight-blue mb-6 text-center">
                Preguntas frecuentes
            </h2>

            <div className="w-full max-w-sm flex flex-col gap-4">
                {faqs?.map((faq) => {
                    const isOpen = openId === faq.id;

                    return (
                        <Card
                            key={faq.id}
                            className="p-6 bg-white rounded-[28px] border-none shadow-[0px_10px_30px_0px_rgba(38,30,78,0.05)] cursor-pointer transition-all duration-200"
                        >
                            
                            <div className="flex justify-between items-center gap-4" onClick={() => toggleFaq(faq.id)}>
                                <h3 className="text-base font-semibold text-festiva-midnight-blue leading-snug">
                                    {faq.question}
                                </h3>

                                <ChevronDown
                                    className={`size-5 text-festiva-midnight-blue shrink-0 transition-transform duration-300 ${
                                        isOpen ? 'rotate-180' : 'rotate-0'
                                    }`}
                                />
                            </div>

                            {/* Contenido desplegable con animación */}
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${
                                    isOpen
                                        ? 'grid-rows-[1fr] opacity-100 mt-4'
                                        : 'grid-rows-[0fr] opacity-0 mt-0'
                                }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="text-sm text-zinc-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}