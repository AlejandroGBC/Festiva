import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export default function Input({ label, icon, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[14px] font-bold text-festiva-midnight-blue">
        {label}
      </label>
      
      <div className="flex items-center gap-3 px-4 h-[54px] rounded-[16px] bg-[#f8f9fd] border border-transparent focus-within:border-slate-200 focus-within:bg-white transition-all duration-200">
        {icon && (
          <div className="flex items-center justify-center text-slate-400 shrink-0">
            {icon}
          </div>
        )}
        <input 
          className="w-full h-full bg-transparent text-[15px] font-medium text-festiva-midnight-blue placeholder-slate-400 focus:outline-none" 
          {...props} 
        />
      </div>
    </div>
  );
}