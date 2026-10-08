import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Plane,
  Coffee,
  Wifi,
  CheckSquare,
  Square,
  AlertCircle,
} from 'lucide-react';
import { ChicHeader } from '../components/ChicHeader';
import { DestinationCard } from '../components/DestinationCard';
import { PrimaryCTA } from '../components/PrimaryCTA';
import { useAppStore } from '../app/store';
import { TRAVEL_VIBE_OPTIONS } from '../data/travelVibes';
import { analytics } from '../services/analytics';

export const CampaignLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedVibes, toggleVibe } = useAppStore();

  const [destination, setDestination] = useState('seoul');
  const [priority, setPriority] = useState('photo_map');

  const destinations = [
    {
      id: 'seoul',
      flag: '🇰🇷',
      city: '首爾 (Seoul)',
      country: '韓國',
      days: '5 天 4 夜',
      badge: 'Anna 示範行程',
      disabled: false,
    },
    {
      id: 'tokyo',
      flag: '🇯🇵',
      city: '東京 (Tokyo)',
      country: '日本',
      days: '5 天 4 夜',
      badge: '即將推出',
      disabled: true,
    },
    {
      id: 'bangkok',
      flag: '🇹🇭',
      city: '曼谷 (Bangkok)',
      country: '泰國',
      days: '5 天 4 夜',
      badge: '即將推出',
      disabled: true,
    },
    {
      id: 'taitung',
      flag: '🇹🇼',
      city: '花東漫遊',
      country: '台灣',
      days: '3 天 2 夜',
      badge: '即將推出',
      disabled: true,
    },
  ];

  const handleStartAnalysis = () => {
    if (selectedVibes.length === 0) return;

    analytics.track('trip_viewed', { trip_id: 'seoul-demo-001' });
    analytics.track('travel_profile_generated', {
      profile_type: '城市探險型旅人',
      input_signals: [destination, ...selectedVibes, priority],
    });
    analytics.track('campaign_cta_clicked', {
      profile_type: '城市探險型旅人',
      destination: '首爾',
    });
    navigate('/result');
  };

  const isFormValid = selectedVibes.length > 0;

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7FB]">
      <ChicHeader subtitle="用 AI 規劃專屬旅程・推薦最適 eSIM" />

      <div className="p-4 space-y-4">
        {/* Main Hero Card */}
        <div className="rounded-none bg-white p-5 border border-slate-200/90 shadow-sm relative overflow-hidden">
          {/* Subtle brand gradient accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00AEEF]/10 via-[#FFC400]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#E0F4FC] text-[#00AEEF] text-xs font-extrabold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GenAI Travel DNA 智慧互動</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#171B28] tracking-tight leading-tight">
            接下來，
            <br />
            <span className="text-[#00AEEF]">要去哪旅行？</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#64748B] mt-2 font-medium leading-relaxed">
            30 秒測出您的旅行 DNA！去趣將旅程型態轉化為最適 eSIM 方案，
            <strong className="text-[#171B28]"> 購買後再贈專屬離線守護包</strong>，無網環境依然可信。
          </p>

          {/* Quick CTA right on the hero */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#143D5C] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#18B46B]" />
              <span>黑客松示範行程已載入</span>
            </div>
            <span className="text-xs font-extrabold text-[#FF8614] flex items-center gap-0.5">
              <span>免費測驗</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Section 1: Choose Destination */}
        <div>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-1.5 font-black text-sm text-[#171B28]">
              <Plane className="w-4 h-4 text-[#00AEEF]" />
              <span>選擇目的地（Demo 載入首爾自由行）</span>
            </div>
            <span className="text-[11px] font-bold text-[#00AEEF] font-mono">
              Trip #001
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {destinations.map((d) => (
              <DestinationCard
                key={d.id}
                id={d.id}
                flag={d.flag}
                city={d.city}
                country={d.country}
                days={d.days}
                badge={d.badge}
                active={destination === d.id}
                disabled={d.disabled}
                onClick={() => setDestination(d.id)}
              />
            ))}
          </div>
        </div>

        {/* Section 2: Style & Preferences Questionnaire */}
        <div className="rounded-none bg-white p-4 border border-slate-200/90 shadow-sm space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-extrabold text-[#171B28] flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-[#FF8614]" />
                <span>您在首爾最期待的旅遊方案？</span>
              </label>
              <span className="text-[11px] font-bold text-[#00AEEF] bg-[#E0F4FC] px-2.5 py-0.5 rounded-none border border-[#00AEEF]/20">
                可複選
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TRAVEL_VIBE_OPTIONS.map((opt) => {
                const isSelected = selectedVibes.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="checkbox"
                    aria-checked={isSelected}
                    aria-pressed={isSelected}
                    tabIndex={0}
                    onClick={() => toggleVibe(opt.id)}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        toggleVibe(opt.id);
                      }
                    }}
                    className={`p-3 rounded-none text-left border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-[#E0F4FC]/50 border-[#00AEEF] text-[#143D5C] ring-2 ring-[#00AEEF]/20 shadow-2xs'
                        : 'bg-[#F4F7FB] border-slate-200 text-[#64748B] hover:border-slate-300 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <div className="font-extrabold text-xs text-[#171B28]">
                        {opt.emoji} {opt.title}
                      </div>
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-[#00AEEF] shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                    </div>
                    <div className="text-[11px] text-[#64748B] leading-relaxed">
                      {opt.description}
                    </div>
                  </button>
                );
              })}
            </div>

            {!isFormValid && (
              <div className="flex items-center gap-1.5 text-xs text-[#DC2626] font-bold mt-2 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-none">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>請至少選擇一項期待旅遊方案（可複選）</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#171B28] mb-2 flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-[#00AEEF]" />
              <span>海外上網最重要的使用習慣？</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPriority('photo_map')}
                className={`p-3 rounded-none text-left border transition cursor-pointer ${
                  priority === 'photo_map'
                    ? 'bg-[#E0F4FC]/40 border-[#00AEEF] text-[#143D5C] ring-1 ring-[#00AEEF]/20'
                    : 'bg-[#F4F7FB] border-slate-200 text-[#64748B] hover:border-slate-300'
                }`}
              >
                <div className="font-extrabold text-xs text-[#171B28] mb-0.5">
                  🗺️ 重度地圖＋限動打卡
                </div>
                <div className="text-[11px] text-[#64748B]">
                  隨時導航地鐵、即時上傳照片
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPriority('safety_offline')}
                className={`p-3 rounded-none text-left border transition cursor-pointer ${
                  priority === 'safety_offline'
                    ? 'bg-[#E0F4FC]/40 border-[#00AEEF] text-[#143D5C] ring-1 ring-[#00AEEF]/20'
                    : 'bg-[#F4F7FB] border-slate-200 text-[#64748B] hover:border-slate-300'
                }`}
              >
                <div className="font-extrabold text-xs text-[#171B28] mb-0.5">
                  🛡️ 落地安心不迷路
                </div>
                <div className="text-[11px] text-[#64748B]">
                  離線仍可查住宿交通、緊急電話
                </div>
              </button>
            </div>
          </div>

          {/* Killer Benefit Callout Banner */}
          <div className="p-3.5 rounded-none bg-gradient-to-r from-[#E0F4FC] to-[#F4F7FB] border border-[#00AEEF]/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#143D5C]">
              <ShieldCheck className="w-4 h-4 text-[#00AEEF] stroke-[2.5]" />
              <span className="font-bold">
                去趣獨家：購買即贈【首爾離線守護包】
              </span>
            </div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-none bg-[#FFC400] text-[#171B28] shrink-0 whitespace-nowrap">
              加值贈送
            </span>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="pt-1 pb-4">
          <PrimaryCTA
            label="生成專屬 Travel Profile 和方案推薦"
            onClick={handleStartAnalysis}
            variant="blue"
            disabled={!isFormValid}
          />
          <p className="text-[11px] text-[#64748B] text-center mt-2 font-medium">
            展示步驟 1：首頁意圖互動 → 建立品牌認知和 First-party Data
          </p>
        </div>
      </div>
    </div>
  );
};
