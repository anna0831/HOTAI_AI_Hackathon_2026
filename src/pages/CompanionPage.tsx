import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Sparkles,
  RefreshCw,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useAppStore } from '../app/store';
import { queryRouter } from '../services/queryRouter';
import type { QueryResult } from '../domain/query';
import { FreshnessBadge } from '../components/FreshnessBadge';
import { SourceCard } from '../components/SourceCard';
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
  const [messages, setMessages] = useState<QueryResult[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with the killer scenario welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          query_id: 'welcome-001',
          raw_query: '系統歡迎語',
          category: 'personal',
          mode: 'offline_local',
          answer:
            '您好 Anna！歡迎抵達首爾仁川國際機場。\n目前偵測您處於【離線保護模式】。您下載的首爾 5 日守護包已全數載入本機，隨時為您解答機場交通、住宿門牌、行程路線與 eSIM 啟用排錯！',
          sources: [],
          timestamp: new Date().toISOString(),
          latency_ms: 1,
          confidence: 'high',
          requires_network: false,
        },
      ]);
    }
  }, []);

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

  // Re-run pending real-time queries when reconnecting
  const handleResolvePending = async (pendingQueryId: string, rawQuery: string) => {
    removePendingQuery(pendingQueryId);
    analytics.track('online_refresh_completed', { query_id: pendingQueryId });
    await handleSubmit(rawQuery);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-hidden relative">
      {/* Top Header / Mode Indicator */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs text-white flex items-center gap-1.5">
              <span>去趣 AI Travel Companion</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono">
                Seoul Pack v1.0
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              {connectionState === 'offline'
                ? '已啟動離線保護・零網路環境本機運作'
                : '線上模式・支援即時動態查詢'}
            </div>
          </div>
        </div>

        {/* Quick killer scenario toggle */}
        <button
          type="button"
          onClick={() => setConnectionState(connectionState === 'offline' ? 'online' : 'offline')}
          className="text-[11px] px-2.5 py-1 rounded-lg border font-medium transition cursor-pointer flex items-center gap-1 bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
        >
          <RefreshCw className="w-3 h-3 text-sky-400" />
          <span>切換至 {connectionState === 'offline' ? 'Online' : 'Offline'}</span>
        </button>
      </div>

      {/* Pending Real-time Queries Notice (When back Online or when items queued) */}
      {pendingQueries.length > 0 && (
        <div className="p-3 bg-amber-950/70 border-b border-amber-500/40 shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>待連線即時問題清單 ({pendingQueries.length})</span>
            </span>
            {connectionState === 'online' && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                網路已恢復・可一鍵更新
              </span>
            )}
          </div>
          <div className="space-y-1.5">
            {pendingQueries.map((pq) => (
              <div
                key={pq.query_id}
                className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-900/90 border border-amber-500/30 text-xs"
              >
                <span className="text-slate-300 truncate">「{pq.raw_query}」</span>
                {connectionState === 'online' ? (
                  <button
                    type="button"
                    onClick={() => handleResolvePending(pq.query_id, pq.raw_query)}
                    className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium text-[11px] shrink-0 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>取得最新即時資訊</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-amber-400/80 font-mono shrink-0">
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
            {/* User query pill (if not system welcome) */}
            {msg.raw_query !== '系統歡迎語' && (
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm px-3.5 py-2 bg-blue-600 text-white text-xs font-medium shadow">
                  {msg.raw_query}
                </div>
              </div>
            )}

            {/* AI Response Card */}
            <div className="flex justify-start">
              <div className="max-w-[95%] rounded-2xl rounded-tl-sm p-3.5 bg-slate-900 border border-slate-800 text-xs shadow-md">
                {/* Status Badge & Latency */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <FreshnessBadge mode={msg.mode} />
                  <span className="text-[10px] text-slate-500 font-mono">
                    {msg.latency_ms} ms
                  </span>
                </div>

                {/* Answer text */}
                <p className="text-slate-200 leading-relaxed whitespace-pre-line text-xs font-normal">
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
            <div className="rounded-2xl rounded-tl-sm p-3 bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
              <span>本機離線守護包高速檢索中...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Question Chips */}
      <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800/80 shrink-0">
        <div className="text-[10px] text-slate-400 font-semibold mb-1 flex items-center justify-between">
          <span>🎯 黑客松 90 秒驗收測試題（點擊發問）：</span>
          <span className="text-[10px] text-sky-400 font-mono">8 離線 + 2 即時</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {QUICK_TEST_QUERIES.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSubmit(item.q)}
              className={`px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap border transition font-medium cursor-pointer ${
                item.type === 'realtime'
                  ? 'bg-amber-950/40 text-amber-300 border-amber-600/40 hover:bg-amber-900/50'
                  : item.type === 'fallback'
                  ? 'bg-rose-950/30 text-rose-300 border-rose-700/40 hover:bg-rose-900/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 shrink-0 flex items-center gap-2">
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
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
        />
        <button
          type="button"
          onClick={() => handleSubmit(inputQuery)}
          disabled={!inputQuery.trim() || loading}
          className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:pointer-events-none text-white transition cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom CTA to next funnel step */}
      <div className="px-3 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs shrink-0">
        <span className="text-[11px] text-slate-400">第五天旅程結束：</span>
        <button
          type="button"
          onClick={() => navigate('/share')}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-bold flex items-center gap-1 border border-slate-700"
        >
          <span>生成旅後 AI Travel Card (進入分享閉環)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
