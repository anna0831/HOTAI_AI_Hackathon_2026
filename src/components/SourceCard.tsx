import React from 'react';
import { Database, Clock, Award } from 'lucide-react';
import type { SourcePassage } from '../domain/query';

interface SourceCardProps {
  sources: SourcePassage[];
  mode: string;
}

export const SourceCard: React.FC<SourceCardProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-2.5 pt-2 border-t border-slate-700/60 text-xs">
      <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1.5">
        <Database className="w-3 h-3 text-sky-400" />
        <span>資料來源依據 ({sources.length} 則段落命中)</span>
      </div>
      <div className="space-y-1.5">
        {sources.map((src, idx) => (
          <div
            key={src.id || idx}
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-300"
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="font-medium text-sky-300 truncate">{src.title}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">
                {src.source_label}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
              {src.snippet}
            </p>
            <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                更新時間：{new Date(src.updated_at).toLocaleDateString()}
              </span>
              {src.score > 1 && (
                <span className="flex items-center gap-1 text-sky-400 font-mono">
                  <Award className="w-2.5 h-2.5" />
                  權重分：{src.score}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
