import React from 'react';
import { LucideIcon } from 'lucide-react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    icon?: LucideIcon;
}

export default function Textarea({ label, icon: Icon, id, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
        <label htmlFor={id} className="text-[11px] font-bold text-festiva-midnight-blue tracking-wider uppercase">
          {label}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute left-4 top-3.5 text-slate-400 pointer-events-none">
                    <Icon className="w-4 h-4 stroke-[2]" />
                </div>
            )}
            <textarea 
              rows={4} 
              {...props}
              className={`w-full bg-festiva-monochromatic text-festiva-midnight-blue text-sm font-medium rounded-xl border border-slate-100 placeholder:text-slate-400/70 focus:outline-none focus:border-festiva-electric-violet/30 focus:bg-white transition-all duration-200 py-3 resize-none leading-relaxed ${
                Icon ? 'pl-11 pr-4' : 'px-4'
              }`}
            />
      </div>
    </div>
  );
}