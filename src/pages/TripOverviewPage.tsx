import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Smartphone, AlertTriangle, CheckCircle } from 'lucide-react';
import { ChicHeader } from '../components/ChicHeader';
import { PrimaryCTA } from '../components/PrimaryCTA';
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
    <div className="flex-1 flex flex-col bg-[#F4F7FB]">
      <ChicHeader subtitle="首爾 5 日行程分析與痛點洞察" />

      <div className="p-4 space-y-4">
        {/* Trip Summary Card */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#00AEEF]/10 text-[#00AEEF] border border-[#00AEEF]/20">
              去趣行程資料庫已同步
            </span>
            <span className="text-xs text-[#64748B] font-mono">
              {tripData.trip_id}
            </span>
          </div>

          <h2 className="text-xl font-black text-[#171B28] tracking-tight">
            {tripData.title}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] mt-2.5 font-medium">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#143D5C]" />
              旅客：{tripData.traveler.name} (獨旅 1 人)
            </span>
            <span className="flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-[#143D5C]" />
              裝置：{tripData.traveler.device}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#143D5C]" />
              {tripData.days} 天 4 夜
            </span>
          </div>
        </div>

        {/* AI Journey Risk & Weak-connection Pain Points */}
        <div className="rounded-3xl bg-[#FEF3C7]/40 p-4 border border-[#F59E0B]/40 shadow-2xs text-xs">
          <div className="flex items-center gap-2 text-[#D97706] font-extrabold mb-1.5 text-sm">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B] stroke-[2.5]" />
            <span>AI 行程風險與網路痛點洞察</span>
          </div>
          <p className="text-[#171B28] leading-relaxed font-medium">
            分析 Anna 的首爾行程發現：
            <strong className="text-[#D97706]"> 抵達仁川機場第一時間尚未連上網路</strong>，需查詢前往弘大住宿的 AREX 月台與飯店門牌地址；此外聖水洞快閃店人潮眾多、首爾地鐵地下站常有弱網延遲。
          </p>
        </div>

        {/* 5-Day Itinerary Highlights */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black text-[#171B28] tracking-tight">
              首爾 5 日亮點與守護包收錄焦點
            </h3>
            <span className="text-[11px] font-bold text-[#00AEEF]">
              已收錄至本機包
            </span>
          </div>

          {tripData.itinerary.map((day) => (
            <div
              key={day.day}
              className="rounded-2xl bg-white p-3.5 border border-slate-200/90 shadow-2xs text-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-[#171B28] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#00AEEF] text-white text-[11px] flex items-center justify-center font-bold">
                    {day.day}
                  </span>
                  <span>Day {day.day}・{day.region}</span>
                </span>
                <span className="text-[11px] text-[#64748B] font-mono font-medium">
                  {day.date}
                </span>
              </div>
              <p className="text-[#64748B] text-xs font-medium my-1.5 pl-7">
                {day.summary}
              </p>
              <div className="ml-7 text-[11px] px-2.5 py-1 rounded-xl bg-[#F4F7FB] text-[#143D5C] border border-slate-200 flex items-center gap-1.5 font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-[#00AEEF] shrink-0 stroke-[2.5]" />
                <span>守護包預載重點：{day.offline_pack_focus}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="pt-2 pb-4">
          <PrimaryCTA
            label="查看為 Anna 精選的 eSIM 方案"
            onClick={handleNext}
            variant="blue"
          />
          <p className="text-[11px] text-[#64748B] text-center mt-2 font-medium">
            90 秒展示第 3 站：行程痛點明確化 → 自然帶出 eSIM 流量與離線包價值
          </p>
        </div>
      </div>
    </div>
  );
};
