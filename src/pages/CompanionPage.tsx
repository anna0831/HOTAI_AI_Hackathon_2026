import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Sparkles,
  RefreshCw,
  Clock,
  ArrowRight,
  WifiOff,
  Wifi
} from 'lucide-react';
import { ChicHeader } from '../components/ChicHeader';
import { FreshnessBadge } from '../components/FreshnessBadge';
import { SourceCard } from '../components/SourceCard';
import { useAppStore } from '../app/store';
import { queryRouter } from '../services/queryRouter';
import type { QueryResult } from '../domain/query';
import { analytics } from '../services/analytics';

const QUICK_TEST_QUERIES = [
  { label: '✈️ 機場到弘大交通', q: '我要怎麼從仁川機場到弘大的住宿？', type: 'offline' },
  { label: '🏨 住宿地址與門牌', q: '我的住宿地址是什麼？', type: 'offline' },
  { label: '⚠️ AREX 即時延誤？', q: 'AREX 現在有沒有延誤？', type: 'realtime' },
  { label: '🌤️ 現在首爾幾度？', q: '現在首爾幾度？', type: 'realtime' },
  { label: '📶 eSIM 沒訊號排錯', q: 'eSIM 沒有連上要先檢查什麼？', type: 'offline' },
  { label: '🏯 明天 Day2 行程', q: '明天行程有哪些景點？', type: 'offline' },
  { label: '☕ 聖水洞哪一站下車', q: '去聖水洞要在哪一站下車？', type: 'offline' },
  { label: '🗣️ 洗手間韓文怎麼說', q: '「請問洗手間在哪裡」韓文怎麼說？', type: 'offline' },
  { label: '🚨 韓國緊急電話', q: '韓國緊急電話是多少？', type: 'offline' },
  { label: '🏛️ 景福宮歷史由來', q: '景福宮有什麼歷史？', type: 'offline' },
  { label: '🎫 幫我買 BTS 門票', q: '幫我買 BTS 演唱會門票', type: 'fallback' },
];

