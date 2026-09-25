import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import type { EsimPlan } from '../domain/trip';

interface EsimPlanCardProps {
  plan: EsimPlan;
  isSelected: boolean;
  onSelect: (plan: EsimPlan) => void;
}

export const EsimPlanCard: React.FC<EsimPlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
}) => {
  const isHighlight = !!plan.highlight_badge;

  return (
    <div
      onClick={() => onSelect(plan)}
      className={`rounded-3xl p-5 border-2 transition-all cursor-pointer relative bg-white ${
        isSelected
          ? 'border-[#00AEEF] ring-2 ring-[#00AEEF]/20 shadow-md'
          : isHighlight
          ? 'border-[#00AEEF]/50 shadow-sm hover:border-[#00AEEF]'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      {/* Top highlight ribbon */}
      {isHighlight && (
        <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#FFC400] to-[#FF8614] text-[#171B28] text-[11px] font-black tracking-wide flex items-center gap-1 shadow-sm">
          <Sparkles className="w-3 h-3 text-[#171B28]" />
          <span>{plan.highlight_badge}</span>
        </div>
      )}

      {/* Plan Header & Price */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div>
          <h3 className="font-extrabold text-base text-[#171B28] tracking-tight">
            {plan.name}
          </h3>
          <p className="text-xs text-[#00AEEF] font-bold mt-0.5">
            {plan.data_allowance}
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl font-black text-[#FF8614] tracking-tight">
            NT$ {plan.price_twd}
          </div>
          <div className="text-xs text-[#64748B] line-through font-medium">
            NT$ {plan.original_price_twd}
          </div>
        </div>
      </div>

      {/* Decision Explanation (Priority 1: 為什麼適合您) */}
      <div className="p-3 rounded-2xl bg-[#F4F7FB] border border-slate-200/80 mb-3 text-xs leading-relaxed">
        <div className="font-bold text-[#143D5C] mb-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF]" />
          <span>AI 推薦原因（行程契合度）：</span>
        </div>
        <p className="text-[#171B28] font-medium pl-2.5">
          {plan.recommended_reason}
        </p>
      </div>

      {/* Key features */}
      <div className="space-y-1.5 mb-4">
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs text-[#143D5C]">
            <Check className="w-3.5 h-3.5 text-[#18B46B] shrink-0 stroke-[3]" />
            <span className={idx === 0 ? 'font-bold text-[#171B28]' : ''}>
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Select CTA Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(plan);
        }}
        className={`w-full h-12 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
          isSelected
            ? 'bg-[#00AEEF] hover:bg-[#009bd6] text-white shadow-[#00AEEF]/20'
            : isHighlight
            ? 'bg-[#171B28] hover:bg-slate-800 text-white'
            : 'bg-[#F4F7FB] hover:bg-slate-200 text-[#143D5C] border border-slate-200'
        }`}
      >
        <span>{isSelected ? '已選擇此方案' : '選擇此方案・解鎖離線包'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Mock tag */}
      <div className="text-[10px] text-[#64748B] text-center mt-2 flex items-center justify-center gap-1">
        <ShieldCheck className="w-3 h-3 text-[#00AEEF]" />
        <span>原型示範方案・正式方案以去趣 App 為準</span>
      </div>
    </div>
  );
};
