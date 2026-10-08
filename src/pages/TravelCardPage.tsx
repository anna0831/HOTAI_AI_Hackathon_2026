import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, Sparkles, ShieldCheck, MapPin, Share2 } from 'lucide-react';
import { ChicHeader } from '../components/ChicHeader';
import { PrimaryCTA } from '../components/PrimaryCTA';
import { SectionHeading } from '../components/SectionHeading';
import { TravelDnaStoryCards } from '../components/TravelDnaStoryCards';
import { useAppStore } from '../app/store';
import { analytics } from '../services/analytics';

export const TravelCardPage: React.FC = () => {
  const navigate = useNavigate();
  const { travelProfile } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [shareNotice, setShareNotice] = useState<{ text: string; isSuccess: boolean } | null>(null);

  const referralCode = 'CHIC-ANNA-KR';

  const showShareNotice = (msg: string, isSuccess = true) => {
    setShareNotice({ text: msg, isSuccess });
    setTimeout(() => setShareNotice(null), 3500);
  };

  const handleCopyLink = async () => {
    setCopied(true);
    analytics.track('share_intent_clicked', {
      channel: 'copy_link',
      referral_id: referralCode,
    });

    const shareContent = `【去趣 chicTrip・首爾旅程回憶】\nAnna 的首爾 5 日旅行回憶卡・${travelProfile.type}\n「在仁川機場離線時有去趣守護包指引 AREX，在聖水洞快閃店有穩定的 2GB 串流分享！」\n\n示範推薦碼【${referralCode}】（示範推薦碼，無實際優惠）`;

    try {
      await navigator.clipboard.writeText(shareContent);
      showShareNotice('已複製推薦文案，可至 Threads 或社群貼上分享！', true);
    } catch {
      showShareNotice('已複製推薦碼：' + referralCode, true);
    }

    setTimeout(() => setCopied(false), 2000);
  };

  const handleSystemShare = async () => {
    analytics.track('share_intent_clicked', {
      channel: 'threads_share',
      referral_id: referralCode,
    });

    const shareContent = `【去趣 chicTrip・首爾旅程回憶】\nAnna 的首爾 5 日旅行回憶卡・${travelProfile.type}\n「在仁川機場離線時有去趣守護包指引 AREX，在聖水洞快閃店有穩定的 2GB 串流分享！」\n示範推薦碼【${referralCode}】（示範推薦碼，無實際優惠）`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Anna 的首爾 5 日旅行回憶卡',
          text: shareContent,
        });
        showShareNotice('系統分享完成', true);
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') {
          // 使用者取消分享時，不自動複製內容，也不顯示分享成功
          showShareNotice('已取消分享', false);
          return;
        }
        showShareNotice('無法開啟系統分享，請使用「複製專屬推薦文案」', false);
        return;
      }
    } else {
      showShareNotice('目前環境未支援系統分享，請點擊「複製專屬推薦文案」', false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7FB]">
      <ChicHeader subtitle="旅後口碑和好友推薦循環 (UGC Loop)" />

      <div className="p-4 space-y-5">
        {/* Intro */}
        <div className="rounded-none bg-white p-5 border border-slate-200/90 shadow-sm">
          <SectionHeading
            badge="去趣口碑回流機制 (Referral Loop)"
            badgeColor="orange"
            title="Anna 的首爾 5 日旅行回憶卡"
            subtitle="由 AI 旅伴問答和每日行程自動生成・適合截圖和分享至 Instagram Stories 或 Threads"
          />
        </div>

        {/* The Shareable Travel Card (Formal Trip Card) */}
        <div className="rounded-none bg-white p-5 sm:p-6 border-2 border-[#00AEEF]/40 shadow-lg shadow-slate-200/70 relative overflow-hidden text-[#171B28]">
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
              首爾巷弄探險和感性記憶
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
              <span>聖水洞 Dior 概念館快閃和咖啡街街拍</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#00AEEF] shrink-0">Day 4</span>
              <span>南山首爾塔夕陽夜景和明洞購物退稅</span>
            </div>
          </div>

          {/* Service Guarantee & Referral Code Badge */}
          <div className="p-3.5 rounded-none bg-[#F4F7FB] border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[#00AEEF] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#18B46B] stroke-[2.5]" />
                <span>守護旅程：去趣 5 日每日 2GB eSIM</span>
              </div>
              <div className="text-sm text-[#171B28] font-mono font-black mt-1">
                好友推薦碼：<span className="text-[#FF8614]">{referralCode}</span>
              </div>
              <div className="text-[10px] text-[#64748B] mt-0.5">
                示範推薦碼，無實際優惠（Prototype 示範）
              </div>
            </div>
            <div className="w-10 h-10 rounded-none bg-[#FFC400]/20 text-[#FF8614] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Action Buttons for Formal Trip */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleCopyLink}
            className="h-12 rounded-none bg-white hover:bg-slate-50 text-[#171B28] font-bold text-xs border border-slate-200 shadow-2xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {copied ? (
              <Check className="w-4 h-4 text-[#18B46B]" />
            ) : (
              <Copy className="w-4 h-4 text-[#00AEEF]" />
            )}
            <span>{copied ? '已複製推薦文案' : '複製專屬推薦文案'}</span>
          </button>

          <button
            type="button"
            onClick={handleSystemShare}
            className="h-12 rounded-none bg-[#00AEEF]/10 hover:bg-[#00AEEF]/20 text-[#00AEEF] font-bold text-xs border border-[#00AEEF]/30 shadow-2xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>系統分享</span>
          </button>
        </div>

        {shareNotice && (
          <div
            className={`p-2.5 rounded-none text-xs font-semibold flex items-center gap-2 ${
              shareNotice.isSuccess
                ? 'bg-[#E6F9F0] border border-[#A7F3D0] text-[#065F46]'
                : 'bg-slate-100 border border-slate-200 text-[#171B28]'
            }`}
          >
            {shareNotice.isSuccess ? (
              <Check className="w-4 h-4 text-[#18B46B] shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 text-[#00AEEF] shrink-0" />
            )}
            <span>{shareNotice.text}</span>
          </div>
        )}

        {/* Requirement 9: Dedicated Travel DNA Story Cards Section (3 switchable samples) */}
        <TravelDnaStoryCards />

        {/* Growth Loop Explanation */}
        <div className="p-3.5 rounded-none bg-white border border-slate-200 text-xs text-[#64748B] leading-relaxed">
          <span className="font-extrabold text-[#171B28] mr-1">循環機制說明：</span>
          好友點擊此卡片或在 Threads 看見推薦碼後，將直接返回「去趣旅行型態測驗」入口，形成「曝光 → 轉換 → 服務 → 口碑」的自驅飛輪。
        </div>

        {/* Primary CTA to Evidence Dashboard */}
        <div className="pt-2 pb-4">
          <PrimaryCTA
            label="查看黑客松決策儀表板 (Evidence Dashboard)"
            onClick={() => navigate('/evidence')}
            variant="ink"
          />
          <p className="text-[11px] text-[#64748B] text-center mt-2 font-medium">
            展示步驟 8：完整呈現事件漏斗、Klook 差異化分析和決策數據
          </p>
        </div>
      </div>
    </div>
  );
};
