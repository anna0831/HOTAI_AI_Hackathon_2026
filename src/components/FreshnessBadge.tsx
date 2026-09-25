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
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#E0F4FC] text-[#00AEEF] border border-[#00AEEF]/30 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00AEEF] stroke-[2.5]" />
          <span>離線旅程包（本機檢索）</span>
        </span>
      );
    case 'online_live':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#E6F9F0] text-[#18B46B] border border-[#18B46B]/30 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#18B46B]" />
          <span>最新即時動態（Live API）</span>
        </span>
      );
    case 'queued':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/30 shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-[#D97706]" />
          <span>待連線佇列中（時效保護・不瞎答）</span>
        </span>
      );
    case 'not_found':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#F1F5F9] text-[#64748B] border border-slate-200">
          <AlertCircle className="w-3.5 h-3.5 text-[#64748B]" />
          <span>旅程包未收錄（誠實防幻覺）</span>
        </span>
      );
  }
};
