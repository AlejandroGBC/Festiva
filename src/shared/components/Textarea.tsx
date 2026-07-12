import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

export default function Textarea({ label, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[14px] font-bold text-festiva-midnight-blue">
        {label}
      </label>
      
      <textarea 
        rows={4} 
        className="w-full p-4 rounded-[16px] bg-[#f8f9fd] border border-transparent text-[15px] font-medium text-festiva-midnight-blue placeholder-slate-400 resize-none focus:outline-none focus:border-slate-200 focus:bg-white transition-all duration-200 leading-relaxed" 
        {...props} 
      />
    </div>
  );
}