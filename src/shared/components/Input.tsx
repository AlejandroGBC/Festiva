import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
}

export default function Input({ label, icon: Icon, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-[11px] font-bold text-festiva-midnight-blue tracking-wider uppercase">
        {label}
      </label>
      
      <div className="flex items-center gap-3 px-4 h-12 rounded-[16px] bg-festiva-monochromatic border border-slate-100 focus-within:border-slate-200 focus-within:border-festiva-electric-violet/30 focus-within:bg-white transition-all duration-200">
        {Icon && (
          <div className="flex items-center justify-center text-slate-400 shrink-0 pointer-events-none">
            <Icon className="w-4 h-4 stroke-[2]" />
          </div>
        )}
        <input 
          className="w-full h-full bg-transparent text-sm font-medium text-festiva-midnight-blue placeholder-slate-400 focus:outline-none" 
          {...props} 
        />
      </div>
    </div>
  );
}