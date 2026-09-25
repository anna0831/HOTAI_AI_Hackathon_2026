import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PrimaryCTAProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: 'blue' | 'orange' | 'ink' | 'outline';
  fullWidth?: boolean;
  className?: string;
}

export const PrimaryCTA: React.FC<PrimaryCTAProps> = ({
  label,
  onClick,
  disabled = false,
  icon,
  variant = 'blue',
  fullWidth = true,
  className = '',
}) => {
  const variantStyles = {
    blue: 'bg-[#00AEEF] hover:bg-[#009bd6] text-white shadow-md shadow-[#00AEEF]/20',
    orange: 'bg-[#FF8614] hover:bg-[#e6750c] text-white shadow-md shadow-[#FF8614]/25',
    ink: 'bg-[#171B28] hover:bg-slate-800 text-white shadow-md shadow-slate-900/15',
    outline: 'bg-white hover:bg-slate-50 text-[#143D5C] border-2 border-slate-200 shadow-2xs',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`h-12 sm:h-13 px-5 rounded-2xl font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-40 disabled:pointer-events-none ${
        fullWidth ? 'w-full' : ''
      } ${variantStyles[variant]} ${className}`}
    >
      <span>{label}</span>
      {icon || <ArrowRight className="w-4 h-4 stroke-[2.5]" />}
    </button>
  );
};
