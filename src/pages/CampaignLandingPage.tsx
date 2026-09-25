import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Compass, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { analytics } from '../services/analytics';

export const CampaignLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState('首爾 (Seoul)');
  const [vibe, setVibe] = useState('cafe_culture');
  const [priority, setPriority] = useState('photo_map');

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
    <div className="flex-1 flex flex-col p-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Brand Header */}
      <header className="flex items-center justify-between py-2 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
              <span>去趣 chic trip</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                eSIM × GenAI
              </span>
            </h1>
            <p className="text-[10px] text-slate-400">旅行型態測驗與專屬守護包</p>
          </div>
        </div>
        <span className="text-[11px] text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700/50">
          初賽 Demo 雛形
        </span>
      </header>

      {/* Hero Banner */}
      <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-900/50 via-indigo-950/40 to-slate-900 border border-blue-500/30 relative overflow-hidden mb-5">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-medium border border-blue-400/30 mb-2">
          <Sparkles className="w-3 h-3 text-blue-300" />
          <span>解鎖您的專屬旅行 DNA</span>
        </div>
        <h2 className="text-lg font-bold text-white leading-snug">
          30 秒解析您的旅行型態
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
            精準推薦 eSIM ＋ 贈離線旅程包
          </span>
        </h2>
        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
          行前懂你、行中守護、無網依然安心。立即完成互動測驗，獲得量身打造的海外數據方案與仁川落地守護包。
        </p>
      </div>

      {/* Interactive Quiz Card */}
      <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-4 shadow-xl">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
            <span>目的地與天數</span>
            <span className="text-[10px] text-blue-400 font-mono">Mock Trip #001</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDestination('首爾 5 日 (Anna 範例)')}
              className="px-3 py-2 rounded-xl text-xs font-medium border bg-blue-600/20 text-blue-300 border-blue-500/50 text-left flex items-center justify-between"
            >
              <span>🇰🇷 韓國首爾 5 天</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            </button>
            <button
              type="button"
              disabled
              className="px-3 py-2 rounded-xl text-xs font-medium border border-slate-800 bg-slate-950/50 text-slate-500 text-left cursor-not-allowed"
            >
              <span>🇯🇵 日本東京 5 天 (敬請期待)</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            您在首爾最期待的體驗風格？
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setVibe('cafe_culture')}
              className={`p-2.5 rounded-xl text-xs text-left border transition ${
                vibe === 'cafe_culture'
                  ? 'bg-blue-600/20 text-blue-200 border-blue-500/50'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold text-white text-[11px] mb-0.5">☕ 弘大＆聖水洞漫步</div>
              <div className="text-[10px] text-slate-400">文青咖啡、潮牌快閃、街拍</div>
            </button>
            <button
              type="button"
              onClick={() => setVibe('history_culture')}
              className={`p-2.5 rounded-xl text-xs text-left border transition ${
                vibe === 'history_culture'
                  ? 'bg-blue-600/20 text-blue-200 border-blue-500/50'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold text-white text-[11px] mb-0.5">🏯 景福宮與韓屋村</div>
              <div className="text-[10px] text-slate-400">傳統宮闕、韓服體驗、古韻</div>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            出國使用手機最重要的需求？
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPriority('photo_map')}
              className={`p-2.5 rounded-xl text-xs text-left border transition ${
                priority === 'photo_map'
                  ? 'bg-blue-600/20 text-blue-200 border-blue-500/50'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold text-white text-[11px] mb-0.5">🗺️ 地圖導航＋即時拍照打卡</div>
              <div className="text-[10px] text-slate-400">隨時查路線與分享限動</div>
            </button>
            <button
              type="button"
              onClick={() => setPriority('safety_offline')}
              className={`p-2.5 rounded-xl text-xs text-left border transition ${
                priority === 'safety_offline'
                  ? 'bg-blue-600/20 text-blue-200 border-blue-500/50'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold text-white text-[11px] mb-0.5">🛡️ 落地安心不失聯</div>
              <div className="text-[10px] text-slate-400">弱網環境仍能查地址交通</div>
            </button>
          </div>
        </div>

        {/* Benefits Pill */}
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 text-sky-400">
            <Shield className="w-3.5 h-3.5" />
            <span>獨家：購買即贈離線守護包</span>
          </div>
          <span className="text-[10px] text-slate-400">無網環境本機可用</span>
        </div>
      </div>

      {/* Main Action Button */}
      <div className="mt-auto pt-4">
        <button
          type="button"
          onClick={handleStartAnalysis}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>生成專屬 Travel Profile 與方案推薦</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-[10px] text-slate-400 text-center mt-2">
          Demo 情境：Anna 首次首爾獨旅 5 天・模擬真實點擊轉化
        </p>
      </div>
    </div>
  );
};
