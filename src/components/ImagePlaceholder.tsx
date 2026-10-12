import React from 'react';
import { ImageOff, Map, Compass, Route } from 'lucide-react';

interface ImagePlaceholderProps {
  aspectRatio?: '16/9' | '4/3' | 'square' | 'auto';
  title?: string;
  subtitle?: string;
  iconType?: 'photo' | 'route' | 'map';
  className?: string;
  badge?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  aspectRatio = '16/9',
  title = '圖片準備中',
  subtitle = '待放入專案指定目錄即可自動顯示',
  iconType = 'photo',
  className = '',
  badge,
}) => {
  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : 'min-h-[140px]';

  const renderIcon = () => {
    switch (iconType) {
      case 'route':
        return <Route className="w-6 h-6 text-[#00AEEF] stroke-[2]" />;
      case 'map':
        return <Map className="w-6 h-6 text-[#143D5C] stroke-[2]" />;
      case 'photo':
      default:
        return <ImageOff className="w-6 h-6 text-[#64748B] stroke-[2]" />;
    }
  };

  return (
    <div
      className={`relative w-full ${aspectClass} bg-gradient-to-br from-[#F4F7FB] via-white to-[#E0F4FC]/30 border border-dashed border-slate-300 flex flex-col items-center justify-center p-4 text-center select-none overflow-hidden ${className}`}
      role="img"
      aria-label={title}
    >
      {badge && (
        <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 bg-white/90 text-[#00AEEF] border border-[#00AEEF]/20 rounded-none shadow-2xs">
          {badge}
        </span>
      )}

      <div className="w-10 h-10 rounded-full bg-white shadow-2xs border border-slate-200/90 flex items-center justify-center mb-2">
        {renderIcon()}
      </div>

      <div className="text-xs font-black text-[#171B28] tracking-tight mb-0.5">
        {title}
      </div>

      {subtitle && (
        <div className="text-[11px] text-[#64748B] font-medium max-w-[260px] leading-relaxed">
          {subtitle}
        </div>
      )}

      <div className="mt-2 text-[10px] text-[#00AEEF] font-mono font-semibold flex items-center gap-1">
        <Compass className="w-3 h-3 stroke-[2.5]" />
        <span>去趣離線保護系統・預設安全佔位</span>
      </div>
    </div>
  );
};
