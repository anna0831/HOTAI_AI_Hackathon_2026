import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles } from 'lucide-react';

interface ChicHeaderProps {
  subtitle?: string;
  showBack?: boolean;
}

export const ChicHeader: React.FC<ChicHeaderProps> = ({ subtitle }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-100 px-4 py-3 sticky top-0 z-30 shadow-xs">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 text-left cursor-pointer group"
        >
          {/* chicTrip stylized mascot / icon badge */}
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#00AEEF] to-[#38BDF8] flex items-center justify-center text-white shadow-sm shadow-[#00AEEF]/30 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-base tracking-tight text-[#171B28]">
                去趣
              </span>
              <span className="font-bold text-sm tracking-tight text-[#00AEEF]">
                chicTrip
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#FFC400]/20 text-[#171B28] font-bold">
                eSIM
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] mt-0.5 font-medium">
              {subtitle || 'AI 旅程規劃 × 離線守護包'}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F4F7FB] border border-slate-200 text-[#143D5C] text-[11px] font-semibold">
            <Sparkles className="w-3 h-3 text-[#00AEEF]" />
            <span>2026 和泰 AI 黑客松</span>
          </span>
        </div>
      </div>
    </header>
  );
};
