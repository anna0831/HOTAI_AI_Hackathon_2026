import React from 'react';
import { ShieldCheck, Sparkles, Clock, AlertCircle } from 'lucide-react';
import type { AnswerMode } from '../domain/query';

interface FreshnessBadgeProps {
  mode: AnswerMode;
}

export const FreshnessBadge: React.FC<FreshnessBadgeProps> = ({ mode }) => {
  switch (mode) {
    case 'offline_local':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-sky-500/10 text-sky-400 border border-sky-500/30">
          <ShieldCheck className="w-3 h-3 text-sky-400" />
          <span>已使用離線旅程包 (本機檢索)</span>
        </span>
      );
    case 'online_live':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>已取得最新即時資訊 (Live Adapter)</span>
        </span>
      );
    case 'queued':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>等待連線中 (即時問題安全攔截)</span>
        </span>
      );
    case 'not_found':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-700/50 text-slate-300 border border-slate-600">
          <AlertCircle className="w-3 h-3 text-slate-400" />
          <span>離線包中無資料 (防幻覺退避)</span>
        </span>
      );
  }
};
