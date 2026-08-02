'use client';

import React from 'react';
import Card from '@/shared/components/Card';
import { Benefit } from '../types/landing.types';


export default function BenefitsSection({ benefits }: { benefits?: Benefit[] }) {
    return (
        <section className="w-full py-12 px-4 flex flex-col items-center gap-6">
            <h2 className="text-lg font-bold text-festiva-midnight-blue text-center">
                Tu tranquilidad es nuestra prioridad
            </h2>
            <div className="w-full max-w-sm flex flex-col gap-4">
                {benefits?.map((item) => {

                    const Icon = item.icon;
                    
                    return(

                        <Card
                            key={item.id}
                            className="p-6 bg-white rounded-3xl shadow-[0px_10px_30px_0px_rgba(38,30,78,0.08)] flex gap-4 items-start"
                        >
                            <div className={`p-3 ${item.iconBgColor} rounded-2xl flex items-center justify-center`}>
                                {Icon && <Icon className="size-6" />}
                            </div>
                            
                            <div>
                                <h3 className="text-base font-bold text-festiva-midnight-blue">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-zinc-700 mt-1 leading-snug">
                                    {item.description}
                                </p>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}