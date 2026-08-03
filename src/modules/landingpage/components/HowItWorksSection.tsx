'use client';

import React from 'react';
import { HowItWorksStep } from '../types/landing.types';

export default function HowItWorksSection({ steps }: { steps?: HowItWorksStep[] }) {
    return (
        <section className="w-full py-12 px-4 bg-white flex flex-col items-center">
            <h2 className="text-lg font-bold text-festiva-midnight-blue mb-8 text-center">
                ¿Cómo funciona Festiva?
            </h2>
            <div className="w-full max-w-sm flex flex-col gap-8">
                {steps?.map((step) => (
                    <div key={step.stepNumber} className="flex gap-4 items-start">
                        <div className={`size-12 ${step.colorClass} text-white font-bold text-lg rounded-full flex items-center justify-center shrink-0 shadow-md`}>
                            {step.stepNumber}
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-festiva-midnight-blue">{step.title}</h3>
                            <p className="text-sm text-zinc-700 mt-1 leading-snug">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
  );
}