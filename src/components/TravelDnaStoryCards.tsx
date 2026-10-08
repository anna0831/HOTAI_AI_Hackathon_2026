import React, { useState, useEffect } from 'react';
import {
  Download,
  Share2,
  Check,
  Sparkles,
  MapPin,
  Tag,
  AlertTriangle,
} from 'lucide-react';
import {
  TRAVEL_DNA_SAMPLES,
  type TravelDnaCardSample,
} from '../data/travelDnaCards';
import { renderTravelDnaCardToBlob } from '../services/travelCardCanvas';
import { getCachedImageUrl } from '../services/offlineAssetCache';
import { analytics } from '../services/analytics';

export const TravelDnaStoryCards: React.FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<TravelDnaCardSample['id']>('urban-seoul');
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const activeCard =
    TRAVEL_DNA_SAMPLES.find((c) => c.id === selectedCardId) ||
    TRAVEL_DNA_SAMPLES[0];

  const [resolvedImageSrc, setResolvedImageSrc] = useState<string>(activeCard.imageSrc);

  useEffect(() => {
    let active = true;
    getCachedImageUrl(activeCard.imageSrc).then((src) => {
      if (active) setResolvedImageSrc(src);
    });
    return () => {
      active = false;
    };
  }, [activeCard.imageSrc]);

  const hasImageError = !!imageErrorMap[activeCard.id];

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  const showNotice = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    setFeedbackNotice({ text, type });
    setTimeout(() => setFeedbackNotice(null), 3500);
  };

  // 下載 1080 x 1920 PNG
  const handleDownload = async () => {
    try {
      setIsExporting(true);
      const { blob } = await renderTravelDnaCardToBlob(activeCard, hasImageError);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `chicTrip-DNA-${activeCard.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);

      analytics.track('travel_card_created', {
        trip_id: `dna-sample-${activeCard.id}`,
        profile_type: activeCard.dnaType,
        action: 'png_download_1080x1920',
      });

      showNotice(`已下載 1080×1920 PNG 分享卡（${activeCard.title}）`, 'success');
    } catch (e) {
      console.error('Download failed', e);
      showNotice('分享卡輸出失敗，請重試', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  // 系統分享（Threads / 系統分享）
  const handleShare = async () => {
    analytics.track('share_intent_clicked', {
      channel: 'threads_or_system',
      referral_id: activeCard.referralCode,
    });

    const shareText = `【去趣 chicTrip・我的旅行 DNA】\n${activeCard.title}\n「${activeCard.quote}」\n#${activeCard.tags.join(' #')}\n\n示範推薦碼【${activeCard.referralCode}】（示範推薦碼，無實際優惠）`;

    // 嘗試使用系統檔案分享或文字分享
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        setIsExporting(true);
        const { blob } = await renderTravelDnaCardToBlob(activeCard, hasImageError);
        const file = new File([blob], `chicTrip-DNA-${activeCard.id}.png`, {
          type: 'image/png',
        });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: activeCard.title,
            text: shareText,
            files: [file],
          });
          showNotice('系統分享完成', 'success');
          return;
        } else {
          await navigator.share({
            title: activeCard.title,
            text: shareText,
          });
          showNotice('系統分享完成', 'success');
          return;
        }
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') {
          // 使用者主動取消分享，不可以宣稱成功，不自動複製內容
          showNotice('已取消分享', 'info');
          return;
        }
        console.warn('System share error', err);
        showNotice('無法開啟系統分享，請使用「下載分享卡」', 'info');
        return;
      } finally {
        setIsExporting(false);
      }
    } else {
      showNotice('目前裝置不支援系統分享，請點擊「下載分享卡」', 'info');
    }
  };

  return (
    <div className="rounded-none bg-white p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF8614]/10 text-[#FF8614] text-[11px] font-extrabold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Travel DNA 限動分享卡（9:16 輸出規格）</span>
          </div>
          <h3 className="font-black text-base text-[#171B28] tracking-tight">
            三款 Travel DNA 範例卡切換和輸出
          </h3>
        </div>
        <span className="text-[10px] font-bold text-[#64748B] bg-[#F4F7FB] px-2 py-1 rounded-none border border-slate-200">
          Prototype Generated Assets
        </span>
      </div>

      {/* 3 Sample Selector Pills */}
      <div className="grid grid-cols-3 gap-2">
        {TRAVEL_DNA_SAMPLES.map((sample) => {
          const isActive = sample.id === selectedCardId;
          return (
            <button
              key={sample.id}
              type="button"
              onClick={() => setSelectedCardId(sample.id)}
              className={`p-2.5 rounded-none text-left border transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#E0F4FC]/60 border-[#00AEEF] ring-2 ring-[#00AEEF]/20 shadow-xs'
                  : 'bg-[#F4F7FB] border-slate-200 hover:bg-slate-100 text-[#64748B]'
              }`}
            >
              <div className="font-extrabold text-xs text-[#171B28] truncate">
                {sample.dnaType}
              </div>
              <div className="text-[10px] text-[#64748B] mt-0.5 truncate flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5 text-[#00AEEF] shrink-0" />
                <span>{sample.destination.split(' ')[0]}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Interactive 9:16 Story Card Viewport */}
      <div className="relative w-full max-w-[340px] mx-auto aspect-[9/16] rounded-none overflow-hidden shadow-xl border border-slate-300/80 text-white flex flex-col justify-between p-4 sm:p-5 select-none bg-slate-900">
        {/* Background Image Layer */}
        {!hasImageError ? (
          <img
            src={resolvedImageSrc}
            alt={activeCard.title}
            onError={() => handleImageError(activeCard.id)}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />
        ) : (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: activeCard.fallbackGradient }}
          />
        )}

        {/* Readability Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/20 to-slate-950/95 pointer-events-none" />

        {/* Status Pill: Prototype Generated Assets vs 背景圖待補 */}
        <div className="relative z-10 self-center">
          {hasImageError ? (
            <div className="px-3 py-1 rounded-full bg-amber-500/25 border border-amber-400 text-amber-300 text-[10px] font-bold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-400" />
              <span>背景圖待補</span>
            </div>
          ) : (
            <div className="px-2.5 py-0.5 rounded-full bg-slate-900/60 border border-white/20 text-slate-200 text-[9px] font-bold backdrop-blur-xs">
              Prototype Generated Assets
            </div>
          )}
        </div>

        {/* Top Header Safe Zone */}
        <div className="relative z-10 pt-1 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-sm tracking-tight text-white drop-shadow-sm">
              去趣
            </span>
            <span className="font-bold text-sm tracking-tight text-[#00AEEF] drop-shadow-sm">
              chicTrip
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold backdrop-blur-sm">
              eSIM
            </span>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/40 text-white border border-white/20 backdrop-blur-sm flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 text-[#FFC400]" />
            <span>{activeCard.destination}</span>
          </span>
        </div>

        {/* Bottom Content Card Box (Safe Area Above Bottom Bar) */}
        <div className="relative z-10 rounded-none bg-white/95 text-[#171B28] p-3.5 shadow-lg border border-white/50 backdrop-blur-md">
          {/* Top Brand Stripe */}
          <div
            className="h-1 rounded-full w-12 mb-2"
            style={{ backgroundColor: activeCard.themeColor }}
          />

          <div className="text-[10px] font-extrabold text-[#00AEEF] mb-0.5">
            ★ 旅人：{activeCard.name}・Travel DNA
          </div>

          <h4 className="font-black text-sm text-[#171B28] tracking-tight leading-tight">
            {activeCard.title}
          </h4>

          {/* Quote */}
          <div className="p-2 rounded-none bg-[#F4F7FB] border-l-2 border-[#00AEEF] my-2 text-[11px] text-[#143D5C] italic font-medium leading-relaxed">
            「{activeCard.quote}」
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2.5">
            {activeCard.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-bold px-2 py-0.5 rounded-none bg-[#F4F7FB] text-[#143D5C] border border-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Referral Box */}
          <div className="pt-2 border-t border-slate-100 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div>
                <div className="text-[9px] text-[#64748B] font-semibold">
                  專屬好友推薦碼
                </div>
                <div className="font-black text-xs font-mono text-[#FF8614]">
                  {activeCard.referralCode}
                </div>
              </div>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-none bg-[#FF8614]/10 text-[#FF8614] border border-[#FF8614]/30">
                示範推薦碼
              </span>
            </div>
            <div className="text-[8.5px] text-[#64748B] font-medium">
              示範推薦碼，無實際優惠
            </div>
          </div>
        </div>

        {/* Bottom Footer Note (Stories Safe Zone) */}
        <div className="relative z-10 text-center text-[9px] text-white/70 pb-1 font-medium">
          去趣 chicTrip × Offline AI Companion・1080 × 1920 輸出規格
        </div>
      </div>

      {/* Action Notification Message */}
      {feedbackNotice && (
        <div
          className={`p-2.5 rounded-none text-xs flex items-center gap-2 ${
            feedbackNotice.type === 'success'
              ? 'bg-[#E6F9F0] text-[#065F46] border border-[#A7F3D0]'
              : feedbackNotice.type === 'error'
              ? 'bg-rose-50 text-rose-700 border border-rose-200'
              : 'bg-slate-100 text-[#171B28] border border-slate-200'
          }`}
        >
          {feedbackNotice.type === 'success' ? (
            <Check className="w-4 h-4 text-[#18B46B] shrink-0" />
          ) : (
            <Sparkles className="w-4 h-4 text-[#00AEEF] shrink-0" />
          )}
          <span className="font-semibold">{feedbackNotice.text}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          type="button"
          onClick={handleDownload}
          disabled={isExporting}
          className="h-12 rounded-none bg-[#00AEEF] hover:bg-[#009bd6] disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-[#00AEEF]/20 flex items-center justify-center gap-2 transition cursor-pointer"
        >
          {downloadSuccess ? (
            <Check className="w-4 h-4 stroke-[3]" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>{isExporting ? '輸出高解析度 PNG 中...' : '下載分享卡 (1080×1920)'}</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          disabled={isExporting}
          className="h-12 rounded-none bg-[#171B28] hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-slate-900/10 flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-[#00AEEF]" />
          <span>系統分享</span>
        </button>
      </div>

      <div className="p-3 rounded-none bg-[#F4F7FB] border border-slate-200/80 text-[11px] text-[#64748B] flex items-center gap-2">
        <Tag className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
        <span>
          推薦碼標示「示範推薦碼，無實際優惠」；下載卡片具完整中文字、Logo 和品牌設計。
        </span>
      </div>
    </div>
  );
};
