import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, ArrowRight, ShieldCheck, Check, MapPin, Tag } from 'lucide-react';
import { useAppStore } from '../app/store';
import { analytics } from '../services/analytics';

export const TravelProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { travelProfile } = useAppStore();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    setCopied(true);
    analytics.track('share_intent_clicked', {
      channel: 'instagram_story_mock',
      referral_id: 'CHIC-ANNA-KR',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    analytics.track('campaign_cta_clicked', {
      profile_type: travelProfile.type,
      destination: 'Seoul',
    });
    navigate('/trip');
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Top Bar */}
      <div className="flex items-center justify-between py-2 border-b border-slate-800/80 mb-3">
        <span className="text-xs font-semibold text-slate-300">Travel DNA Result</span>
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 text-xs border border-slate-700 hover:bg-slate-700 transition"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3 text-blue-400" />}
          <span>{copied ? '已複製分享卡連結' : '分享 DNA 卡'}</span>
        </button>
      </div>

      {/* Main Profile Card (Social Sharing Aesthetic) */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-indigo-900/60 via-slate-900 to-slate-950 border-2 border-blue-500/40 relative shadow-2xl overflow-hidden mb-4">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-blue-500/20 text-blue-300 border border-blue-400/40">
            去趣 GenAI 旅人畫像
          </span>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <MapPin className="w-3 h-3 text-rose-400" />
            首爾 5 日行
          </span>
        </div>

        <h2 className="text-xl font-black text-white tracking-tight leading-tight">
          {travelProfile.type}
        </h2>
        <div className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 text-xs font-semibold border border-amber-500/30">
          ✨ {travelProfile.badge}
        </div>

        <p className="text-xs text-slate-300 mt-3 italic leading-relaxed border-l-2 border-blue-400 pl-2.5">
          「{travelProfile.tagline}」
        </p>

        <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
          {travelProfile.description}
        </p>

        {/* Feature Tags */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="text-[11px] text-slate-400 font-semibold mb-2 flex items-center gap-1">
            <Tag className="w-3 h-3 text-blue-400" />
            <span>AI 分析出的特徵權重：</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {travelProfile.matched_tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-blue-200 text-[11px] border border-slate-700/60 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Killer Benefit Teaser */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-950/60 to-blue-950/60 border border-sky-500/30 flex items-start gap-3 mb-4">
        <div className="p-2 rounded-xl bg-sky-500/20 text-sky-300 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="text-xs">
          <h4 className="font-bold text-sky-200 mb-0.5">專屬解鎖：首爾離線守護包</h4>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            針對您在弘大與聖水洞的穿梭需求，購買去趣 eSIM 後將為您量身建立包含弘大住宿交通、地鐵出口與排錯手冊的本機離線守護包。
          </p>
        </div>
      </div>

      {/* Next CTA */}
      <div className="mt-auto pt-2">
        <button
          type="button"
          onClick={handleNext}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>查看首爾 5 日行程與推薦 eSIM</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-[10px] text-slate-400 text-center mt-2">
          由互動興趣順暢導向商品頁・提升點擊率
        </p>
      </div>
    </div>
  );
};
