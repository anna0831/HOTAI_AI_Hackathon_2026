import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface DestinationCardProps {
  id: string;
  flag: string;
  city: string;
  country: string;
  days: string;
  badge?: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  flag,
  city,
  country,
  days,
  badge,
  active,
  disabled,
  onClick,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`p-3.5 rounded-2xl text-left border transition-all relative flex flex-col justify-between cursor-pointer ${
        active
          ? 'bg-white border-[#00AEEF] ring-2 ring-[#00AEEF]/20 shadow-md'
          : disabled
          ? 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      <div className="flex items-start justify-between gap-1 mb-2">
        <div className="text-2xl">{flag}</div>
        {badge && (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              active
                ? 'bg-[#00AEEF]/10 text-[#00AEEF] border border-[#00AEEF]/20'
                : 'bg-amber-50 text-amber-600 border border-amber-200'
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      <div>
        <div className="font-extrabold text-sm text-[#171B28] flex items-center justify-between">
          <span>{city}</span>
          {active && <CheckCircle2 className="w-4 h-4 text-[#00AEEF]" />}
        </div>
        <div className="text-xs text-[#64748B] mt-0.5">
          {country}・{days}
        </div>
      </div>
    </button>
  );
};
