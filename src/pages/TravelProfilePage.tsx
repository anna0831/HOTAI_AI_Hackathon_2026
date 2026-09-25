import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { ChicHeader } from '../components/ChicHeader';
import { TravelDNAResultCard } from '../components/TravelDNAResultCard';
import { PrimaryCTA } from '../components/PrimaryCTA';
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
    <div className="flex-1 flex flex-col bg-[#F4F7FB]">
      <ChicHeader subtitle="Travel DNA 人格解析結果" />

      <div className="p-4 space-y-4">
        {/* Share Action Pill */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-[#143D5C] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#00AEEF]" />
            <span>AI 分析完成・您的旅人人格</span>
          </span>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#143D5C] text-xs font-bold border border-slate-200 hover:bg-slate-50 transition shadow-2xs cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[#18B46B]" />
            ) : (
              <Share2 className="w-3.5 h-3.5 text-[#00AEEF]" />
            )}
            <span>{copied ? '已複製分享卡連結' : '分享 DNA 卡'}</span>
          </button>
        </div>

        {/* Personality Share Card */}
        <TravelDNAResultCard profile={travelProfile} destinationLabel="首爾 5 日・Anna" />

        {/* Killer Benefit Callout */}
        <div className="rounded-3xl bg-white p-4 border border-slate-200/90 shadow-sm flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E0F4FC] text-[#00AEEF] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="text-xs">
            <h4 className="font-extrabold text-sm text-[#171B28] mb-1">
              專屬權益：購買去趣 eSIM 免費解鎖離線包
            </h4>
            <p className="text-[#64748B] leading-relaxed font-medium">
              針對您在弘大與聖水洞的探險需求，購買 eSIM 即自動生成【首爾 5 日離線旅程守護包】，包含 AREX 交通、住宿門牌與 24 小時急難排錯！
            </p>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="pt-2 pb-4">
          <PrimaryCTA
            label="查看首爾 5 日行程與推薦 eSIM"
            onClick={handleNext}
            variant="blue"
          />
          <p className="text-[11px] text-[#64748B] text-center mt-2 font-medium">
            90 秒展示第 2 站：旅人認同感建立 → 自然導流至商品頁與行程分析
          </p>
        </div>
      </div>
    </div>
  );
};
