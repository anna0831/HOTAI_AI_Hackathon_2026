import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
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
    <div className="flex-1 flex flex-col p-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 overflow-y-auto">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
            去趣 Smart eSIM 導購
          </span>
          <span className="text-[10px] text-amber-300 font-mono">Demo Mock Data</span>
        </div>
        <h2 className="text-lg font-bold text-white">
          根據首爾行程為您精選的方案
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          打破傳統流量迷思・以旅行情境與離線守護包創造最高轉換
        </p>
      </div>

      {/* Plans List */}
      <div className="space-y-3.5 mb-5">
        {(plansData.plans as unknown as EsimPlan[]).map((plan) => {
          const isSelected = selectedPlanId === plan.plan_id;
          const isHighlight = !!plan.highlight_badge;

          return (
            <div
              key={plan.plan_id}
              onClick={() => setSelectedPlanId(plan.plan_id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                isHighlight
                  ? 'bg-gradient-to-br from-blue-950/70 via-slate-900 to-slate-900 border-blue-500/60 shadow-lg shadow-blue-500/15 ring-1 ring-blue-500/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {isHighlight && (
                <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow">
                  <Sparkles className="w-3 h-3" />
                  <span>{plan.highlight_badge}</span>
                </div>
              )}

              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-sm text-white">{plan.name}</h3>
                  <p className="text-[11px] text-blue-300 font-medium">{plan.data_allowance}</p>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-amber-400">
                    NT$ {plan.price_twd}
                  </div>
                  <div className="text-[10px] text-slate-500 line-through">
                    NT$ {plan.original_price_twd}
                  </div>
                </div>
              </div>

              {/* Personalized Reason */}
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 mb-3 leading-relaxed">
                <span className="text-amber-400 font-semibold mr-1">推薦理由：</span>
                {plan.recommended_reason}
              </div>

              {/* Feature bullets */}
              <div className="space-y-1 mb-3">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Select Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPlan(plan);
                }}
                className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  isHighlight
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <span>{isSelected ? '確認選擇此方案' : '選擇此方案'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Killer Benefit Value Callout */}
      <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/30 flex items-center gap-2.5 text-xs text-sky-200 mb-4">
        <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
        <p className="text-[11px] leading-relaxed">
          去趣購買承諾：所有 eSIM 方案均自動解鎖<strong className="text-white">【離線旅程守護包】</strong>，落地連線前絕不成為迷途孤島。
        </p>
      </div>
    </div>
  );
};
