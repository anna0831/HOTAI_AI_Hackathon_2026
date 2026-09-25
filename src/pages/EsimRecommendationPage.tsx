import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Info } from 'lucide-react';
import { ChicHeader } from '../components/ChicHeader';
import { EsimPlanCard } from '../components/EsimPlanCard';
import { SectionHeading } from '../components/SectionHeading';
import plansData from '../data/esim_plans.json';
import { useAppStore } from '../app/store';
import { analytics } from '../services/analytics';
import type { EsimPlan } from '../domain/trip';

export const EsimRecommendationPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedPlanId, setSelectedPlanId } = useAppStore();

  const handleSelectPlan = (plan: EsimPlan) => {
    setSelectedPlanId(plan.plan_id);
    analytics.track('esim_plan_selected', {
      plan_id: plan.plan_id,
      price: plan.price_twd,
      reason_viewed: plan.recommended_reason,
    });
    navigate('/pack');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7FB]">
      <ChicHeader subtitle="Smart eSIM 方案精選與決策解釋" />

      <div className="p-4 space-y-4">
        {/* Page Heading */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-sm">
          <SectionHeading
            badge="去趣 Smart eSIM 導購"
            badgeColor="blue"
            title="依您的首爾行程，為您精選最適方案"
            subtitle="打破傳統只看 GB 數的迷思・以旅行情境解釋為什麼適合"
          />

          <div className="p-3 rounded-2xl bg-[#E0F4FC]/50 border border-[#00AEEF]/30 flex items-center gap-2.5 text-xs text-[#143D5C]">
            <ShieldCheck className="w-5 h-5 text-[#00AEEF] shrink-0 stroke-[2.5]" />
            <p className="font-medium leading-relaxed">
              <strong className="text-[#171B28]">去趣獨家權益：</strong>
              所有 eSIM 方案均自動解鎖【首爾 5 日離線旅程守護包】，無網仍安心。
            </p>
          </div>
        </div>

        {/* Esim Plan Cards List */}
        <div className="space-y-3.5">
          {(plansData.plans as unknown as EsimPlan[]).map((plan) => (
            <EsimPlanCard
              key={plan.plan_id}
              plan={plan}
              isSelected={selectedPlanId === plan.plan_id}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        {/* Prototype Mock Notice */}
        <div className="p-3 rounded-2xl bg-white border border-slate-200 text-center text-xs text-[#64748B]">
          <div className="flex items-center justify-center gap-1.5 font-bold text-[#143D5C] mb-0.5">
            <Info className="w-3.5 h-3.5 text-[#00AEEF]" />
            <span>競賽 Prototype 示範資料聲明</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            本展示之方案規格與推薦理由皆為模擬情境（Mock Data），用以驗證個人化導購轉換成效。
          </p>
        </div>
      </div>
    </div>
  );
};
