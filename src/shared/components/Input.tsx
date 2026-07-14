import React from 'react';

import { cva, type VariantProps } from "class-variance-authority";

const inputWrapperVariants = cva(
  "flex items-center gap-3 px-4 h-[54px] rounded-[16px] border border-transparent transition-all duration-200",
  {
    variants: {
      variant: {
        white: "bg-white focus-within:border-slate-200",
        muted: "bg-[#f8f9fd] focus-within:border-slate-200 focus-within:bg-white",
      },
    },
    defaultVariants: {
      variant: "white",
    },
  }
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputWrapperVariants> {
  label: string;
  icon?: React.ReactNode;
}

export default function Input({ label, icon, variant, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[14px] font-bold text-festiva-midnight-blue">
        {label}
      </label>

      <div className={inputWrapperVariants({ variant })}>
        {icon && (
          <div className="flex items-center justify-center text-slate-400 shrink-0">
            {icon}
          </div>
        )}
        <input
          className={`w-full h-full bg-transparent text-[15px] font-medium text-festiva-midnight-blue placeholder-slate-400 focus:outline-none ${className ?? ""}`}
          {...props}
        />
      </div>
    </div>
  );
}