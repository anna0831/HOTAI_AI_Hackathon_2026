import React, { useState } from 'react';
import { MapPin, Clock, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import type { ExperienceTwin, TwinType } from '../domain/twin';

interface ExperienceTwinPanelProps {
  /** 要顯示的備案清單（空陣列時不渲染面板） */
  twins: ExperienceTwin[];
  /**
   * 可選的日次過濾：只顯示指定 Day 的備案
   * undefined = 顯示全部備案
   */
  dayNumber?: number;
}

// ─── 備案類型標籤配色（沿用現有 chicTrip 調色盤）───
const TYPE_CONFIG: Record<TwinType, { label: string; bg: string; text: string; border: string; icon: React.ReactNode }> = {
  place_alternative: {
    label: '地點替代',
    bg: 'bg-[#E0F4FC]',
    text: 'text-[#00AEEF]',
    border: 'border-[#00AEEF]/30',
    icon: <MapPin className="w-3 h-3 shrink-0" />,
  },
  time_alternative: {
    label: '時段替代',
    bg: 'bg-[#FEF3C7]',
    text: 'text-[#D97706]',
    border: 'border-[#D97706]/30',
    icon: <Clock className="w-3 h-3 shrink-0" />,
  },
};

// ─── 單一備案卡片 ───
const TwinCard: React.FC<{ twin: ExperienceTwin }> = ({ twin }) => {
  const cfg = TYPE_CONFIG[twin.type];

  return (
    <div className="p-3 rounded-none bg-white border border-slate-200/80 shadow-2xs text-xs space-y-2">
      {/* 卡頭：備案名稱 + 類型標籤 */}
      <div className="flex items-start justify-between gap-2">
        <span className="font-extrabold text-[#171B28] leading-snug">{twin.name}</span>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-none font-bold shrink-0 border ${cfg.bg} ${cfg.text} ${cfg.border}`}
        >
          {cfg.icon}
          {cfg.label}
        </span>
      </div>

      {/* 對應原景點 */}
      <div className="text-[11px] text-[#64748B] font-medium">
        原行程景點：
        <span className="text-[#143D5C] font-bold">{twin.source_item_title}</span>
      </div>

      {/* 推薦理由 */}
      <p className="text-[#171B28] leading-relaxed">{twin.reason}</p>

      {/* 地點（地點替代） */}
      {twin.location && (
        <div className="flex items-center gap-1.5 text-[#143D5C] font-semibold">
          <MapPin className="w-3 h-3 text-[#00AEEF] shrink-0" />
          <span>{twin.location}</span>
        </div>
      )}

      {/* 建議時段（時段替代） */}
      {twin.suggested_time && (
        <div className="flex items-center gap-1.5 text-[#D97706] font-semibold">
          <Clock className="w-3 h-3 shrink-0" />
          <span>建議改至 {twin.suggested_time} 前後</span>
        </div>
      )}

      {/* 體驗標籤 */}
      <div className="flex flex-wrap gap-1">
        {twin.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-none text-[10px] font-bold bg-[#F4F7FB] text-[#143D5C] border border-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 離線免責聲明 */}
      <p className="text-[10px] text-[#94A3B8] leading-relaxed border-t border-slate-100 pt-2 italic">
        🔸 {twin.offline_note}
      </p>
    </div>
  );
};

// ─── Experience Twin 面板（折疊式）───
export const ExperienceTwinPanel: React.FC<ExperienceTwinPanelProps> = ({
  twins,
  dayNumber,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // 根據 dayNumber 過濾（無 dayNumber 顯示全部）
  const displayTwins = dayNumber !== undefined
    ? twins.filter((t) => t.source_item_id.startsWith(`item-${dayNumber}-`))
    : twins;

  // 無備案時不渲染
  if (displayTwins.length === 0) return null;

  const placeCount = displayTwins.filter((t) => t.type === 'place_alternative').length;
  const timeCount = displayTwins.filter((t) => t.type === 'time_alternative').length;

  return (
    <div
      id="experience-twin-panel"
      className="rounded-none bg-white border border-slate-200/90 shadow-sm overflow-hidden"
    >
      {/* 折疊標題列 */}
      <button
        type="button"
        id="experience-twin-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-[#F4F7FB] transition-colors cursor-pointer text-left"
        aria-expanded={isOpen}
        aria-controls="experience-twin-content"
      >
        <div className="flex items-center gap-2.5 text-left min-w-0 flex-1">
          {/* 圖示 */}
          <div className="w-8 h-8 rounded-none bg-gradient-to-br from-[#E0F4FC] to-[#FEF3C7] flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4 text-[#143D5C]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="font-black text-sm text-[#171B28] flex items-center gap-2 flex-wrap">
              <span>Experience Twin・體驗備案</span>
              {/* 備案數量 badge */}
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-none bg-[#171B28] text-white shrink-0">
                {displayTwins.length} 個備案
              </span>
            </div>
            <div className="text-[11px] text-[#64748B] font-medium mt-0.5 flex items-center gap-2 flex-wrap">
              {placeCount > 0 && (
                <span className="flex items-center gap-0.5 text-[#00AEEF] font-bold">
                  <MapPin className="w-2.5 h-2.5" />
                  地點替代 {placeCount}
                </span>
              )}
              {timeCount > 0 && (
                <span className="flex items-center gap-0.5 text-[#D97706] font-bold">
                  <Clock className="w-2.5 h-2.5" />
                  時段替代 {timeCount}
                </span>
              )}
              <span className="text-[#94A3B8]">・行前預算・離線可查</span>
            </div>
          </div>
        </div>

        {/* 展開/收起箭頭 */}
        <div className="shrink-0 text-[#64748B] ml-2">
          {isOpen
            ? <ChevronUp className="w-4 h-4" />
            : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* 備案卡片清單（折疊主體） */}
      {isOpen && (
        <div
          id="experience-twin-content"
          className="px-4 pb-4 space-y-2.5 border-t border-slate-100"
        >
          {/* 說明橫幅 */}
          <div className="pt-3 pb-1 text-[11px] text-[#64748B] font-medium leading-relaxed">
            以下備案為行前網路連線時預先計算，離線旅途中可以直接查看。恢復連線後可以更新備案。
          </div>

          {displayTwins.map((twin) => (
            <TwinCard key={twin.twin_id} twin={twin} />
          ))}
        </div>
      )}
    </div>
  );
};