export const CompanionPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    connectionState,
    setConnectionState,
    pendingQueries,
    addPendingQuery,
    removePendingQuery,
  } = useAppStore();

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<QueryResult[]>([
    {
      query_id: 'welcome-001',
      raw_query: '系統歡迎語',
      category: 'personal',
      mode: 'offline_local',
      answer:
        '您好 Anna！歡迎抵達首爾仁川國際機場 🇰🇷\n目前偵測您處於【離線保護模式】。您下載的首爾 5 日守護包已全數就緒，隨時為您解答 AREX 機場快線、弘大住宿門牌、行程路線與 eSIM 啟用排錯！',
      sources: [],
      timestamp: new Date().toISOString(),
      latency_ms: 1,
      confidence: 'high',
      requires_network: false,
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = async (queryText: string) => {
    if (!queryText.trim() || loading) return;
    setLoading(true);

    analytics.track('query_submitted', {
      query: queryText,
      connection_state: connectionState,
    });

    try {
      const res = await queryRouter.route(
        queryText,
        connectionState,
        (pending) => addPendingQuery(pending)
      );

      setMessages((prev) => [...prev, res]);

      analytics.track('query_answered', {
        mode: res.mode,
        category: res.category,
        latency_ms: res.latency_ms,
        confidence: res.confidence,
        result_count: res.sources.length,
      });
    } catch (e) {
      console.error('Error handling query', e);
    } finally {
      setLoading(false);
      setInputQuery('');
    }
  };

  const handleResolvePending = async (pendingQueryId: string, rawQuery: string) => {
    removePendingQuery(pendingQueryId);
    analytics.track('online_refresh_completed', { query_id: pendingQueryId });
    await handleSubmit(rawQuery);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7FB] overflow-hidden relative">
      <ChicHeader subtitle="Offline AI Travel Companion・首爾守護中" />

      {/* Network & Scenario Control Bar */}
      <div className="px-4 py-2 bg-white border-b border-slate-200/90 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              connectionState === 'offline'
                ? 'bg-[#E0F4FC] text-[#00AEEF]'
                : 'bg-[#E6F9F0] text-[#18B46B]'
            }`}
          >
            {connectionState === 'offline' ? (
              <WifiOff className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Wifi className="w-4 h-4 stroke-[2.5]" />
            )}
          </div>
          <div>
            <div className="font-extrabold text-xs text-[#171B28] flex items-center gap-1.5">
              <span>{connectionState === 'offline' ? '離線保護模式' : '線上即時模式'}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#F4F7FB] text-[#143D5C] border border-slate-200">
                Seoul Pack v1.0
              </span>
            </div>
            <div className="text-[11px] text-[#64748B] font-medium">
              {connectionState === 'offline'
                ? '仁川機場落地未連網・完全使用本機守護包'
                : '已連上網路・支援最新天氣與列車延誤'}
            </div>
          </div>
        </div>

        {/* Quick killer scenario toggle button */}
        <button
          type="button"
          onClick={() =>
            setConnectionState(connectionState === 'offline' ? 'online' : 'offline')
          }
          className="text-xs px-3 py-1.5 rounded-xl border font-bold transition cursor-pointer flex items-center gap-1.5 bg-[#F4F7FB] hover:bg-slate-200 border-slate-200 text-[#143D5C]"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#00AEEF]" />
          <span>切換為 {connectionState === 'offline' ? 'Online' : 'Offline'}</span>
        </button>
      </div>

      {/* Pending Real-time Queries Notice (When items queued) */}
      {pendingQueries.length > 0 && (
        <div className="p-3 bg-[#FEF3C7]/80 border-b border-[#F59E0B]/40 shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black text-[#D97706] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>待連線即時問題清單 ({pendingQueries.length} 題佇列中)</span>
            </span>
            {connectionState === 'online' && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#18B46B] text-white">
                網路已恢復・可一鍵更新
              </span>
            )}
          </div>
          <div className="space-y-1.5">
            {pendingQueries.map((pq) => (
              <div
                key={pq.query_id}
                className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-white border border-[#F59E0B]/30 text-xs shadow-2xs"
              >
                <span className="text-[#171B28] font-medium truncate">
                  「{pq.raw_query}」
                </span>
                {connectionState === 'online' ? (
                  <button
                    type="button"
                    onClick={() => handleResolvePending(pq.query_id, pq.raw_query)}
                    className="px-2.5 py-1 rounded-xl bg-[#00AEEF] hover:bg-[#009bd6] text-white font-bold text-xs shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>取得最新即時資訊</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-[#D97706] font-bold shrink-0">
                    等待恢復 Online...
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={msg.query_id || index} className="space-y-2">
            {/* User query bubble */}
            {msg.raw_query !== '系統歡迎語' && (
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-3xl rounded-tr-sm px-4 py-2.5 bg-[#00AEEF] text-white text-xs font-bold shadow-sm leading-relaxed">
                  {msg.raw_query}
                </div>
              </div>
            )}

            {/* AI Response Card (Bright, crisp chicTrip aesthetic) */}
            <div className="flex justify-start">
              <div className="max-w-[95%] rounded-3xl rounded-tl-sm p-4 bg-white border border-slate-200 shadow-sm text-xs">
                {/* Header with status badge & latency */}
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
                  <FreshnessBadge mode={msg.mode} />
                  <span className="text-[10px] text-[#64748B] font-mono font-bold">
                    {msg.latency_ms} ms
                  </span>
                </div>

                {/* Answer Content */}
                <p className="text-[#171B28] leading-relaxed whitespace-pre-line text-xs font-normal">
                  {msg.answer}
                </p>

                {/* Source citations */}
                <SourceCard sources={msg.sources} mode={msg.mode} />
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl p-3 bg-white border border-slate-200 text-xs text-[#00AEEF] font-bold flex items-center gap-2 shadow-2xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>本機離線守護包高速檢索中...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Test Chips */}
      <div className="px-3 py-2 bg-white border-t border-slate-200 shrink-0">
        <div className="text-[11px] text-[#64748B] font-bold mb-1.5 flex items-center justify-between px-1">
          <span className="flex items-center gap-1 text-[#143D5C]">
            <Sparkles className="w-3.5 h-3.5 text-[#00AEEF]" />
            <span>90 秒黑客松檢測題（點擊即發問）：</span>
          </span>
          <span className="text-[10px] text-[#00AEEF] font-mono font-extrabold">
            8 離線 + 2 即時
          </span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {QUICK_TEST_QUERIES.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSubmit(item.q)}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap border transition font-bold cursor-pointer ${
                item.type === 'realtime'
                  ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                  : item.type === 'fallback'
                  ? 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                  : 'bg-[#F4F7FB] text-[#143D5C] border-slate-200 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-white border-t border-slate-200 shrink-0 flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(inputQuery)}
          placeholder={
            connectionState === 'offline'
              ? '離線模式：詢問首爾住宿、AREX 交通、eSIM 排錯...'
              : '線上模式：詢問即時天氣、列車延誤或行程資訊...'
          }
          className="flex-1 bg-[#F4F7FB] border border-slate-200 rounded-2xl px-4 py-3 text-xs text-[#171B28] placeholder-[#94A3B8] focus:outline-none focus:border-[#00AEEF] focus:bg-white transition"
        />
        <button
          type="button"
          onClick={() => handleSubmit(inputQuery)}
          disabled={!inputQuery.trim() || loading}
          className="w-11 h-11 rounded-2xl bg-[#00AEEF] hover:bg-[#009bd6] disabled:opacity-40 disabled:pointer-events-none text-white transition flex items-center justify-center cursor-pointer shrink-0 shadow-xs"
        >
          <Send className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Bottom CTA to next funnel step */}
      <div className="px-4 py-2.5 bg-[#F4F7FB] border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
        <span className="text-[11px] text-[#64748B] font-medium">旅程結束後：</span>
        <button
          type="button"
          onClick={() => navigate('/share')}
          className="px-3.5 py-1.5 rounded-xl bg-[#171B28] hover:bg-slate-800 text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span>生成旅後 AI Travel Card (進入分享閉環)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
