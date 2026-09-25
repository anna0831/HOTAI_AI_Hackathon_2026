import React from 'react';
import { Database, Clock, Award } from 'lucide-react';
import type { SourcePassage } from '../domain/query';

interface SourceCardProps {
  sources: SourcePassage[];
  mode?: string;
}

export const SourceCard: React.FC<SourceCardProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-3 pt-2.5 border-t border-slate-200/80 text-xs">
      <div className="flex items-center gap-1.5 text-[#143D5C] font-bold mb-2">
        <Database className="w-3.5 h-3.5 text-[#00AEEF]" />
        <span>資料來源依據 ({sources.length} 則段落命中)：</span>
      </div>
      <div className="space-y-2">
        {sources.map((src, idx) => (
          <div
            key={src.id || idx}
            className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs text-[#171B28]"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-bold text-[#143D5C] text-xs truncate">
                {src.title}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E0F4FC] text-[#00AEEF] font-bold shrink-0">
                {src.source_label}
              </span>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
              {src.snippet}
            </p>
            <div className="flex items-center justify-between mt-1.5 text-[10px] text-[#64748B]">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                同步時間：{new Date(src.updated_at).toLocaleDateString()}
              </span>
              {src.score > 1 && (
                <span className="flex items-center gap-1 text-[#00AEEF] font-bold">
                  <Award className="w-3 h-3" />
                  關聯度分：{src.score}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
