import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, CheckCircle2, ShieldCheck, Database, ArrowRight, HardDrive } from 'lucide-react';
import { useAppStore } from '../app/store';
import packManifest from '../data/pack_manifest.json';

export const PackBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const { packState, downloadPack, resetPack, setConnectionState } = useAppStore();

  const handleDownload = async () => {
    await downloadPack();
  };

  const handleEnterCompanion = () => {
    // When entering the companion killer demo, switch to offline mode automatically to highlight the scenario!
    setConnectionState('offline');
    navigate('/companion');
  };

  const sectionsList = [
    { id: 'itinerary', label: '首爾 5 日完整每日行程', desc: '各景點停留時間、順序與備用方案' },
    { id: 'transport', label: 'AREX 機場快線與地鐵指南', desc: '弘大/聖水站出口指示、轉乘要訣' },
    { id: 'places', label: '住宿與韓屋景點手冊', desc: '弘大 Cozy Stay 門牌、景福宮歷史導覽' },
    { id: 'esim_help', label: 'eSIM 啟用排錯作業標準', desc: 'APN 設定、漫遊檢查、無網自我修復' },
    { id: 'emergency', label: '海外緊急應變與求助電話', desc: '韓國 112、119、1330 觀光中文專線' },
    { id: 'phrases', label: '生存常用韓文短句庫', desc: '洗手間位置、點餐發音對照' },
  ];

  return (
    <div className="flex-1 flex flex-col p-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 overflow-y-auto">
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
            購買後專屬加值服務 (Killer Feature)
          </span>
          <span className="text-[10px] text-slate-400 font-mono">v{packManifest.version}</span>
        </div>
        <h2 className="text-lg font-bold text-white">
          {packManifest.title}
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          專為 Anna 首爾行打造・體積僅 {packManifest.size_kb} KB・一鍵快取至本機
        </p>
      </div>

      {/* Manifest Meta Box */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 mb-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 mb-0.5 flex items-center justify-center gap-1">
            <HardDrive className="w-3 h-3 text-sky-400" />
            <span>檔案大小</span>
          </div>
          <div className="font-bold text-white font-mono">{packManifest.size_kb} KB</div>
        </div>

        <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 mb-0.5 flex items-center justify-center gap-1">
            <Database className="w-3 h-3 text-blue-400" />
            <span>知識段落</span>
          </div>
          <div className="font-bold text-white font-mono">{packManifest.total_passages} 筆專屬段落</div>
        </div>

        <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 mb-0.5 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>有效期限</span>
          </div>
          <div className="font-bold text-white font-mono">2026/10/31</div>
        </div>
      </div>

      {/* Download Action Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/40 to-slate-900 border border-blue-500/30 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl ${packState.isDownloaded ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-600/20 text-blue-300'}`}>
              {packState.isDownloaded ? <CheckCircle2 className="w-5 h-5" /> : <Download className="w-5 h-5" />}
            </div>
            <div>
              <div className="font-bold text-xs text-white">
                {packState.isDownloaded ? '離線守護包已下載至手機本機' : '準備建立首爾離線守護包'}
              </div>
              <div className="text-[11px] text-slate-400">
                {packState.isDownloaded
                  ? `本機儲存就緒・無網環境可正常檢索`
                  : '寫入瀏覽器 Storage，斷網零受阻'}
              </div>
            </div>
          </div>

          {packState.isDownloaded && (
            <button
              type="button"
              onClick={resetPack}
              className="text-[10px] text-slate-400 hover:text-slate-200 underline"
            >
              重新下載
            </button>
          )}
        </div>

        {/* Progress bar */}
        {packState.downloadProgress > 0 && packState.downloadProgress < 100 && (
          <div className="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${packState.downloadProgress}%` }}
            />
          </div>
        )}

        {!packState.isDownloaded ? (
          <button
            type="button"
            onClick={handleDownload}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>立即下載守護包至本機 (680 KB)</span>
          </button>
        ) : (
          <div className="text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-2.5 flex items-center justify-between mt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>本機已持久化儲存・離線模式隨時可用</span>
            </span>
            <span className="text-[10px] text-emerald-300/80 font-mono">OK</span>
          </div>
        )}
      </div>

      {/* Sections List */}
      <div className="space-y-2 mb-4">
        <h3 className="text-xs font-semibold text-slate-300">守護包收錄模組清單</h3>
        {sectionsList.map((sec) => (
          <div
            key={sec.id}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between text-xs"
          >
            <div>
              <div className="font-semibold text-slate-200 text-[11px]">{sec.label}</div>
              <div className="text-[10px] text-slate-400">{sec.desc}</div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700 font-mono">
              Ready
            </span>
          </div>
        ))}
      </div>

      {/* Next CTA */}
      <div className="mt-auto pt-2">
        <button
          type="button"
          onClick={handleEnterCompanion}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:from-sky-400 hover:to-blue-500 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>進入 AI 旅伴實測（模擬抵達仁川機場）</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-[10px] text-slate-400 text-center mt-2">
          點擊後自動切換至「離線保護模式」驗證 Killer Moment
        </p>
      </div>
    </div>
  );
};
