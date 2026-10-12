import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Smartphone, AlertTriangle, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { ChicHeader } from '../components/ChicHeader';
import { PrimaryCTA } from '../components/PrimaryCTA';
import { ExperienceTwinPanel } from '../components/ExperienceTwinPanel';
import { SeoulItineraryCard } from '../components/SeoulItineraryCard';
import tripData from '../data/trip.json';
import { analytics } from '../services/analytics';
import { localPackStore } from '../services/localPackStore';
import { EXPERIENCE_TWIN_FIXTURE } from '../data/experienceTwinFixture';
import {
  getSeoulImagesOfflineStatus,
  type SeoulImagesOfflineStatus,
} from '../services/offlineAssetCache';
import type { ItineraryDay } from '../domain/trip';

export const TripOverviewPage: React.FC = () => {
  const navigate = useNavigate();
  // 預設五張卡片保持摘要模式，同時間最多只展開一張卡片
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [offlineImageStatus, setOfflineImageStatus] = useState<SeoulImagesOfflineStatus | null>(null);

  useEffect(() => {
    // 檢查離線圖片狀態，明確區分行程文字與圖片離線就緒度
    getSeoulImagesOfflineStatus().then(setOfflineImageStatus);
  }, []);

  const handleToggleDay = (dayNum: number) => {
    setExpandedDay((prev) => (prev === dayNum ? null : dayNum));
  };

  const handleNext = () => {
    analytics.track('esim_recommendation_viewed', {
      trip_id: tripData.trip_id,
      recommended_plan_id: 'kr-5d-daily2gb',
    });
    navigate('/esim');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7FB]">
      <ChicHeader subtitle="首爾 5 日行程分析和痛點洞察" />

      <div className="p-4 space-y-4">
        {/* Trip Summary Card */}
        <div className="rounded-none bg-white p-5 border border-slate-200/90 shadow-sm">
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
        <div className="rounded-none bg-[#FEF3C7]/40 p-4 border border-[#F59E0B]/40 shadow-2xs text-xs">
          <div className="flex items-center gap-2 text-[#D97706] font-extrabold mb-1.5 text-sm">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B] stroke-[2.5]" />
            <span>AI 行程風險和網路痛點洞察</span>
          </div>
          <p className="text-[#171B28] leading-relaxed font-medium">
            分析 Anna 的首爾行程發現：
            <strong className="text-[#D97706]"> 抵達仁川機場第一時間尚未連上網路</strong>，需查詢前往弘大住宿的 AREX 月台和飯店門牌地址；此外聖水洞快閃店人潮眾多、首爾地鐵地下站常有訊號不穩或離線斷網情境。
          </p>
        </div>

        {/* 5-Day Itinerary Highlights with Enhanced Photo & Route Cards */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-1.5 px-1">
            <h3 className="text-xs font-black text-[#171B28] tracking-tight">
              首爾 5 日亮點和守護包收錄焦點
            </h3>
            <div className="flex items-center gap-1.5">
              <span
                className="text-[10px] font-bold text-[#00AEEF] bg-[#E0F4FC] px-2 py-0.5 rounded-full border border-[#00AEEF]/20 flex items-center gap-1"
                aria-label="行程資料已儲存"
                title="行程文字已完整儲存至手機本機"
              >
                <CheckCircle className="w-3 h-3 text-[#00AEEF]" />
                行程資料已儲存
              </span>
              <span
                className="text-[10px] font-mono font-bold text-[#143D5C] bg-white px-2 py-0.5 rounded-full border border-slate-200 flex items-center gap-1 shadow-2xs"
                title="離線圖片快取狀態（景點照片 9 張 ＋ 路線圖 5 張）"
              >
                <ImageIcon className="w-3 h-3 text-[#00AEEF]" />
                {offlineImageStatus && (offlineImageStatus.attractionCachedCount > 0 || offlineImageStatus.routeCachedCount > 0)
                  ? `離線圖片就緒 (${offlineImageStatus.attractionCachedCount + offlineImageStatus.routeCachedCount}/${offlineImageStatus.totalAttractions + offlineImageStatus.totalRoutes})`
                  : '景點與路線圖已就緒'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {(tripData.itinerary as unknown as ItineraryDay[]).map((day) => (
              <SeoulItineraryCard
                key={day.day}
                day={day}
                isExpanded={expandedDay === day.day}
                onToggleExpand={() => handleToggleDay(day.day)}
              />
            ))}
          </div>
        </div>

        {/* Experience Twin：行前預算備案・離線可查 */}
        <ExperienceTwinPanel
          twins={localPackStore.getTwins()?.twins || EXPERIENCE_TWIN_FIXTURE.twins}
        />

        {/* Primary CTA */}
        <div className="pt-2 pb-4">
          <PrimaryCTA
            label="查看為 Anna 精選的 eSIM 方案"
            onClick={handleNext}
            variant="blue"
          />
          <p className="text-[11px] text-[#64748B] text-center mt-2 font-medium">
            展示步驟 3：行程痛點明確化 → 自然帶出 eSIM 流量和離線包價值
          </p>
        </div>
      </div>
    </div>
  );
};
