import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";

const inputWrapperVariants = cva(
  "flex items-center gap-3 px-4 h-[54px] rounded-[16px] border border-transparent transition-all duration-200",
  {
    variants: {
      variant: {
        white: "bg-white border-transparent focus-within:border-slate-200",
        muted: "bg-[#f8f9fd] focus-within:border-slate-200 focus-within:bg-white",
        monochromatic: "bg-festiva-monochromatic border border-slate-100 focus-within:border-festiva-electric-violet/30 focus-within:bg-white",
      },
    },
    defaultVariants: {
      variant: "white",
    },
  }
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'icon'>,
    VariantProps<typeof inputWrapperVariants> {
  label: string;
  icon?: React.ComponentType<{ className?: string }> | React.ReactNode;
}

export default function Input({ 
  label, 
  icon: Icon, 
  variant = "white", 
  className, 
  id, 
  ...props 
}: InputProps) {
  
  const renderIcon = () => {
    if (!Icon) return null;
    
    if (typeof Icon === 'function') {
      const LucideIconComponent = Icon as React.ComponentType<{ className?: string }>;
      return <LucideIconComponent className="w-4 h-4 stroke-[2]" />;
    }
    
    return Icon;
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label 
        htmlFor={id} 
        className="text-[11px] font-bold text-festiva-midnight-blue tracking-wider uppercase"
      >
        {label}
      </label>

      <div className={inputWrapperVariants({ variant })}>
        {Icon && (
          <div className="flex items-center justify-center text-slate-400 shrink-0 pointer-events-none">
            {renderIcon()}
          </div>
        )}
        <input
          id={id}
          className={`w-full h-full bg-transparent text-[15px] font-medium text-festiva-midnight-blue placeholder-slate-400 focus:outline-none ${className ?? ""}`}
          {...props}
        />
      </div>
    </div>
  );
}