import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Copy, Check, Sparkles, ShieldCheck, MapPin } from 'lucide-react';
import { ChicHeader } from '../components/ChicHeader';
import { PrimaryCTA } from '../components/PrimaryCTA';
import { SectionHeading } from '../components/SectionHeading';
import { useAppStore } from '../app/store';
import { analytics } from '../services/analytics';

export const TravelCardPage: React.FC = () => {
  const navigate = useNavigate();
  const { travelProfile } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const referralCode = 'CHIC-ANNA-KR';

  const handleCopyLink = () => {
    setCopied(true);
    analytics.track('share_intent_clicked', {
      channel: 'copy_link',
      referral_id: referralCode,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateDownload = () => {
    setDownloaded(true);
    analytics.track('travel_card_created', {
      trip_id: 'seoul-demo-001',
      profile_type: travelProfile.type,
      action: 'image_download_mock',
    });
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7FB]">
      <ChicHeader subtitle="旅後口碑與好友推薦循環 (UGC Loop)" />

      <div className="p-4 space-y-4">
        {/* Intro */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-sm">
          <SectionHeading
            badge="去趣口碑回流機制 (Referral Loop)"
            badgeColor="orange"
            title="Anna 的首爾 5 日旅行回憶卡"
            subtitle="由 AI 旅伴問答與每日行程自動生成・適合截圖與分享至 Instagram Stories 或 LINE"
          />
        </div>

        {/* The Shareable Travel Card (Instagram Story / Post Card aesthetic) */}
        <div className="rounded-3xl bg-white p-6 border-2 border-[#00AEEF]/40 shadow-lg shadow-slate-200/70 relative overflow-hidden text-[#171B28]">
          {/* Top brand header bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm tracking-tight text-[#171B28]">
                去趣
              </span>
              <span className="font-bold text-sm tracking-tight text-[#00AEEF]">
                chicTrip
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFC400]/20 text-[#171B28] font-bold">
                eSIM Companion
              </span>
            </div>
            <span className="text-xs text-[#64748B] font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#FF8614]" />
              首爾 2026
            </span>
          </div>

          {/* Persona & Title */}
          <div className="my-2">
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFC400]/20 text-[#171B28] text-xs font-bold mb-1">
              ★ {travelProfile.type}
            </div>
            <h3 className="text-xl font-black text-[#171B28] leading-tight">
              首爾巷弄探險與感性記憶
            </h3>
            <p className="text-xs text-[#64748B] italic mt-1 font-medium leading-relaxed">
              「在仁川機場離線時有去趣守護包指引 AREX，在聖水洞快閃店有穩定的 2GB 串流分享！」
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-2 py-3.5 border-y border-slate-100 text-xs text-[#143D5C] my-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#00AEEF] shrink-0">Day 1</span>
              <span>AREX 普通快線 54 分直達弘大 3 號出口</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#00AEEF] shrink-0">Day 2</span>
              <span>景福宮光化門守門將換崗儀式・北村韓屋</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#00AEEF] shrink-0">Day 3</span>
              <span>聖水洞 Dior 概念館快閃與咖啡街街拍</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#00AEEF] shrink-0">Day 4</span>
              <span>南山首爾塔夕陽夜景與明洞購物退稅</span>
            </div>
          </div>

          {/* Service Guarantee & Referral Code Badge */}
          <div className="p-3.5 rounded-2xl bg-[#F4F7FB] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[#00AEEF] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#18B46B] stroke-[2.5]" />
                <span>守護旅程：去趣 5 日每日 2GB eSIM</span>
              </div>
              <div className="text-sm text-[#171B28] font-mono font-black mt-1">
                好友推薦碼：<span className="text-[#FF8614]">{referralCode}</span>
              </div>
              <div className="text-[10px] text-[#64748B] mt-0.5">
                好友測驗折 15% ＋ 送離線守護包（Prototype 示範優惠）
              </div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#FFC400]/20 text-[#FF8614] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleCopyLink}
            className="h-12 rounded-2xl bg-white hover:bg-slate-50 text-[#171B28] font-bold text-xs border border-slate-200 shadow-2xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {copied ? (
              <Check className="w-4 h-4 text-[#18B46B]" />
            ) : (
              <Copy className="w-4 h-4 text-[#00AEEF]" />
            )}
            <span>{copied ? '已複製推薦連結' : '複製專屬推薦連結'}</span>
          </button>

          <button
            type="button"
            onClick={handleSimulateDownload}
            className="h-12 rounded-2xl bg-[#00AEEF]/10 hover:bg-[#00AEEF]/20 text-[#00AEEF] font-bold text-xs border border-[#00AEEF]/30 shadow-2xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {downloaded ? (
              <Check className="w-4 h-4 text-[#18B46B]" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{downloaded ? '已模擬儲存卡片' : '下載限動分享卡'}</span>
          </button>
        </div>

        {/* Growth Loop Explanation */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-[#64748B] leading-relaxed">
          <span className="font-extrabold text-[#171B28] mr-1">循環機制說明：</span>
          好友點擊此卡片後，將直接返回「去趣旅行型態測驗」入口，形成「曝光 → 轉換 → 服務 → 口碑」的自驅飛輪。
        </div>

        {/* Primary CTA to Evidence Dashboard */}
        <div className="pt-2 pb-4">
          <PrimaryCTA
            label="查看黑客松決策儀表板 (Evidence Dashboard)"
            onClick={() => navigate('/evidence')}
            variant="ink"
          />
          <p className="text-[11px] text-[#64748B] text-center mt-2 font-medium">
            90 秒展示第 8 站：完整呈現事件漏斗、Klook 差異化分析與決策數據
          </p>
        </div>
      </div>
    </div>
  );
};
