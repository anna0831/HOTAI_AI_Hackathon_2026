import React from 'react';
import { Wifi, WifiOff, Activity } from 'lucide-react';
import { useAppStore } from '../app/store';
import type { ConnectionState } from '../domain/query';

export const ConnectionStatus: React.FC = () => {
  const { connectionState, setConnectionState } = useAppStore();

  const states: { id: ConnectionState; label: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'online',
      label: '4G/5G 線上',
      icon: <Wifi className="w-3.5 h-3.5" />,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20',
    },
    {
      id: 'poor_connection',
      label: '弱網 (機場/地下街)',
      icon: <Activity className="w-3.5 h-3.5" />,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20',
    },
    {
      id: 'offline',
      label: '離線保護模式',
      icon: <WifiOff className="w-3.5 h-3.5" />,
      color: 'bg-sky-500/10 text-sky-300 border-sky-500/30 hover:bg-sky-500/20',
    },
  ];

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-slate-800 text-xs backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="text-slate-400 font-medium hidden sm:inline">網路環境模擬：</span>
        <div className="inline-flex rounded-lg p-0.5 bg-slate-950 border border-slate-800">
          {states.map((s) => {
            const active = connectionState === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setConnectionState(s.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium text-xs ${
                  active
                    ? `${s.color} border shadow-sm font-semibold`
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                {s.icon}
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
        <span
          className={`w-2 h-2 rounded-full ${
            connectionState === 'online'
              ? 'bg-emerald-500 animate-pulse'
              : connectionState === 'poor_connection'
              ? 'bg-amber-500 animate-ping'
              : 'bg-sky-400'
          }`}
        />
        <span className="font-mono">
          {connectionState === 'offline' ? 'OFFLINE (本機保護)' : connectionState === 'poor_connection' ? 'POOR NET' : 'ONLINE'}
        </span>
      </div>
    </div>
  );
};
