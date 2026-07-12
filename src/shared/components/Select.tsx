import { ChevronDown } from "lucide-react";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  icon?: React.ReactNode;
}

export default function Select({ label, options, placeholder, icon, className = "", ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[14px] font-bold text-festiva-midnight-blue">
        {label}
      </label>

      <div className="relative flex items-center gap-3 px-4 h-[54px] rounded-[16px] bg-[#f8f9fd] border border-transparent focus-within:border-slate-200 focus-within:bg-white transition-all duration-200">
        {icon && (
          <div className="flex items-center justify-center text-slate-500 shrink-0">
            {icon}
          </div>
        )}

        <select
          {...props}
          className={`w-full h-full bg-transparent text-[15px] font-medium text-festiva-midnight-blue appearance-none focus:outline-none pr-6 ${className}`}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <ChevronDown className="absolute right-4 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}