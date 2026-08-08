"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

export interface FilaConfiguracionProps {
    icon: React.ReactNode;
    iconBg: string;
    titulo: string;
    subtitulo?: string;
    onClick?: () => void;
    rightElement?: React.ReactNode;
}

export default function FilaConfiguracion({
    icon,
    iconBg,
    titulo,
    subtitulo,
    onClick,
    rightElement
}: FilaConfiguracionProps) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3.5 ${
                onClick ? "cursor-pointer hover:bg-[#F9F8FF]" : ""
            } transition-colors`}
            >
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: iconBg }}
            >
                {icon}
            </div>

            <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-festiva-midnight-blue m-0">{titulo}</p>
                    {subtitulo && (
                <p className="text-xs text-festiva-midnight-blue/45 m-0 mt-0.5">{subtitulo}</p>
                )}
            </div>

            {rightElement ? (
                rightElement
            ) : (
                onClick && <ChevronRight size={16} className="text-festiva-midnight-blue/25 shrink-0" />
            )}
        </div>
    );
}