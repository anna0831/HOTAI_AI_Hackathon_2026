import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Smartphone, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';
import tripData from '../data/trip.json';
import { analytics } from '../services/analytics';

export const TripOverviewPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    analytics.track('esim_recommendation_viewed', {
      trip_id: tripData.trip_id,
      recommended_plan_id: 'kr-5d-daily2gb',
    });
    navigate('/esim');
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 overflow-y-auto">
      {/* Top Banner */}
      <div className="mb-3">
        <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
          去趣行程資料庫同步
        </span>
        <h2 className="text-lg font-bold text-white mt-1">
          {tripData.title}
        </h2>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-300" />
            旅客：{tripData.traveler.name} (獨旅 1 人)
          </span>
          <span className="flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5 text-slate-300" />
            裝置：{tripData.traveler.device}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-300" />
            {tripData.days} 天 4 夜
          </span>
        </div>
      </div>

      {/* AI Journey Risk Insight */}
      <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 mb-4 text-xs">
        <div className="flex items-center gap-2 text-amber-300 font-bold mb-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>AI 行程風險與弱網痛點分析</span>
        </div>
        <p className="text-slate-300 leading-relaxed text-[11px]">
          分析 Anna 的首爾行程發現：
          <span className="text-amber-200 font-semibold"> 抵達仁川機場第一時間尚未開通網路</span>，需查詢前往弘大住宿的 AREX 月台與飯店韓文地址；此外聖水洞快閃店人潮眾多、地鐵地下站常有弱網延遲。
        </p>
      </div>

      {/* Itinerary Accordion / Overview */}
      <div className="space-y-2 mb-4">
        <h3 className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>首爾 5 日行程亮點與離線焦點</span>
          <span className="text-[10px] text-slate-500">已關聯旅程守護包</span>
        </h3>

        {tripData.itinerary.map((day) => (
          <div
            key={day.day}
            className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-600/30 text-blue-300 text-[10px] flex items-center justify-center font-bold">
                  {day.day}
                </span>
                <span>Day {day.day}・{day.region}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">{day.date}</span>
            </div>
            <p className="text-slate-300 text-[11px] mb-1.5">{day.summary}</p>
            <div className="text-[10px] px-2 py-1 rounded bg-slate-950 text-sky-300 border border-slate-800 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-sky-400 shrink-0" />
              <span>守護包預載重點：{day.offline_pack_focus}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Next CTA */}
      <div className="mt-auto pt-2">
        <button
          type="button"
          onClick={handleNext}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>查看為 Anna 精選的 eSIM 方案</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-[10px] text-slate-400 text-center mt-2">
          從旅客行程痛點自然帶出 eSIM 價值
        </p>
      </div>
    </div>
  );
};
