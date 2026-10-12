import React, { useEffect, useState, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  altText: string;
  title: string;
  subtitle?: string;
  credit?: string;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  imageSrc,
  altText,
  title,
  subtitle,
  credit,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleClose = useCallback(() => {
    setZoomLevel(1);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((prev) => Math.min(2.5, prev + 0.5));
      } else if (e.key === '-') {
        setZoomLevel((prev) => Math.max(1, prev - 0.5));
      } else if (e.key === '0') {
        setZoomLevel(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleToggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.6 : prev === 1.6 ? 2.2 : 1));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={handleClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#171B28] border border-slate-700/80 rounded-none shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#143D5C]/95 border-b border-slate-700/60 text-white">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="w-2 h-2 rounded-full bg-[#00AEEF]" />
            <h4
              id="lightbox-title"
              className="text-xs sm:text-sm font-black truncate tracking-tight text-white"
            >
              {title}
            </h4>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Zoom Controls */}
            <div className="inline-flex items-center bg-slate-800/90 rounded-none border border-slate-700 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setZoomLevel((prev) => Math.max(1, prev - 0.5))}
                disabled={zoomLevel <= 1}
                aria-label="縮小"
                className="p-1 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleToggleZoom}
                className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#00AEEF] hover:text-white cursor-pointer"
                title="點擊切換縮放倍率"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((prev) => Math.min(2.5, prev + 0.5))}
                disabled={zoomLevel >= 2.5}
                aria-label="放大"
                className="p-1 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              {zoomLevel > 1 && (
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  aria-label="重設比例"
                  className="p-1 text-slate-400 hover:text-white cursor-pointer border-l border-slate-700 ml-0.5"
                  title="還原 100%"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="關閉檢視"
              className="w-7 h-7 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image Display Area with Scrollable Zoom & Object-Contain */}
        <div
          className={`relative flex-1 bg-black flex items-center justify-center min-h-[260px] max-h-[70vh] p-2 sm:p-4 select-none ${
            zoomLevel > 1 ? 'overflow-auto cursor-zoom-out' : 'overflow-hidden cursor-zoom-in'
          }`}
          onClick={handleToggleZoom}
          title={zoomLevel > 1 ? '點擊還原 100%' : '點擊放大圖片細節'}
        >
          <img
            src={imageSrc}
            alt={altText}
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: 'transform 200ms ease-out',
            }}
            className="max-w-full max-h-[66vh] object-contain shrink-0"
            loading="eager"
          />
        </div>

        {/* Bottom Details Footer */}
        <div className="px-4 py-2.5 bg-[#171B28] border-t border-slate-800 text-slate-300 text-xs flex flex-col gap-1">
          {subtitle && (
            <p className="text-xs text-slate-200 font-medium leading-relaxed truncate sm:text-clip">
              {subtitle}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2 font-mono">
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3 text-[#00AEEF]" />
              {altText}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 hidden sm:inline">
                支援鍵盤 + / - / 0 縮放，點擊切換倍率
              </span>
              {credit && <span className="text-slate-500">來源：{credit}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

