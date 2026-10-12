import React, { useState } from 'react';
import { Route, MapPin, Clock, Maximize2 } from 'lucide-react';
import type { ItineraryItem } from '../domain/trip';
import { ImagePlaceholder } from './ImagePlaceholder';
import { ImageLightbox } from './ImageLightbox';

interface RouteViewerProps {
  dayNumber: number;
  routeImagePath: string;
  routeTitle: string;
  routeAltText: string;
  items: ItineraryItem[];
}

export const RouteViewer: React.FC<RouteViewerProps> = ({
  dayNumber,
  routeImagePath,
  routeTitle,
  routeAltText,
  items,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="space-y-3">
      {/* Route Map Image Container */}
      <div className="relative border border-slate-200/90 rounded-none bg-slate-50 overflow-hidden shadow-2xs">
        {imageError ? (
          <ImagePlaceholder
            aspectRatio="16/9"
            title="路線圖片準備中"
            subtitle={`放置路線圖於 ${routeImagePath} 即可自動載入完整地圖`}
            iconType="route"
            badge={`Day ${dayNumber} 路線預覽`}
          />
        ) : (
          <div
            className="group relative cursor-pointer aspect-[16/9] bg-[#143D5C]/5 flex items-center justify-center overflow-hidden"
            onClick={() => setIsLightboxOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsLightboxOpen(true);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`放大檢視 Day ${dayNumber} 路線圖`}
          >
            <img
              src={routeImagePath}
              alt={routeAltText}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-contain group-hover:scale-[1.01] transition-transform duration-300 select-none p-1"
            />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
              <span className="px-3 py-1.5 bg-[#171B28]/90 text-xs font-bold rounded-none flex items-center gap-1.5 shadow-md">
                <Maximize2 className="w-3.5 h-3.5 text-[#00AEEF]" />
                點擊放大完整路線圖
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Daily Itinerary Timeline / Order Sequence */}
      <div className="bg-[#F4F7FB] border border-slate-200/90 p-3 rounded-none">
        <div className="flex items-center gap-1.5 text-xs font-black text-[#171B28] mb-2.5">
          <Route className="w-3.5 h-3.5 text-[#00AEEF] stroke-[2.5]" />
          <span>當日行程順序與交通節點 ({items.length} 站)</span>
        </div>

        <div className="space-y-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <div key={item.id} className="relative flex items-start gap-2.5">
                {/* Connecting Line */}
                {!isLast && (
                  <div className="absolute left-3 top-5 bottom-0 w-0.5 bg-slate-300" />
                )}

                {/* Step Number Dot */}
                <div className="relative z-10 w-6 h-6 rounded-full bg-[#143D5C] text-white text-[10px] font-bold font-mono flex items-center justify-center shrink-0 shadow-2xs">
                  {index + 1}
                </div>

                {/* Step Details */}
                <div className="flex-1 min-w-0 bg-white p-2.5 border border-slate-200/80 rounded-none shadow-2xs">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-extrabold text-xs text-[#171B28] truncate">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#00AEEF] font-bold shrink-0 flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {item.time}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#64748B] flex items-center gap-1 font-medium truncate">
                    <MapPin className="w-3 h-3 text-[#FF8614] shrink-0" />
                    <span>{item.location}</span>
                  </div>

                  {item.note && (
                    <div className="text-[10px] text-slate-500 mt-1 pt-1 border-t border-slate-100 font-normal">
                      {item.note}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {!imageError && (
        <ImageLightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          imageSrc={routeImagePath}
          altText={routeAltText}
          title={`Day ${dayNumber}・${routeTitle}`}
          subtitle={`行程規劃：${items.map((i) => i.title).join(' → ')}`}
          credit="去趣 chicTrip 官方規劃路線"
        />
      )}
    </div>
  );
};
