import React, { useState } from 'react';
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Camera,
  Route,
  Sparkles,
} from 'lucide-react';
import type { ItineraryDay } from '../domain/trip';
import { getSeoulDayImages } from '../data/seoulImageManifest';
import { AttractionCarousel } from './AttractionCarousel';
import { RouteViewer } from './RouteViewer';
import { ImagePlaceholder } from './ImagePlaceholder';

interface SeoulItineraryCardProps {
  day: ItineraryDay;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const SeoulItineraryCard: React.FC<SeoulItineraryCardProps> = ({
  day,
  isExpanded,
  onToggleExpand,
}) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'route'>('photos');
  const [coverError, setCoverError] = useState(false);

  const imageConfig = getSeoulDayImages(day.day);

  return (
    <div
      className={`rounded-none bg-white border transition-all duration-200 overflow-hidden shadow-2xs ${
        isExpanded
          ? 'border-[#00AEEF] ring-1 ring-[#00AEEF]/20'
          : 'border-slate-200/90 hover:border-slate-300'
      }`}
    >
      {/* 16:9 Cover Photo */}
      <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden select-none border-b border-slate-100">
        {coverError ? (
          <ImagePlaceholder
            aspectRatio="16/9"
            title={`Day ${day.day} 封面：${imageConfig.coverImage.title}`}
            subtitle={imageConfig.coverImage.altText}
            badge={`Day ${day.day} 封面`}
          />
        ) : (
          <div className="relative w-full h-full group">
            <img
              src={imageConfig.coverImage.imagePath}
              alt={imageConfig.coverImage.altText}
              loading="lazy"
              onError={() => setCoverError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Dark gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#00AEEF] text-white text-[11px] font-black rounded-none shadow-sm">
                <span>DAY {day.day}</span>
                <span className="opacity-80">|</span>
                <span>{day.region}</span>
              </span>
              <span className="text-[11px] font-mono font-bold text-white/95 px-2 py-0.5 bg-black/50 backdrop-blur-xs rounded-none border border-white/20">
                {day.date}
              </span>
            </div>

            {/* Bottom Title on Image */}
            <div className="absolute bottom-2.5 left-3 right-3 text-white">
              <div className="text-[11px] font-semibold text-[#00AEEF] flex items-center gap-1 drop-shadow-xs">
                <Sparkles className="w-3 h-3" />
                <span>代表景點焦點</span>
              </div>
              <h4 className="text-sm font-black tracking-tight drop-shadow-sm truncate">
                {day.title}
              </h4>
            </div>
          </div>
        )}
      </div>

      {/* Card Basic Content */}
      <div className="p-3.5 space-y-2.5">
        {/* Day Summary & Region */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#00AEEF] text-white text-[11px] flex items-center justify-center font-bold font-mono shrink-0">
                {day.day}
              </span>
              <span className="font-extrabold text-[#171B28] text-xs sm:text-sm truncate">
                {day.title}
              </span>
            </div>
            <p className="text-[#64748B] text-xs font-medium pl-7 leading-relaxed">
              {day.summary}
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleExpand}
            className="flex items-center gap-1 text-[11px] font-bold text-[#00AEEF] hover:text-[#143D5C] bg-[#E0F4FC] hover:bg-[#E0F4FC]/80 px-2.5 py-1 rounded-none border border-[#00AEEF]/30 cursor-pointer shrink-0 transition-colors"
            aria-expanded={isExpanded}
            aria-controls={`day-${day.day}-details`}
          >
            <span>{isExpanded ? '收合詳情' : '展開詳情'}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Offline Pack Focus Badge */}
        <div className="text-[11px] px-2.5 py-1.5 rounded-none bg-[#F4F7FB] text-[#143D5C] border border-slate-200/90 flex items-center gap-2 font-semibold">
          <CheckCircle className="w-3.5 h-3.5 text-[#00AEEF] shrink-0 stroke-[2.5]" />
          <span className="truncate">
            守護包預載重點：{day.offline_pack_focus}
          </span>
        </div>

        {/* Expandable Section with Tabs */}
        {isExpanded && (
          <div
            id={`day-${day.day}-details`}
            className="pt-2.5 mt-2.5 border-t border-slate-100 space-y-3 animate-in fade-in duration-200"
          >
            {/* Two Tabs: 景點照片 vs 今日路線 */}
            <div
              className="flex border-b border-slate-200 bg-[#F4F7FB]/70 p-1 gap-1"
              role="tablist"
              aria-label={`Day ${day.day} 行程與路線切換`}
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'photos'}
                aria-controls={`tabpanel-${day.day}-photos`}
                id={`tab-${day.day}-photos`}
                onClick={() => setActiveTab('photos')}
                className={`flex-1 py-1.5 px-3 text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'photos'
                    ? 'bg-white text-[#00AEEF] shadow-2xs border-b-2 border-[#00AEEF]'
                    : 'text-[#64748B] hover:text-[#171B28] hover:bg-white/50'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>景點照片 ({imageConfig.attractions.length})</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'route'}
                aria-controls={`tabpanel-${day.day}-route`}
                id={`tab-${day.day}-route`}
                onClick={() => setActiveTab('route')}
                className={`flex-1 py-1.5 px-3 text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'route'
                    ? 'bg-white text-[#00AEEF] shadow-2xs border-b-2 border-[#00AEEF]'
                    : 'text-[#64748B] hover:text-[#171B28] hover:bg-white/50'
                }`}
              >
                <Route className="w-3.5 h-3.5" />
                <span>今日路線圖</span>
              </button>
            </div>

            {/* Tab 1: 景點照片 */}
            <div
              id={`tabpanel-${day.day}-photos`}
              role="tabpanel"
              aria-labelledby={`tab-${day.day}-photos`}
              hidden={activeTab !== 'photos'}
            >
              {activeTab === 'photos' && (
                <AttractionCarousel
                  attractions={imageConfig.attractions}
                  dayNumber={day.day}
                />
              )}
            </div>

            {/* Tab 2: 今日路線 */}
            <div
              id={`tabpanel-${day.day}-route`}
              role="tabpanel"
              aria-labelledby={`tab-${day.day}-route`}
              hidden={activeTab !== 'route'}
            >
              {activeTab === 'route' && (
                <RouteViewer
                  dayNumber={day.day}
                  routeImagePath={imageConfig.routeImage.imagePath}
                  routeTitle={imageConfig.routeImage.title}
                  routeAltText={imageConfig.routeImage.altText}
                  items={day.items}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
