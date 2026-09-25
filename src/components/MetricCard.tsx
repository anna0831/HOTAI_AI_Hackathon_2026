import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext: string;
  typeTag: 'implemented' | 'tested' | 'target_hypothesis';
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  typeTag,
  icon,
}) => {
  const tagLabels = {
    implemented: { text: '已實作', class: 'bg-[#E6F9F0] text-[#18B46B] border-[#18B46B]/30' },
    tested: { text: '測試通過', class: 'bg-[#E0F4FC] text-[#00AEEF] border-[#00AEEF]/30' },
    target_hypothesis: { text: '目標假說 (Mock)', class: 'bg-amber-50 text-amber-600 border-amber-200' },
  };

  return (
    <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs text-[#171B28] flex flex-col justify-between">
      <div className="flex items-start justify-between gap-1 mb-2">
        <span className="text-xs font-bold text-[#64748B]">{label}</span>
        <span
          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${tagLabels[typeTag].class}`}
        >
          {tagLabels[typeTag].text}
        </span>
      </div>

      <div className="flex items-baseline gap-2 my-1">
        <div className="text-2xl font-black text-[#171B28] tracking-tight">
          {value}
        </div>
        {icon && <div className="text-[#00AEEF]">{icon}</div>}
      </div>

      <div className="text-xs text-[#64748B] font-medium leading-relaxed mt-1">
        {subtext}
      </div>
    </div>
  );
};
