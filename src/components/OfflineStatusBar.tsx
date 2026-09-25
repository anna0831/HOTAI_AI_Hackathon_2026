import React from 'react';
import { Wifi, WifiOff, Activity } from 'lucide-react';
import { useAppStore } from '../app/store';
import type { ConnectionState } from '../domain/query';

export const OfflineStatusBar: React.FC = () => {
  const { connectionState, setConnectionState } = useAppStore();

  const states: { id: ConnectionState; label: string; icon: React.ReactNode; activeClass: string }[] = [
    {
      id: 'online',
      label: '4G/5G 線上',
      icon: <Wifi className="w-3.5 h-3.5" />,
      activeClass: 'bg-[#E6F9F0] text-[#18B46B] border-[#18B46B]/50 font-bold shadow-xs',
    },
    {
      id: 'poor_connection',
      label: '弱網 (機場/地下街)',
      icon: <Activity className="w-3.5 h-3.5" />,
      activeClass: 'bg-[#FEF3C7] text-[#D97706] border-[#D97706]/50 font-bold shadow-xs',
    },
    {
      id: 'offline',
      label: '離線保護模式',
      icon: <WifiOff className="w-3.5 h-3.5" />,
      activeClass: 'bg-[#E0F4FC] text-[#00AEEF] border-[#00AEEF]/50 font-bold shadow-xs',
    },
  ];

  return (
    <div className="bg-white/95 border-b border-slate-200/80 px-3 py-2 text-xs backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[#64748B] font-semibold hidden sm:inline text-[11px]">
            網路環境模擬：
          </span>
          <div className="inline-flex rounded-xl p-1 bg-[#F4F7FB] border border-slate-200">
            {states.map((s) => {
              const active = connectionState === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setConnectionState(s.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all text-xs cursor-pointer ${
                    active
                      ? `${s.activeClass} border`
                      : 'text-[#64748B] hover:text-[#171B28] hover:bg-white/70 border border-transparent font-medium'
                  }`}
                >
                  {s.icon}
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#143D5C] bg-[#F4F7FB] px-2.5 py-1 rounded-full border border-slate-200">
          <span
            className={`w-2 h-2 rounded-full ${
              connectionState === 'online'
                ? 'bg-[#18B46B] animate-pulse'
                : connectionState === 'poor_connection'
                ? 'bg-[#D97706] animate-ping'
                : 'bg-[#00AEEF]'
            }`}
          />
          <span className="font-mono text-[10px]">
            {connectionState === 'offline'
              ? '離線保護 (本機運作)'
              : connectionState === 'poor_connection'
              ? 'POOR NET (弱網)'
              : 'ONLINE (即時連線)'}
          </span>
        </div>
      </div>
    </div>
  );
};
