import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Plane, Coffee, Wifi } from 'lucide-react';
import { ChicHeader } from '../components/ChicHeader';
import { DestinationCard } from '../components/DestinationCard';
import { PrimaryCTA } from '../components/PrimaryCTA';
import { analytics } from '../services/analytics';

export const CampaignLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState('seoul');
  const [vibe, setVibe] = useState('cafe_culture');
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
    analytics.track('trip_viewed', { trip_id: 'seoul-demo-001' });
    analytics.track('travel_profile_generated', {
      profile_type: '城市探險型旅人',
      input_signals: [destination, vibe, priority],
    });
    analytics.track('campaign_cta_clicked', {
      profile_type: '城市探險型旅人',
      destination: '首爾',
    });
    navigate('/result');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7FB]">
      <ChicHeader subtitle="用 AI 規劃專屬旅程・推薦最適 eSIM" />

      <div className="p-4 space-y-4">
        {/* Main Hero Card */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-sm relative overflow-hidden">
          {/* Subtle brand gradient accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00AEEF]/10 via-[#FFC400]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F4FC] text-[#00AEEF] text-xs font-extrabold mb-3">
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
        <div className="rounded-3xl bg-white p-4 border border-slate-200/90 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-[#171B28] mb-2 flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5 text-[#FF8614]" />
              <span>您在首爾最期待的旅遊風格？</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setVibe('cafe_culture')}
                className={`p-3 rounded-2xl text-left border transition cursor-pointer ${
                  vibe === 'cafe_culture'
                    ? 'bg-[#E0F4FC]/40 border-[#00AEEF] text-[#143D5C] ring-1 ring-[#00AEEF]/20'
                    : 'bg-[#F4F7FB] border-slate-200 text-[#64748B] hover:border-slate-300'
                }`}
              >
                <div className="font-extrabold text-xs text-[#171B28] mb-0.5">
                  ☕ 弘大＆聖水洞漫步
                </div>
                <div className="text-[11px] text-[#64748B]">
                  設計選物、潮牌快閃、咖啡街拍
                </div>
              </button>

              <button
                type="button"
                onClick={() => setVibe('history_culture')}
                className={`p-3 rounded-2xl text-left border transition cursor-pointer ${
                  vibe === 'history_culture'
                    ? 'bg-[#E0F4FC]/40 border-[#00AEEF] text-[#143D5C] ring-1 ring-[#00AEEF]/20'
                    : 'bg-[#F4F7FB] border-slate-200 text-[#64748B] hover:border-slate-300'
                }`}
              >
                <div className="font-extrabold text-xs text-[#171B28] mb-0.5">
                  🏯 景福宮與韓屋村
                </div>
                <div className="text-[11px] text-[#64748B]">
                  穿韓服拍照、傳統宮闕、古韻
                </div>
              </button>
            </div>
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
                className={`p-3 rounded-2xl text-left border transition cursor-pointer ${
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
                className={`p-3 rounded-2xl text-left border transition cursor-pointer ${
                  priority === 'safety_offline'
                    ? 'bg-[#E0F4FC]/40 border-[#00AEEF] text-[#143D5C] ring-1 ring-[#00AEEF]/20'
                    : 'bg-[#F4F7FB] border-slate-200 text-[#64748B] hover:border-slate-300'
                }`}
              >
                <div className="font-extrabold text-xs text-[#171B28] mb-0.5">
                  🛡️ 落地安心不迷路
                </div>
                <div className="text-[11px] text-[#64748B]">
                  弱網仍能查住宿交通、緊急電話
                </div>
              </button>
            </div>
          </div>

          {/* Killer Benefit Callout Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#E0F4FC] to-[#F4F7FB] border border-[#00AEEF]/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#143D5C]">
              <ShieldCheck className="w-4 h-4 text-[#00AEEF] stroke-[2.5]" />
              <span className="font-bold">
                去趣獨家：購買即贈【首爾離線守護包】
              </span>
            </div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FFC400] text-[#171B28]">
              加值贈送
            </span>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="pt-1 pb-4">
          <PrimaryCTA
            label="生成專屬 Travel Profile 與方案推薦"
            onClick={handleStartAnalysis}
            variant="blue"
          />
          <p className="text-[11px] text-[#64748B] text-center mt-2 font-medium">
            90 秒展示第 1 站：首頁意圖互動 → 建立品牌認知與 First-party Data
          </p>
        </div>
      </div>
    </div>
  );
};
