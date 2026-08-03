import { ElementType } from "react";

export interface StatsData {
    events: string;
    providers: string;
    satisfaction: string;
}

export interface Benefit {
    id: string;
    title: string;
    description: string;
    iconBgColor: string;
    icon?: ElementType;
}

export interface HowItWorksStep {
    stepNumber: number;
    title: string;
    description: string;
    colorClass: string;
}

export interface FeaturedProvider {
    id: string;
    name: string;
    verified: boolean;
    rating: number;
    description: string;
    image: string;
}

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

export interface Testimonial {
    id: string;
    author: string;
    rating: number;
    comment: string;
    avatar: string;
}