import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Copy, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
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
    <div className="flex-1 flex flex-col p-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 overflow-y-auto">
      {/* Top Header */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
            旅後口碑與社群裂變 (Post-trip UGC)
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Referral Loop</span>
        </div>
        <h2 className="text-lg font-bold text-white">
          Anna 的首爾 5 日旅行回憶卡
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          由 AI 旅伴問答與行程紀錄自動生成・自帶折扣碼吸引好友進入漏斗
        </p>
      </div>

      {/* The Social Share Card */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-indigo-900/80 via-slate-900 to-purple-950/70 border-2 border-purple-500/40 shadow-2xl relative overflow-hidden mb-4">
        {/* Glow */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-white text-xs">去趣 chic trip</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">
              eSIM Companion
            </span>
          </div>
          <span className="text-[11px] text-purple-300 font-medium">Seoul 2026</span>
        </div>

        <div className="my-3">
          <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
            ★ {travelProfile.type}
          </span>
          <h3 className="text-xl font-black text-white leading-tight mt-0.5">
            首爾巷弄散策與感性記憶
          </h3>
          <p className="text-xs text-slate-300 italic mt-1">
            「在仁川機場離線時有去趣守護包指引 AREX，在聖水洞快閃店有穩定的 2GB 串流分享！」
          </p>
        </div>

        {/* Highlights List */}
        <div className="space-y-1.5 py-3 border-y border-slate-800 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="text-purple-400 font-bold">Day 1</span>
            <span>AREX 普通快線 54 分直達弘大 3 號出口</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-purple-400 font-bold">Day 2</span>
            <span>景福宮光化門守門將換崗儀式・北村韓屋</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-purple-400 font-bold">Day 3</span>
            <span>聖水洞 Dior 概念館快閃與咖啡街街拍</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-purple-400 font-bold">Day 4</span>
            <span>南山首爾塔夕陽夜景與明洞購物退稅</span>
          </div>
        </div>

        {/* eSIM Service Badge & Referral CTA */}
        <div className="mt-3 p-3 rounded-2xl bg-slate-950/80 border border-purple-500/30 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-purple-300 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>守護旅程：去趣 5 日每日 2GB eSIM</span>
            </div>
            <div className="text-xs text-white font-mono font-bold mt-0.5">
              好友推薦碼：<span className="text-amber-400">{referralCode}</span>
            </div>
            <div className="text-[10px] text-slate-400">好友測驗現折 15% ＋ 送離線守護包</div>
          </div>
          <div className="p-2 rounded-xl bg-purple-600/20 text-purple-300 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Share Actions */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          type="button"
          onClick={handleCopyLink}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-purple-400" />}
          <span>{copied ? '已複製推薦連結' : '複製專屬推薦連結'}</span>
        </button>

        <button
          type="button"
          onClick={handleSimulateDownload}
          className="p-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 text-purple-200 font-medium text-xs border border-purple-500/40 flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          {downloaded ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
          <span>{downloaded ? '已模擬儲存卡片' : '下載限動分享卡'}</span>
        </button>
      </div>

      {/* Growth Loop Insight */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 mb-4 leading-relaxed">
        <span className="text-purple-300 font-semibold mr-1">循環機制說明：</span>
        好友點擊此卡片後，將直接返回「去趣旅行型態測驗」入口，形成「曝光 → 轉換 → 服務 → 口碑」的零行銷成本自驅飛輪。
      </div>

      {/* Next CTA to Decision Dashboard */}
      <div className="mt-auto pt-2">
        <button
          type="button"
          onClick={() => navigate('/evidence')}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold text-sm shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>查看黑客松決策儀表板 (Decision Dashboard)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-[10px] text-slate-400 text-center mt-2">
          完整呈現 Demo 數據漏斗與 Architecture A/B/C 評分
        </p>
      </div>
    </div>
  );
};
