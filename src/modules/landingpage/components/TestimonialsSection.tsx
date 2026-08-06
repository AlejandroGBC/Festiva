'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Testimonial } from '../types/landing.types';

export default function TestimonialsSection({ testimonials }: { testimonials?: Testimonial[] }) {
    return (
        <section className="w-full py-12 px-4 flex flex-col items-center bg-[#1D1B48] text-white">
            <h2 className="text-xl font-bold mb-8 text-center text-white">
                Historias Festiva
            </h2>

            <div className="w-full max-w-sm flex flex-col gap-4">
                {testimonials?.map((item) => (
                    <div
                        key={item.id}
                        className="p-6 bg-[#2D2A6C] rounded-[28px] border-none shadow-xl flex flex-col gap-4 text-white"
                    >
                        <div className="flex items-center gap-4">
                            
                            <div className="size-12 rounded-full p-[2px] bg-gradient-to-tr from-festiva-euphoric-pink to-festiva-electric-violet shrink-0">
                                <Image
                                    src={item.avatar}
                                    alt={item.author}
                                    width={48}
                                    height={48}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <h3 className="text-base font-bold text-white leading-tight">
                                    {item.author}
                                </h3>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <Star
                                            key={index}
                                            className={`size-3.5 ${
                                                index < item.rating
                                                    ? 'text-amber-400 fill-amber-400'
                                                    : 'text-zinc-500'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className="text-sm italic text-zinc-200 leading-relaxed">
                            &ldquo;{item.comment}&rdquo;
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}